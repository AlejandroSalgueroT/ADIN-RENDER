// Script para el examen final

// Variables globales
let examState = {
    timeRemaining: 300, // 5 minutos en segundos
    currentQuestion: 0,
    questions: [],
    answers: [],
    timer: null,
    completed: false
};

// Inicializar el examen cuando la página esté cargada
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el temporizador
    updateTimerDisplay();
    
    // Cargar las preguntas
    loadExamQuestions();
    
    // Configurar eventos de navegación
    document.getElementById('prev-question-btn').addEventListener('click', prevQuestion);
    document.getElementById('next-question-btn').addEventListener('click', nextQuestion);
    
    // Configurar botón de envío
    document.getElementById('submit-exam-btn').addEventListener('click', submitExam);
    
    // Configurar botón de vuelta al mapa
    document.getElementById('back-btn').addEventListener('click', goBack);
    
    // Iniciar el examen mostrando la primera pregunta
    showQuestion(0);
    
    // Iniciar el temporizador
    startTimer();
    
    // Configurar el botón de reintentar
    document.getElementById('retry-btn').addEventListener('click', retryExam);
    
    // Configurar el botón de volver al inicio
    document.getElementById('home-btn').addEventListener('click', goHome);
});

// Cargar las preguntas del examen
function loadExamQuestions() {
    // Definir las preguntas del examen
    examState.questions = [
        {
            question: "¿Cuál es la estructura correcta para expresar obligación con MUST en presente simple?",
            options: [
                "Sujeto + must + verbo (forma base) + complemento",
                "Sujeto + must + verbo-ing + complemento",
                "Sujeto + must + to + verbo (forma base) + complemento",
                "Sujeto + must + verbo (tercera persona) + complemento"
            ],
            correctAnswer: 0
        },
        {
            question: "En el presente continuo, ¿cuál es la estructura correcta con MUST?",
            options: [
                "Sujeto + must + verbo-ing + complemento",
                "Sujeto + must + be + verbo-ing + complemento",
                "Sujeto + must + been + verbo-ing + complemento",
                "Sujeto + must + verbo (forma base) + complemento"
            ],
            correctAnswer: 1
        },
        {
            question: "¿Cómo se expresa MUST en el presente perfecto?",
            options: [
                "Sujeto + must + had + participio pasado + complemento",
                "Sujeto + have + must + participio pasado + complemento",
                "Sujeto + must + have + participio pasado + complemento",
                "Sujeto + must + has + participio pasado + complemento"
            ],
            correctAnswer: 2
        },
        {
            question: "¿Cuál es la forma correcta de expresar obligación en el pasado con MUST?",
            options: [
                "musted",
                "had must",
                "had to",
                "must had"
            ],
            correctAnswer: 2
        },
        {
            question: "En el futuro, ¿cuál es la alternativa a MUST para expresar obligación?",
            options: [
                "will must",
                "going to must",
                "will have must",
                "will have to"
            ],
            correctAnswer: 3
        },
        {
            question: "Traduce: 'Debes estar trabajando en tu proyecto ahora.'",
            options: [
                "You must working on your project now.",
                "You must to be working on your project now.",
                "You must be working on your project now.",
                "You must are working on your project now."
            ],
            correctAnswer: 2
        },
        {
            question: "Traduce: 'Debe haber olvidado su cita.'",
            options: [
                "He must forgot his appointment.",
                "He must have forgotten his appointment.",
                "He must had forgotten his appointment.",
                "He must has forgotten his appointment."
            ],
            correctAnswer: 1
        },
        {
            question: "Traduce: 'Tuve que estudiar toda la noche.'",
            options: [
                "I must study all night.",
                "I had must study all night.",
                "I had to study all night.",
                "I must had study all night."
            ],
            correctAnswer: 2
        },
        {
            question: "Traduce: 'Los estudiantes tendrán que usar uniformes el próximo año.'",
            options: [
                "Students must wear uniforms next year.",
                "Students will must wear uniforms next year.",
                "Students will have must wear uniforms next year.",
                "Students will have to wear uniforms next year."
            ],
            correctAnswer: 3
        },
        {
            question: "¿Cuál de estas oraciones usa MUST incorrectamente?",
            options: [
                "You must be joking!",
                "She must have been working all night.",
                "They must had left early.",
                "We must arrive by 9:00 PM."
            ],
            correctAnswer: 2
        }
    ];
    
    // Inicializar las respuestas como indefinidas
    examState.answers = new Array(examState.questions.length).fill(undefined);
}

