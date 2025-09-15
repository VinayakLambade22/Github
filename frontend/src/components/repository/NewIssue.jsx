import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { createNewIssue, getRepoDetails } from "../../services/api";
import { useAuth } from "../../authContext";
import "../../styles/settings.css";

const NewIssue = () => {
  const { ownerName, repoName } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [repoId, setRepoId] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const response = await getRepoDetails(ownerName, repoName);
        setRepoId(response.data._id);
      } catch (err) {
        navigate(`/${ownerName}/${repoName}`);
      }
    };
    fetchRepo();
  }, [ownerName, repoName, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!repoId) return alert("Repository information is not available.");
    try {
      const issueData = {
        title,
        description,
        repoId,
        authorId: currentUser._id,
      };
      await createNewIssue(issueData);
      navigate(`/${ownerName}/${repoName}`);
    } catch (error) {
      console.error("Failed to create issue:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="settings-container">
        <h2>Create a new issue</h2>
        <form onSubmit={handleSubmit} className="settings-form">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="8"
          ></textarea>
          <button type="submit" className="btn-primary">
            Submit new issue
          </button>
        </form>
      </div>
    </>
  );
};
export default NewIssue;
