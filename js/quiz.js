let param = new URLSearchParams(window.location.search);
let quizObj = Number(param.get('id'));


const $ = (element) => {
    return document.getElementById(element);
}

let currentque = 0;

let quizDetail = null;

function quizBanner(obj) {
    const idFound = quizz.find((element) => element.id === obj);
    (idFound) ? quizDetail = idFound : window.location.href("index.html");
    $('dynamic-title').innerHTML = quizDetail.title;
    $('dynamic-desc').innerHTML = quizDetail.description;
}

quizBanner(quizObj);


function showQue() {
    $('details-sec').style.display = 'none';
    $('question-sec').classList.remove("d-none");
    questionLoader(quizDetail);

}

$('start-quizz').addEventListener("click", showQue);


let userAns = [];

function showAns(i) {
    userAns[currentque] = quizDetail.questions[currentque].option[i];
    questionLoader(quizDetail);
}

function questionLoader(quizDetail) {
    $('que-num').innerHTML = currentque + 1;
    $('que-num').innerText = currentque + 1;
    $('total-que').innerText = quizDetail.questions.length;
    $('progressBar').style.width = `${((currentque + 1) / quizDetail.questions.length * 100)}%`
    $('question').innerHTML = quizDetail.questions[currentque].question;
    $('next-btn').textContent = (currentque === quizDetail.questions.length - 1) ? "Finish" : "Next";
    document.querySelector('.option').innerHTML = '';

    for (let i = 0; i < quizDetail.questions[currentque].option.length; i++) {
        let button = document.createElement('button');
        button.classList = userAns[currentque] === quizDetail.questions[currentque].option[i] ? "btn btn-primary col-5 py-2 " : "btn btn-outline-light col-5 py-2 ";
        button.innerHTML = quizDetail.questions[currentque].option[i];
        document.querySelector('.option').append(button);
        button.addEventListener("click", () => {
            showAns(i);
        })
    }

}

function finishQuizz() {
    $('question-sec').classList.add('d-none');
    $('score-sec').classList.remove('d-none');
}

function nextquestion() {

    if (currentque < quizDetail.questions.length - 1) {
        currentque++;
        questionLoader(quizDetail);
        console.log("hii");
    } else {
        finishQuizz();
    }
}

function previousquestion() {

    if (currentque > 0) {
        currentque--;
    }
    questionLoader(quizDetail);
}

$('next-btn').addEventListener("click", () => {
    nextquestion();
    showQue();
})

$('previous-btn').addEventListener("click", () => {
    previousquestion();
    showQue();
})
