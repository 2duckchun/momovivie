# MOMOVIVIE

- 프로젝트 주소 : https://momovivie-2dc.web.app/

## 프로젝트 설명

> 영화가 보고싶지만 보고싶은 영화는 딱히 없을 때 사용하면 좋은 어플리케이션입니다.

- 유저들이 한번이라도 클릭했었던 영화 중 랜덤하게 10개를 뽑아 영화를 추천해줍니다.
- 랭킹별 영화(평점 1위~10000위)를 확인할 수 있습니다.
- 각 영화에 감상평 등 댓글을 달 수 있으며, 댓글이 달린 영화의 필터링이 가능합니다.

## 제작 동기

- Next.js를 배울 목적으로 시작한 개인 토이프로젝트입니다.
- 멋진 영화 API를 발견했고, 이를 이용해 실제로 사용할 수 있는 앱을 만들 수 있다고 생각했습니다.

## 주요 기술

- Next.js : Next.js 13버전을 사용하여 앱을 빌드했습니다.
- Firebase : 영화 db 저장, 댓글 기능을 구현하기 위해 파이어베이스를 사용했습니다.
- TypeScript : 엄격한 문법 지원을 통한 유지보수 및 개발 편의성을 위해 사용했습니다.

## 문제 발견 및 해결 과정

### 필터된 영화를 본 후 뒤로가기 시 기존 화면 정보 손실

- 필터링된 영화를 보다가 뒤로가기를 클릭할 경우, 화면이 초기화 되었습니다.
- 이는 심각한 사용자 경험 저하를 가져왔습니다.
- 이를 해결하기 위해서 이전 화면 데이터들의 보존이 필요했습니다.
- 초기에는 세션 스토리지에 데이터를 보관하는 것을 구상했습니다.
  - 세션 스토리지에 객체를 보관하면 객체의 프로토타입이 바뀌는 것을 알게 되었습니다.
  - 필터에 필요한 DB 커서는 firebase 고유 프로토타입이 존재했습니다.
  - 따라서, 이 방법은 제 상황에 올바른 방법이 아니라 판단하여 철회했습니다.
- **Context API 도입으로 문제를 해결했습니다.**
  - 데이터 유형을 보존하면서도, state를 전역적으로 안전하게 보관할 수 있는 방법인 Context API을 도입하여 문제를 해결했습니다.
  - 필터링에 관한 데이터를 Context API 내부에 선언한 useReducer로 관리 했습니다.
  - 사이트의 규모가 커진다면 리렌더링을 막기위해 상태관리 전용 라이브러리를 도입해볼 수 있겠다고 생각하게 되었습니다.

### peer dependencies 해결

