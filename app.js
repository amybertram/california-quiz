// Single state object
var state = {
  questionNumber:0,
  score:0
}

var questions = [
  {
    question:"What was the lowest temperature ever recorded in California?",
    answers: ["-21°F", "-63°F", "-45°F", "-12°F"],
    correctAnswer: function(){return this.answers[2]}
  },
  {
    question:"Where does California rank with the other U.S. states in regards to the length of its coastline?",
    answers: ["4th longest", "3rd longest", "1st longest", "7th longest"],
    correctAnswer: function(){return this.answers[1]}
  },
  {
    question:"Which city has the second largest population in California?",
    answers: ["San Diego", "Los Angeles", "San Francisco", "Sacramento"],
    correctAnswer: function(){return this.answers[0]}
  },
  {
    question:"One out of how many U.S. residents live in California?",
    answers: ["Six", "Two", "Ten", "Eight"],
    correctAnswer: function(){return this.answers[3]}
  },
  {
    question:"When did the California Gold Rush begin?",
    answers: ["1848", "1855", "1876", "1834"],
    correctAnswer: function(){return this.answers[0]}
  },
  {
    question:"What is the official California state tree?",
    answers: ["Cherry Tree", "Palm Tree", "Joshua Tree", "Redwood Tree"],
    correctAnswer: function(){return this.answers[3]}
  },
  {
    question:"What is the highest summit in California?",
    answers: ["Mount Shasta", "Red Slate Mountain", "Mount Whitney", "Mount Williamson"],
    correctAnswer: function(){return this.answers[2]}
  },
  {
    question:"Which of the following is NOT in California?",
    answers: ["Palm Springs", "Palm Beach", "Palm Desert", "Twentynine Palms"],
    correctAnswer: function(){return this.answers[1]}
  },
  {
    question:"What is the state animal of California?",
    answers: ["Coyote", "Grizzly Bear", "Mountain Lion", "Jackrabbit"],
    correctAnswer: function(){return this.answers[1]}
  },
  {
    question:"What type of bridge is the Golden Gate bridge?",
    answers: ["Beam", "Arch", "Truss", "Suspension"],
    correctAnswer: function(){return this.answers[3]}
  }
]


// Modification functions

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

function buttonSubmit(){
  $('.button-2').removeClass('hidden');
  $('.button-1').addClass('hidden');
}

function buttonNext(){
  $('.button-1').removeClass('hidden');
  $('.button-2').addClass('hidden');
}

function showAnswer(){
  var answerValue = questions[state.questionNumber].correctAnswer();
  var selectedAnswer = $('input[name="answer"]:checked');
  $('label:contains("' + answerValue + '")').addClass('correct')
}
    
  //if ($('label').val() === answerValue) {
    //$(this).addClass('correct');
  //}
    // Get text from label parent
    //If answer is correct, state.score++
    //else LABEL.addClass('incorrect')
   // BOTH INSTANCES, correctAnswer.addClass('correct')



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
          '<label for="answer1"> <input type="radio" id="answer1" required>' + currentIndex.answers[0] + '</label> <br>' +
          '<label for="answer2"> <input type="radio" id="answer2">' + currentIndex.answers[1] + '</label> <br>' +
          '<label for="answer3"> <input type="radio" id="answer3">' + currentIndex.answers[2] + '</label> <br>' +
          '<label for="answer4"> <input type="radio" id="answer4">' + currentIndex.answers[3] + '</label> <br>' +
      '</fieldset>';   
  return element.html(itemsHTML);
}

function renderFinalScore(state, element){
  var finalScore = (state.score/10)*100;
  if (finalScore < 50) {
    finalText = "Freshen up your California knowledge and try again!";
  } else if (finalScore < 90) {
    finalText = "You know a few things about California, but how about giving it another shot?";
  } else {
    finalText = "A true Californian! You make the state proud.";
  }
  var scoreHTML = '<p> ' + finalScore + '% <br> ' + finalText + ' </p>'
  return element.html(scoreHTML);
}


//Event Listeners

//ON START - Shows Pages 2 with Question 1 + Answers
function displayQuestions(){
  $('.js-start').click(function(event) {
  showPageTwo();
  renderQuestions(questions, $('.js-question-set'));
  renderQuestionNum(state, $('.js-state'));
  renderScore(state, $('.js-score'));
  });
}

//ON SUBMIT - Shows Correct Answer, Changes Button to "Next"
function displayAnswer(){
  $('.js-button').click(function(event) { 
  buttonSubmit();  
  showAnswer();
  //renderQuestions(questions, $('.js-question-set'));
  //renderQuestionNum(state, $('.js-state'));
  //renderScore(state, $('.js-score'));
  //renderFinalScore(state, $('.js-results'));
  });
}

//ON NEXT - Shows Next Question, Changes Button to "Submit"
function displayNextQuestion(){
  $('.js-next').click(function(event) {
  buttonNext();
  nextQuestion();
  renderQuestions(questions, $('.js-question-set'));
  renderQuestionNum(state, $('.js-state'));
  renderScore(state, $('.js-score'));
  renderFinalScore(state, $('.js-results'));
  });
}

//ON START OVER - Starts Quiz over at Page 1
function displayStart(){
  $('.js-start-over').click(function(event) {
  showPageOne();
  });
}


$(function(){
  renderQuestions(questions, $('.js-question-set'));
  renderQuestionNum(state, $('.js-state'));
  renderScore(state, $('.js-score'))
  renderFinalScore(state, $('.js-results'))
  displayQuestions();
  displayNextQuestion();
  displayAnswer();
  displayStart();
});

