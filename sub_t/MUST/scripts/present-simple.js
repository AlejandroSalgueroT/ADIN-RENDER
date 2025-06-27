// Script específico para el nivel de Presente Simple

// Sobrescribir la función getQuizQuestions para proporcionar preguntas específicas
function getQuizQuestions() {
    return [
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
            question: "¿Cuál es la forma negativa correcta de MUST en presente simple?",
            options: [
                "don't must",
                "must not (mustn't)",
                "not must",
                "doesn't must"
            ],
            correctAnswer: 1
        },
        {
            question: "Completa la oración: 'You __________ follow the rules.'",
            options: [
                "must to",
                "must",
                "musting",
                "musts"
            ],
            correctAnswer: 1
        },
        {
            question: "Completa la oración: 'Students __________ talk during the exam.'",
            options: [
                "must not",
                "don't must",
                "not must",
                "must don't"
            ],
            correctAnswer: 0
        },
        {
            question: "¿Cuál de las siguientes oraciones expresa una deducción lógica?",
            options: [
                "You must finish your homework.",
                "She must be tired from all that work.",
                "They must not enter this area.",
                "Must we attend the meeting?"
            ],
            correctAnswer: 1
        },
        {
            question: "¿Cuál es la forma interrogativa correcta de MUST?",
            options: [
                "Do I must go?",
                "Must I go?",
                "I must go?",
                "Am I must go?"
            ],
            correctAnswer: 1
        },
        {
            question: "Traduce: 'Debes estudiar para el examen.'",
            options: [
                "You must studying for the exam.",
                "You must to study for the exam.",
                "You must study for the exam.",
                "You are must study for the exam."
            ],
            correctAnswer: 2
        },
        {
            question: "Traduce: 'No debes llegar tarde.'",
            options: [
                "You must not be late.",
                "You don't must be late.",
                "You not must be late.",
                "You must to not be late."
            ],
            correctAnswer: 0
        },
        {
            question: "¿Cuál de estas oraciones NO usa MUST correctamente?",
            options: [
                "We must arrive on time.",
                "You must not touch that wire.",
                "She must studies every day.",
                "Must I complete this form?"
            ],
            correctAnswer: 2
        },
        {
            question: "MUST en presente simple se usa principalmente para expresar:",
            options: [
                "Acciones habituales",
                "Obligación, prohibición y deducción lógica",
                "Acciones en progreso",
                "Planes futuros"
            ],
            correctAnswer: 1
        }
    ];
}

