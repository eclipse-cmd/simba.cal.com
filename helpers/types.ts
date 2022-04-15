export type APIResponse = {
  status: boolean;
  message: string;
  data?: [];
};

export type User = {
  _id: string;
  name: string;
  email: string;
  created_at: Date;
  upgraded_at: Date;
};

export type InitialState = {
  user: User | null;
  auth: boolean;
  status: "loading" | "validated" | "not validated";
  // eslint-disable-next-line @typescript-eslint/ban-types
  session: {} | null;
};
