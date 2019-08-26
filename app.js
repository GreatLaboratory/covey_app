// 서버 시작할 때 .env의 비밀키들을 process.env에 넣어서 안의 값을 사용
require("dotenv").config();

// npm으로 받은 패키지 불러오기
import createError from "http-errors"
import express from "express"
import cookieParser from "cookie-parser"
import logger from "morgan"
import session from "express-session"
import passport from "passport"
import swaggerUi from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"

// const변수 설정
const options = {
  swaggerDefinition: {
    info: {
      title: 'covey app rest api', // Title (required)
      version: '0.0.1', // Version (required)
    },
  },
  apis: ['./routes/*'], // Path to the API docs
};
const swaggerSpec = swaggerJSDoc(options);
const passportConfig = require("./passport");  // passport를 인자로 받는 익명함수 반환
const userRouter = require('./routes/userRouter');  // router라는 변수에 .get(), .post()로 설정된거 반환
const authRouter = require("./routes/authRouter");  // router라는 변수에 .get(), .post()로 설정된거 반환
const app = express();
const { sequelize } = require("./models");  // db라는 객체 반환 -> 그 안에 db.sequelize가 있음

// 세팅
sequelize.sync();  // 서버 실행 시 자동으로 mysql과 연동
passportConfig(passport);  // 여기서 passport 디렉토리의 index, kakaoStrategy에 의해 설정된 함수로 passport가 설정&저장됨.
                          // 이후 이 passport는 미들웨어에서 passport.initialize(), passport.session()으로 쓰인다.
app.set('port', process.env.PORT || 3000);


//----------------------------------미들웨어 시작------------------------------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize());  // 요청req에 passport설정을 심고
app.use(passport.session());  // req.session 객체에 passport 정보를 저장한다.
                              // req.session객체는 express-session에서 생성하므로 express-session미들웨어보다 뒤에 연결되어야 한다.
                              // deserializeUser를 호출하는 메소드

//-------------------------------라우터 미들웨어 시작----------------------------------
app.use('/api/user', userRouter);
app.use("/api/auth", authRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//-------------------------------에러 핸들링 미들웨어 시작------------------------------
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  let apiError = err;

  if (!err.status) {
    apiError = createError(err)
  }

  // set locals, only providing error in development
  res.locals.message = apiError.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? apiError : {};

  return res.status(apiError.status).json({message: apiError.message})
});


//--------------------------서버 포트 연결------------------------------------------------
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
