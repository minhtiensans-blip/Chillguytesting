// =================
// CONFIG QUESTIONS
// =================

let score = 0;
let currentQuestion = 0;
let totalTime = 500;
let timeLeft;
let timer = null;

let questions = [
    {
        question: "What did you do last summer?",
        answers: ["I played Roblox", "I played Fortnite", "I slept", "I played Midsaken"],
        correct: "I slept",
        score: 50
    },
    {
        question: "What is 1 + 1?",
        answers: ["3", "2", "10", "100"],
        correct: "2",
        score: 50
    },
    {
        question: "Are you a chill guy?",
        answers: ["Yes", "No", "Maybe", "I don't care"],
        correct: "I don't care",
        score: 50
    },
    {
        question: "What will you do when your house is on fire",
        answers: ["Panic", "Run", "Standing there cuz you are a chill guy", "Cry"],
        correct: "Standing there cuz you are a chill guy",
        score: 200
    },
    {
        question: "If someone ragebait what will you do?",
        answers: ["Whoop him", "Punch him", "Ragebait him back", "Just smile"],
        correct: "Just smile",
        score: 50
    },
    {
        question: "Someone ask you to have chicken stars",
        answers: ["Cringe", "Run", "Eat chicken stars", "Smile"],
        correct: "Smile",
        score: 200
    },
    {
        question: "Your minecraft girlfriend is a middle-age bald man",
        answers: ["Just standing there like a rock", "Cry", "Kick him out of your house", "Love him"],
        correct: "Just standing there like a rock",
        score: 200
    },
    {
        question: "Mbappe dictator just came to your house",
        answers: ["Give him a bo'oh wa'er to make him calm down", "Just standing there and you dead", "Show him an euro trophy and a worldcup", "Show him an image of L.Yamal"],
        correct: "Give him a bo'oh wa'er to make him calm down",
        score: 200
    },
    {
        question: "Your dog got killed in minecraft",
        answers: ["Kill the one who kills him", "Cry", "Just get a new dog", "Shut down and touch grass"],
        correct: "Shut down and touch grass",
        score: 100
    }
];

// Determine total time safely for both local file paths and web servers
const fullPath = window.location.pathname.toLowerCase();
if (fullPath.includes("theexam2.html")) {
    totalTime = 150; // Medium
} else if (fullPath.includes("theexam3.html")) {
    totalTime = 50;  // Hard
} else if (fullPath.includes("theexam4.html")) {
    totalTime = 15;  // Impossible
} else {
    totalTime = 500; // Easy
}

// =================
// RANDOM
// =================

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(questions);
questions.forEach(q => {
    shuffle(q.answers);
});

// =================
// TIMER SYSTEM
// =================

function startTimer() {
    timeLeft = totalTime;
    updateTimerUI();

    timer = setInterval(() => {
        timeLeft--;
        updateTimerUI();

        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeOut();
        }
    }, 1000);
}

function updateTimerUI() {
    let textElem = document.getElementById("time-left");
    let barElem = document.getElementById("timer-bar");

    if (textElem) textElem.innerHTML = timeLeft;
    if (barElem) {
        let percentage = Math.max(0, (timeLeft / totalTime) * 100);
        barElem.style.width = percentage + "%";
    }
}

function handleTimeOut() {
    let buttons = document.querySelectorAll(".answer");
    buttons.forEach(btn => btn.disabled = true);
    showResultAndRedirect();
}

function showResultAndRedirect() {
    if (score <= 10) {
        alert("Finished!\nScore: " + score + "\nYou're not chill ");
    } else if (score <= 50) {
        alert("Finished!\nScore: " + score + "\nYou're getting started ");
    } else if (score <= 100) {
        alert("Finished!\nScore: " + score + "\nYou're pretty chill ");
    } else if (score <= 500) {
        alert("Finished!\nScore: " + score + "\nYou're a chill guy ");
    }
    else if (score >= 1000) {
     lert("Finished!\nScore: " + score + "\n You are the master of the chill guys ");
    }
    window.location.href = "index.html";
}

// =================
// LOAD QUESTION
// =================

function LoadQuestion() {
    let qElem = document.getElementById("question");
    if (!qElem) return;

    let q = questions[currentQuestion];
    qElem.innerHTML = q.question;

    let letters = ["A", "B", "C", "D"];
    letters.forEach((letter, index) => {
        let btn = document.getElementById(letter);
        if (btn) {
            btn.innerHTML = letter + ". " + q.answers[index];
        }
    });
}

// =================
// ANSWER
// =================

function Answer(choice) {
    let buttons = document.querySelectorAll(".answer");
    let q = questions[currentQuestion];

    buttons.forEach(btn => {
        btn.disabled = true;
    });

    let selectedElem = document.getElementById(choice);
    if (!selectedElem) return;

    let selected = selectedElem.innerHTML.substring(3);
    let correctButton;

    buttons.forEach(btn => {
        let text = btn.innerHTML.substring(3);
        if (text == q.correct) {
            correctButton = btn.id;
        }
    });

    if (selected == q.correct) {
        selectedElem.classList.add("correct");
        score += q.score;
    } else {
        selectedElem.classList.add("wrong");
        if (correctButton) {
            document.getElementById(correctButton).classList.add("correct");
        }
    }

    let scoreElem = document.getElementById("score");
    if (scoreElem) {
        scoreElem.innerHTML = "Score: " + score;
    }

    setTimeout(() => {
        buttons.forEach(btn => {
            btn.classList.remove("correct");
            btn.classList.remove("wrong");
            btn.disabled = false;
        });

        currentQuestion++;

        if (currentQuestion >= questions.length) {
            clearInterval(timer);
            showResultAndRedirect();
            return;
        }

        LoadQuestion();
    }, 1000);
}

// =================
// START QUIZ
// =================

if (document.getElementById("question")) {
    LoadQuestion();
    startTimer();
}

// =================
// SELECT EXAM
// =================

function selectcheck() {
    let nameInput = document.getElementById("input1");
    let select = document.getElementById("selection1");

    if (!nameInput || !select) return;

    if (nameInput.value.trim() === "") {
        nameInput.placeholder = "Enter Your Name";
        nameInput.classList.add("errorInput");
        return;
    }

    nameInput.classList.remove("errorInput");

    if (select.value == "1") {
        window.location.href = "theexam.html";
    } else if (select.value == "2") {
        window.location.href = "theexam2.html";
    } else if (select.value == "3") {
        window.location.href = "theexam3.html";
    } else if (select.value == "4") {
        window.location.href = "theexam4.html";
    }
}