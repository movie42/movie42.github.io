---
slug: "/blog/test/test-practice-2-recoil"
date: "2022-06-04"
title: "React Testing Library 연습(2) - Recoil과 테스트"
tags: ["test", "basic", "summary", "react", "front-end"]
---

Test 코드를 작성하는 방법은 [velopert의 TDD 개발 흐름으로 투두리스트 만들기](https://velog.io/@velopert/tdd-with-react-testing-library)와 [The Net Nija의 React Testing Library](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gm4_-5UsNmLqMosM-dzuvQ) 튜토리얼을 따라하면서 작성하는 방법을 익혔다.

React로 개발을 하다보면 다양한 library를 사용하게 된다. 대표적으로 상태 관리 도구를 사용하는 환경에서 React 상태를 관리하게 된다. 나는 Recoil을 사용하는 상태 관리 도구로 사용하는 환경에서 TDD를 하는 방법을 연습하였다.

## Recoil 테스트

> 코드 참조  
> [https://codesandbox.io/s/testing-recoil-fctje?file=/src/Message.tsx](https://codesandbox.io/s/testing-recoil-fctje?file=/src/Message.tsx)

Recoil은 atom으로 개발자가 관리하려는 상태 값을 생성한다. 원자 단위로 상태를 관리한다는 의미에서 atom이라고 이름을 짓지 않았나 생각해본다.

```tsx
import { atom } from "recoil";

export enum State {
  TODO = "todo",
  DONE = "done",
}

export interface ToDo {
  id: string;
  name: string;
  state: State;
}

export const todoState = atom<ToDo[]>({
  key: "todo",
  default: [],
});
```

생성된 atom은 컴포넌트 안에서 useRecoilState라는 훅으로 사용할 수 있다. useState와 사용 방법이 똑같다. 다만 훅 안에는 초기값으로 내가 사용하려는 상태의 atom을 넣어 주어야한다.

```tsx
import React from "react";
import { useRecoilState } from "recoil";
import { todoState } from "../../atom/TodoState";
import TodoItem from "../TodoItem/TodoItem";

interface ITodoItemContainerProps {}

const TodoItemContainer = () => {
  const [todos, setTodos] = useRecoilState(todoState);

  return (
    <ul data-testid="todo-list-container">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoItemContainer;
```

atom은 renderHook을 사용해서 atom에 데이터가 입력이 잘 되는지 테스트 할 수 있다. 문제점은 넣으려는 데이터의 타입이 다르더라도 테스트 케이스는 통과하게 된다. 물론 타입스크립트에서 타입이 잘못 되었다고 에러를 표시해주긴한다. 아마도 타입이 다른 경우에는 타입 스크립트가 잘못되었다고 알려주기 때문에 타입까지 테스트를 시도하지 않아도 되는 것 같다.

```tsx
import { useEffect } from "react";
import { renderHook } from "@testing-library/react";
import { State } from "../../lib/interface/todoInterface";
import { RecoilRoot, useSetRecoilState, useRecoilValue } from "recoil";
import { todoState } from "../TodoState";

it("recoil state 상태 테스트", async () => {
  const query = {
    id: "15251",
    name: "달리기",
    state: State.TODO,
  };

  const { result } = renderHook(
    () => {
      const setTodos = useSetRecoilState(todoState);
      useEffect(() => {
        setTodos(pre => [...pre, query]);
      }, [setTodos]);

      return useRecoilValue(todoState);
    },
    {
      wrapper: RecoilRoot,
    }
  );

  expect(result.current.length).toEqual(1);
});
```

## 전역 상태를 컴포넌트에서 테스트하기

전역 상태를 기반으로 컴포넌트를 만들면 상태를 컴포넌트에서 컴포넌트로 전달하지 않고 상태를 관리할 수 있다. 하지만 테스트를 할 때 다음과 같은 테스트 실패를 만나게 되었다.

```shell
● TodoItemContainer › TodoItemContainer에는 list가 출력되어야합니다.

    TestingLibraryElementError: Unable to find an element with the text: 달리기. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.

    Ignored nodes: comments, <script />, <style />
    <body>
      <div>
        <ul />
      </div>
    </body>

      18 |     const { getByText } = renderTodoList(todos);
      19 |
    > 20 |     getByText("달리기");
         |     ^
      21 |   });
      22 | });
      23 |
```

TodoItemContainer는 TodoItem 컴포넌트를 list item으로 출력한다.

```jsx
import React from "react";
import { useRecoilState } from "recoil";
import { todoState } from "../../atom/TodoState";
import { ToDo } from "../../lib/interface/todoInterface";
import TodoItem from "../TodoItem/TodoItem";

interface ITodoItemContainerProps {}

const TodoItemContainer = () => {
  const [todos, setTodos] = useRecoilState(todoState);

  const handleRemoveItem = (id: ToDo["id"]) => {
    setTodos(pre => pre.filter(item => item.id !== id));
  };

  return (
    <ul data-testid="todo-list-container">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleRemoveItem={handleRemoveItem}
        />
      ))}
    </ul>
  );
};

export default TodoItemContainer;
```

하지만 터미널에 출력된 스냅샷을 보면 item이 출력되지 않았다. 아마도 test 환경에서 todos가 무엇인지 잘 모르는 것 같았다. 처음에 beforeAll을 사용해서 renderHook을 사용해 값을 넣어주면 todos가 어떤 것인지 이해할 수 있을 줄 알았지만 여전히 계속 실패했다. 그러던 와중에 깃헙에서 [saseungmin](https://github.com/saseungmin)의 코드를 보게 되었다.

> 코드 참조  
> [saseungmin/Recoil_ToDo](https://github.com/saseungmin/Recoil_ToDo)

코드를 보니 상태 값을 Injection하는 컴포넌트를 먼저 넣고 테스트를 하는 것을 발견했다. 그래서 나도 똑같이 따라 만들었다.

1. 먼저 InjectTestingRecoilState.tsx를 작성한다.

```tsx
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { todoState } from "../atom/TodoState";
import { ToDo } from "../lib/interface/todoInterface";

interface IInjectTestingRecoilStateProps {
  todos: ToDo[];
}

const InjectTestingRecoilState = ({
  todos,
}: IInjectTestingRecoilStateProps) => {
  const setTodos = useSetRecoilState(todoState);
  useEffect(() => {
    setTodos(todos);
  }, []);
  return null;
};

export default InjectTestingRecoilState;
```

1. 그 후에 TodoItemContainer.test.tsx를 작성한다.

```tsx
import { fireEvent, render } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import InjectTestingRecoilState from "../../../Common/InjectTestingRecoilState";
import { State, ToDo } from "../../../lib/interface/todoInterface";
import TodoItemContainer from "../TodoItemContainer";

describe(`TodoItemContainer`, () => {
  const todos = [{ id: "1234", name: "달리기", state: State.TODO }];
  const renderTodoItemContainer = (todos: ToDo[]) =>
    render(
      <>
        <InjectTestingRecoilState todos={todos} />
        <TodoItemContainer />
      </>,
      { wrapper: RecoilRoot }
    );

  it("TodoItemContainer에는 list가 출력되어야합니다. 리스트에는 todo 제목과 버튼이 있어야합니다.", () => {
    const { getByText } = renderTodoItemContainer(todos);
    getByText("달리기") as HTMLLIElement;
    getByText("삭제") as HTMLButtonElement;
  });

  it("삭제 버튼을 누르면 선택된 아이템이 삭제되어야합니다.", () => {
    const { getByText } = renderTodoItemContainer(todos);
    const removeButton = getByText("삭제") as HTMLButtonElement;
    const li = getByText("달리기") as HTMLLIElement;
    fireEvent.click(removeButton);
    expect(li).not.toBeInTheDocument();
  });
});
```

테스트 케이스를 통과했다.

## 마무리

이번에는 Recoil이라는 상태 도구를 사용하는 환경에서 테스트를 진행해보았다. 아직 매우 초보 수준의 테스트다. 연습을 하면서 다른 개발자의 코드를 보고 나는 아직도 배워야할게 많구나 하는 생각이 든다.

다음에는 비동기 테스팅을 진행해보려고 한다. 또 어떤 해결 과제들이 나를 기다리고 있을지 모르겠다. 가끔 구글에서 해결 방법을 찾아도 잘 나오지 않을 때 한숨이 나오긴 한다. 그래도 어디엔가 선구자가 있을 것이라고 생각한다. 시간이 지난 뒤 먼 미래에 내가 다른 사람들 보다 먼저 길을 닦아 놓는 역할을 할 수 있다면 좋겠다.

## 참조

1. [velopert의 TDD 개발 흐름으로 투두리스트 만들기](https://velog.io/@velopert/tdd-with-react-testing-library)
2. [The Net Nija의 React Testing Library](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gm4_-5UsNmLqMosM-dzuvQ)
3. [saseungmin/Recoil_ToDo](https://github.com/saseungmin/Recoil_ToDo)
4. [https://codesandbox.io/s/testing-recoil-fctje?file=/src/Message.tsx](https://codesandbox.io/s/testing-recoil-fctje?file=/src/Message.tsx)
