document.addEventListener('DOMContentLoaded', function (){
    const quotes = [
        {
            text: "The only way to do great work is to love what you do.",
            category: "Motivational"
        },
        {
            text: "In the middle of difficulty lies opportunity.",
            category: "Philosophical"
        },
        {
            text: "Be yourself; everyone else is already taken.",
            category: "Inspirational"
        },
        {
            text: "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
            category: "Motivational"
        },
        {
            text: "You must be the change you wish to see in the world.",
            category: "Inspirational"
        },
        {
            text: "The only limit to our realization of tomorrow will be our doubts of today.",
            category: "Motivational"
        },
        {
            text: "Life is what happens when you're busy making other plans.",
            category: "Philosophical"
        },
        {
            text: "Believe you can and you're halfway there.",
            category: "Inspirational"
        },
        {
            text: "Happiness is not something ready-made. It comes from your own actions.",
            category: "Motivational"
        },
        {
            text: "The best way to predict the future is to create it.",
            category: "Inspirational"
        },
        {
            text: "The only thing we have to fear is fear itself.",
            category: "Motivational"
        },
        {
            text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
            category: "Inspirational"
        }
    ];


    const quoteDisplay = document.getElementById('quoteDisplay');
    const RandQuoteBtn = document.getElementById('newQuote');
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteTextCategory = document.getElementById('newQuoteCategory');
    const addNewQuoteBtn = document.getElementById('addQuoteBtn');

    // this function returns random number from 1 to length of object passed to the it
const randomNum = (obj) => Math.floor(Math.random() * obj.length)


function displayRandomQuote (){

quoteDisplay.innerHTML = ""; //reset the display back to empty
const quote = quotes[randomNum(quotes)] //get a random quote from quotes using my random functio

const header = document.createElement('h2')
header.textContent = quote.category;

const para = document.createElement('p');
para.textContent = quote.text;

quoteDisplay.appendChild(header);
quoteDisplay.appendChild(para);
}

function addQuote(){
    if (newQuoteText.value === "" || newQuoteTextCategory.value === ""){
        alert("scomplete the input");
        return;
    }

    //get input value from input and turn it into a object then save it into newQuote
    const createAddQuoteForm = {
        text : newQuoteText.value,
        category : newQuoteTextCategory.value
    }
    quotes.push(createAddQuoteForm);
    alert(`added to quotes array`);
    newQuoteText.value = "";
    newQuoteTextCategory.value = "";

}

addNewQuoteBtn.addEventListener('click', addQuote);
RandQuoteBtn.addEventListener('click', displayRandomQuote); //when click newQuoteBtn button call function showRandomQuote



})