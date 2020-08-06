const express = require('express');

const people = require('./person');

const router = express.Router();

router.use('/person', people);

module.exports = router;
