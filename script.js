//declaring vars to to locate elements in the html by id's.

var questions=document.getElementById("introQuestions")
var answers=document.getElementById("answers")
var rightWrong=document.getElementById("rightWrong")
var timer=document.getElementById("timer")
var pauseMessage=document.getElementById("pauseMessage")
var pause=document.getElementById("pause")
var highScore=document.getElementById("highScore")
var highScores=document.getElementById("highScores")
var start=document.getElementById("start")
var nameEntry=document.getElementById("nameEntry")


//global vars...
var startTime=75
var currentQuestion=0
var counter = startTime
var interval;
var paused = false;
var showHighScores = false;

var score = 0;


var highScoresList = localStorage["highScores"] || "[]";
highScoresList = JSON.parse(highScoresList);


var qAndA = [ 
    {
        question: "In order for the body to stay hydrated we must drink?",
        answers: ["Red Bull", "Glue", "Water", "Gasoline"],
        correct: 2
    },
    {
        question: "In order to fly we must use an/a?",
        answers: ["Airplane", "Car", "Boat", "Train"],
        correct: 0
    },
    {
        question: "The current president of the USA is?",
        answers: ["Spider Man", "Mickey Mouse", "Obama", "Trump"],
        correct: 3
    },
    {
        question: "How many syllables are in the word Supercalifragilisticexpialidocious?",
        answers: ["27", "14", "10", "15", "12", "13", "92"],
        correct: 1
    },
    
];

function countdown() {
    interval = setInterval(function() {
        counter--;
        if (counter <= 0) {
            finishQuiz();
            return;
        }else{
            timer.innerText=counter
        }
    }, 1000);
    
}


function togglePause() {
    paused = !paused;
    
    if (paused) {
        questions.classList.add("hidden");
        answers.classList.add("hidden");
        rightWrong.classList.add("hidden");
        timer.classList.add("hidden");
        pauseMessage.classList.remove("hidden");
        clearInterval(interval);
    } else {
        questions.classList.remove("hidden");
        answers.classList.remove("hidden");
        rightWrong.classList.remove("hidden");
        timer.classList.remove("hidden");
        pauseMessage.classList.add("hidden");
        countdown();
    }
}

function toggleHighScores() {
    showHighScores = !showHighScores;
    
    if (showHighScores) {
        questions.classList.add("hidden");
        answers.classList.add("hidden");
        rightWrong.classList.add("hidden");
        timer.classList.add("hidden");
        start.classList.add("hidden");
        highScores.classList.remove("hidden");
        renderHighScores();
        
    } else {
        questions.classList.remove("hidden");
        answers.classList.remove("hidden");
        rightWrong.classList.remove("hidden");
        timer.classList.remove("hidden");
        start.classList.remove("hidden");
        highScores.classList.add("hidden");

        
    }
}



function renderQuestion(question) {
    if (question) {
        //display the current question [] mean address.
        questions.innerHTML=question.question
        //display buttons with the text of the answers
        answers.innerText="Answers:"
        for (var i = 0; i < question.answers.length; i++) {
            var button = document.createElement('button');
            var div = document.createElement("div");
            
            button.classList.add("btn");
            button.innerText = question.answers[i];
            button.addEventListener("click", (question.correct == i) ? correctAnswer : wrongAnswer)
            
            div.append(button);
            answers.append(div);
        }
    } else {
        finishQuiz();
    }
}

function renderHighScores() {
    highScores.innerHTML = "High Scores:"

    for (var i = 0; i <highScoresList.length && i < 20; i++) {
        var li = document.createElement('li');
        var sc = highScoresList[i];
        li.innerText = `${sc.name || "Unnamed"} Got Score: ${sc.score} Time Left: ${sc.counter}`;
        highScores.append(li);
    }
    if (highScoresList.length === 0) {
        highScores.innerHTML += "<br/> No Scores Yet!"
    }
}

function correctAnswer() {
    rightWrong.innerText = "fist bump, correct"
    currentQuestion += 1;
    score += 10;
    renderQuestion(qAndA[currentQuestion]);
    
}

function wrongAnswer() {
    counter -= 5;
    rightWrong.innerText = "unfortunately this is the incorrect answer"
    score -= 1;
}

function startQuiz() {
    score = 0;
    counter = startTime;
    countdown();
    
    highScore.classList.add("hidden");
    start.classList.add("hidden");
    pause.classList.remove("hidden");
    
    currentQuestion = 0;
    renderQuestion(qAndA[currentQuestion]);
    
} 

function finishQuiz () {
    clearInterval(interval);
    
    highScore.classList.remove("hidden");
    start.classList.remove("hidden");
    pause.classList.add("hidden");

    timer.innerText="";

    if (counter < 0) {
        counter = 0;
    }

    var userName = nameEntry.value;
    var scoreEntry = { score, counter, name: userName };
    highScoresList.push(scoreEntry);
    function compareScores(a, b){
        if (a.score !== b.score) {
            return b.score - a.score;
        }
        return a.counter-b.counter;
    }
    highScoresList.sort(compareScores);

    localStorage["highScores"] = JSON.stringify(highScoresList);
    
    questions.innerText = "you are done!";
    answers.innerText= "Here's your score: " + score + " and you had " + counter + " seconds remaining.";
    rightWrong.innerText = "";
}


