"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";
import CreateTodo from "@/components/shared/create-todo";
import { TableTodo } from "@/components/shared/table-todo";
import { db } from "@/lib/firebase";
import { CollectionReference, collection, getDocs } from "firebase/firestore";
import { TodoType } from "@/types";

export default function Home() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const { token } = useAuth();
  const ref = collection(db, "crud");

  useEffect(() => {
    if (!token) {
      redirect("/register");
    }
  }, [token]);

  const getData = async () => {
    const res = await getDocs(ref);
    const data = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTodos(data as TodoType[]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" container py-10">
      <CreateTodo getData={getData} />
      {todos.length > 0 ? (
        <TableTodo getData={getData} todos={todos} />
      ) : (
        <div className=" flex items-center justify-center h-[50vh]">
          <h1 className=" text-2xl font-bold">
            There is no any todos!
          </h1>
        </div>
      )}
    </div>
  );
}
