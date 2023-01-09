const startScreen = document.querySelector("#start-screen");
const questionsScreen = document.querySelector("#questions");
const choices = document.querySelector("#choices");
const startButton = document.querySelector("#start");
const timeEl = document.querySelector("#time");

//set starting time interval here
time = 76;
//function to set starting time
setTime = (i) =>
  (timerInterval = setInterval(() => {
    time--;
    timeEl.textContent = time;

    if (time === 0) {
      clearInterval(timerInterval);
    }
  }, 1000));

//function to render questions while time is not equal to zero
//render question to page
//for above render 4 buttons with each option
//set sttributes of 4 buttons
//event.target button
//if correct answer selected log  to score else minus 10 seconds from clock

//and to log score
//function to render feedback for interval of 3 seconds run within above functon
//function to render end screen
//function to log score to high
//Useful comments element.style.display = "none" will hide
//within a function event.currentTarget.setAttribute coupled with event.stop
//setAttribute(class, visible)
//use local storage to store name and score then get from local storage on high scores page
questionNumber = 0;
startButton.addEventListener("click", (event) => {
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

  optionButtons = questionsScreen.querySelectorAll("button");

  questionsScreen.addEventListener("click", (event) => {
    var element = event.target;
    if (element.matches("button")) {
      questionNumber += 1;
      questionsScreen.firstElementChild.textContent =
        questions[questionNumber].question;
      for (i = 0; i < 4; i++) {
        optionButtons[i].textContent = questions[questionNumber].choices[i];
      }
    }
  });
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
