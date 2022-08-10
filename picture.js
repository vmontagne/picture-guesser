let word = null;
let input = "";

function hideModal() {
  document.getElementById("quizz-modal").hidden = true;
}

hideModal();

function State() {
  this.blockIndexSelected = null;
}

var state = new State();

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateEmptyWord() {
  const container = document.getElementById("letters-answer-container");
  console.log(container);
  container.innerHTML = "";
  for (var i = 0; i < word.length; i++) {
    container.innerHTML += `<span id="letters-answer-${i}" class="letters-answer"></span>`;
  }
}

function getRandomPicture() {
  word = guess_words[getRandom(0, guess_words.length)];
  generateEmptyWord();
  // clé pexel 563492ad6f9170000100000105f3aa73d49747628e4470501052b204

  fetch(
    `https://api.pexels.com/v1/search?query=${word}&locale=fr-FR&orientation=square`,
    {
      headers: {
        Authorization:
          "563492ad6f9170000100000105f3aa73d49747628e4470501052b204",
      },
    }
  ).then(function (response) {
    response.json().then((data) => {
      if (data.total_results === 0) {
        getRandomPicture();
      } else {
        // success
        console.log(word, data);
        randomPictureNumber = getRandom(0, data.photos.length);
        const randomPicture = data.photos[0];

        for (var i = 0; i < 9; i++) {
          var newDiv = document.createElement("div");
          newDiv.className = "block";
          newDiv.id = "block-" + i;
          newDiv.onclick = (element) => {
            displayQuestion();
            state.blockIndexSelected = element.target.id;
          };
          document.getElementById("picture").appendChild(newDiv);
        }
        document.getElementById(
          "picture"
        ).style.backgroundImage = `url(${randomPicture.src.large}`;
      }
    });
  });
}

function displayInput() {
  console.log({ word, input });
  if (input.length > word.length) {
    return;
  }
  for (var i = 0; i < word.length; i++) {
    if (i < input.length) {
      document.getElementById(`letters-answer-${i}`).innerText = input[i];
      continue;
    }
    document.getElementById(`letters-answer-${i}`).innerText = "";
  }
}

async function checkInput() {
  if (word.length != input.length) {
    return;
  }
  if(word.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "") == input.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")) {
    document.getElementById("picture-name-response").innerText = "Bravo !"
    clearInterval(timerInterval)
    document.getElementById("solution").innerHTML=`<p>The solution is : ${word}</p>`
    const seconds = timer % 60
    const minutes = (timer - seconds) / 60
    document.getElementById("solution-timer").innerHTML=`<p>Time passed : ${minutes<10 ? "0"+minutes : minutes}:${seconds<10?"0"+seconds:seconds}</p>`
    const url = await getGifUrl(true)
    document.getElementById('success-modal-gif').src=url
    document.getElementById("success-modal").hidden=false
    return
  }
  const failedAttemptsContainers = document.getElementsByClassName("failed-attempts-container")
  var failedAttempt = document.createElement("p");
  failedAttempt.className = "failed-attempts-item"
  failedAttempt.innerText = input
  for (var i=0; i<failedAttemptsContainers.length; i++){
    // failedAttemptsContainers[i].innerHTML(failedAttempt.cloneNode())
    failedAttemptsContainers[i].innerHTML+= `<p class="failed-attempts-item">${input}</p>`
  }
  input=""
  displayInput()
}

document.addEventListener('keyup', (event) => {
  if (event.key == "Backspace") {
    input = input.slice(0,-1)
  }
  else if (event.key == "Enter"){
    checkInput()
    return
  }
  else if (input.length < word.length && event.key.match(/^[A-Za-zÀ-ž]$/) ) {
    input += event.key
  }
  displayInput()
});


getRandomPicture();

var timer = 0
function displayTimer () {
  const seconds = timer % 60
  const minutes = (timer - seconds) / 60
  document.getElementById("timer").innerText = `${minutes<10 ? "0"+minutes : minutes}:${seconds<10?"0"+seconds:seconds}`
}

const timerInterval = setInterval(() => {
  timer += 1
  displayTimer()
}, 1000);
