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

// root route - just serves index.ejs
app.get('/', (req, res) => {
    res.render('index.ejs')
})

// load a user's dino by ID (or send nothing if new)
app.get('/loadDino', (req, res) => {
    const userId = req.query.id
    database.findOne({ id: userId }, (err, data) => {
        if (data) {
            res.json(data)
        } else {
            res.json({}) // blank for new users
        }
    })
})

// create or update dino
app.post('/saveDino', (req, res) => {
    const query = req.query

    const dinoData = {
        id: query.id,
        type: query.type,
        stage: query.stage,
        energy: parseInt(query.energy),
        happiness: parseInt(query.happiness)
    }

    // overwrite if exists
    database.update({ id: query.id }, dinoData, { upsert: true }, (err, newData) => {
        res.redirect('/')
    })
})

// start the server
app.listen(3000, () => {
    console.log('http://127.0.0.1:3000')
})