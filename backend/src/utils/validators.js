const mongoose = require("mongoose");

const STATUSES = ["solved", "attempted", "unsolved"];
const DIFFICULTIES = ["easy", "medium", "hard"];
const SORT_FIELDS = [
  "createdAt",
  "updatedAt",
  "lastUpdate",
  "lastSolved",
  "title",
  "platform",
  "difficulty",
  "status",
  "revisionCount"
];

const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;

const normalizeText = (value) => {
  if (typeof value !== "string") return value;
  return value.trim();
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidUrl = (value) => {
  if (!value) return true;

  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol);
  } catch (error) {
    return false;
  }
};

const validateRegister = (req) => {
  const errors = [];
  const username = normalizeText(req.body.username);
  const email = normalizeText(req.body.email)?.toLowerCase();
  const password = req.body.password;

  if (!isNonEmptyString(username) || username.length < 3) {
    errors.push("Username must be at least 3 characters long");
  }

  if (!isNonEmptyString(email) || !isValidEmail(email)) {
    errors.push("A valid email is required");
  }

  if (!isNonEmptyString(password) || password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  return {
    errors,
    value: {
      body: { username, email, password }
    }
  };
};

const validateLogin = (req) => {
  const errors = [];
  const identifier = normalizeText(req.body.identifier || req.body.email);
  const password = req.body.password;

  if (!isNonEmptyString(identifier)) {
    errors.push("Email or username is required");
  } else if (identifier.includes("@") && !isValidEmail(identifier)) {
    errors.push("A valid email is required");
  } else if (!identifier.includes("@") && identifier.length < 3) {
    errors.push("Username must be at least 3 characters long");
  }

  if (!isNonEmptyString(password)) {
    errors.push("Password is required");
  }

  return {
    errors,
    value: {
      body: { identifier, password }
    }
  };
};

const validateProblemId = (req) => {
  const errors = [];
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    errors.push("Invalid problem id");
  }

  return {
    errors,
    value: {
      params: { id }
    }
  };
};

const getProblemPayload = (body, isUpdate = false) => {
  const errors = [];
  const payload = {};
  const allowedFields = [
    "title",
    "platform",
    "difficulty",
    "status",
    "topic",
    "notes",
    "timeComplexity",
    "spaceComplexity",
    "link"
  ];

  allowedFields.forEach((field) => {
    if (body[field] !== undefined) {
      payload[field] = typeof body[field] === "string" ? body[field].trim() : body[field];
    }
  });

  if (!isUpdate || payload.title !== undefined) {
    if (!isNonEmptyString(payload.title)) {
      errors.push("Title is required");
    }
  }

  if (!isUpdate || payload.difficulty !== undefined) {
    if (!DIFFICULTIES.includes(payload.difficulty)) {
      errors.push("Difficulty must be easy, medium, or hard");
    }
  }

  if (!isUpdate || payload.status !== undefined) {
    if (!STATUSES.includes(payload.status)) {
      errors.push("Status must be solved, attempted, or unsolved");
    }
  }

  if (payload.link && !isValidUrl(payload.link)) {
    errors.push("Problem link must be a valid http or https URL");
  }

  return { errors, payload };
};

const validateCreateProblem = (req) => {
  const { errors, payload } = getProblemPayload(req.body);

  return {
    errors,
    value: {
      body: payload
    }
  };
};

const validateUpdateProblem = (req) => {
  const idValidation = validateProblemId(req);
  const { errors, payload } = getProblemPayload(req.body, true);

  if (Object.keys(payload).length === 0) {
    errors.push("At least one valid problem field is required");
  }

  return {
    errors: [...idValidation.errors, ...errors],
    value: {
      params: idValidation.value.params,
      body: payload
    }
  };
};

const validateProblemQuery = (req) => {
  const errors = [];
  const query = {};
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);
  const status = req.query.status;
  const difficulty = req.query.difficulty;
  const sortBy = req.query.sortBy || "updatedAt";
  const sortOrder = req.query.sortOrder === "asc" ? "asc" : "desc";

  if (!Number.isInteger(page) || page < 1) {
    errors.push("Page must be a positive integer");
  }

  if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
    errors.push("Limit must be between 1 and 100");
  }

  if (status && !STATUSES.includes(status)) {
    errors.push("Invalid status filter");
  }

  if (difficulty && !DIFFICULTIES.includes(difficulty)) {
    errors.push("Invalid difficulty filter");
  }

  if (!SORT_FIELDS.includes(sortBy)) {
    errors.push("Invalid sort field");
  }

  query.page = page;
  query.limit = limit;
  query.sortBy = sortBy;
  query.sortOrder = sortOrder;
  query.status = status || "";
  query.difficulty = difficulty || "";
  query.platform = normalizeText(req.query.platform || "");
  query.topic = normalizeText(req.query.topic || "");
  query.search = normalizeText(req.query.search || "");

  return {
    errors,
    value: {
      query
    }
  };
};

module.exports = {
  STATUSES,
  DIFFICULTIES,
  validateRegister,
  validateLogin,
  validateProblemId,
  validateCreateProblem,
  validateUpdateProblem,
  validateProblemQuery
};
