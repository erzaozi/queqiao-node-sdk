import type { BaseEventImpl } from './baseEventImpl';
type Player = Entity.Player;

export interface PlayerCommandEventImpl extends BaseEventImpl {
  event_name: 'PlayerCommandEvent';
  command: string;
  message_id: string;
  raw_message: string;
  player: Player;
}
