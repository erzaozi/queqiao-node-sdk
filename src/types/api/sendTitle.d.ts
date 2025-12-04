type TextComponent = Entity.TextComponent;

export type SendTitle = {
  api: 'send_title';
  data: {
    fade_in: number;
    stay: number;
    fade_out: number;
  } & (
    | {
        title: TextComponent;
        subtitle: TextComponent;
      }
    | {
        title: TextComponent;
      }
    | {
        subtitle: TextComponent;
      }
  );
  echo: string;
};
