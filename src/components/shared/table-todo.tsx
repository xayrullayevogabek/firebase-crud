import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TodoType } from "@/types";
import { db } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "sonner";

export function TableTodo({
  todos,
  getData,
}: {
  todos: TodoType[];
  getData: () => void;
}) {
  const handleDelete = (id: string) => {
    const ref = doc(db, "crud", id);
    try {
      const promise = deleteDoc(ref);
      toast.promise(promise, {
        loading: "Deleting todo...",
        success: "Todo deleted successfully",
        error: "Error deleting todo",
      });
      getData();
    } catch (error) {
      console.error("Error deleting todo", error);
      toast.error("Error deleting todo");
    }
  };

  return (
    <Table className=" mt-5">
      <TableCaption>A list of your recent todos.</TableCaption>
      <TableHeader>
        <TableRow className=" border-b border-b-gray-700">
          <TableHead className=" text-white">Text</TableHead>
          <TableHead className=" text-white w-28">Status</TableHead>
          <TableHead className="text-right text-white">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
          <TableRow className=" border-b border-b-gray-700 cursor-pointer">
            <TableCell>{todo.text}</TableCell>
            <TableCell>
              <div className=" bg-green-600/40 w-20 capitalize rounded-md p-1 text-center">
                {todo.status}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <button className=" mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-orange-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
              <button onClick={() => handleDelete(todo.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-red-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
