// Array of questions
const quizeQuestions = questions;

// DOM elements
const mainScreen = document.querySelector('.start');
const questionsContainer = document.getElementById('questions');
const startQuiz = document.getElementById('start');
const endScreen = document.getElementById('end-screen');
const countdown = document.getElementById('time');
const score = document.getElementById('final-score');

// Variable for controling Quiz questions display
let quizIndex = 0;

// Set the initial time for the quiz 
let initTime = quizeQuestions.length * 15;

// Variable for the timer
let startTimer;

// Store the leaderboard scores
let leaderboard = [];

// Function to display the timer
const timer = () => {
  // Display the initial time on screen
  countdown.textContent = initTime;

  // Interval for the timer decreasing by one second
  startTimer = setInterval(() => {
    initTime--;

    // Display the timer if is above zero. If below zero, set to zero
    countdown.textContent = initTime > 0 ? initTime : 0;

    // Stop the timer if it reaches zero
    if(initTime === 0) {            
      clearInterval(startTimer);

      // Display remaining time on screen
      score.textContent = countdown.textContent;

      // Hide the questions screen
      questionsContainer.classList.add('hide');

      // Show the Final Score screen
      endScreen.classList.remove('hide');
    };
  }, 1000);
}

// Display feedback message to the user
const displayMessage = (message, color) => {
  const msg = document.getElementById('feedback');

  // Display message under the questions
  msg.textContent = message;

  // Set the color of the feedback depend if it's 'wrong' or 'correct'
  msg.style.color = color;

  // Show the message on screen
  msg.classList.remove('hide');
  
  // Hide the message after 2 seconds
  setTimeout(() => {
    msg.classList.add('hide');
    msg.textContent = '';
  }, 2000)
}

// Function to display a question
const displayQuestion = (index) => {  
  const question = document.getElementById('question-title');    

  // Get the question title
  const questionTitle = Object.keys(quizeQuestions[index])[0];

  // Show the question title on screen
  question.textContent = questionTitle;

  const choice = document.getElementById('choices');

  // Possible answers choices
  const choices = quizeQuestions[index][questionTitle];

  // Remove existing answers choices  
  while (choice.firstChild) {
    choice.removeChild(choice.firstChild);
  }   
  
  // Create buttons for each answer choice
  for (let i = 0; i < choices.length; i++) {
    const button = document.createElement('button');    
      button.textContent = choices[i];
      button.dataset.answer = i + 1;
      choice.appendChild(button);    
    }
  }

// Event listener for the start quiz button
startQuiz.addEventListener('click', () => {
  // Start the timer
  timer();

  // Hide the start screen and show the quiz questions
  mainScreen.classList.add('hide');

  // Show the quiz questions screen
  questionsContainer.classList.remove('hide');   

  // Function to display each question on screen   
  displayQuestion(quizIndex);  
});

// Event listener for user clicks on answer choices
questionsContainer.addEventListener('click', (e) =>{
  // Get the user answer numer
  const userAnswer = e.target.dataset.answer;  

  // Get the right answer number to the question
  const answer = Object.keys(quizeQuestions[quizIndex])[1];

  // Get the right answer
  const answerNumber = quizeQuestions[quizIndex][answer];
 
   // Check if the user's answer is correct
  if(userAnswer === answerNumber) {
    displayMessage('Correct!', "green");    
  }else{      
    // Deduct 15 seconds for a wrong answer  
    initTime -= 15;        
    displayMessage('Wrong!', "red");
  }
  
  // Move to the next question or end the quiz if no more questions
  if(initTime > 0 && quizIndex !== (quizeQuestions.length - 1)){
    quizIndex++;
    displayQuestion(quizIndex);
  }else{
    if(initTime < 0) {
      // If final score is below zero 
      countdown.textContent = 0;
    }else{
      // update the screen timer
      countdown.textContent = initTime;
    }

    // Stop the timer 
    clearInterval(startTimer);

    // Set the final score 
    score.textContent = countdown.textContent;    

    // Hide the questions screen
    questionsContainer.classList.add('hide');

    // Show the Score screen
    endScreen.classList.remove('hide');
  }
});

// Event listener for the submit button (after quiz completion)
const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', () =>{
  const initials = document.getElementById('initials');

  // Validate that initials are not empty
  if(initials.value === ""){
    displayMessage('Field cannot be empty!', "red");
    return;
  } 

  // Retrieve or initialize the leaderboard from local storage
  let getLocalStorage = JSON.parse(localStorage.getItem('leaderboard'));
  if(!getLocalStorage){
    localStorage.setItem('leaderboard', JSON.stringify([]));
  }
  
  // If getLeaderboard is still falsy, set it to an empty array
  if(!getLocalStorage) getLocalStorage = [];
  
  // Add the user's initials and score to the leaderboard
  getLocalStorage.push({
    initials: initials.value, 
    score: score.textContent
  });
 
  // Update the leaderboard in local storage
  localStorage.setItem('leaderboard', JSON.stringify(getLocalStorage));

  // Redirect to the highscores page
  window.location.href = "./highscores.html";
})