
let word = null
let input = ""

function State() {
  this.blockIndexSelected = null;
}

var state = new State();

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateEmptyWord() {
  const container = document.getElementById("letters-answer-container")
  console.log(container)
  container.innerHTML = ""
  for(var i = 0; i<word.length; i++) {
    container.innerHTML += `<span id="letters-answer-${i}" class="letters-answer"></span>`
  }
}

function getRandomPicture() {
  word = guess_words[getRandom(0, guess_words.length)];
  generateEmptyWord()
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
  console.log({word,input})
  if(input.length > word.length) {
    return
  }
  for (var i=0; i<word.length; i++) {
    if(i < input.length) {
      document.getElementById(`letters-answer-${i}`).innerText = input[i]
      continue
    }
    document.getElementById(`letters-answer-${i}`).innerText = ""
  }
}

function checkInput() {
  if (word.length != input.length) {
    return
  }
  if(word.toLowerCase().normalize() == input.toLowerCase().normalize()) {
    document.getElementById("picture-name-response").innerText = "Bravo !"
    return
  }
  document.getElementById("picture-name-response").innerText = "Tu es un looser !"
}

document.addEventListener('keyup', (event) => {
  if (event.key == "Backspace") {
    input = input.slice(0,-1)
  }
  else if (event.key == "Enter"){
    checkInput()
    return
  }
  else if (input.length < word.length && event.key.match(/^[A-Za-z]$/) ) {
    input += event.key
  }
  displayInput()
});

getRandomPicture();
