// server.js

const express = require('express')
const nedb = require('@seald-io/nedb')

const app = express()

// Serve static files (HTML, CSS, JS, assets)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Set EJS as the templating engine
app.set('view engine', 'ejs')

// Setup the NeDB database for storing dinos
const database = new nedb({
    filename: 'dinos.txt',
    autoload: true
})

// Route: Home page
app.get('/', (req, res) => {
    res.render('index.ejs')
})

// Route: Load a dino based on its unique ID
app.get('/loadDino', (req, res) => {
    const userId = req.query.id
    if (!userId) {
        return res.json({})
    }

    database.findOne({ id: userId }, (err, data) => {
        if (err) {
            console.error('Error loading dino:', err)
            return res.json({})
        }
        res.json(data || {}) // Return empty object if not found
    })
})

// Route: Save or update a dino
app.post('/saveDino', (req, res) => {
    const query = req.query

    // Sanitize and prepare dino data
    const dinoData = {
        id: query.id,
        type: query.type,
        color: query.color,
        stage: parseInt(query.stage),
        energy: parseInt(query.energy),
        happiness: parseInt(query.happiness),
        boredom: parseInt(query.boredom),
        dead: query.dead === 'true'
    }

    // Upsert: Insert new or update existing dino
    database.update({ id: query.id }, dinoData, { upsert: true }, (err) => {
        if (err) {
            console.error('Error saving dino:', err)
            return res.status(500).send('Error saving dino.')
        }
        res.status(200).send('Dino saved successfully.')
    })
})

// Start server on port 3000
app.listen(3000, () => {
    console.log('Server running at http://127.0.0.1:3000')
})