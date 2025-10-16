// 1. Definição das Perguntas e Respostas
const questions = [
    {
        question: "Qual é o principal componente usado para estruturar o conteúdo de uma página web?",
        answers: [
            { text: "CSS", correct: false },
            { text: "HTML", correct: true },
            { text: "JavaScript", correct: false },
            { text: "Python", correct: false },
        ]
    },
    {
        question: "Qual propriedade CSS é usada para mudar a cor do texto?",
        answers: [
            { text: "background-color", correct: false },
            { text: "font-color", correct: false },
            { text: "color", correct: true },
            { text: "text-style", correct: false },
        ]
    },
    {
        question: "Em JavaScript, qual método é usado para selecionar um elemento pelo seu ID?",
        answers: [
            { text: "getElementByClass", correct: false },
            { text: "querySelector", correct: false },
            { text: "getElementById", correct: true },
            { text: "selectElement", correct: false },
        ]
    }
];

// 2. Mapeamento de Elementos do HTML
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const scoreArea = document.getElementById("score-area");
const finalScoreElement = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");

// 3. Variáveis de Controle do Quiz
let currentQuestionIndex = 0;
let score = 0;

// 4. Função para Iniciar o Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add("hide"); // Esconde o botão "Próxima" no início
    scoreArea.classList.add("hide");  // Esconde a área de pontuação
    showQuestion();
}

// 5. Função para Exibir a Pergunta Atual
function showQuestion() {
    resetState(); // Limpa botões e estados anteriores

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // Cria os botões de resposta dinamicamente
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct; // Adiciona um atributo de dado para identificar a resposta correta
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

// 6. Função para Limpar o Estado Anterior (botões, mensagens)
function resetState() {
    nextButton.classList.add("hide");
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// 7. Função para Gerenciar a Seleção de Resposta
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
    }

    // Desabilita todos os botões e mostra a resposta correta
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; // Desabilita o clique após a resposta
    });

    // Mostra o botão "Próxima Pergunta"
    nextButton.classList.remove("hide");
}

// 8. Função para Mostrar a Pontuação Final
function showScore() {
    resetState();
    questionElement.innerHTML = "🎉 Quiz Finalizado!";
    nextButton.classList.add("hide");
    scoreArea.classList.remove("hide");
    finalScoreElement.innerHTML = `${score} de ${questions.length}`;
}

// 9. Função para Gerenciar o Botão "Próxima Pergunta"
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(); // Vai para a próxima pergunta
    } else {
        showScore(); // Se for a última, mostra a pontuação
    }
}

// 10. Listeners para os Botões Principais
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        // Reinicia o quiz
        startQuiz();
    }
});

restartButton.addEventListener("click", startQuiz);

// 11. Início do Jogo
startQuiz();
