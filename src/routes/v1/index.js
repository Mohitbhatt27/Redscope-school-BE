const express = require("express");
const Authrouter = require("./auth.router");
const PostsRouter = require("./posts.router");
const CommentRouter = require("./comments.router");
const SocietyRouter = require("./societies.router");
const SchoolRouter = require("./schools.router");
const ParentRouter = require("./parents.router");
const SocialCircleRouter = require("./socialCircles.router");

const v1Router = express.Router();

v1Router.use("/auth", Authrouter);
v1Router.use("/posts", PostsRouter);
v1Router.use("/comments", CommentRouter);
v1Router.use("/societies", SocietyRouter);
v1Router.use("/schools", SchoolRouter);
v1Router.use("/parents", ParentRouter);
v1Router.use("/socialCircles", SocialCircleRouter);

module.exports = v1Router;
