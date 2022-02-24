var question = document.querySelector("#question");
var choices = Array.from(document.querySelectorAll(".choice-text"));

let currentQuestion = {}
let correctAnswers = true
let score = 0
let questions = [
    {
        question: "What does HTML stand for?",
        choice1: "Howdy To My ladies",
        choice2: "Hypertext Marking Language",
        choice3: "Hypertext Markup Language",
        choice4: "Hyperactive text marketing linguisics",
        answer: 3
    },
    {
        question: "What is the correct element for the largest heading?",
        choice1: "Header",
        choice2: "h1",
        choice3: "h2",
        choice4: "span",
        answer: 2
    },
    {
        question: "How do you make a line break?",
        choice1: "break",
        choice2: "br",
        choice3: "'enter'",
        choice4: "None of the above",
        answer: 2
    },
    {
        question: "What does HTML stand for?",
        choice1: "Howdy To My ladies",
        choice2: "Hypertext Marking Language",
        choice3: "Hypertext Markup Language",
        choice4: "Hyperactive text marketing linguisics",
        answer: 3
    },
    {
        question: "How do you make a numbered list?",
        choice1: "li",
        choice2: "ol",
        choice3: "ul",
        choice4: "With CSS",
        answer: 2,
    },
    {
        question: "How do you make a bulleted list?",
        choice1: "ul",
        choice2: "li",
        choice3: "ol",
        choice4: "With CSS",
        answer: 1
    },
    {
        question: "How do you make a drop down list?",
        choice1: "Using containers",
        choice2: "Using sections",
        choice3: "Using div",
        choice4: "Using Select",
        answer: 4
    },
    {
        question: "How do you place an image?",
        choice1: "<img src></img>",
        choice2: "<image></image>",
        choice3: "<imgur></imgur>",
        choice4: "<src></src>",
        answer: 1
    },
    {
        question: "How do you write comments in HTML",
        choice1: "//",
        choice2: "/**/",
        choice3: "<!-- -->",
        choice4: "You can't",
        answer: 3
    },
    {
        question: "How do define important text?",
        choice1: "<underline>",
        choice2: "<bold>",
        choice3: "<strong>",
        choice4: "<em>",
        answer: 3
    },
    {
        question: "How do you make a button in html?",
        choice1: "<btn>",
        choice2: "<button>",
        choice3: "<click>",
        choice4: "<radioswitch>",
        answer: 2
    }
]

var scorePoints = 100

startGame = () => {
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }
    var questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        var number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true

}

choices.forEach(choice => {
    choice.addEventListener('click', event => {
    if(!acceptingAnswers) return

    acceptingAnswers = false
    var selectedChoice = event.target
    var selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if(classToApply === 'correct') {
        incrementScore(scorePoints)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply)
        getNewQuestion()
        
    }, 1000)

    })
})

incrementScore = num => {
    score +=num
}

startGame();