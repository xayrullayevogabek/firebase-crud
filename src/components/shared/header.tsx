"use client";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "../ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

const Header = () => {
  const { user, setToken, setUser } = useAuth();

  const handleLogOut = () => {
    const promise = signOut(auth).then(() => {
      setToken("");
      setUser(null);
    });

    toast.promise(promise, {
      loading: "Logging out...",
      success: "Logged out successfully",
      error: "Something went wrong",
    });
  };

  return (
    <div className=" py-5 border-b border-b-gray-700">
      <div className=" container flex items-center justify-between">
        <div className=" flex items-center gap-2">
          <div className=" relative w-10 h-10">
            <Image
              src="/firebase.png"
              alt="logo"
              fill
              className=" object-contain"
            />
          </div>
          <h1 className=" text-xl">CRUD - Firebase</h1>
        </div>
        {user ? (
          <Popover>
            <PopoverTrigger>
              <Avatar className=" cursor-pointer">
                <AvatarImage src={user.photo || ""} />
                <AvatarFallback className=" bg-gray-700">
                  {user.email.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className=" bg-gray-700 border-none text-white flex items-center flex-col"
            >
              <h1 className=" text-sm">
                {user.displayName ? user.displayName : user.email}
              </h1>
              <Button
                onClick={handleLogOut}
                className=" w-full mt-3 flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>
                Log Out
              </Button>
            </PopoverContent>
          </Popover>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
