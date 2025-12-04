import WebSocket from 'ws';

import QueQiaoServer from './server';
import api from '../api';
import { EventEmitter } from './eventEmiter';
import {
  PlayerAchievementEvent,
  PlayerChatEvent,
  PlayerCommandEvent,
  PlayerDeathEvent,
  PlayerJoinEvent,
  PlayerQuitEvent,
  handleResponse,
} from '../event';
import { ServerOptions, ConnectOptions, Api } from '../types';
import {
  PlayerAchievementEventImpl,
  PlayerChatEventImpl,
  PlayerCommandEventImpl,
  PlayerDeathEventImpl,
  PlayerJoinEventImpl,
  PlayerQuitEventImpl,
} from '../types/event';
import { BaseEventImpl } from '../types/event/baseEventImpl';

import type { Response } from '../types/event/response';

class QueQiao {
  private wsList: {
    [key: string]: {
      type: 'inbound' | 'outbound';
      serverName: string;
      ws: WebSocket;
    };
  } = {};

  private isStartServer: boolean;
  private serverOptions: ServerOptions;
  queQiaoServer: QueQiaoServer | null = null;
  private eventEmitter: EventEmitter;
  api: Api;

  constructor(isStartServer: boolean = false, serverOptions?: ServerOptions) {
    this.isStartServer = isStartServer;
    this.serverOptions = {
      ...serverOptions,
      ...{
        host: '127.0.0.1',
        port: 25564,
        path: '/queqiao',
        authorization: '',
      },
    };
    this.wsList = {};
    this.eventEmitter = new EventEmitter();
    this.api = api;
    this._init();
  }

  onChat(cb: (e: PlayerChatEvent) => void): () => void {
    this.eventEmitter.on('PlayerChatEvent', cb);
    return () => this.eventEmitter.off('PlayerChatEvent', cb);
  }

  onJoin(cb: (e: PlayerJoinEvent) => void): () => void {
    this.eventEmitter.on('PlayerJoinEvent', cb);
    return () => this.eventEmitter.off('PlayerJoinEvent', cb);
  }

  onDeath(cb: (e: PlayerDeathEvent) => void): () => void {
    this.eventEmitter.on('PlayerDeathEvent', cb);
    return () => this.eventEmitter.off('PlayerDeathEvent', cb);
  }

  onCommand(cb: (e: PlayerCommandEvent) => void): () => void {
    this.eventEmitter.on('PlayerCommandEvent', cb);
    return () => this.eventEmitter.off('PlayerCommandEvent', cb);
  }

  onQuit(cb: (e: PlayerQuitEvent) => void): () => void {
    this.eventEmitter.on('PlayerQuitEvent', cb);
    return () => this.eventEmitter.off('PlayerQuitEvent', cb);
  }

  onAchievement(cb: (e: PlayerAchievementEvent) => void): () => void {
    this.eventEmitter.on('PlayerAchievementEvent', cb);
    return () => this.eventEmitter.off('PlayerAchievementEvent', cb);
  }

  async restartServer(): Promise<void> {
    if (this.isStartServer && this.queQiaoServer) {
      this.queQiaoServer = await this.queQiaoServer.restart();
    }
  }

  async closeServer(): Promise<void> {
    if (this.isStartServer && this.queQiaoServer) {
      for (const serverName in this.wsList) {
        const connection = this.wsList[serverName];
        if (connection && connection.type === 'inbound') {
          connection.ws.removeAllListeners();
          connection.ws.close();
          delete this.wsList[serverName];
        }
      }
      this.isStartServer = false;
      this.queQiaoServer.close();
      this.queQiaoServer = null;
    }
  }

  async startServer(): Promise<void> {
    if (!this.isStartServer || !this.queQiaoServer) {
      this.isStartServer = true;
      await this._init();
    }
  }

