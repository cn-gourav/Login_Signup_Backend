const express = require('express');
const router = express.Router();
const Owner = require('../models/ownerModel');

router.get('/', (req, res) => {
    res.send('Owner Home Page');
});

module.exports = router;