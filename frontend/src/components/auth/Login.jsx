import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../authContext';
import { loginUser } from '../../services/api';
import GithubLogo from '../../assets/github-mark-white.svg';
import '../../styles/auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await loginUser({ email, password });
            auth.login(response.data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login.');
        }
    };

    return (
        <div className="auth-container">
            <img src={GithubLogo} alt="GitHub Logo" className="auth-logo" />
            <h1 className="auth-title">Sign in to GitHub</h1>
            <div className="auth-form-container">
                {error && <p className="auth-error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" className="auth-button">Sign in</button>
                </form>
            </div>
            <div className="auth-switch-container">
                <p>New to GitHub? <Link to="/signup">Create an account.</Link></p>
            </div>
        </div>
    );
};

export default Login;