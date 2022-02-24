var containerQuestionEl = document.getElementById("question-container");
var containerStartEl = document.getElementById("starter-container");
var containerEndEl = document.getElementById("end-container")
var containerScoreEl = document.getElementById("score-banner")
var formInitials = document.getElementById("initials-form")
var containerHighScoresEl = document.getElementById("high-score-container")
var ViewHighScoreEl = document.getElementById("view-high-scores")
var listHighScoreEl = document.getElementById("high-score-list")
//buttons
var btnStartEl = document.querySelector("#start-game");
var btnGoBackEl = document.querySelector("#go-back")
var btnClearScoresEl = document.querySelector("#clear-high-scores")
//questions/answers element
var questionEl = document.getElementById("question")
var answerbuttonsEl = document.getElementById("answer-buttons")
var timerEl = document.querySelector("#timer");
var score = 0;
var timeleft;
var gameover
timerEl.innerText = 0;

//High Score Array
var HighScores = [];

//assign array details for questions 
var arrayShuffledQuestions
var QuestionIndex = 0

var questions = [
    { q: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    choices: [{choice: "Howdy To My ladies"}, {choice: "Hypertext Marking Language"}, {choice: "Hypertext Markup Language"}, {choice: "Hyperactive text marketing linguisics"}]
    },
    { q: "What is the correct element for the largest heading?",
    a: "h1",
    choices: [{choice: "Header"}, {choice: "h1"}, {choice: "h2"}, {choice: "span"}]
    },
    { q: "How do you make a line break?",
    a: "br",
    choices: [{choice: "break"}, {choice: "br"}, {choice: "'enter'"}, {choice: "None of the above"}]
    },
    { q: "How do you make a numbered list?",
    a: "ol",
    choices: [{choice: "li"}, {choice: "ol"}, {choice: "ul"}, {choice: "With CSS"}]
    },
    { q: "How do you make a button in html?",
    a: "<button>",
    choices: [{choice: "<btn>"}, {choice: "<click>"}, {choice: "<button>"}, {choice: "<radioswitch>"}]
    },
    { q: "How do you make a bulleted list?",
    a: "ul",
    choices: [{choice: "ul"}, {choice: "li"}, {choice: "ol"}, {choice: "With CSS"}]
    },
    { q: "How do you make a drop down list?",
    a: "Using Select",
    choices: [{choice: "Using containers"}, {choice: "Using sections"}, {choice: "Using div"}, {choice: "Using Select"}]
    },
    { q: "How do you place an image?",
    a: "<img src></img>",
    choices: [{choice: "<img src></img>"}, {choice: "<image></image>"}, {choice: "<imgur></imgur>"}, {choice: "<src></src>"}]
    },
    { q: "How do you write comments in HTML",
    a: "<!-- -->",
    choices: [{choice: "//"}, {choice: "/**/"}, {choice: "<!-- -->"}, {choice: "You can't"}]
    },
    { q: "How do define important text?",
    a: "<strong>",
    choices: [{choice: "<underline>"}, {choice: "<bold>"}, {choice: "<strong>"}, {choice: "<em>"}]
    }
]

//if go back button is hit on high score page
var renderStartPage = function () {
    containerHighScoresEl.classList.add("hide")
    containerHighScoresEl.classList.remove("show")
    containerStartEl.classList.remove("hide")
    containerStartEl.classList.add("show")
    containerScoreEl.removeChild(containerScoreEl.lastChild)
    QuestionIndex = 0
    gameover = ""
    timerEl.textContent = 0 
    score = 0

    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide")
    }
    if (wrongEl.className = "show") {
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
    }
}

//every second, check if game-over is true, or if there is time left. Start time at 30. 
var setTime = function () {
    timeleft = 30;

var timercheck = setInterval(function() {
    timerEl.innerText = timeleft;
    timeleft--

    if (gameover) {
        clearInterval(timercheck)
    }
   
    if (timeleft < 0) {
        showScore()
        timerEl.innerText = 0
        clearInterval(timercheck)
    }

    }, 1000)
}

var startGame = function() {
    //add classes to show/hide start and quiz screen
    containerStartEl.classList.add('hide');
    containerStartEl.classList.remove('show');
    containerQuestionEl.classList.remove('hide');
    containerQuestionEl.classList.add('show');
    //Shuffle the questions so they show in random order
    arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
    setTime()
    setQuestion()
  }

