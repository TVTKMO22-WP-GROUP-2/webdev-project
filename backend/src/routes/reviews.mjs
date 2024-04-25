import { Router } from "express";
import { Review } from "../database/schemas/review.mjs";
import mongoose from "mongoose";

const router = Router();

// Route to fetch reviews by movie_id
router.get("/reviews/:movie_id", async (req, res) => {
  const { movie_id } = req.params;

  try {
    const reviews = await Review.find({ movie_id });
    return res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Route to add a new review
router.post("/reviews", async (req, res) => {
  const { movie_id, userID, content_text } = req.body;
  console.log("movie_id:", movie_id);
  console.log("userID:", userID);

  const newReview = new Review({
    movie_id,
    userID,
    content_text,
  });

  try {
    await newReview.save();
    return res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.error("Error adding review:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Route to fetch review by user id
router.get("/reviews/by_username/:userID", async (req, res) => {
  const { userID } = req.params;

  try {
    const reviews = await Review.find({ userID });
    return res.status(200).send(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    return res.status(500).json({ err: "Internal server error" });
  }
});

export default router;
