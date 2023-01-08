const startButton = document.querySelector("#start");
const timeEl = document.querySelector("#time");
//set starting time interval here
i = 51;
//function to set starting time
setTime = (i) =>
  (timerInterval = setInterval(() => {
    i--;
    timeEl.textContent = i;

    if (i === 0) {
      clearInterval(timerInterval);
    }
  }, 1000));

startButton.addEventListener("click", () => setTime(i));
//add code tp hide starting page and bring up questions
