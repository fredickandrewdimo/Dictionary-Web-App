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
  // Get the word
  const searchedword = data[0].word;
  document.getElementById("word").innerText = searchedword;

  // Get the phonetic
  const phonetic = data[0].phonetic;
  document.getElementById("phonetic").innerText = phonetic;

  // Get the sound
  const phonetics = data[0].phonetics;
  phonetics.forEach((phonetic) => {
    if (phonetic.audio.length > 0) {
      const audioURL = phonetic.audio;
      const audioElement = document.getElementById("audio-element");
      audioElement.src = audioURL;

      document.getElementById("play-btn").addEventListener("click", () => {
        audioElement.play();
      });
      return;
    }
  });

  // NOUNS

  // Get the nouns and meanings
  const meanings = data[0].meanings;

  let nounDefinitions;
  let nounSynonyms;

  meanings.forEach((meaning) => {
    if (meaning.partOfSpeech === "noun") {
      nounDefinitions = meaning.definitions;
      nounSynonyms = meaning.synonyms;
    }
  });

  const meaningList = document.getElementById("meaning-list");

  while (meaningList.firstChild) {
    meaningList.removeChild(meaningList.firstChild);
  }

  nounDefinitions.forEach((nounDefinition) => {
    const list = document.createElement("li");
    list.innerText = nounDefinition.definition;
    meaningList.appendChild(list);
  });

  // Get the Synonyms of nouns
  const synonymsList = document.getElementById("synonyms-list");

  while (synonymsList.firstChild) {
    synonymsList.removeChild(synonymsList.firstChild);
  }

  nounSynonyms.forEach((nounSynonym) => {
    const list = document.createElement("p");
    list.innerText = nounSynonym;
    synonymsList.appendChild(list);
  });

  // VERB

  // Get the verb meaning and example
  let verbDefinitions;
  let verbDefinition;
  let verbExample;

  meanings.forEach((meaning) => {
    if (meaning.partOfSpeech === "verb") {
      verbDefinitions = meaning.definitions;

      verbDefinition = verbDefinitions[0].definition;
      verbExample = verbDefinitions[0].example;
    }
  });

  const verbMeaningList = document.getElementById("meaning-list-verb");
  // REMOVE EXISITING FIRST CHILD
  while (verbMeaningList.firstChild) {
    verbMeaningList.removeChild(verbMeaningList.firstChild);
  }

  // VERB LIST
  const verbList = document.createElement("li");
  verbList.innerText = verbDefinition;
  verbMeaningList.appendChild(verbList);

  // VERB LIST EXAMPLE
  // const verbExampleList = document.createElement("p");
  // verbExampleList.classList.add("text-gray-500");
  // verbExampleList.innerText = `"${verbExample}"`;
  // verbList.appendChild(verbExampleList);

  // Get the source url
  const sourceURL = data[0].sourceUrls;
  const sourceUrlEL = document.getElementById("source-url");
  sourceUrlEL.innerText = sourceURL;
  sourceUrlEL.href = sourceURL;
  // Get the souce url button
  document.getElementById("source-url-btn").href = sourceURL;
}

// Get the search button element and add click event
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", () => {
  const word = inputEl.value;
  searchWord(word);
  inputEl.value = "";
});
