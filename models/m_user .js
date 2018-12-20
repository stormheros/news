const connection = require('../config/db_config');
exports.checkEmail = (email, callback) => {
    const sqlstr = "SELECT * FROM `users` WHERE email = ?";
    connection.query(sqlstr, email, (err, data) => {
        if (err) {
            return callback(err);
        }
        return callback(null, data);
    });
}
exports.checkNickname = (nickname, callback) => {
    const sqlstr = "SELECT * FROM `users` WHERE nickname = ?";
    connection.query(sqlstr, nickname, (err, data) => {
        if (err) {
            return callback(err);
        }
        return callback(null, data);
    })
}
exports.addUser = (body, callback) => {
    const sqlstr = "INSERT INTO `users` SET ?";
    connection.query(sqlstr, body, (err, data) => {
        if (err) {
            return callback(err);
        }
        return callback(null, data);
    })
}