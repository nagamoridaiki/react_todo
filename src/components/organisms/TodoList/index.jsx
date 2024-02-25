
import styles from "./style.module.css";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TodoList = (props) => {
  const { todoList, handleDeleteTodo } = props;

  return (
      <ul className={styles.list}>
      {todoList.map((list) => (
          <li key={list.id} role={`todo-list-${list.id}`} className={styles.todo}>
            <span role={`todo-list-name-${list.id}`} class={styles.task}>{list.name}</span>
            <div
              role={`delete-todo-button-${list.id}`}
              class={styles.far}
              onClick={() => handleDeleteTodo(list.id, list.name)}
            >
              {/* https://www.digitalocean.com/community/tutorials/how-to-use-font-awesome-5-with-react-ja */}
              <FontAwesomeIcon
                icon={faTrashAlt}
                size="lg"
              />
            </div>
          </li>
      ))}
      </ul>
  )
}
