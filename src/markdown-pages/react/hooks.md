---
slug: "/blog/react/hooks"
date: "2022-03-24"
title: "여러가지 React 프로젝트를 클론 코딩하면서 배운 것"
tags: ["javascript", "react", "hooks"]
---

> TLDR 단순 정리

클론 코딩을 하면서 React를 공부했다. 공부하면서 주입되는 건 많은데 정리를 게을리했다. 애초에 '나중에 한방에 정리해야지'라고 생각하고 넘어갔기 때문이다. 개발자의 세계에서 나중은 결코 오지 않는다. 그래서 시간이 좀 걸리더라도 지금까지 리액트 프로젝트를 하면서 배운 것을 정리한다.

## ENV SETTING

환경 설정은 나에게 맞는 것을 선택해서 하면 된다. 많은 사람들이 create-react-app으로 리액트를 사용한다.

1. 처음부터 리액트를 세팅하는 방법도 있다. 아티클을 참고하는 편이 좋다.

   - <a href="https://dev.to/underscorecode/creating-your-react-project-from-scratch-without-create-react-app-the-complete-guide-4kbc" target="_blank">Creating your React project from scratch without create-react-app: The Complete Guide.</a>

2. create-react-app

```shell
$ npx create-react-app your-project-name
$ cd your-project-name
$ npm start
```

3. create-react-app with Typescript

```shell
$ npx create-react-app your-project-name --template typescript
$ cd your-project-name
$ npm start
```

4. react with vite

```shell
$ npm create vite@latest
// 나에게 맞는 환경 선택
$ cd my-project
$ npm install
$ npm start
```

## HOOKS

