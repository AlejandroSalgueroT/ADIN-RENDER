// Script específico para el nivel de Tiempo Pasado

// Sobrescribir la función getQuizQuestions para proporcionar preguntas específicas
function getQuizQuestions() {
    return [
        {
            question: "¿Cuál es la estructura correcta del presente perfecto continuo?",
            options: [
                "have/has + been + verbo-ing",
                "had to + verbo base",
                "must + verbo base",
                "have + verbo en pasado participio"
            ],
            correctAnswer: 0
        },
        {
            question: "¿Para qué usamos el presente perfecto continuo?",
            options: [
                "Para hablar de acciones que ocurrieron en un tiempo específico del pasado",
                "Para expresar acciones en progreso en el futuro",
                "Para describir acciones que empezaron en el pasado y siguen ocurriendo",
                "Para deducir información sobre el pasado"
            ],
            correctAnswer: 2
        },
        {
            question: "Completa la oración: 'She __________ studying for the exam all day.'",
            options: [
                "has been",
                "had been",
                "have being",
                "must have been"
            ],
            correctAnswer: 0
        },
        {
            question: "Completa la oración: 'We __________ working on this project since Monday.'",
            options: [
                "have been",
                "had to be",
                "must be",
                "has being"
            ],
            correctAnswer: 0
        },
        {
            question: "¿Cuál de las siguientes oraciones expresa correctamente una acción continua hasta el presente?",
            options: [
                "I have finished my homework.",
                "She was working all night.",
                "They have been living here for two years.",
                "We will have lunch soon."
            ],
            correctAnswer: 2
        },
        {
            question: "¿Cuál es la forma interrogativa correcta en presente perfecto continuo?",
            options: [
                "Did you have to study?",
                "Were you studying?",
                "Have you been studying?",
                "Have you study?"
            ],
            correctAnswer: 2
        },
        {
            question: "Traduce: 'He estado trabajando todo el día.'",
            options: [
                "I have worked all day.",
                "I have been working all day.",
                "I worked all day.",
                "I must have worked all day."
            ],
            correctAnswer: 1
        },
        {
            question: "Traduce: 'Ella ha estado estudiando para el examen.'",
            options: [
                "She studied for the exam.",
                "She has been studying for the exam.",
                "She was studying for the exam.",
                "She has study for the exam."
            ],
            correctAnswer: 1
        },
        {
            question: "¿Cuál de estas oraciones NO es correcta?",
            options: [
                "I have been reading a new book.",
                "Has she been working today?",
                "We has been traveling lately.",
                "They have been living here for years."
            ],
            correctAnswer: 2
        },
        {
            question: "¿Cuál es la principal función del presente perfecto continuo?",
            options: [
                "Hablar de acciones terminadas en un momento exacto del pasado",
                "Hablar de acciones que empezaron en el pasado y siguen en el presente",
                "Describir hábitos en el pasado",
                "Expresar intenciones futuras"
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
