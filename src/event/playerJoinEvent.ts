import WebSocket from 'ws';

import { BaseEvent } from './baseEvent.js';
import { PlayerJoinEventImpl } from '../types/event';
import QueQiao from '../websocket/queqiao.js';

import type { Entity } from '../types';

type Player = Entity.Player;

export class PlayerJoinEvent extends BaseEvent implements PlayerJoinEventImpl {
  override event_name: 'PlayerJoinEvent' = 'PlayerJoinEvent' as const;
  override post_type: 'notice' = 'notice' as const;
  override sub_type: 'player_join' = 'player_join' as const;
  player: Player;
  constructor(
    queQiao: QueQiao,
    ws: WebSocket,
    serverName: string,
    obj: PlayerJoinEventImpl,
  ) {
    super(queQiao, ws, serverName, obj);
    this.player = obj.player;
  }
}
