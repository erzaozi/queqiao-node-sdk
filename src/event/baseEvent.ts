import { BaseEventImpl } from '../types/event';
import QueQiao from '../websocket/queqiao.js';

import type { ConnApiImpl, Entity } from '../types';

export class BaseEvent implements BaseEventImpl {
  server_name: string;
  server_version: string;
  server_type: string;
  event_name: string;
  post_type: string;
  sub_type: string;
  timestamp: number;
  queQiao: QueQiao;
  api: ConnApiImpl;
  serverName: string;
  constructor(
    queQiao: QueQiao,
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
      broadcast: (message: Entity.TextComponent[]) => this.queQiao.api.broadcast(serverName, message),
      sendActionbar: (message: Entity.TextComponent[]) => this.queQiao.api.sendActionbar(serverName, message),
      sendPrivateMsg: (message: Entity.TextComponent[], options: { uuid?: string; nickname?: string }) =>
        this.queQiao.api.sendPrivateMsg(serverName, message, options),
      sendRconCommand: (command: string) => this.queQiao.api.sendRconCommand(serverName, command),
      sendTitle: (options: {
        title?: Entity.TextComponent;
        subtitle?: Entity.TextComponent;
        fade_in?: number;
        stay?: number;
        fade_out?: number;
      }) => this.queQiao.api.sendTitle(serverName, options),
    }
    this.serverName = serverName;
  }
}
