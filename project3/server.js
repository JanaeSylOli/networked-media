const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//   storage 
let posts = [];
let challenges = [
    { name: "Ultimate Shadow Stalker", prize: "$100 Amazon Gift Card", id: "shadow-stalker" },
    { name: "Best Hidden Reaction", prize: "Exclusive Boogeyman Hoodie", id: "hidden-reaction" },
    { name: "Master of Disguise", prize: "Mystery Box of Horror Goodies", id: "master-of-disguise" }
];

//  Home Page
app.get("/", (req, res) => {
    let topPosts = [...posts].sort((a, b) => b.votes - a.votes);
    res.render("index", { posts, topPosts, challenges });
});

//  Leaderboard
app.get("/leaderboard", (req, res) => {
    let topPosts = [...posts].sort((a, b) => b.votes - a.votes);
    res.render("leaderboard", { topPosts });
});

// Shadow Talk (Forum)
app.get("/shadow-talk", (req, res) => {
    res.render("forum", { posts });
});

// Submit a Story
app.post("/submit", (req, res) => {
    const { username, message } = req.body;
    if (username && message) {
        posts.push({ username, message, votes: 0, date: new Date().toLocaleString() });
    }
    res.redirect("/shadow-talk");
});

// 🗣 Forum Page (Shadow Talk)
app.get("/forum", (req, res) => {
    res.render("forum", { posts }); // Ensure "posts" is available
});

// Upvote a Story
app.post("/upvote", (req, res) => {
    const postIndex = req.body.postIndex;
    if (postIndex >= 0 && postIndex < posts.length) {
        posts[postIndex].votes++;
    }
    res.redirect("/shadow-talk");
});

//  Events & Prizes
app.get("/events", (req, res) => {
    res.render("events", { challenges });
});

// Individual Challenge Pages
app.get("/challenge/:id", (req, res) => {
    const challenge = challenges.find(ch => ch.id === req.params.id);
    if (!challenge) return res.status(404).send("Challenge Not Found");
    res.render("challenge", { challenge });
});

//  Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
