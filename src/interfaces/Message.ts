import { User } from "./User";

export interface Message {
  id: string;
  text: string;
  user: User;
  created_at: string;
}