// Single state object
var state = {
  questionNumber:0,
  currentScore:0
}

var questions = [
  {
    question:"What was the lowest temperature ever recorded in California?",
    answers: ["-21°F", "-63°F", "-45°F", "-12°F"],
    
  },
  {
    question:"Where does California rank with the other U.S. states in regards to the length of its coastline?",
    answers: ["4th longest", "3rd longest", "1st longest", "7th longest"],
   
  },
  {
    question:"Which city has the second largest population in California?",
    answers: ["San Diego", "Los Angeles", "San Francisco", "Sacramento"],
   
  },
  {
    question:"One out of how many U.S. residents live in California?",
    answers: ["Six", "Two", "Ten", "Eight"],
 
  },
  {
    question:"When did the California Gold Rush begin?",
    answers: ["1848", "1855", "1876", "1834"],

  },
  {
    question:"What is the official California state tree?",
    answers: ["Cherry Tree", "Palm Tree", "Joshua Tree", "Redwood Tree"],
  
  },
  {
    question:"What is the highest summit in California?",
    answers: ["Mount Shasta", "Red Slate Mountain", "Mount Whitney", "Mount Williamson"],
   
  },
  {
    question:"Which of the following is NOT in California?",
    answers: ["Palm Springs", "Palm Beach", "Palm Desert", "Twentynine Palms"],
 
  },
  {
    question:"What is the state animal of California?",
    answers: ["Coyote", "Grizzly Bear", "Mountain Lion", "Jackrabbit"],
    
  },
  {
    question:"What type of bridge is the Golden Gate bridge?",
    answers: ["Beam", "Arch", "Truss", "Suspension"],
  
  }
]

// State Modification functions
function showPageTwo() {
  $('.page-1').addClass('hidden');
  $('.page-2').removeClass('hidden');
} 

function nextQuestion() {
  state.questionNumber++;
}


// Render functions
function renderQuestions(questions, element){
  var questionIndex = questions[state.questionNumber]
  var itemsHTML = 
      '<h3 class="question-line">' + questionIndex.question + '</h3>' +
      '<fieldset class="radio-group">' +
          '<input type="radio" name="answer" id="answer1" value="answer1" required>' +
          '<label for="answer1">' + questionIndex.answers[0] + '</label> <br>' +
          '<input type="radio" name="answer" id="answer2" value="answer2">' +
          '<label for="answer2">' + questionIndex.answers[1] + '</label> <br>' +
          '<input type="radio" name="answer" id="answer3" value="answer3">' +
          '<label for="answer3">' + questionIndex.answers[2] + '</label> <br>' +
          '<input type="radio" name="answer" id="answer4" value="answer4">' +
          '<label for="answer4">' + questionIndex.answers[3] + '</label> <br>' +
      '</fieldset>';
  return element.html(itemsHTML);
}

function displayQuestions(){
  $('.js-start').click(function(event) {
  showPageTwo();
  renderQuestions(questions, $('.js-question-set'));
  });
}

function displayNextQuestion(){
  $('.js-button').click(function(event) {
  nextQuestion();
  renderQuestions(questions, $('.js-question-set'));
  });
}

$(function(){
  renderQuestions(questions, $('.js-question-set'));
  displayQuestions();
  displayNextQuestion();
});

