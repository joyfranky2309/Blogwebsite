import axios from "axios";

const register = async (username, password, confirmPassword, nav, setLoggedIn) => {
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  try {
    const res = await axios.post("http://localhost:5000/api/auth/register", { username, password });
    alert(res.data.message);
    nav("/login");
  } catch (err) {
    console.error(err);
  }
};

const login = async (username, password, nav, setLoggedIn) => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", { username, password });
    alert(res.data.message);
    localStorage.setItem("user", res.data.user.username);
    localStorage.setItem("token", res.data.token);
    setLoggedIn(true);
    nav("/dashboard");
  } catch (err) {
    console.error(err);
    alert("Login failed. Please check your credentials and try again.");
  }
};

export { register, login };