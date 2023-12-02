import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ data: users, success: true, get: true });
  } catch (err) {
    console.log("Error when getting all Users: ", err);
    res
      .status(500)
      .json({ msg: "Internal Server Error", success: false, get: false });
  }
};

export const getByIdUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ msg: "User is not found", success: false });
    }
    res.status(200).json({ data: user, success: true, get: true });
  } catch (err) {
    console.log("Error when getting User by ID: ", err);
    res
      .status(500)
      .json({ msg: "Internal Server Error", success: false, get: false });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, phone_number, email, password } = req.body;
    const avatar = req.file ? req.file.filename : null;

    // Check password length
    if (password.length < 8) {
      return res.status(400).json({
        msg: "Password should be at least 8 characters long",
        success: false,
        created: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      avatar,
      phone_number,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ data: user, success: true, created: true });
  } catch (err) {
    console.log("Error when creating User: ", err);
    res
      .status(500)
      .json({ msg: "Internal Server Error", success: false, created: false });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const { first_name, last_name, phone_number, email, password } = req.body;
    const avatar = req.file ? req.file.filename : null;
   
    if (password.length < 8) {
      return res.status(400).json({
        msg: "Password should be at least 8 characters long",
        success: false,
        created: false,
      });
    }


    // Hash the password if it's provided
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updated = await User.update(
      {
        first_name,
        last_name,
        avatar,
        phone_number,
        email,
        password: hashedPassword,
      },
      { where: { id: userId } }
    );
    if (updated[0]) {
      const updatedUser = await User.findByPk(userId);
      res.status(200).json({ data: updatedUser, success: true, updated: true });
    } else {
      return res.status(404).json({ msg: "User is not found", success: false });
    }
  } catch (err) {
    console.log("Error when updating User: ", err);
    res
      .status(500)
      .json({ msg: "Internal Server Error", success: false, updated: false });
  }
};

export const deleteAllUsers = async (req, res) => {
  try {
    await User.destroy({ truncate: true });
    res.status(204).json({
      msg: "All Users are deleted successfully",
      success: true,
      deleted: true,
    });
  } catch (err) {
    console.log("Error when deleting all Users: ", err);
    res
      .status(500)
      .json({ msg: "Internal Server Error", success: false, deleted: false });
  }
};

export const deleteByIdUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deleted = await User.destroy({ where: { id: userId } });
    if (deleted) {
      res.status(204).json({
        msg: "User is deleted successfully",
        success: true,
        deleted: true,
      });
    } else {
      return res
        .status(404)
        .json({ msg: "User is not found", success: false, deleted: false });
    }
  } catch (err) {
    console.log("Error when deleting User: ", err);
    res
      .status(500)
      .json({ msg: "Internal Server Error", success: false, deleted: false });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ msg: "User not found", success: false });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ msg: "Invalid password", success: false });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, "Nimadur", {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ msg: "User logged in successfully", success: true, token });
  } catch (err) {
    console.log("Error when logging in User: ", err);
    res
      .status(500)
      .json({ msg: "Internal Server Error", success: false, loggedIn: false });
  }
};
