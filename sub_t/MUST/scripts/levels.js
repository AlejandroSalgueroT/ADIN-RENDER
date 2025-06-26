// Common script for all level pages

// Variables globales
let levelProgress = {
    section: getCurrentSection(),
    visitedSections: [],
    exercisesCompleted: 0,
    totalExercises: 5,
    quizScore: 0,
    quizTotal: 10,
    stars: 0
};

// Elementos del DOM
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar controlador de sonido
    const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle) {
        soundToggle.addEventListener('click', toggleSound);
    }
    
    // Inicializar navegación de secciones
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('href').substring(1);
            navigateToSection(section);
        });
    });
    
    // Inicializar ejercicios de opción múltiple
    const optionButtons = document.querySelectorAll('.option');
    optionButtons.forEach(button => {
        button.addEventListener('click', handleOptionClick);
    });
    
    // Inicializar ejercicios de transformación
    const checkButtons = document.querySelectorAll('.check-btn');
    checkButtons.forEach(button => {
        button.addEventListener('click', checkTransformAnswer);
    });
    
    // Inicializar quiz si estamos en la sección de desafío
    if (document.getElementById('quiz-container')) {
        initializeQuiz();
    }
    
    // Actualizar el contador de progreso
    updateProgressCount();
});

// Obtener la sección actual del nivel
function getCurrentSection() {
    const path = window.location.pathname;
    const page = path.split('/').pop().split('.')[0];
    return page;
}

// Navegar a una sección específica dentro del nivel
function navigateToSection(section) {
    // Reproducir sonido de clic
    document.getElementById('clickSound').play();
    
    // Actualizar enlaces activos
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        if (link.getAttribute('href') === '#' + section) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Actualizar secciones visibles
    const sections = document.querySelectorAll('.level-section');
    sections.forEach(sec => {
        if (sec.id === section) {
            sec.classList.add('active');
        } else {
            sec.classList.remove('active');
        }
    });
    
    // Registrar esta sección como visitada si es la primera vez
    if (!levelProgress.visitedSections.includes(section)) {
        levelProgress.visitedSections.push(section);
        updateProgressCount();
    }
    
    // Si estamos en la sección de desafío y el quiz no se ha inicializado
    if (section === 'challenge' && document.getElementById('quiz-container') && 
        document.getElementById('quiz-container').children.length === 0) {
        initializeQuiz();
    }
    
    // Desplazarse al inicio de la sección
    window.scrollTo(0, 0);
}

// Manejar clic en opciones de ejercicios
function handleOptionClick() {
    const exercise = this.closest('.exercise');
    const options = exercise.querySelectorAll('.option');
    const feedback = exercise.querySelector('.feedback');
    const isCorrect = this.hasAttribute('data-correct');
    
    // Deshabilitar todas las opciones
    options.forEach(opt => {
        opt.disabled = true;
    });
    
    if (isCorrect) {
        // Reproducir sonido de respuesta correcta
        document.getElementById('correctSound').play();
        
        // Marcar la opción como correcta
        this.classList.add('correct');
        
        // Mostrar retroalimentación positiva
        feedback.textContent = '¡Correcto! ¡Muy bien!';
        feedback.className = 'feedback correct-feedback';
        
        // Incrementar contador de ejercicios completados
        levelProgress.exercisesCompleted++;
        updateProgressCount();
    } else {
        // Reproducir sonido de respuesta incorrecta
        document.getElementById('wrongSound').play();
        
        // Marcar la opción como incorrecta
        this.classList.add('incorrect');
        
        // Mostrar la opción correcta
        options.forEach(opt => {
            if (opt.hasAttribute('data-correct')) {
                opt.classList.add('correct');
            }
        });
        
        // Mostrar retroalimentación negativa
        feedback.textContent = 'Incorrecto. Intenta de nuevo.';
        feedback.className = 'feedback incorrect-feedback';
    }
    
    // Habilitar las opciones después de un tiempo
    setTimeout(() => {
        options.forEach(opt => {
            opt.disabled = false;
            opt.classList.remove('correct', 'incorrect');
        });
        feedback.textContent = '';
    }, 3000);
}

