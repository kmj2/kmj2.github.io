# Minjong Kim — Personal Website

개인 연구자 홈페이지입니다. HTML, CSS, JavaScript로 구성되어 있으며,
별도 빌드나 패키지 설치 없이 GitHub Pages에서 서비스합니다.

- 공개 사이트: https://kmj2.github.io
- 메뉴 순서: Home → Projects → Education → Experience → Honors & Awards

## 저장소 구조

```text
.
├── index.html           # Home: 소개, 연락처, News
├── projects.html        # 연구 프로젝트와 이미지 갤러리
├── education.html       # 학력과 학교 로고
├── experience.html      # 연구 경력과 기타 활동
├── honors.html          # 수상·장학금
├── Minjong_Kim_CV.pdf    # Home의 CV 링크가 여는 파일
├── css/
│   └── style.css        # 모든 페이지의 공통 디자인·모바일·다크 모드·인쇄
├── js/
│   ├── theme.js         # 페이지 표시 전 저장된 테마 적용
│   ├── main.js          # 갤러리·필터·상단 메뉴 높이·Back to top·방명록 창
│   └── guestbook.js     # Firebase 방명록과 이메일 알림
├── images/
│   ├── profile.jpg      # 프로필 사진
│   ├── project-*.png    # 프로젝트 사진
│   ├── snu-logo.png     # 서울대 로고
│   ├── unist-logo.png   # UNIST 로고
│   └── SOURCES.md       # 학교 로고의 공식 출처
├── .gitignore           # OS·편집기 임시 파일 제외 규칙
└── README.md            # 이 수정 안내서
```

## 어떤 파일을 수정하면 되나요?

| 바꾸려는 내용 | 수정할 위치 |
| --- | --- |
| 이름·소개·관심 분야 | `index.html`의 `#about` |
| Contact 이메일, GitHub, LinkedIn 링크 | `index.html`의 `.contact-links` |
| News 추가·수정 | `index.html`의 `.news-list` |
| 프로젝트 제목·기간·역할·설명·코드 링크 | `projects.html`의 각 `<article class="project">` |
| 프로젝트 사진 | `images/`에 파일 추가 후 해당 프로젝트의 `.figure-list` 수정 |
| 학력·학점·학교 로고 | `education.html`의 `#education` |
| 연구 경력·활동 | `experience.html`의 `#experience` |
| 수상·장학금 | `honors.html`의 `.honors-list` |
| 프로필 사진·CV | `images/profile.jpg`, `Minjong_Kim_CV.pdf`를 같은 이름으로 교체 |
| 글자·색상·간격·사진 프레임 비율 | `css/style.css` |

일반적인 내용 수정에는 JavaScript를 건드릴 필요가 없습니다.
기존 `class`와 `id`는 디자인·기능과 연결되어 있으므로 유지하고,
태그 안의 문장이나 `href`, `src` 값을 바꾸면 됩니다.
HTML에서 `&`는 `&amp;`, `<`는 `&lt;`로 작성합니다.

### 소개와 연락처

`index.html`에서 `<div class="bio">` 안의 문장을 수정합니다.
문단은 `<p>문장</p>` 단위로 작성합니다.

Contact의 표시 문구는 유지하고 메일 주소만 바꾸려면 다음의 `mailto:` 뒤를 수정합니다.

```html
<a href="mailto:minjong.kim@snu.ac.kr">Contact</a>
```

CV를 같은 이름으로 교체하면 링크를 고칠 필요가 없습니다.
파일명을 변경했다면 `index.html`의 CV 링크도 함께 변경합니다.
사진의 가로·세로 크기가 바뀌면 해당 `<img>`의 `width`, `height`도
원본 픽셀 크기에 맞춰 갱신하거나 두 속성을 함께 제거합니다.

### News 추가

`<ul class="news-list">`의 첫 번째 항목 위에 새 항목을 추가합니다.
아래 내용은 작성 예시입니다.

```html
<li class="dated-entry">
    <time class="entry-date" datetime="2026-09">Sep 2026</time>
    <p>새 소식을 여기에 작성합니다.</p>
</li>
```

`datetime`과 화면에 보이는 날짜를 함께 수정하고 최신 소식이 위에 오도록 배치합니다.

### 프로젝트 추가·수정

