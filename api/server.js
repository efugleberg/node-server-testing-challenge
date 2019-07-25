const express = require('express')

const Players = require('../players/playersModel.js');

const server = expres()

server.use(express.json());





module.exports = server;