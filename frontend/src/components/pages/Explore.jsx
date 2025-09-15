import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { getAllRepos } from "../../services/api";
import { Link } from "react-router-dom";
import "../../styles/dashboard.css";

const Explore = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await getAllRepos();
        setRepos(response.data);
      } catch (error) {
        console.error("Failed to fetch all repositories", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  return (
    <>
      <Navbar />
      <div className="explore-container">
        <h1>Explore Public Repositories</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="repo-list-container">
            {repos.map((repo) => (
              <div className="repo-card" key={repo._id}>
                <h3>
                  <Link to={`/${repo.owner.username}/${repo.name}`}>
                    {repo.owner.username} / {repo.name}
                  </Link>
                </h3>
                <p>{repo.description || "No description provided."}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Explore;
