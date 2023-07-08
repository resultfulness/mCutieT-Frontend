export type AppData = {
  username: string;
  password: string;
  ip: string;
  port: number;
};

export const DEFAULT_APP_DATA: AppData = {
  username: "",
  password: "",
  ip: "",
  port: 0,
};

export type Topic = {
  topic: string;
  name: string;
};
