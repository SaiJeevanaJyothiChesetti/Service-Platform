const express = require("express");
const router = express.Router();
const Provider = require("../models/Provider");

// GET all providers with optional filtering
router.get("/", async (req, res) => {
  try {
    const { category, location, sort, search } = req.query;
    let query = {};

    // Filter by category
    if (category && category !== "All") {
      query.category = category;
    }

    // Filter by location (case-insensitive partial match)
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // Search by name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // Sort options
    let sortOption = {};
    if (sort === "price_asc") {
      sortOption.price = 1;
    } else if (sort === "price_desc") {
      sortOption.price = -1;
    } else if (sort === "experience") {
      sortOption.experience = -1;
    } else {
      sortOption.createdAt = -1;
    }

    const providers = await Provider.find(query).sort(sortOption);
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET providers by category
router.get("/category/:category", async (req, res) => {
  try {
    const providers = await Provider.find({ category: req.params.category }).sort({ createdAt: -1 });
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single provider by ID
router.get("/:id", async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) return res.status(404).json({ message: "Provider not found" });
    res.json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADD provider
router.post("/", async (req, res) => {
  try {
    const provider = new Provider(req.body);
    const savedProvider = await provider.save();
    res.status(201).json(savedProvider);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE provider
router.put("/:id", async (req, res) => {
  try {
    const provider = await Provider.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!provider) return res.status(404).json({ message: "Provider not found" });
    res.json(provider);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE provider
router.delete("/:id", async (req, res) => {
  try {
    const provider = await Provider.findByIdAndDelete(req.params.id);
    if (!provider) return res.status(404).json({ message: "Provider not found" });
    res.json({ message: "Provider deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
