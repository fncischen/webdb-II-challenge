const express = require('express');
const helmet = require('helmet');

const server = express();

const db = require("./data/dBConfig.js");

server.use(express.json());
server.use(helmet());

// endpoints here
server.post("/api/zoos", (req, res) => {
  if (!req.body.name) {
    return res.status(404).json({message: "The name is missing from the database."})
  }
  else{
      db.insert(req.body)
      .into('zoos')
      .then(id => res.status(201).json(id))
      .catch(err => res.json(500).json(err));
  }

})

server.get("/api/zoos", (req, res) => {
  db('zoos')
    .then((zoos) => res.status(200).json(zoos))
    .catch(() => res.json(500).json({message: "There was an error from retrieving your data"}))
})

server.get("/api/zoos/:id", (req, res) => {
  db('zoos')
    .where({id: req.params.id})
    .then(zoos => res.status(200).json(zoos))
    .catch(() => res.json(500).json({message: "There was an error from retrieving your data"}))
})

// to review: https://knexjs.org/#Builder-del%20/%20delete
server.delete("/api/zoos/:id", (req, res) => {
  db('zoos')
  .where({id: req.params.id})
  .del()
  .then(count => res.json(200).json({"Amount of records deleted": count}))
  .catch(() => res.json(500).json({message: "There was an error from deleting your data"}))
})

server.put("/api/zoos/:id", (req, res) => {
  db('zoos')
    .where({id: req.params.id})
    .update(req.body)
    .then(count => res.json(200).json({"Amount of records updated": count}))
    .catch(err => json.status(500).json(err));
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
