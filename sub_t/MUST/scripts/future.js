// Script específico para el nivel de Tiempo Futuro

// Sobrescribir la función getQuizQuestions para proporcionar preguntas específicas
function getQuizQuestions() {
    return [
        {
            question: "¿Cuándo usamos MUST en contextos futuros?",
            options: [
                "Solo para obligaciones a largo plazo",
                "Para obligaciones inmediatas con efecto en el futuro cercano",
                "Solo para obligaciones en el pasado",
                "MUST nunca se usa para el futuro"
            ],
            correctAnswer: 1
        },
        {
            question: "¿Cuándo usamos WILL HAVE TO?",
            options: [
                "Para obligaciones pasadas",
                "Solo para deducciones lógicas",
                "Para obligaciones en un punto más distante en el futuro",
                "Para expresar habilidad futura"
            ],
            correctAnswer: 2
        },
        {
            question: "Completa la oración: 'You __________ submit your application before Friday if you want to be considered.'",
            options: [
                "will must",
                "must",
                "must will",
                "must be"
            ],
            correctAnswer: 1
        },
        {
            question: "Completa la oración: 'When the new rules come into effect next year, we __________ wear identification badges.'",
            options: [
                "must",
                "will must",
                "will have to",
                "must have"
            ],
            correctAnswer: 2
        },
        {
            question: "¿Cuál de las siguientes oraciones expresa una obligación inmediata con efecto futuro?",
            options: [
                "We will have to leave by 9 AM tomorrow.",
                "You must call him right now or you'll miss the opportunity.",
                "Next year, students will have to take an additional course.",
                "They had to finish the project yesterday."
            ],
            correctAnswer: 1
        },
        {
            question: "¿Cuál es la forma negativa correcta para expresar ausencia de obligación futura?",
            options: [
                "will not must",
                "must not",
                "will not have to",
                "have not to will"
            ],
            correctAnswer: 2
        },
        {
            question: "Traduce: 'Tendrás que estudiar más duro el próximo semestre.'",
            options: [
                "You must study harder next semester.",
                "You must will study harder next semester.",
                "You will have to study harder next semester.",
                "You will must study harder next semester."
            ],
            correctAnswer: 2
        },
        {
            question: "Traduce: 'Debes enviar esta solicitud hoy mismo.'",
            options: [
                "You will have to send this application today.",
                "You must send this application today.",
                "You have must to send this application today.",
                "You must to send this application today."
            ],
            correctAnswer: 1
        },
        {
            question: "¿Cuál de estas oraciones NO es correcta?",
            options: [
                "You must not be late for the interview tomorrow.",
                "When you graduate, you will have to find a job.",
                "Next year, we will must adapt to the new system.",
                "Students will not have to wear uniforms in the summer."
            ],
            correctAnswer: 2
        },
        {
            question: "¿Cuál es la diferencia principal entre MUST y WILL HAVE TO en contextos futuros?",
            options: [
                "MUST es más importante que WILL HAVE TO",
                "MUST expresa una obligación inmediata con efecto futuro, mientras que WILL HAVE TO se refiere a obligaciones en un futuro más distante",
                "MUST es formal y WILL HAVE TO es informal",
                "No hay diferencia, son completamente intercambiables"
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
