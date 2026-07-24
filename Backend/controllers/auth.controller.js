import Role from "../models/role.model.js";
import User from "../models/user.model.js";
import {
  generateToken,
  registerUserService,
} from "../services/auth.service.js";

// ================= Register User =================
export const registerUser = async (req, res) => {
  try {
    const result = await registerUserService(req.body);

    return res.status(201).json({
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// ================= Login User =================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({ email }).populate("role");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Generate JWT Token
    const accessToken = generateToken(user._id);

    return res.status(200).json({
      message: "User logged in successfully",
      accessToken,
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Delete User =================
export const deleteUser = async (req, res) => {
  return res.status(200).json({
    message: "User deleted successfully",
  });
};

// ================= Change User Role =================
export const ChangeUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;

    const user = await User.findById(userId).populate("role");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role.name === role) {
      return res.status(400).json({
        message: "User already has this role",
      });
    }

    const roleObject = await Role.findOne({ name: role });

    if (!roleObject) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    user.role = roleObject._id;
    const result = await user.save();

    return res.status(200).json({
      message: "User role updated successfully",
      user: result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};
