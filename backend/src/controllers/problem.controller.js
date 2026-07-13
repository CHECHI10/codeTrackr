const Problem = require("../models/prob.model");
const ApiError = require("../utils/apiError");
const asyncHandler = require("../utils/asyncHandler");

const buildProblemFilter = (userId, query) => {
  const filter = { user: userId };

  if (query.status) filter.status = query.status;
  if (query.difficulty) filter.difficulty = query.difficulty;
  if (query.platform) filter.platform = new RegExp(`^${escapeRegex(query.platform)}$`, "i");
  if (query.topic) filter.topic = new RegExp(query.topic, "i");

  if (query.search) {
    const searchRegex = new RegExp(escapeRegex(query.search), "i");
    filter.$or = [
      { title: searchRegex },
      { platform: searchRegex },
      { topic: searchRegex },
      { notes: searchRegex }
    ];
  }

  return filter;
};

const escapeRegex = (value) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const getProblems = asyncHandler(async (req, res) => {
  const query = req.validated.query;
  const filter = buildProblemFilter(req.user._id, query);
  const skip = (query.page - 1) * query.limit;
  const sortDirection = query.sortOrder === "asc" ? 1 : -1;
  const sort = { [query.sortBy]: sortDirection, _id: -1 };

  const [problems, total] = await Promise.all([
    Problem.find(filter).sort(sort).skip(skip).limit(query.limit),
    Problem.countDocuments(filter)
  ]);

  res.status(200).json({
    success: true,
    data: problems,
    pagination: {
      page: query.page,
      limit: query.limit,
      total,
      totalPages: Math.max(Math.ceil(total / query.limit), 1)
    }
  });
});

const getProblem = asyncHandler(async (req, res) => {
  const problem = await Problem.findOne({
    _id: req.validated.params.id,
    user: req.user._id
  });

  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  res.status(200).json({
    success: true,
    data: problem
  });
});

const createProblem = asyncHandler(async (req, res) => {
  const payload = {
    ...req.validated.body,
    user: req.user._id
  };

  if (payload.status === "solved") {
    const solvedDate = new Date();
    payload.revisionCount = 1;
    payload.lastSolved = solvedDate;
    payload.lastUpdate = solvedDate;
    payload.solvedDates = [solvedDate];
  }

  const problem = await Problem.create(payload);

  res.status(201).json({
    success: true,
    message: "Problem created successfully",
    data: problem
  });
});

const updateProblem = asyncHandler(async (req, res) => {
  const existingProblem = await Problem.findOne({
    _id: req.validated.params.id,
    user: req.user._id
  });

  if (!existingProblem) {
    throw new ApiError(404, "Problem not found");
  }

  const setData = {
    ...req.validated.body
  };
  const updateOperation = {
    $set: setData
  };

  if (
    setData.status &&
    setData.status !== existingProblem.status
  ) {
    const now = new Date();
    updateOperation.$set.lastUpdate = now;

    if (setData.status === "solved") {
      updateOperation.$set.lastSolved = now;
      updateOperation.$inc = { revisionCount: 1 };
      updateOperation.$push = { solvedDates: now };
    }
  }

  const updatedProblem = await Problem.findOneAndUpdate(
    { _id: existingProblem._id, user: req.user._id },
    updateOperation,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: "Problem updated successfully",
    data: updatedProblem
  });
});

const deleteProblem = asyncHandler(async (req, res) => {
  const deletedProblem = await Problem.findOneAndDelete({
    _id: req.validated.params.id,
    user: req.user._id
  });

  if (!deletedProblem) {
    throw new ApiError(404, "Problem not found");
  }

  res.status(200).json({
    success: true,
    message: "Problem deleted successfully"
  });
});

const deleteProblems = asyncHandler(async (req, res) => {
  const result = await Problem.deleteMany({ user: req.user._id });

  res.status(200).json({
    success: true,
    message: "All problems deleted successfully",
    deletedCount: result.deletedCount
  });
});

const addRevision = asyncHandler(async (req, res) => {
  const existingProblem = await Problem.findOne({
    _id: req.validated.params.id,
    user: req.user._id
  });

  if (!existingProblem) {
    throw new ApiError(404, "Problem not found");
  }

  const now = new Date();
  const updatedProblem = await Problem.findOneAndUpdate(
    { _id: existingProblem._id, user: req.user._id },
    {
      $set: {
        status: "solved",
        lastSolved: now,
        lastUpdate: now
      },
      $inc: { revisionCount: 1 },
      $push: { solvedDates: now }
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: "Revision recorded successfully",
    data: updatedProblem
  });
});

module.exports = {
  getProblems,
  getProblem,
  createProblem,
  updateProblem,
  deleteProblem,
  deleteProblems,
  addRevision
};
