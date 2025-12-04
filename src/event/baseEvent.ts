import WebSocket from 'ws';

import api from '../api';
import { Response, BaseEventImpl } from '../types/event';
import QueQiao from '../websocket/queqiao';

import type { Entity } from '../types';

export class BaseEvent implements BaseEventImpl {
  server_name: string;
  server_version: string;
  server_type: string;
  event_name: string;
  post_type: string;
  sub_type: string;
  timestamp: number;
  queQiao: QueQiao;
  ws: WebSocket;
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
    this.ws = ws;
    this.serverName = serverName;
  }
  async boardcast(message: Entity.TextComponent[]): Promise<Response> {
    return await api.boardcast(this.ws, message);
  }
  async send_actionbar(message: Entity.TextComponent[]): Promise<Response> {
    return await api.send_actionbar(this.ws, message);
  }
  async sendActionbar(message: Entity.TextComponent[]): Promise<Response> {
    return await api.send_actionbar(this.ws, message);
  }
  async send_private_msg(
    message: Entity.TextComponent[],
    options: { uuid?: string; nickname?: string },
  ): Promise<Response> {
    return await api.send_private_msg(this.ws, message, options);
  }
  async sendPrivateMsg(
    message: Entity.TextComponent[],
    options: { uuid?: string; nickname?: string },
  ): Promise<Response> {
    return await api.send_private_msg(this.ws, message, options);
  }
  async send_rcon_command(command: string): Promise<Response> {
    return await api.send_rcon_command(this.ws, command);
  }
  async sendRconCommand(command: string): Promise<Response> {
    return await api.send_rcon_command(this.ws, command);
  }
  async send_title(options: {
    title?: Entity.TextComponent;
    subtitle?: Entity.TextComponent;
    fade_in?: number;
    stay?: number;
    fade_out?: number;
  }): Promise<Response> {
    return await api.send_title(this.ws, options);
  }
  async sendTitle(options: {
    title?: Entity.TextComponent;
    subtitle?: Entity.TextComponent;
    fade_in?: number;
    stay?: number;
    fade_out?: number;
  }): Promise<Response> {
    return await api.send_title(this.ws, options);
  }
  close(): void {
    this.queQiao.closeConnect(this.server_name);
    return;
  }
}
