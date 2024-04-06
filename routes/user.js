const express = require('express');
const  login  = require('../middlewares/index');
const authJwt = require('../middlewares/authJWT');
const users = require('../data/user-data');
const {renderSuccess} = require('../controllers/page');

const router = express.Router();

//... 다른 router 설정들

/* user 프로필을 변경하려면 권한이 필요하기 때문에 authJWT 미들웨어를 적용합니다.
   이제 이 router는 access token을 헤더에 담아서 요청해야합니다. */
   

router.post('/login',login);

router.post('/signup',(req,res) =>{
   try {
      users.push(req.body);
      console.log(users);
      res.status(200).redirect('/');
  } catch (error) {
      console.error(error);
      res.status(500).redirect('/error');
  }
});



router.get('/profile', authJwt, renderSuccess);

module.exports = router;