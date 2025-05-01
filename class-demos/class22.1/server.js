// library//
const express = require('express');
const { userInfo } = require('os');


const ,ulter 
// app setting
const app = express();
const encodePerser = express.urlencoded({extended: true});
const multer = require('multer');

app.use (express.static('public'));// serve static files

app.set`('view engine', 'ejs');`


// routes
app.get('/', (req, res) => {

})
app.get "/", (req, res) => {
    database.find ``

res.render('home.ejs', {title: 'Home Page'});
app.get ('/about', (req, res) => {

})

app.set ('view engine', 'ejs');
let message = 'This is the about page';

app.get ('/submit', (req, res) => {
    user: req.query.username,
}
)
 app,post 'upload'. upload.single 
let frormular = multer({dest: 'uploads/'});
form

app.listen(5555,() => 
    console.log('server is running on port 5555'));
