import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { getRepoDetails } from "../../services/api";
import { CodeIcon, IssueOpenedIcon, GearIcon } from "@primer/octicons-react";
import IssuesTab from "./IssuesTab";
import "../../styles/repo.css";

const RepoPage = () => {
  const { ownerName, repoName } = useParams();
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("code");

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        setLoading(true);
        const response = await getRepoDetails(ownerName, repoName);
        setRepo(response.data);
      } catch (err) {
        console.error("Failed to fetch repo details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRepo();
  }, [ownerName, repoName]);

  const renderContent = () => {
    if (!repo) return null;
    switch (activeTab) {
      case "issues":
        return (
          <IssuesTab
            repoId={repo._id}
            ownerName={ownerName}
            repoName={repoName}
          />
        );
      case "code":
      default:
        return (
          <div className="setup-card">
            <h3>Quick setup — if you’ve done this kind of thing before</h3>
            <div className="clone-url-container">
              <input
                type="text"
                readOnly
                value={`github.com/${ownerName}/${repoName}.git`}
              />
            </div>
          </div>
        );
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!repo) return <div>Repository not found.</div>;

  return (
    <>
      <Navbar />
      <div className="repo-page-container">
        <div className="repo-header">
          <h2>
            {repo.owner.username} / {repo.name}
          </h2>
        </div>
        <div className="repo-tabs">
          <button
            onClick={() => setActiveTab("code")}
            className={`repo-tab ${activeTab === "code" ? "active" : ""}`}
          >
            <CodeIcon /> Code
          </button>
          <button
            onClick={() => setActiveTab("issues")}
            className={`repo-tab ${activeTab === "issues" ? "active" : ""}`}
          >
            <IssueOpenedIcon /> Issues
          </button>
          <Link to={`/${ownerName}/${repoName}/settings`} className="repo-tab">
            <GearIcon /> Settings
          </Link>
        </div>
        <div className="repo-content">{renderContent()}</div>
      </div>
    </>
  );
};

export default RepoPage;
