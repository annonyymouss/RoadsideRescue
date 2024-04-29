const express = require("express");
const {
  createUser,
  Login,
  GetProffesionalUsers,
  SaveSearchTerms,
  fetchSearchTems,
  UpdateUser,
} = require("../Controllers/User");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", Login);
router.post("/professional/:text", GetProffesionalUsers);
router.post("/save-search", SaveSearchTerms);
router.get("/getsearch", fetchSearchTems);
router.patch("/updateUser/:id", UpdateUser);

module.exports = router;
