const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-button')
const scoreText = document.getElementById('score')
const questionURL = "./questions.json"

let shuffledQuestions, currentQuestionIndex, score

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
    console.log(currentQuestionIndex)
})

function startGame() {
    score = 0
    startButton.classList.add('hide')
    scoreText.innerText = `Score: ${score} / ${questions.length}`
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()

}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    console.log("Question index" + currentQuestionIndex)
    console.log("Question length" + shuffledQuestions.length)
    questionElement.innerText = question.Question
    console.log(`score : ${score}`)
    question.Answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.Answer
        button.classList.add('btn')
        if (answer.isCorrect == 1) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer, {once: true})
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct

    selectedButton.classList.add("selected")

    if (correct) {
        score++
    }

    scoreText.innerText = `Score: ${score} / ${questions.length}`



    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)

        if (!button.classList.contains('selected')) {
            setUnclickable(button)
        }
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        console.log("question list > index")

        nextButton.classList.remove('hide')
    } else {
        console.log("question list <= index")
        console.log(shuffledQuestions)
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
        nextButton.classList.add('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('btn-correct')
    } else {
        element.classList.add('btn-wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('btn-wrong')
    element.classList.remove('btn-correct')
}

function setUnclickable(element) {
    element.disabled = true
}

function getJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
}


let questions
const fetchQuestions = 
fetch(questionURL).then(res => res.json()).
then(out => questions = out).catch(err => {throw err});


/*const questions = [
    {
        Question: 'What is 1 + 1',
        Answers: [
            { Answer: '2', isCorrect: true },
            { Answer: '22', isCorrect: false } 
        ]
    },
    {
        Question: 'What is 1 + 1',
        Answers: [
            { Answer: '2', isCorrect: true },
            { Answer: '22', isCorrect: false } 
        ]
    },{
        Question: 'What is 1 + 1',
        Answers: [
            { Answer: '2', isCorrect: true },
            { Answer: '22', isCorrect: false } 
        ]
    },{
        Question: 'What is 1 + 1',
        Answers: [
            { Answer: '2', isCorrect: true },
            { Answer: '22', isCorrect: false } 
        ]
    }
]*/