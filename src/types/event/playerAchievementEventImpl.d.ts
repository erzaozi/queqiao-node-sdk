import type { BaseEventImpl } from './baseEventImpl';
type Player = Entity.Player;
type Achievement = Entity.Achievement;

export interface PlayerAchievementEventImpl extends BaseEventImpl {
  event_name: 'PlayerAchievementEvent';
  player: Player;
  achievement: Achievement;
}
