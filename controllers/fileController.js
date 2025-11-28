const File = require("../models/File");

exports.uploadFile = async (req, res) => {
  try {
    const { title, description, subject } = req.body;

    const file = await File.create({
      title,
      description,
      subject,
      fileUrl: req.file.path,
      createdBy: req.user.id
    });

    res.json(file);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getFiles = async (req, res) => {
  const files = await File.find();
  res.json(files);
};

exports.getFile = async (req, res) => {
  const file = await File.findById(req.params.id);
  res.json(file);
};

const processDocument = require("../config/gemini");

exports.getSummary = async (req, res) => {
  const file = await File.findById(req.params.id);
  const summary = await processDocument(file.fileUrl, "summary");
  res.json({ summary });
};

exports.getQuiz = async (req, res) => {
  const file = await File.findById(req.params.id);
  const quiz = await processDocument(file.fileUrl, "quiz");
  res.json({ quiz });
};