---
slug: "/css/height100"
date: "2022-09-17"
title: "왜 height : 100%는 의도한대로 동작하지 않을까?"
tags: ["css", "frontend"]
---

가끔 어떤 컨테이너에 꽉찬 이미지를 가지는 UI를 만들기 위해서 또는 아무런 컨텐츠가 없을 때 기본 높이가 꽉찬 상태를 유지하게 하기 위해서 height : 100%를 무심코 썼다가 동작을 하지 않는 것을 알게 된다. 부끄러운 일이지만 왜 이런일이 일어나는지 정확하게 알지 못한 체 그냥 주먹구구로 해결하고 넘어가곤 했다.

**이런 식으로...**

```css
// 헤더의 높이가 56.32px이니까...
.main-container {
  height: 80vh;
}
// 이렇게 하면 되지 않을까?
```

하지만 기술 면접을 보면서 '**어떤 컨테이너에 들어가더라도 비율을 유지하는 이미지 컨테이너를 만들기 위해서는 어떻게 해야하나요?**'라는 질문을 받고 경험적으로 더듬거리면서 대답을 했다. 식은 땀이 났다. height를 결정하는 원리를 잘 몰랐다. 내가 css에 대해서 잘 알고 있다고 생각했지만 **동작을 기준**으로 코드를 작성했을 때 언젠가는 동작하기 때문에 잘 알고 있다고 착각한 했다. 그래서 height가 어떻게 동작하는지 개념적으로 이해해보고 내가 경험한 예제들을 몇 가지 정리해보려고 한다.

# height

