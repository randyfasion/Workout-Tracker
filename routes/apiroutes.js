const router = require('express').Router();
const Workout = require('../models/Workout.js');


// get all workouts
router.get('/api/allWorkouts', (req, res) => {
    Workout.find({})
        .sort({ date: -1 })
        .then(Workout => {
            res.json(Workout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});


module.exports = router;