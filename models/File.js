const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  title: String,
  description: String,
  subject: String,
  fileUrl: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("File", fileSchema);