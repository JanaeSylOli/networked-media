const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Setup Multer for file uploads
const storage = multer.diskStorage({
    destination: "public/uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });

// In-memory storage (resets on server restart)
let forumPosts = [
    { id: 1, username: "GhostHunter", text: "I hid under the stairs, but something was breathing next to me...", votes: 5 },
    { id: 2, username: "DarkSeeker", text: "The closet door creaked open, and I wasn’t the one who opened it.", votes: 8 }
];

let challenges = [
    { id: 1, title: "Best hiding spot in an abandoned house?", deadline: "March 31", prize: "$50 Gift Card", entries: [] },
    { id: 2, title: "Creepiest place to hide in a forest?", deadline: "April 15", prize: "Mystery Horror Box", entries: [] }
];

let leaderboard = [];

// 📌 Homepage
app.get("/", (req, res) => {
    const latestForumPosts = forumPosts.slice(-5);
    const latestChallenge = challenges.length > 0 ? challenges[challenges.length - 1] : null;
    res.render("index", { latestForumPosts, latestChallenge, error: null });
});

// 📌 Forum Page
app.get("/forum", (req, res) => {
    res.render("forum", { forumPosts, error: null });
});

// 📌 Challenges Page
app.get("/challenges", (req, res) => {
    res.render("challenges", { challenges, error: null });
});

// 📌 Leaderboard Page
app.get("/leaderboard", (req, res) => {
    leaderboard = [...forumPosts, ...challenges.flatMap(c => c.entries)]
        .sort((a, b) => b.votes - a.votes)
        .slice(0, 10);
    res.render("leaderboard", { leaderboard });
});

// 📝 Submit a new forum post
app.post("/forum", (req, res) => {
    const username = req.body.username.trim();
    const postText = req.body.postText.trim();

    if (!username || !postText) {
        return res.render("forum", { forumPosts, error: "Username and story cannot be empty!" });
    }

    forumPosts.push({ id: forumPosts.length + 1, username, text: postText, votes: 0 });
    res.redirect("/forum");
});

// ⬆️ Upvote a forum post
app.post("/vote-forum", (req, res) => {
    const postId = parseInt(req.body.postId);
    const post = forumPosts.find(p => p.id === postId);
    if (post) post.votes++;
    res.redirect(req.headers.referer || "/");
});

// 📝 Submit a hiding spot for a challenge (with image upload)
app.post("/challenge-entry", upload.single("image"), (req, res) => {
    const challengeId = parseInt(req.body.challengeId);
    const username = req.body.username.trim();
    const hidingSpot = req.body.hidingSpot.trim();
    const imageFile = req.file;

    if (!username || !hidingSpot || !imageFile) {
        return res.render("challenges", { challenges, error: "All fields are required!" });
    }

    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
        challenge.entries.push({
            id: challenge.entries.length + 1,
            username,
            spot: hidingSpot,
            imageUrl: `/uploads/${imageFile.filename}`, // Path to display image
            votes: 0
        });
    }

    res.redirect("/challenges");
});

// ⬆️ Upvote a challenge entry
app.post("/vote-challenge", (req, res) => {
    const challengeId = parseInt(req.body.challengeId);
    const entryId = parseInt(req.body.entryId);

    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
        const entry = challenge.entries.find(e => e.id === entryId);
        if (entry) entry.votes++;
    }

    res.redirect(req.headers.referer || "/");
});

// Start the server
app.listen(3000, "127.0.0.1", () => {
    console.log("Server running on http://127.0.0.1:3000");
});