// Inicializar elementos específicos del nivel cuando la página esté cargada
document.addEventListener('DOMContentLoaded', function() {
    // Añadir cualquier inicialización específica para este nivel
    
    // Ejemplo: Añadir efectos visuales a las tarjetas de teoría
    const theoryCards = document.querySelectorAll('.theory-card');
    theoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('card-hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('card-hover');
        });
    });
    
    // Ejemplo: Animación para los escenarios de ejemplo
    const scenarios = document.querySelectorAll('.example-scenario');
    scenarios.forEach((scenario, index) => {
        setTimeout(() => {
            const bubbles = scenario.querySelectorAll('.scenario-bubble');
            bubbles.forEach((bubble, bubbleIndex) => {
                setTimeout(() => {
                    bubble.classList.add('bubble-appear');
                }, bubbleIndex * 800);
            });
        }, index * 500);
    });
});


        // Variables globales
        let currentSection = 'intro';
        let currentExercise = 0;
        let exerciseAnswers = [];
        let challengeQuestions = [];
        let challengeAnswers = [];

        // Funciones de navegación
        function goBack() {
            playClickSound();
            window.history.back();
        }

        function goToHome() {
            playClickSound();
            window.location.href = '../index.html';
        }

        function showSection(sectionName) {
            playClickSound();
            
            // Ocultar todas las secciones
            document.querySelectorAll('.lesson-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Mostrar la sección seleccionada
            document.getElementById(sectionName).classList.add('active');
            
            // Actualizar navegación
            document.querySelectorAll('.lesson-nav-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
            
            currentSection = sectionName;
            
            // Cargar contenido específico si es necesario
            if (sectionName === 'practice') {
                loadPracticeExercises();
            } else if (sectionName === 'challenge') {
                loadChallenge();
            }
        }

        // Funciones de sonido
        function playClickSound() {
            const audio = document.getElementById('clickSound');
            if (audio) audio.play().catch(e => console.log('Audio play failed:', e));
        }

        function playCorrectSound() {
            const audio = document.getElementById('correctSound');
            if (audio) audio.play().catch(e => console.log('Audio play failed:', e));
        }

        function playWrongSound() {
            const audio = document.getElementById('wrongSound');
            if (audio) audio.play().catch(e => console.log('Audio play failed:', e));
        }

        // Funciones de avatar
        function goToAvatarSelection() {
            playClickSound();
            
            const characterSpeech = document.getElementById('character-speech');
            if (characterSpeech) {
                characterSpeech.textContent = '¡Genial! Vamos a personalizar tu avatar...';
            }
            
            setTimeout(() => {
                // Detectar si estamos en la raíz de MUST o en una subcarpeta (views)
                const currentPath = window.location.pathname;
                let avatarPath;
                
                if (currentPath.includes('/views/')) {
                    // Estamos en la carpeta views, usar ruta relativa hacia arriba
                    avatarPath = '../avatar/avatar.html';
                } else {
                    // Estamos en la raíz de MUST, usar ruta directa
                    avatarPath = 'avatar/avatar.html';
                }
                
                console.log('Current path:', currentPath);
                console.log('Avatar path:', avatarPath);
                
                window.location.href = avatarPath;
            }, 1000);
        }

        // Hacer la función global para que sea accesible desde onclick
        window.goToAvatarSelection = goToAvatarSelection;

        function loadSavedAvatar() {
            const avatarContainer = document.getElementById('character-display');
            const savedAvatarSvg = localStorage.getItem('mustQuestAvatarSvg');
            const savedAdvancedAvatar = localStorage.getItem('mustQuestAdvancedAvatar');
            const savedAvatar = localStorage.getItem('mustQuestAvatar');
            
            // Prioridad 1: Avatar avanzado
            if (savedAdvancedAvatar && avatarContainer) {
                try {
                    const avatarData = JSON.parse(savedAdvancedAvatar);
                    avatarContainer.innerHTML = avatarData.svg;
                    
                    // Ocultar imagen por defecto
                    const defaultImg = avatarContainer.querySelector('img');
                    if (defaultImg) {
                        defaultImg.style.display = 'none';
                    }
                    
                    // Mensaje de avatar avanzado
                    updateCharacterSpeech('¡Hola! Soy tu avatar personalizado avanzado. ¡Estoy listo para la aventura!');
                } catch (e) {
                    console.error('Error loading advanced avatar:', e);
                    loadDefaultAvatar();
                }
            }
            // Prioridad 2: Avatar SVG simple
            else if (savedAvatarSvg && avatarContainer) {
                avatarContainer.innerHTML = savedAvatarSvg.replace('class="avatar-svg"', 'style="width: 100%; height: 100%;"');
                
                // Ocultar imagen por defecto
                const defaultImg = avatarContainer.querySelector('img');
                if (defaultImg) {
                    defaultImg.style.display = 'none';
                }
                
                // Agregar clase para indicar que es un avatar personalizado
                const avatarButton = document.getElementById('character-avatar-button');
                if (avatarButton) {
                    avatarButton.classList.add('custom-avatar');
                }
                
                updateCharacterSpeech('¡Hola! Soy tu avatar personalizado. ¡Vamos a conquistar el Reino del Presente Simple!');
            } 
            // Prioridad 3: Avatar por defecto
            else {
                loadDefaultAvatar();
            }
        }

        function loadDefaultAvatar() {
            const avatarContainer = document.getElementById('character-display');
            if (avatarContainer) {
                // Mostrar imagen por defecto
                const defaultImg = avatarContainer.querySelector('img');
                if (defaultImg) {
                    defaultImg.style.display = 'block';
                }
                
                updateCharacterSpeech('¡Bienvenido al Reino del Presente Simple! Aquí aprenderás todo sobre MUST. ¡Haz clic en mí para personalizarme!');
            }
        }

        function updateCharacterSpeech(message) {
            const characterSpeech = document.getElementById('character-speech');
            if (characterSpeech) {
                characterSpeech.textContent = message;
            }
        }

        // Funciones de práctica
        function loadPracticeExercises() {
            const exercises = [
                {
                    type: 'multiple-choice',
                    question: 'Completa la oración: "I _____ finish my homework tonight."',
                    options: ['must', 'must to', 'musts', 'must be'],
                    correct: 0,
                    explanation: 'MUST no cambia con la persona y se sigue del verbo base sin "to".'
                },
                {
                    type: 'multiple-choice',
                    question: 'Elige la opción correcta: "You _____ smoke in the library."',
                    options: ['must', 'must not', 'must to not', 'not must'],
                    correct: 1,
                    explanation: 'MUST NOT se usa para expresar prohibición.'
                },
                {
                    type: 'fill-blank',
                    question: 'Completa: "She _____ be very tired after the long journey."',
                    answer: 'must',
                    explanation: 'MUST se usa para deducciones lógicas basadas en evidencia.'
                },
                {
                    type: 'multiple-choice',
                    question: '¿Cuál es la forma interrogativa correcta?',
                    options: ['Must I go?', 'Do I must go?', 'I must go?', 'Must do I go?'],
                    correct: 0,
                    explanation: 'En preguntas, MUST va antes del sujeto.'
                },
                {
                    type: 'true-false',
                    question: 'MUST cambia según la persona (I must, he musts, etc.)',
                    answer: false,
                    explanation: 'MUST es un verbo modal que NO cambia con la persona.'
                }
            ];

            currentExercise = 0;
            exerciseAnswers = new Array(exercises.length).fill(null);
            
            displayExercise(exercises[currentExercise]);
            updateProgressBar();
        }

        function displayExercise(exercise) {
            const container = document.getElementById('exercise-container');
            let html = '';

            switch (exercise.type) {
                case 'multiple-choice':
                    html = `
                        <div class="exercise-question">
                            <h3>${exercise.question}</h3>
                            <div class="options-container">
                                ${exercise.options.map((option, index) => `
                                    <button class="option-btn" onclick="selectAnswer(${index})" data-index="${index}">
                                        ${option}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    `;
                    break;
                case 'fill-blank':
                    html = `
                        <div class="exercise-question">
                            <h3>${exercise.question}</h3>
                            <div class="fill-blank-container">
                                <input type="text" class="fill-blank-input" placeholder="Escribe tu respuesta..." onkeyup="checkFillBlank(this.value)">
                            </div>
                        </div>
                    `;
                    break;
                case 'true-false':
                    html = `
                        <div class="exercise-question">
                            <h3>${exercise.question}</h3>
                            <div class="true-false-container">
                                <button class="tf-btn" onclick="selectTrueFalse(true)" data-value="true">
                                    <i class="fas fa-check"></i> Verdadero
                                </button>
                                <button class="tf-btn" onclick="selectTrueFalse(false)" data-value="false">
                                    <i class="fas fa-times"></i> Falso
                                </button>
                            </div>
                        </div>
                    `;
                    break;
            }

            container.innerHTML = html;
            
            // Actualizar contador
            document.getElementById('current-exercise').textContent = currentExercise + 1;
            document.getElementById('total-exercises').textContent = exercises.length;
        }

        function selectAnswer(index) {
            playClickSound();
            exerciseAnswers[currentExercise] = index;
            
            // Resaltar respuesta seleccionada
            document.querySelectorAll('.option-btn').forEach((btn, i) => {
                btn.classList.remove('selected');
                if (i === index) btn.classList.add('selected');
            });
        }

        function selectTrueFalse(value) {
            playClickSound();
            exerciseAnswers[currentExercise] = value;
            
            // Resaltar respuesta seleccionada
            document.querySelectorAll('.tf-btn').forEach(btn => {
                btn.classList.remove('selected');
                if (btn.dataset.value === value.toString()) btn.classList.add('selected');
            });
        }

        function checkFillBlank(value) {
            exerciseAnswers[currentExercise] = value.toLowerCase().trim();
        }

        function nextExercise() {
            const exercises = [
                {
                    type: 'multiple-choice',
                    question: 'Completa la oración: "I _____ finish my homework tonight."',
                    options: ['must', 'must to', 'musts', 'must be'],
                    correct: 0,
                    explanation: 'MUST no cambia con la persona y se sigue del verbo base sin "to".'
                },
                {
                    type: 'multiple-choice',
                    question: 'Elige la opción correcta: "You _____ smoke in the library."',
                    options: ['must', 'must not', 'must to not', 'not must'],
                    correct: 1,
                    explanation: 'MUST NOT se usa para expresar prohibición.'
                },
                {
                    type: 'fill-blank',
                    question: 'Completa: "She _____ be very tired after the long journey."',
                    answer: 'must',
                    explanation: 'MUST se usa para deducciones lógicas basadas en evidencia.'
                },
                {
                    type: 'multiple-choice',
                    question: '¿Cuál es la forma interrogativa correcta?',
                    options: ['Must I go?', 'Do I must go?', 'I must go?', 'Must do I go?'],
                    correct: 0,
                    explanation: 'En preguntas, MUST va antes del sujeto.'
                },
                {
                    type: 'true-false',
                    question: 'MUST cambia según la persona (I must, he musts, etc.)',
                    answer: false,
                    explanation: 'MUST es un verbo modal que NO cambia con la persona.'
                }
            ];

            if (currentExercise < exercises.length - 1) {
                currentExercise++;
                displayExercise(exercises[currentExercise]);
                updateProgressBar();
                
                // Actualizar botones
                document.getElementById('prev-btn').disabled = false;
                if (currentExercise === exercises.length - 1) {
                    document.getElementById('next-btn').textContent = 'Finalizar';
                    document.getElementById('next-btn').innerHTML = '<i class="fas fa-check"></i> Finalizar';
                }
            } else {
                // Finalizar práctica
                showPracticeResults();
            }
        }

        function previousExercise() {
            const exercises = [
                {
                    type: 'multiple-choice',
                    question: 'Completa la oración: "I _____ finish my homework tonight."',
                    options: ['must', 'must to', 'musts', 'must be'],
                    correct: 0,
                    explanation: 'MUST no cambia con la persona y se sigue del verbo base sin "to".'
                },
                {
                    type: 'multiple-choice',
                    question: 'Elige la opción correcta: "You _____ smoke in the library."',
                    options: ['must', 'must not', 'must to not', 'not must'],
                    correct: 1,
                    explanation: 'MUST NOT se usa para expresar prohibición.'
                },
                {
                    type: 'fill-blank',
                    question: 'Completa: "She _____ be very tired after the long journey."',
                    answer: 'must',
                    explanation: 'MUST se usa para deducciones lógicas basadas en evidencia.'
                },
                {
                    type: 'multiple-choice',
                    question: '¿Cuál es la forma interrogativa correcta?',
                    options: ['Must I go?', 'Do I must go?', 'I must go?', 'Must do I go?'],
                    correct: 0,
                    explanation: 'En preguntas, MUST va antes del sujeto.'
                },
                {
                    type: 'true-false',
                    question: 'MUST cambia según la persona (I must, he musts, etc.)',
                    answer: false,
                    explanation: 'MUST es un verbo modal que NO cambia con la persona.'
                }
            ];

            if (currentExercise > 0) {
                currentExercise--;
                displayExercise(exercises[currentExercise]);
                updateProgressBar();
                
                // Actualizar botones
                if (currentExercise === 0) {
                    document.getElementById('prev-btn').disabled = true;
                }
                document.getElementById('next-btn').textContent = 'Siguiente';
                document.getElementById('next-btn').innerHTML = 'Siguiente <i class="fas fa-arrow-right"></i>';
            }
        }

        function updateProgressBar() {
            const exercises = 5; // Total exercises
            const progress = ((currentExercise + 1) / exercises) * 100;
            document.getElementById('progress-fill').style.width = progress + '%';
        }

        function showPracticeResults() {
            // Aquí se mostrarían los resultados de la práctica
            playCorrectSound();
            alert('¡Práctica completada! Puntuación: ' + calculateScore() + '/5');
            
            // Desbloquear el desafío
            document.querySelector('[data-section="challenge"]').classList.remove('locked');
            showSection('challenge');
        }

        function calculateScore() {
            const exercises = [
                {
                    type: 'multiple-choice',
                    question: 'Completa la oración: "I _____ finish my homework tonight."',
                    options: ['must', 'must to', 'musts', 'must be'],
                    correct: 0,
                    explanation: 'MUST no cambia con la persona y se sigue del verbo base sin "to".'
                },
                {
                    type: 'multiple-choice',
                    question: 'Elige la opción correcta: "You _____ smoke in the library."',
                    options: ['must', 'must not', 'must to not', 'not must'],
                    correct: 1,
                    explanation: 'MUST NOT se usa para expresar prohibición.'
                },
                {
                    type: 'fill-blank',
                    question: 'Completa: "She _____ be very tired after the long journey."',
                    answer: 'must',
                    explanation: 'MUST se usa para deducciones lógicas basadas en evidencia.'
                },
                {
                    type: 'multiple-choice',
                    question: '¿Cuál es la forma interrogativa correcta?',
                    options: ['Must I go?', 'Do I must go?', 'I must go?', 'Must do I go?'],
                    correct: 0,
                    explanation: 'En preguntas, MUST va antes del sujeto.'
                },
                {
                    type: 'true-false',
                    question: 'MUST cambia según la persona (I must, he musts, etc.)',
                    answer: false,
                    explanation: 'MUST es un verbo modal que NO cambia con la persona.'
                }
            ];

            let score = 0;
            exercises.forEach((exercise, index) => {
                if (exercise.type === 'multiple-choice' || exercise.type === 'true-false') {
                    if (exerciseAnswers[index] === exercise.correct || exerciseAnswers[index] === exercise.answer) {
                        score++;
                    }
                } else if (exercise.type === 'fill-blank') {
                    if (exerciseAnswers[index] === exercise.answer) {
                        score++;
                    }
                }
            });
            return score;
        }

        // Funciones de desafío
        function loadChallenge() {
            // Cargar el desafío final
        }

        function startChallenge() {
            playClickSound();
            alert('¡Desafío próximamente disponible!');
        }

        // Control de sonido
        document.addEventListener('DOMContentLoaded', function() {
            // Cargar avatar guardado
            loadSavedAvatar();
            
            // Control de sonido
            const soundToggle = document.getElementById('sound-toggle');
            if (soundToggle) {
                soundToggle.addEventListener('click', function() {
                    const icon = this.querySelector('i');
                    const backgroundMusic = document.getElementById('backgroundMusic');
                    
                    if (icon.classList.contains('fa-volume-up')) {
                        icon.classList.remove('fa-volume-up');
                        icon.classList.add('fa-volume-mute');
                        if (backgroundMusic) backgroundMusic.pause();
                    } else {
                        icon.classList.remove('fa-volume-mute');
                        icon.classList.add('fa-volume-up');
                        if (backgroundMusic) backgroundMusic.play().catch(e => console.log('Audio play failed:', e));
                    }
                });
            }
        });

        // Funciones de navegación adicionales
        function navigateToSection(sectionId) {
            playClickSound();
            
            // Ocultar todas las secciones
            document.querySelectorAll('.level-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Mostrar la sección objetivo
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Actualizar navegación del sidebar
            document.querySelectorAll('.sidebar-nav a').forEach(link => {
                link.classList.remove('active');
            });
            
            const targetLink = document.querySelector(`.sidebar-nav a[href="#${sectionId}"]`);
            if (targetLink) {
                targetLink.classList.add('active');
            }
        }

        function goToMap() {
            playClickSound();
            window.location.href = '../index.html';
        }

        function checkProgress() {
            playClickSound();
            alert('Funcionalidad de progreso próximamente disponible');
        }

        // Reproducir música de fondo automáticamente
        document.addEventListener('click', function() {
            const backgroundMusic = document.getElementById('backgroundMusic');
            if (backgroundMusic.paused) {
                backgroundMusic.play().catch(e => console.log('Audio play failed:', e));
            }
        }, { once: true });
