const M_user = require("../models/m_user ");
exports.showSignin = (req, res) => {
  res.render("signin.html");
};

exports.handleSignin = (req, res) => {
  const body = req.body;
  M_user.checkEmail(body.email, (err, data) => {
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
    req.session.user = data[0];
    res.send({
      code: 200,
      msg: "密码正确登录成功"
    });
  });
};
exports.handleSignout = (req, res) => {
  delete req.session.user;
  res.redirect("/signin");
};
exports.showSignup = (req, res) => {
  res.render("signup.html");
};
exports.handleSignup = (req, res) => {
  const body = req.body;
  M_user.checkEmail(body.email, (err, data) => {
    if (err) {
      return res.send({
        code: 1,
        msg: err.message
      });
    }
    if (data[0]) {
      return res.send({
        code: 2,
        msg: "用户已存在"
      });
    }
    M_user.checkNickname(body.nickname, (err, data) => {
      if (err) {
        return res.send({
          code: 3,
          msg: err.message
        });
      }
      if (data[0]) {
        return res.send({
          code: 4,
          msg: "昵称已存在"
        });
      }
      M_user.addUser(body, (err, data) => {
        if (err) {
          return res.send({
            code: 4,
            msg: err.message
          });
        }
        res.send({
          code: 200,
          msg: "注册成功"
        });
      });
    });
  });
};
