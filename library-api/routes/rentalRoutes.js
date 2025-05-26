const express = require('express');
const router = express.Router();
const { rentBook, getMyRentals } = require('../controllers/rentalController');
const auth = require('../middleware/auth');

router.post('/', auth, rentBook);
router.get('/', auth, getMyRentals);

module.exports = router;
