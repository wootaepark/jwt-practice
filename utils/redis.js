//refresh token 을 저장하기 위한 redis 모듈 설정

const redis = require('redis'); 
require('dotenv').config();


const redisClient = redis.createClient({

    host: process.env.REDIS_HOST || '127.0.0.1', // Redis 호스트 주소
    port: process.env.REDIS_PORT || 6379, // Redis 포트 번호
});

module.exports = redisClient;