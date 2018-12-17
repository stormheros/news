// 1. 导包
const mysql = require("mysql");
// 2. 配置
const connection = mysql.createConnection({
  // 主机
  host: "localhost",
  // 用户名
  user: "root",
  // 密码
  password: "root",
  // 数据库名字
  database: "user"
});

// 3. 开启连接
connection.connect();

exports.showSignin = (req, res) => {
  res.render("signin.html");
};

exports.handleSignin = (req, res) => {
  const body = req.body;

  const sqlstr = "SELECT * FROM `users` WHERE email = ?";
  connection.query(sqlstr, body.email, (err, data) => {
    if (err) {
      throw err;
    }
    if (data.length === 0) {
     return res.send({
        code: 1,
        msg: "邮箱不存在"
      });
    }

    if (data[0].password !== body.password) {
      return res.send({
        code: 2,
        msg: "密码错误"
      });
    }
    res.send({
      code: 200,
      msg: "密码正确登录成功"
    });
  });
};
