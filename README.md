<br/>
<h1 align="center"> 🎬 <a href="https://momovivie-2dc.web.app/">MOMOVIVIE</a></h1><br/>

<h3 align="center">영화가 보고싶지만 보고싶은 영화가 없다면 사용해보세요!</h3>
<p align="center">평점 1위부터 10,000위까지의 영화를 추천해 드립니다.</p>
<p align="center">랜덤 영화, 사람들이 추천하는 영화도 찾아보실 수 있습니다.</p>

<p align="center">🎞 https://momovivie-2dc.web.app/</p>

<br/>


## 프로젝트 설명

> 영화가 보고싶지만 보고싶은 영화는 딱히 없을 때 사용하면 좋은 어플리케이션입니다.

- 유저들이 한번이라도 클릭했었던 영화 중 랜덤하게 10개를 뽑아 추천해줍니다.
- 랭킹별 영화(평점 1위~10,000위)를 확인할 수 있습니다.
- 각 영화에 감상평 등 댓글을 달 수 있으며, 사용자가 흔적을 남긴 영화는 타인에게 추천됩니다.

<br/>

## 제작 동기

- Next.js를 배울 목적으로 시작한 개인 토이프로젝트입니다.
- 상세한 영화 데이터를 제공하는 API를 발견했고, 이를 이용해 실제로 사용하는 앱을 만들 수 있겠다고 생각했습니다.
  
<br/>

## 주요 기술
<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black"/> <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
- **Next.js** : Next.js가 제공해주는 편리한 라우팅 기능과 SSR을 체험해보기위해 사용했습니다.  
- **Firebase** : 영화 db 저장, 댓글 기능을 구현하기 위해 파이어베이스를 사용했습니다.
- **TypeScript** : 엄격한 문법 지원을 통한 유지보수 및 개발 편의성을 위해 사용했습니다.
<br/>

## 문제 발견 및 해결 과정

<br/>

### [Commented 페이지] 뒤로가기 시 화면, 스크롤 보존

- 필터링된 영화를 보다가 뒤로가기를 할 경우, 화면이 초기화되는 문제 발생.
- 해결하기 위해 이전 화면 데이터 보존 필요.
  - 세션 스토리지 도입했으나 실패(객체의 프로토타입이 변환되는 현상 발생).
- **Context API 도입으로 문제 해결**
  - 데이터 유형을 보존하고, state를 전역적으로 안전하게 보관할 수 있게 Context API 도입.
  - 필터링에 관한 데이터는 useReducer로 관리.

<br/>

### [라이브러리] peer dependencies 해결

- 특정 의존성(emotion-react)이 2번씩 로드되는 문제 발생.
- react-select 라이브러리 도입 후 의존성 관련 문제가 발생한 것을 인지.
- 해당 오류에 관한 Node.js 공식문서 확인 후 peer dependencies를 직접 수정해서 해결.
- **과도한 라이브러리의 도입은 의존성 문제를 야기할 수 있다는 교훈을 얻었음**.
  * 문제 해결에 관련된 자세한 이야기는 [블로그](https://2duckchun.tistory.com/468)에 정리해서 포스팅했습니다.

<br/>

### [본인] 리액트 숙련도 문제
- Next.js를 배우기 위해 시작한 프로젝트이나, 리액트 라이브러리에 대한 이해없이 프로젝트를 시작함.
- 리액트에 대한 이해도가 낮아, 이해할 수 없는 사이드이펙트가 생기고 로직이 복잡해짐.
- 개발 이전에 리액트에 대한 이해도를 키워야 겠다고 판단했고, 약 2주간 리액트 공식문서 가이드를 이해하고 번역하는 시간을 가짐.
- 이 후, 리액트 기능을 비교적 자유롭게 도입할 수 있게 되었으며, 리액트 기능 도입을 컴포넌트의 시점에서 판단할 수 있게 됨.

<br/>

## 설계

- 사용자와 상호작용이 있었던 영화 데이터를 동적으로 사용할 수 있도록 설계함.
  - 외부 영화 API를 통해 얻은 데이터를 사용자에게 제공.
  - 사용자가 특정 영화에 상호작용(클릭, 댓글 등)을 할 경우, 파이어스토어 DB에 실시간으로 반영됨.

### 외부 영화 API
- axios 라이브러리 사용
  - axios의 인스턴스, interceptors를 이용해 프론트단에서 에러 유무를 파악할 수 있도록 설계.
  - parser 함수를 통해 외부로부터 받은 데이터를 화면과 분리함.
  - API의 DTO 명세가 변경되더라도, parser 함수만 변경하면 앱이 정상적으로 동작하도록 구현.

### 파이어스토어 DB

- 파이어스토어의 NoSQL DB 사용.
- 사용자가 특정 영화에 상호작용을 한다면 해당 영화가 collection에 document로 등록됨.
- 특정 영화에 댓글을 달면, 특정 영화 내부에 collection이 새로 생성되고, 내부에 댓글이 document로 등록됨.
- 사용자 편의를 위해 댓글 수, 댓글 업데이트일을 실시간으로 반영.

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
<br/>

<h2 align="center"> ✨ 느낀점 </h2>

<br/>

- **UI 설계를 체계적으로 해야함을 느꼈습니다.**
  - 이 프로젝트는 페이지에 UI를 채운다는 방식으로 UI 설계없이 진행했습니다.
  - 즉, 완성의 초점은 페이지에 맞추어져 있었기 때문에, UI 컴포넌트들의 심미적인 요소가 상대적으로 떨어졌던 것 같습니다.
  - 다음에 개발할 프로젝트는 어느 정도의 Bottom-Up 방식을 도입해서 빈 도화지에 컴포넌트를 하나씩 조립하는 식으로 설계해도 좋겠다고 생각했습니다.
<br/>

- **개발을 잘하기 위해서는 이론 공부가 상당히 중요하다는 것을 알게 되었습니다.**
  - 리액트 공식문서를 훑어보기 전과 훑어보고 난 후의 개발 속도와 느껴지는 재미는 확연히 달랐습니다.
  - 이를 통해, 사람은 자기가 아는 범위 내에서만 사고할 수 있다는 것을 느꼈습니다.
  - 여유 시간이 있을 때마다 공식문서를 꾸준히 봐야겠다고 생각하게 되었습니다.
