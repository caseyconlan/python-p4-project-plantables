import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import bgImage from './images/Background.jpeg';

const Login = () => {
  const [formType, setFormType] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    // Fetch the CSRF token from the backend
    axios
      .get("/csrf-token", { withCredentials: true })
      .then((response) => {
        const token = response.headers["x-csrf-token"];
        setCsrfToken(token);
      })
      .catch((error) => {
        console.error("Failed to fetch CSRF token:", error);
      });
  }, []);

  const handleFormType = (type) => {
    setFormType(type);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);

    // Include the CSRF token in the request headers
    axios
      .post(
        "/login",
        { username, password },
        {
          withCredentials: true,
          headers: {
            "X-CSRF-Token": csrfToken,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        // Handle the login response
      })
      .catch((error) => {
        // Handle the login error
      });
  };

  const handleNewPlayer = (e) => {
    e.preventDefault();
    console.log(
      `First Name: ${firstName}, Last Name: ${lastName}, Email: ${email}, Username: ${username}, Password: ${password}`
    );

    // Include the CSRF token in the request headers
    axios
      .post(
        "/owners",
        {
          first_name: firstName,
          last_name: lastName,
          email,
          username,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "X-CSRF-Token": csrfToken,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        // Handle the new player creation response
      })
      .catch((error) => {
        // Handle the new player creation error
      });
  };

  const renderLoginForm = () => (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Log In</button>
    </form>
  );

  const renderNewPlayerForm = () => (
    <form onSubmit={handleNewPlayer}>
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input         type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      </label>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Create New Player</button>
    </form>
  );

  // const loginStyle = {
  //   backgroundImage: `url(${bgImage})`,
  //   backgroundRepeat: 'no-repeat',
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center',
  //   height: '100vh',
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // };

  return (
    <><h1 className="title">Welcome to Plantables</h1>
    <h2 className="description">Grow your plants with love!</h2>
    <div className="login">
        <button className="ReturningPlayerButton" onClick={() => handleFormType("login")}>Returning Player</button>
        <button className="NewPlayerButton" onClick={() => handleFormType("newPlayer")}>New Player</button>
        {formType === "login" && renderLoginForm()}
        {formType === "newPlayer" && renderNewPlayerForm()}
      </div></>
  );
};

export default Login;

