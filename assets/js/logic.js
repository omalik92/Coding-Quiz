const startScreen = document.querySelector("#start-screen");
const questionsScreen = document.querySelector("#questions");
const choices = document.querySelector("#choices");
const startButton = document.querySelector("#start");
const endScreen = document.querySelector("#end-screen");
const feedback = document.querySelector("#feedback");
const timeEl = document.querySelector("#time");
const finalScore = document.querySelector("#final-score");
const enterInitials = document.querySelector("#initials");

var questionNumber = 0;
var score = 0;
var clearFeedback;

//set starting time interval here
var time = 76;
var scores = [];
var lastScores = [];
//function to set timer
setTime = (i) =>
  (timerInterval = setInterval(() => {
    time--;
    timeEl.textContent = time;
    //if time runs out or last question
    if (time === 0 || questionNumber > 4) {
      //render end page when timer reaches end
      renderEndPage();

      //Uh ohmessage you ran out of time
      clearInterval(timerInterval);
    }
  }, 1000));

//function to render end page
renderEndPage = () => {
  questionsScreen.setAttribute("class", "hide");
  endScreen.classList.remove("hide");
  finalScore.textContent = score;
};

//set question counter

//function to render questions screen
renderQuestionScreen = () => {
  setTime(time);

  //set attribute of start screen to hidden and questionns to visible
  startScreen.setAttribute("style", "display:none");
  questionsScreen.classList.remove("hide");

  //set value of first question and options
  questionsScreen.firstElementChild.textContent = questions[0].question;

  var btn;
  for (i = 0; i < 4; i++) {
    btn = document.createElement("button");
    btnText = document.createTextNode(questions[0].choices[i]);
    btn.appendChild(btnText);
    choices.appendChild(btn);
    btn.setAttribute("data-option", [i]);
  }
  //get array of all buttons on the page
  optionButtons = questionsScreen.querySelectorAll("button");

  questionsScreen.addEventListener("click", (event) => {
    //

    var element = event.target;
    if (element.matches("button")) {
      //clear timer for feedback
      clearTimeout(clearFeedback);
      //IF THE DATA NUMBER = CORRECT ANSWER ADD TO SCORE COUNTER AND STORE TO LOCAL STORAGE
      if (
        element.getAttribute("data-option") == questions[questionNumber].answer
      ) {
        feedback.textContent = "Correct!";
        feedback.classList.remove("hide");
        score += 1;
      } else {
        feedback.textContent = "Incorrect!";
        feedback.classList.remove("hide");
      }
      console.log(`score is ${score}`);

      //SET MESSAGE TO CORRECT
      //renderFeedback
      questionNumber += 1;
      if (questionNumber < questions.length) {
        questionsScreen.firstElementChild.textContent =
          questions[questionNumber].question;
        for (i = 0; i < 4; i++) {
          optionButtons[i].textContent = questions[questionNumber].choices[i];
        }
        //clearFeedback() after delay
        clearFeedback = setTimeout(() => {
          feedback.setAttribute("class", "feedback hide");
        }, 3000);
      }
      //ELSE RUN THE FINAL PAGE
      else {
        renderEndPage();
        getScore();
        //clearFeedback() after delay
        clearFeedback = setTimeout(() => {
          feedback.setAttribute("class", "feedback hide");
        }, 3000);
      }
    }
  });
};
//get user score and initials and store in local storage
//if submit is clicked store user initials and
getScore = () => {
  endScreen.addEventListener("click", (event) => {
    var element = event.target;

    if (element.matches("button")) {
      scoreRecord = { initials: enterInitials.value, score: score };
      var lastScoresStore = JSON.parse(localStorage.getItem("scores"));
      if (lastScoresStore !== null) {
        lastScoresStore.push(scoreRecord);
        localStorage.setItem("scores", JSON.stringify(lastScoresStore));
        window.location.href = "./highscores.html";
      } else {
        scores.push(scoreRecord);
        console.log(scores);
        localStorage.setItem("scores", JSON.stringify(scores));
        window.location.href = "./highscores.html";
      }
    }
  });
};

// if (element.matches("button")) {
//   //get last saved scores list
//   lastScores.push(scoreRecord);
//   localStorage.setItem("scores", JSON.stringify(lastScores));
//   window.location.href = "./highscores.html";
// } else if (element.matches("button") && lastScores !== null) {
//   localStorage.setItem("scores", JSON.stringify(scoreRecord));
//   window.location.href = "./highscores.html";
// }

startButton.addEventListener("click", (event) => {
  renderQuestionScreen();
});