MDN에 [height](https://developer.mozilla.org/en-US/docs/Web/CSS/height)는 다음과 같이 정의되어있다.

> css의 속성이며 엘리먼트의 높이를 지정한다. 기본 값은 content area의 높이로 정의된다. 그러나 만약 box-sizing 속성이 border-box로 정해져있다면 border area의 높이로 결정된다.

## 박스 모델의 기본

문서에 걸려있는 [링크](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model#content_area)를 타고 가면 css의 기본 box model을 볼 수 있다. 거기에 content area와 border area의 정의를 알 수 있다. 모든 박스는 content edge, padding edge, border edge, margin edge로 구성된다.

![박스 모델](<https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model/boxmodel-(3).png>)

<div class="remark">
  <small>
    이미지 출처 -{" "}
    <a
      href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model#content_area"
      target="_blank"
    >
      MDN Introduction to the CSS basic box model
    </a>
  </small>
</div>

**content area**는 content edge에 의해 경계가 지정되고 실제 컨텐츠를 포함한 영역이다. box-sizing 속성은 content-box가 기본값이고 이 엘리먼트가 블록 엘리먼트인 경우에 컨텐 영역의 사이즈는 with, min-width, max-width, height, min-height, max-height 속성으로 명시적으로 정의될 수 있다.

**border area**는 border edge를 경계로 엘리먼트의 border를 포함하도록 padding 영역을 확장한다. border의 크기는 border-width 또는 border 속성을 통해 결정된다. 만약 box-sizing 속성이 border-box로 되어있으면 border area의 크기는 width, min-width, max-width, height, min-height, max-height 속성으로 명시할 수 있다.

[박스 모델 예제](https://stackblitz.com/edit/js-ixc4fq?embed=1&file=style.css)

## 높이를 결정하는 값들

높이는 length value, percentage value, keyword value, global value로 결정될 수 있다.

```css
/* <length> values */
height: 120px;
height: 10em;
height: 100vh;

/* <percentage> value */
height: 75%;

/* Keyword values */
height: max-content;
height: min-content;
height: fit-content(20em);
height: auto;

/* Global values */
height: inherit;
height: initial;
height: revert;
height: revert-layer;
height: unset;
```

<div class="remark">
  <small>
    코드 출처 -{" "}
    <a
      href="https://developer.mozilla.org/en-US/docs/Web/CSS/height#syntax"
      target="_blank"
    >
      {" "}
      MDN height Syntax
    </a>
  </small>
</div>

자주 쓰는 값만 살펴보면 length값은 높이의 절대값이다. percentage값은 컨테이닝 블록 높이의 백분율이다. auto는 브라우저가 요소의 높이를 계산하고 선택한다.

# height 속성의 value는 어떤 값을 기준으로 결정되는 것일까?

[CSS에서 사용할 수 있는 다양한 숫자 데이터 형식](https://developer.mozilla.org/ko/docs/Learn/CSS/Building_blocks/Values_and_units#%EC%88%AB%EC%9E%90_%EA%B8%B8%EC%9D%B4_%EB%B0%8F_%EB%B0%B1%EB%B6%84%EC%9C%A8)이 있는데 **length value**에는 px, em, vh의 단위가 있다. length에는 절대 길이 단위와 상대 길이 단위로 나뉜다.

**절대 길이 단위**는 다른 것과 관련이 없고 그 자체로 기준이 된다. cm, mm, px 등의 여러 값이 있는데 브라우저에서는 px을 사용한다.

**상대 길이 단위**는 다른 요소와 관련이 있다. 상위 요소의 글꼴 크기나 viewport의 크기를 기준으로 삼는다. 웹 개발에서 유용한 단위는 em, ex, ch, rem, vw, vh, vmin, vmax, 1h의 값이 있다. 단위에 대한 좋은 아티클이 있어서 소개한다.

> [WATCHA 개발 지식 - px | em | rem](https://medium.com/watcha/watcha-%EA%B0%9C%EB%B0%9C-%EC%A7%80%EC%8B%9D-px-em-rem-f569c6e76e66)

**백분율**은 항상 다른 값에 상대적으로 설정된다. width에 백분율을 적용하면 부모의 너비의 백분율이 된다.

그럼 height의 길이는 어떻게 결정되는 걸까? 나름대로 위의 이론을 바탕으로 예제를 만들어 보았다.

<iframe-container iframeLink="https://stackblitz.com/edit/js-t515g4?embed=1&file=style.css"></iframe-container>

```css
html,
body {
  font-size: 10px;
}

div {
  margin: 10px auto;
}

.px {
  width: 200px;
  height: 200px;
  background-color: aqua;
}
.em {
  width: 200px;
  height: 20em;
  background-color: aquamarine;
}
.rem {
  width: 200px;
  height: 20rem;
  background-color: blue;
}
.percent {
  width: 200px;
  height: 10%;
  background-color: brown;
}
```

예제를 보면 px, em, rem은 단위를 설정한대로 컨텐츠가 높이를 차지하고 있다. 그런데 %단위를 쓴 경우에는 높이를 차지하지 못하고 있다. height의 높이는 분명 있는데 컨테이너의 px의 상대 값을 계산하고 있지 못한다. 왜 이러는걸까? 위에서 **height의 percentage 값은 컨테이닝 블록 높이의 백분율**이라고 했다. 그럼 컨테이닝 블록은 무엇일까?

# 컨테이닝 블록

자식 컨테이너는 언제나 부모의 엘리먼트의 콘텐츠 영역에 영향을 받는다고 생각했다. 요소의 크기와 위치는 컨테이닝 블록의 영향을 받는다. 물론 컨테이닝 블록은 대부분 가장 가까운 블록 레벨 조상의 컨텐츠 영역이지만 **항상 그렇지 않다.** **자식 엘리먼트는 부모 요소를 절대로 삼는 것이 아니라 컨테이닝 블록에 영향을 받는다.**

컨테이닝 블록 식별은 position 속성에 따라 완전 달라진다. 아래 요약은 [MDN의 컨테이닝 블록의 모든 것](https://developer.mozilla.org/ko/docs/Web/CSS/Containing_block)에서 가져와 정리를 하였다.

> 1. **position 속성이 static, relative, sticky 중 하나일 때** 가장 가까운 조상 블록 컨테이너 또는 가장 가까우면서 서식 맥락을 형성하는 조상 요소의 콘텐츠 영역 경계를 따라 컨테이닝 블록이 형성된다.
> 2. **position 속성이 absolute**인 경우, position 속성 값이 static이 아닌 가장 가까운 조상의 내부 여백 영역이 컨테이닝 블록이 된다.
> 3. **position 속성이 fixed**인 경우, 뷰포트나 페이지 영역이 컨테이닝 블록이 된다.
> 4. position 속성이 absolute나 fixed인 경우, 다음 조건 중 하나를 만족하는 가장 가까운 조상의 내부 여백 영역이 컨테이닝 블록이 될 수도 있습니다.
>
> - transform이나 perspective 속성이 none이 아님.
> - will-change 속성이 transform이나 perspective임.
> - filter 속성이 none임. (Firefox에선 will-change가 filter일 때도 적용)
> - contain 속성이 paint임.

컨테이닝 블록이 어떻게 결정되는지 알았다면 height의 백분율 값이 어떻게 계산 되는지도 알아야한다.

> height, top, bottom 속성은 **컨테이닝 블록의 height를 사용해 백분율을 계산**합니다.
>
> - 컨테이닝 블록의 height가 콘텐츠의 크기에 따라 달라질 수 있는 경우 계산 값은 0이 됩니다.
> - 컨테이닝 블록의 position이 relative거나 static이면 height의 계산값은 0이 됩니다.
>
> width, left, right, padding, margin 속성은 컨테이닝 블록의 width를 사용해 백분율을 계산합니다.

위의 내용을 바탕으로 분석을 해보자.

```html
<html>
  <body>
    <div class="percent"></div>
  </body>
</html>
```

```css
/* 가장 가까운 조상 요소 */

.percent {
  /* static default*/
  position: static;
  height: 10%;
}
```

1. .percent의 position 속성은 기본값으로 static을 갖는다. 그렇다면 가장 가까운 조상 요소가 컨테이닝 블록이 된다.(여기서 조상 요소는 부모도 포함되는 것으로 보인다.)
2. 그러나 .percent의 height는 0으로 계산된다. 왜냐하면 height의 값이 퍼센테이지 값이고 가장 가까운 조상인 body의 높이는 기본 값으로 auto이기 때문이다.
3. .percent에게 값을 주기 위해서는 조상 요소의 높이 값이 결정되어 있어야한다.
4. 그럼 body에 높이 값을 절대나 상대 값으로 주게되면 height가 계산된다.

<div class="embeded-video">
  <iframe src="https://stackblitz.com/edit/js-jzapxe?embed=1&file=style.css"></iframe>
</div>

위의 예제에서 컨텐츠의 맥락을 형성하는 가장 가까운 엘리먼트는 부모 컨테이너이고 div.percent의 부모는 body이다. 여기서 만약 div를 다른 엘리먼트로 감싸게 되면 height가 사라져버린다.

# 넓이와 높이가 일정한 비율을 유지하는 이미지 UI 만들기

방법과 상황은 여러 가지가 있다. 중요한 것은 이미지의 높이를 100%로 주었을 때, 브라우저가 엘리먼트의 높이를 결정하는 원리에 대해서 이해하고 있는 것이다. 카드형 UI를 만드는 것은 크게 어렵지 않지만 어떤 원리로 height의 퍼센테이지 값이 계산되는지 원리를 아는 것이 중요하다.

<div class="embeded-video">
  <iframe src="https://stackblitz.com/edit/js-3z9utt?embed=1&file=style.css"></iframe>
</div>

[예제](https://stackblitz.com/edit/js-3z9utt?file=index.js,index.html,style.css)는 브라우저의 넓이가 변할 때 일정한 비율로 넓이와 높이가 변경되는 이미지 컨테이너다. height는 퍼센테이지 값으로 주었다.

여기에서 .child의 height 값이 계산될 수 있는 이유는 가장 가까운 맥락의 컨테이닝 블록(.parents)의 높이가 auto가 아니기 때문이다. 만약 값이 없다면 auto가 되고 .child의 height 값도 0이된다.

예제의 UI는 세 가지 방법으로 만들어졌다.

1. padding-top 값을 원하는 만큼의 비율을 주어서 UI가 브라우저 창에 따라 변경되도록 하는 방법.
   - 자기 자신의 position이 absolute이기 때문에 static이 아닌 가장 가까운 조상 요소에 공백 영역이 컨테이닝 블록이 된다.
   - 부모에 padding-top 값이 주어졌기 때문에 브라우저는 이 높이를 기준으로 퍼센테이지 값을 계산한다. 만약 아무런 값이 없다면 0이된다.
2. calc 속성을 사용해서 비율을 계산하는 방법
   - 자기 자신의 position이 static이기 때문에 컨텐츠의 맥락을 형성하는 가장 가까운 조상 요소를 따라 height 값이 계산된다.
3. aspect-ratio 속성을 사용해서 비율을 계산하는 방법
   - 자기 자신의 position이 static이다. 그래서 가장 가까운 조상 요소인 부모를 따라 height값이 계산된다.

# 마무리

height의 동작 방법이 왜 이렇게 까다로운건지 조금 짜증이 났다. 그런데 한편으로 height 100%가 어떠한 절대 값을 기준으로 동작한다면 다양한 UI를 만들기 더 어려웠을 것이란 생각이 들었다.

레이아웃의 기본 높이를 100%를 주는 경우 동작을 안하는 경우에 대해서 왜 그런지 생각해볼 수 있는 기회였다. 하지만 뷰포트 단위가 나오면서 기본 넓이를 주는 방법은 덜 까다로워졌다. 뷰포트 단위는 상대 단위에 속하기 때문에 브라우저의 창 크기를 기준으로 상대 값을 계산한다.

카드형 UI는 경우에 따라 grid나 flex를 사용하는 경우가 많다. 이미지와 텍스트의 배치가 까다로워지기 때문에 원하는대로 UI가 생성되지 않을 가능성을 항상 염두에 두고 있다. 하지만 그냥 주먹 구구식으로 UI를 만들다 보면 만들 때마다 시간을 들여서 동작 할때까지 코드를 바꾸는 뻘짓을 해야할지도 모른다. 그러한 수고를 덜기 위해서 내가 의도한 것과 다르게 동작하는 것이 왜 그런지 탐구해보고 그것을 생각하면서 UI를 만드는 습관을 가져야겠다.
