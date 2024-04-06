const { verify } = require('../utils/jwt-utils');

const authJWT = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split('Bearer ') [1]; // header에서 access token을 가져옵니다.
// 일반적으로 

//Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTIzOTQ2MjAsImV4cCI6MTcxMzYwNDIyMH0.1B0egizTkpIsI0q0RkpSHVRjafFABQWp0ypBIUyQaBY
// 이런식으로 Bearer 를 앞에 두고 가져온다. 따라서 위와 같이 split 해줌


    const result = verify(token); // token을 검증합니다.
    if (result.ok) { // token이 검증되었으면 req에 값을 세팅하고, 다음 콜백함수로 갑니다.
      req.username = result.username;
      req.name = result.name;
      next();
    } else { // 검증에 실패하거나 토큰이 만료되었다면 클라이언트에게 메세지를 담아서 응답합니다.
      res.status(401).send({
        ok: false,
        message: result.message, // jwt가 만료되었다면 메세지는 'jwt expired'입니다.
      });
    }
  }
};

module.exports = authJWT;