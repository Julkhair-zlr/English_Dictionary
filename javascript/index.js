const inputEle = document.getElementById("input");

const infoText = document.getElementById("info-text");

const meaningContainerEl = document.getElementById("meaning-container");

const titleEl = document.getElementById("title");

const meaningEl = document.getElementById("meaning");

const exampleEl = document.getElementById("example");

const audioEl = document.getElementById("audio");

inputEle.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    getDataFromApi(e.target.value);
  }
});

const getDataFromApi = async (word) => {
  try {
    infoText.style.display = "block";
    inputEle.innerText = `Searching the Meaning of :: "${word}".`;
    const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const res = await fetch(API_URL).then((e) => e.json());

    if (res.title) {
      meaningContainerEl.style.display = "block";
      infoText.style.display = "none";
      titleEl.innerText = word;
      meaningEl.innerText = "N/A";
      exampleEl.innerText = `We don't have a Example to "${word}".`;
      audioEl.style.display = "none";
    } else {
      infoText.style.display = "none";
      meaningContainerEl.style.display = "block";
      audioEl.style.display = "inline-flex";
      titleEl.innerText = res[0].word;
      meaningEl.innerText = res[0].meanings[0].definitions[0].definition;
      exampleEl.innerText =
        res[0].meanings[0].definitions[0].example ||
        `We don't have a Example to "${word}".`;
      if (res[0].phonetics[0].audio) {
        audioEl.src = res[0].phonetics[0].audio;
      } else {
        audioEl.style.display = "none";
      }
    }
  } catch (error) {
    console.log(error.message);
    inputEle.innerText = `An error happened, try again later...`;
  }
};
