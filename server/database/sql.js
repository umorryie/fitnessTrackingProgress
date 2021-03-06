const createSchema = `create schema fitness`;

const createUserTable = `create table users(id int not null unique auto_increment, email varchar(255) unique, primary key (id))`;

const createExerciseTable = `create table exercises(id int not null unique auto_increment, name varchar(255) unique, primary key (id))`;

const createUserExerciseTable = `create table users_exercises(id int not null unique auto_increment, email varchar(255), primary key (id), exercise_id int)`;

const selectFitnessSchema = 'use fitness;';

const getExercisesNames = 'select name from exercises;';

const insertUser = (userEmail) => {
    return `insert into users (email) values ('${userEmail}')`;
};

const insertExercise = (exercise) => {
    return `insert into exercises (name) values ('${exercise}')`;
}

const getUserByEmail = (userEmail) => {
    return `select * from users where email = '${userEmail}'`;
};

module.exports = {
    createUserExerciseTable,
    createExerciseTable,
    createUserTable,
    createSchema,
    insertExercise,
    insertUser,
    getUserByEmail,
    selectFitnessSchema,
    getExercisesNames
};
