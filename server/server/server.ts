import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
const {userRouter} = require('./routers/UserRouter');
const {exercisesRouter} = require('./routers/ExercisesRouter');
const userApiEndPoint = '/api/users/';
const exercisesApiEndPoint = '/api/exercises/';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(userApiEndPoint, userRouter);
app.use(exercisesApiEndPoint, exercisesRouter);

app.use(express.static(path.resolve(__dirname, '../../client/build')));
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
  });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

export default app;