// Verificar respuesta en ejercicios de transformación
function checkTransformAnswer() {
    const exercise = this.closest('.transform-exercise');
    const input = exercise.querySelector('.transform-input');
    const feedback = exercise.querySelector('.feedback');
    
    const userAnswer = input.value.trim().toLowerCase();
    const correctAnswers = input.getAttribute('data-answer').split(',').map(ans => ans.trim().toLowerCase());
    
    if (correctAnswers.includes(userAnswer)) {
        // Reproducir sonido de respuesta correcta
        document.getElementById('correctSound').play();
        
        // Marcar como correcto
        input.classList.add('correct-input');
        
        // Mostrar retroalimentación positiva
        feedback.textContent = '¡Correcto! ¡Muy bien!';
        feedback.className = 'feedback correct-feedback';
        
        // Incrementar contador de ejercicios completados
        levelProgress.exercisesCompleted++;
        updateProgressCount();
    } else {
        // Reproducir sonido de respuesta incorrecta
        document.getElementById('wrongSound').play();
        
        // Marcar como incorrecto
        input.classList.add('incorrect-input');
        
        // Mostrar retroalimentación negativa
        feedback.textContent = `Incorrecto. La respuesta correcta es: ${correctAnswers[0]}`;
        feedback.className = 'feedback incorrect-feedback';
    }
    
    // Limpiar estilos después de un tiempo
    setTimeout(() => {
        input.classList.remove('correct-input', 'incorrect-input');
        feedback.textContent = '';
    }, 3000);
}

// Actualizar el contador de progreso
function updateProgressCount() {
    const progressCount = document.getElementById('progress-count');
    if (progressCount) {
        progressCount.textContent = `${levelProgress.exercisesCompleted}/${levelProgress.totalExercises}`;
    }
}

// Inicializar el quiz del desafío final
function initializeQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    const currentQuestion = document.getElementById('current-question');
    const totalQuestions = document.getElementById('total-questions');
    const prevButton = document.getElementById('prev-question');
    const nextButton = document.getElementById('next-question');
    
    // Preguntas del quiz (deben personalizarse para cada nivel)
    const quizQuestions = getQuizQuestions();
    let currentQuestionIndex = 0;
    
    // Actualizar el contador de preguntas
    if (totalQuestions) totalQuestions.textContent = quizQuestions.length;
    if (currentQuestion) currentQuestion.textContent = currentQuestionIndex + 1;
    
    // Función para mostrar una pregunta
    function showQuestion(index) {
        // Limpiar el contenedor
        quizContainer.innerHTML = '';
        
        // Crear el elemento de pregunta
        const questionElement = document.createElement('div');
        questionElement.className = 'quiz-question';
        
        // Añadir el texto de la pregunta
        const questionText = document.createElement('p');
        questionText.className = 'question-text';
        questionText.textContent = quizQuestions[index].question;
        questionElement.appendChild(questionText);
        
        // Añadir las opciones
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'quiz-options';
        
        quizQuestions[index].options.forEach((option, i) => {
            const optionButton = document.createElement('button');
            optionButton.className = 'quiz-option';
            optionButton.textContent = option;
            
            // Si la pregunta ya fue respondida, mostrar feedback
            if (quizQuestions[index].userAnswer !== undefined) {
                optionButton.disabled = true;
                
                if (i === quizQuestions[index].userAnswer) {
                    if (i === quizQuestions[index].correctAnswer) {
                        optionButton.classList.add('correct');
                    } else {
                        optionButton.classList.add('incorrect');
                    }
                } else if (i === quizQuestions[index].correctAnswer) {
                    optionButton.classList.add('correct');
                }
            }
            
            optionButton.addEventListener('click', () => {
                selectAnswer(index, i);
            });
            
            optionsContainer.appendChild(optionButton);
        });
        
        questionElement.appendChild(optionsContainer);
        
        // Añadir retroalimentación si ya se respondió
        if (quizQuestions[index].userAnswer !== undefined) {
            const feedbackElement = document.createElement('div');
            feedbackElement.className = 'quiz-feedback';
            
            if (quizQuestions[index].userAnswer === quizQuestions[index].correctAnswer) {
                feedbackElement.textContent = '¡Correcto!';
                feedbackElement.classList.add('correct-feedback');
            } else {
                feedbackElement.textContent = 'Incorrecto. La respuesta correcta es: ' + 
                                             quizQuestions[index].options[quizQuestions[index].correctAnswer];
                feedbackElement.classList.add('incorrect-feedback');
            }
            
            questionElement.appendChild(feedbackElement);
        }
        
        // Añadir al contenedor
        quizContainer.appendChild(questionElement);
        
        // Actualizar el contador de preguntas
        if (currentQuestion) currentQuestion.textContent = index + 1;
        
        // Actualizar la barra de progreso
        const progressBar = document.getElementById('quiz-progress-bar');
        if (progressBar) {
            progressBar.style.width = `${((index + 1) / quizQuestions.length) * 100}%`;
        }
        
        // Actualizar estado de los botones de navegación
        prevButton.disabled = index === 0;
        
        // Cambiar el texto del botón siguiente cuando llegamos a la última pregunta
        if (index === quizQuestions.length - 1) {
            nextButton.textContent = 'Finalizar';
            nextButton.classList.add('finish-btn');
        } else {
            nextButton.textContent = 'Siguiente';
            nextButton.classList.remove('finish-btn');
        }
        
        // Verificar si todas las preguntas han sido respondidas
        const allAnswered = quizQuestions.every(q => q.userAnswer !== undefined);
        
        // Si es la última pregunta y todas están respondidas, habilitar el botón de finalizar
        if (index === quizQuestions.length - 1 && allAnswered) {
            nextButton.disabled = false;
        }
    }
    
    // Función para seleccionar una respuesta
    function selectAnswer(questionIndex, optionIndex) {
        // Guardar la respuesta del usuario
        quizQuestions[questionIndex].userAnswer = optionIndex;
        
        // Reproducir sonido según si es correcta o no
        if (optionIndex === quizQuestions[questionIndex].correctAnswer) {
            document.getElementById('correctSound').play();
        } else {
            document.getElementById('wrongSound').play();
        }
        
        // Actualizar la interfaz
        showQuestion(questionIndex);
        
        // Avanzar automáticamente a la siguiente pregunta después de un tiempo
        if (questionIndex < quizQuestions.length - 1) {
            setTimeout(() => {
                currentQuestionIndex++;
                showQuestion(currentQuestionIndex);
            }, 1500);
        } else {
            // En la última pregunta, verificar si todas han sido respondidas
            const allAnswered = quizQuestions.every(q => q.userAnswer !== undefined);
            if (allAnswered) {
                // Habilitar el botón de finalizar
                nextButton.disabled = false;
            }
        }
    }
    
    // Configurar los botones de navegación
    prevButton.addEventListener('click', () => {
        document.getElementById('clickSound').play();
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);
        }
    });
    
    nextButton.addEventListener('click', () => {
        document.getElementById('clickSound').play();
        
        if (currentQuestionIndex < quizQuestions.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        } else {
            // Si es la última pregunta, verificar si todas han sido respondidas
            const allAnswered = quizQuestions.every(q => q.userAnswer !== undefined);
            
            if (allAnswered) {
                // Calcular puntuación
                const score = quizQuestions.reduce((total, q) => {
                    return total + (q.userAnswer === q.correctAnswer ? 1 : 0);
                }, 0);
                
                // Guardar puntuación
                levelProgress.quizScore = score;
                
                // Mostrar resultados
                showQuizResults(score, quizQuestions.length);
            } else {
                alert('¡Debes responder todas las preguntas antes de finalizar!');
            }
        }
    });
    
    // Mostrar la primera pregunta
    showQuestion(currentQuestionIndex);
}