// Mostrar una pregunta específica
function showQuestion(index) {
    examState.currentQuestion = index;
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';

    const question = examState.questions[index];
    const answered = examState.answers[index] !== undefined;

    // Crear el elemento de pregunta
    const questionElement = document.createElement('div');
    questionElement.className = 'exam-question';

    // Título y texto
    const questionTitle = document.createElement('h3');
    questionTitle.className = 'question-title';
    questionTitle.textContent = `Pregunta ${index + 1}`;
    questionElement.appendChild(questionTitle);

    const questionText = document.createElement('p');
    questionText.className = 'question-text';
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);

    // Opciones como botones grandes
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'question-options';

    question.options.forEach((option, i) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option-btn';
        optionBtn.textContent = option;
        optionBtn.disabled = answered;
        // Colorear si ya respondió
        if (answered) {
            if (i === question.correctAnswer) {
                optionBtn.classList.add('correct');
            } else if (i === examState.answers[index]) {
                optionBtn.classList.add('incorrect');
            } else {
                optionBtn.classList.add('disabled');
            }
        }
        optionBtn.addEventListener('click', function() {
            if (!answered) selectAnswer(index, i);
        });
        optionsContainer.appendChild(optionBtn);
    });
    questionElement.appendChild(optionsContainer);

    // Feedback textual
    let feedback = document.getElementById('exam-feedback');
    if (!feedback) {
        feedback = document.createElement('div');
        feedback.id = 'exam-feedback';
        feedback.className = 'exam-feedback';
        questionContainer.appendChild(feedback);
    } else {
        feedback.innerHTML = '';
    }
    if (answered) {
        if (examState.answers[index] === question.correctAnswer) {
            feedback.innerHTML = '<span class="feedback-correct">¡Correcto!</span>';
        } else {
            feedback.innerHTML = `<span class="feedback-incorrect">Incorrecto. La respuesta correcta es: ${question.options[question.correctAnswer]}</span>`;
        }
    }
    questionElement.appendChild(feedback);

    questionContainer.appendChild(questionElement);

    // Actualizar el contador de preguntas
    document.getElementById('exam-progress-text').textContent = `${index + 1}/10`;
    // Actualizar la barra de progreso
    const progressBar = document.getElementById('exam-progress-bar');
    if (progressBar) progressBar.style.width = `${((index + 1) / examState.questions.length) * 100}%`;

    // Botones de navegación
    const prevButton = document.getElementById('prev-question-btn');
    const nextButton = document.getElementById('next-question-btn');
    prevButton.disabled = index === 0;
    nextButton.disabled = !answered || index === examState.questions.length - 1;

    // Mostrar/ocultar botón siguiente
    if (nextButton) {
        nextButton.style.display = (index < examState.questions.length - 1) ? 'inline-block' : 'none';
    }
    // Mostrar/ocultar botón enviar
    const submitButton = document.getElementById('submit-exam-btn');
    if (submitButton) {
        submitButton.style.display = (index === examState.questions.length - 1) ? 'inline-block' : 'none';
        submitButton.disabled = !answered;
    }
}

// Seleccionar una respuesta
function selectAnswer(questionIndex, optionIndex) {
    examState.answers[questionIndex] = optionIndex;
    document.getElementById('clickSound').play();
    showQuestion(questionIndex); // Redibujar para feedback visual
}

// Navegar a la pregunta anterior
function prevQuestion() {
    // Reproducir sonido de clic
    document.getElementById('clickSound').play();
    
    if (examState.currentQuestion > 0) {
        showQuestion(examState.currentQuestion - 1);
    }
}

// Navegar a la pregunta siguiente
function nextQuestion() {
    // Reproducir sonido de clic
    document.getElementById('clickSound').play();
    
    if (examState.currentQuestion < examState.questions.length - 1) {
        showQuestion(examState.currentQuestion + 1);
    }
}

// Iniciar el temporizador
function startTimer() {
    examState.timer = setInterval(() => {
        examState.timeRemaining--;
        
        // Actualizar la visualización del temporizador
        updateTimerDisplay();
        
        // Si se agota el tiempo, enviar el examen automáticamente
        if (examState.timeRemaining <= 0) {
            clearInterval(examState.timer);
            submitExam();
        }
    }, 1000);
}

// Actualizar la visualización del temporizador
function updateTimerDisplay() {
    const minutes = Math.floor(examState.timeRemaining / 60);
    const seconds = examState.timeRemaining % 60;
    
    document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    // Cambiar el color cuando queda poco tiempo
    if (examState.timeRemaining <= 60) {
        document.getElementById('timer').classList.add('time-warning');
    } else {
        document.getElementById('timer').classList.remove('time-warning');
    }
}

