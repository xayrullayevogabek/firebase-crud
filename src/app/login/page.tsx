"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { userType } from "@/types";
import { redirect } from "next/navigation";

const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .email("This is not valid email"),
  password: z.string().min(4, { message: "Password must be at least 4" }),
});

const Register = () => {
  const { setUser, setToken, token, user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const promise = signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      ).then((response) => {
        //Creating user model
        const user: userType = {
          id: response.user.uid,
          photo: response.user.photoURL!,
          email: response.user.email!,
          displayName: response.user.displayName!,
        };
        setUser(user);

        // Getting user token
        response.user.getIdToken().then((token) => {
          setToken(token);
        });
      });

      toast.promise(promise, {
        loading: "Signing in user...",
        success: "User signed in successfully",
        error: (data) => {
          if (data.code.includes("auth/invalid-credential")) {
            return "Invalid email or password";
          } else {
            return "Error signing in user";
          }
        },
      });
    } catch (error) {
      toast.error("Error signing in user");
    }
  }

  // If user is exist redirect to home page
  useEffect(() => {
    if (token) {
      redirect("/");
    }
  }, [token, user]);

  return (
    <div className=" container w-full h-screen flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-96 border border-gray-700 p-5 rounded-md"
        >
          <h1 className=" text-2xl font-bold text-center">Register</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your email</FormLabel>
                <FormControl>
                  <Input
                    className=" border border-gray-700"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your password</FormLabel>
                <FormControl>
                  <Input
                    className=" border border-gray-700"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            <span className=" text-sm">
              You don't have an account?{" "}
              <Link className=" text-red-400" href={"/register"}>
                Register
              </Link>
            </span>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Register;
