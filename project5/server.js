const express = require('express')
const nedb = require('@seald-io/nedb')

const app = express()
app.use(express.static('public'))
app.set('view engine', 'ejs')

// setup database
let database = new nedb({
    filename: 'dinos.txt',
    autoload: true
})

/
app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/loadDino', (req, res) => {
    const userId = req.query.id
    database.findOne({ id: userId }, (err, data) => {
        if (err) {
            console.error('Error loading dino:', err)
            return res.json({})
        }
        res.json(data || {}) 
    })
})

// create or update a dino
app.post('/saveDino', (req, res) => {
    const query = req.query

    const dinoData = {
        id: query.id,
        name: query.name || '',
        type: query.type,
        color: query.color,
        stage: parseInt(query.stage),
        energy: parseInt(query.energy),
        happiness: parseInt(query.happiness),
        boredom: parseInt(query.boredom),
        dead: query.dead === 'true'
    }
    database.update({ id: query.id }, dinoData, { upsert: true }, (err, numReplaced) => {
        if (err) {
            console.error('Error saving dino:', err)
            res.status(500).send('Error saving dino.')
        } else {
            res.status(200).send('Dino saved successfully.')
        }
    })
})

// start the server
app.listen(3000, () => {
    console.log('Server running at http://127.0.0.1:3000')
})
