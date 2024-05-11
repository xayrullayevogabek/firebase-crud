import { create } from "zustand";

const useAuth = create((set) => ({
  user: null,
  setUser: (user: any) => set({ user }),
}));
