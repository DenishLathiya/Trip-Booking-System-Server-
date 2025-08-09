// const express = require("express");
// const router = express.Router();
// const Booking = require("../models/Booking");
// const { Tour } = require("../models/Tour");
// const mongoose = require("mongoose");

// router.post("/add", async (req, res) => {
//   try {
//     const { tourId } = req.body;

//     if (!tourId)
//       return res.status(400).json({ message: "Product ID is required" });

//     const tour = await Tour.findById(tourId);
//     if (!tour) return res.status(404).json({ message: "Product not found" });

//     const BookingItem = new Booking({ tourId });
//     const savedItem = await BookingItem.save();

//     res.status(201).json(savedItem);
//   } catch (error) {
//     console.error("Cart Add Error:", error);
//     res.status(500).json({ message: "Error adding to cart", error });
//   }
// });

// router.get("/", async (req, res) => {
//   try {
//     const BookingItems = await Booking.find().populate("tourId");
//     res.status(200).json(BookingItems);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching cart items", error });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const { Tour } = require("../models/Tour");
const mongoose = require("mongoose");

router.post("/add", async (req, res) => {
  try { 
    const { tourId } = req.body;

    if (!tourId)
      return res.status(400).json({ message: "Product ID is required" });

    const tour = await Tour.findById(tourId);
    if (!tour) return res.status(404).json({ message: "Product not found" });

    const BookingItem = new Booking({ tourId });
    const savedItem = await BookingItem.save();

    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Cart Add Error:", error);
    res.status(500).json({ message: "Error adding to cart", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const BookingItems = await Booking.find().populate("tourId");
    res.status(200).json(BookingItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart items", error });
  }
});

// DELETE booking by tourId
router.delete("/:tourId", async (req, res) => {
  try {
    const { tourId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(tourId)) {
      return res.status(400).json({ message: "Invalid tourId" });
    }

    const deletedBooking = await Booking.findOneAndDelete({ tourId });

    if (!deletedBooking) {
      return res
        .status(404)
        .json({ message: "Booking not found for this tourId" });
    }

    res
      .status(200)
      .json({ message: "Booking deleted successfully", deletedBooking });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Error deleting booking", error });
  }
});

module.exports = router;
