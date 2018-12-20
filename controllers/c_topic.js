const moment = require("moment");
const M_topic = require("../models/m_topic");
exports.showTopicList = (req, res) => {
  M_topic.findAllTopics((err, data) => {
    if (err) {
      return res.send({
        code: 500,
        msg: "服务器出差"
      });
    }
    res.render("index.html", {
      topics: data,
      user: req.session.user
    });
  });
};
exports.createTopic = (req, res) => {
  res.render("topic/create.html");
};
exports.handleCreateTopic = (req, res) => {
  console.log(req.body);
  const body = req.body;
  body.userId = req.session.user.id;
  body.createdAt = moment().format();
  M_topic.addTopic(body, (err, data) => {
    if (err) {
      return res.send({
        code: 500,
        msg: "服务器出差"
      });
    }
    res.send({
      code: 200,
      msg: "添加成功"
    });
  });
};

exports.showTopicDetail = (req, res) => {
  const topicID = req.params.topicID;
  console.log(topicID);
  M_topic.findTopicById(topicID, (err, data) => {
    if (err) {
      return res.send({
        code: 500,
        msg: err.message
      });
    }
    res.render("topic/show.html", {
      topic: data[0],
      sessionUserId: req.session.user ? req.session.user.id : 0
    });
  });
};
exports.handleDeleTopic = (req, res) => {
  const topicID = req.params.topicID;
  M_topic.deleTopicById(topicID, (err, data) => {
    if (err) {
      return res.send({
        code: 500,
        msg: err.message
      });
    }
    res.redirect("/");
  });
};
exports.showEditTopic = (req, res) => {
  const topicID = req.params.topicID;
  M_topic.findTopicById(topicID, (err, data) => {
    if (err) {
      return res.send({
        code: 500,
        msg: err.message
      });
    }
    res.render("topic/edit.html", { topic: data[0] });
  });
};
exports.handleEditTopic = (req, res) => {
  const topicID = req.params.topicID;
  const body = req.body;
  M_topic.editTopic(topicID, body, (err, data) => {
    if (err) {
      return res.send({
        code: 500,
        msg: err.message
      });
    }
    res.send({
      code: 200,
      msg: "修改成功"
    });
  });
};
