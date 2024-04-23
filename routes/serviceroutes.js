const express = require("express");

const router = express.Router();

const { createService, getServices } = require("../Controllers/service");

router.post("/create-service", createService);
router.get("/get-services", getServices);

module.exports = router;
