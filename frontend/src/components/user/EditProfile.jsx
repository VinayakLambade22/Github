import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { updateUserProfile, deleteUserProfile } from "../../services/api";
import { useAuth } from "../../authContext";
import "../../styles/settings.css";

const EditProfile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(currentUser._id, { username, email });
      alert(
        "Profile updated successfully! Please log in again to see all changes."
      );
      logout();
      navigate("/login");
    } catch (error) {
      alert("Failed to update profile.");
    }
  };

  const handleDelete = async () => {
    if (
      window.prompt(
        `To delete your account, please type your username "${currentUser.username}"`
      ) === currentUser.username
    ) {
      try {
        await deleteUserProfile(currentUser._id);
        alert("Account deleted successfully.");
        logout();
        navigate("/login");
      } catch (error) {
        alert("Failed to delete account.");
      }
    } else {
      alert("Username did not match. Deletion cancelled.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="settings-container">
        <h2>Public Profile Settings</h2>
        <form onSubmit={handleUpdate} className="settings-section">
          <h3>Profile Details</h3>
          <div className="form-content">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn-primary">
              Update Profile
            </button>
          </div>
        </form>
        <div className="settings-section danger-zone">
          <h3>Delete Account</h3>
          <div className="danger-item">
            <div>
              <strong>This action is irreversible.</strong>
              <p>All your repositories and data will be permanently removed.</p>
            </div>
            <button onClick={handleDelete} className="btn-danger">
              Delete your account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditProfile;
