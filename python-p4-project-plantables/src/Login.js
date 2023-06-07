// Login.js
import React, { useState } from 'react';
import './App.css';

function Login({ setLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [creatingAccount, setCreatingAccount] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (creatingAccount) {
            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }
            console.log(`Creating account for ${username}`);
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setCreatingAccount(false);
        } else {
            setLoggedIn(true);
        }
    };

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                {creatingAccount && (
                    <label>
                        Confirm Password:
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </label>
                )}
                <input type="submit" value={creatingAccount ? "Create account" : "Log in"} />
            </form>
            <button onClick={() => setCreatingAccount(!creatingAccount)}>
                {creatingAccount ? "Already have an account?" : "Create a new account"}
            </button>
        </div>
    );
}

export default Login;
