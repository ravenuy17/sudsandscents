import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json({ UserList: {} }).statusCode(200);
});

router.get("/new", (_req, res) => {
  res
    .json({
      user: "",
      type: "new",
    })
    .statusCode(200);
});
