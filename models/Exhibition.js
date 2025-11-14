const mongoose = require('mongoose');

const ExhibitionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add exhibition name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please add exhibition description"],
  },
  venue: {
    type: String,
    required: [true, "Please add exhibition venue"],
  },
  startDate: {
    type: Date,
    required: [true, "Please add exhibition start date"],
  },
  durationDay: {
    type: Number,
    required: [true, "Please add exhibition duration in days"],
    min: [1, "Duration must be at least 1 day"]
  },
  smallBoothQuota: {
    type: Number,
    required: [true, "Please add small booth quota"],
    min: [0, "Small booth quota cannot be negative"],
  },
  bigBoothQuota: {
    type: Number,
    required: [true, "Please add big booth quota"],
    min: [0, "Big booth quota cannot be negative"],
  },
  posterPicture: {
    type: String,
    required: [true, "Please add a poster picture URL"],
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Reverse populate with virtuals
ExhibitionSchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'exhibition',
  justOne: false
});

module.exports = mongoose.model("Exhibition", ExhibitionSchema);