- react-select 라이브러리를 도입 후 발견한 의존성 관련 문제였습니다.
- Next.js와 react-select가 같은 의존성인 emotion/react를 사용했는데 버전이 달라 peer dependencies 경고가 생겼습니다.
- node.js 공식문서 및 검색을 통해 peer dependencies 문제를 인지했습니다.
- **react-select의 package.json을 직접 수정해 의존성 중복 문제를 해결했습니다.**
- 과도한 라이브러리의 도입은 의존성 문제를 크게 만들 수 있다는 것을 체감하게 되었습니다.
- 문제 해결에 관련된 자세한 이야기를 [블로그](https://2duckchun.tistory.com/468)에 정리해서 포스팅했습니다.

### 리액트 숙련도 문제

- Next.js를 배우고자 시작한 프로젝트이지만, 리액트 라이브러리에 대해 깊은 이해 없이 프로젝트를 시작했습니다.
- 이는 이해하기 어려운 사이드 이펙트와 로직의 복잡함으로 이어졌습니다.
- 따라서, 개발 이전에 리액트에 대한 이해도를 키워야 한다고 판단했습니다.
- 이 후, **약 2주간 리액트 공식문서의 가이드를 이해하고 번역하는 시간을 가졌습니다.**
- 시간을 들여 공부한 후, 리액트의 기능을 비교적 의도적으로 도입할 수 있게 되었으며, 리액트의 기능 도입을 컴포넌트의 시점에서 판단할 수 있게 되었습니다.

## 설계

- 사용자와 상호작용이 있었던 영화 데이터를 동적으로 사용할 수 있도록 설계했습니다.
  - 외부 영화 API를 통해 얻은 데이터를 사용자에게 제공합니다.
  - 사용자가 특정 영화에 상호작용(클릭, 댓글 등)을 할 경우, 파이어스토어 DB에 실시간으로 반영됩니다.

### 외부 영화 API

- axios 라이브러리 사용
  - axios의 인스턴스, interceptors를 이용해 프론트단에서 에러 유무를 파악할 수 있도록 설계했습니다.
  - parser 함수를 통해 외부로부터 받은 데이터를 화면과 분리했습니다. API의 DTO 명세가 변경되더라도, parser 함수만 변경하면 앱이 정상적으로 동작하도록 구현했습니다.

### 파이어스토어 DB

- 파이어스토어의 NoSQL DB를 이용했습니다.
- 사용자가 특정 영화에 상호작용을 한다면 해당 영화가 collection에 document로 등록됩니다.
- 특정 영화에 댓글을 달면, 특정 영화 내부에 collection이 새로 형성되고, 내부에 댓글이 document로 등록됩니다.
- 사용자 편의를 위해 댓글 수, 댓글 업데이트일을 실시간으로 반영합니다.

### 폴더 구조

```
momovivie
├─ apis
│  ├─ getMovieDetail.ts
│  └─ getMovieList.ts
├─ components
│  ├─ about
│  │  └─ AboutMe.tsx
│  ├─ commented
│  │  ├─ CustomSelect.tsx
│  │  └─ FilteredMovieList.tsx
│  ├─ detail
│  │  ├─ MovieDetail.tsx
│  │  ├─ MovieDetailComment.tsx
│  │  └─ MovieDetailCommentList.tsx
│  ├─ Footer.tsx
│  ├─ Layout.tsx
│  ├─ main
│  │  ├─ Carousel.tsx
│  │  └─ CarouselSlice.tsx
│  ├─ modal
│  │  └─ CommentDeleteModal.tsx
│  ├─ movies
│  │  └─ Pagination.tsx
│  ├─ Navbar.tsx
│  ├─ Seo.tsx
│  └─ share
│     └─ Loading.tsx
├─ context
│  └─ FilteredMovieContext.tsx
├─ db
│  ├─ addMovieDetail.ts
│  ├─ getCommentList.ts
│  ├─ getFilteredMovieList.ts
│  ├─ getMovieCollectionList.ts
│  └─ useMovieDetailComment.ts
├─ firebase
│  └─ config.ts
├─ hooks
│  ├─ useGetRandomMovieList.ts
│  ├─ useMoveToDetail.ts
│  ├─ useTypingAnimation.ts
│  └─ useValidation.ts
├─ pages
│  ├─ 404.tsx
│  ├─ about.tsx
│  ├─ commented.tsx
│  ├─ index.tsx
│  ├─ movies
│  │  ├─ detail
│  │  │  └─ [id].tsx
│  │  └─ [page].tsx
│  ├─ _app.tsx
│  └─ _document.tsx
├─ public
├─ README.md
├─ styles
│  └─ globals.css
├─ types
│  ├─ comment.ts
│  ├─ common.ts
│  └─ movies.ts
└─ utils
   ├─ convertTimestamp.ts
   ├─ getLocalStorageName.ts
   ├─ getRandomMovieList.ts
   └─ setPagination.ts
```

## 느낀점

- **UI 설계를 체계적으로 해야함을 느꼈습니다.**
  - 이 프로젝트는 페이지에 UI를 채운다는 방식으로 UI 설계없이 진행했습니다.
  - 즉, 완성의 초점은 페이지에 맞추어져 있었기 때문에, UI 컴포넌트들의 심미적인 요소가 상대적으로 떨어졌던 것 같습니다.
  - 다음에 개발할 프로젝트는 어느 정도의 Bottom-Up 방식을 도입해서 빈 도화지에 컴포넌트를 하나씩 조립하는 식으로 설계해도 좋겠다고 생각했습니다.
- **개발을 잘하기 위해서는 이론 공부가 상당히 중요하다는 것을 다시 깨달았습니다.**
  - 사람은 자기가 아는 범위 내에서만 사고할 수 있다는 것을 다시금 느꼈습니다.
  - 리액트 공식문서를 훑어보기 전과 훑어보고 난 후의 개발 속도와 느껴지는 재미는 확연히 달랐기 때문입니다.
  - 여유 시간이 있을 때마다 공식문서를 꾸준히 봐야겠다고 생각하게 되었습니다.
