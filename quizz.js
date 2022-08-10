var correctAnswer = null;

async function displayQuestion() {
  document.getElementById("quizz-container").hidden = false;
  document.getElementById("response-gif").hidden = true;
  document.getElementById("button-continue").hidden = true;
  const response = await fetch(
    "https://the-trivia-api.com/api/questions?limit=1&difficulty=easy"
  );
  const question = await response.json();
  document.getElementById("question").innerText = question[0].question;
  var answers = question[0].incorrectAnswers;
  answers.push(question[0].correctAnswer);
  correctAnswer = question[0].correctAnswer;
  answers = answers.sort((a, b) => 0.5 - Math.random());
  for (var i = 0; i < answers.length; i++) {
    document.getElementById(`answer-${i}`).innerText = answers[i];
  }
  document.getElementById("quizz-modal").hidden = false;
}

async function getGifUrl(win) {
    const response = await fetch(
        `https://tenor.googleapis.com/v2/search?q=${
          win ? "win" : "lose"
        }&key=AIzaSyA5S4nC2B2GWeqVeQj5whLWe6VkSdS54go&limit=50`
      );
      const data = await response.json();
      var picture = data.results[getRandom(0,data.results.length)];
      return picture.media_formats.gif.url
}

async function displayGif(win) {
  const url = await getGifUrl(win)
  document.getElementById("button-continue").hidden = false;
  document.getElementById("quizz-container").hidden = true;
  document.getElementById("response-gif").hidden = false;
  document.getElementById("response-gif").src = url;
}

function handleResponse(elt) {
  if (elt.innerText == correctAnswer) {
    document.getElementById(state.blockIndexSelected).style.visibility =
      "hidden";
    displayGif(true);
  } else {
    displayGif(false);
  }
}
