import React, { useState } from 'react';
import axios from 'axios';
import "../components/styles/CreateBlog.css";

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState('');

  const handleAddTopic = () => {
    if (newTopic.trim() !== '') {
      setTopics([...topics, newTopic.trim()]);
      setNewTopic('');
    }
  };

  const handleRemoveTopic = (index) => {
    const updatedTopics = topics.filter((_, i) => i !== index);
    setTopics(updatedTopics);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/blog/blogs', {
        topics,
        title,
        content
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Blog created successfully');
      setTitle('');
      setContent('');
      setTopics([]);
    } catch (err) {
      console.error(err);
      alert('Failed to create blog');
    }
  };

  return (
    <div className="create-blog-container">
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Content:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </label>
        <label>
          Topics:
          <div className="topics-input">
            <input type="text" value={newTopic} onChange={(e) => setNewTopic(e.target.value)} />
            <button type="button" onClick={handleAddTopic}>Add Topic</button>
          </div>
          <div className="topics-list">
            {topics.map((topic, index) => (
              <div key={index} className="topic-item">
                {topic}
                <button type="button" onClick={() => handleRemoveTopic(index)}>Remove</button>
              </div>
            ))}
          </div>
        </label>
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
}

export default CreateBlog;