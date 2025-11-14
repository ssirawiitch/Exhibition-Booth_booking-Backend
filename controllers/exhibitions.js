const Exhibition = require('../models/Exhibition');
const dayjs = require('dayjs');

// @desc    Get all exhibitions
// @route   GET /api/v1/exhibitions
// @access  Public
exports.getExhibitions = async (req, res) => {
  const exhibitions = await Exhibition.find().populate('bookings');
  res.json({
    success: true,
    count: exhibitions.length,
    data: exhibitions
  });
};

// @desc    Get single exhibition
// @route   GET /api/v1/exhibitions/:id
// @access  Public
exports.getExhibition = async (req, res) => {
  try {
    const exhibition = await Exhibition.findById(req.params.id).populate('bookings');
    if (!exhibition) {
      return res.status(404).json({
        success: false,
        message: 'Exhibition not found'
      });
    }
    res.json({
      success: true,
      data: exhibition
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Exhibition not found - Invalid ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Create exhibition
// @route   POST /api/v1/exhibitions
// @access  Admin
exports.createExhibition = async (req, res) => {
  const { name, description, venue, startDate, durationDay, smallBoothQuota, bigBoothQuota, posterPicture } = req.body;
  
  // Check if start date is not earlier than current date
  if (dayjs(startDate).isBefore(dayjs(), 'day')) {
    return res.status(400).json({
      success: false,
      message: 'Start date cannot be earlier than current date'
    });
  }

  const exhibition = await Exhibition.create({ 
    name,
    description, 
    venue,
    startDate,
    durationDay,
    smallBoothQuota,
    bigBoothQuota,
    posterPicture
  });
  
  res.status(201).json({
    success: true,
    data: exhibition
  });
};

// @desc    Update exhibition
// @route   PUT /api/v1/exhibitions/:id
// @access  Admin
exports.updateExhibition = async (req, res) => {
  const { startDate } = req.body;
  
  // Check if start date is not earlier than current date if it's being updated
  if (startDate && dayjs(startDate).isBefore(dayjs(), 'day')) {
    return res.status(400).json({
      success: false,
      message: 'Start date cannot be earlier than current date'
    });
  }

  const exhibition = await Exhibition.findByIdAndUpdate(
    req.params.id, 
    req.body, 
    { 
      new: true, 
      runValidators: true 
    }
  );

  if (!exhibition) {
    return res.status(404).json({
      success: false,
      message: 'Exhibition not found'
    });
  }

  res.json({
    success: true,
    data: exhibition
  });
};

// @desc    Delete exhibition
// @route   DELETE /api/v1/exhibitions/:id
// @access  Admin
exports.deleteExhibition = async (req, res) => {
  const exhibition = await Exhibition.findByIdAndDelete(req.params.id);
  
  if (!exhibition) {
    return res.status(404).json({
      success: false,
      message: 'Exhibition not found'
    });
  }
  
  res.json({
    success: true,
    message: 'Exhibition deleted'
  });
};
