const BlogPost = require("../models/BlogPost");
const mongoose = require("mongoose");

//@desc  create a new blog post
//@route POST /api/posts
//@acess private (admin only)
const createPost = async (req, res) => {
  try {
    const { title, content, coverImageUrl, tags, isDraft, generatedByAI } =
      req.body;

    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    const newPost = new BlogPost({
      title,
      slug,
      content,
      coverImageUrl,
      tags,
      author: req.user._id,
      isDraft,
      generatedByAI,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create a post", error: error.message });
  }
};

//@desc  Update an existing blog post
//@route PUT /api/posts/:id
//@acess private (admin / author)
const updatePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (
      post.author.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this post" });
    }

    const updatedData = req.body;
    if (updatedData.title) {
      updatedData.slug = updatedData.title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    }

    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//@desc  delete blog post
//@route DEL /api/posts/:id
//@acess private (admin / author)
const deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//@desc  get blog posts by status (all,published,or draft) and include counts
//@route GET /api/posts?status=published|draft|all&page=1
//@acess public
const getAllPosts = async (req, res) => {
  try {
    const status = req.query.status || "published";
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    //determine filter for main posts response
    let filter = {};
    if (status === "published") filter.isDraft = false;
    else if (status === "draft") filter.isDraft = true;

    //fetch paginated pages
    const posts = await BlogPost.find(filter)
      .populate("author", "name profileImageUrl")
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);

    //count total for pagination and tab counts
    const [totalCount, allCount, publishedCount, draftCount] =
      await Promise.all([
        BlogPost.countDocuments(filter),
        BlogPost.countDocuments(),
        BlogPost.countDocuments({ isDraft: false }),
        BlogPost.countDocuments({ isDraft: true }),
      ]);

    res.json({
      posts,
      page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
      counts: {
        all: allCount,
        published: publishedCount,
        draft: draftCount,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//@desc  get a single blog post by slug
//@route GET /api/posts/:slug
//@acess public
const getPostBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug }).populate(
      "author",
      "name profileImageUrl"
    );
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//@desc  get post by tag
//@route GET /api/posts/tag/:tag
//@acess public
const getPostsByTag = async (req, res) => {
  try {
    const posts = await BlogPost.find({
      tags: req.params.tag,
      isDraft: false,
    }).populate("author", "name profileImageUrl");

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//@desc search posts by title or content
//@route GET /api/posts/search?q=keyword
//@acess public
const searchPosts = async (req, res) => {
  try {
    const q = req.query.q;
    const posts = await BlogPost.find({
      isDraft: false,
      $or: [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
      ],
    }).populate("author", "name profileImageUrl");

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//@desc  Increment post view count
//@route PUT /api/posts/:id/view
//@acess public
const incrementView = async (req, res) => {
  try {
    await BlogPost.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    res.json({ message: "View count incremented" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//@desc  like a post
//@route PUT /api/posts/:id/like
//@acess public
const likePost = async (req, res) => {
  try {
    await BlogPost.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } });
    res.json({ message: "Like added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//@desc  Get top trending posts
//@route GET /api/posts/trending
//@acess private
const getTopPosts = async (req, res) => {
  try {
    //top performing posts
    const posts = await BlogPost.find({ isDraft: false })
      .sort({ views: -1, likes: -1 })
      .limit(5);

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostBySlug,
  getPostsByTag,
  searchPosts,
  incrementView,
  likePost,
  getTopPosts,
};
