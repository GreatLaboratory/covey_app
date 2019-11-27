// 서버 시작할 때 .env의 비밀키들을 process.env에 넣어서 안의 값을 사용
require("dotenv").config();

// npm으로 받은 패키지 불러오기
import createError from "http-errors"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import session from "express-session"
import passport from "passport"
import MySQLStore from "express-mysql-session"
import swaggerUi from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"
import express from "express"
import path from 'path'
import helmet from 'helmet'
import hpp from 'hpp'

// const변수 할당
const mysqlSessionOptions = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1234',
  database: 'covey'
};
const logger = require('./logger');
const swaggerOptions = require('./swagger');
const swaggerSpec = swaggerJSDoc(swaggerOptions);
const sessionStore = new MySQLStore(mysqlSessionOptions);
const passportConfig = require("./passport");  // passport를 인자로 받는 익명함수 반환
const userRouter = require('./routes/userRouter');  // router라는 변수에 .get(), .post()로 설정된거 반환
const authRouter = require("./routes/authRouter");  //             "
const postRouter = require("./routes/postRouter");  //             "
const applyRouter = require("./routes/applyRouter");  //             "
const careerRouter = require("./routes/careerRouter");  //             "
const app = express();
const { sequelize } = require("./models");  // db라는 객체 반환 -> 그 안에 db.sequelize가 있음

// 세팅
sequelize.sync();  // 서버 실행 시 자동으로 mysql과 연동 / 인자로 force:true를 줄 수도 있는데 이건 모델링 변경된 점을 그대로 (DDL) 반영해주는 것 - 지양
passportConfig(passport);  // 여기서 passport 디렉토리의 index, kakaoStrategy에 의해 설정된 함수로 passport가 설정&저장됨.
                           // 이후 이 passport는 미들웨어에서 passport.initialize(), passport.session()으로 쓰인다.
app.set('port', process.env.PORT || 3000);
const sessionOptions = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  store : sessionStore,
  cookie: {
    httpOnly: true,
    secure: false,
  },
};

//----------------------------------미들웨어 시작------------------------------------
if (process.env.NODE_ENV === "production"){
  mysqlSessionOptions.host = process.env.PRODUCTION_URL;
  sessionOptions.proxy = true;
  sessionOptions.cookie.secure = true;
  sessionOptions.cookie.httpOnly = false;
  app.use(morgan('combined'));
  app.use(helmet());
  app.use(hpp());
} else {
  app.use(morgan('dev'));
}
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session(sessionOptions));
app.use(passport.initialize());  // 요청req에 passport설정을 심고
app.use(passport.session());  // req.session 객체에 passport 정보를 저장한다.
                              // req.session객체는 express-session에서 생성하므로 express-session미들웨어보다 뒤에 연결되어야 한다.
                              // deserializeUser를 호출하는 메소드
                              // 여기서 req.user의 정보가 확실히 저장되고 밑에 있는 라우터들에서 주로 req.user.id를 가져다 쓴다.

//-------------------------------라우터 미들웨어 시작----------------------------------
app.use("/api/auth", authRouter);
app.use('/api/user', userRouter);
app.use("/api/post", postRouter);
app.use("/api/apply", applyRouter);
app.use("/api/career", careerRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//-------------------------------에러 핸들링 미들웨어 시작------------------------------
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  let apiError = err;

  if (!err.status) {
    apiError = createError(err)
    logger.info('hello');
    logger.error(apiError.message);
  }

  // set locals, only providing error in development
  res.locals.message = apiError.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? apiError : {};

  return res.status(apiError.status).json({message: apiError.message})
});

//--------------------------------서버 애플리케이션 실행-----------------------------
// const lex = greenlock.create({
//   version: 'draft-11', // 버전2
//   configDir: '/etc/letsencrypt',
//   server: 'https://acme-staging-v02.api.letsencrypt.org/directory',
//   store: greenlock_store,
//   approveDomains: (opts, certs, cb) => {
//     if (certs) {
//       opts.domains = ['localhost'];
//     } else {
//       opts.email = 'wowo0201@gmail.com';
//       opts.agreeTos = true;
//     }
//     cb(null, { options: opts, certs });
//   },
//   renewWithin: 81 * 24 * 60 * 60 * 1000,
//   renewBy: 80 * 24 * 60 * 60 * 1000,
// });


// const options = {
//     key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
//     cert: fs.readFileSync('test/fixtures/keys/agent2-cert.cert')
// };

// http.createServer(app).listen(app.get('port'), () => {
//   console.log(app.get('port'), '번 포트에서 대기중');
// });
// https.createServer(options, app).listen(443, () => {
//     console.log('443번 포트에서 대기중');
// });

// https.createServer(lex.httpsOptions, lex.middleware(app)).listen(443);

module.exports = app;