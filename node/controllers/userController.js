import User from "../models/User.js";
import bcrypt from "bcryptjs";

// @desc    Get all users (searchable by name or email)
// @route   GET /api/users
// @access  Private
export const getAllUsers = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user.id } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get single user by ID
// @route   GET /api/users/:id
// @access  Private
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user._id.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    const { name, email, password, profilePic } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (profilePic) user.profilePic = profilePic;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private (can restrict to admin)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user._id.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    await user.remove();
    res.json({ message: "User removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
