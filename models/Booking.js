const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  exhibition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exhibition',
    required: true
  },
  boothType: {
    type: String,
    enum: ['small', 'big'],
    required: [true, 'Please specify booth type (small/big)']
  },
  amount: {
    type: Number,
    required: true,
    min: [1, "Booking amount must be at least 1"]
  }
}, {
  timestamps: true
});

// Create compound index for user and exhibition
BookingSchema.index({ user: 1, exhibition: 1 });

// Static method to check total booths booked by user for an exhibition
BookingSchema.statics.checkTotalBooths = async function(userId, exhibitionId) {
  const stats = await this.aggregate([
    {
      $match: {
        user: mongoose.Types.ObjectId(userId),
        exhibition: mongoose.Types.ObjectId(exhibitionId)
      }
    },
    {
      $group: {
        _id: null,
        totalBooths: { $sum: '$amount' }
      }
    }
  ]);
  
  return stats.length > 0 ? stats[0].totalBooths : 0;
};

// Middleware to check total booths before saving
BookingSchema.pre('save', async function(next) {
  if (!this.isModified('amount')) {
    return next();
  }

  const totalBooths = await this.constructor.aggregate([
    {
      $match: {
        user: this.user,
        exhibition: this.exhibition,
        _id: { $ne: this._id } // Exclude current booking
      }
    },
    {
      $group: {
        _id: null,
        totalBooths: { $sum: '$amount' }
      }
    }
  ]);

  const otherBookingsTotal = totalBooths.length > 0 ? totalBooths[0].totalBooths : 0;
  const newTotal = otherBookingsTotal + this.amount;
  
  if (newTotal > 6) {
    next(new Error('Total number of booths cannot exceed 6 per exhibition'));
  }
  
  next();
});

module.exports = mongoose.model('Booking', BookingSchema);
