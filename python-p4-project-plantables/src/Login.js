import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    // Fetch the CSRF token from the backend
    axios.get('http://localhost:5555/csrf-token', { withCredentials: true })
      .then(response => {
        const token = response.headers['x-csrf-token'];
        setCsrfToken(token);
      })
      .catch(error => {
        console.error('Failed to fetch CSRF token:', error);
      });
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);

    // Include the CSRF token in the request headers
    axios.post('http://localhost:5555/login', { email, password }, {
      withCredentials: true,
      headers: {
        'X-CSRF-Token': csrfToken
      }
    })
      .then(response => {
        // Handle the login response
      })
      .catch(error => {
        // Handle the login error
      });
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

export default function LoginWrapper() {
    return <Login />;
  }