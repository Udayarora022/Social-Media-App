const express = require("express")
const Post = require("../models/Post")
const auth = require("../middleware/auth")

const router = express.Router()

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name profilePicture").sort({ createdAt: -1 })

    res.json({ posts })
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

// Create a post
router.post("/", auth, async (req, res) => {
  try {
    const { content, imageUrl } = req.body

    if (!content) {
      return res.status(400).json({ error: "Content is required" })
    }

    const post = new Post({
      content,
      imageUrl: imageUrl || "",
      author: req.user._id,
    })

    await post.save()
    await post.populate("author", "name profilePicture")

    res.status(201).json({ post })
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

// Like a post
router.post("/:id/like", auth, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true })

    if (!post) {
      return res.status(404).json({ error: "Post not found" })
    }

    res.json({ likes: post.likes })
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

module.exports = router
