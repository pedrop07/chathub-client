import { User } from "@/interfaces/User";
import { create } from "zustand";

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
};

export const useUserStore = create<UserStore>((set) => {
  return {
    user: null,
    setUser: (user) => set(() => ({ user })),
  };
});

