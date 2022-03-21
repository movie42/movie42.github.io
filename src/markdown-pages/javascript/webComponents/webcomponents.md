---
slug: "/blog/http/web-component"
date: "2022-02-10"
title: "Web Component"
tags: ["javascript", "webcomponent"]
---

리엑트는 컴포넌트 단위로 UI를 만들기 때문에 바닐라 자바스크립트로 웹 어플리케이션을 만들 때 훨씬 편리했다. 컴포넌트 단위로 UI를 만들어 관리하면 무엇보다 UI의 의존성을 최소화 할 수 있을 것 같았다. 헤더 컴포넌트가 있으면 그 안에 내가 원하는 컴포넌트를 넣어 하나의 컴포넌트로 다른 곳에도 같은 기능과 디자인을 손쉽게 적용할 수 있을 것 같았다.

처음에 내가 만든 UI의 기능을 재사용하는데 초점을 뒀었지만 기능 뿐 아니라 디자인과 기능이 한군데 적용된 컨테이너를 만들어 놓고 가져와서 사용할 수 있는 방법은 없을까 고민했었다. 왜냐하면 class나 id에 의존해서 작성해놓은 코드를 내가 기억하고 있다면 좋겠지만 이상하게 계속 같은 버튼에 다른 이름을 부여하면서 css와 javascript가 진흙덩어리가 되어버리는 것을 경험했다. 만약 jsx처럼 캡슐화가 된다면 일관된 UI를 어플리케이션 전체에 적용하는 것은 조금 더 쉽게 할 수 있을 것이다.

그러다 정말 우연하게 디자인 시스템을 알게 되었고(알고리즘의 은혜인가...) 웹 컴포넌트를 알게 되었다. 프레임 워크의 도움 없이 컴포넌트를 생성하고 다양한 곳에 일관성 있는 UI를 적용할 수 있다는 점이 매력적이었다. 그래서 정말 마지막으로 리엑트로 넘어가기 전에 웹 컴포넌트로 모달창을 가볍게 만들어서 사용자가 삭제 버튼을 눌렀을 때, 경고를 하는 기능을 만들기로 했다.

## 이름 선언 및 HTML에서 출력해보기

