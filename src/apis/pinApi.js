const router = require('express').Router();
const Pin = require('../models/Pin/pinModel');

router.get('/', async (req, res) => {
  try {
    const pins = await Pin.find({});
    res.status(200).json({ pins });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

router.get('/:pin_id', async (req, res) => {
  try {
    const pin = await Pin.findOne({ _id: req.params.pin_id });
    if (!pin) throw new Error('Invalid Pin ID');
    res.status(200).json({ pin });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const pinData = req.body.pin;
    if (!pinData) throw new Error('No pin object found in the request found');
    const pin = new Pin(pinData);
    await pin.save();
    res.status(200).json({ pin });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:pin_id', async (req, res) => {
  try {
    const pin = await Pin.findOneAndRemove({ _id: req.params.pin_id });
    if (!pin) throw new Error('Invalid Pin ID');
    res.status(200).json({ pin });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
