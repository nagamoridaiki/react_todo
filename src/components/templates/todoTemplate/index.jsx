import styles from './style.module.css'
import { TodoList } from "../../organisms/TodoList"
import { AddTodo } from "../../organisms/AddTodo"
import { SearchArea } from "../../atoms/SearchArea"
import { useTodo } from "../../../hooks/useTodo.js"

export const TodoTemplate = () => {

  const [
    {
      searchKeyWord,
      addInputValue,
      DisplayTodo
    },
    {
      onChangeSetSearchKeyWord,
      onChangeAddTodo,
      handleAddTodo,
      deleteTodo
    }
   ] = useTodo();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todo List</h1>
      <section className={styles.common}>
        <AddTodo
          addInputValue={addInputValue}
          onChangeAddTodo={onChangeAddTodo}
          handleAddTodo={handleAddTodo}
        />
      </section>
      <section className={styles.common}>
        <SearchArea
          searchKeyWord={searchKeyWord}
          placeholder={"Search Keyword"}
          onChangeSetSearchKeyWord={onChangeSetSearchKeyWord}
        />
      </section>
      <section className={styles.common}>
        {DisplayTodo.length > 0 && (
          <TodoList
            todoList={DisplayTodo}
            handleDeleteTodo={deleteTodo}
          />
        )}
      </section>
    </div>
  );
};