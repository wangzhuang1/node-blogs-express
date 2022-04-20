/**
 * @file: loginCheck
 * @author: WangZhuang
 * @date: 2022/4/20 20:44:17
 */
const {ErrorModel} = require('../model/resModel');

module.exports = (req, res, next) => {
    if (req.session.username) {
        next();
        return
    }

    res.json(
        new ErrorModel('未登录')
    );
}
