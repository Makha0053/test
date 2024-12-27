let currentQuestionIndex = 0;
let timeLeft = 120;
let timerInterval;
let correctAnswers = 0;
let incorrectAnswers = 0;

const questions = [
    { question: "Савол 1: Чӣ гуна барномаро бо забони HTML менависанд?", answers: [
        { text: "<html></html>", correct: true },
        { text: "<code></code>", correct: false },
        { text: "<style></style>", correct: false }
    ]},
    { question: "Савол 2: Дар CSS чӣ гуна рангро тағйир медиҳанд?", answers: [
        { text: "font-size", correct: false },
        { text: "color", correct: true },
        { text: "margin", correct: false }
    ]},
    { question: "Савол 3: Чӣ тавр скриптро дар HTML пайваст мекунанд?", answers: [
        { text: "<style></style>", correct: false },
        { text: "<link></link>", correct: false },
        { text: "<script></script>", correct: true }
    ]},
    { question: "Савол 4: Барои тағйири ҳошияи берунӣ кадом хосият истифода мешавад?", answers: [
        { text: "padding", correct: false },
        { text: "margin", correct: true },
        { text: "border", correct: false }
    ]},
    { question: "Савол 5: Чӣ тавр дар CSS андозаи шрифтро тағйир медиҳанд?", answers: [
        { text: "font-size", correct: true },
        { text: "text-size", correct: false },
        { text: "size", correct: false }
    ]},
    { question: "Савол 6: Чӣ тавр дар HTML тасвирро дохил мекунанд?", answers: [
        { text: "<image>", correct: false },
        { text: "<img>", correct: true },
        { text: "<picture>", correct: false }
    ]},
    { question: "Савол 7: Чӣ тавр дар CSS ранги заминаро тағйир медиҳанд?", answers: [
        { text: "color", correct: false },
        { text: "border-color", correct: false },
        { text: "background-color", correct: true }
    ]},
    { question: "Савол 8: Дар JavaScript кадом синтаксис дуруст аст?", answers: [
        { text: "if (a > b) { }", correct: true },
        { text: "if a > b then { }", correct: false },
        { text: "if (a > b) then { }", correct: false }
    ]},
    { question: "Савол 9: Барои эҷоди рӯйхати маркердор кадом теги HTML истифода мешавад?", answers: [
        { text: "<ol>", correct: false },
        { text: "<ul>", correct: true },
        { text: "<li>", correct: false }
    ]},
    { question: "Савол 10: Барои илова кардани гиперҳавола кадом теги HTML истифода мешавад?", answers: [
        { text: "<a>", correct: true },
        { text: "<link>", correct: false },
        { text: "<href>", correct: false }
    ]},
    { question: "Савол 11: Дар CSS кадом хосиятро барои болобурии элемент истифода мекунанд?", answers: [
        { text: "float", correct: true },
        { text: "margin", correct: false },
        { text: "position", correct: false }
    ]},
    { question: "Савол 12: Чӣ тавр видео ба HTML илова мекунанд?", answers: [
        { text: "<video></video>", correct: true },
        { text: "<media></media>", correct: false },
        { text: "<movie></movie>", correct: false }
    ]}
];

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorElement = document.getElementById("error");

    if (username === "st280607" && password === "st280607") {
        document.getElementById("login-form").classList.add("hidden");
        document.getElementById("test-container").classList.remove("hidden");
        showQuestion();
    } else {
        errorElement.textContent = "Номи корбар ё гузарвожа нодуруст аст!";
    }
}

function startTimer() {
    const timerElement = document.getElementById("timer");
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            incorrectAnswers++;
            showNextQuestion();
        } else {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        }
    }, 1000);
}

function showQuestion() {
    const questionElement = document.getElementById("question");
    const answersContainer = document.getElementById("answers");
    const questionData = questions[currentQuestionIndex];

    questionElement.textContent = questionData.question;
    answersContainer.innerHTML = "";

    questionData.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.className = "answer-btn";
        button.onclick = () => selectAnswer(answer.correct, button);
        answersContainer.appendChild(button);
    });

    timeLeft = 120;
    startTimer();
}

function selectAnswer(correct, button) {
    clearInterval(timerInterval);

    const buttons = document.querySelectorAll(".answer-btn");
    buttons.forEach(btn => btn.disabled = true);

    if (correct) {
        correctAnswers++;
        button.classList.add("correct");
    } else {
        incorrectAnswers++;
        button.classList.add("incorrect");
    }

    setTimeout(showNextQuestion, 2000);
}

function showNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById("test-container").innerHTML = `
        <h2>Результат тест</h2>
        <p>Правильных ответов: ${correctAnswers}</p>
        <p>Неправильных ответов: ${incorrectAnswers}</p>
    `;
}
