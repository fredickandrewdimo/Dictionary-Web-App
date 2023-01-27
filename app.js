// const word = "example";

// async function searchWord(word) {
//   try {
//     const response = await fetch(
//       `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
//     );
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// }

// searchWord(word);

const word = "keyboard";

async function searchWord() {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    const data = await response.json();
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

// searchWord();
