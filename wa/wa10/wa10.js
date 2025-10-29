const newQuoteBtn = document.querySelector("#js-new-quote");
const quoteText   = document.querySelector("#js-quote-text");
const authorText  = document.querySelector("#js-author-text");

let currentQuote = {
  text: "",
  author: ""
};

const endpoint = "https://quote-generator-api-six.vercel.app/api/quotes/random";

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

function displayQuote(quote, author) {
  quoteText.textContent  = `"${quote}"`;
  authorText.textContent = `– ${author}`;
}

newQuoteBtn.addEventListener("click", getQuote);

getQuote();
