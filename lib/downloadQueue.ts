import fs from 'fs';

type QueueTask = {
  id: string;
  filePath: string;
  resolve: (buffer: Buffer) => void;
  reject: (error: Error) => void;
};

class DownloadQueue {
  private queue: QueueTask[] = [];
  private activeCount = 0;
  private maxConcurrent: number;
  private maxQueueSize: number;
  private waitTimeout: number;

  constructor(maxConcurrent = 3, maxQueueSize = 50, waitTimeout = 30000) {
    this.maxConcurrent = maxConcurrent;
    this.maxQueueSize = maxQueueSize;
    this.waitTimeout = waitTimeout;
  }

  async enqueue(filePath: string): Promise<Buffer> {
    if (this.queue.length >= this.maxQueueSize) {
      throw new Error('Servidor saturado. Por favor, intentá nuevamente en unos momentos.');
    }

    return new Promise((resolve, reject) => {
      const id = Math.random().toString(36).substring(7);
      
      const timeout = setTimeout(() => {
        const index = this.queue.findIndex(task => task.id === id);
        if (index !== -1) {
          this.queue.splice(index, 1);
          reject(new Error('Tiempo de espera agotado. Hay muchas personas descargando. Intentá nuevamente.'));
        }
      }, this.waitTimeout);

      this.queue.push({
        id,
        filePath,
        resolve: (buffer) => {
          clearTimeout(timeout);
          resolve(buffer);
        },
        reject: (error) => {
          clearTimeout(timeout);
          reject(error);
        },
      });

      this.processQueue();
    });
  }

  private async processQueue() {
    while (this.activeCount < this.maxConcurrent && this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        this.activeCount++;
        this.processTask(task).finally(() => {
          this.activeCount--;
          this.processQueue();
        });
      }
    }
  }

  private async processTask(task: QueueTask) {
    console.log(`⬇️ Descarga iniciada: ${task.filePath} (Activas: ${this.activeCount}, Cola: ${this.queue.length})`);
    
    try {
      const buffer = fs.readFileSync(task.filePath);
      console.log(`✅ Descarga completada: ${task.filePath}`);
      task.resolve(buffer);
    } catch (error) {
      console.error(`❌ Error en descarga: ${task.filePath}`, error);
      task.reject(error as Error);
    }
  }

  getStats() {
    return {
      active: this.activeCount,
      queued: this.queue.length,
      maxConcurrent: this.maxConcurrent,
    };
  }
}

export const downloadQueue = new DownloadQueue(
  parseInt(process.env.MAX_CONCURRENT_DOWNLOADS || '3'),
  parseInt(process.env.MAX_QUEUE_SIZE || '50'),
  parseInt(process.env.DOWNLOAD_TIMEOUT_MS || '30000')
);