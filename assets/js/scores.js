 // Retrieve or initialize the leaderboard from local storage
let getLeaderboard = JSON.parse(localStorage.getItem('leaderboard'));
if(!getLeaderboard){
  localStorage.setItem('leaderboard', JSON.stringify([]));
}

// If getLeaderboard is still falsy, set it to an empty array
if(!getLeaderboard) getLeaderboard = [];

// Sort the leaderboard in descending order based on the score
getLeaderboard.sort((a,b) => b.score - a.score);

// Get the 'highscores' element from the HTML document
const highScores = document.getElementById('highscores');

// Iterate over each user in the leaderboard and display their initials and score
getLeaderboard.forEach((user) => {
  // Destructuring 'initials' and 'score' prop from the 'user' object
  const{initials, score} = user;

  // Create a new list item element
  const li = document.createElement('li');

  // Set the text content of the list item to show user initials and scor
  li.textContent = `${initials} - ${score}`;

   // Append the list item to the 'highscores' element
  highScores.appendChild(li);  
});

// Get the 'clear' button element from the HTML document
const clearScore = document.getElementById('clear');

// Add a click event listener to the 'clear' button
clearScore.addEventListener('click', () => {
   // Clear the leaderboard data in local storage to an empty array
  localStorage.setItem('leaderboard', JSON.stringify([]));

  // Reload the page with cleared leaderboard
  window.location.reload();
});
