"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";

export default function Home() {
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      redirect("/register");
    }
  }, [token]);

  return (
    <div className=" container py-10">
      <div>Hello World</div>
    </div>
  );
}
