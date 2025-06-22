const express = require("express")
const User = require("../models/User")
const auth = require("../middleware/auth")

const router = express.Router()

// Get current user profile
router.get("/profile", auth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        bio: req.user.bio,
        profilePicture: req.user.profilePicture,
      },
    })
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

// Update user profile
router.put("/profile", auth, async (req, res) => {
  try {
    const { name, bio, profilePicture } = req.body

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        ...(name && { name }),
        ...(bio !== undefined && { bio }),
        ...(profilePicture !== undefined && { profilePicture }),
      },
      { new: true },
    ).select("-password")

    res.json({
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        bio: updatedUser.bio,
        profilePicture: updatedUser.profilePicture,
      },
    })
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

module.exports = router
