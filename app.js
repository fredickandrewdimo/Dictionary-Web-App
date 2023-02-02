// Get the search input element
const inputEl = document.getElementById("search-input");

// Fetch data on Dictionary API
async function searchWord(word) {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();
    updateDescription(data);
  } catch (e) {
    console.log(e);
  }
}

// Function to Render the Specific Data Needed
function updateDescription(data) {
  console.log(data);

  // Get the word
  const searchedword = data[0].word;
  document.getElementById("word").innerText = searchedword;
  console.log(searchedword);

  // Get the phonetic
  const phonetic = data[0].phonetic;
  console.log(phonetic);

  // Get the sound

  // Get the nouns and meanings

  // Get the Synonyms

  // Get the verb meaning and example

  // Get the source url
  const sourceURL = data[0].sourceUrls;
  console.log(sourceURL);
}

// Get the search button element and add click event
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", () => {
  const word = inputEl.value;
  console.log(word);
  searchWord(word);
});
