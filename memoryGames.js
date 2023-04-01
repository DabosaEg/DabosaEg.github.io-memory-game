// variables
// define the container
let container = document.getElementById("container");

// define the input text Name
let input = document.getElementById("inputName");

// define the player data info
let playerinfDiv = document.getElementById("playerInfo");

// define the player name
let playerNameSpan = document.getElementById("name");

// define the cards image div
let cardsDiv = document.getElementById("cards");

// define the trails span
let triesSpan = document.getElementById("tries");

// number of the choosen image per try
let imageCount = 1;

// image array for create the game from
let imageArray = [
  "images/team-01.jpg",
  "images/team-01.jpg",
  "images/team-02.jpg",
  "images/team-02.jpg",
  "images/team-03.jpg",
  "images/team-03.jpg",
  "images/team-04.jpg",
  "images/team-04.jpg",
  "images/team-05.png",
  "images/team-05.png",
  "images/team-06.png",
  "images/team-06.png",
  "images/team-07.jpg",
  "images/team-07.jpg",
  "images/team-08.jpg",
  "images/team-08.jpg",
];

input.addEventListener("keypress", (el) => {
  // player intial score
  let score = 0;

  // # of trails
  let trials = 20;

  // 1- enter player Name: write the name and press enter
  if (el.key === "Enter" || el.key === "#") {
    if (input.value != "") {
      // for name value is not empty

      // display player info
      playerinfDiv.style.display = "flex";

      // display player name
      playerNameSpan.innerHTML = input.value.toUpperCase();

      //display # of trails
      triesSpan.innerHTML = trials;

      // hide the input
      input.style.display = "none";

      // display the cards
      cardsDiv.style.display = "flex";
      // empty cards Div data
      cardsDiv.innerHTML = "";

      // call StartGame Fn
      StartGame(trials, score);
    }
  }
});

function StartGame(trials, score) {
  // randimaize the images
  suffleArray(imageArray);

  // console.log(imageArray);

  for (let i = 0; i < imageArray.length; i++) {
    // create the image div

    let div = document.createElement("div");
    div.className = "image";

    // add data attr by its number using slicing
    div.setAttribute("data-source", `source-${imageArray[i].slice(12, 14)}`);
    let image = document.createElement("img");
    image.src = imageArray[i];
    div.appendChild(image);
    cardsDiv.appendChild(div);
  }
  // select all image divs
  let imageDivs = document.querySelectorAll("#cards .image");

  // create data attr array for saving choosen images attr in it for single try
  let dataArray = [];
  imageDivs.forEach((el) => {
    // for clicked image

    el.addEventListener("click", () => {
      if (
        document.querySelectorAll("#cards .image.clicked").length + 1 ==
        imageDivs.length
      ) {
        score++;
        EndGame();
      } else {
        if (imageCount <= 2) {
          imageCount++;
          el.classList.add("clicked");
          el.style.pointerEvents = "none";
          // console.log(el.getAttribute("data-source"));
          dataArray.push(el.getAttribute("data-source"));
          // console.log(dataArray);

          // if 2-cards are choosen
          if (dataArray.length == 2) {
            // compare the 2- choosen attr
            if (dataArray[0] == dataArray[1]) {
              // if equal increase score
              score++;
              let succSound = document.createElement("audio");
              succSound.src = "sounds/success-fanfare-trumpets-6185.mp3";
              succSound.play();
              // succSound.remove();

              // console.log(score);
              // reset image count
              imageCount = 1;
              // reset data array
              dataArray = [];
            } else {
              // if 2-attr not equal

              //decrease # of trails and show it
              trials--;
              triesSpan.innerHTML = trials;

              // play sound
              let failSound = document.createElement("audio");
              failSound.src = "sounds/failfare-86009.mp3";
              failSound.play();
              // failSound.remove();
              // console.log(trials);

              // if # of trails = 0  .. end the game
              if (trials <= 0) {
                EndGame();
              }
              // after 1 sec do
              let appearInterval = setInterval(() => {
                // remove clicked class from 2- cards & make it clickable again
                document
                  .querySelectorAll(`[data-source= "${dataArray[0]}"]`)
                  .forEach((el) => {
                    el.classList.remove("clicked");
                    el.style.pointerEvents = "all";
                  });

                document
                  .querySelectorAll(`[data-source= "${dataArray[1]}"]`)
                  .forEach((el) => {
                    el.classList.remove("clicked");
                    el.style.pointerEvents = "all";
                  });

                // reset image count
                imageCount = 1;
                //reset the data attr array
                dataArray = [];
                // console.log(dataArray);
                // clear the interval
                clearInterval(appearInterval);
              }, 2000);
            }
          }
        }
      }
    });
  });

  // randimize the cards images
  function suffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function EndGame() {
    // hide the cards
    cardsDiv.style.display = "none";
    // hide player info
    playerinfDiv.style.display = "none";

    // create score div
    let scoreDiv = document.createElement("div");
    scoreDiv.id = "scoreDiv";
    scoreDiv.innerHTML = `Your Score is ${score}`;
    container.appendChild(scoreDiv);

    if (score >= 4) {
      scoreDiv.style.backgroundColor = "green";
    } else {
    }
    // create start again Btn
    let start = document.createElement("button");
    start.innerHTML = "Start";
    start.id = "startBtn";
    document.getElementById("player").appendChild(start);
    let startBtn = document.getElementById("startBtn");

    // if start btn is clicked
    BtnStart(startBtn, scoreDiv);
  }
}
function BtnStart(startBtn, scoreDiv) {
  startBtn.addEventListener("click", () => {
    // display the input and clear it
    input.style.display = "block";
    input.value = "";

    // remove the sart btn and the score div
    document.getElementById("player").removeChild(startBtn);
    container.removeChild(scoreDiv);
  });
}
