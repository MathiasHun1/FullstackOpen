import { useEffect } from 'react';
import Blog from './Blog';

const BlogsList = ({ blogs, deleteBlog, addLike }) => {
  let sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      {sortedBlogs.map((blog) => {
        return (
          <Blog
            key={blog.id}
            blog={blog}
            deleteBlog={deleteBlog}
            addLike={addLike}
          />
        );
      })}
    </div>
  );
};

export default BlogsList;
