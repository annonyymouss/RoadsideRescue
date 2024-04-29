const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "professional"],
      default: "user",
    },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
    availability: {
      type: String,
    },
    location: [
      {
        latitude: {
          type: String,
        },
        longitude: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

module.exports = mongoose.model("User", UserSchema);
