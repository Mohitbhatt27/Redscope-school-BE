const postService = require("../services/post.services");

const createPost = async (req, res) => {
  try {
    const post = await postService.createPost({
      parent_id: req.user._id,
      content: req.body.content,
      social_circle_id: req.body.social_circle_id,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await postService.getPosts(req.params.socialCircleId);
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const voteOnPost = async (req, res) => {
  try {
    const post = await postService.voteOnPost(
      req.params.postId,
      req.user._id,
      req.body.voteType
    );
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createPost, getPosts, voteOnPost };
