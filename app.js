// Single state object
var state = {
  questionNumber:0,
  score:0,
  incorrectScore:0
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

function showQuestionsPage() {
  $('.page-1').addClass('hidden');
  $('.page-2').removeClass('hidden');
}

function showStartPage(){
  $('.page-3').addClass('hidden');
  $('.page-1').removeClass('hidden');
}
function showNextButton(){
  $('.next-button').removeClass('hidden');
  $('.submit-button').addClass('hidden');
  $('.js-submit-button').attr('disabled', 'disabled');
  $('input:radio').attr('disabled', true);
}

function showSubmitButton(){
  $('.submit-button').removeClass('hidden');
  $('.next-button').addClass('hidden');
  $('.js-submit-button').removeAttr('disabled', 'disabled');
}

function handleAnswer(){
  var answerValue = questions[state.questionNumber].correctAnswer();
  var selectedAnswer = $('label:has(input:radio:checked)');
  if (selectedAnswer.text().trim() === answerValue) {
    state.score++;
  } else {
    state.incorrectScore++
    selectedAnswer.addClass('incorrect');
  }
  $('label:contains("' + answerValue + '")').addClass('correct')
}


// Render functions
function renderCurrentScore(state, element){
  var scoreHTML =
  `<p class="score">Current Score: ${state.score} correct, ${state.incorrectScore} incorrect</p>`
  return element.html(scoreHTML);
}

function renderQuestion(questions, element){
  var currentIndex = questions[state.questionNumber];
  var itemsHTML =
  `<h3 class="question-line">${currentIndex.question}</h3>
  <fieldset class="radio-group">
  <label class="radio-button" for="answer1"> <input type="radio" id="answer1" name="answer" required>${currentIndex.answers[0]}</label>
  <label class="radio-button" for="answer2"> <input type="radio" id="answer2" name="answer">${currentIndex.answers[1]}</label>
  <label class="radio-button" for="answer3"> <input type="radio" id="answer3" name="answer">${currentIndex.answers[2]}</label>
  <label class="radio-button" for="answer4"> <input type="radio" id="answer4" name="answer">${currentIndex.answers[3]}</label>
  </fieldset>`
  return element.html(itemsHTML);
}
function renderQuestionNum(state, element){
  var questionCount = state.questionNumber+1;
  var questionNumHTML =`<h2 class="question-num">Question ${questionCount}</h2>
   <h2 class="current-question">${questionCount} of 10</h2>`;
  return element.html(questionNumHTML);
}

function renderCurrentQuestion(){
  renderQuestion(questions, $('.js-question-set'));
  renderQuestionNum(state, $('.js-state'));
}

function renderFinalScorePage(state, element){
  $('.page-2').addClass('hidden')
  $('.page-3').removeClass('hidden');
  var finalScore = (state.score/10)*100;
  if (finalScore < 50) {
    var finalText = "Freshen up your California knowledge and try again!";
  } else if (finalScore < 90) {
    var finalText = "You know a few things about California, but how about giving it another shot?";
  } else {
    var finalText = "A true Californian! You make the state proud.";
  }
  var scoreHTML = `<h2>${finalScore}%</h2> <p>${finalText}</p>`
  return element.html(scoreHTML);
}


//Event Listeners
function setUpListeners(){

  //ON START - Shows Page 2 with Question 1 + Answers
  $('.js-start').click(function(event) {
    showQuestionsPage();
    renderCurrentQuestion();
    renderCurrentScore(state, $('.js-score'));
  });

  //ON SUBMIT - Shows Correct Answer, Changes Button to "Next"
  $('.js-submit-button').click(function(event) {
    if ($('input[type=radio]').is(':checked')){
      showNextButton();
      handleAnswer();
      renderCurrentScore(state, $('.js-score'));
    }
  });

  //ON NEXT - Shows Next Question, Changes Button to "Submit"
  $('.js-next').click(function(event) {
    showSubmitButton();
    state.questionNumber++;
    state.questionNumber<=9 ? renderCurrentQuestion() : renderFinalScorePage(state, $('.js-results'));
  });

  //ON START OVER - Starts Quiz over at Page 1
  $('.js-start-over').click(function(event) {
    state = { questionNumber:0, score:0, incorrectScore:0}
    showStartPage();
  });
}

$(function(){
  setUpListeners();
});
