"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { db } from "@/lib/firebase";
import { v4 as uuid } from "uuid";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "sonner";

const CreateTodo = ({ getData }: { getData: () => void }) => {
  const [value, setValue] = useState<string>("");

  const ref = collection(db, "/crud");

  const handleClick = () => {
    if (value) {
      const promise = addDoc(ref, {
        status: "todo",
        text: value,
        date: new Date(),
      });
      toast.promise(promise, {
        loading: "Adding todo...",
        success: "Todo added successfully",
        error: "Error adding todo",
      });
      getData();
    } else {
      toast.error("Fill the blank");
    }
    setValue("");
  };

  return (
    <div className=" flex items-center justify-between gap-10">
      <Input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className=" border border-gray-700"
        placeholder="Add Todo..."
      />
      <Button onClick={handleClick}>Add todo</Button>
    </div>
  );
};

export default CreateTodo;
