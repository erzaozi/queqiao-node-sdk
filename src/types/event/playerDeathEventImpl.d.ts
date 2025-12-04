import type { BaseEventImpl } from './baseEventImpl';
type Player = Entity.Player;

export interface PlayerDeathEventImpl extends BaseEventImpl {
  event_name: 'PlayerDeathEvent';
  player: Player;
  death: Entity.Death;
}
