---
slug: "/blog/test/test-practice-1"
date: "2022-05-31"
title: "React Testing Library 연습 (1) - 테스트 익숙해지기"
tags: ["test", "basic", "summary", "react", "front-end"]
---

테스트 코드가 필요하다고 생각하게 된 계기는 어플리케이션의 상태를 내가 눈으로 직접 확인하며고 일일이 클릭해가면서 동작을 예측하는데 한계가 왔다고 느꼈기 때문이다. 이전부터 테스트가 있다는 것은 알았고 유튜브에서 떠도는 동영상을 봤지만 실상 내가 하는 프로젝트에서 테스트 코드를 작성하면서 개발을 진행하지 않았다.

세팅도 어렵게 느껴졌고 무엇보다 ‘무엇을 테스트 해야할까?’를 잘 몰랐다. 하지만 테스트가 정말 필요해진 시점에서 더이상 미룰 수가 없었다. 그래서 자료를 이것 저것 찾아보면서 테스트의 기초적인 것을 보게 되었고 먼저 테스트 코드를 작성하는 것에 익숙해지기로 했다.

**읽기 전에**

- 이 글은 튜토리얼이 아니며 다른 튜토리얼을 보고 배운 것을 정리한 글입니다. 튜토리얼은 테스트에 익숙해지기 좋은 자료를 참고하는 것을 권장합니다.
- 저의 개인적인 생각이 포함되어있습니다.(학술적이지 않음.)

