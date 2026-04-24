# Frontend Portfolio

웹 표준과 웹 접근성을 준수한 반응형 웹사이트 포트폴리오입니다.  
레스토랑과 패션 커머스 두 가지 주제의 실무 수준 반응형 웹사이트를 포함하고 있으며, Cloudflare Pages를 통해 배포되었습니다.

---

## 프로젝트 구성

```
frontend-portfolio/
  index.html                  메인 포트폴리오 랜딩 페이지
  portfolio-nav.css            공통 네비게이션 바 스타일
  wrangler.toml                Cloudflare 배포 설정
  package.json                 프로젝트 메타 및 배포 스크립트
  01_brando_restaurant_responsive_website/
    index.html                 Brando Restaurant 메인 페이지
    css/
      style.css                메인 스타일시트
      common.css               공통 요소 스타일
      response.css             반응형 미디어 쿼리
      fonts.css                웹폰트 정의
      ie7.css                  IE7 대응 스타일
      ie8.css                  IE8 대응 스타일
    js/
      brando_rastorant.js      메인 인터랙션 스크립트
      lib/                     jQuery 및 플러그인 라이브러리
    fonts/                     웹폰트 파일
    img/                       이미지 에셋
  02_portfolio_uiux_responsive_honggo_fashion/
    index.html                 Hongo Fashion 메인 페이지
    css/
      style.css                메인 스타일시트
      reset.css                CSS 리셋
      fonts.css                웹폰트 정의
    scss/
      style.scss               SCSS 소스 파일
      reset.scss               리셋 SCSS 소스 파일
    script/
      script.js                메인 인터랙션 스크립트 (Vanilla JS)
    fonts/                     웹폰트 파일
    images/                    이미지 에셋
```

---

## 프로젝트 상세

### 1. Brando Restaurant

고급 레스토랑 웹사이트를 주제로 한 반응형 웹사이트입니다.

- **기술 스택**: HTML5, CSS3, jQuery
- **주요 특징**:
  - 섹션 기반 풀페이지 레이아웃
  - 마우스 휠 인터랙션에 따른 섹션 전환
  - 스크롤 및 헤더 고정 네비게이션
  - 모바일 햄버거 메뉴 구현
  - IE7/IE8 조건부 주석을 통한 하위 호환성 처리
  - 반응형 미디어 쿼리 분기 처리 (태블릿, 모바일 대응)
- **외부 의존성**: jQuery 1.12.4, jQuery Easing, jQuery TouchSwipe, PrefixFree

### 2. Hongo Fashion

패션 이커머스 UI/UX를 주제로 한 반응형 웹사이트입니다.

- **기술 스택**: HTML5, SCSS, Vanilla JavaScript
- **주요 특징**:
  - 대규모 메가 메뉴 네비게이션 구현
  - 스크롤 이벤트 기반 헤더 show/hide 인터랙션
  - 바닐라 자바스크립트만으로 DOM 조작 및 애니메이션 처리
  - SCSS 프리프로세서를 활용한 모듈 단위 스타일 관리
  - 다양한 상품 레이아웃 그리드 시스템
  - 반응형 브레이크포인트 대응
- **외부 의존성**: Bootstrap Icons, Font Awesome, Material Icons

---

## 배포

Cloudflare Pages를 통해 배포됩니다.

```bash
# 배포
npm run deploy
```

`package.json`의 deploy 스크립트는 `npx wrangler deploy`를 실행하며, `wrangler.toml`의 `[assets]` 설정에 따라 현재 디렉토리의 정적 파일을 배포합니다.

---

## 공통 네비게이션

모든 페이지는 `portfolio-nav.css`를 통해 공통 포트폴리오 네비게이션 바를 공유합니다. 상단 고정 네비게이션으로 프로젝트 간 이동이 가능하며, 각 서브 페이지에서는 `active` 클래스를 통해 현재 위치를 표시합니다.

---

## 웹 접근성

- 시맨틱 HTML5 요소 사용
- 스킵 네비게이션 제공 (Brando Restaurant)
- 크로스 브라우저 호환성 고려 (IE 하위 버전 대응)
- 모바일 터치 인터랙션 지원
- 반응형 디자인을 통한 다양한 디바이스 대응

---

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](./LICENSE) 파일을 참조하세요.