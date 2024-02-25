import { useState } from "react";
import { defaultTodo } from "../common";
import { TodoProvider } from "../contexts/TodoContext.jsx";
import { TodoTemplate } from "../components/templates/todoTemplate/index.jsx";


export const Todo = () => (
  <TodoProvider>
    <TodoTemplate />
  </TodoProvider>
);
