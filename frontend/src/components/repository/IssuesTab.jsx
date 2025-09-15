import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getIssuesForRepo } from "../../services/api";
import { IssueOpenedIcon } from "@primer/octicons-react";
import "../../styles/repo.css";

const IssuesTab = ({ repoId, ownerName, repoName }) => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      if (!repoId) return;
      try {
        const response = await getIssuesForRepo(repoId);
        setIssues(response.data);
      } catch (error) {
        console.error("Failed to fetch issues:", error);
      }
    };
    fetchIssues();
  }, [repoId]);

  return (
    <div className="issues-container">
      <div className="issues-header">
        <Link
          to={`/${ownerName}/${repoName}/issues/new`}
          className="new-issue-btn"
        >
          New issue
        </Link>
      </div>
      <div className="issues-list-box">
        {issues.length > 0 ? (
          issues.map((issue) => (
            <div key={issue._id} className="issue-item">
              <IssueOpenedIcon className="issue-icon-open" />
              <div className="issue-details">
                <span className="issue-title">{issue.title}</span>
                <span className="issue-author">
                  opened by {issue.author.username}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="issue-item-empty">
            <p>No issues yet. Be the first to create one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssuesTab;
