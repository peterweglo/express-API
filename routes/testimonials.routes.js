const express = require('express');
const router = express.Router();

const TestimonialController = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimonialController.getAll);

router.get('/testimonials/random', TestimonialController.getRandom);

router.get('/testimonials/:id', TestimonialController.getById);

router.post('/testimonials', TestimonialController.addNew);

router.put('/testimonials/:id', TestimonialController.editById);

router.delete('/testimonials/:id', TestimonialController.deleteById);

module.exports = router;
