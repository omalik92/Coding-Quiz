const startScreen = document.querySelector("#start-screen");
const questionsScreen = document.querySelector("#questions");
const choices = document.querySelector("#choices");
const startButton = document.querySelector("#start");
const endScreen = document.querySelector("#end-screen");
const timeEl = document.querySelector("#time");

//set starting time interval here
var time = 76;
//function to set timer
setTime = (i) =>
  (timerInterval = setInterval(() => {
    time--;
    timeEl.textContent = time;
    //if time runs out or last question
    if (time === 0 || questionNumber === 4) {
      //render end page when timer reaches end
      renderEndPage();

      //Uh ohmessage you ran out of time
      clearInterval(timerInterval);
    }
    //ADD FUNCTION HERE TO DISPLAY END PAGE
  }, 1000));

//function to render end page
renderEndPage = () => {
  questionsScreen.setAttribute("class", "hide");
  endScreen.classList.remove("hide");
};

//set question counter
var questionNumber = 0;

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
    btnText = document.createTextNode(questions[1].choices[i]);
    btn.appendChild(btnText);
    choices.appendChild(btn);
    btn.setAttribute("data-option", [i]);
  }
  //get array of all buttons on the page
  optionButtons = questionsScreen.querySelectorAll("button");

  questionsScreen.addEventListener("click", (event) => {
    var element = event.target;
    if (element.matches("button")) {
      //IF THE QUESTION NUMBER IS LESS THAN QUESTIONS LENGTH
      //IF THE DATA NUMBER = CORRECT ANSWER ADD TO SCORE COUNTER AND STORE TO LOCAL STORAGE
      //SET MESSAGE TO CORRECT
      questionNumber += 1;
      if (questionNumber < questions.length) {
        questionsScreen.firstElementChild.textContent =
          questions[questionNumber].question;
        for (i = 0; i < 4; i++) {
          optionButtons[i].textContent = questions[questionNumber].choices[i];
        }
      }
      //ELSE RUN THE FINAL PAGE
      else {
        renderEndPage();
      }
    }
  });
};

startButton.addEventListener("click", (event) => {
  renderQuestionScreen();
});

//   }
// });

// for (i = 0; i < 4; i++) {
//   //if clicked then render next question and so forth use below code
//   optionButtons[0].textContent;
// }

// buttons[0].textContent = "hello";

// console.log(buttons);

//   questionsScreen.addEventListener("click", function (event) {
//     var element = event.target;

//     // Check if the clicked element was an image
//     if (element.matches("button")) {
//       // Get the current value of the image's data-state attribute
//       var state = element.getAttribute("data-option");
//       console.log(state);
//     }
//   });
// });

//add code to hide starting page and bring up questions
