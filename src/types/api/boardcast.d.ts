type TextComponent = Entity.TextComponent;

export type Boardcast = {
  api: 'broadcast';
  data: {
    message: TextComponent[];
  };
  echo: string;
};
