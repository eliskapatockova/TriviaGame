

var quizArea = $("#quiz-area");

var questionsAndAnswers = [{
    question: "Approximately how many people currently live in LA?",
    answers: ["5 million", "9 million", "12 million", "15 million"],
    correctAnswer: "12 million",
    image: "assets/images/traffic.jpg"}, 

    {question: "What is the coolest college in LA? ;)",
  answers: ["UCLA", "USC", "Santa Monica College", "Loyola Marymount"],
  correctAnswer: "Paul Smith",
  image: "assets/images/ucla.jpg"},

  {question: "What designer's pink wall does every tourist take pictures at?",
  answers: ["Louis Vuitton", "Paul Smith", "Michael Kors", "Calvin Klein"],
  correctAnswer: "Paul Smith",
  image: "assets/images/paul.png"}, 
  
  {question: "What's the most iconic LA coffee shop?",
  answers: ["Coffee Bean & Tea Leaf", "Starbucks", "Coffee Comissary", "Alfred Coffee"],
  correctAnswer: "Paul Smith",
  image: "assets/images/alfred.jpg"
  },
  {question: "What's the deeply overpriced shopping street in the heart of West Holywood?",
  answers: ["5th Avenue", "Rodeo Drive", "Santa Monica Blvd", "Wilshire Blvd"],
  correctAnswer: "Rodeo Drive",
  image: "assets/images/rodeo.jpg"
  }
];

var timer;
//on-click functions:
    $(document).on("click", "#start", function() {
        $("#innerWrapper").prepend("<h2>Time Remaining: <span </span> Seconds</h2>");
        quiz.loadQuestion();
      }),

      $(document).on("click", ".answer-button", function() {

      })
      $(document).on("click", "#start-over", function() {
          quiz.reset();
      })


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
            this.wrongScore++;

            counter = 10;
            $("#counter-number").html(quiz.counter);

            quizArea.html("<h2>You're All Out of Time!</h2>");
            quizArea.append("<h3>The Correct Answer was: " + questionsAndAnswers[this.currentQuestion].correctAnswer);
            quizArea.append("<img src='" + questionsAndAnswers[this.currentQuestion].image + "' />");
        
            //if it's the last question...
            if (game.currentQuestion === questionsAndAnswers.length - 1) {
                setTimeout(quiz.getResults, 3 * 1000);
              }
            else {
                setTimeout(quiz.nextQuestion, 3 * 1000);
              }
        
        }
      },

   

      loadQuestion: function(){
        //start timer
        timer = setInterval(quiz.quizCounter, 1000);
        //write the question
        quizArea.html("<h2>" + questionsAndAnswers[this.currentQuestion].question + "</h2>");
        //write the options 

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

        quizArea.html("<h2>Correct!</h2>");
        quizArea.append("<img src='" + questions[quiz.currentQuestion].image + "' />");
      },

      incorrectAnswer: function(){
          quiz.wrongScore++;

          quizArea.html("<h2>Wrong!</h2>");
        quizArea.append ("<h3> The right answer was" +  questions[quiz.currentQuestion].correctAnswer + "</h3>")
        quizArea.append("<img src='" + questions[quiz.currentQuestion].image + "' />");
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

        quizArea.html("<h2>Here are your results! Let's see if you're a real Angeleno...");
        $("#counter-number").text(quiz.counter);
        quizArea.append("<h3>You answered"+ quiz.correctScore + "questions correctly</h3>");
        quizArea.append("<h3>You answered"+ quiz.wrongScore + "questions incorrectly</h3>");
        quizArea.append("<h3>You didn't answer"+ (5 - quiz.correctScore - quiz.wrongScore) + "questions</h3>");
        quizArea.append("<br><button id='start-over'>Start Over!</button>");
      }


}