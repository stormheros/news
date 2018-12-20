const connection = require('../config/db_config');

exports.findAllTopics = (callback) => {
    const sql = "SELECT * FROM `topics` ORDER BY id DESC";
    connection.query(sql, (err, data) => {
        if (err) {
            return callback(err);
        }
        return callback(null, data);
    });
}
exports.addTopic = (body, callback) => {
    const sql = "INSERT INTO `topics` SET ?";
    connection.query(sql, body, (err, data) => {
        if (err) {
            return callback(err);
        }
        return callback(null, data);
    });
}
exports.findTopicById = (id, callback) => {
    const sql = "SELECT * FROM `topics` WHERE id = ?";
    connection.query(sql, id, (err, data) => {
        if (err) {
            return callback(err);
        }
        return callback(null, data);
    });
}
exports.deleTopicById = (id, callback) => {
    const sql = "DELETE FROM `topics` WHERE id = ?";
    connection.query(sql, id, (err, data) => {
        if (err) {
            return callback(err);
        }
        return callback(null, data);
    })
}
exports.editTopic = (id, body, callback) => {
    const sql = "UPDATE `topics` SET ? WHERE id = ? ";
    connection.query(sql, [body, id], (err, data) => {
        if (err) {
            return callback(err);
        }
        return callback(null, data);

    })
}