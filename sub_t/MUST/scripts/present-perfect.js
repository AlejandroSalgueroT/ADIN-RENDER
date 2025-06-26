// Script específico para el nivel de Presente Perfecto

// Sobrescribir la función getQuizQuestions para proporcionar preguntas específicas
function getQuizQuestions() {
    return [
        {
            question: "¿Cuál es la estructura correcta para usar MUST en presente perfecto?",
            options: [
                "Sujeto + must + have + verbo (forma base) + complemento",
                "Sujeto + must + have + participio pasado + complemento",
                "Sujeto + must + had + participio pasado + complemento",
                "Sujeto + must + have + verbo (-ing) + complemento"
            ],
            correctAnswer: 1
        },
        {
            question: "¿Cuál es la forma negativa correcta de MUST en presente perfecto?",
            options: [
                "don't must have + participio pasado",
                "must not (mustn't) have + participio pasado",
                "not must have + participio pasado",
                "doesn't must have + participio pasado"
            ],
            correctAnswer: 1
        },
        {
            question: "Completa la oración: 'The lights are on in their house. They __________ home.'",
            options: [
                "must arrived",
                "must have arrive",
                "must have arrived",
                "must arriving"
            ],
            correctAnswer: 2
        },
        {
            question: "Completa la oración: 'She got an A on the test. She __________ a lot.'",
            options: [
                "must have studied",
                "must studied",
                "must have study",
                "must had studied"
            ],
            correctAnswer: 0
        },
        {
            question: "¿Cuál de las siguientes oraciones expresa una deducción lógica en presente perfecto?",
            options: [
                "You must finish your homework.",
                "She must be tired from all that work.",
                "He must have left early to catch the train.",
                "They must not enter this area."
            ],
            correctAnswer: 2
        },
        {
            question: "¿Cuál es la forma interrogativa correcta de MUST en presente perfecto?",
            options: [
                "Do they must have seen it?",
                "Must they have seen it?",
                "They must have seen it?",
                "Have they must seen it?"
            ],
            correctAnswer: 1
        },
        {
            question: "Traduce: 'Debe haber olvidado mi mensaje.'",
            options: [
                "He must forgot my message.",
                "He must have forget my message.",
                "He must have forgotten my message.",
                "He is must have forgotten my message."
            ],
            correctAnswer: 2
        },
        {
            question: "Traduce: 'No deben haber recibido mi invitación.'",
            options: [
                "They must not have received my invitation.",
                "They don't must have received my invitation.",
                "They not must have received my invitation.",
                "They must to not have received my invitation."
            ],
            correctAnswer: 0
        },
        {
            question: "¿Cuál de estas oraciones NO usa MUST en presente perfecto correctamente?",
            options: [
                "She must have gone to the party yesterday.",
                "They must have worked all night to finish the project.",
                "He must has seen the movie already.",
                "The dog must have buried the bone in the garden."
            ],
            correctAnswer: 2
        },
        {
            question: "MUST en presente perfecto se usa principalmente para expresar:",
            options: [
                "Obligaciones pasadas",
                "Deducciones lógicas sobre acciones pasadas con evidencia en el presente",
                "Prohibiciones sobre acciones futuras",
                "Habilidades adquiridas"
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
