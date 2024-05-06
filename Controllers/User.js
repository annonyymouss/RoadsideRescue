const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const searchmodel = require("../models/searchmodel");
const ServiceModel = require("../models/servicesmodel");
const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({
      status: 201,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: 400,
      message: "Error while creating user",
      error: error.message,
    });
  }
};

const Login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: 400,
        message: "Invalid credentials",
      });
    }
    const { password, ...restUser } = user;
    const token = await jwt.sign(restUser, "123213123213", {
      expiresIn: "24h",
    });
    res.status(200).json({
      status: 200,
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while logging in",
      error: error.message,
    });
  }
};

const UpdateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    res.status(200).json({
      status: 200,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while updating user",
      error: error.message,
    });
  }
};

const GetProffesionalUsers = async (req, res) => {
  try {
    console.log(req.params.text.replace("/%20/g", " "));
    const services = await ServiceModel.find({
      name: { $regex: new RegExp(req.params.text.replace("/%20/g", " "), "i") },
    });
    // 2. Extract service IDs from the found services
    const serviceIds = services.map((service) => service._id.toString());
    // 3. Find User documents with services matching the extracted IDs within a 5 km radius
    const users = await User.aggregate([
      {
        $match: {
          services: { $in: serviceIds },
          role: "professional",
          $and: [
            {
              $or: [
                { "location.latitude": { $exists: false } }, // Check if latitude field does not exist
                {
                  "location.latitude": {
                    $gte: req.body.latitude - 0.09,
                    $lte: req.body.latitude + 0.09,
                  },
                },
              ],
            },
            {
              $or: [
                { "location.longitude": { $exists: false } }, // Check if longitude field does not exist
                {
                  "location.longitude": {
                    $gte: req.body.longitude - 0.09,
                    $lte: req.body.longitude + 0.09,
                  },
                },
              ],
            },
          ],
        },
      },
    ]);


    res.status(200).json({
      status: 200,
      message: "Professional users fetched successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while fetching professional users",
      error: error.message,
    });
  }
};
const SaveSearchTerms = async (req, res) => {
  try {
    const response = new searchmodel(req.body);
    await response.save();

    res.status(200).json({
      status: 200,
      message: "Search Term saved successfully",
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Error while saving search terms",
      error: error.message,
    });
  }
};

const fetchSearchTems = async (req, res) => {
  try {
    const searchterms = await searchmodel.find({}).limit(10);

    res.status(200).json({
      status: 200,
      message: "Search terms fetched successfully",
      data: searchterms,
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: "Error in fetching search terms",
    });
  }
};
module.exports = {
  createUser,
  Login,
  GetProffesionalUsers,
  SaveSearchTerms,
  fetchSearchTems,
  UpdateUser,
};
