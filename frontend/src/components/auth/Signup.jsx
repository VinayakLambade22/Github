import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../authContext';
import { signupUser } from '../../services/api';
import GithubLogo from '../../assets/github-mark-white.svg';
import '../../styles/auth.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await signupUser({ username, email, password });
            auth.login(response.data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to sign up.');
        }
    };

    return (
        <div className="auth-container">
            <img src={GithubLogo} alt="GitHub Logo" className="auth-logo" />
            <h1 className="auth-title">Create your account</h1>
            <div className="auth-form-container">
                {error && <p className="auth-error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                    <button type="submit" className="auth-button">Sign up</button>
                </form>
            </div>
            <div className="auth-switch-container">
                <p>Already have an account? <Link to="/login">Sign in.</Link></p>
            </div>
        </div>
    );
};

export default Signup;