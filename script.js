// Declare Variables 
const startButton = document.querySelector("#start-btn"); 
const introScreen = document.querySelector("#intro-container"); 
const questionContainer = document.querySelector("#question-container"); 
const questionElement = document.querySelector("#question"); 
const answerButtons = document.querySelector("#answer-btn-container")
const Result = document.querySelector("#rightOrWrong"); 
const endScreen = document.querySelector("#end-screen-container"); 
const scoreOnEndScreen = document.querySelector("#final-score"); 

var currentQuestion; 
var currentQuestionIndex; 

var finalScore = 0; 


//Array of Questions w/ Answers
const questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: [
            { text: "strings", correct: false },
            { text: "booleans", correct: false }, 
            { text: "alerts", correct: true }, 
            { text: "numbers", correct: false }
        ]
    },
    {
        question: "The condition in an if/else statement is enclosed within____:",
        answers: [
            { text: "quotes", correct: false },
            { text: "curly brackets", correct: false }, 
            { text: "parentheses", correct: true }, 
            { text: "square brackets", correct: false }
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store ____:",
        answers: [
            { text: "numbers & strings", correct: false },
            { text: "other arrays", correct: false },
            { text: "booleans", correct: false },
            { text: "all of the above", correct: true },

        ]
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: [
            { text: "commas", correct: false },
            { text: "curly brackets", correct: false },
            { text: "quotes", correct: true },
            { text: "parentheses", correct: false },

        ]
    },
    {
        question: "A very useful tool used during development & debugging for printing content to the debugger is:",
        answers: [
            { text: "JavaScript", correct: false },
            { text: "terminal/bash", correct: false },
            { text: "for loops", correct: false },
            { text: "console.log", correct: true },

        ]
    },  
]

// Event Listener to start the game when user clicks "Start Quiz" Button 
startButton.addEventListener("click", startQuiz); 

function startQuiz() {  
    introScreen.classList.add("hide"); 
    currentQuestion = questions.sort();  
    currentQuestionIndex = 0; 
    questionContainer.classList.remove("hide"); 
    setNextQuestion(); 
}

function setNextQuestion() {
    resetState();
    if (currentQuestion.length < currentQuestionIndex + 1) {
        showEndScreen(); 
    } else {
        showQuestion(currentQuestion[currentQuestionIndex]);
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question; 
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct 
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button); 
    })
}

function selectAnswer(event) {
    const selectedButton = event.target; 
    if (selectedButton.dataset.correct) {
        Result.innerHTML = "correct!"; 
        finalScore = finalScore + 10; 
    } else {
        Result.innerHTML = "wrong!"; 
        finalScore = finalScore - 10; 
    }
    currentQuestionIndex++;
    setNextQuestion();
    
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function showEndScreen () {
    questionContainer.classList.add("hide");
    endScreen.classList.remove("hide"); 
    const showScore = document.createElement("p");
    showScore.innerHTML = "Your final score is " + finalScore; 
    scoreOnEndScreen.appendChild(showScore); 

}




