const {
  CancelServiceRequest,
  CreateServiceRequest,
  GetServiceRequests,
  UpdateServiceRequest,
  GetServiceRequestByProffesional,
} = require("../Controllers/servicerequest");

const express = require("express");
const router = express.Router();

router.post("/create", CreateServiceRequest);
router.get("/", GetServiceRequests);
router.get("/professional/:userId", GetServiceRequestByProffesional);
router.put("/:id", UpdateServiceRequest);
router.delete("/:id", CancelServiceRequest);

module.exports = router;
