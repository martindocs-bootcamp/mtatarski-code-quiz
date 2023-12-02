let getLeaderboard = JSON.parse(localStorage.getItem('leaderboard'));

if(!getLeaderboard){
  localStorage.setItem('leaderboard', JSON.stringify([]));
}

if(!getLeaderboard) getLeaderboard = [];

const highScores = document.getElementById('highscores');

getLeaderboard.sort((a,b) => b.score - a.score);

getLeaderboard.forEach((user) => {
  const{initials, score} = user;

  const li = document.createElement('li');

  li.textContent = `${initials} - ${score}`;
  highScores.appendChild(li);  
});

const clearScore = document.getElementById('clear');
clearScore.addEventListener('click', () => {

  localStorage.setItem('leaderboard', JSON.stringify([]));
  window.location.reload();
});
