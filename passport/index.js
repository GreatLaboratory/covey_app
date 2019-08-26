// passport에서 가장 중요한 두 가지는 serializeUser와 deserializeUser 이다.

const kakao = require("./kakaoStrategy");
const { User } = require("../models");

module.exports = (passport)=>{

    // 기능 : 인증 후 사용자 정보 객체를 세션에 아이디로 저장
    // serializeUser는 req.session객체에 어떤 데이터를 저장할지 선택, 그리고 done에서 저장할 정보 선택
    // done함수 첫번째 인자인 null은 에러 발생 시 사용하는 것 -> 크게 중요 x
    // 두번째 인자에선 세션에 user의 정보를 전부 넣을 수 없으니까 아이디만 저장
    // auth라우터에서 req.login이 해당 메소드를 호출
  passport.serializeUser((user, done)=>{
      console.log("serialize");
      done(null, user.id);   // 여기서의 done은 req.session에 user.id를 저장하기 위함.
  });

    // 기능 : 인증 후 세션에 저장한 아이디를 통해 사용자 정보 객체를 불러와 req.user에 저장
    // passport.session()미들웨어가 매 요청 시에 이 메소드를 호출
    // serializeUser에서 세션에 저장했던 아이디를 첫번째 인자로 받아서 데이터베이스에 해당 아이디 user정보 조회
    // 조회한 user정보를 req.user에 저장 (이게 done함수)하므로 앞으로 req.user를 통해 로그인한 사용자 정보를 가져올 수 있다. // page라우터에서 사용
    // req.user객체는 라우터에서 사용 가능
    // 결국 세션엔 userId만 있고 req.user에 모든 정보가 들어있게된다. -> 세션을 가볍게 하네
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findOne({ where : { id }});
            console.log("deserialize");
            done(null, user);  // 여기서 done은 req.user에 user를 저장하기 위함.
        }catch (err) {
            console.error(err);
            done(err);
        }
    });

  //위의 두 개의 메소드는 passport를 사용한 세션처리관련 메소드이다.

  kakao(passport);

};

