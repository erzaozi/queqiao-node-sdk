import WebSocket from 'ws';

import { BaseEvent } from './baseEvent.js';
import { PlayerAchievementEventImpl } from '../types/event';
import QueQiao from '../websocket/queqiao.js';

import type { Entity } from '../types';

type Player = Entity.Player;
type Achievement = Entity.Achievement;

export class PlayerAchievementEvent
  extends BaseEvent
  implements PlayerAchievementEventImpl {
  override event_name: 'PlayerAchievementEvent' =
    'PlayerAchievementEvent' as const;
  override post_type: 'notice' = 'notice' as const;
  override sub_type: 'player_achievement' = 'player_achievement' as const;
  player: Player;
  achievement: Achievement;
  constructor(
    queQiao: QueQiao,
    serverName: string,
    obj: PlayerAchievementEventImpl,
  ) {
    super(queQiao, serverName, obj);
    this.player = obj.player;
    this.achievement = obj.achievement;
  }
}
