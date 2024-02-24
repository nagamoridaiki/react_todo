import { useState, useMemo } from "react";
import { defaultTodo } from "../../../common/index.js";
import styles from './style.module.css'
import { TodoList } from "../../organisms/TodoList"
import { AddTodo } from "../../organisms/AddTodo"
import { SearchArea } from "../../atoms/SearchArea"

export const TodoTemplate = () => {

  // 表示用Todoリスト
  const [showTodoList, setTodoList] = useState(defaultTodo);

  // 検索用キーワード
  const [searchKeyWord, setSearchKeyWord] = useState('');

  // 追加用タスク
  const [addInputValue, setAddTodo] = useState("");

  // 採番Todoリスト
  const [todoId, setTodoId] = useState(showTodoList.length);

  // Todoリスト表示ロジック
  const DisplayTodo = useMemo(() => {
    return showTodoList.filter((todo) => {
      const regexp = new RegExp("^" + searchKeyWord, "i");
      return todo.name.match(regexp);
    })
  }, [showTodoList, searchKeyWord]);

  // 検索用キーワードの変更
  const onChangeSetSearchKeyWord = (e) => setSearchKeyWord(e.target.value);

  // 追加用todoの変更
  const onChangeAddTodo = (e) => setAddTodo(e.target.value);

  // 追加todoロジック
  const handleAddTodo = (e) => {
    if (e.key == "Enter" && addInputValue != '') {
      const nextTodoid = todoId + 1

      const newTodoList = [
        ...showTodoList,
        {
          id: nextTodoid,
          name: addInputValue
        }
      ];

      console.log("newTodoListの中身", newTodoList)
      setTodoList(newTodoList);
      // 採番IDを更新
      setTodoId(nextTodoid);
      // todo追加後、値をリセット
      setAddTodo("");
    }
  }

  // todo削除
  const deleteTodo = (targetId, targetName) => {
    if (window.confirm(`${targetName}のタスクを削除しますか`)) {
      const afterDeletedTodoList = showTodoList.filter(list => list.id !== targetId);
      setTodoList(afterDeletedTodoList)
    }
  }

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