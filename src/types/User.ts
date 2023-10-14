import { Chat } from "./Chat";

export interface User {
  id: string;
  username: string;
  email: string;
  created_at: string;
  chats: Chat[];
}
