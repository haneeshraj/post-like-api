import User from "../models/userModel.js";
import Post from "../models/postModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      res.json({ message: "Can't find user" });
    }
    res.json({ user, posts });
  } catch (error) {
    console.error(error);
  }
};

export const addUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    console.log(userExists);
    if (userExists) {
      res.json({ message: "User already exists" });
      return;
    }

    const newUser = new User({ email, password });
    await newUser.save();

    res.json({ message: "created!" });
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const userExists = await User.findById(id);
    if (!userExists) {
      res.json({ message: "User does not exist" });
      return;
    }

    await User.findByIdAndDelete(id);

    res.json({ message: "deleted!" });
  } catch (error) {
    console.error(error);
  }
};
