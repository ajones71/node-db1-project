const express = require("express");

const db = require("../data/dbConfig.js");

const accountsRouter = require("../data/accounts.js/accountsRouter")

const server = express();

server.use(express.json());

server.get('/', (req, res)=>{
    res.json({message:"Node DB1 Project Starter Code"})
})
server.use("/api/accounts", accountsRouter)
module.exports = server;
