// An array of objects representing quiz questions, each with a question, options, and correct answer.
var quizData = [
    {
        question: "What do you call a fish with no eyes?",
        options: ["Eyeless Fish", "Blindfish", "Noeye Trout", "Fish"],
        correctAnswer: "Blindfish",
    },

    {
        question: "Why did the scarecrow become a successful motivation speaker?",
        options: ["Because he was outstanding in his field", "Because crows love inspirational quotes", "Because he knew hot to stalk about success", "Because he was filled with hay-voc"],
        correctAnswer: "Because he was outstanding in his field",
    },

    {
        question: "How does a penguin build it house?",
        options: ["By sliding down the ice with a blueprint", "By ordering it online from the South Pole Home Depot", "Igloos it together", "By hiring a professional penguin architect"],
        correctAnswer: "Igloos it together",
    },

    {
        question: "What is vampire's favority fruit?",
        options: ["Blood Orange", "Bat Berry", "Fangtastic Grape", "Vege-bite"],
        correctAnswer: "Blood Orange",
    },


];


// A variable to keep track of the index of the current question.
var currentQuestionIndex = 0;
// A variable to keep track of the player's score.
var score = 0;
//  A variable to store the player's name.
var playerName = '';
//  An array to store the highest scores achieved.
var highestScores = [];


// A variable to store the interval ID for the timer
var timer;
// The time limit in seconds for each question.
var secondsPerQuestion = 40;


//Variables to reference HTML elements by their IDs.
var questionElement = document.getElementById('question');
var optionContainer = document.getElementById('options-container');
var timerElement = document.getElementById('time');
var scoreElement = document.getElementById('score');
var playerNameInput = document.getElementById('player-name');
var higheScoreTable = document.getElementById('high-score-table');
var nextButton = document.getElementById('next-button');


// Retrieves player name from input or sets a default name.
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    playerName = playerNameInput.value || 'Your-Name-Go-Here';
    showQuestion();
    startTimer();
}


// Retrieves the current question object.
// Updates the question element and renders options.
// If there are no more questions, calls endQuiz().
function showQuestion() {
    var currentQuestion = quizData[currentQuestionIndex];
    if(currentQuestion) {
        questionElement.textContent = currentQuestion.question;
        renderOptions(currentQuestion.options);
    } else {
        endQuiz();
    }
}


// Clears the option container.
// Creates buttons for each option and adds event listeners to check answers.
// Appends buttons to the option container.
function renderOptions(options) {
    optionContainer.innerHTML = '';
    options.forEach(function(option, index) {
        var button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', function() {
            checkAnswer(option);
        });
        optionContainer.appendChild(button);
        
    });
}


// Checks if the selected option matches the correct answer.
// Updates the score or penalizes time accordingly.
// Advances to the next question or ends the quiz.
function checkAnswer(selectedOption) {
    var currentQuestion = quizData[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
        score++;
    } else {
        secondsPerQuestion -= 3;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}


// Sets up an interval to decrement secondsPerQuestion.
// Updates the timer element.
// Ends the quiz if time runs out.
function startTimer() {
    timer = setInterval(function() {
        if (currentQuestionIndex < quizData.length) {
        secondsPerQuestion--;

        if (secondsPerQuestion >= 0) {
            timerElement.textContent = secondsPerQuestion;
    } else {
        clearInterval(timer);
        endQuiz();
    } 
} else {
    clearInterval(timer);

}    

}, 1000);

}


// Clears the timer interval.
// Calls showScore(), updateHighestScores(), and displayHighScores().
// Resets secondsPerQuestion and restarts the timer.
function endQuiz() {
    clearInterval(timer);
    showScore();
    updateHighestScores();
    displayHighScores();
    secondsPerQuestion = 40;
    startTimer();
}


// Displays a completion message, player name, and score.
// Clears the option container and updates the score element.
function showScore() {
questionElement.textContent = 'Quiz completed, ' + playerName + '! Your score is ' + score;
optionContainer.innerHTML = '';
scoreElement.textContent = 'Your Score: ' + score;

}

// Adds the current player's name and score to highestScores.
// Sorts highestScores in descending order based on scores.
function updateHighestScores() {
    highestScores.push({ playerName: playerName, score: score });
    highestScores.sort(function(a,b) {
        return b.score - a.score;
    });
}


// Clears the high score table.
// Creates table rows for each entry in highestScores and appends them to the table.
function displayHighScores() {
    higheScoreTable.innerHTML = '<tr><th>Player Name</th><th>Score</th></tr>';
    highestScores.forEach(function(entry) {
        var row = document.createElement('tr');
        row.innerHTML = '<th>' + (entry.playerName || 'Your-Name-Go-Here') + '</td><td>' + entry.score + '</td>';
        higheScoreTable.appendChild(row);
    });
}


// Listens for clicks on the 'Next' button and triggers the startQuiz function.
nextButton.addEventListener('click', startQuiz);
displayHighScores();


// Creates fireworks on the page when the DOM is fully loaded. It uses an animation and removes fireworks after the animation ends.
document.addEventListener("DOMContentLoaded", function () {
  
    function createFirework() {
        const firework = document.createElement("div");
        firework.className = "firework";
        document.body.appendChild(firework);

       
        const xPos = Math.random() * window.innerWidth;
        const yPos = Math.random() * window.innerHeight;
        firework.style.left = `${xPos}px`;
        firework.style.top = `${yPos}px`;

        
        firework.addEventListener("animationend", function () {
            firework.remove();
        });
    }

     for (let i = 0; i < 5; i++) {
        setTimeout(createFirework, i * 3000); // 
    }
});










