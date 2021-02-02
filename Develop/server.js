const fs = require('fs')
const uuid = require('uuid')
const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000;

// MIDDLEWARES
// In Progress...
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

//API Routes
app.get('/api/notes', (req,res) => {
  const rawData = fs.readFileSync(`${__dirname}/db/db.json`)
  res.json(JSON.parse(rawData))
})

app.post('/api/notes', (req,res) => {
  let savedNotes = JSON.parse(fs.readFileSync(`${__dirname}/db/db.json`, "utf8"));
  let newNote = req.body;
  const uniqueID = uuid.v4();
  newNote.id = uniqueID;
  savedNotes.push(newNote);

  fs.writeFileSync(`${__dirname}/db/db.json`, JSON.stringify(savedNotes));
  res.json(savedNotes);
})

app.delete('/api/notes', (req,res) => {
  const newNote = req.body

  res.json()
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
