import React, { useState } from 'react';
import axios from 'axios';
import './styles/Learn.css';

function Learn() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse(''); // Clear previous response

    try {
      const res = await axios.post('http://localhost:5000/api/learn/GPT', { query }); // Updated endpoint
      const cleanedResponse = extractAfterThinkTag(res.data.response); // Process the response
      setResponse(cleanedResponse); // Set the cleaned response
    } catch (err) {
      console.error(err);
      setResponse('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Function to extract content after the </think> tag
  const extractAfterThinkTag = (text) => {
    const thinkTagEndIndex = text.indexOf('</think>');
    if (thinkTagEndIndex !== -1) {
      return text.substring(thinkTagEndIndex + 8).trim(); // Extract content after </think>
    }
    return text.trim(); // If no </think> tag, return the full text
  };

  return (
    <div className="learn-container">
      <h1>Learn Blogging with AI</h1>
      <form onSubmit={handleQuerySubmit} className="learn-form">
        <textarea
          placeholder="Ask anything about blogging..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="learn-textarea"
        />
        <button type="submit" className="learn-submit-btn" disabled={loading}>
          {loading ? 'Loading...' : 'Ask'}
        </button>
      </form>
      {response && (
        <div className="learn-response">
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default Learn;