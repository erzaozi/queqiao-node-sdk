import WebSocket from 'ws';

import { addResponse } from '../event/index.js';

import type { Entity } from '../types';
import type { SendTitle } from '../types/api/sendTitle';
import type { Response } from '../types/event';
export async function sendTitle(
  ws: WebSocket,
  options: {
    title?: Entity.TextComponent;
    subtitle?: Entity.TextComponent;
    fade_in?: number;
    stay?: number;
    fade_out?: number;
  },
): Promise<Response> {
  const { title, subtitle, fade_in, stay, fade_out } = options;
  const echoId = String(Date.now()) + Math.floor(Math.random() * 10000);
  if (title === undefined && subtitle === undefined) {
    throw new Error('title or subtitle is required');
  }
  const payload: SendTitle = {
    api: 'send_title',
    data: {
      fade_in: fade_in || 20,
      stay: stay || 70,
      fade_out: fade_out || 20,
      ...(title ? { title } : {}),
      ...(subtitle ? { subtitle } : {}),
    },
    echo: echoId,
  } as SendTitle;
  ws.send(JSON.stringify(payload));
  return await addResponse(echoId, 5000);
}
