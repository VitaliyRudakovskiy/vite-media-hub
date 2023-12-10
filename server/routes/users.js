import express from "express";
import { getUsers, getOneUser, logIn, signUp } from "../controllers/users.js";

const router = express.Router();

//GET users
router.get("/", getUsers);

//GET one user
router.get("/:id", getOneUser);

//login route
router.post("/login", logIn);

//signup route
router.post("/signup", signUp);

export default router;
