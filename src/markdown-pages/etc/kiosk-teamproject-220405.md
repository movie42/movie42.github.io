---
slug: "/etc/kiosk-team-project-2"
date: "2022-04-05"
title: "프로젝트를 하면서 겪은 문제, Typescript와 StyledComponent, Event, Component 설계하기"
tags: ["team project", "etc"]
---

매력적인 제목을 짓지 못해 라이트 노벨과 같은 제목처럼 길게 썼다. 3일차까지 하면서 겪은 문제를 한번 정리하고 넘어가야겠다고 생각해서 거의 회고와 같은 형식으로 적는다.

## 쓰면 쓸 수록 좋으면서도 싫은 TypeScript

타입 스크리트는 전달받을 객체가 무엇인지 예측 할 수 있기 때문에 생각보다 실수를 할일이 적어진다. 또 다른 한편으로 상태를 내가 생각하면서 설계를 하기 때문에 코드를 조금 더 생각하면서 작성하게 되는 것 같다. 예상치 못한 상태를 받는 경우 빨간줄이 쳐지는데 그럴 때, 메시지를 잘 읽어보면 왜 오류가 났는지 잘 설명해준다. 그런데 항상 설명을 보았다고 바로 해결할 수는 없다. 대부분의 오류는 어떤 interface나 type을 상속받고 있는데 그곳에 undefiened나 null 또는 특정 값이 없다고 불만을 표시한다. 가장 어려운 부분은 다른 패키지와 함께 쓸 때, 객체가 내가 지정한 값이 없는 값이 아니라는 것을 알려줘야 할 때가 가장 어려운 것 같다. 대부분의 패키지는 확장 가능하도록 설계 되어 있다. 조금 어렵더라도 대부분의 오류는 해결할 수 있다.

### Styled Components에서 theme과 html props 받기

styled-components를 쓰다보면 ThemeProvider로부터 받는 theme 속성과 리엑트 컴포넌트로부터 넘어오는 속성을 둘다 받아야 할 때가 있었다. 또한 이벤트를 해당 컴포넌트에 부여해야할 때가 있는데 그럴 경우 아마도 컴포넌트가 정확히 무엇인지 추론하지 못해서 오류가 생기는 경우가 있었다.

