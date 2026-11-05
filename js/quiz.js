let param = new URLSearchParams(window.location.search);
let quizObj = Number(param.get('id')) || 1;

const $ = (element) => {
    return document.getElementById(element);
}

let stop;
let currentque = 0;
let timer = 0;
let userAns = [];
let visited = [];
let activeOpi = [];


function quizBanner(obj) {

    let idFound = quizz.find((element) => element.id === obj);

    if (idFound) {
        quizObj = idFound;
    } else {
        window.location.href = "index.html";
        return;
    }

    $('dynamic-title').innerHTML = quizObj.title;
    $('dynamic-desc').innerHTML = quizObj.description;
    $('total-que-badge').innerHTML = quizObj.questions.length;
    $('total-time-badge').innerHTML = quizObj.time;
    $('level-badge').innerHTML = quizObj.level;


}

function showQue() {
    $('term-condition').style.display = 'none';
    $('question-sec').classList.remove("d-none");
    $('quiz-detail').classList.remove("d-none");
    $('score-sec').classList.add('d-none');

    timer = quizObj.time;
    currentque = 0;

    visited = [];
    for (let i = 0; i < quizObj.questions.length; i++) {
        visited.push(false);
    }

    // legendAttemped();
    userAns = [];
    for (i = 0; i < quizObj.questions.length; i++) {
        userAns.push(null);
    }

    startTimer();
    questionLoader(quizObj);
}

function questionLoader(quizDetail) {

    $('attemp').innerHTML = attempQue();
    $('timer').innerText = timer;
    $('total-que').innerText = quizDetail.questions.length;
    $('progressBar').style.width = `${((currentque + 1) / quizDetail.questions.length * 100)}%`
    $('question').innerHTML = quizDetail.questions[currentque].question;
    $('next-btn').textContent = (currentque === quizDetail.questions.length - 1) ? "Finish" : "Next";
    document.querySelector('.option').innerHTML = '';


    for (let i = 0; i < quizDetail.questions[currentque].option.length; i++) {
        let button = document.createElement('button');
        button.classList = userAns[currentque] === quizDetail.questions[currentque].option[i] ? "btn btn-primary col-5 py-2 active-btn " : "btn btn-outline-light col-5 py-2 active-btn";

        button.innerHTML = quizDetail.questions[currentque].option[i];

        if (userAns[currentque] !== null) {

            if (userAns[currentque] !== quizObj.questions[currentque].option[i]) {
                button.disabled = true;
            }
        }

        document.querySelector('.option').append(button);
        button.addEventListener("click", () => {
            showAns(i);
        })
    }

    $("indicatorCard").innerHTML = '';
    quizObj.questions.forEach((element, index) => {

        $("indicatorCard").innerHTML += `<span class= "${visited[index] != false ? userAns[index] != null ? " rounded-2 ques-box ques-l-box bg-primary ques-m-box ques-s-box ques-xs-box" : "ques-xs-box ques-l-box rounded-2 bg-warning  ques-box ques-s-box ques-m-box" : "ques-xs-box ques-l-box ques-s-box rounded-2 bg-danger  ques-box ques-m-box"}">${index + 1}</span>`
    });

    visited[currentque] = true;

}

function showAns(i) {
    userAns[currentque] = quizObj.questions[currentque].option[i];

    questionLoader(quizObj);
}

function finishQuizz() {
    clearInterval(stop);

    $('question-sec').classList.add('d-none');
    $('score-sec').classList.remove('d-none');
    $('quiz-detail').classList.add("d-none");
    
    $('timeLeft').innerText = quizObj.time - timer;
    
    $('skip').innerText = skipQue();
    $('result').innerHTML = attempQue();
    $('correctAns').innerText = correctScore();
    $('wrongAns').innerText = wrongScore();
    
    // performance = correct / total question * 100
    
    let performance = (correctScore() / quizObj.questions.length) * 100;

    if (performance >= 90) {
        $('performance').innerText = "Outstanding Performance";
    } else if (performance >= 80) {
        $('performance').innerText = "Excellent Performance";
    } else if (performance >= 60) {
        $('performance').innerText = "Good Performance";
    } else if (performance >= 35) {
        $('performance').innerText = "Try Hard!! ";
    } else {
        $('performance').innerText = "Better Luck Next Time !!! ";
    }
}

function skipQue() {
    let skip = 0;

    for (i = 0; i < userAns.length; i++) {
        if (userAns[i] === null) {
            skip++;
        }
    }

    return skip;
}

function attempQue() {
    let attemp = 0;

    for (i = 0; i < userAns.length; i++) {
        if (userAns[i] !== null) {
            attemp++;
        }
    }

    return attemp;
}

function correctScore() {
    let correct = 0;

    for (let i = 0; i < quizObj.questions.length; i++) {
        if (userAns[i] === quizObj.questions[i].ans) {
            correct++;
        }
    }
    return correct;

}

function wrongScore() {
    let wrong = 0;

    for (let i = 0; i < quizObj.questions.length; i++) {
        if (userAns[i] != null && userAns[i] !== quizObj.questions[i].ans) {
            wrong++;
        }
    }
    return wrong;

}

function nextquestion() {

    if (currentque < quizObj.questions.length - 1) {
        currentque++;
        questionLoader(quizObj);

    } else {
        finishQuizz();

    }

}

function previousquestion() {

    if (currentque > 0) {
        currentque--;
    }
    questionLoader(quizObj);
}

function startTimer() {

    stop = setInterval(() => {

        if (timer === 0) {
            finishQuizz();
        }
        $('timer').innerText = timer--;

    }, 1000);

}

let quizQue = quizBanner(quizObj);

$('start-quizz').addEventListener("click", showQue);

$('home-btn').addEventListener("click", () => window.location.replace("index.html"));

$('next-btn').addEventListener("click", nextquestion)

$('previous-btn').addEventListener("click", previousquestion)

$('try-again-btn').addEventListener("click", showQue);





