const express = require("express");
const router = express.Router();
const {
  getUser,
  postUser,
  loginUser,
  updateInfo,
} = require("../controllers/userControllers");
const authMiddleware = require("../middleware/autMiddleware");
router.get("/user/:id", authMiddleware, getUser);
router.post("/user", postUser);
router.put("/user/:id", authMiddleware, updateInfo);
router.post("/login", loginUser);
module.exports = router;
