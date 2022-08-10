console.log("quizz!");

var correctAnswer = null;

async function displayQuestion() {
  const response = await fetch(
    "https://the-trivia-api.com/api/questions?limit=1&difficulty=easy"
  );
  const question = await response.json();
  document.getElementById("quizz-response-container").hidden = true;
  document.getElementById("quizz-container").hidden = false;
  document.getElementById("question").innerText = question[0].question;
  var answers = question[0].incorrectAnswers;
  answers.push(question[0].correctAnswer);
  correctAnswer = question[0].correctAnswer;
  answers = answers.sort((a, b) => 0.5 - Math.random());
  for (var i = 0; i < answers.length; i++) {
    document.getElementById(`answer-${i}`).innerText = answers[i];
  }
}

function handleResponse(elt) {
  console.log(elt);
  console.log(
    "hide",
    state.blockIndexSelected,
    document.getElementById(state.blockIndexSelected)
  );
  if (elt.innerText == correctAnswer) {
    document.getElementById("quizz-response").innerText = "OK";
    document.getElementById(state.blockIndexSelected).style.visibility =
      "hidden";
  } else {
    document.getElementById("quizz-response").innerText = "KO";
  }
  document.getElementById("quizz-container").hidden = true;
  document.getElementById("quizz-response-container").hidden = false;
}
