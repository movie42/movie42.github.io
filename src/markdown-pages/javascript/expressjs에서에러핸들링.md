---
slug: "/javascript/expresssjs에서_에러핸들링하기"
date: "2022-08-24"
title: "ExpressJS에서 에러 핸들링 하기"
tags: ["expressjs", "error", "javascript"]
---

자바스크립트에서 try{}catch{}를 사용하면 에러 핸들링을 하는 것은 그렇게 어렵지 않게 느껴진다. 하지만 서비스를 만들다가 try{}catch{}를 모든 함수에서 일일이 다 하다보니 반복되는 예외 처리가 부담스러워졌다. 또 뭔가 변경점이 있을 때 코드를 수정해야하는데 예외 처리가 한개 이상일 때 너무 어려웠다. 사용자가 어플리케이션을 사용하는 도중에 동작을 안하는 이유를 반드시 알려줘야할 필요가 있었다.

이번 아티클을 부리케나 작성하게 된 이유는 에러 처리에 대한 좋은 방법을 찾았기 때문이라기보다 [유인동 - ES6+ 비동기 프로그래밍과 실전 에러 핸들링](https://www.youtube.com/watch?v=o9JnT4sneAQ&list=PLxtfsEgwB_8fPhoDrX9QSJH8MWy0eLuLI&index=288)를 보고 겪고 있는 문제를 조금이라도 해결하고 넘어가야겠다는 동기를 부여 받았기 때문이다. '프론트 앤드 개발자니까 백앤드 코드는 신경쓸 필요 없지 않을까?'라는 나이브한 생각을 했었던 과거를 반성한다.'

# 문제

```javascript
const userDetail = async (req, res) => {
  const {
    cookies: { accessToken },
  } = req;

  try {
    const secret = req.app.get("JWT_SECRET");
    const user = jwt.verify(accessToken, secret);

    if (!user) {
      return res.status(403).json({
        message: "인증되지 않은 사용자 입니다.",
      });
    }

    const findUser = await User.findById(user._id)
      .populate("blog")
      .populate("notice")
      .populate("worship");

    return res.status(200).json({ user: findUser });
  } catch (e) {
    console.log(e);
    return res.status(403).json({
      message: "사용자를 찾을 수 없습니다.",
    });
  }
};
```

유인동님은 위의 강의에서 '에러 처리를 하지 않는 것'이 좋은 코드라고 설명한다. 그게 에러를 처리하지 말라는게 아니라 에러를 발생시키고 함수 안에서 숨기지 말라는 것과 예외 처리는 함수 밖에서 하라는 조언이었다. 에러를 숨기게 되면 당장은 좋지만 사용자가 그것을 감내해야한다는 소리가 좀 아프게 와닿았다.

나의 서버에는 위의 코드가 계속 반복된다. 반복도 문제지만 위에서 작성한 예외 상황 외의 상황이 또 발생한다면 그것은 잡아내지 못한다. 한 예로 JWT가 만료된 상황에서 사용자가 토큰이 필요한 동작을 진행하면 서버가 터지는데 그것에 대한 예외 처리가 없다보니까 말 그대로 서비스가 셧다운 된다. 그래서 주말마다 소환되었던 적이 있다. 임시로 토큰의 만료 기간을 늘리는 것으로 해결했지만 처리가 적절하지 않았다.그래서 위와 같이 반복되는 예외 처리를 다른 함수에 위임해서 전역으로 처리하는 방법을 찾아보기로 했다.

#

[올바른 예외 처리](https://expressjs.com/ko/advanced/best-practice-performance.html#%EC%98%AC%EB%B0%94%EB%A5%B8-%EC%98%88%EC%99%B8-%EC%B2%98%EB%A6%AC)
[Nodejs에서 올바르게 에러 처리하기](https://yceffort.kr/2021/06/error-handling-in-nodejs)
