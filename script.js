const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-button')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
    console.log(currentQuestionIndex)
})

function startGame() {
    startButton.classList.add('hide')
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
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
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
    correct ? element.classList.add('btn-correct') : element.classList.add('btn-wrong')
}

function clearStatusClass(element) {
    element.classList.remove('btn-wrong')
    element.classList.remove('btn-correct')
}

const questions = [
    {
        question: 'What is 1 + 1',
        answers: [
            { text: '2', correct: true },
            { text: '22', correct: false } 
        ]
    },
    {
        question: 'What is 1 + 1',
        answers: [
            { text: '2', correct: true },
            { text: '22', correct: false } 
        ]
    },
    {
        question: 'What is 1 + 1',
        answers: [
            { text: '2', correct: true },
            { text: '22', correct: false } 
        ]
    },
    {
        question: 'What is 1 + 1',
        answers: [
            { text: '2', correct: true },
            { text: '22', correct: false } 
        ]
    },
]