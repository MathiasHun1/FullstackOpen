const Blog = ({ blog }) => (
  <div>
    <p><i>{blog.author}:</i> <strong>{blog.title}</strong></p>
  </div>  
)

export default Blog