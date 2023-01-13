const startScreen = document.querySelector("#start-screen");
const questionsScreen = document.querySelector("#questions");
const choices = document.querySelector("#choices");
const startButton = document.querySelector("#start");
const endScreen = document.querySelector("#end-screen");
const feedback = document.querySelector("#feedback");
const timeEl = document.querySelector("#time");
const finalScore = document.querySelector("#final-score");
const enterInitials = document.querySelector("#initials");
//initialising all variables
var questionNumber = 0;
var score = 0;
var clearFeedback;
//initialise starting time for quiz here
var time = 76;
var scores = [];

//function to set timer on Questons Screen
setTime = (i) =>
  (timerInterval = setInterval(() => {
    time--;
    timeEl.textContent = time;
    //if time runs out or last question
    if (time === 0) {
      //render end page when timer reaches end and get the score
      renderEndPage();
      getScore();
      clearInterval(timerInterval);
    }
  }, 1000));

//function to render end page
renderEndPage = () => {
  questionsScreen.setAttribute("class", "hide");
  endScreen.classList.remove("hide");
  finalScore.textContent = score;
};

//function to render questions screen
renderQuestionScreen = () => {
  setTime(time);

  //set attribute of start screen to hidden and questionns to visible
  startScreen.setAttribute("style", "display:none");
  questionsScreen.classList.remove("hide");

  //set value of first question and options
  questionsScreen.firstElementChild.textContent = questions[0].question;
  //for loop to create 4 buttons on the questions screen
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
  //
  questionsScreen.addEventListener("click", (event) => {
    var element = event.target;
    if (element.matches("button")) {
      //clear timer for feedback
      clearTimeout(clearFeedback);
      //if data number of clicked element id equeal to the correct answer then .....
      if (
        element.getAttribute("data-option") == questions[questionNumber].answer
      ) {
        //set feedback to say Correct
        feedback.textContent = "Correct!";
        //Unhide the feedback element by removing hide class
        feedback.classList.remove("hide");
        //add 1 to the core counter
        score += 1;
        //otherwise....
      } else {
        //set the text content of feedback to incorrect
        feedback.textContent = "Incorrect!";
        //Unhide  the feedback
        feedback.classList.remove("hide");
        //removes 10 seconds from the timer for a wrong answer
        time -= 10;
      }
      //add 1 to the question count
      questionNumber += 1;
      //check if end of questions array has not been  reached
      if (questionNumber < questions.length) {
        //update the questin text and button text
        questionsScreen.firstElementChild.textContent =
          questions[questionNumber].question;
        for (i = 0; i < 4; i++) {
          optionButtons[i].textContent = questions[questionNumber].choices[i];
        }
        //clear the feedback for answer after a delay of seconds.
        clearFeedback = setTimeout(() => {
          feedback.setAttribute("class", "feedback hide");
        }, 3000);
      }
      //if end of questions reached then render the end page
      else {
        renderEndPage();
        getScore();
        //clearFeedback() after delay of 3 seconds.
        clearFeedback = setTimeout(() => {
          feedback.setAttribute("class", "feedback hide");
        }, 3000);
      }
    }
  });
};
//function to get score from end page and store it to local storage for highscores page
getScore = () => {
  //event listener for click on submit button
  endScreen.addEventListener("click", (event) => {
    var element = event.target;
    // if the button is presses continue
    if (element.matches("button")) {
      //if the initials input field is blank alert user that it must have initials
      if (enterInitials.value === "") {
        alert("Please enter initials to continue");
        //else continue to store the initials and score object (scoreRecord)
      } else {
        //set the value of scoreRecord object to below
        scoreRecord = { initials: enterInitials.value, score: score };
        //get the last stored scores from local storage
        var lastScoresStore = JSON.parse(localStorage.getItem("scores"));
        //if the score object exists then do the following
        if (lastScoresStore !== null) {
          //push the score received from the end page within the scoreRecore object to the array from local storage
          lastScoresStore.push(scoreRecord);
          //reset the local storage to the updated array of scoreRecords
          localStorage.setItem("scores", JSON.stringify(lastScoresStore));
          //navigate away to the highscores page where the scores will be rendered to the screen
          window.location.href = "./highscores.html";
        } else {
          //if this is the first time the user is attempting the quiz then
          //add the score Record object to the scores array
          scores.push(scoreRecord);
          //add the scores array to local storage
          localStorage.setItem("scores", JSON.stringify(scores));
          //navigate to the highscores page
          window.location.href = "./highscores.html";
        }
      }
    }
  });
};

startButton.addEventListener("click", (event) => {
  renderQuestionScreen();
});
