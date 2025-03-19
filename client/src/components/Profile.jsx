import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../components/styles/Profile.css";
import { fetchUserPosts, updatePreferences } from '../functionality/profile/profile'
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [userData, setUserData] = useState({
    _id: '',
    username: '',
    preferences: []
  });

  const [newPreferences, setNewPreferences] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from the database
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/auth/getuserbyusername/${localStorage.getItem('user')}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(res.data);
        setNewPreferences(res.data.preferences);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData._id) {
      console.log(userData._id);
      fetchUserPosts(setUserPosts, userData._id);
    }
  }, [userData._id]);

  const handlePreferencesChange = (index, value) => {
    const updatedPreferences = [...newPreferences];
    updatedPreferences[index] = value;
    setNewPreferences(updatedPreferences);
  };

  const handleAddPreference = () => {
    setNewPreferences([...newPreferences, '']);
  };

  const handleRemovePreference = (index) => {
    const updatedPreferences = newPreferences.filter((_, i) => i !== index);
    setNewPreferences(updatedPreferences);
  };

  const handleUpdatePreferences = async () => {
    try {
      await updatePreferences(userData._id, newPreferences);
      setUserData({ ...userData, preferences: newPreferences });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-info">
        <p><strong>Username:</strong> {userData.username}</p>
        <p><strong>Preferences:</strong></p>
        {isEditing ? (
          <div>
            {newPreferences.map((preference, index) => (
              <div key={index} className="preference-item">
                <input
                  type="text"
                  value={preference}
                  onChange={(e) => handlePreferencesChange(index, e.target.value)}
                />
                <button onClick={() => handleRemovePreference(index)}>Remove</button>
              </div>
            ))}
            <button onClick={handleAddPreference}>Add Preference</button>
          </div>
        ) : (
          <ul>
            {userData.preferences.map((preference, index) => (
              <li key={index}>{preference}</li>
            ))}
          </ul>
        )}
      </div>
      {isEditing ? (
        <button onClick={handleUpdatePreferences}>Save</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit Preferences</button>
      )}
      <h2>Your Posts</h2>
      <div className="user-posts">
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div key={post._id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.content.substring(0, 100)}...</p>
              <p><strong>Topics:</strong> {post.topics.join(', ')}</p>
              <button
                className="read-more-btn"
                onClick={() => navigate(`/post/${post._id}`)}
              >
                Read More
              </button>
            </div>
          ))
        ) : (
          <p>No posts yet.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;