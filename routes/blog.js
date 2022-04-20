/**
 * @file: blog
 * @author: WangZhuang
 * @date: 2022/4/20 18:19:25
 */
var express = require('express');
var router = express.Router();
const {getList, getDetail, newBlog, updateBlog, delBlog} = require('../controller/blog');
const {SuccessModel, ErrorModel} = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');

// get blog list
router.get('/list', (req, res, next) => {
    let author = req.query.author || '';
    const keyword = req.query.keywprd || '';
    const isadmin = req.query.isadmin;

    if (isadmin) {
        // 管理员界面
        if (req.session.username == null) {
            // 未登录
            res.json(
                new ErrorModel('未登录')
            );
            return;
        }
        // // 强制查询自己的博客
        author = req.session.username;
    }

    const result = getList(author, keyword);
    return result.then(listData => {
        res.json(
            new SuccessModel(listData)
        );
    })
});

// get blog detail
router.get('/detail', (req, res, next) => {
    const result = getDetail(req.query.id);
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        );
    })
});

// new blog
router.post('/new', loginCheck, (req, res, next) => {
    req.body.author = req.session.username;
    const result = newBlog(req.body);

    return result.then(data => {
        res.json(
            new SuccessModel(data)
        );
    })
});

// update blog
router.post('/update', loginCheck, (req, res, next) => {
    const result = updateBlog(req.query.id, req.body);

    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel(result)
            );
        } else {
            res.json(
                new ErrorModel('更新失败')
            );
        }
    })
});

// delete blog
router.post('/del', loginCheck, (req, res, next) => {
    const author = req.session.username;
    const result = delBlog(req.query.id, author);

    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel(result)
            );
        } else {
            res.json(
                new ErrorModel('删除失败')
            );
        }
    });
});

module.exports = router;
