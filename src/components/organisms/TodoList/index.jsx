
import styles from "./style.module.css";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TodoList = (props) => {
  const { todoList, handleDeleteTodo } = props;

  console.log("todoListの中身", todoList)

  return (
      <ul className={styles.list}>
      {todoList.map((list) => (
          <li key={list.id} className={styles.todo}>
            <span class={styles.task}>{list.name}</span>
            <div class={styles.far}>
              {/* https://www.digitalocean.com/community/tutorials/how-to-use-font-awesome-5-with-react-ja */}
              <FontAwesomeIcon
                icon={faTrashAlt}
                size="lg"
                onClick={() => handleDeleteTodo(list.id, list.name)}
              />
            </div>
          </li>
      ))}
      </ul>
  )
}
