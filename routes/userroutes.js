const express = require("express");
const {
  createUser,
  Login,
  GetProffesionalUsers,
  SaveSearchTerms,
  fetchSearchTems,
} = require("../Controllers/User");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", Login);
router.get("/professional/:text", GetProffesionalUsers);
router.post("/save-search", SaveSearchTerms);
router.get("/getsearch", fetchSearchTems);

module.exports = router;
