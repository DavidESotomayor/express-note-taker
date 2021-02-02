
const fs = require('fs')
const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000;


// MIDDLEWARES
// In Progress...
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

// HTML Routes
app.get('/notes', (req, res) => {
  res.sendFile( path.join(`${__dirname}/public/notes.html`) )
})

app.get('*', (req,res) => {
  res.sendFile( path.join(`${__dirname}/public/index.html`))
})


//API Routes
app.get('/api/notes', (req,res) => {
  const notes = fs.readFile(`${__dirname}/db/db.json`,(err, data) => {
    if (err) throw err;
    console.log(data);
    return data;
  })
  res.json(notes)
})

app.post('/api/notes', (req,res) => {
  const newNote = req.body
  console.log(newNote);
  res.json(newNote)
})

app.delete('/api/notes', (req,res) => {
  const newNote = req.body

  res.json()
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
})
