import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext";
import { PlusIcon, TriangleDownIcon } from "@primer/octicons-react";
import GithubLogo from "../../assets/github-mark-white.svg";
import "../../styles/navbar.css";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar-container">
      <div className="navbar-left">
        <Link to="/">
          <img src={GithubLogo} alt="GitHub Logo" className="navbar-logo" />
        </Link>
      </div>
      <div className="navbar-right">
        <div className="navbar-search-wrapper">
          <input
            type="search"
            placeholder="Search or jump to..."
            className="navbar-search-input"
          />
        </div>
        {currentUser && (
          <>
            <div className="dropdown-container">
              <button
                className="navbar-button"
                onClick={() => setShowCreateDropdown(!showCreateDropdown)}
              >
                <PlusIcon size={16} />
                <TriangleDownIcon size={16} className="dropdown-caret" />
              </button>
              {showCreateDropdown && (
                <div className="dropdown-menu create-dropdown">
                  <Link to="/new" className="dropdown-item">
                    New repository
                  </Link>
                </div>
              )}
            </div>

            <div className="dropdown-container">
              <button
                className="navbar-button profile-button"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                <img
                  src={`https://github.com/identicons/${currentUser.username}.png`}
                  alt="avatar"
                  className="navbar-avatar"
                />
              </button>
              {showProfileDropdown && (
                <div className="dropdown-menu profile-dropdown">
                  <div className="dropdown-header">
                    Signed in as <br />
                    <strong>{currentUser.username}</strong>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link to="/profile" className="dropdown-item">
                    Your profile
                  </Link>
                  <Link to="/" className="dropdown-item">
                    Your repositories
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item logout-button"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
