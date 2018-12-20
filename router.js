const express = require("express");
const c_user = require("./controllers/c_user");
const router = express.Router();
const c_topic = require("./controllers/c_topic");

router
  .get("/signin", c_user.showSignin)
  .post("/signin", c_user.handleSignin)
  .get("/", c_topic.showTopicList)
  .get("/topic/create",c_topic.createTopic)
  .post("/topic/create", c_topic.handleCreateTopic)
  .get("/signout",c_user.handleSignout)
  .get("/detail/topic/:topicID",c_topic.showTopicDetail)
  .get("/topic/detail/delete/:topicID",c_topic.handleDeleTopic)
  .get('/topic/detail/edit/:topicID',c_topic.showEditTopic)
  .post('/topic/edit/:topicID',c_topic.handleEditTopic)
  .get('/signup',c_user.showSignup)
  .post('/signup',c_user.handleSignup)

module.exports = router;
