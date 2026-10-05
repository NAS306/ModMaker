# ModMaker

게임 Rusted Warfare의 모드 설정을 작성·편집하기 위한 웹 도구의 프로토타입입니다. 현재 소스는 [mod-maker_v1.1/](mod-maker_v1.1/)에 있으며 설계 자료는 [Doc/](Doc/)에 있습니다.

## 현재 상태

Node.js 서버가 Express로 정적 화면과 편집 화면을 제공합니다. 편집 UI는 `public/js/data.js`의 설정 데이터를 사용합니다. 프로젝트에는 현재 `package.json`과 잠금 파일이 없으므로, 과거에 사용한 의존성 버전을 그대로 재현할 수는 없습니다.

## 로컬 실행

Node.js와 npm이 설치된 환경에서 저장소 루트 기준으로 실행합니다.

```sh
cd mod-maker_v1.1
npm install --no-save --package-lock=false express
node server.js
```

`http://localhost:3000`에서 시작 화면을, `http://localhost:3000/modEdit`에서 편집 화면을 엽니다. 서버 로그에 `https`가 출력되지만 현재 코드는 TLS를 설정하지 않으므로 실제 접속 주소는 **http**입니다. 서버는 `0.0.0.0`에 바인딩합니다.

위 설치 명령은 로컬 실행을 위한 임시 의존성 설치입니다. 다시 개발을 시작한다면 검증된 버전의 `package.json`·`package-lock.json`을 추가하여 설치 과정을 재현 가능하게 만드는 것이 우선입니다.

## 파일 구성

| 경로 (`mod-maker_v1.1/` 기준) | 역할 |
| --- | --- |
| [server.js](mod-maker_v1.1/server.js) | Express 정적 서버와 화면 경로 |
| [public/index.html](mod-maker_v1.1/public/index.html) | 시작 화면 |
| [public/modEdit.html](mod-maker_v1.1/public/modEdit.html) | 모드 편집 화면 |
| [public/js/data.js](mod-maker_v1.1/public/js/data.js) | 초기 모드 데이터 |
| [public/js/modEdit_main.js](mod-maker_v1.1/public/js/modEdit_main.js) | 편집 UI, 입력 반영 및 저장 처리 |
| [public/js/utilities.js](mod-maker_v1.1/public/js/utilities.js) | 보조 함수 |
| [public/css/](mod-maker_v1.1/public/css/) | 화면 스타일 |

## 유지보수와 확인

기존 파일은 수정 전에 `파일명_BU.확장자`로 백업합니다. 별도 빌드와 자동 테스트는 현재 없습니다. 서버 실행, 시작 화면에서 편집 화면 이동, 값 편집과 저장 결과를 확인해야 합니다. 생성한 설정이 실제 게임에서 유효한지는 게임에서도 별도로 확인하세요.

이번 정리는 문서 보완이며 서버 코드·의존성·게임 호환성을 변경하거나 검증한 릴리스는 아닙니다.
