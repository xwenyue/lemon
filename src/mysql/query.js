var mysql = require('mysql');
var pool = mysql.createPool({
    user: 'root',
    password: 'root',
    database: 'text',
    connectionLimit: 100
});

module.exports = function(sql, arr, ck) {
    pool.getConnection(function(err, con) {
        if (err) {
            return ck(err);
        }
        con.query(sql, arr, function(err, result) {
            if (err) {
                return ck(err)
            }
            ck(null, result);
        });
    });
}