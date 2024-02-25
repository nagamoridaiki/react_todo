/**
 * useTodoCreateTemplate
 *
 * @package hooks
 */
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_PATH } from "../../../constants/navigations";

/**
 * useTodoCreateTemplate
 * @param addTodo
 * @returns {[{inputTitle: string, inputContent: string},{handleCreateTodo: ((function(*): void)|*), handleChangeContent: (function(*): void), handleChangeTitle: (function(*): void)}]}
 */
export const useTodoCreateTemplate = ({ addTodo }) => {
  const navigate = useNavigate();

  /* local state */
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  /**
   * 「title」変更処理
   * @type {function(*): void}
   */
  const handleChangeTitle = useCallback(
    (e) => setInputTitle(e.target.value),
    []
  );

  /**
   * 「content」変更処理
   * @type {function(*): void}
   */
  const handleChangeContent = useCallback(
    (e) => setInputContent(e.target.value),
    []
  );

  /**
   * Todo追加処理
   * @type {(function(*): void)|*}
   */
  const handleCreateTodo = useCallback(
    (e) => {
      e.preventDefault();
      if (inputTitle !== "" && inputContent !== "") {
        addTodo(inputTitle, inputContent);
        navigate(NAVIGATION_PATH.TOP);
      }
    },
    [addTodo, inputTitle, inputContent, navigate]
  );

  const states = {
    inputTitle,
    inputContent,
  };

  const actions = {
    handleChangeTitle,
    handleChangeContent,
    handleCreateTodo,
  };

  return [states, actions];
};
