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
