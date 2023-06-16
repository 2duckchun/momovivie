# MOMOVIVIE
## 프로젝트 목적
- 명작 반열에 든 영화들을 랭킹순으로 확인할 수 있고, 각 영화에 대한 타인들의 평가도 체크할 수 있는 사이트를 구축합니다.
- 이 사이트를 통해 볼만한 영화들을 빠르게 선택할 수 있습니다.
- 심심풀이 + 커뮤니티 용도로도 활용할 수 있습니다.

## 이 프로젝트를 통해 달성하고자 하는 개인적 목적
- Next.js의 입문작으로써, 이 프로젝트를 통해 프레임워크를 숙달합니다. (SSR을 경험하는데 의의를 둡니다.)
- 파이어베이스+파이어스토어를 도입하여 프로젝트에 알맞게 컬렉션, 도큐먼트를 구성해봄으로써 지식의 범주를 넓힙니다.
- 빠른 개발 후, 코드 리뷰를 통해 스스로 부족한 점을 파악하고 개선해나갑니다. (코드 리뷰시에는 웹 접근성과 유지보수성을 중심으로 확인해보려합니다.)

## 사용경험 개선
### commented 페이지에서 영화 디테일을 보고 난 후 뒤로가기를 누르면 이전의 스크롤 및 데이터가 날아가는 현상 발생
  - 영화 디테일을 보고 뒤로가기를 눌렀을 때 디테일을 보기 전 commented 페이지의 원래 화면을 보존해야 함.
  - 이를 구현하기 위해 영화 디테일을 클릭했을 경우, commented 페이지의 filter, movieList, 영화를 DB에서 호출하는 기준점인 cursor(파이어베이스의 페이지네이션 단위), 이전 페이지의 scroll 위치를 저장해야함.
  - 즉, 렌더링에 관여하는 모든 state 값과 scrollY 값을 저장해야만 함.
- router.replace 도입 실패
  - 뒤로가기를 누를 경우 Home화면으로 이동하는 현상 발생. replace도 데이터를 캐싱하는게 아니므로 해당 방법 도입 폐기.
- 세션스토리지로 기능을 구현해보려 했으나 실패
  - 세션스토리지에 movieList, cursor, scrollY, filter명을 넣고 시도해보려 했으나 실패함.
  - 원인
    - commented 페이지에서 영화 목록을 클릭해서 진입할 경우에 들어갈 당시의 commented 페이지의 filter, cursor, scrollY, movieList 등을 저장하려고 계획함.
    - filter와 cursor, movieList의 경우에는 commented 페이지의 최상단 부분에서 초기화되고 있는 상황이었음.
    - 뒤로가기를 클릭했을 시 이전 commented 페이지의 환경을 조성하기 위해 filter와 cursor, movieList를 세션스토리지에서 가져와야 함.
    - 이를 위해 최상단에서 세선스토리지를 이용해서 이전에 저장한 자료를 꺼내오려고 했으나, SSR의 특성상 window 객체가 없는 초기에 오류가 나게 됨.
    - useEffect를 사용해 세션스토리지의 데이터를 가져온다고 하더라도, filter가 바뀌면 실행되는 useEffect의 필터링 기능때문에 원치않는 부작용이 생김.
  - 해결방안
    - filter, cursor, movieList, scrollY를 전역변수로 관리하고, hasSeenDetail이라는 변수를 만들어 commented에서 영화를 클릭해서 디테일을 보았는지 체크할 예정.
    - hasSeenDetail이 true라면 처음 실행되는 filter의 경우, 동작하지 않게하고 기존에 저장해놓았던 데이터들이 화면에 렌더링하게 할 것임.
    - hasSeenDetail이 false라면 처음 실행되는 filter의 useEffect가 동작하게 하고, 기존에 저장해놓았던 데이터들은 filter useEffect에 의해 초기화시킬 것임.
    - 필요 라이브러리 : Redux toolkit (공부 하고 도입 예정)

## 개발 당시 발생한 에러
### react-select 도입 간 **Prop `id` did not match** 에러
![image](https://github.com/2duckchun/momovivie/assets/92588154/03f336fd-1cfd-4bbf-9dd5-574777f2cac2)
- 에러 난 이유
  - select에 id가 정의되지 않아 SSR에서는 select의 id가 전역 변수(react-select-1 등)로 사용됨
  - 이 때, Pre-render된 React Tree와 브라우저에서 render된 React Tree에 차이가 생겨 에러 메세지가 발생.
  - 이로 인해 React Tree가 DOM과 동기화되지 않아 예기치 않은 동작이 일어날 수 있음.
  - https://nextjs.org/docs/messages/react-hydration-error
- 해결
  - Select에 instanceId를 명시함.
  - React 18에는 useId 메서드가 있어 이것을 활용하여 Id를 생성하여 Select에 추가함.
  - StackOverFlow : https://stackoverflow.com/questions/61290173/react-select-how-do-i-resolve-warning-prop-id-did-not-match
  - react-select issue : https://github.com/JedWatson/react-select/issues/2629

## 개발하며 느낀 의문점
- 서버 사이드 렌더링은 서버측에서 렌더링을 한 후, 클라이언트에게 전달해주는 것이다. 즉 서버에 일정량의 부하를 가할텐데, SSR을 사용할 경우 CSR보다 서버 비용이 얼마나 청구될까?
- 페이지네이션을 구현할 때, 페이지네이션 알고리즘의 파라미터 타입을 숫자로 했다. 하지만 쿼리로 입력되는 것이기 때문에 사용자에 의해 쿼리가 숫자로 입력되지 않을 수 있다. 이 때 페이지네이션 파라미터의 타입을 사용자의 입력을 고려하여 any나 다른 문자열 등으로 해야할지, 내가 의도한 number로 해야할지 의문이 생겼다.

## 설계
### API
- axios, interceptor 기능 활용 시도 및 DTO와 View단에서 쓰이는 데이터를 분리 (Repository 패턴?)
### Backend
- 영화 Detail을 볼 수 있어야 하고, 해당 영화의 detail에 댓글을 달 수 있어야 함.
  - 영화의 Detail을 불러오는 api와 Detail에 대한 댓글을 불러오는 파이어베이스 간에 연관성을 만들어야 함.
  - themoviedb에서는 id값을 기반으로 영화 detail을 불러옴. 그러므로 댓글의 경우, id를 기반으로 detail에 관련된 별도의 데이터베이스를 만들어야 함.
  - detail에 접속할 경우, 영화 id를 고유키값으로 이용하여 addDoc을 실행하며, 댓글 리스트를 가져오게 해야함.
  - 접속할 때마다 addDoc으로 모든 값을 초기화할 경우 의미없는 트랜잭션이 발생할 수 있으므로 추가적인 코드를 작성해야 함.
  - 파이어베이스 detail에 관련된 필드(필수 요소) : id, 영화제목, 영화이미지, 추천수, 댓글, 댓글수, 최신 댓글 업데이트일
### 댓글기능
- 익명으로 입력 가능. 닉네임과 비밀번호 설정
- 삭제버튼, 입력버튼, 글자수 제한(300글자).
- 삭제버튼 클릭 시 비밀번호 입력에 관련된 팝업창 나옴. 관련된 결과는 토스트메시지로 확인가능.
