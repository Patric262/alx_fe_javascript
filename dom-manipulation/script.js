// Initial array of quotes
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "You miss 100% of the shots you don't take.", category: "Inspiration" }
];

// Function to show a random quote
function showRandomQuote() {
    let randomIndex = Math.floor(Math.random() * quotes.length);
    let selectedQuote = quotes[randomIndex];
    let quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `<p>${selectedQuote.text} - <em>${selectedQuote.category}</em></p>`;
}

// Event listener for showing a random quote
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Function to add a new quote
function addQuote() {
    let newQuoteText = document.getElementById("newQuoteText").value;
    let newQuoteCategory = document.getElementById("newQuoteCategory").value;

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        alert("Quote added successfully!");
        document.getElementById("newQuoteText").value = ""; // Clear input fields
        document.getElementById("newQuoteCategory").value = "";
    } else {
        alert("Please enter both a quote and a category.");
    }
}
// Function to dynamically create the form for adding new quotes
function createAddQuoteForm() {
    // Create the container div
    const formContainer = document.createElement('div');
    
    // Create input for the new quote text
    const quoteInput = document.createElement('input');
    quoteInput.setAttribute('id', 'newQuoteText');
    quoteInput.setAttribute('type', 'text');
    quoteInput.setAttribute('placeholder', 'Enter a new quote');
  
    // Create input for the quote category
    const categoryInput = document.createElement('input');
    categoryInput.setAttribute('id', 'newQuoteCategory');
    categoryInput.setAttribute('type', 'text');
    categoryInput.setAttribute('placeholder', 'Enter quote category');
  
    // Create the "Add Quote" button
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.onclick = addQuote; // Set the button's onclick event to the addQuote function
  
    // Append inputs and button to the form container
    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);
  
    // Insert the form into the DOM, after the "Show New Quote" button
    document.body.insertBefore(formContainer, document.getElementById('newQuote').nextSibling);
  }
  
  function addQuote(quote, category) {
    quotes.push({ quote: quote, category: category });
  
    const existingCategories = Array.from(document.getElementById('categoryFilter').options).map(option => option.value);
  
    if (!existingCategories.includes(category)) {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      document.getElementById('categoryFilter').appendChild(option);
    }
  
    filterQuotes(); // Refresh the filtered quotes list
  }
  function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    
    // Save the selected category to localStorage
    localStorage.setItem('selectedCategory', selectedCategory);
    
    const filteredQuotes = quotes.filter(quote => selectedCategory === 'all' || quote.category === selectedCategory);
  
    const quotesContainer = document.getElementById('quotesContainer');
    quotesContainer.innerHTML = ''; // Clear previous quotes
  
    filteredQuotes.forEach(quoteObj => {
      const quoteElement = document.createElement('p');
      quoteElement.textContent = quoteObj.quote;
      quotesContainer.appendChild(quoteElement);
    });
    let quotes = JSON.parse(localStorage.getItem("quotes")) || [
      { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
      { text: "Life is what happens when you're busy making other plans.", category: "Life" },
      { text: "You miss 100% of the shots you don't take.", category: "Inspiration" }
  ];
  // Function to export the quotes array to a JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2); // Convert quotes array to a JSON string
  const dataBlob = new Blob([dataStr], { type: 'application/json' }); // Create a Blob object with the JSON string

  const url = URL.createObjectURL(dataBlob); // Create a download URL for the Blob
  const downloadAnchor = document.createElement('a'); // Create an anchor element

  downloadAnchor.href = url;
  downloadAnchor.download = 'quotes.json'; // Set the file name
  downloadAnchor.click(); // Trigger the download

  URL.revokeObjectURL(url); // Clean up the URL object
}

  }
    