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
      console.log(data);
      // todo handle when no result
      var randomPictureNumber = getRandom(0, data.photos.length);
      const randomPicture = data.photos[0];
      document.getElementById("picture").src = randomPicture.src.large;
      console.log(randomWord, randomPicture);
    });
  });
}

getRandomPicture();
