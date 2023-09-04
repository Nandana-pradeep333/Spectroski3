const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", function () {
  console.log("Mongoose Connected");
});

mongoose.connection.on("error", function (err) {
  console.log("Mongoose default connection error: " + err);
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose default connection disconnected");
});

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

const Users = mongoose.model("users", {
  name: String,
  email: String,
  phone: String,
  branch: String,
  batch: String,
  id: String,
  name1: String,
  email1: String,
  phone1: String,
  branch1: String,
  batch1: String,
  id1: String,
  pass: String,
});

const Quizzes = mongoose.model("quizzes", {
  name: String,
  start: Number,
  end: Number,
  users: [String],
});

const Questions = mongoose.model("questions", {
  name: String,
  question: String,
  a: String,
  b: String,
  c: String,
  d: String,
  answer: String,
  points: Number,
});

const Answers = mongoose.model("answers", {
  name: String,
  question: String,
  id: String,
  users: [String],
});

const LeaderBoard = mongoose.model("Leader_Board", {
  name: String,
  email: String,
  name1: String,
  phone: String,
  points: Number,
});

module.exports = { Users, Quizzes, Questions, Answers, LeaderBoard };
