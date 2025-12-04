export type Response = {
  api: string;
  code: number;
  post_type: 'response';
  status: string;
  message: string;
  data?: object | null;
  echo: string;
};
