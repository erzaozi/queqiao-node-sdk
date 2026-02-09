import WebSocket from 'ws';

import { BaseEvent } from './baseEvent.js';
import { PlayerQuitEventImpl } from '../types/event';
import QueQiao from '../websocket/queqiao.js';

import type { Entity } from '../types';

type Player = Entity.Player;

export class PlayerQuitEvent extends BaseEvent implements PlayerQuitEventImpl {
  override event_name: 'PlayerQuitEvent' = 'PlayerQuitEvent' as const;
  override post_type: 'notice' = 'notice' as const;
  override sub_type: 'player_quit' = 'player_quit' as const;
  player: Player;
  constructor(
    queQiao: QueQiao,
    ws: WebSocket,
    serverName: string,
    obj: PlayerQuitEventImpl,
  ) {
    super(queQiao, ws, serverName, obj);
    this.player = obj.player;
  }
}