React Hook은 [React v16.8부터 React 요소로 추가](https://ko.reactjs.org/docs/hooks-intro.html)되었다. React Hook은 함수형 컴포넌트에서 상태 관리를 함수형으로 할 수 있도록 도와준다.

### 규칙

1. 최상위 레벨에서만 사용해야한다. 반복문, 조건문, 중첨 함수 내에서 사용하지 말 것!
2. React 함수 컴포넌트 안에서만 호출할 것!(custom hook 예외) 일반 자바스크립트 함수 내에 포함되면 안된다.

> [✌️ Hook 사용 규칙](https://ko.reactjs.org/docs/hooks-overview.html#rules-of-hooks)

### useState

1. usage

- 좋은 예는 아니라고 합니다.

```jsx
const [number, setNumber] = useState(0);

return (
  <>
    <button onClick={() => setNumber(number + 1)}>숫자 증가</button>
  </>
);
```

> 인용
> [보통 변수가 이전 상태에 의존을 갖고 있다면 setVarA(varA => varA + 1)같은 방법을 이용해야 한다.](https://ui.toast.com/weekly-pick/ko_20200916)

_의존성을 갖게 되는 예제는 무엇이 있을까 생각해보다가 아래 코드를 작성해보았다. 하지만 아래 코드처럼 state를 변경하는데 '굳이...이렇게?'라는 생각이 들었다._

```jsx
export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [submit, setSubmit] = useState("");
  const [state, setState] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    setSubmit(inputValue);
  };

  useEffect(() => {
    // 이 부분은 그냥 setState([...state, submit])으로 해도 되지 않을까?

    setState(value => [...value, submit]);
  }, [submit]);

  console.log(state);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={inputValue}
          type="text"
          onChange={e => setInputValue(e.target.value)}
        />
      </form>
      <div></div>
    </>
  );
}
```

### useEffect

useEffect는 매 랜더링 후 실행된다.

기본적인 usage는 다음과 같다.

1. effect 두번째 값으로 '의존성 배열'이 들어간다. 배열에 들어가는 값은 이펙트에게 무엇이 변하는지 알려주어 이펙트가 실행되도록 하게 한다.
2. effect 안에서 의존하는 값은 반드시 의존성 배열에 입력되어야한다. 그렇지 않으면 의도한대로 어플리케이션이 동작하지 않을 수 있다.
3. 만약 랜더링 시점에서 한번만 실행되고 싶다면 의존성 배열에 아무런 값을 추가하지 않을 수 있다.
4. 예시

```jsx
useEffect(() => {
  setState(s => s + 1);
}, []);
```

#### Clean Up

```jsx
useEffect(() => {
  return () => somthing(s => s + 1);
}, []);
```

이렇게 쓰는 이유가 뭘까? _사이드 이펙트로 인해 생길 수 있는 메모리 누수를 막기 위해서라고 한다._ 메모리 누수 경고 에러를 만나기 전까지 clean up이 있다는 것만 알고 넘어가려고 한다.

> 참조  
> [How to fetch data with React Hooks](https://www.robinwieruch.de/react-hooks-fetch-data/)  
> [useEffect 완전 정복](https://overreacted.io/ko/a-complete-guide-to-useeffect/#%EA%B7%B8%EB%9F%AC%EB%A9%B4-%ED%81%B4%EB%A6%B0%EC%97%85cleanup%EC%9D%80-%EB%AD%90%EC%A7%80)

#### useEffect와 custom hook

> 코드 카피
> [How to fetch data with React Hooks](https://www.robinwieruch.de/react-hooks-fetch-data/)

이전에 만들었던 useFetch를 위에 아티클을 보고 새롭게 바꿨다. url 값이 변경되었을 때와 error handleing 그리고 clean-up이 추가되어있다. 거의 코드를 배꼈다.

_old useFetch_

```jsx
export const useFetch = url => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async url => {
      try {
        const response = await fetch(url, {
          method: "GET",
          header: { "Access-Control-Allow-Origin": "*" },
        });
        setData(await response.json());
      } catch (e) {
        console.log(e);
        new Error("오류가 발생했습니다.");
      }
    };

    fetchData(url);
  }, []);

  return data;
};
```

_NEW!! useFetch_

```jsx
export const useFetch = initialUrl => {
  const [url, setUrl] = useState(initialUrl);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async url => {
      try {
        if (!didCancel) {
          const response = await fetch(url, {
            method: "GET",
            header: { "Access-Control-Allow-Origin": "*" },
          });
          setData(await response.json());
        }
      } catch (e) {
        if (!didCancel) {
          setError(true);
        }
      }
    };

    fetchData(url);

    return () => {
      didCancel = true;
    };
  }, [url]);

  return [{ data, error }, setUrl];
};
```

### useRef

useRef는 .current프로퍼티에 변경 가능한 값을 담고있는 상자라고 한다. 꼭 [HTML 엘리먼트일 필요는 없다.](https://ko.reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables)

useRef는 내용이 변경될 때 그것을 알려주지 않는다. 만약 DOM 노드를 측정하려면 [useCallback을 사용](https://ko.reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node)하는 것이 좋다고 한다.

_useRef 로깅 값_

```
current: HTMLInputElement
attributes: Object
type: "text"
__proto__: Object
innerHTML: ""
nodeType: 1
tagName: "input"
__proto__: HTMLInputElement
```

```jsx
const App = () => {
  const inputEl = useRef(null);

  const onButtonClick = () => {
    inputEl.current.focus();
  };

  return (
    <form>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>제출</button>
    </form>
  );
};
```

> 참조  
> [useRef](https://ko.reactjs.org/docs/hooks-reference.html#useref)

### useContext

useContext는 Context API와 함께 사용되어야한다.

> useContext는 context 객체를 받아 그 context의 현재값을 반환한다. context의 현재 값은 트리 안에서 이 Hook을 호출하는 컴포넌트에 가장 가까이에 있는 <MyContext.Provider>의 value prop에 의해 결정됩니다.
> [useContext](https://ko.reactjs.org/docs/hooks-reference.html#usecontext)

```jsx
// Todo.jsx
import React from "react";

export const TodoContext = React.createContext();

const Todo = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  ...중략

  return (
    <TodoContext.Provider value={{ todos, dispatch, loading }}>
      {props.children}
    </TodoContext.Provider>
  );
};

// Item.jsx
import {TodoContext} from "./Todo.jsx"
const Item = ({ todo }) => {
  const { dispatch } = useContext(TodoContext);

  const toggleItem = (e) => {
    const id = e.target.dataset.id;
    dispatch({ type: "CHANGE_TODO_STATUS", payload: id });
  };

  return (
    <li data-id={todo.id} onClick={toggleItem}>{todo.name}
    </li>
  );
};

export default Item;
```

code 출처 : [코드 스테이츠 - React Hook 알아보기](https://youtube.com/playlist?list=PLAHa1zfLtLiMukrBDWr-o0q-At7oARwXv)

useContext를 사용하면 하위 컴포넌트에 props을 일일이 전달하지 않고 Context에 의해서 생성된 객체 값을 사용할 수 있다.

하지만 useContext는 어떤 값의 변화를 감지하지 못하기 때문에 변화를 감지해서 적용하는 코드를 따로 작성해야 한다.

그럼 useContext와 Context API가 있는데 굳이 redux를 사용하는 이유는 무엇일까?

> 질문  
> Context API가 있는데 Redux를 사용하는 이유는 무엇일까?
> 답  
> 리덕스와의 주요 차이는 성능 면에서 나타나게 됩니다. 리덕스에서는 컴포넌트에서 글로벌 상태의 특정 값을 의존하게 될 때 해당 값이 바뀔 때에만 리렌더링이 되도록 최적화가 되어있습니다. 따라서, 글로벌 상태 중 의존하지 않는 값이 바뀌게 될 때에는 컴포넌트에서 낭비 렌더링이 발생하지 않겠지요. 반면 Context에는 이러한 성능 최적화가 이뤄지지 않았습니다. 컴포넌트에서 만약 Context의 특정 값을 의존하는 경우, 해당 값 말고 다른 값이 변경 될 때에도 컴포넌트에서는 리렌더링이 발생하게 됩니다. ...중략... 따라서, 글로벌 상태가 다양해지는 경우는 Context 의 사용은 적합하지 않을 수 있다고 말씀을 드리고 싶습니다.
> [RIDI 개발자 블로그 - 리덕스 잘 쓰고 계시나요?](https://ridicorp.com/story/how-to-use-redux-in-ridi/)

### useReducer

useReducer는 useState의 대체 함수다. 다수의 하윗값을 포함하는 경우, 이전 상태에 의존성이 높은 경우 useReducer를 선호한다.

1. usage

```jsx
import React, { useReducer } from "react";

function reducer(state, { type, payload }) {
  switch (type) {
    case "ADD_NEW_VALUE":
      return [...state, payload];
    case "DELETE_VALUE":
      const newState = state.filter(value => value.id !== payload);
      return newState;
    default:
      throw new Error();
  }
}

const User = ({ dispatch, id, name, age }) => {
  const handleDeleteUser = () => {
    dispatch({ type: "DELETE_VALUE", payload: id });
  };

  return (
    <div data-id={id}>
      {name}, {age}
      <button onClick={handleDeleteUser}>삭제</button>
    </div>
  );
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, [
    { id: 1, name: "ko", age: 22 },
  ]);

  return (
    <>
      {state.map(value => (
        <User dispatch={dispatch} {...value} />
      ))}
    </>
  );
}
```

useReducer는 Proxy와 많이 닮았다고 생각했다.

## 마무리

한 일주일간 복습하면서 나름 공부했던 것을 정리했다. 정리를 하면서 새롭게 알게된 것이 많은 부분은 useEffect을 사용하는 방법이었다. 가장 이해가 안되는 부분은 useEffect의 clean up이었다. 언제 사용해야하는지를 모르겠다. 그래서 나름 생각한건 일단 오류를 만나게 되면 그때 clean up을 적용해보기로 했다.

그동안 공부를 많이 했다고 생각했는데 생각보다 React에 대해서 아는게 많이 없다. 개인적으로 React로 이것 저것 많이 만들어봤다고 생각했는데 왜 이렇게 아는게 없을까... 슬프다. 하지만 어찌됐든 계속 나 스스로 뭔가를 만들어보면서 겪는 문제들로 부터 배우는 것이 많은 것 같다. 갑자기 생각이 든건 빨리 팀 프로젝트를 함께 할 사람을 찾아야겠다.

앞으로도 정리해야 할 것이 많다. 그동안 손놓고 있지는 않았지만 마음이 급해서 그런것도 있고, 단순하게 어떤 사용 방법을 찾아봐야지 했다가 덩어리가 너무 커서 어디까지 끊어야할지 판단이 서지 않아서 그랬던 것도 있는 것 같다. 공부해야할 것을 단위별로 잘 나누는 것도 실력인것 같다.

## Appendix. React를 공부하면서 찾은 유용한 콘텐츠.

1. [노마드 코더 - ReactJS로 영화 앱 만들어보기](https://nomadcoders.co/react-for-beginners/lobby)

   - 개인적으로 가장 좋았던 강의 React 기초부터 친절하게 알려준다. 그 밖에 무료 강의들이 정말 많다.

2. [Conding Addict - React Projects](https://youtu.be/ly3m6mv5qvg)

   - React Hook을 배웠다면 반복해서 만들어보기 좋다. 보면서 따라만드는 것도 좋지만 완성된 것을 보고 먼저 만들어보고 막혔거나 노하우를 알고 싶으면 세부 사항을 보는게 좋은 것 같다.

3. [코드 스테이츠 - React Hook 알아보기](https://youtube.com/playlist?list=PLAHa1zfLtLiMukrBDWr-o0q-At7oARwXv)

   - ToDo App을 만들면서 useState, useEffect, useContext, useReducer 사용 방법을 배우게 된다.

4. [벨로퍼트와 함께하는 모던 리액트](https://react.vlpt.us/)
   - 설명이 너무 잘 되어있다. React Hook 공부 할 때 많이 봤다.
