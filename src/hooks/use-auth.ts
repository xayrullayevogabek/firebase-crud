import { getItem, setItem } from "@/lib/utils";
import { userType } from "@/types";
import { create } from "zustand";

const user = getItem("user");
const token = getItem("token");

interface AuthType {
  user: userType;
  token: string;
  setUser: (user: userType) => void;
  setToken: (token: string) => void;
}

export const useAuth = create<AuthType>((set) => ({
  user: user ? JSON.parse(user) : null,
  token: token ? JSON.parse(token) : null,
  setUser: (user: any) => {
    set({ user });
    setItem("user", user);
  },
  setToken: (token: string) => {
    set({ token });
    setItem("token", token);
  },
}));
