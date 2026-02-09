import WebSocket from 'ws';

import { BaseEventImpl } from '../types/event';
import QueQiao from '../websocket/queqiao.js';

import type { ConnApi, Entity } from '../types';

export class BaseEvent implements BaseEventImpl {
  server_name: string;
  server_version: string;
  server_type: string;
  event_name: string;
  post_type: string;
  sub_type: string;
  timestamp: number;
  queQiao: QueQiao;
  api: ConnApi;
  serverName: string;
  constructor(
    queQiao: QueQiao,
    ws: WebSocket,
    serverName: string,
    obj: BaseEventImpl,
  ) {
    this.server_name = obj.server_name;
    this.server_version = obj.server_version;
    this.server_type = obj.server_type;
    this.event_name = obj.event_name;
    this.post_type = obj.post_type;
    this.sub_type = obj.sub_type;
    this.timestamp = obj.timestamp;
    this.queQiao = queQiao;
    this.api = {
      broadcast: (message: Entity.TextComponent[]) => this.queQiao.api.broadcast(ws, message),
      sendActionbar: (message: Entity.TextComponent[]) => this.queQiao.api.sendActionbar(ws, message),
      sendPrivateMsg: (message: Entity.TextComponent[], options: { uuid?: string; nickname?: string }) =>
        this.queQiao.api.sendPrivateMsg(ws, message, options),
      sendRconCommand: (command: string) => this.queQiao.api.sendRconCommand(ws, command),
      sendTitle: (options: {
        title?: Entity.TextComponent;
        subtitle?: Entity.TextComponent;
        fade_in?: number;
        stay?: number;
        fade_out?: number;
      }) => this.queQiao.api.sendTitle(ws, options),
    }
    this.serverName = serverName;
  }
}
