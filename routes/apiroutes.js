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

  // Get most recent 
router.get('/api/workouts', (req, res) =>{
    Workout.find()
    .then(dbWorkout => {
        const updatedData = dbWorkout.map(workout=>{
            const totalDuration = workout.exercises.reduce((acc, curr) => acc+curr.duration, 0)        
        return {day: workout.day, exercises: workout.exercises, totalDuration, _id: workout._id}
        })
        console.log('Updated Data', updatedData);
            res.json(updatedData);
     })
     .catch(err => {
         res.json(err);
     })
 })


// Get last 7 workouts
router.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration'
                }
            }
        }
    ])
    .sort({ _id: 1 })
    .limit(7)
    .then(dbWorkout => {
        console.log("Last 7", dbWorkout);
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});


// delete a workout
router.delete('/api/workouts/delete', ({body}, res) => {
    Workout.findByIdAndRemove(body.id)
    .then (() => {
        res.json(true)
    })
    .catch(err => {
        res.json(err);
    });
});



module.exports = router;