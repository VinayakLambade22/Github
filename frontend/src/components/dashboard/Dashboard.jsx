import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { getUserRepos } from "../../services/api";
import { useAuth } from "../../authContext";
import {
  RepoIcon,
  BookIcon,
  FlameIcon,
  StarIcon,
  BroadcastIcon,
} from "@primer/octicons-react";
import "../../styles/dashboard.css";

const popularRepos = [
  {
    name: "facebook/react",
    description:
      "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    url: "https://github.com/facebook/react",
    stars: "215k",
    language: "JavaScript",
    langColor: "#f1e05a",
  },
  {
    name: "vuejs/vue",
    description: "The Progressive JavaScript Framework.",
    url: "https://github.com/vuejs/vue",
    stars: "205k",
    language: "TypeScript",
    langColor: "#3178c6",
  },
  {
    name: "freeCodeCamp/freeCodeCamp",
    description:
      "freeCodeCamp.org's open-source codebase and curriculum. Learn to code for free.",
    url: "https://github.com/freeCodeCamp/freeCodeCamp",
    stars: "378k",
    language: "TypeScript",
    langColor: "#3178c6",
  },
  {
    name: "microsoft/vscode",
    description: 'Visual Studio Code - Open Source ("Code - OSS").',
    url: "https://github.com/microsoft/vscode",
    stars: "154k",
    language: "TypeScript",
    langColor: "#3178c6",
  },
  {
    name: "tensorflow/tensorflow",
    description: "An end-to-end open source platform for machine learning.",
    url: "https://github.com/tensorflow/tensorflow",
    stars: "179k",
    language: "C++",
    langColor: "#f34b7d",
  },
];

const latestChanges = [
  { id: 1, text: "Code search and code view are now generally available" },
  { id: 2, text: "Improvements to the merge queue experience" },
  { id: 3, text: "GitHub Actions: Secure deployment with OpenID Connect" },
  {
    id: 4,
    text: "GitHub Copilot now offers improved context-aware suggestions",
  },
  {
    id: 5,
    text: "Dependabot alerts now support private vulnerability reporting",
  },
];

const Dashboard = () => {
  const [userRepos, setUserRepos] = useState([]);
  const [filter, setFilter] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUserRepos = async () => {
      if (currentUser) {
        try {
          const response = await getUserRepos(currentUser._id);
          setUserRepos(response.data.repositories || []);
        } catch (error) {
          console.error("Failed to fetch user repositories:", error);
        }
      }
    };
    fetchUserRepos();
  }, [currentUser]);

  const filteredRepos = userRepos
    .filter((repo) => repo.name.toLowerCase().includes(filter.toLowerCase()))
    .slice(0, 7);

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <aside className="dashboard-sidebar left">
          <div className="sidebar-header">
            <h3>Recent Repositories</h3>
            <Link to="/new" className="new-repo-btn">
              <RepoIcon size={16} /> New
            </Link>
          </div>
          <div className="repo-filter-container">
            <input
              type="text"
              placeholder="Find a repository..."
              className="repo-filter-input"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          {filteredRepos.length > 0 ? (
            <ul className="repo-list">
              {filteredRepos.map((repo) => (
                <li key={repo._id}>
                  <Link to={`/${currentUser.username}/${repo.name}`}>
                    <RepoIcon size={16} />
                    <span>{`${currentUser.username}/${repo.name}`}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-repos-message">No matching repositories found.</p>
          )}
        </aside>

        <main className="dashboard-main">
          <h2 className="dashboard-title">Home</h2>
          <div className="feed-card">
            <div className="feed-header">
              <h3>Discover popular repositories</h3>
              <p>Explore projects that are popular on GitHub.</p>
            </div>
            {popularRepos.map((repo) => (
              <div className="repo-item" key={repo.name}>
                <BookIcon size={16} className="repo-item-icon" />
                <div className="repo-item-content">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="repo-link"
                  >
                    {repo.name}
                  </a>
                  <p className="repo-description">{repo.description}</p>
                  <div className="repo-meta">
                    <span className="meta-item">
                      <StarIcon size={16} />
                      <span>{repo.stars}</span>
                    </span>
                    <span className="meta-item">
                      <span
                        className="language-dot"
                        style={{ backgroundColor: repo.langColor }}
                      ></span>
                      <span>{repo.language}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        <aside className="dashboard-sidebar right">
          <div className="sidebar-card">
            <h3>
              <FlameIcon size={16} /> Trending
            </h3>
            <p>See what the GitHub community is most excited about today.</p>
            <a href="/explore" className="sidebar-link">
              View Trending
            </a>
          </div>
          <div className="sidebar-card">
            <h3>
              <BroadcastIcon size={16} /> Latest changes
            </h3>
            <ul className="changelog-list">
              {latestChanges.map((change) => (
                <li key={change.id} className="changelog-item">
                  <a href="#">{change.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
