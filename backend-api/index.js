import express from "express";
import bodyParser from "body-parser";
import { mongoose } from "mongoose";
//import { cors } from cors;
import "dotenv/config";
import { router as userRouter } from "./routes/users.js";

const port = 5000;
const server = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected");

    server.listen(port, () => {
      console.log(`Server listening at port ${port}`);
    });
  })
  .catch((err) => console.error(err));

server.use(bodyParser.urlencoded({ extended: true }));

server.get("/", (_req, res) => {
  res.json({ message: "Home route" });
});

server.use("/users", userRouter);