1. React.FC의 props를 styled-component 안에서 사용하기
   styled-compontents의 공식 문서에 나와있는 [Using custom props](https://styled-components.com/docs/api#typescript)를 보면 어떻게 내가 생성한 interface를 스타일 컴포넌트에 붙일 수 있는지 설명해주고 있다. 설명대로 하게되면 React.FC에서 받고 있는 props의 값을 스타일 컴포넌트 안에서도 사용할 수 있게된다. props의 값에서 true/false 값을 가지고 색상을 지정할 때 사용하는 경우에 해결할 수 있다.

2. 스타일 컴포넌트에서 이벤트 사용하기
   스타일 컴포넌트에서 onClick 이벤트를 사용하려고 하자 오류가 났다. 이런 경우가 없었는데 이벤트를 추론하지 못해서 좀 당황했다. 정확하게 무엇이 원인인지는 모르겠다. 찾아봐도 적절한 대답을 찾을 수가 없었다. 그래서 일단 오류 메시지를 그냥 몇번이고 반복해서 읽어보았다. 골자는 스타일 컴포넌트에서 받고있는 data-id나 onClick이벤트 등을 StyleComponents에 정의되어있지 않은 것이라 선언할 수 없다는 내용이었다. 그래서 변수에 타입을 지정하는 것처럼 React.FC<>을 선언해주었다. 그러자 오류가 전부 사라졌다.

   StyledComponents 인터페이스를 살펴보면 C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,가 제네릭 값으로 들어가있다. 그래서 그냥 자동으로 추론이 가능할 줄 알았는데 그렇지 못했다. React.FC가 StyledComponents에 제네릭 값으로 들어가있지 않은데 선언이 가능한 이유는 아마도 any 또는 object 타입으로 제네릭 되어있기 때문이 아닐까...라고 조심스럽게 추론해본다. (React, StyledComponts index.d.ts를 보고 코드를 읽어 보았지만 관련성을 잘 모르겠다.)

```tsx
import React, { useState } from "react";
import styled from "styled-components";

const Item: React.FC<
  | IProductItemProps
  | React.DetailedHTMLProps<
      React.LiHTMLAttributes<HTMLLIElement>,
      HTMLLIElement
    >
> = styled.li<IProductItemProps>`
  padding: 1rem;
  border-radius: 0.3rem;
  background-color: ${props =>
    props.select ? props.theme.warning : props.theme.netural};
`;

interface IProductItemProps {
  id: string | number;
  name: string;
  price: string | number;
  imageUrl?: string;
  select?: boolean;
  handler?: (value: any) => any;
}

const ProductItem: React.FC<IProductItemProps> = ({
  id,
  name,
  price,
  imageUrl,
  handler,
}) => {
  return (
    <Item
      data-id={id}
      select={select}
      onClick={e => {
        handler && handler(e);
        setSelect(!select);
      }}
    >
      <div>
        {imageUrl && <img src={imageUrl} alt={name} />}
        <h3>{name}</h3>
        <h4>가격 {price}원</h4>
      </div>
    </Item>
  );
};

export default ProductItem;
```

### Event

```tsx
const selectHandler = (event: React.MouseEventHandler<HTMLLIElement>) => {
  const id = event.currentTarget.dataset.id;
};
```

React에서 Event는 이벤트 props위에 올리면 event를 뭐라고 정의해주어야하는지 vscode에서 알려주기 때문에 그동안은 계속 그렇게 사용해왔다. 그런데 dataset을 클릭한 대상으로부터 가져와야하는 상황에서 currentTarget을 사용해야하는데 값이 정의되어있지 않다는 오류 메시지가 계속 발생했다. 그래서 Event를 타고 index.d.ts를 타고 들어가서 Event 검색어로 뒤적거리다가 interface SyntheticEvent가 타입을 상속시켜주는 것을 알게 되었다. 그래서 아래와 같이 변경하자 동작하게 되었다.

```tsx
const selectHandler = (event: React.MouseEvent<HTMLElement>) => {
  const id = event.currentTarget.dataset.id;
};
```

이상한건 index.d.ts를 보면 아래 코드처럼 MouseEventHandler는 Elemet가 제네릭 되어있고 그건 EventHandler에 MouseEvnet<T>와 같다고 되어있는데 어떤 부분이 다르길래 두개가 동작을 달라하는 건지 잘 모르겠다.

```tsx
type MouseEventHandler<T = Element> = EventHandler<MouseEvent<T>>;
type EventHandler<E extends SyntheticEvent<any>> = {
  bivarianceHack(event: E): void;
}["bivarianceHack"];
```

아래 아티클은 type에 대해서 찾아보다가 읽어보게된 아티클인데 이벤트 type을 지정하는 문제는 이 튜토리얼을 따라하면 좋을 것 같다.

> 참고
> [React Event Handlers with TypeScript](https://www.carlrippon.com/React-event-handlers-with-typescript/)

## Components 설계 생각보다 어렵다.

Component는 props의 값을 넘겨받아 데이터를 처리하는 경우가 많아 복잡성을 띄게 되는 경우가 많은 것 같다. 복잡함을 최소화하기 위해서 component 설계를 할 때 동작하는 로직을 고민해야한다. 나의 경우에는 메뉴에서 아이템을 클릭했을 때, 클릭한 아이템을 리스트로 저장하고 그 값을 다른 컴포넌트로 넘겨주는 로직을 만들었을 때 컴포넌트간의 결합을 느슨하게 하기 위해서 여러 고민을 하게 되었다. 결국에는 상태관리 툴을 사용하게 된다. 깊이가 깊어지는 컴포넌트에 props를 넘겨줄 때 전역에서 관리하는 상태가 없다면 난감한 상황이 발생하게 된다. 조금 더 경험을 쌓고 나중에 정리해야겠다.
