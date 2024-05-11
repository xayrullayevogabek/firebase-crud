"use client";
import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { userType } from "@/types";

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
      const promise = createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      ).then((response) => {
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
        loading: "Creating user...",
        success: "User created successfully",
        error: "Error creating user",
      });
      console.log(auth);
    } catch (error) {
      toast.error("Error creating user");
    }
  }

  function handleGoogleSignIn() {
    try {
      const promise = signInWithPopup(auth, googleProvider).then((response) => {

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
        loading: "Creating user...",
        success: "User created successfully",
        error: "Error creating user",
      });
    } catch (error) {
      toast.error("Error creating user");
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
              Do you have an account?{" "}
              <Link className=" text-red-400" href={"/login"}>
                Login
              </Link>
            </span>
            <Button type="submit">Submit</Button>
          </div>
          <div className=" w-full h-[1px] bg-gray-700" />
          <Button onClick={handleGoogleSignIn} className=" w-full bg-gray-700">
            Register with Google
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Register;
