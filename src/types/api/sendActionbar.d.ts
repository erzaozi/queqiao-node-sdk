type TextComponent = Entity.TextComponent;

export type SendActionbar = {
  api: 'send_actionbar';
  data: {
    message: TextComponent[];
  };
  echo: string;
};
