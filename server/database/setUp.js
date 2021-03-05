const fs = require('fs');
const {createConnection, disconnectConnection} = require('./connection');
const {createUserExerciseTable, createExerciseTable, createUserTable, insertExercise} = require('./sql');

const getExercises = () => {
    const exercises = fs.readFileSync('../exercises.json');
    const jsonExercises = JSON.parse(exercises);
    return Object.keys(jsonExercises);
}

const setUpTables = async (dbConnection) => {
    try {
        await dbConnection.query(createUserTable);
        await dbConnection.query(createExerciseTable);
        await dbConnection.query(createUserExerciseTable);
    } catch (error) {
        console.log(`Setting up tables error: ${error}`)
        return error;
    }
}

const setUpExercises = async (dbConnection) => {
    try {
        const exercises = getExercises();
        for (let index = 0; index < exercises.length; index++) {
            const exerciseName = exercises[index];
            await dbConnection.query(insertExercise(exerciseName));
        }
    } catch (error) {
        console.log(`Setting up exercises error: ${error}`)
        return error;
    }
}

const setUpDataBase = async () => {
    try {
        const connection = await createConnection();
        await setUpTables(connection);
        await setUpExercises(connection);
        await disconnectConnection(connection);
    } catch (error) {
        console.log(`Setting up database error: ${error}`)
        return error;
    }
}

module.exports = {
    setUpDataBase
}
setUpDataBase()