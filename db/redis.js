/**
 * @file: redis
 * @author: WangZhuang
 * @date: 2022/4/20 20:35:16
 */
const redis = require('redis');
const {REDIS_CONF} = require('../conf/db');

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);

redisClient.on('error', err => {
    console.log(err, 11);
    
})

module.exports = redisClient;
