var quizData = [
    {
        question: "What do you call a fish with no eyes?",
        option: ["Eyeless Fish", "Blidfish", "Noeye Trout", "Fish"],
        correctAnswer: "Blidfish",
    }
];

var currentQuestionIdex = 0;
var score = 0;
var playerName = '';
var highestScores = [];

var timer;
var secondsPerQuestions = 40;

var questionElement = document.getElementById('questions');
var optionContainer = document.getElementById('options-container');
var timerElement = document.getElementById('time');
var scoreElemnt = document.getElementById('score');
var playerNameInput = document.getElementById('player-name');
var higheScoreTable = document.getElementById('high-score-table');
var nextButton = document.getElementById('next-button');

function startQuiz() {
    currentQuestionIdex = 0;
    score = 0;
    playerName = playerNameInput.value || 'Your-Name-Go-Here';
    showQuestion();
    startTimer();
}

function showQuestion() {
    var currentQuestion = quizData[currentQuestionIdex];
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
        button.textContent = options;
        button.addEventListener('click', function() {
            checkAnswer(option);
        });
        optionContainer.appendChild(button);
        
    });
}

function checkAnswer(selectedOption) {
    var currentQuestion = quizData[currentQuestionIdex];
    if (selectedOption == currentQuestion.correctAnswer) {
        score++;
    } else {
        secondsPerQuestions -= 3;
    }

    currentQuestionIdex++;
    if (currentQuestionIdex < quizData.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function startTimer() {
    timer = setInterval(function() {
        secondsPerQuestions--;

        if (secondsPerQuestions >= 0) {
            timerElement.textContent = secondsPerQuestions;
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
        var row =document.createElement('tr');
        HTMLTableRowElement.innerHTML = '<th>' + (entry.playerName || 'Your-Name-Go-Here') + '</td><td>' + entry.score + '</td>';
        higheScoreTable.appendChild(row);
    });
}














