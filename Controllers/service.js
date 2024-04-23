const ServiceModel = require("../models/servicesmodel");

const createService = async (req, res) => {
  try {
    const service = new ServiceModel(req.body);
    await service.save();
    res
      .status(201)
      .send({ status: 200, message: "Services Created SuccessFully", service });
  } catch (error) {
    res.status(400).status({
      status: 400,
      message: "Error while creating services",
      error,
    });
  }
};

const getServices = async (req, res) => {
  try {
    const services = await ServiceModel.find({});
    res
      .status(200)
      .send({ status: 200, message: "Services Fetched", services });
  } catch (error) {
    res
      .status(400)
      .send({ status: 400, message: "Error while fetching services", error });
  }
};

module.exports = {
  createService,
  getServices,
};
