/**
 * TodoContext
 *
 * @package contexts
 */
import { useContext, createContext } from "react";
import { useTodo } from "../hooks/useTodo.js";

/**
 * TodoContext
 */
const TodoContext = createContext({});

/**
 * TodoProvider
 * @param children
 * @constructor
 */
export const TodoProvider = ({ children }) => {
  // カスタムフックから状態とロジックを呼び出してコンテキストプロバイダーにあてがう
  const {
    showTodoList,
    searchKeyWord,
    addInputValue,
    DisplayTodo,
    onChangeSetSearchKeyWord,
    onChangeAddTodo,
    handleAddTodo,
    deleteTodo
  } = useTodo();

  return (
    <TodoContext.Provider
      value={{
        addInputValue,
        searchKeyWord,
        showTodoList,
        DisplayTodo,
        onChangeAddTodo,
        handleAddTodo,
        deleteTodo,
        onChangeSetSearchKeyWord,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

/**
 * useTodoContext
 */
export const useTodoContext = () => useContext(TodoContext);
