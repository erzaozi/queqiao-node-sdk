import { Entity } from '..';

export type Broadcast = {
  api: 'broadcast';
  data: {
    message: Entity.TextComponent[];
  };
  echo: string;
};
