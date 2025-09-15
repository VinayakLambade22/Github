import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import {
  getRepoDetails,
  updateRepoDetails,
  deleteRepo,
} from "../../services/api";
import "../../styles/settings.css";

const RepoSettings = () => {
  const { ownerName, repoName } = useParams();
  const navigate = useNavigate();
  const [repo, setRepo] = useState(null);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const response = await getRepoDetails(ownerName, repoName);
        setRepo(response.data);
        setNewName(response.data.name);
      } catch (error) {
        console.error("Failed to fetch repo settings.", error);
      }
    };
    fetchRepo();
  }, [ownerName, repoName]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateRepoDetails(repo._id, { name: newName });
      navigate(`/${ownerName}/${newName}/settings`);
    } catch (error) {
      alert("Failed to update repository.");
    }
  };

  const handleDelete = async () => {
    if (
      window.prompt(
        `This action is irreversible. To confirm, type the repository name "${repo.name}"`
      ) === repo.name
    ) {
      try {
        await deleteRepo(repo._id);
        navigate("/");
      } catch (error) {
        alert("Failed to delete repository.");
      }
    } else {
      alert("Repository name did not match. Deletion cancelled.");
    }
  };

  if (!repo) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="settings-container">
        <h2>Repository Settings</h2>
        <form onSubmit={handleUpdate} className="settings-section">
          <h3>General</h3>
          <div className="form-content">
            <label htmlFor="repoName">Repository Name</label>
            <input
              type="text"
              id="repoName"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button type="submit" className="btn-primary">
              Update
            </button>
          </div>
        </form>

        <div className="settings-section danger-zone">
          <h3>Danger Zone</h3>
          <div className="danger-item">
            <div>
              <strong>Delete this repository</strong>
              <p>
                Once you delete a repository, there is no going back. Please be
                certain.
              </p>
            </div>
            <button onClick={handleDelete} className="btn-danger">
              Delete Repository
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default RepoSettings;
