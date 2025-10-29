// Select DOM elements
const newQuoteBtn = document.querySelector("#js-new-quote");
const tweetBtn    = document.querySelector("#js-tweet");
const quoteText   = document.querySelector("#js-quote-text");
const authorText  = document.querySelector("#js-author-text");

// Store current quote
let currentQuote = {
  text: "",
  author: ""
};

// API endpoint (CORS-friendly)
const endpoint = "https://quote-generator-api-six.vercel.app/api/quotes/random";

// Fetch a new quote
async function getQuote() {
  try {
    newQuoteBtn.disabled = true;
    quoteText.textContent = "Loading…";
    authorText.textContent = "";

    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(response.statusText);

    const json = await response.json();
    const quote  = json.quote;
    const author = json.category || "Unknown";

    displayQuote(quote, author);
    currentQuote.text   = quote;
    currentQuote.author = author;

  } catch (err) {
    console.error(err);
    quoteText.textContent  = "Failed to fetch a new quote.";
    authorText.textContent = "";
  } finally {
    newQuoteBtn.disabled = false;
  }
}

// Display quote in HTML
function displayQuote(quote, author) {
  quoteText.textContent  = `"${quote}"`;
  authorText.textContent = `– ${author}`;
}

// Share quote on Twitter
function shareQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${currentQuote.text}" – ${currentQuote.author}`)}`;
  window.open(twitterUrl, "_blank");
}

// Event listeners
newQuoteBtn.addEventListener("click", getQuote);
tweetBtn.addEventListener("click", shareQuote);

// Load a quote immediately on page load
getQuote();