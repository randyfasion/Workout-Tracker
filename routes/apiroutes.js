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

// post new workout
router.post('/api/workouts', (req, res) => {
    Workout.create({})
      .then((Workout) => {
        res.json(Workout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // Update a workout
// This updates an existing workout's exercises
// Workout is found by it's ID
router.put('/api/workouts/:id', ({body, params}, res) => {
    console.log({body});
    Workout.findByIdAndUpdate(
        params.id,
        {$push: {exercises: body}},
        {new: true, runValidators: true}
    )
    .then(dbWorkout => {
        res.json(dbWorkout)
    })
    .catch(err => {
        res.json(err);
    });
});



module.exports = router;