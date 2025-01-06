const express = require('express');
const router = express.Router();
const SmsLog = require('../../models/SmsLog');

router.get('/', async (req, res) => {
  try {
    const smsLogs = await SmsLog.find()
      .populate('classSchedule')
      .populate('attendance')
      .populate('logs.student')
      .sort('-createdAt');

    res.json({
      success: true,
      data: smsLogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const smsLog = await SmsLog.findById(req.params.id)
      .populate('classSchedule')
      .populate('attendance')
      .populate('logs.student');

    if (!smsLog) {
      return res.status(404).json({
        success: false,
        message: 'SMS log not found'
      });
    }

    res.json({
      success: true,
      data: smsLog
    });
  } catch (error) {
    res.status(500).json({
      success: false, 
      message: error.message
    });
  }
});

// Create SMS log
router.post('/', async (req, res) => {
  try {
    const smsLog = await SmsLog.create(req.body);
    
    res.status(201).json({
      success: true,
      data: smsLog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message  
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const smsLog = await SmsLog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!smsLog) {
      return res.status(404).json({
        success: false,
        message: 'SMS log not found'
      });
    }

    res.json({
      success: true,
      data: smsLog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const smsLog = await SmsLog.findByIdAndDelete(req.params.id);

    if (!smsLog) {
      return res.status(404).json({
        success: false,
        message: 'SMS log not found'
      });
    }

    res.json({
      success: true,
      message: 'SMS log deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;