// Mostrar los resultados del quiz
function showQuizResults(score, total) {
    // Ocultar el quiz
    const quizContainer = document.getElementById('quiz-container');
    const quizNavigation = document.querySelector('.quiz-navigation');
    const quizProgress = document.querySelector('.quiz-progress');
    
    if (quizContainer) quizContainer.style.display = 'none';
    if (quizNavigation) quizNavigation.style.display = 'none';
    if (quizProgress) quizProgress.style.display = 'none';
    
    // Mostrar los resultados
    const resultsContainer = document.getElementById('results-container');
    const finalScore = document.getElementById('final-score');
    const resultsMessage = document.getElementById('results-message');
    const resultsStars = document.getElementById('results-stars');
    
    if (resultsContainer) resultsContainer.style.display = 'block';
    if (finalScore) finalScore.textContent = `${score}/${total}`;
    
    // Determinar estrellas ganadas y mensaje
    let stars = 0;
    let message = '';
    
    if (score >= Math.floor(total * 0.9)) {  // 90% o más
        stars = 3;
        message = '¡Excelente! Has dominado completamente el uso de MUST en este tiempo verbal. ¡Eres un verdadero maestro!';
    } else if (score >= Math.floor(total * 0.7)) {  // 70% o más
        stars = 2;
        message = '¡Muy bien! Tienes un buen dominio del uso de MUST en este tiempo verbal. Con un poco más de práctica, serás un experto.';
    } else if (score >= Math.floor(total * 0.5)) {  // 50% o más
        stars = 1;
        message = 'Buen intento. Has aprendido lo básico del uso de MUST en este tiempo verbal, pero necesitas más práctica para dominarlo por completo.';
    } else {
        stars = 0;
        message = 'Necesitas repasar más el uso de MUST en este tiempo verbal. ¡No te desanimes! Vuelve a revisar la teoría y los ejemplos.';
    }
    
    // Guardar estrellas ganadas
    levelProgress.stars = stars;
    
    // Mostrar mensaje
    if (resultsMessage) resultsMessage.textContent = message;
    
    // Mostrar estrellas
    if (resultsStars) {
        resultsStars.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const star = document.createElement('div');
            star.className = 'result-star';
            if (i < stars) {
                star.classList.add('earned');
            }
            star.textContent = '★';
            resultsStars.appendChild(star);
        }
    }
    
    // Configurar botones de resultados
    const retryButton = document.getElementById('retry-quiz');
    const completeButton = document.getElementById('complete-level');
    
    if (retryButton) {
        retryButton.addEventListener('click', () => {
            document.getElementById('clickSound').play();
            setTimeout(() => {
                window.location.reload();
            }, 300);
        });
    }
    
    if (completeButton) {
        // Habilitar el botón de completar solo si se obtuvo al menos 1 estrella
        completeButton.disabled = stars === 0;
        
        completeButton.addEventListener('click', () => {
            document.getElementById('levelUpSound').play();
            
            // Guardar progreso en localStorage
            saveProgress();
            
            // Redirigir al mapa después de un tiempo
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1000);
        });
    }
}

