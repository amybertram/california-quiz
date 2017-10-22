// Single state object
var state = {
  questionNumber:0,
  score:0
}

var questions = [
  {
    question:"What was the lowest temperature ever recorded in California?",
    answers: ["-21°F", "-63°F", "-45°F", "-12°F"],
    correctAnswer: function(){this.answers[2]}
  },
  {
    question:"Where does California rank with the other U.S. states in regards to the length of its coastline?",
    answers: ["4th longest", "3rd longest", "1st longest", "7th longest"],
    correctAnswer: function(){this.answers[1]}
  },
  {
    question:"Which city has the second largest population in California?",
    answers: ["San Diego", "Los Angeles", "San Francisco", "Sacramento"],
    correctAnswer: function(){this.answers[0]}
  },
  {
    question:"One out of how many U.S. residents live in California?",
    answers: ["Six", "Two", "Ten", "Eight"],
    correctAnswer: function(){this.answers[3]}
  },
  {
    question:"When did the California Gold Rush begin?",
    answers: ["1848", "1855", "1876", "1834"],
    correctAnswer: function(){this.answers[0]}
  },
  {
    question:"What is the official California state tree?",
    answers: ["Cherry Tree", "Palm Tree", "Joshua Tree", "Redwood Tree"],
    correctAnswer: function(){this.answers[3]}
  },
  {
    question:"What is the highest summit in California?",
    answers: ["Mount Shasta", "Red Slate Mountain", "Mount Whitney", "Mount Williamson"],
    correctAnswer: function(){this.answers[2]}
  },
  {
    question:"Which of the following is NOT in California?",
    answers: ["Palm Springs", "Palm Beach", "Palm Desert", "Twentynine Palms"],
    correctAnswer: function(){this.answers[1]}
  },
  {
    question:"What is the state animal of California?",
    answers: ["Coyote", "Grizzly Bear", "Mountain Lion", "Jackrabbit"],
    correctAnswer: function(){this.answers[1]}
  },
  {
    question:"What type of bridge is the Golden Gate bridge?",
    answers: ["Beam", "Arch", "Truss", "Suspension"],
    correctAnswer: function(){this.answers[3]}
  }
]

// State Modification functions
function showPageTwo() {
  $('.page-1').addClass('hidden');
  $('.page-2').removeClass('hidden');
} 

function nextQuestion() {
  if(state.questionNumber < 9) {
    state.questionNumber++
  } else {
    $('.page-2').addClass('hidden')
    $('.page-3').removeClass('hidden');
  }
}

function addScore() {
  state.currentScore++;
}

function showPageOne(){
  state.questionNumber=0
  state.Score=0
  $('.page-3').addClass('hidden');
  $('.page-1').removeClass('hidden');
}

// Render functions
function renderQuestionNum(state, element){
  var questionCount = state.questionNumber+1;
  var questionNumHTML =
    '<h2 class="question-num">' + 'Question ' + questionCount + '</h2>' +
    '<h2 class="current-question">' + questionCount + ' of 10</h2>';
  return element.html(questionNumHTML);  
}

function renderScore(state, element){
  var currentScore = state.score;
  var scoreHTML =
    '<p class="score">Current Score: ' + currentScore + ' out of 10</p>'
  return element.html(scoreHTML);  
}

function renderQuestions(questions, element){
  var currentIndex = questions[state.questionNumber];
  var itemsHTML = 
      '<h3 class="question-line">' + currentIndex.question + '</h3>' +
      '<fieldset class="radio-group">' +
          '<input type="radio" name="answer" id="answer1" value="answer1" required>' +
          '<label for="answer1">' + currentIndex.answers[0] + '</label> <br>' +
          '<input type="radio" name="answer" id="answer2" value="answer2">' +
          '<label for="answer2">' + currentIndex.answers[1] + '</label> <br>' +
          '<input type="radio" name="answer" id="answer3" value="answer3">' +
          '<label for="answer3">' + currentIndex.answers[2] + '</label> <br>' +
          '<input type="radio" name="answer" id="answer4" value="answer4">' +
          '<label for="answer4">' + currentIndex.answers[3] + '</label> <br>' +
      '</fieldset>';   
  return element.html(itemsHTML);
}

function displayQuestions(){
  $('.js-start').click(function(event) {
  showPageTwo();
  renderQuestions(questions, $('.js-question-set'));
  renderQuestionNum(state, $('.js-state'));
  renderScore(state, $('.js-score'));
  });
}

function displayNextQuestion(){
  $('.js-button').click(function(event) {
  nextQuestion();
  renderQuestions(questions, $('.js-question-set'));
  renderQuestionNum(state, $('.js-state'));
  renderScore(state, $('.js-score'))
  });
} 


function displayStart(){
  $('.js-start-over').click(function(event){
  showPageOne();
  });
}

//function displayResults(){}

$(function(){
  renderQuestions(questions, $('.js-question-set'));
  renderQuestionNum(state, $('.js-state'));
  renderScore(state, $('.js-score'))
  displayQuestions();
  displayNextQuestion();
  displayStart();
});

