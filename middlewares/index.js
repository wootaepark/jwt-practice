const jwt = require('../utils/jwt-utils');
const redisClient = require('../utils/redis');
const users = require('../data/user-data');

const login = async (req, res) => { 
  //... user 로그인 로직
  let success = false;
  let index;
  for(let i=0;i<users.length;i++){
    if(users[i].username === req.body.username && users[i].password === req.body.password){
      success = true;
      index = i;
      break;
    }
  }


  if (success) { // id, pw가 맞다면..
    // access token과 refresh token을 발급합니다.
    const accessToken = jwt.sign(users[index]);
    const refreshToken = jwt.refresh();
    

	
    // 발급한 refresh token을 redis에 key를 user의 id로 하여 저장합니다.
    //redisClient.set(users[index].id, refreshToken);



    res.status(200).send({ // client에게 토큰 모두를 반환합니다.
      ok: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } else {
    res.status(401).send({
      ok: false,
      message: 'password is incorrect',
    });
  }
};
module.exports = login;