import express from "express";
import bodyParser from "body-parser";
import { mongoose } from "mongoose";
import { cors } from cors;
import "dotenv/config";

const port = 5000;
const server = express();
const databaseURI = process.env.MONGODB_URI;
console.log(databaseURI);

mongoose
  .connect(databaseURI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

server.use(bodyParser.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  res.json("Hello?");
});

server.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});

console.log("Henlo");
