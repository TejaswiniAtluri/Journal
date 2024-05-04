const express = require("express");
const app = express();
process.loadEnvFile(".env");

const mongoClient = require("mongodb").MongoClient;

mongoClient
  .connect(process.env.DB_URL)
  .then((client) => {
    const dbObj = client.db("Journal");
    const usersCollection = dbObj.collection("usersCollection");

    app.set("usersCollection", usersCollection);
    console.log("Connection to DB completed");
  })
  .catch((err) => console.log(err.message));

const userRouter = require("./routes/user");

app.use(express.json());

app.use("/user", userRouter);

const port = process.env.PORT;

app.use((err, req, res, next) => {
  console.log(err.message);
  res.send({ message: err.message });
});

app.listen(port, () => console.log(`Server live on http://localhost:${port}`));
