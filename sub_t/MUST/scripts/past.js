// Script específico para el nivel de Tiempo Pasado

// Sobrescribir la función getQuizQuestions para proporcionar preguntas específicas
function getQuizQuestions() {
    return [
        {
            question: "¿Cuál es la forma correcta de expresar una obligación pasada?",
            options: [
                "must + verbo (forma base)",
                "had to + verbo (forma base)",
                "must had + verbo (forma base)",
                "had must + verbo (forma base)"
            ],
            correctAnswer: 1
        },
        {
            question: "¿Por qué no usamos MUST para hablar de obligaciones pasadas?",
            options: [
                "Porque MUST es un verbo irregular",
                "Porque MUST no tiene forma pasada propia",
                "Porque MUST solo se usa en preguntas pasadas",
                "Porque MUST es formal y HAD TO es informal"
            ],
            correctAnswer: 1
        },
        {
            question: "Completa la oración: 'When I was a student, I __________ wear a uniform.'",
            options: [
                "must",
                "musted",
                "had to",
                "must had"
            ],
            correctAnswer: 2
        },
        {
            question: "Completa la oración: 'She __________ very hungry to eat all that food.'",
            options: [
                "had to be",
                "must have been",
                "must was",
                "had must be"
            ],
            correctAnswer: 1
        },
        {
            question: "¿Cuál de las siguientes oraciones expresa una deducción lógica sobre el pasado?",
            options: [
                "We had to leave early yesterday.",
                "She had to work overtime last week.",
                "He must have forgotten his keys at home.",
                "Did they have to pay for the tickets?"
            ],
            correctAnswer: 2
        },
        {
            question: "¿Cuál es la forma interrogativa correcta para obligaciones pasadas?",
            options: [
                "Must you study last night?",
                "Did you must study last night?",
                "Did you have to study last night?",
                "Had you to study last night?"
            ],
            correctAnswer: 2
        },
        {
            question: "Traduce: 'Tuve que trabajar todo el fin de semana.'",
            options: [
                "I must work all weekend.",
                "I must worked all weekend.",
                "I had to work all weekend.",
                "I must have worked all weekend."
            ],
            correctAnswer: 2
        },
        {
            question: "Traduce: 'No tuvimos que pagar la entrada.'",
            options: [
                "We didn't have to pay for the ticket.",
                "We must not pay for the ticket.",
                "We must not have paid for the ticket.",
                "We had not to pay for the ticket."
            ],
            correctAnswer: 0
        },
        {
            question: "¿Cuál de estas oraciones NO es correcta?",
            options: [
                "I had to finish my homework yesterday.",
                "Must I have finished my homework yesterday?",
                "She must have left early.",
                "Did they have to attend the meeting?"
            ],
            correctAnswer: 1
        },
        {
            question: "¿Cuál es la diferencia principal entre HAD TO y MUST HAVE?",
            options: [
                "HAD TO es más formal que MUST HAVE",
                "HAD TO expresa una obligación real en el pasado, mientras que MUST HAVE expresa una deducción sobre el pasado",
                "HAD TO es negativo y MUST HAVE es positivo",
                "No hay diferencia, son intercambiables"
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
