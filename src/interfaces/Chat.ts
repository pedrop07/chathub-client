import { Message } from "postcss";
import { User } from "./User";

export interface Chat {
  id: string;
  title: string;
  description: string;
  owner: Partial<User>;
  members: Partial<User[]>;
  messages: Message[];
  created_at: string;
}