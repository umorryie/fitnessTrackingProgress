const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const {userRouter} = require('./routers/UserRouter');
const userApiEndPoint = '/api/users/'

app.use(cors());
app.use(bodyParser.json());
app.use(userApiEndPoint, userRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
