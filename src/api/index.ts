import QueQiao from '../websocket/queqiao.js';
import { broadcast } from './broadcast.js';
import { sendActionbar } from './sendActionbar.js';
import { sendPrivateMsg } from './sendPrivateMsg.js';
import { sendRconCommand } from './sendRconCommand.js';
import { sendTitle } from './sendTitle.js';

import type { ApiImpl, Entity } from '../types';
import { Response } from '../types/event/response.js';

class Api<T = Entity.TextComponent> implements ApiImpl<T> {
  private queqiao: QueQiao;

  constructor(queqiao: QueQiao) {
    this.queqiao = queqiao;

    this.broadcast = (serverName, message: T[]) =>
      broadcast(this.queqiao.getConn(serverName)?.ws, message);

    this.sendActionbar = (serverName, message: T[]) =>
      sendActionbar(this.queqiao.getConn(serverName)?.ws, message);

    this.sendPrivateMsg = (serverName, message: T[], options) =>
      sendPrivateMsg(
        this.queqiao.getConn(serverName)?.ws,
        message,
        options
      );

    this.sendRconCommand = (serverName, command) =>
      sendRconCommand(this.queqiao.getConn(serverName)?.ws, command);

    this.sendTitle = (serverName, options) =>
      sendTitle(this.queqiao.getConn(serverName)?.ws, options);
  }

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
      title?: Entity.TextComponent;
      subtitle?: Entity.TextComponent;
      fade_in?: number;
      stay?: number;
      fade_out?: number;
    },
  ) => Promise<Response>;
}

export default Api;