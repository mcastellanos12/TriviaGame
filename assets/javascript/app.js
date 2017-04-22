var panel = $("#quiz-area");
var countStartNumber = 20;

// Question set
var questions = [{
  question: "What year was Tim Duncan drafted?",
  answers: ["1999", "1994", "1991", "1997"],
  correctAnswer: "1997",
  image: "assets/images/TimDuncanDraftDay.jpg"
}, {
  question: "Who is the current head coach for the Spurs?",
  answers: ["Gregg Popovich", "Steve Kerr", "Doc Rivers", "Tony Parker"],
  correctAnswer: "Gregg Popovich",
  image: "assets/images/Pop.jpg"
}, {
  question: "How many championships have the Spurs won?",
  answers: ["4", "2", "6", "5"],
  correctAnswer: "5",
  image: "assets/images/5.jpg"
}, {
  question: "Which Spurs player is also known as The Admiral?",
  answers: ["David Robinson", "Michael Jordan", "Danny Green", "Tim Duncan"],
  correctAnswer: "David Robinson",
  image: "assets/images/DavidRobinson.jpg"
}, {
  question: "What year did the Spurs win their first championship?",
  answers: ["1993", "2001", "1999", "1996"],
  correctAnswer: "1999",
  image: "1999.jpg"
}, {
  question: "What position does Tony Parker play?",
  answers: ["Power forward", "Shooting guard", "Point guard", "Small forward"],
  correctAnswer: "Point guard",
  image: "assets/images/TonyParker.jpg"
}, {
  question: "How many years did Tim Duncan play with the Spurs",
  answers: ["16", "12", "21", "19"],
  correctAnswer: "19",
  image: "assets/images/TimDuncanRetirement.jpg"
}, {
  question: "The San Antonio Spurs were originally founded as ...",
  answers: ["Houston Bobcats", "El Paso Coyotes", "Portland Eagles", "Dallas Chapparals"],
  correctAnswer: "Dallas Chapparals",
  image: "assets/images/DallasChapparals.jpg"
}];

// Variable to hold our setInterval
var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    this.counter--;
    $("#counter-number").html(this.counter);
    if (this.counter === 0) {
      console.log("TIME UP");
      this.timeUp();
    }
  },

  loadQuestion: function() {

    timer = setInterval(this.countdown.bind(this), 1000);

    panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    this.counter = window.countStartNumber;
    $("#counter-number").html(this.counter);
    this.currentQuestion++;
    this.loadQuestion.bind(this)();
  },

  timeUp: function() {

    clearInterval(window.timer);

    $("#counter-number").html(this.counter);

    panel.html("<h2>Out of Time!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion == questions.length - 1) {
      setTimeout(this.results, 2 * 1000);
    }
    else {
      setTimeout(this.nextQuestion, 2 * 1000);
    }
  },

  results: function() {

    clearInterval(window.timer);

    panel.html("<h2>Let's see how you did!</h2>");

    $("#counter-number").html(this.counter);

    panel.append("<h3>Correct Answers: " + this.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
    panel.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(window.timer);
    if ($(e.target).data("name") == questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    this.incorrect++;

    clearInterval(window.timer);

    panel.html("<h2>Incorrect!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer + "</h3>");
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion == questions.length - 1) {
      setTimeout(this.results.bind(this), 2 * 1000);
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 2 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(window.timer);

    this.correct++;

    panel.html("<h2>Correct!</h2>");
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion == questions.length - 1) {
      setTimeout(this.results.bind(this), 2 * 1000);
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 2 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", game.reset.bind(game));

$(document).on("click", ".answer-button", function(e) {
  game.clicked.bind(game, e)();
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>20</span> Seconds</h2>");
  game.loadQuestion.bind(game)();
});


