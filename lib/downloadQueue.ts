class DownloadQueue {
  private queue: Array<{
    id: string;
    filePath: string;
    resolve: (buffer: Buffer) => void;
    reject: (error: Error) => void;
  }> = [];
  private activeCount = 0;
  private maxConcurrent = parseInt(process.env.MAX_CONCURRENT_DOWNLOADS || '2');
  private maxQueueSize = parseInt(process.env.MAX_QUEUE_SIZE || '22');
  private waitTimeout = parseInt(process.env.DOWNLOAD_TIMEOUT_MS || '20000');

  async enqueue(filePath: string): Promise<Buffer> {
    if (this.queue.length >= this.maxQueueSize) {
      throw new Error('Servidor saturado');
    }

    return new Promise<Buffer>((resolve, reject) => {
      const id = Math.random().toString(36).substring(7);
      const timeout = setTimeout(() => {
        const index = this.queue.findIndex(item => item.id === id);
        if (index !== -1) {
          this.queue.splice(index, 1);
          reject(new Error('Tiempo de espera agotado'));
        }
      }, this.waitTimeout);

      this.queue.push({
        id,
        filePath,
        resolve: (buffer) => { clearTimeout(timeout); resolve(buffer); },
        reject: (error) => { clearTimeout(timeout); reject(error); },
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

  private async processTask(task: { filePath: string; resolve: (buf: Buffer) => void; reject: (err: Error) => void }) {
    try {
      const fs = require('fs');
      const buffer = fs.readFileSync(task.filePath);
      task.resolve(buffer);
    } catch (error) {
      task.reject(error instanceof Error ? error : new Error('Error de lectura'));
    }
  }
}

export const downloadQueue = new DownloadQueue();