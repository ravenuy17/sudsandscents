import express from "express";
import bodyParser from "body-parser";

const port = 5000;
const server = express();

server.use(bodyParser.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  res.send("Hello?");
});

server.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
