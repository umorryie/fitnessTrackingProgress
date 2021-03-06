const express = require('express');
const exercisesRouter = express.Router();
const {getExercises} = require('../controller/ExercisesController');

exercisesRouter.get('/getExercises/', getExercises);

module.exports = {
    exercisesRouter
}
