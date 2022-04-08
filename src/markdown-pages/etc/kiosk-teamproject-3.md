---
slug: "/blog/etc/kiosk-team-project-3"
date: "2022-04-08"
title: "Apollo-server로 서버 세팅"
tags: ["team project", "etc", "apollo-server", "graph-ql", "prisma"]
---

프로젝트를 시작한지 일주일이 거의 다 되어간다. 조금 화나는 일을 겪기도 했지만 주절주절 적을 필요는 없을 것 같다. 어찌됐든 결국 백앤드 개발자가 프로젝트에 합류하지 않았다. 아마도 이번 프로젝트가 그다지 매력이 없다고 생각한 것 같다. 공고도 더이상 조회수가 올라가지 않는다. 그래서 그냥 지금까지 배운것을 토대로 서버를 빌딩하기 시작했다.

## 서버 세팅

서버는 [Apollo-server-express](https://www.apollographql.com/docs/apollo-server/integrations/middleware/#apollo-server-express)를 사용해서 세팅하기로 했다. 일단 프론트와 백앤드에서 사용하기 편하다고 한다. 아직 사용해보지 않아서 거기까지는 모르겠다. REST API 대신 GraphQL을 사용해서 단일 엔드 포인트를 만들어보기로 했다. GraphQL은 여러가지 장점이 있다고 하는데 나는 overfetching 문제를 해결해보고 싶었다. REST API를 사용하면서 Overfetching을 많이 겪게 되었다. end point를 작성할 때, 어느때는 id만, 어느때는 email만 주는 api를 따로 작성하면 비효율적이기 때문에 대부분 특정 user를 요청하면 id부터 시작해서 모든 정보를 전부다 던져준다. 이런 문제를 해결할 수 있을 것이라고 기대해본다.

Prisma는 ORM(Object Relation Mapping)이다. 따로 SQL 문을 쓸 필요 없이 데이터 베이스에 쉽게 연결이 가능하다.(그렇다고 한다.) 지금까지 사용해본 결과 \*.model.js를 따로 쓸 필요없이 prisma에서 model을 쓰면 된다. mongoDB와 연결하는 방법은 [Start from scratch MongoDB - prisma documents](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb-typescript-mongodb)라는 글을 보면 된다.

Typescript를 사용하기로 했다. 이왕 프론트에서 사용한 김에 백앤드에서도 한번 사용해보자는 취지다. Typescript는 사용하면서 편리함과 불편함을 두 개 다 갖추고 있다. 지금까지 경험한 편리함은 두 가지다 객체 맵핑이 된다. 한번 타입을 내가 지정해 놓으면 절대로 다른 타입이 들어갈 여지를 주지 않는다. 이 말은 설계를 할 때 고민을 많이 하게 된다. 왜냐하면 서로 오고가는 데이터를 무조건 any로만 할 수 없잖아... 단점(?)은 개발 속도가 엄청 느리다. 기계는 알고 나는 모르는 타입의 형태를 찾아 헤매는데 시간이 꽤 걸린다. 내가 지정한 타입이 동작하면 기분은 좋은데 가끔 "이렇게 하는데 된다고?"하는 것도 있어서 이유를 모르고 동작하는 것도 있다. 그래도 사용해보기로 했다. 익숙해지려면 많은 시간에 노출되어서 많이 사용해보는 수밖에 없는 것 같다.

## 마무리

사실 그냥 express, rest api, javascript를 사용해서 지금까지 알던 것만 그냥 적용해보려고 했는데 어차피 토이 프로젝트이고 장점과 단점은 남의 블로그 글을 죽어라고 봐봤자 직접 경험해보고 설명하는 것과는 천지 차이라고 생각해서였다. 내가 왜 이걸 사용해야하지? 라는 당위성을 찾다가 '아니... 아직 사용도 안해보고 무슨 당위성 찾고있어 직접 사용해보고 작성해보고 눈으로 보고 장점을 경험해봐야지'라는 생각이었다. 생각해보니 그렇다. 일단 남들이 써놓은 글을 보고 '장점이 이렇다고?'라고 보았으면 사용해보고 '아니던데?'라던가 '그거 강추야'라고 말하는 편이 더 좋을 것 같다.
