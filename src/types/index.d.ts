import WebSocket from 'ws';

import { Response } from './event/response';

// about TextComponent for more: https://zh.minecraft.wiki/w/%E6%96%87%E6%9C%AC%E7%BB%84%E4%BB%B6#%E7%BB%84%E4%BB%B6%E7%BB%A7%E6%89%BF
export namespace Entity {
  type TextComponent =
    | {
      type: 'text';
      text: string;
    }
    | any;
  type Player = {
    nickname: string;
    uuid?: string;
    is_op?: boolean;
    address?: string;
    health?: number;
    max_health?: number;
    experience_level?: number;
    total_experience?: number;
    walk_speed?: number;
    x?: number;
    y?: number;
    z?: number;
  };
  type Death = {
    key: string;
    args: string[];
    text: string;
  };
  type Achievement = {
    key: string;
    display: Display;
    text: string;
    translate: Translate;
  };
  type Display = {
    title: string | Translate;
    description: string | Translate;
    frame: "task" | "goal" | "challenge"
  };
  type Translate = {
    key: string;
    args: Translate[];
    text: string;
  };
}

interface ConnectOptions {
  serverName: string;
  url: string;
  authorization?: string;
  maxRetries?: number;
}

interface ServerOptions {
  host?: string;
  port?: number;
  path?: string;
  readonly authorization?: string;
}

interface ApiImpl<T = Entity.TextComponent> {
  broadcast: (serverName: string, message: T[]) => Promise<Response>;
  sendActionbar: (serverName: string, message: T[]) => Promise<Response>;
  sendPrivateMsg: (
    serverName: string,
    message: T[],
    options: { uuid?: string; nickname?: string },
  ) => Promise<Response>;
  sendRconCommand: (serverName: string, command: string) => Promise<Response>;
  sendTitle: (
    serverName: string,
    options: {
      title?: T;
      subtitle?: T;
      fade_in?: number;
      stay?: number;
      fade_out?: number;
    },
  ) => Promise<Response>;
}

interface ConnApiImpl<T = Entity.TextComponent> {
  broadcast: (message: T[]) => Promise<Response>;
  sendActionbar: (message: T[]) => Promise<Response>;
  sendPrivateMsg: (
    message: T[],
    options: { uuid?: string; nickname?: string },
  ) => Promise<Response>;
  sendRconCommand: (command: string) => Promise<Response>;
  sendTitle: (
    options: {
      title?: T;
      subtitle?: T;
      fade_in?: number;
      stay?: number;
      fade_out?: number;
    },
  ) => Promise<Response>;
}

export { ConnectOptions, ServerOptions, ApiImpl, ConnApiImpl };
