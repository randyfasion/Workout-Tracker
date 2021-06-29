const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema ({
day: {

},
type: {

},
name: {

},
duration: {

},
weight: {

},
reps: {

},
sets: {

}

});

const workout = mongoose.model('workout', workoutSchema);;

module.exports = workout;