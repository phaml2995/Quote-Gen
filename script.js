const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterButton = document.querySelector("#twitter");
const quoteButton = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

//Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get quote from API
async function getQuote() {
    loading();
    const proxyUrl = 'https://whispering-island-52717.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const res = await fetch(proxyUrl + apiUrl);
        const data = await res.json();
        if (data.quoteAuthor === '') {
            authorText.innerText = "--Unknown";
        } else {
            authorText.innerText = "--" + data.quoteAuthor;
        }

        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        //Stop loading, show quote
        complete();
    } catch (error) {
        getQuote();
        console.log('Whoops!! Something went wrong',error)
    }
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
quoteButton.addEventListener("click",getQuote);
twitterButton.addEventListener("click",tweetQuote);

getQuote();
