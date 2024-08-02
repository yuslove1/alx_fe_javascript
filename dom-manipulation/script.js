document.addEventListener('DOMContentLoaded', function () {
    let quotes = [
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


    const storageQuotes = localStorage.getItem('quotesKey')
    if (storageQuotes === null) {
        saveToLocal(quotes);
    }


    const quoteDisplay = document.getElementById('quoteDisplay');
    const RandQuoteBtn = document.getElementById('newQuote');
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');
    const addNewQuoteBtn = document.getElementById('addQuoteBtn');
    const exportQuotes = document.getElementById('exportJson');
    const importJson = document.getElementById('importFile');
    const categoryFilter = document.getElementById('categoryFilter');

    // this function returns random number from 1 to length of object passed to the it
    const randomNum = (obj) => Math.floor(Math.random() * obj.length)

    // this funtion display quote in sessionStorage
    function showRandomQuote() {
        const sessionQuote = loadFromSession();
        if (sessionQuote !== "") {
            const header = document.createElement('h2')
            header.textContent = sessionQuote.category;

            const para = document.createElement('p');
            para.textContent = sessionQuote.text;

            quoteDisplay.appendChild(header);
            quoteDisplay.appendChild(para);
        }
    }
    //This function display random quote
    function displayRandomQuote() {
        // quoteDisplay.innerHTML = ""; //reset the display back to empty
        // const quote = quotes[randomNum(quotes)] //get a random quote from quotes using my random functio
        // saveToSession(quote);


        // const sessionQuote = loadFromSession();

        // const header = document.createElement('h2')
        // header.textContent = sessionQuote.category;

        // const para = document.createElement('p');
        // para.textContent = sessionQuote.text;

        // quoteDisplay.appendChild(header);
        // quoteDisplay.appendChild(para);

        quoteDisplay.innerHTML = ""; //reset the display back to empty
        const lastSelectedQuotes = JSON.parse(localStorage.getItem("lastQuotes") || '[]') //retrieve last filtered quotes 
        quotes = lastSelectedQuotes;  //save the last filtered quote into the quote array
        const quote = quotes[randomNum(quotes)] //get a random quote from quotes using my random function
        saveToSession(quote); //save one random quote into session

        const sessionQuote = loadFromSession(); 

        const header = document.createElement('h2')
        header.textContent = sessionQuote.category;

        const para = document.createElement('p');
        para.textContent = sessionQuote.text;

        quoteDisplay.appendChild(header);
        quoteDisplay.appendChild(para);
    }

    function addQuote() {
        // let createAddQuoteForm;
        // if (newQuo.text || newQuo.category) {
        //     createAddQuoteForm = {
        //         text: newQuo.text || "No text provided",
        //         category: newQuo.category || "No category provided"
        //     };
        //     console.log("new code from file", createAddQuoteForm)
        // } else {
        if (newQuoteText.value === "" || newQuoteCategory.value === "") {
            alert("Kindly, complete the input");
            return;
        }
        // Get input value from input and turn it into an object
        createAddQuoteForm = {
            text: newQuoteText.value,
            category: newQuoteCategory.value
        };

        const retrieveData = loadFromLocal();
        quotes = retrieveData;

        console.log("New Quote from input:", createAddQuoteForm);

        quotes.push(createAddQuoteForm);  // Add the new quote to the quotes array
        saveToLocal(quotes); // Update the local storage

        // Clear input fields
        newQuoteText.value = "";
        newQuoteCategory.value = "";
        alert('Added to quotes array');
    }

    //When the user selects a file using the file input element, the change event is triggered.
    function importFromJsonFile(event) {
        const file = event.target.files[0];   //gets the first file selected by the user.
        if (!file) {
            alert("upload a valid Json file")
        }
        const fileReader = new FileReader() //call on the reader API
        fileReader.onload = (event) => { //reader onload event
            const importedQuotes = JSON.parse(event.target.result) //get the result of file target/run by the reader and parse it ba into json
            quotes = loadFromLocal();
            quotes.push(...importedQuotes);
            saveToLocal(quotes);
            alert('Quotes imported successfully!');
            // if (isArrayOfObjects(importedQuotes)){
            //     quotes.push(...importedQuotes); 
            //     console.log("pushing more than 1", quotes)
            // }else{
            // quotes.push(importedQuotes);
            // console.log("push more than 1", quotes)
            // }
            // saveToLocal();
            //      
        }
        fileReader.readAsText(file);
    }

    //this function save to memory
    function saveToLocal(obj) {
        localStorage.setItem("quotesKey", JSON.stringify(obj))
    }
    //This retrive value of the key quote
    function loadFromLocal() {
        return JSON.parse(localStorage.getItem("quotesKey") || '[]');
    }

    function saveToSession(obj) {
        sessionStorage.setItem("singleQuote", JSON.stringify(obj))
    }

    function loadFromSession() {
        return JSON.parse(sessionStorage.getItem("singleQuote") || '[]');
    }

    function exportToJsonFile() {
        const jsonFile = localStorage.getItem("quotesKey") //retrieve quotes in the lS 
        if (!jsonFile) {
            alert("No quote found in the localStorage");
            return;
        }
        const blob = new Blob([jsonFile], { type: 'application/json' }) //create blob object and pass our retrieve data into it

        exportQuotes.href = URL.createObjectURL(blob); //created url that point to the object and attribut to the button
        exportQuotes.download = "Quote.json"; //set the file name
        //    exportJsonBtn.remove() //this remove link created by blob in the meemory
    }

    // function isArrayOfObjects(obj) {
    //     return Array.isArray(obj) && obj.every(item => typeof item === 'object');
    //   }

    // this section extracts the memory quote array unique categorie and populate drop-menu with it
    const exitingQuotes = JSON.parse(localStorage.getItem("quotesKey") || '[]'); //retrive the exiting quotes in the memery
    if (exitingQuotes !== '[]') {
        const categories = exitingQuotes.map(quotes => quotes.category) //use map to get only the category 
        const uniqueCategories = Array.from(new Set(categories)) //get the unique value, using set() method and convert it back to an array

        populateCategories(uniqueCategories)
    }
    //iterate over incoming category and create option for each through for loop 
    function populateCategories(categories) {
        for (let i = 0; i < categories.length; i++) {
            const option = document.createElement('option');
            option.value = categories[i];
            option.textContent = categories[i]

            categoryFilter.append(option);
        }

        // Restore last selected category filter
        const lastCategory = localStorage.getItem("lastCategory");
        if (lastCategory) {
            categoryFilter.value = lastCategory;
        }
    }
   
    // const lastCategory = localStorage.getItem("lastCategory")

    function filterQuotes(event) {
        selectValue = event.target.value;
        localStorage.setItem("lastCategory", (selectValue)); //save the selected value into lacalStorage
        const selectedCategory = JSON.parse(localStorage.getItem("quotesKey") || '[]');
        if (selectValue === "all" || "") {
            quotes = selectedCategory;
        } else {
            quotes = selectedCategory.filter(filterQuote => filterQuote.category.includes(selectValue));   
        }
        localStorage.setItem("lastQuotes", JSON.stringify(quotes));
    }




    addNewQuoteBtn.addEventListener('click', addQuote);
    RandQuoteBtn.addEventListener('click', displayRandomQuote); //when click newQuoteBtn button call function showRandomQuote
    exportQuotes.addEventListener('click', exportToJsonFile);
    importJson.addEventListener('change', importFromJsonFile);
    categoryFilter.addEventListener('change', filterQuotes)

    showRandomQuote()
})