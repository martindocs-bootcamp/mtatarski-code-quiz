const quizeQuestions = questions;

// Function to display the timer
const timer = (time) => {
  // get the element to display time
  const countdown = document.getElementById('time');
  // set the initial time on the screen
  countdown.textContent = time;

  // interval the timer decreasing by one second
  const startTimer = setInterval(() => {
    time--;
    countdown.textContent = time;

    // stop the timer if is zero
    if(time === 0) clearInterval(startTimer);
  }, 1000);
}


const startQuiz = document.getElementById('start');
startQuiz.addEventListener('click', () => {
  timer(75);

  const mainScreen = document.querySelector('.start');
  const questionsContainer = document.getElementById('questions');

  // hide the start screen
  mainScreen.classList.add('hide');
  // show the quiz questions
  questionsContainer.classList.remove('hide');    

  // question title
  const question = document.getElementById('question-title');    
  const questionTitle = Object.keys(quizeQuestions[0])[0];
  question.textContent = questionTitle;

  // answers
  const choice = document.getElementById('choices');
  const choices = quizeQuestions[0][questionTitle];

  for (let i = 0; i < choices.length; i++) {
    const button = document.createElement('button');    
    button.textContent = choices[i];
    button.dataset.answer = i + 1;
    choice.appendChild(button);    
  }

});


