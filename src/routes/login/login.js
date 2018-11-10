var sql = require('../../mysql/sql');
var query = require('../../mysql/query');
var uid = require('node-uuid');

function add(req, res, next) {
    var data = req.body;
    var uids = data.uid,
        cid = data.cid,
        money = data.money,
        time = data.createtime;
    if (!uids) {
        return res.json({ code: 4, msg: '请确认用户信息' });
    } else if (!cid) {
        return res.json({ code: 4, msg: '请确认账单类型信息' });
    } else if (!money) {
        return res.json({ code: 4, msg: '请确认金额' });
    } else if (!time) {
        return res.json({ code: 4, msg: '请确认时间是否填写' });
    } else {
        query(sql.ADD_LOGIN, [uid.v1(), uids, cid, time, money], function(err, result) {
            if (err) {
                return res.json({ code: 0, msg: '请尝试重新加载' + err });
            } else {
                res.json({ code: 1, msg: '账单添加成功' });
            }
        });
    }
}

function dele(req, res, next) {
    var lids = req.query.lid;
    if (lids) {
        query(sql.DELETE_LOGIN, [lids], function(err, result) {
            if (err) {
                return res.json({ code: 0, msg: '请检查sql语句和参数是否正确 并重试' + err });
            } else {
                res.json({ code: 1, msg: '删除成功' });
            }
        })
    } else {
        return res.json({ code: 4, msg: '请正确输入账单编号' });
    }
}

function selet(req, res, next) {
    var data = req.query;
    var arrt = [data.uid];
    var mysqllist = 'SELECTALL_LOGIN';
    if (data.index == 1) {
        arrt = [data.uid, data.type];
        mysqllist = 'SELECTTYPE_LOGIN';
    } else if (data.index == 2) {
        arrt = [data.uid, data.name];
        mysqllist = 'SELECTNAME_LOGIN';
    }
    if (data.uid) {
        query(sql[mysqllist], arrt, function(err, result) {
            if (err) {
                return res.json({ code: 0, msg: '请检查sql语句和参数是否正确 并重试' + err });
            }
            if (result.length > 0) {
                res.json({ code: 1, result });
            } else {
                res.json({ code: 0, msg: '您并未有此类数据 请重新输入' });
            }
        })
    }
}

module.exports = {
    add: add,
    dele: dele,
    selet: selet
}