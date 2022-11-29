const { sequelize } = require('./db/connection');
const express = require('express');
const cors = require('cors');
const userRouter = require('./user/userRouter');
// port connection
const port = process.env.PORT || 5001;

// express app
const app = express();
app.use(cors());

app.use(express.json());
app.use(userRouter)

// sequelize connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    }
);

// listener
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});