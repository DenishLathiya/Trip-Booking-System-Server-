const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  tourId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: true,
  }
});

module.exports = mongoose.model('Booking', BookingSchema);