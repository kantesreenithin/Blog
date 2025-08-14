export const BASE_URL = "https://blog-0jf6.onrender.com";
//  "http://localhost:8000";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register", //signup
    LOGIN: "/api/auth/login", //authenticate and return jwt token
    GET_PROFILE: "/api/auth/profile", //get logged-in user details
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image", //upload profile picture
  },
  DASHBOARD: {
    GET_DASHBOARD_DATA: "/api/dashboard-summary", //get dashboard data
  },
  AI: {
    GENERATE_BLOG_POST: "/api/ai/generate", //generate a blog post using ai
    GENERATE_BLOG_POST_IDEAS: "/api/ai/generate-ideas", //generate a blog post ideas using ai
    GENERATE_COMMENT_REPLY: "/api/ai/generate-reply", //generate a reply using ai
    GENERATE_POST_SUMMARY: "/api/ai/generate-summary", //generate post summary using ai
  },
  POSTS: {
    CREATE: "/api/posts", //create a new blog post (admin only)
    GET_ALL: "/api/posts", //get all published blog posts
    GET_TRENDING_POSTS: "/api/posts/trending", //get trending blog posts
    GET_BY_SLUG: (slug) => `/api/posts/slug/${slug}`, //get a single blog post by slug
    UPDATE: (id) => `/api/posts/${id}`, //update a blog post
    DELETE: (id) => `/api/posts/${id}`, //delete a blog post
    GET_BY_TAG: (tag) => `/api/posts/tag/${tag}`, //get posts by a specific tag
    SEARCH: "/api/posts/search", //search posts by title or content
    INCREMENT_VIEW: (id) => `/api/posts/${id}/view`, //increament view count
    LIKE: (id) => `/api/posts/${id}/like`, //like a blog post
  },
  COMMENTS: {
    ADD: (postId) => `/api/comments/${postId}`, //add a comment to a post
    GET_ALL: "/api/comments", // get all comments
    GET_ALL_BY_POST: (postId) => `/api/comments/${postId}`, //get all comments for a post
    DELETE: (commentId) => `/api/comments/${commentId}`, //delete a comment
  },
};
