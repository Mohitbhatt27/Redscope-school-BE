// controllers/commentController.js
const commentService = require("../services/comment.services");

const createComment = async (req, res) => {
  try {
    const postData = {
      parent_id: req.user._id,
      post_id: req.params.postID,
      content: req.body.content,
    };
    const comment = await commentService.createComment(postData);
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await commentService.getComments(req.params.postID);
    res.json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createReply = async (req, res) => {
  try {
    const replyData = {
      parent_id: req.user._id,
      comment_id: req.params.commentId,
      content: req.body.content,
    };
    const reply = await commentService.createReply(replyData);
    res.status(201).json(reply);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const voteOnComment = async (req, res) => {
  try {
    const comment = await commentService.voteOnComment(
      req.params.commentId,
      req.user._id,
      req.body.voteType
    );
    res.json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createComment, getComments, createReply, voteOnComment };
