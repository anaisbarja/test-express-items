// 1. Setup
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 2. Routes
app.get("/hello", (req, res) => {
    res.send("hi");
});

const apiRouter = require("./api");
app.use("/api", apiRouter);

// 3. Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT} :D`);
});