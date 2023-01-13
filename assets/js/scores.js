//get the scores array from local stroage
scores = JSON.parse(localStorage.getItem("scores"));

highScores = document.querySelector("#highscores");
clearScores = document.querySelector("#clear");
//sort array by score values
scores.sort((a, b) => {
  return b.score - a.score;
});
//for loop to render high scores to page
for (i = 0; i < scores.length; i++) {
  list = document.createElement("li");
  initials = scores[i].initials;
  score = scores[i].score;
  list.textContent = `${initials} - ${score}`;
  highScores.appendChild(list);
}
//clear high scores from page on click
clearScores.addEventListener("click", (event) => {
  var element = event.target;
  if (element.matches("button")) {
    for (i = 0; i < scores.length; i++) {
      highScores.removeChild(highScores.firstChild);
    }
    //local storage cleared to prevent scores re rendering when navigating back to page
    localStorage.clear();
  }
});
