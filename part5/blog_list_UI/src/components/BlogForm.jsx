import { useState } from 'react';
import blogService from '../services/blogs';
import Message from './Message';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuhor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = async (e) => {
    e.preventDefault();

    await createBlog({ title, author, url });

    setTitle('');
    setAuhor('');
    setUrl('');
  };

  return (
    <div className="bg-gray-100">
      <div>
        <h2 className="text-2xl font-medium">Create new</h2>

        <form onSubmit={addBlog}>
          <div>
            <label>
              title:
              <input
                placeholder="write title here"
                className="border-2 bg-sky-100"
                type="text"
                value={title}
                name="title"
                onChange={({ target }) => setTitle(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              author:
              <input
                placeholder="author name"
                className="border-2 bg-sky-100"
                type="text"
                value={author}
                name="author"
                onChange={({ target }) => setAuhor(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              url:
              <input
                placeholder="ulr address"
                className="border-2 bg-sky-100"
                type="text"
                value={url}
                name="url"
                onChange={({ target }) => setUrl(target.value)}
              />
            </label>
          </div>
          <button type="submit" className="min-h-0 h-8 px-6 btn bg-green-200">
            create
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
