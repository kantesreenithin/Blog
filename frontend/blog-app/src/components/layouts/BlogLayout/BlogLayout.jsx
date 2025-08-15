import React from "react";
import BlogNavbar from "./BlogNavbar";

function BlogLayout({ children, activeMenu }) {
  return (
    <div className="bg-white pb-20">
      <BlogNavbar activeMenu={activeMenu} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 ">{children}</div>
    </div>
  );
}

export default BlogLayout;
