import WebSocket from 'ws';

import { BaseEvent } from './baseEvent';
import { PlayerDeathEventImpl } from '../types/event';
import QueQiao from '../websocket/queqiao';

import type { Entity } from '../types';

type Player = Entity.Player;
type Death = Entity.Death;

export class PlayerDeathEvent
  extends BaseEvent
  implements PlayerDeathEventImpl
{
  override event_name: 'PlayerDeathEvent' = 'PlayerDeathEvent' as const;
  override post_type: 'notice' = 'notice' as const;
  override sub_type: 'player_death' = 'player_death' as const;
  player: Player;
  death: Death;
  constructor(
    queQiao: QueQiao,
    ws: WebSocket,
    serverName: string,
    obj: PlayerDeathEventImpl,
  ) {
    super(queQiao, ws, serverName, obj);
    this.player = obj.player;
    this.death = obj.death;
  }
}
