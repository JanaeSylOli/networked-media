// server.js
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Multer setup for file uploads
const upload = multer({ dest: 'public/upload/' });

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Mock database
let posts = [];
let leaderboard = [
    { username: 'ShadowLurker', score: 150 },
    { username: 'ClosetCreeper', score: 120 },
    { username: 'DarkWhisper', score: 100 }
];

// Routes
app.get('/', (req, res) => {
    res.render('index', { allPosts: posts, leaderboard });
});

app.get('/forum', (req, res) => {
    res.render('forum');
});

app.post('/submit', upload.single('image'), (req, res) => {
    const { username, message } = req.body;
    const newPost = {
        username,
        message,
        imageUrl: req.file ? `/upload/${req.file.filename}` : null,
        date: new Date().toLocaleString()
    };
    posts.unshift(newPost);
    res.redirect('/');
});

app.get('/leaderboard', (req, res) => {
    res.render('leaderboard', { leaderboard });
});

app.get('/profile', (req, res) => {
    const userProfile = {
        username: "DarkLurker",  // Replace with dynamic user data
        rank: "Master of Shadows",
        postCount: 10,  // Example number of posts
        score: 250  // Example score
    };
    res.render('profile', userProfile);
});

app.get('/events', (req, res) => {
    const contestants = [
        { username: "ShadowMaster", votes: 230, imageUrl: "/upload/shadow1.jpg" },
        { username: "CreepingPhantom", votes: 185, imageUrl: "/upload/shadow2.jpg" },
        { username: "DarkDweller", votes: 160, imageUrl: "/upload/shadow3.jpg" },
        { username: "MidnightGhoul", votes: 140, imageUrl: "/upload/shadow4.jpg" },
        { username: "SilentPhantom", votes: 130, imageUrl: "/upload/shadow5.jpg" }
    ];
    res.render('events', { contestants });
});

// Server listener
app.listen(port, () => {
    console.log(`Server is live at http://127.0.0.1:${port}`);
});
