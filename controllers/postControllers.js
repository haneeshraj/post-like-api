import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import basicAuth from "basic-auth";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("user");
    res.json(posts);
  } catch (error) {
    console.error(error);
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("user");

    if (!post) {
      res.json({ message: "Can't find post" });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
  }
};

export const addPost = async (req, res) => {
  try {
    const user = basicAuth(req);
    if (!user) {
      res.json({ message: "Please enter email and pass" });
    }
    const userExists = await User.findOne({ email: user.name });
    if (!userExists) {
      res.json({ message: "User does not exist" });
    }
    if (userExists.password !== user.pass) {
      res.json({ message: "invalid password" });
    }

    const { title, content } = req.body;
    const newPost = new Post({
      title,
      content,
      user: userExists._id,
      likes: [],
    });

    const createdPost = await newPost.save();

    res.json({ post: createdPost });
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const user = basicAuth(req);
    if (!user) {
      res.json({ message: "Please enter email and pass" });
    }
    const userExists = await User.findOne({ email: user.name });
    if (!userExists) {
      res.json({ message: "User does not exist" });
    }
    if (userExists.password !== user.pass) {
      res.json({ message: "invalid password" });
    }
    const { id } = req.params;
    const postExists = await Post.findById(id);
    if (!postExists) {
      res.json({ message: "Post does not exist" });
      return;
    }

    await Post.findByIdAndDelete(id);

    res.json({ message: "deleted!" });
  } catch (error) {
    console.error(error);
  }
};

export const likePost = async (req, res) => {
  try {
    const userAuth = basicAuth(req);
    if (!userAuth) {
      res.json({ message: "Please enter email and pass" });
    }
    const userExists = await User.findOne({ email: userAuth.name });
    if (!userExists) {
      res.json({ message: "User does not exist" });
    }
    if (userExists.password !== userAuth.pass) {
      res.json({ message: "invalid password" });
    }

    const user = await User.findOne({ email: userAuth.name }); // user
    const { id } = req.params; // post id

    const post = await Post.findById(id);
    if (!post) {
      res.json({ message: "Post not found" });
      return;
    }
    if (post.likes.includes(user._id)) {
      res.json({ message: "Post already liked" });
      return;
    }

    post.likes.push(user._id);
    await post.save();

    res.json({ message: "Post Liked!" });
  } catch (error) {
    console.error(error);
  }
};
