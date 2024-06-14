const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: [
      "Ice Cream Sandwich",
      "Jelly Bean",
      "Marshmallow",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

let questionInterval = 60;
const INITIAL_COUNT_DOWN_TIME = questionInterval;
const interval = setInterval(setTimer, 1000);
let labels = document.querySelectorAll(".answerLabel");
let inputButtons = document.querySelectorAll(".inputButtons");
let printedQuestion = document.createElement("span");
let questionNumberSpan = document.querySelector("#questionNumber");
let questionNumber = 0;
let answersArray = [];
let score = 0;

// RESETTA IL TIMER A 60 SECS

function resetTimer(){
  questionInterval = INITIAL_COUNT_DOWN_TIME;
  questionInterval--;
}

// FA INIZIARE IL TIMER A SCORRERE FINO A 0 E RESETTA RICHIAMANDO LA FUNZIONE SOPRA OPPURE SE ARRIVA A QUESTION
// NUMBER >= 10 FA FINIRE L'ESAME

function setTimer(){
  countDown.innerText = questionInterval;
  questionInterval--;

  if (questionInterval < 0){
    resetTimer();
    questionNumber++;
    printAnswers(questionNumber);
  }

  if (questionNumber >= 10){
    stopExam();
  }
}


// ora creo funzione che fa fermare il test e stampa tutti i risultati!

function stopExam(){
  if (questionNumber >= 10){
    clearInterval(interval);
    document.querySelector(".inputContainer").classList.add("hiddenInput");
    document.querySelector(".spanContainer").classList.add("hiddenInput");
    document.querySelector("#timer").classList.add("hiddenInput");
    document.querySelector("#questionContainer").classList.add("hiddenInput");
    printedQuestion.classList.remove("printedQuestion");
    printedQuestion.textContent = "";
    document.querySelector("#scoreResults").classList.remove("hiddenInput");
    document.querySelector("#scoreResultsSpan").classList.remove("hiddenInput");
    showResults();
  }
}

function showResults(){
  if (score < 6){
    scoreResultsSpan.innerText = `Mi dispiace hai totalizzato ${score}/10`;
  } else {
    scoreResultsSpan.innerText = `Complimenti hai totalizzato ${score}/10`;
  }
}



function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function printAnswers(questionIndex) {
  let currentQuestion = questions[questionIndex];
  answersArray = shuffleArray([
    currentQuestion.correct_answer,
    ...currentQuestion.incorrect_answers,
  ]);

  labels.forEach((label, index) => {
    if (index < answersArray.length) {
      label.textContent = answersArray[index];
    } else {
      label.textContent = "";
    }
  });

  if (answersArray.length <= 2) {
    document.getElementById("check3").setAttribute("disabled", "disabled");
    document.getElementById("check4").setAttribute("disabled", "disabled");
    document.getElementById("button3").classList.add("hiddenInput");
    document.getElementById("button4").classList.add("hiddenInput");
  } else {
    document.getElementById("check3").removeAttribute("disabled");
    document.getElementById("check4").removeAttribute("disabled");
    document.getElementById("button3").classList.remove("hiddenInput");
    document.getElementById("button4").classList.remove("hiddenInput");
  }

  printedQuestion.textContent = currentQuestion.question;
  printedQuestion.classList.add("printedQuestion");
  questionNumberSpan.textContent = questionNumber + 1;

  document.getElementById("questionContainer").appendChild(printedQuestion);
}

printAnswers(questionNumber);

inputButtons.forEach((inputButton, index) => {
  inputButton.addEventListener("click", function () {
    if (inputButton.checked) {
      resetTimer();
      if (labels[index].textContent === questions[questionNumber].correct_answer) {
        score++;
      }
      questionNumber++;
      inputButtons.forEach(input => input.checked = false);
      if (questionNumber < questions.length) {
        printAnswers(questionNumber);
      } else {
        stopExam();
      }
    }
  });
});