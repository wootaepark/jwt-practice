// 필요 모듈 로드
const express = require('express');
const dotenv = require('dotenv');
const redis = require('redis');
const nunjucks = require('nunjucks');
const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');



// 라우터 불러오기
const pageRouter = require('./routes/page');
const authRouter = require('./routes/user');



// 각종 함수 초기 설정
dotenv.config();
const app = express();

// 바디 파서 설정 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// 각종 모듈 설정
app.set('port', process.env.PORT || 4000);
app.set('view engine', 'html');
app.use(morgan('dev'));
nunjucks.configure('views', {
    express : app,
    watch : true,
})




// 라우터 미들웨어
app.use('/', pageRouter);
app.use('/auth/', authRouter);


// 에러 처리 미들웨어
app.use((req, res, next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
})


// 에러 로깅 및 페이지 로드 미들웨어
app.use((err,req,res,next)=>{

    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    err.status = err.status || 500;
    res.render('error/error');

})

// 포트 정보 출력
app.listen(app.get('port'),()=>{
    console.log(app.get('port'), '번 포트에서 서버 대기중');
})