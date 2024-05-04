const express = require("express");
const userRouter = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
process.loadEnvFile(".env");

const verifyToken = require("../middlewares/verifyToken");

let usersCollection;
userRouter.use((req, res, next) => {
  usersCollection = req.app.get("usersCollection");
  next();
});

userRouter.get("/test", (req, res) => res.send("Test Successful"));

userRouter.post(
  "/new-user",
  expressAsyncHandler(async (req, res) => {
    const newUser = req.body;

    const dbUser = await usersCollection.findOne({
      username: newUser.username,
    });

    if (dbUser !== null) return res.send({ message: "Username taken" });

    newUser.password = await bcryptjs.hash(newUser.password, +process.env.SALT);
    newUser.journals = [];

    await usersCollection.insertOne(newUser);
    res.send({ message: "User created" });
  })
);

userRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const user = req.body;
    const dbUser = await usersCollection.findOne({ username: user.username });

    if (!dbUser) return res.send({ message: "User doesn't exist" });

    const passwordCheck = await bcryptjs.compare(
      user.password,
      dbUser.password
    );

    if (!passwordCheck) return res.send({ message: "Incorrect password" });

    const signedToken = jwt.sign(
      { username: user.username },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    delete dbUser.password;
    delete dbUser._id;
    res.send({ message: "Login successful", user: dbUser, token: signedToken });
  })
);

userRouter.get(
  "/:username/get-journals",
  verifyToken,
  expressAsyncHandler(async (req, res) => {
    const username = req.params.username;
    const user = await usersCollection.findOne({ username: username });
    const journals = user.journals;

    res.send({ message: "All journals", payload: journals });
  })
);

userRouter.put(
  "/:username/add-journal",
  verifyToken,
  expressAsyncHandler(async (req, res) => {
    const username = req.params.username;
    const journal = req.body;
    journal.id = Date.now();

    await usersCollection.updateOne(
      { username: username },
      { $addToSet: { journals: journal } }
    );
    res.send({ message: "Journal added" });
  })
);

userRouter.delete(
  "/:username/delete-journal/:id",
  verifyToken,
  expressAsyncHandler(async (req, res) => {
    const username = req.params.username;
    const id = +req.params.id;
    const user = await usersCollection.findOne({ username: username });

    user.journals = user.journals.filter((journal) => journal.id !== id);
    await usersCollection.updateOne({ username: username }, { $set: user });
    res.send({ message: "Journal Entry Deleted" });
  })
);

module.exports = userRouter;
