import {
  PlayerJoinEvent,
  PlayerQuitEvent,
  PlayerChatEvent,
  PlayerCommandEvent,
  PlayerAchievementEvent,
  PlayerDeathEvent,
} from '../event/index.js';

type EventMap = {
  PlayerChatEvent: PlayerChatEvent;
  PlayerJoinEvent: PlayerJoinEvent;
  PlayerQuitEvent: PlayerQuitEvent;
  PlayerCommandEvent: PlayerCommandEvent;
  PlayerAchievementEvent: PlayerAchievementEvent;
  PlayerDeathEvent: PlayerDeathEvent;
};

export class EventEmitter<T extends EventMap = EventMap> {
  private events: {
    [K in keyof T]?: Set<(event: T[K]) => void>;
  } = {};

  on<K extends keyof T>(eventName: K, listener: (event: T[K]) => void): this {
    if (!this.events[eventName]) {
      this.events[eventName] = new Set();
    }
    this.events[eventName]!.add(listener);
    return this;
  }

  emit<K extends keyof T>(eventName: K, event: T[K]): void {
    this.events[eventName]?.forEach((listener) => {
      try {
        listener(event);
      } catch (error) {
        console.error(
          `Error in event listener for ${String(eventName)}:`,
          error,
        );
      }
    });
  }

  off<K extends keyof T>(eventName: K, listener: (event: T[K]) => void): void {
    this.events[eventName]?.delete(listener);
  }

  once<K extends keyof T>(eventName: K, listener: (event: T[K]) => void): void {
    const onceListener = (event: T[K]): void => {
      this.off(eventName, onceListener);
      listener(event);
    };
    this.on(eventName, onceListener);
  }

  removeAllListeners(): void {
    Object.keys(this.events).forEach((key) => {
      this.events[key as keyof T]?.clear();
    });
  }
}