`projects.html`에서 기존 `<article class="project" ...>`부터 해당
`</article>`까지 복사해 새 항목을 만듭니다.

- `data-status="ongoing"` 또는 `data-status="completed"`: 필터가 사용하는 상태.
- `.entry-date`: 기간.
- `.project-status`: 화면에 보이는 Ongoing 또는 Completed. 위 상태와 함께 수정.
- `.entry-title`: 프로젝트 이름.
- `.project-meta`: 담당 역할.
- 그다음 일반 `<p>`: 프로젝트 설명.
- `.project-topics`: 관련 분야·도구.
- `.project-links`: 공개 코드 링크 또는 비공개 안내.

사진은 해당 프로젝트의 `.figure-list` 안에 한 장당 다음 블록을 추가합니다.

```html
<figure class="gallery-slide">
    <img src="images/project-example.png"
         alt="사진 내용을 설명하는 문장"
         loading="lazy">
</figure>
```

위 파일명은 예시입니다. 실제 파일을 `images/`에 넣고 같은 경로를 사용합니다.
파일명은 영문·숫자·하이픈을 권장하며 대소문자를 정확히 맞춥니다.

사진 개수에 맞춰 화살표와 하단 점은 자동 생성됩니다. 단,
`<summary>View project images (3)</summary>`의 표시 개수는 직접 수정합니다.
사진이 없다면 `<details class="project-figures">` 블록 전체를 생략합니다.

갤러리는 **5:3 고정 프레임** 안에 원본 비율을 유지해 사진을 맞춥니다.
사진을 자르지 않으므로 비율이 다르면 여백이 생깁니다.
사진 클릭으로 확대하거나 다른 페이지로 이동하지 않습니다.

### 학력·경력·수상 추가

해당 페이지의 `<div class="dated-entry">` 블록을 복사해 기간과 내용을 수정합니다.
수상 항목은 `<li class="dated-entry">` 단위입니다.

학교 로고를 교체한다면 `education.html`의 `.school-logo` 이미지 경로와
`images/SOURCES.md`의 출처를 함께 갱신합니다. 학교명이 바로 옆에 있어
로고의 `alt=""`는 의도된 설정입니다.

### 메뉴·푸터 수정 시 주의점

상단 메뉴와 하단 푸터·방명록 창의 HTML은 **다섯 페이지에 각각 들어 있습니다**.
공통 문구, 메뉴 순서, 새 메뉴를 변경할 때는 다섯 HTML 파일을 모두 수정합니다.
각 페이지에서는 해당 메뉴 링크 하나에만 `aria-current="page"`를 둡니다.

CSS와 JavaScript는 공통 파일이므로 한 번 수정하면 모든 페이지에 적용됩니다.
Education과 Experience는 현재 별도 페이지로 유지되어 있습니다.

## 로컬에서 확인하기

저장소 폴더에서 실행합니다.

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

브라우저에서 http://127.0.0.1:8765 를 엽니다.
이미 미리보기 서버가 실행 중이면 새로 실행하지 않고 페이지를 새로고침하면 됩니다.
스타일이 이전 상태로 보이면 강력 새로고침을 사용합니다.

수정한 페이지에서 메뉴, 모바일 폭, 이미지·CV 링크를 확인합니다.
프로젝트를 바꿨다면 상태 필터와 이미지 넘김도 확인합니다.

방명록은 창을 열 때 기존 Firebase 서비스에 연결됩니다.
로컬 미리보기에서도 실제로 글을 등록하면 공개 방명록에 저장되고
기존 이메일 알림이 전송됩니다.

## GitHub에 반영하기

```sh
git status
git diff
git diff --check
git add 수정한파일.html images/추가한사진.png
git commit -m "Update research projects"
git push origin main
```

`git add`의 파일명은 예시이므로 실제 수정한 파일명으로 바꿉니다.
GitHub Pages 배포 상태는 저장소의 Actions 또는 Settings → Pages에서 확인합니다.

## 내용 확인 메모

기존 소개의 “2026년 3월 진학 예정”, SNU 인턴십·장학금의 Present 표기,
May 2024로 적힌 Fall Conference 소식, CV의 최신 여부는 소유자가 확인해
수정할 항목입니다. 디자인 작업 중 사실관계를 임의로 변경하지 않았습니다.
