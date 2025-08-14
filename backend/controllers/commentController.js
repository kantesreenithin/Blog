const Comment = require("../models/Comment");
const BlogPost = require("../models/BlogPost");

//@desc   Add a comment to a blog post
//@route  POST /api/comments/:postId
//@access Private
const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, parentComment } = req.body;

    //Ensure blog post exists
    const post = await BlogPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = await Comment.create({
      post: postId,
      author: req.user._id,
      content,
      parentComment: parentComment || null,
    });

    await comment.populate("author", "name profileImageUrl");

    res.status(201).json(comment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add Comment", error: error.message });
  }
};

//@desc   get all comments
//@route  Get /api/comments/
//@access Public
const getAllComments = async (req, res) => {
  try {
    //fetch all comments
    const comments = await Comment.find()
      .populate("author", "name profileImageUrl")
      .populate("post", "title coverImageUrl")
      .sort({ createdAt: 1 }); //optional ,so replies comes in order

    //create a map for commentId -> comment object
    const commentMap = {};
    comments.forEach((comment) => {
      comment = comment.toObject(); //convert from Mongoose Document to plain obj
      comment.replies = []; //initialize replies array
      commentMap[comment._id] = comment;
    });

    //Nest replies under their parentComment
    const nestedComments = [];
    comments.forEach((comment) => {
      if (comment.parentComment) {
        const parent = commentMap[comment.parentComment];
        if (parent) {
          parent.replies.push(commentMap[comment._id]);
        }
      } else {
        nestedComments.push(commentMap[comment._id]);
      }
    });

    res.json(nestedComments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch Comment", error: error.message });
  }
};

//@desc   get all comment for a blog post blog post
//@route  get /api/comments/:postId
//@access public
const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId })
      .populate("author", "name profileImageUrl")
      .populate("post", "title coverImageUrl")
      .sort({ createdAt: 1 }); //optional ,so replies comes in order

    //create a map for commentId -> comment object
    const commentMap = {};
    comments.forEach((comment) => {
      comment = comment.toObject(); //convert from Mongoose Document to plain obj
      comment.replies = []; //initialize replies array
      commentMap[comment._id] = comment;
    });

    //Nest replies under their parentComment
    const nestedComments = [];
    comments.forEach((comment) => {
      if (comment.parentComment) {
        const parent = commentMap[comment.parentComment];
        if (parent) {
          parent.replies.push(commentMap[comment._id]);
        }
      } else {
        nestedComments.push(commentMap[comment._id]);
      }
    });

    res.json(nestedComments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch Comment", error: error.message });
  }
};

//@desc   Delete a comment and its replies (author or admin only)
//@route  POST /api/comments/:commentId
//@access Private
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    //delete the comment
    await Comment.deleteOne({ _id: commentId });

    //delete all replies to this comment (one level of nesting only)
    await Comment.deleteMany({ parentComment: commentId });

    res.json({ message: "Comment and any replies deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete Comment", error: error.message });
  }
};

module.exports = {
  addComment,
  getAllComments,
  getCommentsByPost,
  deleteComment,
};
