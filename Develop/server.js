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
  const notes = fs.readFile(`${__dirname}/db/db.json`,(err, data) => {
    if (err) throw err;
    console.log(data);
    return data;
  })
  res.json(notes)
})

app.post('/api/notes', (req,res) => {
  const newNote = req.body
  const id = uuid.v4();
  const data = {...newNote, id};
  try {
    fs.appendFile(`${__dirname}/db/db.json` , JSON.stringify(data), (err) => {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });
    res.json(data);
  } catch (error) {
    res.json(error).status(400)
  }
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
