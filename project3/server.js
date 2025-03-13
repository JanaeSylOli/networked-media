const express = require('express');
const path = require('path');
const multer = require('multer'); // For image uploads
const app = express();
const port = 3000;

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
        username: "Boogeyman #1",
        story: "I was hiding in the hallway, waiting to scare someone... then I sneezed. Busted.",
        image: "/images/hall-way.png",
        votes: 2
    },
    {
        username: "Boogeyman #2",
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

// Forum Page Route
app.get('/forum', (req, res) => {
    res.render('forum', { forumEntries: forumPosts });
});

// Homepage Route
app.get('/', (req, res) => {
    const sortedStories = [...forumPosts].sort((a, b) => b.votes - a.votes).slice(0, 5);
    res.render('index', { forumPosts: sortedStories });
});

// Submit a new forum post
app.post('/forum', upload.single('image'), (req, res) => {
    const { username, story } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '/images/default.jpg';
    forumPosts.push({ username, story, image, votes: 0 });
    forumPosts.sort((a, b) => b.votes - a.votes); // Keep highest votes first
    res.redirect('/');
});

// Upvote forum entry (updates both index and forum)
app.post('/forum/upvote/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (forumPosts[index]) {
        forumPosts[index].votes++;
    }
    forumPosts.sort((a, b) => b.votes - a.votes); // Keep highest votes first
    res.redirect('/');
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
    const { username, story } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '/images/default.jpg';
    challengeEntries.push({ username, story, image, votes: 0 });
    challengeEntries.sort((a, b) => b.votes - a.votes);
    res.redirect('/challenges');
});
