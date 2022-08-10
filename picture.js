function State() {
  this.blockIndexSelected = null;
}

var state = new State();

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomPicture() {
  const randomWord = guess_words[getRandom(0, guess_words.length)];

  // clé pexel 563492ad6f9170000100000105f3aa73d49747628e4470501052b204

  fetch(
    `https://api.pexels.com/v1/search?query=${randomWord}&locale=fr-FR&orientation=square`,
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
        console.log(randomWord, data);
        var randomPictureNumber = getRandom(0, data.photos.length);
        const randomPicture = data.photos[0];

        for (var i = 0; i < 9; i++) {
          var newDiv = document.createElement("div");
          newDiv.className = "block";
          newDiv.id = "block-" + i;
          newDiv.onclick = (element) => {
            console.log(element, element.target.id);
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

getRandomPicture();
