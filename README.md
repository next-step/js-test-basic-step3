# 🚀 미션 소개

이 Repository에서 제공하는 미션은 투두리스트 E2E테스트입니다.
내가 만든 TodoList가 요구사항을 충족하고, 정상동작하는지 개발자스럽게 확인하기 위한 과정입니다.

# ⚙️ Before Started

```
yarn install or npm install
```

cypress는 실제 유저가 페이지에 접속해서 동작하는 것처럼 테스트하는 도구입니다.
따라서 실제 접속할 페이지가 존재하게끔 기존에 구현한 어플리케이션을 로컬서버를 이용하여 띄워주세요.
현재 `src`디렉토리 하위에 sample로 이용할 수 있는 todoList 코드를 넣어두었으나, 본인의 코드로 변경하시는걸 추천드립니다. 😁
이후 아래의 명령어를 실행하면 cypress를 실행시킬 수 있습니다.

```
npm run cypress:open
```
