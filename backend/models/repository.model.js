const mongoose = require("mongoose");

const repositorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    isPublic: { type: Boolean, default: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    issues: [{ type: mongoose.Schema.Types.ObjectId, ref: "Issue" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Repository", repositorySchema);
