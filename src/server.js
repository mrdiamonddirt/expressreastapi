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

// express app

app.use(cors());

// socket io connection
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

app.use(express.json());
app.use(userRouter);
// app.use(favoriteRouter);

app.get("/health", (req, res) => {
    res.status(200).send({ message: "API is working" });
});

let connectedUsers = [];
// listen for socket io connection
io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    // get username from client
    const { username, token } = socket.handshake.auth;
    // add user to array of connected users
    connectedUsers = {
        username: username,
        socketId: socket.id,
        token: token,
    };
    console.log("username", username);
    console.log("number of users online", Object.keys(connectedUsers).length);
    socket.on("disconnect", () => {
        console.log("user disconnected");
        // remove user from array of connected users
        console.log(connectedUsers);
        delete connectedUsers[socket.id];
        console.log(
            "number of users online",
            Object.keys(connectedUsers).length
        );
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
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

server.listen(port, () => {
    console.log(`Socket io is running on port ${port}`);
});
