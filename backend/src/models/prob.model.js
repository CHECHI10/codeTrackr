const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [160, "Title cannot exceed 160 characters"]
    },
    platform: {
      type: String,
      default: "LeetCode",
      trim: true,
      maxlength: [60, "Platform cannot exceed 60 characters"]
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: [true, "Difficulty is required"]
    },
    status: {
      type: String,
      enum: ["solved", "attempted", "unsolved"],
      required: [true, "Status is required"],
      default: "unsolved"
    },
    topic: {
      type: String,
      default: "",
      trim: true,
      maxlength: [80, "Topic cannot exceed 80 characters"]
    },
    notes: {
      type: String,
      default: "",
      trim: true,
      maxlength: [4000, "Notes cannot exceed 4000 characters"]
    },
    timeComplexity: {
      type: String,
      default: "",
      trim: true,
      maxlength: [80, "Time complexity cannot exceed 80 characters"]
    },
    spaceComplexity: {
      type: String,
      default: "",
      trim: true,
      maxlength: [80, "Space complexity cannot exceed 80 characters"]
    },
    revisionCount: {
      type: Number,
      default: 0,
      min: [0, "Revision count cannot be negative"]
    },
    lastSolved: {
      type: Date,
      default: null
    },
    solvedDates: {
      type: [Date],
      default: []
    },
    link: {
      type: String,
      default: "",
      trim: true
    },
    lastUpdate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

problemSchema.index({ user: 1, status: 1 });
problemSchema.index({ user: 1, difficulty: 1 });
problemSchema.index({ user: 1, platform: 1 });
problemSchema.index({ user: 1, topic: 1 });
problemSchema.index({ user: 1, updatedAt: -1 });
problemSchema.index({ user: 1, title: "text", platform: "text", topic: "text", notes: "text" });

const ProbModel = mongoose.model("Problem", problemSchema);

module.exports = ProbModel;
