import type { BaseEventImpl } from './baseEventImpl';
type Player = Entity.Player;

export interface PlayerChatEventImpl extends BaseEventImpl {
  event_name: 'PlayerChatEvent';
  message: string;
  message_id: string;
  raw_message: string;
  player: Player;
}
