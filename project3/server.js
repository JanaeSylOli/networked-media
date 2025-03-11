const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
const upload = multer({ dest: "public/upload" });

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Data Storage
let leaderboard = [
    { username: "ShadowMaster", score: 500 },
    { username: "CreepingPhantom", score: 420 },
    { username: "DarkDweller", score: 350 }
];

let allPosts = [
    { id: 1, username: "NightWalker", date: "March 10, 2025", message: "Best hiding spot under the stairs!", imageUrl: "", upvotes: 3 }
];

let challenges = [
    { title: "Shadow Stalker", description: "Stay hidden for 30 minutes without being found!", prize: "Cloak of Invisibility" },
    { title: "Hidden Reaction", description: "Don’t react even if someone calls your name!", prize: "Stealth Champion Badge" },
    { title: "Master of Disguise", description: "Blend in with your surroundings like a pro!", prize: "Phantom Mask" }
];

let challengeEntries = [];

// Function to update leaderboard based on upvotes
const updateLeaderboard = () => {
    let userUpvotes = {};

    allPosts.forEach(post => {
        if (!userUpvotes[post.username]) {
            userUpvotes[post.username] = 0;
        }
        userUpvotes[post.username] += post.upvotes;
    });

    leaderboard = Object.keys(userUpvotes).map(username => ({
        username,
        score: userUpvotes[username]
    })).sort((a, b) => b.score - a.score);
};

// Routes
app.get('/', (req, res) => {
    let username = "Guest"; // Default if not set
    res.render('index', { leaderboard, allPosts, username });
})

app.get('/leaderboard', (req, res) => {
    res.render('leaderboard', { leaderboard });
});

app.get('/challenges', (req, res) => {
    res.render('challenges', { challenges, challengeEntries });
});

app.post('/challenges', upload.single("image"), (req, res) => {
    let entry = {
        username: req.body.username,
        challenge: req.body.challenge,
        image: req.file ? "/upload/" + req.file.filename : "",
        story: req.body.story
    };
    challengeEntries.unshift(entry);
    res.redirect('/challenges');
});

app.post('/upvote/:id', (req, res) => {
    let postId = parseInt(req.params.id);
    let post = allPosts.find(p => p.id === postId);

    if (post) {
        post.upvotes += 1;
        updateLeaderboard(); // Update leaderboard based on upvotes
    }

    res.redirect('/');
});

app.get('/forum', (req, res) => {
    res.render('forum', { allPosts });
});

app.post('/forum', upload.single("image"), (req, res) => {
    let newPost = {
        id: allPosts.length + 1,
        username: req.body.username,
        date: new Date().toLocaleString(),
        message: req.body.textMessage,
        imageUrl: req.file ? "/upload/" + req.file.filename : "",
        upvotes: 0
    };
    allPosts.unshift(newPost);
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server running on http://127.0.0.1:3000');
});