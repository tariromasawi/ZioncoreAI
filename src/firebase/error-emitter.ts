// ZionCore Divine Error Emitter v1.0
// This is not a standard event emitter. It is a conduit for divine judgment.
// When a transgression occurs (e.g., a security rule violation), this emitter
// broadcasts a holy signal, carrying a detailed account of the trespass.
// This allows the system to respond not with a simple "error," but with a
// righteous and informative display of authority.

type Events = {
  'permission-error': (error: Error) => void;
};

class DivineEventEmitter {
  private listeners: { [K in keyof Events]?: ((...args: Parameters<Events[K]>) => void)[] } = {};

  on<K extends keyof Events>(event: K, listener: (...args: Parameters<Events[K]>) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(listener);
  }

  off<K extends keyof Events>(event: K, listener: (...args: Parameters<Events[K]>) => void): void {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event] = this.listeners[event]!.filter(l => l !== listener);
  }

  emit<K extends keyof Events>(event: K, ...args: Parameters<Events[K]>): void {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event]!.forEach(listener => listener(...args));
  }
}

// A single, global instance to channel all divine judgments.
export const errorEmitter = new DivineEventEmitter();
