const express = require("express");

const Players = require("../players/playersModel.js");

const server = expres();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.get("/players", (req, res) => {
  Players.getAll()
    .then(player => {
      res.status(200).json(player);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post("/players", async (req, res) => {
  try {
    const { name } = await Players.insert(req.body);
    res.status(201).json({ name });
  } catch (error) {
    res.status(500).json({
      error: "please add player info"
    });
  }
});

server.delete("/players/:id", (req, res) => {
  const { id } = req.params;
  Players.remove(id)
    .then(deleted => {
      res.status(204).json({ message: "player deleted" });
    })
    .catch(error => {
      res.status(500).json({ error: "couldn't delete" });
    });
});

module.exports = server;
