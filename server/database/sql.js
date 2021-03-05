const createSchema = `CREATE SCHEMA TRACKINGPROGRESS`;

const createUserTable = `CREATE TABLE USERS(ID int NOT NULL UNIQUE AUTO_INCREMENT, EMAIL VARCHAR(255) UNIQUE, PRIMARY KEY (ID))`;

const createExerciseTable = `CREATE TABLE EXERCISES(ID int NOT NULL UNIQUE AUTO_INCREMENT, NAME VARCHAR(255) UNIQUE, PRIMARY KEY (ID))`;

const createUserExerciseTable = `CREATE TABLE USERS_EXERCISES(ID int NOT NULL UNIQUE AUTO_INCREMENT, EMAIL VARCHAR(255), PRIMARY KEY (ID), EXERCISE_ID int)`;

const insertUser = (userEmail) => {
    return `INSERT INTO USERS (EMAIL) VALUES('${userEmail}')`;
};

const insertExercise = (exercise) => {
    return `INSERT INTO EXERCISES (NAME) VALUES('${exercise}')`;
}
module.exports = {
    createUserExerciseTable,
    createExerciseTable,
    createUserTable,
    createSchema,
    insertExercise,
    insertUser
};
