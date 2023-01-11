scores = JSON.parse(localStorage.getItem("scores"));

highScores = document.querySelector("#highscores");
clearScores = document.querySelector("#clear");
//sort array
scores.sort((a, b) => {
  return b.score - a.score;
});
for (i = 0; i < scores.length; i++) {
  list = document.createElement("li");
  initials = scores[i].initials;
  score = scores[i].score;
  list.textContent = `${initials} - ${score}`;
  highScores.appendChild(list);
}
clearScores.addEventListener("click", (event) => {
  var element = event.target;
  if (element.matches("button")) {
    for (i = 0; i < scores.length; i++) {
      highScores.removeChild(highScores.firstChild);
    }
    localStorage.clear();
  }
});
