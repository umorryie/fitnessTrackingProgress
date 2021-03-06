const {getExercisesNames} = require('../database/sql');
const connection = require('../database/connection');

const getExercises = (req, res) => {
    connection.query(getExercisesNames, (error, exercises) => {
        if (error) {
            console.log(`Error retrieving user with error: ${error}`);
            res.status(404).json({error})
        } else {
            const exercisesArray = exercises.map(exercise => exercise.name);
            res.status(200).json(exercisesArray);
        }
    });
}

module.exports = {
    getExercises
};