//set next question for quiz
var setQuestion = function() {
    resetAnswers()
    displayQuestion(arrayShuffledQuestions[QuestionIndex])
}

//remove answer buttons
var resetAnswers = function() {
    while (answerbuttonsEl.firstChild) {
        answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
    };
};

//display question information (including answer buttons)
var displayQuestion = function(index) {
    questionEl.innerText = index.q
    for (var i = 0; i < index.choices.length; i++) {
        var answerbutton = document.createElement('button')
        answerbutton.innerText = index.choices[i].choice
        answerbutton.classList.add('btn')
        answerbutton.classList.add('answerbtn')
        answerbutton.addEventListener("click", answerCheck)
        answerbuttonsEl.appendChild(answerbutton)
        }
    };

//check if answer is correct    
var answerCheck = function(event) {
    var selectedanswer = event.target
        if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText){
            score = score + 10
        }

        else {
          score = score - 1;
          timeleft = timeleft - 3;
      };

    //go to next question, check if there is more questions
      QuestionIndex++
        if  (arrayShuffledQuestions.length > QuestionIndex + 1) {
            setQuestion()
        }   
        else {
           gameover = "true";
           showScore();
            }
}

    //Display total score screen at end of game
var showScore = function () {
    containerQuestionEl.classList.add("hide");
    containerEndEl.classList.remove("hide");
    containerEndEl.classList.add("show");

    var scoreDisplay = document.createElement("p");
    scoreDisplay.innerText = ("Your final score is " + score + "!");
    containerScoreEl.appendChild(scoreDisplay);
}       

//create high score values
var createHighScore = function(event) { 
    event.preventDefault() 
    var initials = document.querySelector("#initials").value;
    if (!initials) {
      alert("Enter your intials!");
      return;
    }

  formInitials.reset();

  var HighScore = {
  initials: initials,
  score: score
  } 

  //push and sort scores
  HighScores.push(HighScore);
  HighScores.sort((a, b) => {return b.score-a.score});

//clear visibile list to resort
while (listHighScoreEl.firstChild) {
   listHighScoreEl.removeChild(listHighScoreEl.firstChild)
}
//create elements in order of high scores
for (var i = 0; i < HighScores.length; i++) {
  var highscoreEl = document.createElement("li");
  highscoreEl.ClassName = "high-score";
  highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
  listHighScoreEl.appendChild(highscoreEl);
}

  saveHighScore();
  displayHighScores();

}
//save high score
var saveHighScore = function () {
    localStorage.setItem("HighScores", JSON.stringify(HighScores))
        
}

//load values/ called on page load
var loadHighScore = function () {
    var LoadedHighScores = localStorage.getItem("HighScores")
        if (!LoadedHighScores) {
        return false;
    }

    LoadedHighScores = JSON.parse(LoadedHighScores);
    LoadedHighScores.sort((a, b) => {return b.score-a.score})


    for (var i = 0; i < LoadedHighScores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.ClassName = "high-score";
        highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
        listHighScoreEl.appendChild(highscoreEl);

        HighScores.push(LoadedHighScores[i]);
        
    }
}  

//display high score screen from link or when intiials entered
var displayHighScores = function() {

    containerHighScoresEl.classList.remove("hide");
    containerHighScoresEl.classList.add("show");
    gameover = "true"

    if (containerEndEl.className = "show") {
        containerEndEl.classList.remove("show");
        containerEndEl.classList.add("hide");
        }
    if (containerStartEl.className = "show") {
        containerStartEl.classList.remove("show");
        containerStartEl.classList.add("hide");
        }
        
    if (containerQuestionEl.className = "show") {
        containerQuestionEl.classList.remove("show");
        containerQuestionEl.classList.add("hide");
        }

    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide");
    }

    if (wrongEl.className = "show") {
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
        }
    
}
//clears high scores
var clearScores = function () {
    HighScores = [];

    while (listHighScoreEl.firstChild) {
        listHighScoreEl.removeChild(listHighScoreEl.firstChild);
    }

    localStorage.clear(HighScores);

} 

loadHighScore()
    
  //on start click, start game
  btnStartEl.addEventListener("click", startGame)
  //on submit button -- enter or click
  formInitials.addEventListener("submit", createHighScore)
  //when view high-scores is clicked
  ViewHighScoreEl.addEventListener("click", displayHighScores)
  //Go back button
  btnGoBackEl.addEventListener("click", renderStartPage)
  //clear scores button
  btnClearScoresEl.addEventListener("click", clearScores)

