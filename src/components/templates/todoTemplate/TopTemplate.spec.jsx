import { describe, expect, test, beforeEach, afterEach, vi } from "vitest";
import { TodoTemplate } from "./index.jsx";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("【integration test】Top Templateのテスト", () => {
  describe("Todoリスト表示テスト", () => {
    afterEach(() => cleanup());
    test("【正常系】", () => {
      render(<TodoTemplate />);
      // 「Todo1」のdomが表示されていること
      expect(screen.getByRole("todo-list-1")).toBeTruthy();
      // 「Todo2」のdomが表示されていること
      expect(screen.getByRole("todo-list-2")).toBeTruthy();
    });
  });

  describe("Todo追加処理のテスト", () => {
    afterEach(() => cleanup());

    test("【正常系】Todoリストが追加されること", async () => {
      render(<TodoTemplate />);
      const inputValue = "Todo3";
      const addInputForm = screen.getByRole("add-todo-input-form");

      // userEvent.typeで「ユーザーが操作する」処理を実施
      // インプットフォームに「Todo3」を入力
      await userEvent.type(addInputForm, inputValue);
      // インプットフォームにフォーカスした状態で「enter」をクリック (Todoを追加させる)
      await userEvent.type(screen.getByRole("add-todo-input-form"), "{enter}");

      expect(screen.getByRole("todo-list-3")).toBeTruthy();
      expect(screen.getByRole("todo-list-name-3").textContent).toBe(inputValue);
    });

    test("【正常系】inputの値が空の場合、Todoは追加されないこと", async () => {
      render(<TodoTemplate />);
      const inputValue = " ";
      const addInputForm = screen.getByRole("add-todo-input-form");

      await userEvent.type(addInputForm, inputValue);
      await userEvent.type(screen.getByRole("add-todo-input-form"), "{enter}");

      try {
        // 存在しないDomを取得しようとしてエラーとなるので、try~catchを実施
        screen.findByRole("todo-list-3");
      } catch (err) {
        expect(err).toBeTruthy();
      }
    });
  })

  describe("Todo削除処理のテスト", () => {
    afterEach(() => cleanup());

    test("【正常系】Todoが削除できること", async () => {
      // alertをモック化
      // OKボタンをクリックしたことにする
      window.confirm = vi.fn().mockReturnValueOnce(true);
      render(<TodoTemplate />);

      //「Todo1」の削除ボタンをクリック
      await userEvent.click(screen.getByRole("delete-todo-button-1"));
      try {
        screen.findByRole("todo-list-1");
      } catch (err) {
        expect(err).toBeTruthy();
      }
      expect(screen.findByRole("todo-list-2")).toBeTruthy();
    });

    test("【正常系】confirmでキャンセルをクリックした場合、todoは削除されないこと", async () => {
      // alertをモック化
      // キャンセルボタンをクリックしたことにする
      window.confirm = vi.fn().mockReturnValueOnce(false);
      render(<TodoTemplate />);

      //「Todo1」の削除ボタンをクリック
      await userEvent.click(screen.getByRole("delete-todo-button-1"));
      expect(screen.findByRole("todo-list-1")).toBeTruthy();
    });
  });

  describe("Todo検索処理のテスト", () => {
    afterEach(() => cleanup());
    test("【正常系】「Todo1」を検索した際に、該当のdomだけ表示されること", async () => {
      const searchKeyword = "Todo1";
      render(<TodoTemplate />);

      // 検索フォームに「Todo1」を入力
      await userEvent.type(
        screen.getByRole("search-todo-input-form"),
        searchKeyword
      );
      // 「Todo1」のみ表示されること
      expect(screen.findByRole("todo-list-1")).toBeTruthy();
      try {
        screen.findByRole("todo-list-2");
      } catch (err) {
        expect(err).toBeTruthy();
      }
    });
  });
});
