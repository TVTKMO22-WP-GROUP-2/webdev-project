import mongoose from "mongoose";

const { Schema } = mongoose;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  members: {
    type: [String],
    default: [],
  },
  color: {
    type: String, 
    default: "#FFFFFF",
  },
});

const Group = mongoose.model("Group", groupSchema);

export default Group;
