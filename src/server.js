const { sequelize } = require('./db/connection');
const express = require('express');
// port connection
const port = process.env.PORT || 3000;

// express app
const app = express();

// listener
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
