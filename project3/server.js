// 1. library imports
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')

// 2. app settings
const app = express()
const encodedParser = bodyParser.urlencoded({extended: true})
const up = multer({dest: "public/upload"})

app.use(express.static('public')) // setting the static file location to be public (css, front-end js, assets like images)
app.use(encodedParser) // allows express to parse the body of the request (req.body)
app.set("view engine", "ejs") // allows us to use ejs, specifically with render

let myPostArray = []

let p1 = {}
let p2 = {}

// 3. routes
app.get('/', (req, res)=>{
    res.render('index.ejs', {allPosts: myPostArray})
})

app.get('/secret1', (req, res)=>{
    res.render('form.ejs', {link: '/person1'})
})

app.post('/person1', up.fields([{name: "profpic", maxCount: 1}, {name: "media1img", maxCount: 1}]), (req, res)=>{
    console.log(req.body)
    p1.name = req.body.featurename
    // console.log(req.files['profpic'][0].filename)
    if(req.files['profpic']){
        p1.profpic = "upload/" + req.files['profpic'][0].filename
    } 
    if(req.files['media1img']){
        p1.media1Url = "upload/" + req.files['media1img'][0].filename
    }
    p1.media1text = req.body.media1text
    res.redirect('/')
})

app.get('/p1m1', (req, res)=>{
    res.render('media.ejs', {img: p1.mediaUrl, text: p1.media1text})
})
app.get('/p2m1', (req, res)=>{
    res.render('media.ejs', {img: p2.mediaUrl, text: p2.media1text})
})

app.get('/secret2', (req, res)=>{
    res.render('form.ejs', {link: '/person2'})
})

app.post('/upload', up.single("theimage"), (req, res)=>{
    let now = new Date()

    // local temporary post obj that determines the structure of each element in the array
    let post = {
        text: req.body.textMessage,
        date: now.toLocaleString()
    }
    // check if file exists
    if(req.file){
        // add the img location to the post object
        post.imgUrl = "upload/" + req.file.filename
    }

    // adds to the front of the array so the posts will go in order from newest to oldest
    myPostArray.unshift(post)
    // redirect back to the home pages
    res.redirect('/')
})

// 4. listener

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});