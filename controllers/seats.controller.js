const Seat = require('../models/seat.model');
var sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Seat.findOne().skip(rand);
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const dep = await Seat.findById(req.params.id);
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addNew = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const daySanitized = sanitize(day);
    const seatSanitized = sanitize(seat);
    const clientSanitized = sanitize(client);
    const emailSanitized = sanitize(email);

    const seatTaken = await Seat.findOne({ day: day, seat: seat });
    if (seatTaken) {
      return res.status(400).json({ message: 'The slot is already taken...' });
    }

    const newSeat = new Seat({
      day: daySanitized,
      seat: seatSanitized,
      client: clientSanitized,
      email: emailSanitized,
    });

    await newSeat.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.editById = async (req, res) => {
  const { day, seat, client, email } = req.body;

  try {
    const dep = await Seat.findById(req.params.id);
    if (dep) {
      await Seat.updateOne(
        { _id: req.params.id },
        {
          $set: {
            day: day,
            seat: seat,
            client: client,
            email: email,
          },
        }
      );
      const updatedDep = await Seat.findById(req.params.id);
      res.json(updatedDep);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const dep = await Seat.findById(req.params.id);
    if (dep) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json(dep);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
