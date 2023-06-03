---
slug: "/typescript/basic-summary"
date: "2022-05-20"
title: "Typescript 기본 정리"
tags: ["typescript", "basic", "summary"]
---

> 참고한 글과 강의  
> [노마드 코더 타입스크립트로 블록체인 만들기](https://nomadcoders.co/typescript-for-beginners/lobby)  
> [타입스크립트 핸드북(joshua1988) 타입추론](https://joshua1988.github.io/ts/guide/type-inference.html#%EB%AC%B8%EB%A7%A5%EC%83%81%EC%9D%98-%ED%83%80%EC%9D%B4%ED%95%91-contextual-typing)  
> [타입스크립트 도큐멘테이션](https://www.typescriptlang.org/ko/docs/handbook/intro.html)  
> [기록의 힘 [TypeScript] 타입스크립트 함수 오버로딩 : Function Overloading](https://lakelouise.tistory.com/194)  
> [토스트 UI 타입스크립트의 Never 타입 완벽 가이드](https://ui.toast.com/weekly-pick/ko_20220323)  
> [Types vs. interfaces in TypeScript](https://blog.logrocket.com/types-vs-interfaces-in-typescript/)  
> [Type vs Interface, 언제 어떻게?](https://medium.com/humanscape-tech/type-vs-interface-%EC%96%B8%EC%A0%9C-%EC%96%B4%EB%96%BB%EA%B2%8C-f36499b0de50)

## 타입스크립트를 쓰는 이유

자바스크립트는 매우 친절한 언어다. 그래서 프로그래머가 어떤 실수를 했던지 간에 일단 실행을 시키고 본다. 그러다 보니 자바스크립트로 설계를 할 때, 프로그래머가 원하는 타입을 얻지 못하는 경우가 있는데 ‘휴먼 에러'도 여기에 속한다. 타입스크립트는 강타입 언어이기 때문에 타입을 강제한다. 함수를 설계하든 변수를 만들든 무엇을 만들던지 간에 정확하게 내가 만드려고 하는 것의 타입이 무엇인지 반드시 알려줘야한다. 따라서 사람의 실수를 줄여줄 수 있으며 설계한대로 원하는 데이터를 얻을 수 있다.

타입스크립트는 많은 사람이 함께 코드를 작성하는 환경에 매우 적합하다. 코드를 나만 보고 나만 수정한다면 사람의 실수가 그다지 치명적이지 않을 수 있다. 하지만 대부분의 서비스는 많은 사람들이 함께 만들게되고 내가 작성한 코드는 다른사람이 더 많이 보고 수정하게 된다. 따라서 타입스크립트를 사용하게 되면 더 많은 정보를 다른 프로그래머에게 알려줄 수 있고 그만큼 유지 보수 측면에서 좋다. 서비스의 규모가 클수록 코드 관리를 조금 더 효율적으로 할 수 있다.

VSCode에서 Typescript를 사용하면 자동 완성 기능을 제공한다. 개발자가 타입을 정해놓으면 편집기가 알아서 정의한 타입을 사용할 수 있도록 코드 완성을 해준다. 또한 없는 타입이나 꼭 들어가야하는 값인데 누락되면 에러 메시지를 보여주기 때문에 예측 가능한(실행되기 전에 에러를 잡는) 프로그래밍을 할 수 있도록 도와준다. 또한 외부 패키지를 쓸 때, 패키지에 포함된 함수나 값에 어떤 값이 어떻게 들어가야하는지도 빠르게 탐색할 수 있다. 오류가 발생했을 때 왜 발생했는지 알 수 있고 어떻게 해결하는지 찾을 가능성이 높아진다.

## Basic Usage

```tsx
// 원시 타입
const age:number = 1
// array
const array:string[] = ['1', '2']
// any
const arrayAny:any = [1, '2', {}, [1,2]]
// void
const voidFunction = ():void => console.log('hi')
// function
const addUser = (name:string, age:number):{name:string, age:string} => ({name:"현수", age:32})
// object
const object :{name:string, age:number} ={
	name:"안녕",
	age:23
}
// optional
const optionalFunc = (user:{name:string, age?:number}) =>{
	console.log(name)
}
optionalFunc({name:"타노스"})
optionalFunc({name:"스탠", age:96})
// union
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // 여기에서 'x'는 'string[]' 타입입니다
    console.log("Hello, " + x.join(" and "));
  } else {
    // 여기에서 'x'는 'string' 타입입니다
    console.log("Welcome lone traveler " + x);
  }
}
const unionArray: (string | number)[] = [1,2,3, "string"]
const beNull : null = null
const beUndefined = : undefined = undefined
// tuple
const tuple:[string, number] = ["스파이더맨", 2]
```

타입스크립트에서 타입을 정의하는 방법은 매우 다양하다. 기본적으로 변수 뒤에 :를 쓰고 내가 정의하고자 하는 타입을 붙일 수 있다. 타입은 원시 타입(string, number, boolean), any, array, object, tuple, enum, function, union, void, null, undefined, never, unknown이 있다.

- **string**은 문자열이다. number는 숫자다. boolean은 true false이다.

- **any**는 아무거나 다 괜찮다는 것이다. 타입스크립트는 명시적으로 데이터 유형을 지정해 사용하는 것을 권장하고 있어서 any를 지정하는 것은 좋지 않다. 그러나 어떤 타입을 할당해야하는지 알지 못할 때가 있는데 그때 사용하면 좋다.

- **array**는 내가 원하는 타입 다음에 []를 써서 정의한다. 예제 코드처럼 string[]이라고 정의하면 배열에는 string만 요소로 가질 수 있다. 하지만 array가 string만 받는다거나 number만 받지 않을 때도 있다. 그럴 때는 Generic을 사용해서 Type을 정의하면 타입 추론을 통해서 array의 요소를 자동으로 지정해준다.

- **void**는 함수가 아무것도 return하지 않는다는 것을 알려준다.

- **union**은 의미상 합집합을 의미한다.

- **null**은 null이다. undefined는 undefined이다.

- **unknown**은 타입이 무엇인지 알려지지 않았다는 의미다. 타입을 미리 정하지 못했을 때 사용한다. any는 모든 타입을 받는 반면에 unknown으로 선언되면 type을 재정의할 수 있고 지정된 위치에서 재정의된 type으로 사용할 수 있다. 타입을 다시 정해주지 않으면 에러가 발생한다.

- **never**는 항상 오류를 출력하거나 리턴값을 절대로 내보내지 않는다. 아직 왜 있는지는 잘 모르겠다. 부록에 아티클을 읽고 간단하게 정리한 것을 남긴다.

## 타입 추론

타입 추론은 타입 스크립트가 코드를 해석해 나가는 동작을 의미한다.

```tsx
const name = "스트레인지";
typeof name === string; // true
```

name은 string이라는 타입을 명시적으로 지정하지 않았지만 name은 string이다. 변수, 속성, 함수 반환 값 등을 설정할 때 타입 추론이 일어난다.

### 최적 공통 타입

여러 표현 식에서 타입을 추론할 때, 표현식들의 타입을 이용해 최적 공통 타입을 계산한다.

```tsx
let x = [0, 1, null];
// x : (number | null)[]
```

이런식으로 타입이 추론되기를 원하지만 가끔 그렇지 않을 때가 있다. 그래서 명시적으로 타입이 무엇인지 알려주어야할 때도 있다.

### 문맥상 타이핑

표현식의 타입 위치에 의해 암시될 때 발생한다.

```tsx
window.onmousedown = function (mouseEvent) {
  console.log(mouseEvent.button); //<- OK
  console.log(mouseEvent.kangaroo); //<- Error!
};
```

window.onmousedown 함수의 타입을 사용하여 오른쪽 함수 표현식의 타입을 추론했다. mouseEvent에 kangaroo가 없기 때문에 에러가 발생한다.

문맥상 타이핑은 함수 호출에 대한 인수, 오른쪽에 할당된 것, 타입 어셜션, 개체 및 배열 리터럴의 멤버, 반환문이 포함된다. 컨텍스트 타입은 가장 일반적인 타입에서 후보 타입으로 작동한다.

## Type **Aliases**

```tsx
type User = {
  name: string;
  age: number;
  isHuman?: boolean;
};

const captin: User = {
  name: "캡틴",
  age: 100,
};

const thor: User = {
  name: "토르",
  age: 5000,
  isHuman: false,
};

const newUser = (info: User) => {
  const { name, age, isHuman } = info;
  return {
    name,
    age,
    isHuman,
  };
};
```

type은 객체의 형태를 정할 때 사용한다. User라는 type을 만들면 여러 변수에 모양을 지정할 수 있다.

## Call Signatures

```tsx
type MathFunc = (a: number, b: number) => number;

const add: MathFunc = (a, b) => a + b;
```

Call signatures는 함수 타입을 지정할 때 사용한다. Call signatures를 지정하고 난 뒤에 작성한 함수에 적용하면 가독성이 높은 코드를 작성할 수 있다.

## Overloading

```tsx
type MathFunc = {
  (a: number, b: number): void;
  (a: number, b: number): number;
};

const multi: MathFunc = (a, b) => {
  const error = "숫자가 너무 큽니다.";

  if (a * b >= a * a) {
    console.log(error);
  }

  return a * b;
};

type Divided = {
  (a: number, b: number): number;
  (a: number, b: number, c: number): number;
};

const dividedFunc: Divided = (a, b, c?: number) => {
  if (c) return (a / b) * c;
  return a / b;
};
```

Overloading은 함수가 여러개의 Call Signature를 가질때 발생한다.

## Polymorphism & Generics

Polymorphism(다형성)은 용어가 가진 뜻 그대로 다양한 형태를 뜻한다. 함수가 다형성을 지닌다는 것은 내가 설계하려는 함수의 타입이 지정되어 있는 것이 아니라 예측 할 수 없는 다양한 형태를 수용할 수 있다는 뜻과 같다.

```tsx
// 다양한 형태를 수요할 수 없다.
type PolyArray = {
  (arr: number[]): void;
  (arr: string[]): void;
  (arr: (number | string)[]): void;
  (arr: boolean[]): void;
};

const polyArrayPrinter: PolyArray = arr => {
  arr.forEach(value => console.log(value));
};

polyArrayPrinter([1, 2, 3, 4]);
polyArrayPrinter([1, 2, true, 4]); //error
```

다형성을 지닌 함수를 설계하기 위해서 제네릭 타입을 지정할 수 있다. 제네릭은 Call Signature를 프로그래머가 직접 지정하지 않아도 타입스크립트가 알아서 Call Signature를 생성해준다. 그래서 다양한 형태의 자료를 받을 수 있다.

```tsx
// 다양한 형태를 수요할 수 있다.
type PolyArray = {
  <T>(arr: T[]): void;
  <T>(arr: T[]): T;
};

const polyArrayPrinter: PolyArray = arr => {
  if (arr.length > 2) return arr[0];
  return arr.forEach(value => console.log(value));
};

polyArrayPrinter([1, 2, 3, 4]);
polyArrayPrinter(["1", "2", "3", "4"]);
polyArrayPrinter([1, 2, true, 4]);

// 이렇게도 작성할 수 있다.
function polyArray<T>(arr: T[]) {
  return arr[0];
}

// 화살표 함수는 이렇게 해주어야한다?
// https://developer-talk.tistory.com/195
const polyArray2 = <T extends {}>(arr: T[]) => arr[0];
```

any를 사용하지 않고 제네릭 타입을 사용하는 이유는 any는 타입체크를 하지 않지만 제네릭은 타입 체크를 하기 떄문이다.

## Classes

```tsx
class User {
  constructor(
    private firstName: string,
    private lastName: string,
    public email: string
  ) {}
}

const soo = new User("soo", "kang", "kangsoo@google.com");

console.log(soo.email);
console.log(soo.firstName); //error
```

객체 지향 프로그래밍을 할 때 자바스크립트에서 class를 사용한다. Typescript에서 class를 사용하여 위와 같이 구성할 수 있다.

### abstract

```tsx
abstract class User {
  constructor(
    public firstName: string,
    private lastName: string,
    protected email: string
  ) {}
  abstract getEamil(): void;
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

class Player extends User {
  getEamil() {
    console.log(this.email);
  }
}

const hyun = new Player("hyun", "san", "sanhyun@naver.com");
hyun.getFullName();
const soo = new User("soo", "kang", "kangsoo@google.com"); // error
```

abstract는 상속만 받을 수 있는 class다. 인스턴스를 직접 생성할 수 없다. 클래스에서 public, private, protected 속성을 사용할 수 있다. public은 모든 곳에서 읽기와 쓰기가 가능하다. private는 정의된 클래스 안에서만 사용 가능하고 상속받은 곳에서도 사용할 수 없다. protected는 private와 같은 역할을 하지만 상속받은 클래스에서는 사용이 가능하다.

메소드도 abstract이 가능하다. 메소드를 추상화하는 것은 call signature를 만드는 것과 같다. 상속을 받는 자녀에서는 추상화 된 메소드를 구현해야한다.

```tsx
type Words = {
  [key: string]: string;
};

class Dict {
  private words: Words;
  constructor() {
    this.words = {};
  }
  add(word: Word) {
    if (this.words[word.term] === undefined) {
      this.words[word.term] = word.desc;
    }
  }
  desc(term: string) {
    return this.words[term];
  }
  deleteWord(term: string) {
    delete this.words[term];
  }
}

class Word {
  constructor(public term: string, public desc: string) {}
}

const pizza = new Word("피자", "이탈리아 부침개");
const dict = new Dict();

dict.add(pizza);
dict.desc("pizza");
```

[출처 : 노마드 코더 타입스크립트 강의](https://nomadcoders.co/typescript-for-beginners/lectures/3679)

## Interface

인터페이스는 오브젝트의 모양을 특정해주는 용도로 사용할 수 있다.

```tsx
interface User {
  name: string;
  age: number;
  money: number;
}
```

interface에서 제네릭을 사용할 수 있다.

```tsx
interface OwnStorage<T> {
  [key: string]: T;
}

class LocalStorage<T> {
  private storage: OwnStorage<T> = {};
  get(key: string): T {
    return this.storage[key];
  }
  set(key: string, value: T) {
    this.storage[key] = value;
  }
  remove(key: string) {
    delete this.storage[key];
  }
  clear() {
    this.storage = {};
  }
}

const stringsStorage = new LocalStorage<string>();
stringsStorage.get("user");
stringsStorage.set("earth", "hi earth");

const booleanStorage = new LocalStorage<boolean>();
booleanStorage.get("true");
booleanStorage.set("hello", true);
```

## Types와 Interface의 차이점

type과 interface는 둘 다 오브젝트의 모양을 설명하는 용도로 사용이 가능하다. 하지만 type은 조금 더 다양한 목적으로 활용이 가능하지만 interface는 오직 오브젝트의 모양을 설명하는 목적으로만 사용이 가능하다.

```tsx
interface User {
  name: string;
}

interface Player extends User {}

type User = {
  name: string;
};

type Player = User & {};

const person1: Player = {
  name: "unknown1",
};
```

타입은 축척이 불가능하지만 인터페이스는 가능하다.(선언 병합이 가능하다.)

```tsx
interface User {
  name: string;
}
interface User {
  age: number;
}

type User = {
  name: string;
};
// 불가능
type User = {
  age: number;
};
```

인터페이스를 사용하면 추상 class를 사용하지 않으면서 class 형태를 지정할 수 있다. 추상 클래스는 자바스크립트로 컴파일이 되지만 interface는 컴파일이 되지 않기 때문에 조금더 가벼운 자바스크립트를 만들 수 있다.

```tsx
interface User {
  firstName: string;
  lastName: string;
  email: string;
  getEamil(): void;
  getFullName(): string;
}

interface Auth {
  auth: string;
}

class Player implements User, Auth {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public auth: string
  ) {}
  getEamil() {
    console.log(this.email);
  }
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const hyun = new Player("hyun", "san", "sanhyun@naver.com", "lev.1");
```

### 인터페이스에서 타입을 상속하는 것은 가능할까?

해보니까 가능하다.

```tsx
type Human = {
  name: string;
};

interface User extends Human {
  age: number;
}

type Planet = "Earth" | "Moon" | "Mars";

interface User {
  planet: Planet;
}
```

유니온 타입이 교차로 가능하다.

```tsx
interface Hunam {
  name: string;
}

interface Alien {
  name: string;
}

// type을 interface로 union하는 것은 불가능
type Universe = Human | Alien;
```

### 언제 써야할까?

무엇을 만드는지에 따라 다르다. interface는 object를 정의할 때 사용하고 types alias는 새로운 함수를 생성할 때(call signatures를 이야기하는듯) 사용하는 것이 좋다.

- interface 사용 예) 리액트 컴포넌트에서 Props를 정의할 때.
- 외부에 공개해야하는 API를 만들 때.

```tsx
import React from "react";

interface UserState {
  name: string;
  age: number;
  address: string;
}

interface IUserListProps {
  state: UserState[];
}

const UserList: React.FC<IUserListProps> = ({ state }) => {
  return state.map(item => (
    <li>
      <span>{item.name}</span>
      <span>{item.age}</span>
      <span>{item.address}</span>
    </li>
  ));
};
```

- type 사용 예) 함수를 만들 때(콜 시그니처를 말하는 것 같다.)
- 유니언, 튜플 타입.

```ts
interface Person {
  name: string;
  age: number;
}

type User = (person: Person) => Person;

const user: User = person => person;

user({ name: "Thor", age: 10000 });
```

## Typescript 사용하기

타입스크립트를 사용하기 위해서 타입스크립트를 설치해야한다. 만약 CRA를 통해 React와 타입스크립트를 사용한다면 타입스크립트를 처음부터 세팅할 일을 거의 없다. 모든 환경 설정을 외울 필요는 없지만 간단하게 설정하는 방법을 정리해본다.

### 설치

폴더를 만들고 폴더 안에서 typescript를 설치한다.

```bash
$ mkdir typescript-excercise
$ cd typescript-excercise
$ npm init -y
$ npm install -D typescript
```

### index.ts 파일 만들기

꼭 index.ts 파일을 만들 필요는 없다. 파일의 이름은 자유롭게 하면 된다.

```bash
$ mkdir src/index.ts
```

index.ts파일에 간단하게 코드를 작성한다. 위에서 작성했던 코드를 하나 가져와서 붙여넣었다.

```tsx
interface User {
  firstName: string;
  lastName: string;
  email: string;
  getEamil(): void;
  getFullName(): string;
}

interface Auth {
  auth: string;
}

class Player implements User, Auth {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public auth: string
  ) {}
  getEamil() {
    console.log(this.email);
  }
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const hyun = new Player("hyun", "san", "sanhyun@naver.com", "lev.1");
```

### package.json

```json
{
  // 생략
  "scripts": {
    "build": "tsc"
  },
  //생략
  "devDependencies": {
    "typescript": "^4.6.4"
  }
}
```

scripts에 build를 위와 같이 작성한다. npm build를 누르면 ts파일을 js로 컴파일 해준다. 지금은 동작하지 않는다.

### tsconfig.json

tsconfig.json 파일을 만든다.

```bash
$ touch tsconfig.json
```

```json
{
  "include": ["src"],
  "compilerOptions": {
    "outDir": "build",
    "target": "ES6",
    "lib": ["ES6"],
    "strict": true,
    "allowJs": true,
    "esModuleInterop": true,
    "module": "CommonJS"
  }
}
```

- include는 ts가 포함된 곳의 위치를 알려주는 역할을 한다. 이곳에 적힌 경로를 보고 컴파일을 실행한다.
- complierOptions는 어떻게 컴파일 할 것인지 정하는 역할을 한다.
  - outDir : 컴파일을 했을 때, 컴파일 된 파일이 생성되는 곳이다.
  - target : 어느 버전의 자바스크립트로 컴파일 할지 컴퓨터에게 알려주는 역할을 한다. 여러 버전이 있는데, ES6는 모던 브라우저에서 무리없이 자바스크립트를 실행시킬 수 있다.
  - lib : library declaration 파일을 정해주는 역할을 한다. 여러 옵션이 있다. 여기에 적으면 lib.\*.d.ts 파일을 참조해서 개발 환경을 조성해준다. 편하게 말하면 vscode에서 자동 완성 기능을 제공해주는 역할을 한다.
  - strict : 엄격한 타입 체킹 옵션을 활성화 할지 경정할수 있다.
  - allowJs : 자바스크립트 파일 컴파일 허용 여부
  - esModuleInterop : CommonJS 모듈을 ES6 모듈 코드 베이스로 가져오려고 할 때 문제가 발생하는데 해당 옵션을 true로 주면 ES6 모듈 사양을 지키면서 CommonJS 모듈을 가져올 수 있게 된다.
  - module : import/export 코드가 어떤 방식의 코드로 컴파일 될지 결정한다.

[더 많은 옵션이 있다.](https://geonlee.tistory.com/214) 필요할때 마다 살펴보기로 하자.

### Declaration Files

많은 패키지가 자바스크립트로 작성되어있다. 그래서 자바스크립트로 작성된 함수가 어떤 모양인지 타입스크립트에 알려주어야할 수 있다. 그럴 때 \*.d.ts파일을 작성하여 타입스크립트에게 설명을 해주어야한다.

tsconfig.ts파일에 "strict": true 를 설정하면 ‘Could not find a declaration file for module …’ 메시지를 볼 수 있다. \*.d.ts 파일이 없기 때문인데 그럴 때 패키지 이름.d.ts로 파일을 만들고 자바스크립트 라이브러리의 call signatures를 작성하면 타입스크립트는 이 파일을 보고 자동 완성 기능등을 제공해준다. 작성은 아래처럼 하면 된다.

```tsx
declare module "mypackage" {
  function init(value: string): void;
}
```

아마 리액트 스타일 컴포넌트를 사용해봤다면 styled.d.ts 파일을 작성해본 경험이 있을 것이다.

### JSDoc

만약에 이미 자바스크립트로 작성된 라이브러리가 있다면 그리고 코드 양이 방대하다면 타입스크립트에서 자바스크립트 코드를 사용할 수 있다. tsconfig.json에서 allowJs를 허용해주면 된다. 하지만 자바스크립트는 typescript의 보호를 받지 못한다. 그럴때 JSDoc 주석을 사용하여 자바스크립트 파일에 타입 정보를 제공할 수 있다. 주석이기 때문에 자바스크립트에서는 동작하지 않는다.

[코드 출처 : 노마드 코더 타입스크립트로 블록체인 만들기](https://nomadcoders.co/typescript-for-beginners/lectures/3688)

```jsx
// @ts-check
/**
 * Initialize the project
 * @param {object} config
 * @param {boolean} [config.debug]
 * @param {string} config.url
 * @returns {boolean}
 */
export function init(config) {
  return true;
}

/**
 * Exits the program
 * @param {number} code
 * @returns {number}
 */
export function exit(code) {
  return code + 1;
}
```

### ts-node

ts-node는 매번 타입스크립트 파일을 빌드하지 않고 타입스크립트를 실행시켜준다. dev 환경에서 사용하면 편리하다. nodemon과 함께 사용하면 ts파일이 변경될 때 마다 다시 실행해준다.

```bash
$ npm install ts-node nodemon -D
```

```json
// package.json
{
  "script": {
    "dev": "nodemon --exec ts-node src/index"
  }
}
```

### DefinitelyTyped

외부 패키지를 사용하는 경우가 많다. 하지만 패키지가 자바스크립트로만 작성되어있는 경우가 많은데 그럴 경우에는 에러 메시지에서 추천하는 방법으로 해결하는 것이 좋다. 거의 대부분은 npm i -D @types/\*\*를 실행하라고 알려준다.

[DefinitelyTyped는 types 정의를 모아놓은 깃 저장소](https://github.com/DefinitelyTyped/DefinitelyTyped)다.

## 부록

참조 : [타입스크립트의 never 타입 완벽 가이드](https://ui.toast.com/weekly-pick/ko_20220323#never-%ED%83%80%EC%9E%85%EC%9D%80-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%9D%BD%EC%9D%84%EA%B9%8C-%EC%98%A4%EB%A5%98-%EB%A9%94%EC%8B%9C%EC%A7%80%EB%A1%9C%EB%B6%80%ED%84%B0)

never가 뭔지는 잘 모르지만 가끔 never[]에는 할당할 수 없다는 에러를 만난다. 그래서 우연하게 발견한 아티클을 읽고 never에 대한 대략적인 것을 정리하였다.

타입은 가능한 값의 집합이다. 타입스크립트에서 never타입은 값의 공집합이다. 집합에 어떠한 값도 없기 때문에, never 타입은 any 타입의 값을 포함해 어떤 값도 가질 수 없다.

```tsx
delcare const any : any
const never:never = any //error
```

### never 타입이 왜 필요할까?

숫자 체계에 아무것도 없는 양을 나타내는 0처럼 문자 체계에도 불가능을 나타내는 타입이 필요하다.

타입스크립트에서 나타내고 있는 불가능

- 값을 포함할 수 없는 빈 타입
- 실행이 끝날 때 호출자에게 제어를 반환하지 않는 함수의 반환 타입
- 절대로 도달할 수 없을 else 분기의 조건 타입
- 거부된 프로미스에서 처리된 값의 타입

### 유니언 교차 타입과 never의 동작

- 숫자에 0을 더하면 동일한 숫자가 나오는 것 같이, never 타입은 유니언 타입에서 없어진다.
- 숫자에 0을 곱하면 0이 나오는 것 같이, never 타입은 교차 타입을 덮어쓴다.
- 도달할 수 없는 분기를 나타내는 것 외에도 never 타입은 조건부 타입에서 원하지 않는 타입을 필터링할 수 있다.

타입 필터링을 할 때 never를 사용하는 예제는 어쩌면 유용할지도 모른다는 생각이 든다. 나의 코드에 한번 정도 적용하기 위해서 노력해봐야겠다.

### [never 타입은 어떻게 읽을까?](https://ui.toast.com/weekly-pick/ko_20220323)

명시적으로 never를 사용하지 않은 코드에서 never 타입과 관련된 오류 메시지를 받아본적이 있을 수 있다. 타입스크립트가 일반적으로 타입을 교차하기 때문이다. 문자열, 숫자, 불리언 교차 타입은 서로 호환되지 않기 때문에 never타입이 되고, 이것은 오류 메시지에 never가 표시되는 이유다.

이 문제를 사용하기 위해 [타입 단언](https://velog.io/@gay0ung/%ED%83%80%EC%9E%85-%EB%8B%A8%EC%96%B8-%ED%83%80%EC%9E%85-%EA%B0%80%EB%93%9C-%ED%83%80%EC%9E%85-%ED%98%B8%ED%99%98)(또는 함수 오버로드)을 사용해야한다.
