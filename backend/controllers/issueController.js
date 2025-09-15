const Issue = require("../models/issue.model");
const Repository = require("../models/repository.model");

exports.createIssue = async (req, res) => {
  const { title, description, authorId, repoId } = req.body;
  try {
    const repository = await Repository.findById(repoId);
    if (!repository)
      return res.status(404).json({ message: "Repository not found" });
    const issue = await Issue.create({
      title,
      description,
      author: authorId,
      repository: repoId,
    });
    repository.issues.push(issue._id);
    await repository.save();
    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

exports.getAllIssuesForRepo = async (req, res) => {
  try {
    const issues = await Issue.find({ repository: req.params.repoId }).populate(
      "author",
      "username"
    );
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

exports.getIssueById = async (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};
exports.updateIssueById = async (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};
exports.deleteIssueById = async (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};
