import type { BaseEventImpl } from './baseEventImpl';
type Player = Entity.Player;

export interface PlayerQuitEventImpl extends BaseEventImpl {
  event_name: 'PlayerQuitEvent';
  player: Player;
}
