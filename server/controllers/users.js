import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const allUsers = UserModel.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getOneUser = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No user with this id");
  }

  try {
    const existingUser = await UserModel.findOne({ _id });
    res.status(200).json(existingUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = bcrypt.compare(
      password,
      existingUser.hashedPassword
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid password." });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signUp = async (req, res) => {
  const { email, password, firstName, lastName, picture } = req.body;

  //validation
  if (!email || !password || !firstName || !lastName) {
    return res
      .status(400)
      .json({ message: "Please enter all the required fields." });
  }

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

    //hashing
    const hashedPassword = await bcrypt.hash(password, 12);

    //saving new user
    const newUser = await UserModel.create({
      name: `${firstName} ${lastName}`,
      email,
      hashedPassword,
      picture,
    });

    const token = jwt.sign({ email: newUser.email, id: newUser._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result: newUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
