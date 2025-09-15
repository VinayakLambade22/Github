const express = require("express");
const repoController = require("../controllers/repoController");
const { protect } = require("../middleware/auth.middleware");
const repoRouter = express.Router();

repoRouter.post("/repo/create", protect, repoController.createRepository);
repoRouter.get("/repo/all", repoController.getAllRepositories);
repoRouter.get("/repo/user/:userID", repoController.fetchRepositoriesForCurrentUser);
repoRouter.get("/repo/:ownerName/:repoName", repoController.fetchRepositoryByName);
repoRouter.put("/repo/update/:id", protect, repoController.updateRepositoryById);
repoRouter.delete("/repo/delete/:id", protect, repoController.deleteRepositoryById);
repoRouter.patch("/repo/toggle/:id", protect, repoController.toggleVisibilityById);

module.exports = repoRouter;