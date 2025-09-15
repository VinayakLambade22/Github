const express = require("express");
const issueController = require("../controllers/issueController");
const { protect } = require("../middleware/auth.middleware");
const issueRouter = express.Router();

issueRouter.post("/issue/create", protect, issueController.createIssue);
issueRouter.get("/issue/repo/:repoId", issueController.getAllIssuesForRepo);

module.exports = issueRouter

// issueRouter.post("/issue/create", issueController.createIssue);

// issueRouter.put("/issue/update/:id", issueController.updateIssueById);

// issueRouter.delete("/issue/delete/:id", issueController.deleteIssueById);

// issueRouter.get("/issue/all", issueController.getAllIssues);

// issueRouter.get("/issue/:id", issueController.getIssueById);
