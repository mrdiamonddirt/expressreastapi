const { sequelize } = require("./db/connection");
const express = require("express");
const cors = require("cors");
const userRouter = require("./user/userRouter");
const { User } = require("./user/userModel");
const app = express();
// const favoriteRouter = require("./favorite/favoriteRouter");
// const { Favorite } = require("./favorite/favoriteModel");
// port connection
const port = process.env.PORT || 5001;
// socket io port
const socketPort = 5005;

// express app

app.use(cors());

// socket io connection
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

server.listen(socketPort, () => {
    console.log(`Socket io is running on port ${socketPort}`);
});

app.use(express.json());
app.use(userRouter);
// app.use(favoriteRouter);

app.get("/health", (req, res) => {
    res.status(200).send({ message: "API is working" });
});

// listen for socket io connection
io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

// sequelize connection
sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

// listener
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
