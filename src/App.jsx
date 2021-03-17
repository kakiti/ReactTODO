import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodo } from "./components/IncompleteTodo";
import { CompleteTodo } from "./components/CompleteTodo";

export const App = () => {
  const [todoText, setTodoText] = useState("");

  const [incompleteTodos, setIncompleteTodos] = useState([]);

  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  //削除ボタンの機能
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  //完了ボタンの機能
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  //戻すボタンの機能
  const onClickBack = (index) => {
    //現在の完了リストを取得
    const newCompleteTodos = [...completeTodos];
    //現在の完了リストから渡されたindex番目の要素を削除
    newCompleteTodos.splice(index, 1); //現在の未完了リストとindex番目の完了リストの要素を順番に並べた配列を取得

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    //spliceで削除後の完了リストにstate(completeTodos)を変更
    setCompleteTodos(newCompleteTodos);
    //未完了リストと完了リストを合わせた配列にstate(incompleteTodos)を変更
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるtodoは5個までです</p>
      )}
      <IncompleteTodo
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodo todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};

//onChange→フォームの入力などでイベントが発生した時に、指定した関数を実行できる。
//この時、引数に使用したHTMLの要素を丸々一つ引数として渡すことができる。
//target→イベントが起きたHTMLの要素を取得できる。

//map関数のindex→ここには配列の順番が入る。
//map関数内でonClickを使用するときは、その引数をアロー関数で関数かしてあげる必要がある。(indexを渡してあげるため)

//splice関数→配列の指定した要素を取り除く関数。第一引数に削除したい要素がある配列の順番、第二引数に削除したい数を記述する。
//第二引数で指定した数は、第一引数で指定した数から順番に削除される。

//コンポーネント化のメリットはコードをわかりやすくできるのと、他のファイルでも使いまわせるようになること

//disabled→フォーム要素の機能を無効にする属性。これがtrueの時、要素の機能は無効になる。
