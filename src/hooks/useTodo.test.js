import { describe, expect, test, beforeEach, vi } from "vitest";
import sinon from 'sinon';
import { renderHook, act } from "@testing-library/react";
import { useTodo } from "./useTodo.js";
import { defaultTodo } from "../common/index.js";

describe('【Hooksテスト】useApp test', () => {
  describe('【関数テスト】onChangeAddInputValue', () => {
    test('【正常系】addInputValueを更新できること', () => {
      const expectValue = 'テスト'
      const eventObject = {
        target: {
          value: expectValue
        }
      }
      const { result } = renderHook(() => useTodo());
      expect(result.current[0].addInputValue).toBe("");
      act(() => result.current[1].onChangeAddTodo(eventObject))
      expect(result.current[0].addInputValue).toBe(expectValue)
    })
  })
})

describe("【関数テスト】handleAddTodo", () => {
  let expectTodoList = [];
  let eventObject
  beforeEach(() => {
    eventObject = {
      target: {
        value: "テスト",
      },
      key: "Enter",
    };
  });

  test("【正常系】todoList, uniqueIdが更新されること、addInputValueがリセットされること", () => {
    const expectTodoTitle = "Todo3";
    expectTodoList = defaultTodo.concat({
      id: 3,
      name: expectTodoTitle,
    });
    eventObject.target.value = expectTodoTitle;

    const { result } = renderHook(() => useTodo());
    act(() => result.current[1].onChangeAddTodo(eventObject))
    expect(result.current[0].addInputValue).toBe(expectTodoTitle);

    act(() => result.current[1].handleAddTodo(eventObject))
    expect(result.current[0].showTodoList).toEqual(expectTodoList);
    expect(result.current[0].addInputValue).toBe("");
  })

  test("【正常系】エンターキーを押していない場合、処理が発生しないこと", () => {
    const expectTodoTitle = "Todo4";
    expectTodoList = defaultTodo.concat({
      id: 4,
      name: expectTodoTitle,
    });
    eventObject.target.value = expectTodoTitle;
    eventObject.key = "";

    const { result } = renderHook(() => useTodo());
    act(() => result.current[1].onChangeAddTodo(eventObject))
    expect(result.current[0].addInputValue).toBe(expectTodoTitle);

    act(() => result.current[1].handleAddTodo(eventObject))
    expect(result.current[0].showTodoList).not.toEqual(expectTodoList);
    expect(result.current[0].addInputValue).not.toBe("");
  })
  test("【正常系】入力値がない場合、処理が発生しないこと", () => {
    const expectTodoTitle = "Todo5";
    expectTodoList = defaultTodo.concat({
      id: 4,
      name: expectTodoTitle,
    });
    eventObject.target.value = "";
    eventObject.key = "";

    const { result } = renderHook(() => useTodo());
    act(() => result.current[1].onChangeAddTodo(eventObject))
    expect(result.current[0].addInputValue).toBe("");

    act(() => result.current[1].handleAddTodo(eventObject))
    expect(result.current[0].showTodoList).not.toEqual(expectTodoList);
  })

  describe("【関数テスト】DeleteTodo", () => {
    let expectTodoList = [];
    beforeEach(() => {
      expectTodoList = [];
    });

    test("【正常系】todoが削除されること", () => {
      const targetId = 1;
      const targetTitle = "ここは何でもいい"
      window.confirm = vi.fn().mockReturnValueOnce(true);

      expectTodoList = defaultTodo.filter((todo) => todo.id !== targetId);

      const { result } = renderHook(() => useTodo());
      act(() => result.current[1].deleteTodo(targetId, targetTitle));
      expect(result.current[0].showTodoList).toEqual(expectTodoList);
    });

    test("【正常系】confirmでキャンセルをクリックした場合、todoが削除されないこと", () => {
      // 引数
      const targetId = 1;
      const targetTitle = "テスト";

      // window.confirmをモック化
      // confirmでキャンセルをクリックした場合
      window.confirm = vi.fn().mockReturnValueOnce(false);
      expectTodoList = defaultTodo;
      const { result } = renderHook(() => useTodo());
      act(() => result.current[1].deleteTodo(targetId, targetTitle));
      // 表示用TodoListが予想通り更新されないこと
      expect(result.current[0].showTodoList).toEqual(expectTodoList);
    });
  })

  describe("【関数テスト】handleSearchTodo", () => {
    test("【正常系】検索ワードがない場合、元のTodoリストが反映される", () => {
      const searchInputValue = {
        target: {
          value: ""
        }
      }

      const { result } = renderHook(() => useTodo());
      act(() => {result.current[1].onChangeSetSearchKeyWord(searchInputValue)})
      expect(result.current[0].DisplayTodo).toEqual(defaultTodo);
    })
  })

  test("【正常系】検索ワードがある場合、検索された結果が反映される", () => {
    const expectValue = [defaultTodo[0]];
    const searchInputValue = {
      target: {
        value: "Todo1",
      },
    };

    const { result } = renderHook(() => useTodo());
    act(() => result.current[1].onChangeSetSearchKeyWord(searchInputValue));
    expect(result.current[0].DisplayTodo).toEqual(expectValue);
  });
})
