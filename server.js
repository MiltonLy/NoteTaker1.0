const express = require('express')
const app = express()
const path = require('path')
const PORT = porcess.env.PORT || 3000

const fs = require('fs')
const notes = require('./db/db.json')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

app.get('/app/notes', (req, res) => {
    res.json(notes.slice(1))
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})


function makeNewNote(body, notesArray) {
    const notes = body;
    if (!Array.isArray(notesArray))
        notesArray = []

    if (notesArray === 0)
        notesArray.push(0)

    body.id = notesArray[0]
    notesArray[0]++

    notesArray.push(notes);
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notesArray, null, 2))

    return notes;
}

app.post('/api/notes', (req, res) => {
    const generateNote = makeNewNote(req.body, notes);
    res.json(generateNote);
})

function deleteNote(id, notesArray) {
    for (i = 0; i < notesArray.length; i++) {
        let noteBlock = notesArray[i]

        if (noteBlock.id == id) {
            notesArray.splice(i, 1)
            fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notesArray, null, 2))
        }
    }

}

app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, allNotes);
    res.json(true)
})

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})