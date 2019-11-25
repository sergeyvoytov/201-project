// select all elements
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var qImg = document.getElementById("qImg");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var counter = document.getElementById("counter");
var timeLine = document.getElementById("timeLine");
var progress = document.getElementById("progress");
var scoreDiv = document.getElementById("scoreContainer");


// create our questions
var questionsMilitary = [
    {
        question : "How did the Navy SEALs get their name?",
        imgSrc : "img/seal.jpg",
        choiceA : "Sea air land",
        choiceB : "Swimming ability",
        choiceC : "Favorite animal of the President;s daughter",
        correct : "A"
    },{
        question : "Who is the Commander in Chief of the United States armed forces?",
        imgSrc : "img/cat.jpg",
        choiceA : "Chairman of Joint Chiefs of Staff",
        choiceB : "President",
        choiceC : "Five star general",
        correct : "B"
    },{
        question : "Before the \"all-voluntary\" military, how were young men compelled to become soldiers?",
        imgSrc : "img/boot.jpg",
        choiceA : "Breeze",
        choiceB : "Grab",
        choiceC : "Draft",
        correct : "C"
    }
    ,{
      question : "What federal building is headquarters for the U.S. Armed Forces?",
      imgSrc : "img/head.jpg",
      choiceA : "White house",
      choiceB : "Fort Knox",
      choiceC : "Pentagon",
      correct : "C"
  }
   
];
// variables
var lastQuestion = questionsMilitary.length - 1;
var currentQuestion = 0;
var count = 0;
var questionTime = 10; // 10s
var lineWidth = 150; // 150px
var lineUnit = lineWidth / questionTime;
var TIMER;
var score = 0;
// render a question
function renderQuestion(){
    var q = questionsMilitary[currentQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(var qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeLine.style.width = count * lineUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(currentQuestion < lastQuestion){
            currentQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questionsMilitary[currentQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(currentQuestion < lastQuestion){
        currentQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(currentQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(currentQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    var scorePerCent = Math.round(100 * score/questionsMilitary.length);
 

    scoreDiv.innerHTML= `You got ${score} questions correct and your score is ${scorePerCent} %`;
}




















