const questions = [ 
    {
        question: "Which planet in the solar system is known as the “Red Planet”?",
        answers:[
            {text: "Venus", correct: "false"},
            {text: "Mars", correct: "true"},
            {text: "Earth", correct: "false"},
            {text: "Jupiter", correct: "false"},
        ]
    },
    {
        question: "Which river is the longest in the world?",
        answers:[
            {text: "Amazon", correct: "false"},
            {text: "Mississippi", correct: "false"},
            {text: "Yangtze", correct: "false"},
            {text: "Nile", correct: "true"},
        ] 
    },
    {
        question: "What animal is the national symbol of Australia?",
        answers:[
            {text: "Crocodile", correct: "false"},
            {text: "Koala", correct: "false"},
            {text: "peacock", correct: "false"},
            {text: "Kangaroo", correct: "true"},
        ]  
    }
];
const questionElement = document.getElementById("question");
const answerbtn = document.getElementById("answer-btn");
const nextbtn = document.getElementById("next-btn");

let quecurrentindex = 0;
let score = 0;
function startQuiz(){
    quecurrentindex = 0;
    score = 0;
    nextbtn.innerHTML = "Next"
    showQue();
}

function showQue(){
    resetState();
    let currentque = questions[quecurrentindex];
    let queNo = quecurrentindex + 1;
    questionElement.innerHTML = queNo + ". " + currentque.question;

    currentque.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerbtn.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAns);
    });
}

function resetState(){
    nextbtn.style.display = "none";
    while(answerbtn.firstChild){
        answerbtn.removeChild(answerbtn.firstChild);
    }
}

function selectAns(e){
    const selctBtn = e.target;
    const isCorrect = selctBtn.dataset.correct === "true";
    if (isCorrect){
        selctBtn.classList.add("correct");
        score++;
    }
    else{
        selctBtn.classList.add("incorrect");
    }
    Array.from(answerbtn.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextbtn.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextbtn.innerHTML = "Re-attempt";
    nextbtn.style.display = "block";
}



function handleNext(){
    quecurrentindex++;
    if(quecurrentindex < questions.length){
        showQue();
    }
    else{
        showScore();
    }
}


nextbtn.addEventListener("click", () =>{
    if (quecurrentindex < questions.length){
        handleNext();
    }else{
        startQuiz();
    }
});

startQuiz();