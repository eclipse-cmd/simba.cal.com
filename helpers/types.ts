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
  // eslint-disable-next-line @typescript-eslint/ban-types
  session: {} | null;
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: { date: Date | null };
};
