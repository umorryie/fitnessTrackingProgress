const {getUserByEmail, insertUser} = require('../database/sql');
const connection = require('../database/connection');

const getUser = (req, res) => {
    const {userEmail} = req.params;
    connection.query(getUserByEmail(userEmail), (error, user) => {
        if (error) {
            console.log(`Error retrieving user with error: ${error}`);
            res.status(404).json({error})
        } else {
            res.status(200).json(user)
        }
    });
}

const postUser = (req, res) => {
    const {userEmail} = req.body;
    connection.query(insertUser(userEmail), (error, response) => {
        if (error) {
            console.log(`Error inserting user ${userEmail} with error: ${error}`);
            res.status(404).json({error})
        } else {
            res.status(200).json(response)
        }
    });
}

module.exports = {
    getUser,
    postUser
};
