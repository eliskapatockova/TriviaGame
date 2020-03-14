

var quizArea = $("#quiz-area");

var questionsAndAnswers = [{
    question: "Approximately how many people currently live in LA?",
    answers: ["5 million", "9 million", "12 million", "15 million"],
    correctAnswer: "12 million",
    image: "assets/images/traffic.jpg"}, 

    {question: "What is the coolest college in LA? ;)",
  answers: ["UCLA", "USC", "Santa Monica College", "Loyola Marymount"],
  correctAnswer: "UCLA",
  image: "assets/images/ucla.jpg"},

  {question: "What designer's pink wall does every tourist take pictures at?",
  answers: ["Louis Vuitton", "Paul Smith", "Michael Kors", "Calvin Klein"],
  correctAnswer: "Paul Smith",
  image: "assets/images/paul.png"}, 
  
  {question: "What's the most iconic LA coffee shop?",
  answers: ["Coffee Bean & Tea Leaf", "Starbucks", "Coffee Comissary", "Alfred Coffee"],
  correctAnswer: "Alfred Coffee",
  image: "assets/images/alfred.jpg"
  },
  {question: "What's the deeply overpriced shopping street in the heart of West Holywood?",
  answers: ["5th Avenue", "Rodeo Drive", "Santa Monica Blvd", "Wilshire Blvd"],
  correctAnswer: "Rodeo Drive",
  image: "assets/images/rodeo.jpg"
  }
];

var timer;
   


// the object that will hold the bulk of my code
var quiz = {
    correctScore: 0,
    wrongScore: 0,
    currentQuestion: 0,
    questionsAndAnswers,
    counter: 10,


    quizCounter: function() {
        quiz.counter--;
        $("#counter-number").text(quiz.counter);

        if (quiz.counter === 0) {
            clearInterval(timer);

            counter = 10;
            $("#counter-number").html(quiz.counter);

            quizArea.html("<h2>You're All Out of Time!</h2>");
            quizArea.append("<h3>The Correct Answer was: " + questionsAndAnswers[quiz.currentQuestion].correctAnswer + "</h3>");
            quizArea.append("<img src='" + questionsAndAnswers[quiz.currentQuestion].image + "' />");
        
            //if it's the last question...
            if (quiz.currentQuestion === questionsAndAnswers.length - 1) {
                setTimeout(quiz.getResults, 3 * 1000);
              }
            else {
                setTimeout(quiz.moveToNextQuestion, 3 * 1000);
              }
        
        }
      },

   

      loadQuestion: function(){
        //start timer
        timer = setInterval(quiz.quizCounter, 1000);
        //write the question
        quizArea.html("<h2 id='question'>" + questionsAndAnswers[this.currentQuestion].question + "</h2>");
        //write the options 
        for (var i = 0; i < questionsAndAnswers[this.currentQuestion].answers.length; i++) {
            quizArea.append("<button class='answer-button' id='button' data-name='" + questionsAndAnswers[this.currentQuestion].answers[i]
            + "'>" + questionsAndAnswers[this.currentQuestion].answers[i] + "</button>");
          }
      },

      moveToNextQuestion: function(){
          quiz.currentQuestion++;
          quiz.counter = 10;
          $("#counter-number").text(quiz.counter);
          quiz.loadQuestion();

      },

      correctAnswer: function(){
        quiz.correctScore++;

        clearInterval(timer);

        quizArea.html("<h2 class='exclamation'>Correct!</h2>");
        quizArea.append("<img src='" + questionsAndAnswers[quiz.currentQuestion].image + "' />");

        if (quiz.currentQuestion === questionsAndAnswers.length - 1) {
            setTimeout(quiz.getResults, 3 * 1000);
          }
          else {
            setTimeout(quiz.moveToNextQuestion, 3 * 1000);
          }
      },

      incorrectAnswer: function(){
          quiz.wrongScore++;
          clearInterval(timer);

            quizArea.html("<h2 class='exclamation'>Wrong!</h2>");
            quizArea.append ("<h3 class='exclamation'> The right answer was " +  questionsAndAnswers[quiz.currentQuestion].correctAnswer + "</h3>")
            quizArea.append("<img src='" + questionsAndAnswers[quiz.currentQuestion].image + "' />");

            if (quiz.currentQuestion === questionsAndAnswers.length - 1) {
                setTimeout(quiz.getResults, 3 * 1000);
              }
              else {
                setTimeout(quiz.moveToNextQuestion, 3 * 1000);
              }
      },

      reset: function() {
        this.currentQuestion = 0;
        this.counter = 10;
        this.correctScore = 0;
        this.wrongScore = 0;
        this.loadQuestion();
      },

      getResults: function(){
        clearInterval(timer);

        quizArea.html("<h2 class='results'>Here are your results! Let's see if you're a real Angeleno...");
        $("#counter-number").text(quiz.counter);
        quizArea.append("<h3 class='results'>You answered "+ quiz.correctScore + " questions correctly</h3>");
        quizArea.append("<h3 class='results'>You answered "+ quiz.wrongScore + " questions incorrectly</h3>");
        quizArea.append("<h3 class='results'>You failed to answer "+ (5 - quiz.correctScore - quiz.wrongScore) + " questions</h3>");
        quizArea.append("<br><button id='start-over'>Start Over!</button>");
      },
      clicked: function(e) {
        clearInterval(timer);
        if ($(e.target).attr("data-name") === questionsAndAnswers[this.currentQuestion].correctAnswer) {
          this.correctAnswer();
        }
        else {
          this.incorrectAnswer();
        }
      }

}

//on-click functions:
$(document).on("click", "#start", function() {
    $("#innerWrapper").prepend("<h2>Time Remaining: <span id='counter-number'>10</span> Seconds</h2>");
    quiz.loadQuestion();
  }),

  $(document).on("click", ".answer-button", function(e) {
    quiz.clicked(e);
  })
  $(document).on("click", "#start-over", function() {
      quiz.reset();
  })