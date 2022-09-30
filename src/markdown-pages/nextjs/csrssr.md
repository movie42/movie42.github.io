---
slug: "/nextjs/csr-ssr"
date: "2022-09-22"
title: "CSR SSR과 NextJS"
tags: ["CSR", "SSR", "nextJS"]
---

원티드 프리온보팅 10월 챌린지 과제로 CSR과 SSR 그리고 NextJS에 대해서 공부한 것을 포스팅합니다.

# CSR

역사적으로 Client Side Rendering은 스테틱 사이트가 주를 이루던 시대에 자바스크립트를 통해 웹 페이지를 동적으로 동작시키기 위해 AJAX가 등장하고 난 뒤 이를 사용하여 만든 SPA(Single Page Application)가 등장하면서 생기기 시작한 기술이다.

> 참고 : [드림코딩 - 서버사이드 렌더링 (개발자라면 상식으로 알고 있어야 하는 개념 정리 ⭐️)](https://www.youtube.com/watch?v=iZ9csAfU5Os)

## CSR은 무엇일까?

[MDN](https://developer.mozilla.org/ko/docs/Web/Progressive_web_apps/App_structure#%EC%95%B1%EC%9D%98_%EA%B5%AC%EC%A1%B0)은 다음과 같이 설명하고 있다.

> 클라이언트 사이드 렌더링(CSR)은 웹 사이트가 다른 페이지로 이동할 때 브라우저에서 거의 즉시 업데이트될 수 있도록 해주지만, 시작할 때 더 많은 초기 다운로드와 추가 렌더링이 필요합니다. 웹사이트는 첫 방문시 더 느리지만 다음 방문에서 훨씬 빠릅니다.

[다른 아티클을 참고하면 이렇다.](https://medium.com/@prashantramnyc/server-side-rendering-ssr-vs-client-side-rendering-csr-vs-pre-rendering-using-static-site-89f2d05182ef)

> Client Side Rendering means generating the HTML components on the browser side, by executing Javascript code within the browser that manipulates the HTML DOM to build the HTML nodes.
>
> 클라이언트 사이드 랜더링은 HTML 노드를 빌드하기 위해서 HTML DOM을 조작하는 브라우저 내의 자바스크립트 코드를 실행하여 브라우저 측에서 HTML 컴포넌트를 생성하는 것을 의미한다.

정리를 하자면 CSR은 서버에서 받아온 HTML파일에 포함되있는 자바스크립트 파일을 브라우저가 실행하고 브라우저에서 HTML 컴포넌트가 생성되는 것을 말한다. 조금 더 쉽게 말하자면 사용자가 보게 될 화면과 동작 정보를 자바스크립트 파일을 브라우저가 실행하면서 그때 그때 생성한다.

리액트의 public 폴더를 열어보면 비어있는 HTML 파일을 볼 수 있는데 여기에는 DOM을 만들기 위해서 브라우저가 파싱할 HTML 구문 정보가 없다. 대신에 링크된 자바스크립트 번들 파일을 다운로드 하여 브라우저에서 HTML DOM을 생성한다.

## CSR의 장, 단점

### 장점

1. **초기 로딩 이후에는 반응 속도가 매우 빠르다.** 스테틱 사이트는 페이지가 바뀔 때마다 서버에서 HTML 파일을 요청하여 불러와야하는데 반해 CSR은 그럴 필요 없이 클라이언트 측에서 HTML을 바로 바로 생성하기 때문이다. 또한 외부 API 호출 또한 클라이언트 자바스크립트 코드로 거의 실시간으로 제어할 수 있다. 이것을 [TTV](#TTV)와 [TTI](#TTI)의 격차가 매우 적다고 표현한다.

### 단점

1. **초기 로딩 속도가 느리다.** 초반에 자바스크립트 번들 파일 전부를 불러와야하기 때문에 이 파일의 크기가 클수록 속도가 느리다. 로딩을 하는 동안 사용자는 빈페이지를 보게 되기 때문에 UX에 좋지 않은 영향을 미친다.
2. **SEO(Search Engine Optimization)가 잘 되지 않는다.** 사용자가 웹 페이지를 검색할 수 있는 이유는 검색 엔진의 봇이 웹사이트의 HTML을 크롤링 하여 사용자가 원하는 결과에 맞게 결과를 보여주기 때문이다. 하지만 CSR은 HTML이 초기에 빈 상태이기 때문에 title, description과 같은 정보를 가져오는데 어려움을 겪는다.
3. 만약 자바스크립트를 사용할 수 없는 브라우저일 때는 사용자는 그저 빈 화면을 봐야한다.

# SSR

SSR은 Static Site에서 영감을 받아 생겨난 기술이다. 어떻게 보면 CSR보다 긴 역사를 가지고 있다.

## SSR이란?

[MDN](https://developer.mozilla.org/ko/docs/Web/Progressive_web_apps/App_structure#%EC%95%B1%EC%9D%98_%EA%B5%AC%EC%A1%B0)은 다음과 같이 설명하고 있다.

> 서버 사이드 렌더링(SSR)은 웹사이트가 서버에서 렌더링되는 것을 의미합니다. 따라서 더 빠른 첫 로딩을 제공할 수 있지만, 페이지간의 이동에서 모든것들을 매번 다운로드해야합니다. 브라우저를 넘어 훌륭하게 동작하고 개발 프로세스를 돕는 많은 도구들이 있지만, 각 페이지를 로딩할 때마다 서버를 거쳐야 한다는 점에서 로딩 속도 및 성능으로 인식되는 일반적인 측면에서 어려움이 있습니다.

다른 [아티클](https://medium.com/@prashantramnyc/server-side-rendering-ssr-vs-client-side-rendering-csr-vs-pre-rendering-using-static-site-89f2d05182ef)을 참조하면 이렇다.

> Server Side Rendering means generating the HTML for a webpage on the server side.
>
> 서버 사이드 랜더링은 웹페이지를 위한 HTML이 서버에서 생성된다는 것을 의미합니다.

SSR은 서버에서 완전하게 생성된 HTML 파일을 받아와 브라우저에서 HTML을 파싱하여 사용자에게 제공할 화면을 그린다.

ExpressJS를 사용하여 MVC 패턴을 사용해서 웹 사이트를 만들어본 경험이 있다면 SSR을 해본 경험이 있다고 말할 수 있다. 기본적으로 서버에서는 요청된 URL에 해당하는 HTML 파일을 클라이언트에 보내주는 역할을 한다.

## SSR의 장, 단점

### 장점

1. SEO가 좋다. 이미 형상을 갖춘 HTML 파일이 서버에 있기 때문에 웹 크롤러는 HTML을 더 잘 찾을 수 있다.
2. 초기 로딩 속도가 CSR 어플리케이션에 비해서 매우 빠르다. 이미 완성된 HTML 파일을 파싱해서 랜더링 하기 때문이다.
3. 한번 웹 페이지가 브라우저에서 보여지면 완전하게 상호작용이 가능하다.
4. 자바스크립트 파일을 브라우저가 사용할 수 없는 환경에서도 웹 페이지는 보여진다.

### 단점

1. 인터넷이 없거나 느린 환경에서는 반응성이 좋지 않다. 모든 페이지를 서버를 통해 HTML을 가져와야하기 때문이다.
2. 서버 트래픽이 증가한다. 왜냐하면 모든 요청에 HTML 파일을 생성해야하기 때문이다.
3. 동적으로 데이터를 처리하는 JS 파일을 다운받기 전에는 사용자가 웹 어플리케이션과 상호작용 할 수 없다. 버튼을 눌러도 반응이 없을 수 있다는 이야기다. 이것은 [TTV](#TTV)와 [TTI](#TTI)의 차이가 크다고 말할 수 있다.

# SPA 어플리케이션에서 SSR이 필요한 이유.

CSR과 SSR의 장 단점을 비교해보았을 때, SPA에서 SSR이 필요한 이유를 다음과 생각해볼 수 있다.

1. 처음 로딩 때 사용자에게 보여줄 화면을 빠르게 렌더링 하기 위해서
2. SEO 최적화를 조금 더 원활하게 하기 위해서
3. 자바스크립트 파일을 사용할 수 없는 브라우저에서도 일단 어플리케이션의 뷰를 보여주기 위해서(빈 화면을 보여주지 않기 위해서)

CSR과 SSR은 대척점에 서있는 것 처럼 생각할 수 있지만 리액트를 기반으로 두 기술을 섞어 쓸 수 있는 방법이 있다. 대표적인 프레임 워크로는 GatsbyJS와 NextJS가 있다.

# NextJS

NextJS는 SSG를 사용할 수 있도록 기술적으로 지원하고 있다. [SSG는 어플리케이션을 빌드 할 때 HTML을 생성한다.](https://tsh.io/blog/ssr-vs-ssg-in-nextjs/) 따라서 서버는 클라이언트에 요청에 빠르게 HTML을 보내줄 수 있다. 또한 변경되는 부분에 대해서만 새롭게 DOM을 변경하게 된다. 그래서 SSR과 다르게 초기 로딩 이후에 속도도 빠르며 CSR과 다르게 초반에 보여주어야할 페이지를 빠르게 보여줄 수 있다.

하지만 SSG도 단점이 존재한다. [모든 URL에 대해 개별 HTML을 생성해야한다. 그렇기 때문에 모든 URL을 예측할 수 없다면 적용하기 어렵다.](https://ajdkfl6445.gitbook.io/study/web/csr-vs-ssr-vs-ssg#ssg-1)

## NextJS 세팅하기

NextJS의 [Docs](https://nextjs.org/docs/getting-started)에서는 Node.js 12.22.0 이상 MacOS, Windows(WSL포함), Linux를 시스템 권장 사항이라고 한다.

[Docs](https://nextjs.org/docs/getting-started)를 설치하는 방법은 다음과 같다. 타입스크립트와 함께 사용하기 위해서는 --typescript를 붙이면 된다.

```shell
# js
npx create-next-app@latest
# typescript
npx create-next-app@latest --typescript
# or
yarn create next-app --typescript
# or
pnpm create next-app --typescript
```

NextJS는 React를 기반으로 하는 프레임워크이다. 따라서 수동으로 세팅을 하려면 react와 react-dom을 함께 설치해야한다. 수동 세팅 방법은 [Docs](https://nextjs.org/docs/getting-started#manual-setup)를 살펴보면 안내받을 수 있다.

## yarn start를 입력 했을 때 어떻게 실행 될까?

> 과제 요구사항
> Next.js 프로젝트를 세팅한 뒤 yarn start 스크립트를 실행했을 때 실행되는 코드를 nextjs github 레포지토리에서 찾은 뒤, 해당 파일에 대한 간단한 설명을 첨부해주세요.

프로젝트를 자동 세팅 하고난 뒤에 터미널에 yarn start를 입력하면 다음과 같은 에러 메시지를 볼 수 있다.

```shell
 Error: Could not find a production build in the '/user/excersice/.next' directory. Try building your app with 'next build' before starting the production server. https://nextjs.org/docs/messages/production-start-no-build-id
    at NextNodeServer.getBuildId (/user/excersice/node_modules/next/dist/server/next-server.js:169:23)
    at new Server (/user/excersice/node_modules/next/dist/server/base-server.js:58:29)
    at new NextNodeServer (/user/excersice/node_modules/next/dist/server/next-server.js:70:9)
    at NextServer.createServer (/user/excersice/node_modules/next/dist/server/next.js:140:16)
    at async /user/excersice/node_modules/next/dist/server/next.js:149:31
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

.next를 찾을 수 없다고 한다. yarn start는 build가 되어있어야 실행을 할 수 있다. yarn build를 터미널에 입력하고 다시 yarn start를 입력하면 .next 파일이 생성되고 실행 된다. 실행이 된다.

[에러 메시지를 보면 세가지 파일이 실행되는 것을 볼 수 있다.](https://github.com/vercel/next.js)

> at NextNodeServer.getBuildId (/user/excersice/node_modules/next/dist/server/**next-server.js:169:23**)
> at new Server (/user/excersice/node_modules/next/dist/server/**base-server.js:58:29**)
> at new NextNodeServer (/user/excersice/node_modules/next/dist/server/**next-server.js:70:9**)
> at NextServer.createServer (/user/excersice/node_modules/next/dist/server/**next.js:140:16**)
> at async /user/excersice/node_modules/next/dist/server/**next.js:149:31**

**next-server.ts**

```ts
export default class NextNodeServer extends BaseServer {
  // 생략
  protected getBuildId(): string {
    const buildIdFile = join(this.distDir, BUILD_ID_FILE);
    try {
      return fs.readFileSync(buildIdFile, "utf8").trim();
    } catch (err) {
      if (!fs.existsSync(buildIdFile)) {
        throw new Error(
          `Could not find a production build in the '${this.distDir}' directory. Try building your app with 'next build' before starting the production server. https://nextjs.org/docs/messages/production-start-no-build-id`
        );
      }

      throw err;
    }
  }
  // 생략
}
```

NextNodeServer라는 클래스를 통해서 경로 상에 있는 build 파일을 읽어오는 역할을 한다는 것을 어렴풋이 알 수 있다. BaseServer(base-server.ts)에서 확장된 클래스이다. 오류 메시지는 getBuildId() 메소드가 buildFile 경로를 읽어야하는데 그럴수 없었다는 의미다.

**base-server.ts**

```ts
export default abstract class Server<ServerOptions extends Options = Options> {
  protected abstract getBuildId(): string;
  protected renderOpts: {
    buildId: string;
  };
  public constructor(options: ServerOptions) {
    this.renderOpts = {
      buildId: this.buildId,
    };
    this.buildId = this.getBuildId();
  }
}
```

base-server.ts는 abstract가 붙어있는 것을 보면 Server와 관련된 블루프린트인 것 같다. getBuildId 메소드나 객체의 type 정보가 정의되어있다.

**next.ts**

```ts
const getServerImpl = async () => {
  if (ServerImpl === undefined)
    ServerImpl = (await Promise.resolve(require("./next-server"))).default;
  return ServerImpl;
};

class NextServer {
  constructor(options: NextServerOptions) {
    this.options = options;
  }
  private async createServer(options: DevServerOptions): Promise<Server> {
    if (options.dev) {
      const DevServer = require("./dev/next-dev-server").default;
      return new DevServer(options);
    }
    const ServerImplementation = await getServerImpl();
    return new ServerImplementation(options);
  }
}

function createServer(options: NextServerOptions): NextServer {
  if (options == null) {
    throw new Error(
      "The server has not been instantiated properly. https://nextjs.org/docs/messages/invalid-server-options"
    );
  }

  if (
    !("isNextDevCommand" in options) &&
    process.env.NODE_ENV &&
    !["production", "development", "test"].includes(process.env.NODE_ENV)
  ) {
    log.warn(NON_STANDARD_NODE_ENV);
  }

  if (options.dev && typeof options.dev !== "boolean") {
    console.warn(
      "Warning: 'dev' is not a boolean which could introduce unexpected behavior. https://nextjs.org/docs/messages/invalid-server-options"
    );
  }

  if (shouldUseReactRoot) {
    (process.env as any).__NEXT_REACT_ROOT = "true";
  }

  return new NextServer(options);
}
```

next.ts 어플리케이션이 실행될 server를 구현하는 역할을 한다. NextServer 클래스의 createServer() 메소드는 getServerImpl 함수가 실행이 끝날때까지 기다렸다가 완성되면 ServerImplementation(options)를 실행하여 서버를 만든다. getServerImpl 함수는 next-server.ts의 실행 결과를 불러와 최종 반환되는 결과를 반환한다.
만약 option.dev가 true이면 DevServer를 실행시킨다. 개발용 서버는 next-dev-server.ts를 참조한다.createServer 함수는 options를 참조하여 new NextServer(options)를 반환한다.

# 마무리

이번 아티클은 과제로 진행한 것이지만 많은 것을 배울 수 있었다. SS부터 SSG까지 기술이 생겨난 역사적 맥락을 알아볼 수 있었다. 그리고 내가 사용하고 있는 리액트라는 프레임워크의 장단을 알 수 있었다. 마지막으로 NextJS가 필요한 이유, 사용하는 이유에 대해서 간략하게 알아보았다.

왜 CSR, SSR, SPA, SSG와 같은 기술들이 생겨났을까? 나는 이 기술들이 생겨난 이유는 좋은 UX를 사용자에게 어떻게 제공할 것인지에 대한 고민과 해결책이라고 본다. 디자이너는 사용자에게 좋은 UX를 시각적으로 어떻게 제공할 것인지에 대한 고민을 하는 직군이라면 프론트앤드 개발자는 좋은 UX를 기술적으로 어떻게 제공할 것인지에 대한 고민을 하는 직군인 것 같다. NextJS를 배우면서 사용자의 이탈을 줄이고 더 많은 사용자가 유입될 수 있는 어플을 개발하기 위한 방법은 무엇인지 알게되고싶다.

# 부록

<h2 id="TTI">TTI(Time To Interact)</h2>

TTI는 사용자가 웹 브라우저에서 컨텐츠와 상호작용 할 수 있는 시점이다.

<h2 id="TTV">TTV(Time To View)</h2>

TTV는 사용자가 웹 브라우저에서 컨텐츠를 볼 수 있는 시점이다.

# 참조한 컨텐츠

- 🎥 [드림코딩 - 서버사이드 렌더링 (개발자라면 상식으로 알고 있어야 하는 개념 정리 ⭐️)](https://www.youtube.com/watch?v=iZ9csAfU5Os)
- 📄 [MDN - 프로그래시브 웹 앱 구조](https://developer.mozilla.org/ko/docs/Web/Progressive_web_apps/App_structure#%EC%95%B1%EC%9D%98_%EA%B5%AC%EC%A1%B0)
- 📄 [Server Side Rendering (SSR) vs. Client Side Rendering (CSR) vs. Pre-Rendering using Static Site Generators (SSG) and client-side hydration.](https://medium.com/@prashantramnyc/server-side-rendering-ssr-vs-client-side-rendering-csr-vs-pre-rendering-using-static-site-89f2d05182ef)
- [SSR vs SSG in Next.js – a practical overview for CTOs and devs](https://tsh.io/blog/ssr-vs-ssg-in-nextjs/)
- 📄 [콥 노트 - CSR vs SSR vs SSG; SSG 단점](https://ajdkfl6445.gitbook.io/study/web/csr-vs-ssr-vs-ssg#ssg-1)
- 📄 [NextJS - Docs](https://nextjs.org/docs/getting-started)
- 📄 [Next.js 깃 저장소](https://github.com/vercel/next.js)