> [Udemy: Javascript the complete guid 2020 beginner advanced](https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced/) 강의에서 Web Component 부분을 들으면서 정리했다.  
> [MDN의 Web Component](https://developer.mozilla.org/ko/docs/Web/Web_Components/Using_custom_elements) 튜토리얼을 참고했다.

```js
class Modal extends HTMLElement {
  constructor() {
    super();
  }
}
```

선언은 class를 사용해서 선언하고 HTMLElement를 확장해서 사용한다. super()는 부모의 요소를 상속받는 역할을 한다. 반드시 constructor(생성자)에서 super()를 선언해서 부모 요소를 상속받고 있다고 알려주어야한다.

```js
customElements.define("yc-style-modal", Modal);
```

위에서 선언한 클래스를 customHTML로 사용하기 위해서 customElements.define을 사용해서 내가 사용할 커스텀 HTML의 이름과 클래스를 인자로 넣는다. 커스텀 엘리먼트는 '-'를 사용해서 이름을 정의해야한다.

```html
<yc-style-modal></yc-style-modal>
```

생성한 Javascript를 HTML에서 불러오고난 뒤, HTML에 붙이면 나의 첫 웹 컴포넌트가 완성되었다.

## attribute를 사용해서 데이터 전달하기

```html
<yc-style-modal text="텍스트를 전달해볼래요.">모달창입니다.</yc-style-modal>
```

HTML attribute에 내가 원하는 이름과 값을 지정해서 Javscript에서 불러올 수 있다. 화면상에서는 '모달창입니다.'라는 문구만 확인 할 수 있다.

```js
class Modal extends HTMLElement {
  constructor() {
    super();
    this.text = this.getAttribute("text");
    console.log(this.text);
  }
}
```

변수를 constructor에서 선언해서 text 값을 불러오려고 한다. 콘솔에 text로 전달한 문구를 확인 할 수 있다. text로 받은 텍스트를 커스텀 엘리먼트 안에 넣을 수도 있다. 방법은 자바스크립트에서 일반적으로 하는 방법을 사용하면 된다.

```js
class Modal extends HTMLElement {
  constructor() {
    super();
    this.text = this.getAttribute("text");
    const headTitle = document.createElement("h1");
    headTitle.innerText = this.text;
    this.appendChild(headTitle);
  }
}
```

엘리먼트를 생성해서 컴포넌트 안에 넣으면 된다.

> **여기에서 this가 뭘까?**
> 문맥상 this는 커스텀 엘리먼트인 yc-style-modal을 가리킨다. 그래서 this.appendChild를 하면 headTitle이 커스텀 엘리먼트 안에 들어가게 된다.

attribute 값을 설정하거나 불러오는 방법은 기존 방법과 똑같다. getAttribute(), setAttribute() 내장 함수를 사용하면 된다.

## Shadow DOM과 스타일 지정하기

```html
<head>
  <style>
    yc-style-modal {
      background-color: red;
    }
  </style>
</head>
<body>
  <yc-style-modal text="텍스트를 전달해보려고 합니다."
    >모달창입니다.</yc-style-modal
  >
  <script src="./modal.webcomponent.js"></script>
</body>
```

스타일을 yc-style-modal을 사용해서 지정할 수 있다. 하지만 스타일을 전달하고 나면 class 내부에서 불러온 텍스트는 효과가 없고 '모달창입니다'라는 글자만 배경이 빨간색으로 변한 것을 알 수 있다.
외부에서 스타일을 지정하는 방법은 나의 목적과 매우 먼 방법이다. 내가 하고 싶은건 스타일도 컴포넌트 안에 캡슐화를 하고 싶다.

```js
class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.text = this.getAttribute("text");
    const headTitle = document.createElement("h1");
    headTitle.innerText = this.text;
    this.appendChild(headTitle);
    console.log(this);
  }
}
```

Shadow DOM을 사용하고 싶다면 this.attachShadow({mode:'open'})을 생성자 안에 선언하면 된다. 그런데 이렇게 하면 불러온 텍스트도 다 사라진다. shadow dom을 사용하면 shadowRoot에 만들고자 하는 엘리먼트를 부착해주어야하기 때문이다.

```js
class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.text = this.getAttribute("text");
    const headTitle = document.createElement("h1");
    headTitle.innerText = this.text;
    this.shadowRoot.appendChild(headTitle);
  }
}
```

위의 코드처럼 this.shadowRoot에 내가 생성한 엘리먼트를 넣을 수 있다. 그런데 생각해보면 너무 불편하다. 생성된 엘리먼트를 전부 이런식으로 추가하게 되면 캡슐화를 할 수 있다는 장점이 있지만 단점도 커진다. innerHTML을 사용해서 이러한 불편함을 해소할 수 있다.

> [mode : open vs close](https://blog.revillweb.com/open-vs-closed-shadow-dom-9f3d7427d1af)

```js
this.shadowRoot.innerHTML = `
    <h1>${this.text}</h1>
  `;
```

위의 방법으로 전달하면 createElement를 통해 전달할 필요가 없다. 화면을 확인하면 이전과 같은 결과를 확인 할 수 있다.

스타일링을 하는 방법은 여러 가지가 있다.

### shadowRoot에서 스타일링 하기

```js
this.shadowRoot.innerHTML = `
  <style>
    h1{
      color : red;
    }
  </style>
  <h1>${this.text}</h1>
`;
```

### 외부 css 파일로 스타일하기

style.css를 만들고 link로 style을 첨부한다.

```js
this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="style.css" />
        <h1>${this.text}</h1>
    `;
```

MDN에서는 link로 스타일을 전달할 경우 shadow root의 페인트를 막지 않아서 스타일이 로딩되는 동안 지정된 스타일 요소가 없는 경우 깜박임이 발생할 수 있다고 한다. 하지만 브라우저의 성능이 대부분 좋아서 외부와 내부 스타일의 성능은 차이가 없을 것이라고 한다.

## web component의 라이프 사이클

```js
class Modal extends HTMLElement {
  constructor() {
    super();
    this.isOpen = false;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
            #backdrop {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background: rgba(0, 0, 0, 0.75);
                z-index: 10;
                opacity: 0;
                pointer-events: none;
            }

            :host([opened]) #backdrop, 
            :host([opened]) #modal{
                opacity:1;
                pointer-events:all;
            }

            :host([opened]) #modal{
                top:50%;
            }
            
            #modal {
                position: fixed;
                top:40%;
                left:50%;
                transform : translate(-50%, -50%);
                width:50%;
                z-index: 100;
                background: white;
                border-radius: 3px;
                box-shadow: 1rem 1rem 1rem rgba(0, 0, 0, 0.1);
                display:flex;
                flex-direction: column;
                justify-content: space-between;
                opacity: 0;
                pointer-events: none;
                transition:all 0.3s ease-out;
            }

            header {
                padding:1.5rem;
                border-bottom: 1px solid #ccc;
            }

            slot[name=title]{
                font-size:3rem;
                margin: 0;
            }

            #main{
                padding: 1rem;
                font-size:1.4rem;
            }

            #actions{
                border-top : 1px solid lightgray;
                padding:1.5rem;
                display:flex;
                justify-content:flex-end;
            }

            #actions button{
                margin: 0 0.25rem;
            }

        </style>
        <div id="backdrop"></div>
        <div id="modal">
            <header>
                <slot name="title">모달 창 제목</slot>
            </header>
            <section id="main">
                <slot name="paragraph">모달 내용입니다.</slot>
            </section>
            <section id="actions">
                <button id="cancel">아니요</button>
                <button id="confirm">네</button>
            </section>
        </div>
    `;

    const slots = this.shadowRoot.querySelectorAll("slot");
    slots[1].addEventListener("slotchange", event => {
      console.dir(slots[1].assignedNodes());
    });
    const backdrop = this.shadowRoot.querySelector("#backdrop");
    const cancelButton = this.shadowRoot.querySelector("#cancel");
    const confirmButton = this.shadowRoot.querySelector("#confirm");
    backdrop.addEventListener("click", this._cancel.bind(this));
    cancelButton.addEventListener("click", this._cancel.bind(this));
    confirmButton.addEventListener("click", this._confirm.bind(this));
  }

  attributeChangeCallback(name, oldValue, newValue) {
    if (this.hasAttribute("opened")) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
  }

  open() {
    this.setAttribute("opened", "");
  }

  hide() {
    if (this.hasAttribute("opened")) {
      this.removeAttribute("opened");
    }
    this.isOpen = false;
  }

  _cancel(event) {
    this.hide();
    const cancelEvent = new Event("cancel", { bubbles: true, composed: true });
    event.target.dispatchEvent(cancelEvent);
  }

  _confirm(event) {
    this.hide();
    const confirm = new Event("confirm", { bubbles: true, composed: true });
    event.target.dispatchEvent(confirm);
  }
}

customElements.define("yc-style-modal", Modal);

const confirmButton = document.querySelector("button");
const modal = document.querySelector("yc-style-modal");

modal.addEventListener("cancel", () => {
  console.log("cancel");
});

modal.addEventListener("confirm", () => {
  console.log("confirm");
});

confirmButton.addEventListener("click", () => {
  if (!modal.isOpen) {
    modal.open();
  }
});
```

https://developer.mozilla.org/en-US/docs/Web/Web_Components
https://developers.google.com/web/fundamentals/web-components
https://developers.google.com/web/fundamentals/web-components/shadowdom
https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots

::slotted(title)

slot[name=title]
