const mongoose = require('mongoose');

const TourSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: { 
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  daynight: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  person: {
    type: Number,
    required: true
  },
  images: [
    {
      type: String,
      required: true,
    }
  ],
   rating :{
        type:Number,
        default:0,
    },
});

exports.Tour = mongoose.model('Tour', TourSchema);
