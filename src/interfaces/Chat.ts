import { User } from "./User";

export interface Chat {
  id: string;
  title: string;
  owner: Partial<User>;
  members: Partial<User[]>;
  messages: any;
  created_at: string;
}