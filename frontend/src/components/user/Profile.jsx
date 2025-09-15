import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { useAuth } from "../../authContext";
import { getUserProfile, getUserRepos } from "../../services/api";
import HeatMapProfile from "./HeatMap";
import { BookIcon, RepoIcon } from "@primer/octicons-react";
import '../../styles/profile.css';

const Profile = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);
    const [userRepos, setUserRepos] = useState([]);
    
    useEffect(() => {
        const fetchUserData = async () => {
            // FIX: Only run this code if currentUser and its _id exist.
            if (currentUser && currentUser._id) {
                try {
                    const profileRes = await getUserProfile(currentUser._id);
                    setUserDetails(profileRes.data);
                    const reposRes = await getUserRepos(currentUser._id);
                    setUserRepos(reposRes.data.repositories || []);
                } catch (err) {
                    console.error("Cannot fetch user details: ", err);
                }
            }
        };
        fetchUserData();
    }, [currentUser]); // The dependency on currentUser ensures this runs again when it's available.

    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    
    if (!userDetails) {
        return <div>Loading profile...</div>; // Shows a loading message until data is fetched
    }

    return (
        <>
            <Navbar />
            <div className="profile-page-container">
                <div className="profile-sidebar">
                    <img src={`https://github.com/identicons/${userDetails.username}.png`} alt="avatar" className="profile-avatar"/>
                    <h2 className="profile-name">{userDetails.username}</h2>
                    <Link to="/settings/profile" className="edit-profile-btn">Edit profile</Link>
                    <div className="follower-info"><span>10 followers</span> · <span>3 following</span></div>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
                <div className="profile-main-content">
                    <div className="profile-tabs">
                         <a href="#" className="profile-tab active"><BookIcon /> Overview</a>
                         <a href="#" className="profile-tab"><RepoIcon /> Repositories <span className="repo-count">{userRepos.length}</span></a>
                    </div>
                    <div className="content-section">
                        <h4>Popular repositories</h4>
                        <div className="popular-repos-grid">
                            {userRepos.slice(0, 6).map(repo => (
                                <div className="popular-repo-card" key={repo._id}>
                                    <Link to={`/${currentUser.username}/${repo.name}`}>{repo.name}</Link>
                                    <p>{repo.description}</p>
                                    <span className="repo-visibility">{repo.isPublic ? 'Public' : 'Private'}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="content-section"><HeatMapProfile /></div>
                </div>
            </div>
        </>
    );
};

export default Profile;