var sql = require('../../mysql/sql');
var query = require('../../mysql/query');
var uids = require('node-uuid');


function classify(req, res, next) {
    var data = req.body;
    var name = data.name,
        icon = data.icon,
        type = data.type,
        uid = data.uid;
    if (!name) {
        return res.json({ code: 4, msg: '请填写账单名' });
    } else if (!icon) {
        return res.json({ code: 4, msg: '请选择图表' });
    } else if (!type) {
        return res.json({ code: 4, msg: '请选择类型' });
    } else if (!uid) {
        return res.json({ code: 4, msg: '您的登录用户有误 请检查' });
    } else {
        query(sql.FIND_CLASSIFY, [uid, name], function(err, result) {
            if (err) {
                return res.json({ code: 0, msg: '请求失败 请检查sql语句或参数是否正确:' + err })
            }
            if (result.length > 0) {
                return res.json({ code: 3, msg: '已有账单名存在 请重新设置' })
            } else {
                query(sql.ADD_CLASSIFY, [uids.v1(), name, icon, type, uid], function(err, result) {
                    if (err) {
                        return res.json({ code: 0, msg: '请求失败 请检查sql语句或参数是否正确:' + err })
                    } else {
                        res.json({ code: 1, msg: '添加成功' + name });
                    }
                });
            }
        });
    }
}

module.exports = {
    class: classify
}