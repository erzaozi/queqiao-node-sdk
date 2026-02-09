import { broadcast } from './broadcast.js';
import { sendActionbar } from './sendActionbar.js';
import { sendPrivateMsg } from './sendPrivateMsg.js';
import { sendRconCommand } from './sendRconCommand.js';
import { sendTitle } from './sendTitle.js';

import type { Api } from '../types';
const api: Api = {
  broadcast,
  sendActionbar,
  sendPrivateMsg,
  sendRconCommand,
  sendTitle,
};
export default api;
