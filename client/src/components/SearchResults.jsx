import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/SearchResults.css';

function SearchResults() {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blog/blogs/search?query=${query}`);
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div className="search-results-container">
      <h1>Search Results for "{query}"</h1>
      <div className="results-list">
        {results.length > 0 ? (
          results.map((blog) => (
            <div key={blog._id} className="blog-card">
              <h2>{blog.title}</h2>
              <p>{blog.content.substring(0, 100)}...</p>
              <p><strong>Topics:</strong> {blog.topics.join(', ')}</p>
              <p><strong>Author:</strong> {blog.author?.username || "Unknown"}</p>
              <button
                className="read-more-btn"
                onClick={() => navigate(`/post/${blog._id}`)}
              >
                Read More
              </button>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;