export type SendRconCommand = {
  api: 'send_rcon_command';
  data: {
    command: string;
  };
  echo: string;
};
