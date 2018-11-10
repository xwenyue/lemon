var express = require('express');
var router = express.Router();
var userapi = require('./user/user');

/* 添加新用户 */
router.get('/', userapi.add);

module.exports = router;