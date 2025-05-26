const Rental = require('../models/Rental');

exports.rentBook = async (req, res) => {
  const { bookId, startDate, endDate } = req.body;

  try {
    const overlappingRental = await Rental.findOne({
      book: bookId,
      startDate: { $lt: new Date(endDate) },
      endDate: { $gt: new Date(startDate) }
    });

    if (overlappingRental) {
      return res.status(400).json({ message: 'Book is already rented in this period.' });
    }

    const rental = await Rental.create({
      user: req.user.id,
      book: bookId,
      startDate,
      endDate
    });

    res.status(201).json(rental);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMyRentals = async (req, res) => {
  try {
    const rentals = await Rental.find({ user: req.user.id }).populate('book');
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
