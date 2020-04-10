var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_solorzao',
    password        : '4608',
    database        : 'cs340_solorzao'
});

module.exports.pool = pool;
