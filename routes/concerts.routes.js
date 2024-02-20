const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);

router.get('/concerts/random', ConcertController.getRandom);

router.get('/concerts/:id', ConcertController.getById);

router.post('/concerts', ConcertController.addNew);

router.put('/concerts/:id', ConcertController.editById);

router.delete('/concerts/:id', ConcertController.deleteById);

router.get('/concerts/performer/:performer', ConcertController.getByPerformer);

router.get('/concerts/genre/:genre', ConcertController.getByGenre);

router.get(
  '/concerts/price/:price_min/:price_max',
  ConcertController.getByPrice
);

router.get('/concerts/day/:day', ConcertController.getByDay);

module.exports = router;
