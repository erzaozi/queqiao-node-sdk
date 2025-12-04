import WebSocket from 'ws';

import { BaseEvent } from './baseEvent';
import { PlayerCommandEventImpl } from '../types/event';
import QueQiao from '../websocket/queqiao';

import type { Entity } from '../types';

type Player = Entity.Player;

export class PlayerCommandEvent
  extends BaseEvent
  implements PlayerCommandEventImpl
{
  override event_name: 'PlayerCommandEvent' = 'PlayerCommandEvent' as const;
  override post_type: 'message' = 'message' as const;
  override sub_type: 'player_command' = 'player_command' as const;
  command: string;
  message_id: string;
  raw_message: string;
  player: Player;
  constructor(
    queQiao: QueQiao,
    ws: WebSocket,
    serverName: string,
    obj: PlayerCommandEventImpl,
  ) {
    super(queQiao, ws, serverName, obj);
    this.command = obj.command;
    this.message_id = obj.message_id;
    this.raw_message = obj.raw_message;
    this.player = obj.player;
  }
}
