const mongoose = require("mongoose");

const SearchSchema = new mongoose.Schema(
  {
    searchTerm: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("searchTerms", SearchSchema);
