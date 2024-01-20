var quizData = [
    {
        question: "What do you call a fish with no eyes?",
        options: ["Eyeless Fish", "Blindfish", "Noeye Trout", "Fish"],
        correctAnswer: "Blindfish",
    }
];

var currentQuestionIndex = 0;
var score = 0;
var playerName = '';
var highestScores = [];

var timer;
var secondsPerQuestion = 40;

var questionElement = document.getElementById('question');
var optionContainer = document.getElementById('options-container');
var timerElement = document.getElementById('time');
var scoreElemnt = document.getElementById('score');
var playerNameInput = document.getElementById('player-name');
var higheScoreTable = document.getElementById('high-score-table');
var nextButton = document.getElementById('next-button');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    playerName = playerNameInput.value || 'Your-Name-Go-Here';
    showQuestion();
    startTimer();
}

function showQuestion() {
    var currentQuestion = quizData[currentQuestionIndex];
    if(currentQuestion) {
        questionElement.textContent = currentQuestion.question;
        renderOptions(currentQuestion.options);
    } else {
        endQuiz();
    }
}

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

function startTimer() {
    timer = setInterval(function() {
        secondsPerQuestion--;

        if (secondsPerQuestion >= 0) {
            timerElement.textContent = secondsPerQuestion;
    } else {
        clearInterval(timer);
        endQuiz();
    }
}, 1000);
}

function endQuiz() {
    clearInterval(timer);
    showScore();
    updateHighestScores();
    displayHighScores();
}

function showScore() {
questionElement.textContent = 'Quiz completed, ' + playerName + '! Your score is ' + score;
optionContainer.innerHTML = '';
scoreElemnt.textContent = 'Your Score: ' + score;

}

function updateHighestScores() {
    highestScores.push({ playerName: playerName, score: score });
    highestScores.sort(function(a,b) {
        return b.score - a.score;
    });
}

function displayHighScores() {
    higheScoreTable.innerHTML = '<tr><th>Player Name</th><th>Score</th></tr>';
    highestScores.forEach(function(entry) {
        var row = document.createElement('tr');
        row.innerHTML = '<th>' + (entry.playerName || 'Your-Name-Go-Here') + '</td><td>' + entry.score + '</td>';
        higheScoreTable.appendChild(row);
    });
}

nextButton.addEventListener('click', startQuiz);

displayHighScores();














