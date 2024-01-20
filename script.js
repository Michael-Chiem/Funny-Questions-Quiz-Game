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
}