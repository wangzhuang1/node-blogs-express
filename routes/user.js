/**
 * @file: user
 * @author: WangZhuang
 * @date: 2022/4/20 18:19:32
 */
var express = require('express');
var router = express.Router();
const login = require('../controller/user');
const {SuccessModel, ErrorModel} = require('../model/resModel');

router.post('/login', (req, res, next) => {
    const {username, password} = req.body;
    const result = login(username, password);

    return result.then(data => {
        if (data.username) {
            // 设置session
            req.session.username = data.username;
            req.session.realname = data.realname;

            res.json(
                new SuccessModel()
            );
        } else {
            res.json(
                new ErrorModel('登录失败')
            );
        }
    })

});

router.get('/login-test', (req, res, next) => {
    if (req.session.username) {
        res.json(
            new SuccessModel('已登录')
        )
    } else {
        res.json(
            new ErrorModel('未登录')
        )
    }
})

// router.get('/session-test', (req, res, next) => {
//     const session = req.session;
//     if (session.viewNum == null) {
//         session.viewNum = 0;
//     }
//     session.viewNum++;
//     res.json({
//         viewNum: session.viewNum
//     });
// })

module.exports = router;
