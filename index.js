const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
app = express();
const PORT = 8080;

mongoose.connect('mongodb+srv://jacobsmit:Rupert2003@trog-management.e5rdlrf.mongodb.net/trog-data',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const playerSchema = new mongoose.Schema({
    id: String,
    name: String,
    role: String,
    height: String,
    weight: String,
    age: String,
    accolades: String,
    contact: String
});

const Player = mongoose.model("Player", playerSchema);

const recordSchema = new mongoose.Schema({
    won: Number,
    lost: Number
});

const Record = mongoose.model("Score", recordSchema);

app.use(cors());
app.use(express.json());

app.get("/api/record", async (req, res) => {
    try {
        const record = await Record.find()
        res.json(record);
    }
    catch(error) {
        res.status(500).json({ error: "Error fetching score" });
    }
});

app.post("/api/record", async (req, res) => {
    try {
        newScore = new Record({
            won: req.body.won,
            lost: req.body.lost
        })
        updatedScore = await newScore.save();
        res.status(201).json(updatedScore);
    }
    catch(error) {
        res.status(500).json({ error: "Error updating score" });
    }
    record = req.body;
    res.status(200).json(record);
});

app.put("/api/record", async (req, res) => {
    try {
        updatedScore = await Record.findOneAndUpdate(
            {},
            req.body,
            { new: true }
        );

        if (updatedScore) {
            res.status(200).json(updatedScore);
        }
        else {
            res.status(400).json({ message: `score unable to be updated` });
        }
    }
    catch(error) {
        res.status(500).json({ error: "Error updating score" });
    }
    record = req.body;
    res.status(200).json(record);
});

app.get("/api/roster", async (req, res) => {
    try {
        const players = await Player.find();
        res.json(players);
    }
    catch(error) {
        res.status(500).json({ error: "Error fetching roster" });
    }
});

app.post("/api/roster/:id", async (req, res) => {
    const newPlayer = new Player({
        id: req.params.id,
        ... req.body
    })
    try {
        const createdPlayer = await newPlayer.save();
        res.status(201).json(createdPlayer);
    }
    catch(error) {
        res.status(500).json({ error: "Error creating player" });
    }
});

app.put("/api/roster/:id", async (req, res) => {
    try {
        const updatedPlayer = await Player.findOneAndUpdate(
            {id: req.params.id}, 
            req.body,
            {new: true}
        );

        if (updatedPlayer) {
            res.status(200).json(updatedPlayer);
        }
        else {
            res.status(400).json({ message: `player ${req.params.id} unable to be found` });
        }
    }
    catch(error) {
        res.status(500).json({ error: "Error updating player" });
    }
});

app.delete("/api/roster/:id", async (req, res) => {
    try {
        const deletedPlayer = await Player.findOneAndDelete({ id: req.params.id });
        if (deletedPlayer) {
            res.status(200).json(deletedPlayer);
        }
        else {
            res.status(400).json({ message: `player ${req.params.id} unable to be found` });
        }
    }
    catch(error) {
        res.status(500).json({ error: "Error deleting player" });
    }
});

app.listen(PORT, () => {
    console.log("Server is running on " + PORT);
});