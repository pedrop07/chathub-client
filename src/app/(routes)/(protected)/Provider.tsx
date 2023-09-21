"use client";

import { User } from "@/interfaces/User";
import { useUserStore } from "@/store/UserStore";
import React, { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
  user: User;
}

function Provider({ children, user }: Props) {
  const setUser = useUserStore(store => store.setUser)

  useEffect(() => {
    setUser(user)
  }, [])

  return (
    <>
      {children}
    </>
  );
}

export default Provider;
