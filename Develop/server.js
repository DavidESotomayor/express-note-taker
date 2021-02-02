const fs = require('fs')
const uuid = require('uuid')
const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000;

// MIDDLEWARES
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

//API Routes
app.get('/api/notes', (req,res) => {
  const rawData = fs.readFileSync(`${__dirname}/db/db.json`)
  res.json(JSON.parse(rawData))
})

app.post('/api/notes', (req,res) => {
  let allNotes = JSON.parse(fs.readFileSync(`${__dirname}/db/db.json`, "utf8"));
  let newNote = req.body;
  const uniqueID = uuid.v4();
  newNote.id = uniqueID;
  allNotes.push(newNote);
  fs.writeFileSync(`${__dirname}/db/db.json`, JSON.stringify(allNotes));
  res.json(allNotes);
})

app.delete("/api/notes/:id", function(req, res) {
  let allNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let noteID = req.params.id;
  allNotes = allNotes.filter(currNote => currNote.id != noteID)
  fs.writeFileSync("./db/db.json", JSON.stringify(allNotes));
  res.json(allNotes)
})

// HTML Routes
app.get('/notes', (req, res) => {
  res.sendFile( path.join(`${__dirname}/public/notes.html`) )
})

app.get('*', (req,res) => {
  res.sendFile( path.join(`${__dirname}/public/index.html`))
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
})
