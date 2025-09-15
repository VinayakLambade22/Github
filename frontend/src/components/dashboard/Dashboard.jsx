import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import { getUserRepos } from '../../services/api';
import { useAuth } from '../../authContext';
import { RepoIcon } from '@primer/octicons-react';
import '../../styles/dashboard.css';

const popularRepos = [
    { name: 'React', description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.' },
    { name: 'Vue.js', description: 'The Progressive JavaScript Framework.' },
];

const Dashboard = () => {
    const [userRepos, setUserRepos] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchUserRepos = async () => {
            if (currentUser) {
                try {
                    const response = await getUserRepos(currentUser._id);
                    setUserRepos(response.data.repositories || []);
                } catch (error) { console.error("Failed to fetch user repositories:", error); }
            }
        };
        fetchUserRepos();
    }, [currentUser]);

    return (
        <>
            <Navbar />
            <div className="dashboard-container">
                <aside className="dashboard-sidebar left">
                    <div className="sidebar-header"><h3>Recent Repositories</h3></div>
                    {userRepos.length > 0 ? (
                        <ul className="repo-list">
                            {userRepos.map(repo => (
                                <li key={repo._id}><Link to={`/${currentUser.username}/${repo.name}`}><RepoIcon size={16} /><span>{repo.name}</span></Link></li>
                            ))}
                        </ul>
                    ) : <p className="no-repos-message">No repositories yet.</p>}
                </aside>
                <main className="dashboard-main">
                    <h2>Home</h2>
                    {popularRepos.map(repo => (
                        <div className="repo-card" key={repo.name}>
                            <h3>{repo.name}</h3><p>{repo.description}</p><a href="#">VIEW REPOSITORY</a>
                        </div>
                    ))}
                </main>
                <aside className="dashboard-sidebar right">
                     <div className="sidebar-card"><h3>GitHub Trending</h3><a href="/explore">VIEW TRENDING</a></div>
                </aside>
            </div>
        </>
    );
};

export default Dashboard;