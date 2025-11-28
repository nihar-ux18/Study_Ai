const router = require("express").Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  uploadFile,
  getFiles,
  getFile,
  getSummary,
  getQuiz
} = require("../controllers/fileController");

router.get("/", getFiles);
router.get("/:id", getFile);
router.get("/:id/summary", getSummary);
router.get("/:id/quiz", getQuiz);

router.post("/", auth(["teacher"]), upload.single("file"), uploadFile);

module.exports = router;