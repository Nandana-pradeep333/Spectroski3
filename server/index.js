const express = require("express");
const bcrypt = require("bcryptjs");
const path = require("path");
const {
  Users,
  Quizzes,
  Questions,
  Answers,
  LeaderBoard,
} = require("./mongoose");
require("dotenv").config();

const app = express();

app.use(express.json({ limit: "50mb" }));

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("/admin", async (req, res) => {
  res.sendFile(path.join(__dirname, "./admin.html"));
});

const auth = async (req, res, next) => {
  const result = await Users.findOne({ email: req.body.email });
  if (result && req.body.pass == result.pass) {
    next();
  } else {
    res.send({
      status: "false",
      msg: "Not Authorized. Please close this tab and login again",
    });
  }
};

app.post("/api/login", async (req, res) => {
  try {
    const result = await Users.find({ email: req.body.email });
    if (result.length != 0) {
      const isMatch = await bcrypt.compare(req.body.pass, result[0].pass);
      if (req.body.pass == process.env.USERPASSWORD) {
        res.send({ status: "true", ...result[0].toObject() });
      } else {
        res.send({ status: "false", msg: "Invalid Credentials" });
      }
    } else {
      res.send({ status: "false", msg: "No user exists with given email" });
    }
  } catch (e) {
    res.status(404).send({ status: "false" });
  }
});

app.post("/api/register", async (req, res) => {
  try {
    let user = await Users.find({ event: req.body.email });
    if (user.length == 0) {
      const newPass = await bcrypt.hash(req.body.pass, 10);

      user = new Users({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        branch: req.body.branch,
        batch: req.body.batch,
        id: req.body.id,
        name1: req.body.name1,
        email1: req.body.email1,
        phone1: req.body.phone1,
        branch1: req.body.branch1,
        batch1: req.body.batch1,
        id1: req.body.id1,
        pass: newPass,
      });

      await user.save();

      res.send({ status: "true", ...user.toObject() });
    } else {
      res.send({
        status: "false",
        msg: "This email has already been registered",
      });
    }
  } catch {
    res.status(500).send({ status: "false" });
  }
});

app.post("/api/change", auth, async (req, res) => {
  try {
    const newPass = await bcrypt.hash(req.body.new_pass, 10);

    await Users.findOneAndUpdate(
      { email: req.body.email },
      {
        $set: {
          pass: newPass,
        },
      }
    );

    res.send({ status: "true", pass: newPass });
  } catch (e) {
    res.status(500).send({ status: "false" });
  }
});

app.get("/api/leaders", async (req, res) => {
  try {
    let leaders = await LeaderBoard.find({}).sort({ points: -1 });
    leaders = leaders.filter((l, i) => i < 10);
    res.send({ status: "true", leaders: leaders });
  } catch (e) {
    res.status(500).send({ status: "false" });
  }
});

app.post("/api/quiz", auth, async (req, res) => {
  try {
    let time = new Date().getTime();
    let quiz = await Quizzes.findOne({
      start: { $lte: time },
      end: { $gte: time },
    });
    if (quiz && quiz.users.indexOf(req.body.email) == -1) {
      await Quizzes.updateOne(
        { name: quiz.name },
        {
          $push: {
            users: req.body.email,
          },
        }
      );
      res.send({
        status: "true",
        _id: quiz._id,
        name: quiz.name,
        start: quiz.start,
        end: quiz.end,
      });
    } else {
      res.send({ status: "false" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ status: "false" });
  }
});

app.post("/api/questions", auth, async (req, res) => {
  try {
    let questions = await Questions.find({ name: req.body.name }).select(
      "name question a b c d"
    );

    questions = questions
      .map((q) => ({ q: q.toObject(), i: Math.random }))
      .sort((a, b) => a.i - b.i)
      .map((q) => q.q);

    res.send({ status: "true", data: questions });
  } catch (e) {
    res.status(500).send({ status: "false" });
  }
});

app.post("/api/answer", auth, async (req, res) => {
  try {
    let answer = await Questions.findOne({
      _id: req.body.question,
      answer: req.body.answer,
    });

    if (answer) {
      let leaderBoard = await LeaderBoard.findOne({ email: req.body.email });

      if (leaderBoard) {
        await LeaderBoard.updateOne(
          { email: req.body.email },
          {
            $inc: {
              points: answer.points,
            },
          }
        );
      } else {
        let user = await Users.findOne({ email: req.body.email });

        let leader = new LeaderBoard({
          name: user.name,
          email: req.body.email,
          name1: user.name1,
          points: answer.points,
        });

        await leader.save();
      }

      await Answers.updateOne(
        {
          id: req.body.question,
        },
        {
          $push: {
            users: req.body.email,
          },
        }
      );

      res.send({ status: "true" });
    } else {
      res.send({ status: "false" });
    }
  } catch (e) {
    res.status(500).send({ status: "false" });
  }
});

// admin

const adminAuth = async (req, res, next) => {
  if (req.body.password == process.env.ADMINPASSWORD) {
    next();
  } else {
    res.status(403).send({ status: "false" });
  }
};

app.post("/admin/check-password", async (req, res) => {
  if (req.body.password == process.env.ADMINPASSWORD) {
    let result = await Quizzes.find();
    result = result.map((e) => e.toObject());

    res.send({ status: "true", result: result });
  } else {
    res.status(404).send({ status: "false" });
  }
});

app.post("/admin/add-quiz", adminAuth, async (req, res) => {
  let quiz = new Quizzes({
    name: req.body.name,
    start: req.body.start,
    end: req.body.end,
    users: [],
  });

  await quiz.save();

  let result = await Quizzes.find();
  result = result.map((e) => e.toObject());

  res.send({ status: true, result: result });
});

app.post("/admin/delete-quiz", adminAuth, async (req, res) => {
  await Quizzes.remove({ name: req.body.name });

  let result = await Quizzes.find();
  result = result.map((e) => e.toObject());

  res.send({ status: true, result: result });
});

app.post("/admin/add-question", adminAuth, async (req, res) => {
  let question = new Questions({
    name: req.body.name,
    question: req.body.question,
    a: req.body.a,
    b: req.body.b,
    c: req.body.c,
    d: req.body.d,
    answer: req.body.answer,
    points: req.body.points,
  });

  await question.save();

  let answers = new Answers({
    name: req.body.name,
    question: req.body.question,
    id: question._id,
    users: [],
  });

  await answers.save();

  let result = await Questions.find({ name: req.body.name });
  result = result.map((e) => e.toObject());

  res.send({ status: true, result: result });
});

app.post("/admin/delete-question", adminAuth, async (req, res) => {
  await Questions.remove({ _id: req.body.id });

  await Answers.remove({ id: req.body.id });

  let result = await Questions.find({ name: req.body.name });
  result = result.map((e) => e.toObject());

  res.send({ status: true, result: result });
});

app.post("/admin/load-quiz", adminAuth, async (req, res) => {
  let result = await Questions.find({ name: req.body.name });
  result = result.map((e) => e.toObject());

  res.send({ status: true, result: result });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(
    "running at http://localhost:" +
      (process.env.PORT ? process.env.PORT : 3000)
  );
});
