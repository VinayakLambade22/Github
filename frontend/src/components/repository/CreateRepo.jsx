import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { useAuth } from "../../authContext";
import { createRepo } from "../../services/api";
import "../../styles/repo.css";

const CreateRepo = () => {
  const [repoName, setRepoName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const repoData = {
        name: repoName,
        description,
        isPublic,
        ownerId: currentUser._id,
      };
      const response = await createRepo(repoData);
      navigate(`/${currentUser.username}/${response.data.name}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create repository.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="repo-form-container">
        <h1 className="repo-form-title">Create a new repository</h1>
        <p className="repo-form-subtitle">
          A repository contains all project files, including the revision
          history.
        </p>
        {error && <p className="auth-error">{error}</p>}
        <form onSubmit={handleSubmit} className="repo-form">
          <label htmlFor="repoName">Repository name</label>
          <input
            type="text"
            id="repoName"
            value={repoName}
            onChange={(e) => setRepoName(e.target.value)}
            required
          />
          <label htmlFor="description">Description (optional)</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="visibility-options">
            <label>
              <input
                type="radio"
                name="visibility"
                checked={isPublic}
                onChange={() => setIsPublic(true)}
              />{" "}
              Public
            </label>
            <label>
              <input
                type="radio"
                name="visibility"
                checked={!isPublic}
                onChange={() => setIsPublic(false)}
              />{" "}
              Private
            </label>
          </div>
          <button type="submit" className="repo-form-button">
            Create repository
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateRepo;
