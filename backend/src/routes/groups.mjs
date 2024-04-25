import express from "express";
import Group from "../database/schemas/groups.mjs";

const router = express.Router();

router.post("/groups/create", async (req, res) => {
  const { name, description, owner } = req.body;

  try {
    const existingGroup = await Group.findOne({ name });

    if (existingGroup) {
      // If a group with the same name exists, return an error response
      return res.status(400).json({ error: "Group name already exists" });
    }
    const newGroup = await Group.create({
      name,
      description,
      owner,
      members: [owner],
    });
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get("/groups", async (req, res) => {
    try {
      const groups = await Group.find();
      res.status(200).json(groups);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

router.get("/groups/:id", async (req, res) => {
    const groupId = req.params.id;
  
    try {
    
      const group = await Group.findById(groupId);
  
      if (!group) {
        return res.status(404).json({ error: "Group not found" });
      }
  
      // If the group is found, return it as the response
      res.status(200).json(group);
    } catch (error) {
      console.error("Error fetching group:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  


  router.patch("/groups/:id", async (req, res) => {
    const { color } = req.body;
    const { id } = req.params;
  
    try {
      const updatedGroup = await Group.findByIdAndUpdate(id, { color }, { new: true });
      res.status(200).json(updatedGroup);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


router.delete("/groups/:id", async (req, res) => {
  const groupId = req.params.id;

  try {
    // Query the database to find the group by its ID and delete it
    const deletedGroup = await Group.findByIdAndDelete(groupId);

    if (!deletedGroup) {
      return res.status(404).json({ error: "Group not found" });
    }

    // If the group is successfully deleted, return a success message
    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    console.error("Error deleting group:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

  

export default router;
