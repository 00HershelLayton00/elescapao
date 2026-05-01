import fs from 'fs';

interface QueueTask {
  id: string;
  filePath: string;
  ip: string;
  resolve: (buffer: Buffer) => void;
  reject: (error: Error) => void;
  startTime: number;
}

class DownloadQueue {
  private queue: QueueTask[] = [];
  private activeCount = 0;
  private maxConcurrent = parseInt(process.env.MAX_CONCURRENT_DOWNLOADS || '2');
  private maxPerIp = parseInt(process.env.MAX_DOWNLOADS_PER_IP || '1');
  private maxQueueSize = parseInt(process.env.MAX_QUEUE_SIZE || '20');
  private waitTimeout = parseInt(process.env.DOWNLOAD_TIMEOUT_MS || '60000');
  private activeIps = new Map<string, number>();

  async enqueue(filePath: string, ip: string): Promise<Buffer> {
    const ipActive = this.activeIps.get(ip) || 0;
    if (ipActive >= this.maxPerIp) {
      throw new Error('Ya tienes una descarga activa. Espera a que termine.');
    }

    if (this.queue.length >= this.maxQueueSize) {
      throw new Error('Mucha gente descargando. Intenta en unos segundos.');
    }

    return new Promise<Buffer>((resolve, reject) => {
      const id = Math.random().toString(36).substring(7);
      
      const timeout = setTimeout(() => {
        const index = this.queue.findIndex(t => t.id === id);
        if (index !== -1) {
          this.queue.splice(index, 1);
          reject(new Error('Tiempo de espera agotado. Reintenta.'));
        }
      }, this.waitTimeout);

      this.queue.push({
        id,
        filePath,
        ip,
        resolve: (buffer: Buffer) => {
          clearTimeout(timeout);
          resolve(buffer);
        },
        reject: (error: Error) => {
          clearTimeout(timeout);
          reject(error);
        },
        startTime: Date.now(),
      });

      this.processQueue();
    });
  }

  private async processQueue() {
    while (this.activeCount < this.maxConcurrent && this.queue.length > 0) {
      const taskIndex = this.queue.findIndex(t => {
        const active = this.activeIps.get(t.ip) || 0;
        return active < this.maxPerIp;
      });

      if (taskIndex === -1) break;

      const task = this.queue.splice(taskIndex, 1)[0];
      this.activeCount++;
      this.activeIps.set(task.ip, (this.activeIps.get(task.ip) || 0) + 1);

      this.processTask(task).finally(() => {
        this.activeCount--;
        const ipCount = this.activeIps.get(task.ip) || 1;
        if (ipCount <= 1) {
          this.activeIps.delete(task.ip);
        } else {
          this.activeIps.set(task.ip, ipCount - 1);
        }
        this.processQueue();
      });
    }
  }

  private async processTask(task: QueueTask) {
    try {
      const stat = fs.statSync(task.filePath);
      console.log(`⬇️ Descarga: ${task.ip} - ${(stat.size / 1024 / 1024).toFixed(1)}MB (Activas: ${this.activeCount}, Cola: ${this.queue.length})`);
      
      // Leer archivo completo (más confiable que streams)
      const buffer = fs.readFileSync(task.filePath);
      task.resolve(buffer);
    } catch (error) {
      task.reject(error instanceof Error ? error : new Error('Error al leer archivo'));
    }
  }

  getStats() {
    return {
      activeDownloads: this.activeCount,
      queueLength: this.queue.length,
      maxConcurrent: this.maxConcurrent,
      estimatedWait: this.queue.length > 0 ? Math.ceil(this.queue.length / this.maxConcurrent) : 0,
    };
  }
}

export const downloadQueue = new DownloadQueue();