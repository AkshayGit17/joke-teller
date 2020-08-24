const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

//Enable/Disable button
function toggleButton() {
  button.disabled = !button.disabled;
}

//Passing joke to VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: "8a3d655917e54436a05a05ae3133881c",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false
  });
}

//Get Jokes from Joke API
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist";
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Something went wrong!!");
    }
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    //Passing Joke to VoiceRSS API
    tellMe(joke);
    //Disable button
    toggleButton();
  } catch (error) {
    console.log("whoops", error.message);
  }
}

//Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
