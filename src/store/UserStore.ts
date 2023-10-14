import { User } from "@/types/User";
import { create } from "zustand";

type UserStore = {
  loggedUser: User | null;
  setLoggedUser: (loggedUser: User) => void;
};

export const useUserStore = create<UserStore>((set) => {
  return {
    loggedUser: null,
    setLoggedUser: (loggedUser) => set(() => ({ loggedUser })),
  };
});
