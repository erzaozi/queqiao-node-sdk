import { boardcast } from './boardcast';
import { send_actionbar } from './sendActionbar';
import { send_private_msg } from './sendPrivateMsg';
import { send_rcon_command } from './sendRconCommand';
import { send_title } from './sendTitle';

import type { Api } from '../types';
const api: Api = {
  boardcast,
  send_actionbar,
  sendActionbar: send_actionbar,
  send_private_msg,
  sendPrivateMsg: send_private_msg,
  send_rcon_command,
  sendRconCommand: send_rcon_command,
  send_title,
  sendTitle: send_title,
};
export default api;