> **테스트에 익숙해지기에 좋은 자료**  
> [The Net Ninja - **React Testing Library Tutorial**](https://www.youtube.com/watch?v=7dTTFW7yACQ&list=PL4cUxeGkcC9gm4_-5UsNmLqMosM-dzuvQ)  
> React Testing Library 튜토리얼이다. 테스트를 처음 시작한다면 이 강의를 보는 것이 좋은 것 같다.  
> [FEConf Korea - [A5] 프론트엔드에서 TDD가 가능하다는 것을 보여드립니다.](https://youtu.be/L1dtkLeIz-M)  
> TDD의 메커니즘에 따라 TODO 리스트를 만드는 라이브 코딩 동영상이다.  
> [벨로퍼트와 함께하는 리액트 테스팅](https://velog.io/@velopert/series/react-testing)  
> 정말 좋은 자료다. 처음부터 끝까지 따라해보면서 테스팅 감을 잡는데 많은 도움이 된다. 후반에 TDD를 경험해볼 수 있다.  
> [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)  
> 공식 문서

## 테스트를 하는 이유

참고 : [The Net Ninja - **React Testing Library Tutorial**](https://www.youtube.com/watch?v=7dTTFW7yACQ&list=PL4cUxeGkcC9gm4_-5UsNmLqMosM-dzuvQ)

1. 버그를 쉽게 잡을 수 있다.
2. 어플리케이션이 의도대로 동작할 것이라는 자신감이 높아진다.
3. 시간을 절약할 수 있다.
4. 팀 단위로 개발을 할 때, 도큐멘테이션을 하는데 도움이 된다. (테스트의 의도를 보고 기능을 설명할 수 있기 때문에라고 설명한다.)
5. 즐겁게 코딩을 할 수 있다(?)

## 테스팅 라이브러리에서 피해야 할 사항

참고 : [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

공식 문서에 나와있는 것을 구글 번역기를 돌렸다. testing library는 사용자와 상호작용하는 방법과 유사한 테스트를 중점에 둔다는 것을 기억해야겠다.

> Testing Library encourages you to avoid testing [implementation details](https://kentcdodds.com/blog/testing-implementation-details) like the internals of a component you're testing (though it's still possible). [The Guiding Principles](https://testing-library.com/docs/guiding-principles) of this library emphasize a focus on tests that closely resemble how your web pages are interacted by the users.

**테스트 라이브러리는 테스트 중인 구성 요소의 내부와 같은 구현 세부 정보를 테스트하지 않도록 권장합니다(여전히 가능하지만). 이 라이브러리의 기본 원칙은 웹 페이지가 사용자와 상호 작용하는 방식과 매우 유사한 테스트에 중점을 둡니다.**

## Test 방법

참고 : [The Net Ninja - **React Testing Library Tutorial**](https://www.youtube.com/watch?v=7dTTFW7yACQ&list=PL4cUxeGkcC9gm4_-5UsNmLqMosM-dzuvQ)

### 단위 테스트

- 고립된 상태의 개별 컴포넌트를 테스트한다.

### 통합 테스트

- 연관 된 여러 컴포넌트의 상호 작용을 테스트한다.

### E2E 테스트

- 사용자 관점에서 테스트한다. 사용자 화면 상에서 어플리케이션이 제대로 동작하는지 테스트한다.

## 세팅

세팅은 따로 하지 않았다. 테스트 자체에 익숙해지는 것이 목적이다. 바닥부터 테스트를 해야한다면 그때 가서 배우자.

- CRA를 사용한다면 React testing library가 설치되어있기 때문에 바로 테스트를 시작할 수 있다.
- 바닥부터 세팅한다면 다른 자료를 찾아봐야한다.

## Test Block 구성

1. 우리가 테스트하고자 하는 컴포넌트를 랜더링한다.
2. 우리가 원하는 동작을 하는 엘리먼트를 찾는다.
3. 엘리먼트와 상호작용한다.
4. 기대값을 적는다.

```jsx
import { render, screen } from "@testing-library/react";
import App from "./App";

// 둘 중에 하나를 선택한다.
test('' ,()=>{})

it('어떤 테스트인지 적는다.' , () => {
// 컴포넌트를 렌더링한다.
	render(<App/>)
// 엘리먼트를 찾는다.
	const h1 = screen.getByText(/안녕/i)
// 기대값을 적는다.
	expect(h1).toBeInTheDocument();
})

// 이렇게 하는 것도 가능하다.
it('h1이 출력되어야합니다.' ()=>{
	const {getByText} = render(<App/>)
	const h1 = getByText("안녕")
	expect(h1).toBeInTheDocument()
})
```

기대 값과 실재 동작이 다르면 테스트는 실패한다.

## TDD(Test-Driven Development, 테스트 주도 개발)

테스트에 실패했다고 좌절할 필요는 없는 것 같다. 그냥 테스트에 실패한 원인을 보고 빠르게 해결하면 된다. TDD는 한번 경험하지 않으면 감을 잡기 어려운 것 같다. [이 자료](https://youtu.be/L1dtkLeIz-M?t=218)를 보고 감을 잡으면 좋을 것 같다.

### TDD Cycle

1. 테스트 빠르게 실패한다.(실패하는 테스트 코드를 작성한다.)
2. 테스트를 통과하기 위해 수단과 방법을 가리지 않고 코드를 작성한다.
3. 코드를 개선한다.
4. 반복
5. 중복을 제거한다.

## Query Methods

### getBy\*

- 엘리멘트가 없으면 에러가 발생한다.
- 하나만 가능하고 여러 엘리먼트가 존재하면 에러가 발생한다.

### findBy\*

- 찾고자 하는 것이 없으면 에러가 발생한다.
- 하나만 가능하고 여러 엘리먼트가 존재하면 에러가 발생한다.
- async/await로 작성해야한다.

### queryBy\*

- 찾고자 하는 것이 없으면 null을 반환한다.
- 하나만 가능하고 여러 엘리먼트가 존재하면 에러가 발생한다.

### getAllBy\*

- 엘리먼트가 없으면 에러가 생긴다.
- 찾고자 하는 엘리먼트가 여러개일 때 사용 가능하다

### findAllBy\*

- 엘리먼트가 없으면 에러가 생긴다.
- 찾고자 하는 엘리먼트가 여러개일 때 사용 가능하다
- async/await로 작성해야한다.

### queryAllBy\*

- 엘리먼트가 없어도 에러가 발생하지 않는다.
- 찾고자 하는 엘리먼트가 여러개일 때 사용 가능하다

## 이벤트 테스트

사용자 UI는 이벤트를 발생시킨다. fireEvent는 많은 이벤트 객체를 포함하고 있다.

```jsx
import { fireEvent, render } from "@testing-library/react";
import List from "./List";

const mockData = [{ id: 1, title: "달리기", done: false }];

it("onRemove 테스트", () => {
  const onRemove = jest.fn();
  const { getByText } = render(<List todos={mockData} onRemove={onRemove} />);
  const button = getByText("삭제");
  fireEvent.click(button);
  expect(onRemove).toBeCalledWith(mockData.id);
});
```

### jest.fn()

mock 함수를 만들 때 사용한다. 테스트를 위해 생성한 가짜 함수다. mock 함수를 사용할 수 있는 다양한 방법이 있다.

지금 단계에서 내가 사용한 것은 가짜 함수를 컴포넌트에 넘기면 컴포넌에서 넘겨받은 mock 함수를 컴포넌트 안에 작성된 정보를 바탕으로 테스트 코드를 동작시킨다.

위 코드에서는 toBeCalledWith() 안에 있는 인자와 함께 함수가 호출된 다는 것을 기대한다는 의미다.

- 참고자료
  **[[Jest] jest.fn(), jest.spyOn() 함수 모킹](https://www.daleseo.com/jest-fn-spy-on/)**

## MockComponent

외부 라이브러리를 사용하다보면 내가 테스트하려는 컴포넌트가 외부 라이브러리의 사용 규칙과 맞지 않아서 테스트에 실패하는 경우가 있다. 그런 경우에는 MockComponent를 만들어서 하면 된다. 내가 본 강의에서는 react-router-dom의 경우 테스트에 실패하는 경우였다.

```jsx
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TodoDetail from "./TodoDetail";

const MockComponent = () => {
  return (
    <BrowserRouter>
      <TodoDetail />
    </BrowserRouter>
  );
};

describe("TodoDetail", () => {
  it("TodoDetail은 제목을 포함하고 있어야합니다.", () => {
    const { getByText } = render(<MockComponent />);
    const h1 = getByText("할일 자세히 보기");
    expect(h1).toBeInTheDocument();
  });
});
```

## 비동기 작업 테스트

### 어떻게 할 수 있을까?

```jsx
it("follower item 이 출력되어야합니다.", async () => {
  render(<MockFollowerList />);
  const followerDivElement = await screen.findByTestId("follower-item-0");
  expect(followerDivElement).toBeInTheDocument();
});
```

findBy\*를 사용하면 async, await를 사용할 수 있다.

### 비동기 상황에서 테스트 전략

비동기 상황을 테스트 할 때 테스트 코드에서 직접 API를 테스트하는 것은 좋은 전략은 아니라고 한다.

1. API를 요청하는 것은 많은 비용이 든다.
2. Request는 느리다. 데이터가 많을 수 있기 때문이다.
3. 외부 상태에 의존하는 것은 좋지 않다.

비동기 상황을 테스트 할 때 API를 직접 하는 것 보다 Mock 데이터를 만들어 테스트를 하는 것이 좋다. 먼저 데이터를 불러와서 복사를 한 다음에 Mock 데이터를 만들고 그것으로 테스트를 할 수 있다.

1. mock 데이터를 만들 때, **mock** 폴더를 만든다.
2. 비동기 상황을 위한 mock 함수를 만들고 서버에서 불러온 데이터 객체를 만든다.

```jsx
const mockResponse = {
  data: {
    results: [
      {
        name: {
          first: "ho",
          last: "ha",
        },
        picture: {
          large: "https://randomuser.me/api/portraits/women/82.jpg",
        },
        login: {
          username: "gogo",
        },
      },
    ],
  },
};

export default {
  get: jest.fn().mockResolvedValue(mockResponse),
};
```

1. 리액트는 매번 mock 데이터를 리셋하기 때문에 테스트에 통과하기 위해서 node_module안에 있는 react-script 폴더에서 createJestConfig.js의 resetMocks 설정을 false로 바꿔준다.

비동기 상황을 테스트 하는 방법은 여러 가지가 있는 것 같다. 나도 테스트가 처음이라 아직은 다양한 툴이나 상황을 접해보지는 못했지만 [벨로퍼트와 함께하는 리액트 테스팅 - 리액트 비동기 작업 테스트](https://velog.io/@velopert/react-testing-library-%EC%9D%98-%EB%B9%84%EB%8F%99%EA%B8%B0%EC%9E%91%EC%97%85%EC%9D%84-%EC%9C%84%ED%95%9C-%ED%85%8C%EC%8A%A4%ED%8A%B8)를 보면 다른 방법을 소개하고 있다. 읽어보고 튜토리얼을 진행하보는 것도 좋은 것 같다.

## Before, After

테스트를 할 때 테스트 코드의 순서에 따라 다음 테스트에 영향을 주는 경우가 있다. 그럴 때 테스틑 전이나 후에 영향을 주는 요소를 일괄적으로 초기화를 해야하는 경우가 있는데 그럴때 beforeEach나 afterEach를 사용한다.

beforeEach는 각 테스트가 실행되기 전에 실행된다. afterEach는 각 테스트가 종료된 이후에 실행된다.

beforeAll, afterAll은 테스트가 실행되기 전이나 실행된 후에 한번만 실행된다.

## 마무리

테스트가 필요하다고 생각이 들었을 때 바로 시작하지 못했다. 사실 복잡한 상태를 관리하는 것 때문에 자동으로 데이터 상태를 검증해야 한다는 생각에 테스트를 공부하고 있다. 아직 완전 초보다. 내 프로젝트에 적용하지 못했다. 하지만 테스트에 익숙해지기 위해서 튜토리얼을 5번정도 반복해서 진행해보았다. 덕분에 프론트 앤드에서 테스트의 흐름에 조금은 익숙해진 것 같다. 이제 다음 목표가 눈에 들어왔다. 다음 목표는 다음과 같다.

1. Typescript 환경에서 테스트 하기
2. Recoil로 상태 관리하는 환경 테스트하기

나의 프로젝트 환경을 테스트 하는 것이 무엇보다도 중요한 것 같다. 실무 또는 다양한 환경에서 테스트를 하기 위해서 많은 노력이 필요해보인다.
