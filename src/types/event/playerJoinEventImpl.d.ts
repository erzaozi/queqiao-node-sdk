import type { BaseEventImpl } from './baseEventImpl';
type Player = Entity.Player;

export interface PlayerJoinEventImpl extends BaseEventImpl {
  event_name: 'PlayerJoinEvent';
  player: Player;
}
