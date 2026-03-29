const express = require("express");
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  getProviderBookings,
  updateBookingStatus,
  cancelBooking
} = require("../controllers/bookingController");
const { auth } = require("../middleware/auth");

// All booking routes require authentication
router.use(auth);

// User booking routes
router.post("/", createBooking);
router.get("/", getUserBookings);
router.put("/:id/cancel", cancelBooking);

// Provider booking routes (for provider dashboard)
router.get("/provider", getProviderBookings);

// Update booking status
router.put("/:id/status", updateBookingStatus);

module.exports = router;
