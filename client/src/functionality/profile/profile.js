import axios from 'axios';

const updatePreferences = async (_id, newPreferences) => {
  try {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5000/api/auth/updateuser/${_id}`, { preferences: newPreferences }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    alert('Preferences updated successfully');
  } catch (err) {
    console.error(err);
    alert('Failed to update preferences');
  }
};
const fetchUserPosts = async (setUserPosts,_id) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`http://localhost:5000/api/blog/userblogs/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setUserPosts(res.data);
  } catch (err) {
    console.error(err);
  }
};

export { updatePreferences,fetchUserPosts };