// Enviar el examen
function submitExam() {
    // Detener el temporizador
    clearInterval(examState.timer);
    
    // Marcar el examen como completado
    examState.completed = true;
    
    // Calcular la puntuación
    let score = 0;
    for (let i = 0; i < examState.questions.length; i++) {
        if (examState.answers[i] === examState.questions[i].correctAnswer) {
            score++;
        }
    }
    
    // Reproducir sonido de finalización
    document.getElementById('completionSound').play();
    
    // Ocultar el contenido del examen
    document.querySelector('.exam-content').style.display = 'none';
    document.querySelector('.game-controls').style.display = 'none';
    
    // Mostrar los resultados
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.style.display = 'block';
    
    // Actualizar puntuación
    document.getElementById('final-score').textContent = `${score}/10`;
    
    // Determinar estrellas ganadas y mensaje
    let stars = 0;
    let message = '';
    
    if (score >= 9) {  // 90% o más
        stars = 3;
        message = '¡Excelente! Has dominado completamente el uso de MUST en todos los tiempos verbales. ¡Eres un verdadero maestro!';
    } else if (score >= 7) {  // 70% o más
        stars = 2;
        message = '¡Muy bien! Tienes un buen dominio del uso de MUST en los diferentes tiempos verbales. Con un poco más de práctica, serás un experto.';
    } else if (score >= 5) {  // 50% o más
        stars = 1;
        message = 'Buen intento. Has aprendido lo básico del uso de MUST, pero necesitas más práctica para dominarlo por completo.';
    } else {
        stars = 0;
        message = 'Necesitas repasar más el uso de MUST en los diferentes tiempos verbales. ¡No te desanimes! Vuelve a revisar la teoría y los ejemplos.';
    }
    
    // Mostrar mensaje
    document.getElementById('score-message').textContent = message;
    
    // Mostrar estrellas
    const starElements = [
        document.getElementById('star1'),
        document.getElementById('star2'),
        document.getElementById('star3')
    ];
    
    for (let i = 0; i < starElements.length; i++) {
        if (i < stars) {
            starElements[i].classList.add('earned');
        } else {
            starElements[i].classList.remove('earned');
        }
    }
    
    // Guardar progreso
    saveExamProgress(score, stars);
}

// Guardar progreso del examen
function saveExamProgress(score, stars) {
    // Cargar progreso actual
    let userProgress = JSON.parse(localStorage.getItem('mustQuestProgress')) || {
        stars: 0,
        level: 1,
        completedLevels: {},
        achievements: {},
        lastVisit: new Date().toISOString(),
        streak: 1
    };
    
    // Actualizar progreso
    userProgress.completedLevels['exam'] = true;
    userProgress.stars += stars * 5; // Más estrellas por el examen final
    
    // Verificar logros
    if (score === 10 && !userProgress.achievements['perfectionist']) {
        userProgress.achievements['perfectionist'] = true;
        userProgress.stars += 10;  // Bonus por perfeccionista
    }
    
    // Verificar logro de maestro de MUST si todos los niveles están completados
    const allLevelsCompleted = 
        userProgress.completedLevels['present-simple'] &&
        userProgress.completedLevels['present-continuous'] &&
        userProgress.completedLevels['present-perfect'] &&
        userProgress.completedLevels['past'] &&
        userProgress.completedLevels['future'] &&
        userProgress.completedLevels['exam'];
    
    if (allLevelsCompleted && !userProgress.achievements['must-master']) {
        userProgress.achievements['must-master'] = true;
        userProgress.stars += 15;  // Bonus extra por completar todo
    }
    
    // Guardar progreso
    localStorage.setItem('mustQuestProgress', JSON.stringify(userProgress));
}

// Reintentar el examen
function retryExam() {
    // Reproducir sonido de clic
    document.getElementById('clickSound').play();
    
    // Recargar la página para reiniciar el examen
    setTimeout(() => {
        window.location.reload();
    }, 300);
}

// Volver al inicio
function goHome() {
    // Reproducir sonido de clic
    document.getElementById('clickSound').play();
    
    // Redirigir al inicio
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 300);
}

// Volver al mapa
function goBack() {
    // Si el examen está en curso, mostrar confirmación
    if (!examState.completed) {
        if (!confirm('¿Estás seguro de que quieres abandonar el examen? Tu progreso no se guardará.')) {
            return;
        }
    }
    
    // Detener el temporizador
    clearInterval(examState.timer);
    
    // Reproducir sonido de clic
    document.getElementById('clickSound').play();
    
    // Redirigir al mapa
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 300);
}
