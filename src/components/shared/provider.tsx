"use client";
import React from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="dark">
      <Toaster position="top-right" richColors theme="dark" />
      {children}
    </ThemeProvider>
  );
};

export default Provider;
