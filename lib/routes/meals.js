const router = require('express').Router();
const Meal = require('../models/meal');
const ensureAuth = require('../auth/ensure-auth')();
const ensureChef = require('../auth/ensure-chef')();

router
  .get('/', ensureAuth, (req, res, next) => {
    Meal.find()
      .select('-__v')
      .then(meals => res.send(meals))
      .catch(next);
  })

  .post('/', ensureAuth, ensureChef, (req, res, next) => {
    Meal.create(req.body)
      .then(meals => res.send(meals))
      .catch(next);
  });

module.exports = router;