import 'dotenv/config';
import { createRestAPIClient } from "masto";
import fetch from "node-fetch"; // Now installed ✅

// Connect to your Mastodon app using .env secrets
const masto = createRestAPIClient({
  url: process.env.URL,
  accessToken: process.env.TOKEN,
});

// Fetch a dad joke
const response = await fetch('https://icanhazdadjoke.com/', {
  headers: { Accept: 'application/json' }
});
const data = await response.json();
const joke = data.joke;

// Post the joke
const status = await masto.v1.statuses.create({
  status: ` Joke of the Day:\n${joke}`
});

console.log("Joke posted:", status.url);
