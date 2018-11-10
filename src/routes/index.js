var express = require('express');
var router = express.Router();
var classify = require('./classify/classtype');

router.post('/', classify.class);

module.exports = router;