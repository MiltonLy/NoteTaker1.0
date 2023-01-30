const express = require('express')
const app = express()
const path = require('express')
const PORT = 3000

const fs = require('fs')
const notes = reqire('./db/db.json')

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

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})