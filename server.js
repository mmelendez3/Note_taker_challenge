const express = require('express')
const app = express()
const { notes } = require('./db/db');
const fs = require('fs');
const path = require('path');

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());



//function to accept POST route's req.body value and the array we want to add the data to.
function createNewNote(body, notesArray) {
    console.log(body);
    // our function's main code will go here!
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
      );
    
    // return finished code to post route for response
    return note;
  }


app.get('/api/notes', (req, res) => {
    let results = notes;
    console.log(req.query)
    res.json(results);
  });



app.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be
  req.body.id = notes.length.toString();

  // add notes to json file and notes array in this function
  const note = createNewNote(req.body, notes);
    
    res.json(note);
  });



  app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  })