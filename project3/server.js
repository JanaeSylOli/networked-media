const express = require('express');
const path = require('path');
const multer = require('multer'); // For image uploads
const app = express();
const port = 3001;

// Configure image upload storage
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Preloaded forum posts
let forumPosts = [
    {
        username: "OOgala Boogala",
        story: "I was hiding in the hallway, waiting to scare someone... then I sneezed. Busted.",
        image: "/images/hall-way.png",
        votes: 2
    },
    {
        username: "Fresh Boogey 96",
        story: "Thought hiding in the fridge would be cool. Turns out, my glowing eyes gave me away.",
        image: "/images/In-the-fridge.png",
        votes: 5
    },
    {
        username: "Boogeyman Family",
        story: "Family movie night turned into a hide-and-seek fail. We all screamed louder than the humans!",
        image: "/images/bed.png",
        votes: 8
    }
];

let challengeEntries = [
    {
        username: "Masked Phantom",
        story: "Took a selfie before the humans got me. At least I'll go viral in the underworld.",
        image: "/images/Boogeyman_Selfie.png",
        votes: 4
    },
    {
        username: "Skeleton Steve",
        story: "Tried to hide in the closet, but I forgot my bones click when I move. Busted again!",
        image: "/images/closet.png",
        votes: 6
    }
];

// Forum Page 
app.get('/forum', (req, res) => {
    const sortedStories = [...forumPosts].sort((a, b) => b.votes - a.votes);
    res.render('forum', { forumEntries: sortedStories });
});

// Homepage 
app.get('/', (req, res) => {
    const sortedStories = [...forumPosts].sort((a, b) => b.votes - a.votes).slice(0, 5);
    const latestChallengeEntry = challengeEntries.length > 0 ? challengeEntries[challengeEntries.length - 1] : null;
    res.render('index', { forumPosts: sortedStories, latestChallengeEntry, challengeEntries });
});

// Submit a new forum post
app.post('/forum', upload.single('image'), (req, res) => {
    const { username, story } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '/images/default.jpg';
    forumPosts.push({ username, story, image, votes: 0 });
    forumPosts.sort((a, b) => b.votes - a.votes); 
    res.redirect('/');
});

// Upvote forum entry (
app.post('/forum/upvote/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (forumPosts[index]) {
        forumPosts[index].votes++;
        res.json({ votes: forumPosts[index].votes }); 
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

// Challenges Page Route
app.get('/challenges', (req, res) => {
    const challenges = [
        { name: "Best Horror Selfie", deadline: "Oct 31, 2025", prize: "A haunted mirror that whispers your name at night" },
        { name: "Scariest Closet Hiding Spot", deadline: "Nov 15, 2025", prize: "A free one-way ticket to the Boogeyman’s lair" }
    ];
    res.render('challenges', { challenges, challengeEntries });
});

// Submit a challenge entry
app.post('/challenges', upload.single('challengeImage'), (req, res) => {
    const { username, story, challengeName } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '/images/default.jpg';
    challengeEntries.push({ username, story, challengeName, image, votes: 0 });
    challengeEntries.sort((a, b) => b.votes - a.votes);
    res.redirect('/challenges');
});

// Upvote challenge entry
app.post('/challenges/upvote/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (challengeEntries[index]) {
        challengeEntries[index].votes++;
    }
    challengeEntries.sort((a, b) => b.votes - a.votes); 
    res.redirect('back'); 
});

// Leaderboard Page Route
app.get('/leaderboard', (req, res) => {
    const sortedForum = [...forumPosts].sort((a, b) => b.votes - a.votes).slice(0, 5); 
    const sortedChallenges = [...challengeEntries].sort((a, b) => b.votes - a.votes).slice(0, 5); 
    res.render('leaderboard', { sortedForum, sortedChallenges });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});
