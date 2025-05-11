const express = require('express');
const router = express.Router();
const { sendMedicalEmail } = require('../sender');

router.post('/', async (req, res) => {
  try {
    await sendMedicalEmail(req.body); 
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

module.exports = router;
