const express = require("express");
const problemController = require("../controllers/problem.controller");
const { protect } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const {
  validateProblemId,
  validateCreateProblem,
  validateUpdateProblem,
  validateProblemQuery
} = require("../utils/validators");

const router = express.Router();

router.use(protect);

router
  .route("/")
  .get(validate(validateProblemQuery), problemController.getProblems)
  .post(validate(validateCreateProblem), problemController.createProblem)
  .delete(problemController.deleteProblems);

router.patch(
  "/:id/revision",
  validate(validateProblemId),
  problemController.addRevision
);

router
  .route("/:id")
  .get(validate(validateProblemId), problemController.getProblem)
  .patch(validate(validateUpdateProblem), problemController.updateProblem)
  .delete(validate(validateProblemId), problemController.deleteProblem);

module.exports = router;
