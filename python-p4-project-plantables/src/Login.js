import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = ({ setLoggedIn }) => {
  const [formType, setFormType] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

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
    console.log(`Login Successful`);
  
    const requestData = {
      username,
      password,
    };
  
    const headers = {
      "X-CSRF-Token": csrfToken,
      "Content-Type": "application/json",
    };
  
    if (csrfToken) {
      headers["X-CSRF-Token"] = csrfToken;
    }
  
    axios
      .post("/login", requestData, {
        withCredentials: true,
        headers,
      })
      .then((response) => {
        if (response.data.message === 'Login successful') {
          setLoggedIn(true);
        } else {
          console.log('Invalid username or password');
        }
      })
      .catch((error) => {
        console.log('Login error:', error);
      });
  };  

  const handleNewPlayer = (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      console.log("Password and confirmation do not match");
      return;
    }
    console.log(`New Player ${firstName} ${lastName} Created! Username: ${username}`);

    const requestData = {
      first_name: firstName,
      last_name: lastName,
      email,
      username,
      password,
    };

    const headers = {
      "X-CSRF-Token": csrfToken,
      "Content-Type": "application/json",
    };

    if (csrfToken) {
      headers["X-CSRF-Token"] = csrfToken;
    }

    axios
      .post("/owners", requestData, {
        withCredentials: true,
        headers: headers,
      })
      .then((response) => {
        // Handle the new player creation response
        setLoggedIn(true); // Assuming that creating a new player logs them in
      })
      .catch((error) => {
        // Handle the new player creation error
      });
  };

  const renderLoginForm = () => (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Log In</button>
      <button className="button-1" role="button" onClick={handleForgotPassword}>Forgot Password</button>
      <button className="button-1" role="button" onClick={handleDeleteAccount}>Delete Account</button>
  </form>
  );

  const handleForgotPassword = (e) => {
    e.preventDefault();

    axios
        .post("/forgot-password", { username }, {
            headers: {
                "X-CSRF-Token": csrfToken,
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            // Prompt the user to enter a new password
            const new_password = window.prompt('Enter a new password:');

            // Update the password on the server
            axios
                .patch("/update-password", { username, new_password }, {
                    headers: {
                        "X-CSRF-Token": csrfToken,
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
};

const handleDeleteAccount = (e) => {
  e.preventDefault();

  const requestData = {
    username,
    password,
  };

  const headers = {
    "X-CSRF-Token": csrfToken,
    "Content-Type": "application/json",
  };

  axios
    .post("/delete-account", requestData, {
      headers,
      withCredentials: true,
    })
    .then((response) => {
      if (response.data.message === 'Account deleted successfully') {
        setLoggedIn(false);
      } else {
        console.log('Invalid username or password');
      }
    })
    .catch((error) => {
      console.log('Delete account error:', error);
    });
};

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
        <input
          type="email"
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
      <label>
        Confirm Password:
        <input
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </label>
      <button type="submit">Create New Player</button>
    </form>
  );

  return (
    <>
      <div className="title">Welcome to Plantables!</div>
      <div className="description">Grow your plants with love</div>
      <div>
        <button className="button-1" role="button" onClick={() => handleFormType("login")}>Returning Customer</button>
        <button className="button-1" role="button" onClick={() => handleFormType("newPlayer")}>New Customer</button>
        {formType === "login" && renderLoginForm()}
        {formType === "newPlayer" && renderNewPlayerForm()}
      </div>
    </>
  );
};

export default Login;
