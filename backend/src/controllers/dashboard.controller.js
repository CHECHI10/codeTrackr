const Problem = require("../models/prob.model");
const asyncHandler = require("../utils/asyncHandler");

const toDayKey = (date) => {
  const value = new Date(date);
  return Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate());
};

const calculateStreaks = (dates) => {
  if (dates.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0
    };
  }

  const dayKeys = [...new Set(dates.map(toDayKey))].sort((a, b) => a - b);
  let longestStreak = 1;
  let runningStreak = 1;

  for (let index = 1; index < dayKeys.length; index += 1) {
    const previous = dayKeys[index - 1];
    const current = dayKeys[index];
    const dayDifference = (current - previous) / (24 * 60 * 60 * 1000);

    if (dayDifference === 1) {
      runningStreak += 1;
    } else {
      runningStreak = 1;
    }

    longestStreak = Math.max(longestStreak, runningStreak);
  }

  const today = toDayKey(new Date());
  const latestDay = dayKeys[dayKeys.length - 1];
  const latestDayDifference = (today - latestDay) / (24 * 60 * 60 * 1000);

  let currentStreak = 0;

  if (latestDayDifference <= 1) {
    currentStreak = 1;

    for (let index = dayKeys.length - 1; index > 0; index -= 1) {
      const dayDifference = (dayKeys[index] - dayKeys[index - 1]) / (24 * 60 * 60 * 1000);

      if (dayDifference !== 1) {
        break;
      }

      currentStreak += 1;
    }
  }

  return {
    currentStreak,
    longestStreak
  };
};

const getDashboardStats = asyncHandler(async (req, res) => {
  const userFilter = { user: req.user._id };

  const [
    total,
    solved,
    attempted,
    unsolved,
    difficultyDistribution,
    platformDistribution,
    recentActivity,
    revisionStats,
    solvedProblems
  ] = await Promise.all([
    Problem.countDocuments(userFilter),
    Problem.countDocuments({ ...userFilter, status: "solved" }),
    Problem.countDocuments({ ...userFilter, status: "attempted" }),
    Problem.countDocuments({ ...userFilter, status: "unsolved" }),
    Problem.aggregate([
      { $match: userFilter },
      {
        $group: {
          _id: "$difficulty",
          total: { $sum: 1 },
          solved: {
            $sum: {
              $cond: [{ $eq: ["$status", "solved"] }, 1, 0]
            }
          }
        }
      }
    ]),
    Problem.aggregate([
      { $match: userFilter },
      { $group: { _id: "$platform", total: { $sum: 1 } } },
      { $sort: { total: -1, _id: 1 } }
    ]),
    Problem.find(userFilter)
      .sort({ updatedAt: -1 })
      .limit(5)
      .select("title platform status difficulty revisionCount lastSolved updatedAt"),
    Problem.aggregate([
      { $match: userFilter },
      {
        $group: {
          _id: null,
          total: { $sum: "$revisionCount" }
        }
      }
    ]),
    Problem.find({ ...userFilter, solvedDates: { $exists: true, $ne: [] } }).select("solvedDates")
  ]);

  const difficulty = {
    easy: { total: 0, solved: 0 },
    medium: { total: 0, solved: 0 },
    hard: { total: 0, solved: 0 }
  };

  difficultyDistribution.forEach((item) => {
    if (difficulty[item._id]) {
      difficulty[item._id] = {
        total: item.total,
        solved: item.solved
      };
    }
  });

  const solvedDates = solvedProblems.flatMap((problem) => problem.solvedDates || []);
  const streaks = calculateStreaks(solvedDates);

  res.status(200).json({
    success: true,
    data: {
      total,
      solved,
      attempted,
      unsolved,
      revisionCount: revisionStats[0]?.total || 0,
      currentStreak: streaks.currentStreak,
      longestStreak: streaks.longestStreak,
      difficulty,
      platformDistribution: platformDistribution.map((item) => ({
        platform: item._id || "Unknown",
        total: item.total
      })),
      recentActivity
    }
  });
});

module.exports = {
  getDashboardStats
};