// Guardar progreso del nivel
function saveProgress() {
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
    userProgress.completedLevels[levelProgress.section] = true;
    userProgress.stars += levelProgress.stars;
    
    // Verificar logros
    if (Object.values(userProgress.completedLevels).filter(val => val).length === 1 && !userProgress.achievements['first-step']) {
        userProgress.achievements['first-step'] = true;
        userProgress.stars += 5;  // Bonus por primer logro
    }
    
    if (Object.values(userProgress.completedLevels).filter(val => val).length === 5 && !userProgress.achievements['must-master']) {
        userProgress.achievements['must-master'] = true;
        userProgress.stars += 10;  // Bonus por completar todos los niveles
    }
    
    // Actualizar nivel del usuario
    userProgress.level = Math.max(userProgress.level, getNextLevel());
    
    // Guardar progreso
    localStorage.setItem('mustQuestProgress', JSON.stringify(userProgress));
}

// Obtener el siguiente nivel basado en la sección actual
function getNextLevel() {
    const levelMap = {
        'present-simple': 2,
        'present-continuous': 3,
        'present-perfect': 4,
        'past': 5,
        'future': 5,  // No hay nivel 6, así que se mantiene en 5
        'exam': 5
    };
    
    return levelMap[levelProgress.section] || 1;
}

// Volver al mapa
function goToMap() {
    document.getElementById('clickSound').play();
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 300);
}

// Verificar progreso actual
function checkProgress() {
    document.getElementById('clickSound').play();
    
    const progress = (levelProgress.exercisesCompleted / levelProgress.totalExercises) * 100;
    
    if (progress < 50) {
        alert('Necesitas completar más ejercicios para avanzar. Has completado ' + 
              levelProgress.exercisesCompleted + ' de ' + levelProgress.totalExercises + ' ejercicios.');
    } else if (progress < 100) {
        alert('¡Buen progreso! Has completado ' + levelProgress.exercisesCompleted + 
              ' de ' + levelProgress.totalExercises + ' ejercicios. Sigue así para completar el nivel.');
    } else {
        alert('¡Excelente! Has completado todos los ejercicios. ¡Ahora intenta el Desafío Final para ganar estrellas!');
        navigateToSection('challenge');
    }
}

// Control de sonido
function toggleSound() {
    const soundBtn = document.getElementById('sound-toggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    if (backgroundMusic.paused) {
        backgroundMusic.volume = 0.3;
        backgroundMusic.play();
        soundBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        backgroundMusic.pause();
        soundBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
}

// Esta función debe ser implementada en cada nivel para proporcionar las preguntas específicas
function getQuizQuestions() {
    // Esta es una implementación genérica que debe sobrescribirse
    return [
        {
            question: "Pregunta 1",
            options: ["Opción 1", "Opción 2", "Opción 3", "Opción 4"],
            correctAnswer: 0
        },
        {
            question: "Pregunta 2",
            options: ["Opción 1", "Opción 2", "Opción 3", "Opción 4"],
            correctAnswer: 1
        }
    ];
}
