import WebSocket from 'ws';

import { BaseEvent } from './baseEvent.js';
import { PlayerChatEventImpl } from '../types/event';
import QueQiao from '../websocket/queqiao.js';

import type { Entity } from '../types';

type Player = Entity.Player;

export class PlayerChatEvent extends BaseEvent implements PlayerChatEventImpl {
  override event_name: 'PlayerChatEvent' = 'PlayerChatEvent' as const;
  override post_type: 'message' = 'message' as const;
  override sub_type: 'player_chat' = 'player_chat' as const;
  message: string;
  message_id: string;
  raw_message: string;
  player: Player;
  constructor(
    queQiao: QueQiao,
    serverName: string,
    obj: PlayerChatEventImpl,
  ) {
    super(queQiao, serverName, obj);
    this.message = obj.message;
    this.message_id = obj.message_id;
    this.raw_message = obj.raw_message;
    this.player = obj.player;
  }
}
