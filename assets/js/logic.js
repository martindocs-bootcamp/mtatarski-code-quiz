const quizeQuestions = questions;
const mainScreen = document.querySelector('.start');
const questionsContainer = document.getElementById('questions');
const startQuiz = document.getElementById('start');
const endScreen = document.getElementById('end-screen');

let quizIndex = 0;
let initTime = 75;
let startTimer;

// Function to display the timer
const timer = () => {
  // get the element to display time
  const countdown = document.getElementById('time');
  // set the initial time on the screen
  countdown.textContent = initTime;

  // interval the timer decreasing by one second
  startTimer = setInterval(() => {
    initTime--;
    countdown.textContent = initTime > 0 ? initTime : 0;

    // stop the timer if is zero
    if(initTime === 0) {      
      clearInterval(startTimer);
      questionsContainer.classList.add('hide');
      endScreen.classList.remove('hide');
    };
  }, 1000);
}

// display wrong/correct message to user
const displayMessage = (message) => {
  const msg = document.getElementById('feedback');
  msg.textContent = message;
  msg.classList.remove('hide');
  
  setTimeout(() => {
    msg.classList.add('hide');
    msg.textContent = '';
  }, 1000)
}

const displayQuestion = (index) => {
  // question title
  const question = document.getElementById('question-title');    
  const questionTitle = Object.keys(quizeQuestions[index])[0];
  question.textContent = questionTitle;

  // answers
  const choice = document.getElementById('choices');
  const choices = quizeQuestions[index][questionTitle];

  // Remove existing list items
  while (choice.firstChild) {
    choice.removeChild(choice.firstChild);
  }   
  
  for (let i = 0; i < choices.length; i++) {
    const button = document.createElement('button');    
      button.textContent = choices[i];
      button.dataset.answer = i + 1;
      choice.appendChild(button);    
    }
  }


startQuiz.addEventListener('click', () => {
  timer();


  // hide the start screen
  mainScreen.classList.add('hide');
  // show the quiz questions
  questionsContainer.classList.remove('hide');    
  displayQuestion(quizIndex);  
});

// const questionsContainer = document.getElementById('questions');
questionsContainer.addEventListener('click', (e) =>{
  
  const userAnswer = e.target.dataset.answer;  
  const answer = Object.keys(quizeQuestions[quizIndex])[1];
  const answerNumber = quizeQuestions[quizIndex][answer];

  
  if(userAnswer === answerNumber) {
    displayMessage('Correct!');    
  }else{
    initTime -= 15;     
    displayMessage('Wrong!');
  }
  
  if(initTime > 0 && quizIndex !== (quizeQuestions.length - 1)){
    quizIndex++;
    displayQuestion(quizIndex);
  }else{
    clearInterval(startTimer);
    questionsContainer.classList.add('hide');
    endScreen.classList.remove('hide');
  }
});

