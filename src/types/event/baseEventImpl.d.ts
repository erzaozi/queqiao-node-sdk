import WebSocket from 'ws';

import { ConnApi } from '../';
import { Response } from './response';
import QueQiao from '../../websocket/queqiao';

export type BaseEventImpl = {
  server_name: string;
  server_version: string;
  server_type: string;
  event_name: string;
  post_type: string;
  sub_type: string;
  timestamp: number;
  queQiao: QueQiao;
  api: ConnApi;
};
