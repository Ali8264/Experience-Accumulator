import React, { useRef, useState } from "react";
import "./login.css";
import { Room, Cancel } from "@material-ui/icons";
import axios from "axios";

export default function Login({ setShowLogin }) {
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axios.post("/users/login", user);
      // Handle successful login
      console.log(response.data); // You can do something with the response data
      setError(false);
      setShowLogin(false);
    } catch (err) {
      setError(true);
      console.log(err); // Log the error for debugging purposes
    }
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <Room className="logoIcon" />
        <span>MAPMARKER</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input style={{ marginTop: 30 }} placeholder="username" ref={usernameRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="loginBtn">Login</button>
        {error && <span className="failure">Incorrect username or password!</span>}
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}
