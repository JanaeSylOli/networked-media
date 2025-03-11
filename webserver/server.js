const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const port = 5555;

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Multer for file uploads
const upload = multer({ dest: 'public/upload' });

// User data storage
let users = [];
let posts = [];
let challenges = [
    { 
        title: "Darkest Hideout", 
        description: "Find the darkest spot to hide.", 
        deadline: "March 20, 2025",
        prize: "A custom shadow cloak that makes you disappear in the dark."
    },
    { 
        title: "Creepiest Closet", 
        description: "Show us the scariest closet hiding spot.", 
        deadline: "March 25, 2025",
        prize: "The title of 'Master of the Closet Realm' + a secret spooky surprise."
    }
];
let submissions = [];

// Routes
app.get('/', (req, res) => {
    res.render('index', { users, posts });
});

app.get('/leaderboard', (req, res) => {
    res.render('leaderboard', { users, posts });
});

app.get('/forum', (req, res) => {
    res.render('forum', { posts });
});

app.get('/challenges', (req, res) => {
    res.render('challenges', { challenges, submissions });
});

app.post('/join-challenge', (req, res) => {
    const challengeTitle = req.body.challengeTitle;
    res.redirect('/challenges');
});

app.post('/submit-challenge', upload.single('image'), (req, res) => {
    let newSubmission = {
        id: submissions.length + 1,
        username: req.body.username,
        challengeTitle: req.body.challengeTitle,
        description: req.body.description,
        date: new Date().toLocaleString(),
        imgUrl: req.file ? `upload/${req.file.filename}` : null,
        votes: 0
    };
    submissions.unshift(newSubmission);
    res.redirect('/challenges');
});

app.post('/vote-challenge', (req, res) => {
    const submissionId = parseInt(req.body.submissionId);
    let submission = submissions.find(sub => sub.id === submissionId);
    if (submission) {
        submission.votes++;
    }
    res.redirect('/challenges');
});

app.listen(port, () => {
    console.log(`Server is live at http://127.0.0.1:${port}`);
});
