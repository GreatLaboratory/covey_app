# Covey application REST API  
## 설치 및 서버시작
```
$ git clone https://github.com/GreatLaboratory/covey_app.git
$ cd covey_app
$ npm install
$ npm start
```

## mock데이터

- 회원 데이터 추가
- 게시물 데이터 추가
- 지원 데이터 추가
- 경력사항 데이터 추가
```
$ sequelize db:seed:all
```

- 실행 취소
```
$ sequelize db:seed:undo:all
```

## 주요 기능

1. sns 회원가입 및 로그인 (카카오, 페이스북)
2. 핸드폰 번호 인증 회원가입
3. 게시물, 회원정보, 경력사항 crud 
4. 게시물 지원하기
5. 이미지 업로드
6. swagger api 문서정리, 테스트
7. ios개발 중 api호출단계에서 보안이슈로 인해 https 적용 (letsencrypt, greenlock)