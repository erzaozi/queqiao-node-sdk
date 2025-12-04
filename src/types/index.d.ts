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
    text: string;
    display: Display;
  };
  type Display = {
    title: string;
    description: string;
    frame: string;
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

interface Api<T = Entity.TextComponent> {
  boardcast: (ws: WebSocket, message: T[]) => Promise<Response>;
  send_actionbar: (ws: WebSocket, message: T[]) => Promise<Response>;
  sendActionbar: (ws: WebSocket, message: T[]) => Promise<Response>;
  send_private_msg: (
    ws: WebSocket,
    message: T[],
    options: { uuid?: string; nickname?: string },
  ) => Promise<Response>;
  sendPrivateMsg: (
    ws: WebSocket,
    message: T[],
    options: { uuid?: string; nickname?: string },
  ) => Promise<Response>;
  send_rcon_command: (ws: WebSocket, command: string) => Promise<Response>;
  sendRconCommand: (ws: WebSocket, command: string) => Promise<Response>;
  send_title: (
    ws: WebSocket,
    options: {
      title?: T;
      subtitle?: T;
      fade_in?: number;
      stay?: number;
      fade_out?: number;
    },
  ) => Promise<Response>;
  sendTitle: (
    ws: WebSocket,
    options: {
      title?: T;
      subtitle?: T;
      fade_in?: number;
      stay?: number;
      fade_out?: number;
    },
  ) => Promise<Response>;
}

export { ConnectOptions, ServerOptions, Api };