  async connect(options: ConnectOptions, retried = 0): Promise<boolean> {
    const maxRetries = options.maxRetries || 3;
    const serverName = options.serverName;
    return new Promise((resolve, reject) => {
      if (retried <= maxRetries) {
        if (serverName !== '') {
          if (this.wsList[serverName] === undefined) {
            const headers = {
              'X-Self-Name': encodeURIComponent(serverName),
              ...(options.authorization && {
                Authorization: `Bearer ${encodeURIComponent(options.authorization)}`,
              }),
            };

            const ws = new WebSocket(options.url, { headers });
            ws.on('open', () => {
              console.log(
                `Connected to the server name [${serverName}] Successfully`,
              );
              retried = 0;
              this._add(ws, serverName, 'outbound');
              resolve(true);
            });

            ws.on('error', (error) => {
              console.error(
                `Server name [${serverName}] outbound connection error:` +
                error.message,
              );
              console.log(`The ${retried + 1} reconnection will be retried...`);
              ws.removeAllListeners();
              ws.close();
              setTimeout(() => {
                return this.connect(options, retried + 1);
              }, 5000);
            });
          } else {
            console.error(`Server name [${serverName}] has already existed.`);
          }
        }
      } else {
        console.error(
          `Server name [${serverName}] outbound connection failed.`,
        );
        reject(false);
      }
    });
  }

  closeConnect(serverName: string): void {
    if (this.wsList[serverName]) {
      this.wsList[serverName].ws.removeAllListeners();
      this.wsList[serverName].ws.close();
      delete this.wsList[serverName];
      console.log(`Server name [${serverName}] has been closed.`);
    } else {
      console.warn('Server name does not exist.');
    }
  }

  closeAllConnect(): void {
    for (const serverName in this.wsList) {
      const connection = this.wsList[serverName];
      if (connection) {
        connection.ws.removeAllListeners();
        connection.ws.close();
        delete this.wsList[serverName];
        console.log(`Server name [${serverName}] has been closed.`);
      }
    }
  }

  async _init(): Promise<void> {
    if (this.isStartServer) {
      this.queQiaoServer = new QueQiaoServer(
        this.serverOptions.host!,
        this.serverOptions.port!,
        this.serverOptions.path!,
        this.serverOptions.authorization!,
        this,
      );
      await this.queQiaoServer.start();
    }
  }

  _add(ws: WebSocket, serverName: string, type: 'inbound' | 'outbound'): void {
    if (this.wsList[serverName]) {
      throw new Error(`Same server name [${serverName}] is not allowed.`);
    } else {
      if (type === 'inbound') {
        this.wsList[serverName] = {
          ws,
          serverName: serverName,
          type: 'inbound',
        };
      } else {
        this.wsList[serverName] = {
          ws,
          serverName: serverName,
          type: 'outbound',
        };
      }
      this._addEventListener(serverName);
    }
  }

  private _addEventListener(serverName: string): void {
    if (this.wsList[serverName]) {
      this.wsList[serverName].ws.on('close', (code, reason) => {
        delete this.wsList[serverName];
        console.error(
          `Server name [${serverName}] has been closed. Code: ${code}, Reason: ${reason || 'N/A'}`,
        );
      });
      this.wsList[serverName].ws.on('message', (message: string) => {
        const obj = JSON.parse(message.toString()) as BaseEventImpl | Response;
        if (this.wsList[serverName]) {
          let event;
          if (obj.post_type === 'response') {
            handleResponse((obj as Response).echo, obj as Response);
          }
          if (obj.post_type === 'message') {
            switch (obj.sub_type) {
              case 'player_chat':
                event = new PlayerChatEvent(
                  this,
                  this.wsList[serverName].ws,
                  serverName,
                  obj as PlayerChatEventImpl,
                );
                break;
              case 'player_command':
                event = new PlayerCommandEvent(
                  this,
                  this.wsList[serverName].ws,
                  serverName,
                  obj as PlayerCommandEventImpl,
                );
                break;
            }
          }
          if (obj.post_type === 'notice') {
            switch (obj.sub_type) {
              case 'player_join':
                event = new PlayerJoinEvent(
                  this,
                  this.wsList[serverName].ws,
                  serverName,
                  obj as PlayerJoinEventImpl,
                );
                break;
              case 'player_quit':
                event = new PlayerQuitEvent(
                  this,
                  this.wsList[serverName].ws,
                  serverName,
                  obj as PlayerQuitEventImpl,
                );
                break;
              case 'player_death':
                event = new PlayerDeathEvent(
                  this,
                  this.wsList[serverName].ws,
                  serverName,
                  obj as PlayerDeathEventImpl,
                );
                break;
              case 'player_achievement':
                event = new PlayerAchievementEvent(
                  this,
                  this.wsList[serverName].ws,
                  serverName,
                  obj as PlayerAchievementEventImpl,
                );
                break;
            }
          }
          if (event === null || event === undefined) {
            console.error(`Unknown event: ${message}`);
          } else {
            this.eventEmitter.emit(event.event_name, event);
          }
        }
      });
    }
  }
}

export default QueQiao;
