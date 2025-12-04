import WebSocket from 'ws';

import { Response } from './response';
import QueQiao from '../../websocket/queqiao';

export type BaseEventImpl = {
  server_name: string;
  server_version: string;
  server_type: string;
  event_name: string;
  post_type: string;
  sub_type: string;
  timestamp: number;
  queQiao: QueQiao;
  ws: WebSocket;
  boardcast: (message: Entity.TextComponent[]) => Promise<Response>;
  send_actionbar: (message: Entity.TextComponent[]) => Promise<Response>;
  sendActionbar: (message: Entity.TextComponent[]) => Promise<Response>;
  send_private_msg: (
    message: Entity.TextComponent[],
    options: { uuid?: string; nickname?: string },
  ) => Promise<Response>;
  sendPrivateMsg: (
    message: Entity.TextComponent[],
    options: { uuid?: string; nickname?: string },
  ) => Promise<Response>;
  send_rcon_command: (command: string) => Promise<Response>;
  sendRconCommand: (command: string) => Promise<Response>;
  send_title: (options: {
    title?: Entity.TextComponent;
    subtitle?: Entity.TextComponent;
    fade_in?: number;
    stay?: number;
    fade_out?: number;
  }) => Promise<Response>;
  sendTitle: (options: {
    title?: Entity.TextComponent;
    subtitle?: Entity.TextComponent;
    fade_in?: number;
    stay?: number;
    fade_out?: number;
  }) => Promise<Response>;
  close: () => void;
};
