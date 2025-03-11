const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
const upload = multer({ dest: "public/upload" });

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// ✅ In-memory storage for tracking users and their activity
let users = {};
let leaderboard = [];
let posts = [];
let challengeEntries = [];

// ✅ Middleware: Track user sessions
app.use((req, res, next) => {
    let username = req.query.user || "Guest";
    if (!users[username]) {
        users[username] = { posts: 0, votes: 0, score: 0 };
        leaderboard.push({ username, score: 0 });
    }
    req.user = users[username];
    req.username = username;
    next();
});

// ✅ Home Route (Passes user & posts)
app.get('/', (req, res) => {
    res.render('index', { user: req.user, username: req.username, leaderboard, posts });
});

// ✅ Leaderboard Route
app.get('/leaderboard', (req, res) => {
    leaderboard.sort((a, b) => b.score - a.score);
    res.render('leaderboard', { leaderboard });
});

// ✅ Events Page (Challenges)
app.get('/events', (req, res) => {
    res.render('events', { challengeEntries });
});

// ✅ Forum Page (Discussions)
app.get('/forum', (req, res) => {
    res.render('forum', { posts });
});

// ✅ Submit a Forum Post
app.post('/forum', upload.single("image"), (req, res) => {
    let newPost = {
        id: posts.length + 1,
        username: req.username,
        date: new Date().toLocaleString(),
        title: req.body.title,
        message: req.body.textMessage,
        image: req.file ? "/upload/" + req.file.filename : "",
        votes: 0
    };
    posts.unshift(newPost);
    users[req.username].posts += 1;
    res.redirect('/forum');
});

// ✅ Upvote a Post
app.post('/upvote/:id', (req, res) => {
    let post = posts.find(p => p.id == req.params.id);
    if (post) {
        post.votes += 1;
        users[post.username].score += 10;
    }
    res.redirect('/forum');
});

// ✅ Start Server
app.listen(3000, () => {
    console.log('Server running on http://127.0.0.1:3000');
});