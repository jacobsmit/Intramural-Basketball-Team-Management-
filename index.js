const express = require("express");
const cors = require("cors");
app = express();
const PORT = 8080;

let roster = [];

app.use(cors());
app.use(express.json());

app.get("/api/roster", (req, res) => {
    res.json(roster);
    console.log(roster);
});

app.post("/api/roster/:id", (req, res) => {
    roster.push(req.body);
    res.status(201).json(req.body);
});

app.listen(PORT, () => {
    console.log("Server is running on " + PORT);
});