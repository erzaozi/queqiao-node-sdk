type TextComponent = Entity.TextComponent;

export type SendPrivateMsg = {
  api: 'send_private_msg';
  data:
    | {
        uuid: string;
        message: TextComponent[];
      }
    | {
        nickname: string;
        message: TextComponent[];
      };
  echo: string;
};
