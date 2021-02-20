// Arrangement
const startButton = document.querySelector("#start-btn"); 
const introScreen = document.querySelector("#intro-container"); 
const questionContainer = document.querySelector("#question-container"); 
const questionElement = document.querySelector("#question"); 
const answerButtons = document.querySelector("#answer-btn-container")
const Result = document.querySelector("#rightOrWrong"); 
const endScreen = document.querySelector("#end-screen-container"); 
const scoreOnEndScreen = document.querySelector("#final-score"); 
const timerEl = document.querySelector("#countdown"); 
const submitBtnEl = document.querySelector("#submit-btn"); 
const userInitialsInput = document.querySelector("#enter-initials"); 
const highscoresPage = document.querySelector("#highscores-page"); 
const highscoresList = document.querySelector("#entered-scores"); 
const goBackButton = document.querySelector("#go-back-btn");
const clearHighscoresButton = document.querySelector("#clear-highscores-btn"); 
const viewHighscores = document.querySelector("#view-high-scores"); 

var currentQuestion; 
var currentQuestionIndex; 

var score = 0; 
var timeLeft = 59; 
var timeInterval; 

if (localStorage.length === 0) {
    var highscores = []; 
} else {
    var highscores = JSON.parse(localStorage.getItem("highscores"));  
} 

var highscore; 
var li; 
var storedHighscores; 
var highscoreText; 

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
    countdown(); 
    introScreen.classList.add("hide"); 
    currentQuestion = questions.sort();  
    currentQuestionIndex = 0; 
    questionContainer.classList.remove("hide"); 
    setNextQuestion(); 
}

// the countdown function (AKA: the timer) starts when the startQuiz function is called
function countdown() {
    timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timerEl.textContent = "Time Left: " + timeLeft + " seconds";
            timeLeft--;
        } else {
            timerEl.textContent = "Time Left: 0 seconds"; 
            showEndScreen(); 
            clearInterval(timeInterval); 

        }
    }, 1000); 
}

// brings up the first question after the "Start Quiz" button is pressed, and continues to show questions until no questions are left in the array
// when no questions are left, the End Screen will show 
function setNextQuestion() {
    resetState();
    if (currentQuestion.length < currentQuestionIndex + 1) {
        showEndScreen(); 
    } else {
        showQuestion(currentQuestion[currentQuestionIndex]);
    }
}

// sets the content of the question & answer fields and shows that to the user 
// when one of the answers is selected, it calls the selectAnswer function
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

// this function registers whether the selected answer is right or wrong, and either adds to the score and takes away from the time respectively 
function selectAnswer(event) {
    const selectedButton = event.target; 
    if (selectedButton.dataset.correct) {
        Result.innerHTML = "correct!"; 
        score = score + 10; 
    } else {
        timeLeft = timeLeft - 10; 
        Result.innerHTML = "wrong!";
    }
    currentQuestionIndex++;
    setNextQuestion();
    
}
// starts each question with a clean slate by removing the question that came before
function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
// brings up the End Screen, informing the user they have completed the quiz
// shows the user their score and allows them to enter their initials
function showEndScreen () {
    clearInterval(timeInterval); 
    questionContainer.classList.add("hide");
    endScreen.classList.remove("hide"); 
    const showScore = document.createElement("p");
    showScore.innerHTML = "Your final score is " + (score + timeLeft); 
    scoreOnEndScreen.appendChild(showScore); 

}

// functions related to Local Storage & showing the Highscores Page after user clicks "submit"
submitBtnEl.addEventListener("click", showHighscoresPage);

function showHighscoresPage (event) {
    event.preventDefault();  
    endScreen.classList.add("hide"); 
    highscoresPage.classList.remove("hide"); 

    highscoreText = userInitialsInput.value + " - " + (score + timeLeft); 

    if (userInitialsInput.value !== "") {
    highscores.push(highscoreText); 
    userInitialsInput.value = ""; 
    }

    storeHighscores();
    renderHighscores(); 

}
function storeHighscores() {
    localStorage.setItem("highscores", JSON.stringify(highscores)); 
}
function renderHighscores() {
    for (var i = 0; i < 10; i++) {
        highscore = highscores[i];

        li = document.createElement("li");
        li.textContent = highscore;
        li.setAttribute("data-index", i);

        highscoresList.appendChild(li); 
    }
} 

//Go Buck Button - returns you to the beginning of the quiz 
goBackButton.addEventListener("click", function() {
    introScreen.classList.remove("hide"); 
    highscoresPage.classList.add("hide"); 

    while (scoreOnEndScreen.firstChild) {
        scoreOnEndScreen.removeChild(scoreOnEndScreen.firstChild);
    }

    while (highscoresList.firstChild) {
        highscoresList.removeChild(highscoresList.firstChild);
    }
    timeLeft = 60;
    timerEl.textContent = "Time Left: " + timeLeft + " seconds";

    
})

// Clear Highscores button - removes items from Local Storage 
clearHighscoresButton.addEventListener("click", function() {
    localStorage.clear(); 
    while (highscoresList.firstChild) {
    highscoresList.removeChild(highscoresList.firstChild);
    } 
})

//"View High Scores" link 
viewHighscores.addEventListener("click", function(event) {
    showHighscoresPage(event); 
    introScreen.classList.add("hide"); 
    questionContainer.classList.add("hide");
    endScreen.classList.add("hide"); 
    clearInterval(timeInterval); 

});
