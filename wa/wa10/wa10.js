// Select DOM elements
const newQuoteBtn = document.querySelector("#js-new-quote");
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
    // Disable button while loading
    newQuoteBtn.disabled = true;
    quoteText.textContent = "Loading…";
    authorText.textContent = "";

    // Fetch quote from API
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(response.statusText);

    const json = await response.json();
    const quote  = json.quote;
    const author = json.category || "Unknown";

    // Display quote
    displayQuote(quote, author);
    currentQuote.text   = quote;
    currentQuote.author = author;

  } catch (err) {
    console.error(err);
    quoteText.textContent  = "Failed to fetch a new quote.";
    authorText.textContent = "";
  } finally {
    // Re-enable button
    newQuoteBtn.disabled = false;
  }
}

// Display quote in HTML
function displayQuote(quote, author) {
  quoteText.textContent  = `"${quote}"`;
  authorText.textContent = `– ${author}`;
}

// Event listener for button
newQuoteBtn.addEventListener("click", getQuote);

// Load a quote immediately on page load
getQuote();
