var express = require('express');
var router = express.Router();
var login = require('./login/login');

router.post('/api/add', login.add);
router.get('/api/dele', login.dele);
router.get('/api/selet', login.selet);

module.exports = router;