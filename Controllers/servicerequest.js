const ServiceRequest = require("../models/servicerequest");
const SendEmailFunction = require("../utils/emailservice");
const User = require("../models/usermodel");
const CreateServiceRequest = async (req, res) => {
  try {
    const { bookingSlot } = req.body;
    const user = await User.findById(req.body.userId);
    const proffesional = await User.findById(req.body.proffesionalId);
    const existingRequest = await ServiceRequest.findOne({ bookingSlot });
    if (existingRequest) {
      return res.status(400).json({
        status: 400,
        message: "Booking slot is already taken",
      });
    }
    const serviceRequest = new ServiceRequest(req.body);
    await serviceRequest.save();

    res.status(201).json({
      status: 201,
      message: "Service request created successfully",
      serviceRequest,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while creating service request",
      error: error.message,
    });
  }
};

const GetServiceRequests = async (req, res) => {
  try {
    const serviceRequests = await ServiceRequest.find({
      userId: req.params.userId,
    });
    res.status(200).json({
      message: "Service requests fetched successfully",
      serviceRequests,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while fetching service requests",
      error: error.message,
    });
  }
};
const GetServiceRequestByProffesional = async (req, res) => {
  try {
    const serviceRequests = await ServiceRequest.find({
      proffesionalId: req.params.userId,
    });
    res.status(200).json({
      message: "Service requests fetched successfully",
      serviceRequests,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while fetching service requests",
      error: error.message,
    });
  }
};

const CancelServiceRequest = async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findById(req.params.id);
    if (!serviceRequest) {
      return res.status(404).json({
        message: "Service request not found",
      });
    }
    serviceRequest.status = "cancelled";
    await serviceRequest.save();
    res.status(200).json({
      message: "Service request cancelled successfully",
      serviceRequest,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while cancelling service request",
      error: error.message,
    });
  }
};

const UpdateServiceRequest = async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findById(req.params.id);
    if (!serviceRequest) {
      return res.status(404).json({
        message: "Service request not found",
      });
    }
    serviceRequest.status = req.body.status;
    await serviceRequest.save();
    res.status(200).json({
      status: 200,
      message: "Service request updated successfully",
      serviceRequest,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "Error while updating service request",
      error: error.message,
    });
  }
};
module.exports = {
  CreateServiceRequest,
  GetServiceRequests,
  GetServiceRequestByProffesional,
  CancelServiceRequest,
  UpdateServiceRequest,
};
