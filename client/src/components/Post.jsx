import React, { useState, useEffect } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { fetchUserById } from '../functionality/auth/Auth';
import "../components/styles/Post.css";

function Post() {
  const { id: postId } = useParams(); // Get the postId from the URL
  const navigate=useNavigate();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [authorName, setAuthorName] = useState(''); // Store the author's username
  const [userRole, setUserRole] = useState('user'); // Store the current user's role

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blog/blogs/detail/${postId}`);
        setPost(res.data);
        setLikes(res.data.likes);
        setLiked(res.data.liked);

        // Fetch the author's username and role
        const { username, role } = await fetchUserById(res.data.author);
        setAuthorName(username);
        setUserRole(role);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPost();
  }, [postId]);

  const handleToggleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `http://localhost:5000/api/blog/blogs/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLikes(res.data.likes);
      setLiked(res.data.liked);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `http://localhost:5000/api/blog/blogs/${postId}/comment`,
        { content: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPost({ ...post, comments: [...post.comments, res.data] });
      setNewComment('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `http://localhost:5000/api/blog/blogs/${postId}/comment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPost({
        ...post,
        comments: post.comments.filter((comment) => comment._id !== commentId),
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePost = async () => {
    try {
      const token = localStorage.getItem('token');
      const res=await axios.delete(`http://localhost:5000/api/blog/blogs/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      alert(res.data);
      navigate('/dashboard')
    } catch (err) {
      console.error(err);
    }
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="post-container">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p><strong>Topics:</strong> {post.topics.join(', ')}</p>
      <p><strong>Author:</strong> {authorName || "Loading..."}</p>
      <p><strong>Likes:</strong> {likes}</p>
      <button onClick={handleToggleLike}>{liked ? 'Unlike' : 'Like'}</button>
      <div className="comments-section">
        <h2>Comments</h2>
        {post.comments.length > 0 ? (
          post.comments.map((comment, index) => (
            <div key={index} className="comment-item">
              <p>{comment.content}</p>
              {(userRole === 'admin' || comment.author === localStorage.getItem('user')) && (
                <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
              )}
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
        <div className="add-comment">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
      </div>
      {(userRole === 'admin' || post.author === localStorage.getItem('user')) && (
        <button onClick={handleDeletePost}>Delete Post</button>
      )}
    </div>
  );
}

export default Post;