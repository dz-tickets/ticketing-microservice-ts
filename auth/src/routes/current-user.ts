import express from "express";

const router = express.Router();

router.get("/api/users/createuser", (req, res) => {
    res.send("create user");
});

export {router as currentUserRouter};