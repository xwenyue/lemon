var sql = require('../../mysql/sql');
var query = require('../../mysql/query');
var uid = require('node-uuid');

function add(req, res, next) {
    var name = req.body.name;
    if (!name) {
        return res.json({ code: 4, msg: '您的用户名为空 请重新输入' });
    }
    query(sql.FIND_USER, [name], function(err, result) {
        if (err) {
            return res.json({ code: 0, msg: '请求失败 请检查sql语句或参数是否正确:' + err });
        }
        if (result.length > 0) {
            return res.json({ code: 3, msg: '已有用户名存在 请重新设置' });
        } else {
            query(sql.ADD_USER, [uid.v1(), name], function(err, result) {
                if (err) {
                    return res.json({ code: 0, msg: '您的请求已失败 请检查后重试:' + err })
                } else {
                    res.json({ code: 1, msg: '您已成功添加' + name })
                }
            })
        }
    })
}

module.exports = {
    add: add
}