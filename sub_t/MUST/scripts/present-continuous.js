// Script específico para el nivel de Presente Continuo

// Sobrescribir la función getQuizQuestions para proporcionar preguntas específicas
function getQuizQuestions() {
    return [
        {
            question: "¿Cuál es la estructura correcta para usar MUST en presente continuo?",
            options: [
                "Sujeto + must + be + verbo (-ing) + complemento",
                "Sujeto + must + verbo (-ing) + complemento",
                "Sujeto + must + be + verbo (forma base) + complemento",
                "Sujeto + must + verbo (forma base) + complemento"
            ],
            correctAnswer: 0
        },
        {
            question: "¿Cuál es la forma negativa correcta de MUST en presente continuo?",
            options: [
                "don't must be + verbo (-ing)",
                "must not (mustn't) be + verbo (-ing)",
                "not must be + verbo (-ing)",
                "doesn't must be + verbo (-ing)"
            ],
            correctAnswer: 1
        },
        {
            question: "Completa la oración: 'Look at all that smoke. The building __________ .'",
            options: [
                "must burn",
                "must be burn",
                "must burning",
                "must be burning"
            ],
            correctAnswer: 3
        },
        {
            question: "Completa la oración: 'During the test, students __________ their phones.'",
            options: [
                "must not be using",
                "must not using",
                "must not use",
                "must not to use"
            ],
            correctAnswer: 0
        },
        {
            question: "¿Cuál de las siguientes oraciones expresa una deducción lógica sobre una acción en progreso?",
            options: [
                "You must complete your homework.",
                "You must be completing your homework.",
                "She must be tired from all that work.",
                "They must not enter this area."
            ],
            correctAnswer: 1
        },
        {
            question: "¿Cuál es la forma interrogativa correcta de MUST en presente continuo?",
            options: [
                "Do I must be working?",
                "Must I be working?",
                "I must be working?",
                "Am I must working?"
            ],
            correctAnswer: 1
        },
        {
            question: "Traduce: 'Debe estar estudiando para el examen ahora mismo.'",
            options: [
                "He must studying for the exam right now.",
                "He must be study for the exam right now.",
                "He must be studying for the exam right now.",
                "He is must study for the exam right now."
            ],
            correctAnswer: 2
        },
        {
            question: "Traduce: 'No deben estar usando sus teléfonos durante la clase.'",
            options: [
                "They must not be using their phones during class.",
                "They don't must be using their phones during class.",
                "They not must be using their phones during class.",
                "They must to not be using their phones during class."
            ],
            correctAnswer: 0
        },
        {
            question: "¿Cuál de estas oraciones NO usa MUST en presente continuo correctamente?",
            options: [
                "They must be waiting for us at the station.",
                "She must not be feeling well today.",
                "He must is working on his project.",
                "Must they be studying for tomorrow's test?"
            ],
            correctAnswer: 2
        },
        {
            question: "MUST en presente continuo se usa principalmente para expresar:",
            options: [
                "Acciones habituales en progreso",
                "Obligaciones y deducciones lógicas sobre acciones en progreso",
                "Prohibiciones sobre acciones futuras",
                "Habilidades presentes"
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
