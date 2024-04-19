import mongoose from "mongoose";

const { Schema } = mongoose;

const ReviewSchema = new Schema({
  movie_id: Schema.Types.String,
  userID: Schema.Types.String,
  content_text: Schema.Types.String,
  createdAt: { type: Date, default: Date.now }
});

ReviewSchema.index({ movie_id: 1 });

const Review = mongoose.model("Review", ReviewSchema);

export { Review };
