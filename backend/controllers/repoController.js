const Repository = require("../models/repository.model");
const User = require("../models/user.model");

exports.createRepository = async (req, res) => {
  const { name, description, isPublic, ownerId } = req.body;
  try {
    const owner = await User.findById(ownerId);
    if (!owner) return res.status(404).json({ message: "Owner not found" });
    const repository = await Repository.create({
      name,
      description,
      isPublic,
      owner: ownerId,
    });
    owner.repositories.push(repository._id);
    await owner.save();
    res.status(201).json(repository);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

exports.getAllRepositories = async (req, res) => {
  try {
    const repos = await Repository.find({ isPublic: true })
      .populate("owner", "username")
      .sort({ createdAt: -1 });
    res.json(repos);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

exports.fetchRepositoriesForCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userID).populate(
      "repositories"
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ repositories: user.repositories });
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

exports.fetchRepositoryByName = async (req, res) => {
  try {
    const owner = await User.findOne({ username: req.params.ownerName });
    if (!owner) return res.status(404).json({ message: "Owner not found" });
    const repo = await Repository.findOne({
      name: req.params.repoName,
      owner: owner._id,
    }).populate("owner", "username");
    if (!repo) return res.status(404).json({ message: "Repository not found" });
    res.json(repo);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

exports.updateRepositoryById = async (req, res) => {
  try {
    const { name, description } = req.body;
    const repo = await Repository.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!repo) return res.status(404).json({ message: "Repository not found" });
    res.json(repo);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

exports.deleteRepositoryById = async (req, res) => {
  try {
    const repo = await Repository.findById(req.params.id);
    if (!repo) return res.status(404).json({ message: "Repository not found" });
    await User.findByIdAndUpdate(repo.owner, {
      $pull: { repositories: repo._id },
    });
    await Repository.deleteOne({ _id: req.params.id });
    res.json({ message: "Repository successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

exports.toggleVisibilityById = async (req, res) => {
  try {
    const repo = await Repository.findById(req.params.id);
    if (!repo) return res.status(404).json({ message: "Repository not found" });
    repo.isPublic = !repo.isPublic;
    await repo.save();
    res.json(repo);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

exports.fetchRepositoryById = async (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};
