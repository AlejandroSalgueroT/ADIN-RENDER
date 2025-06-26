// botcetina-voz-pc.js

// Explicaciones por sección (en orden de aparición de las filas)
const explicacionesEn = [
    `The past continuous is used to talk about actions that were in progress at a specific moment in the past. For example: I was studying when you called.`,
    `The objective of the past continuous is to describe actions that were happening at a certain time in the past, often interrupted by another action.`,
    `Main uses: actions in progress in the past, two actions happening at the same time, and background descriptions in stories.`,
    `The past continuous is formed with was or were plus the verb in -ing form. Affirmative: She was reading a book. Negative: They were not playing outside. Question: Were you watching TV?`,
    `Spelling rules: If the verb ends in e, remove the e and add -ing. If it ends in a single vowel + single consonant, double the consonant.`,
    `Examples: I was cooking when the phone rang. They were playing football at 5 pm. He wasn't listening to the teacher.`,
    `Some common verbs in -ing form: working, studying, playing, living, raining, running, trying.`,
    `Common mistakes: using was/were with the base form, forgetting -ing, confusing past continuous with past simple.`,
    `Practice: Complete the sentences and check your answers to practice the past continuous.`,
    `Additional resources: Visit the links for more explanations and exercises about the past continuous.`,
    `Important notes: The past continuous is often used with while and when, and helps set the scene in stories.`
];
const explicacionesEs = [
    `El pasado continuo se usa para hablar de acciones que estaban en progreso en un momento específico del pasado. Por ejemplo: I was studying when you called.`,
    `El objetivo del pasado continuo es describir acciones que estaban ocurriendo en un momento del pasado, a menudo interrumpidas por otra acción.`,
    `Usos principales: acciones en progreso en el pasado, dos acciones ocurriendo al mismo tiempo y descripciones de fondo en historias.`,
    `El pasado continuo se forma con was o were más el verbo en -ing. Afirmativa: She was reading a book. Negativa: They were not playing outside. Interrogativa: Were you watching TV?`,
    `Reglas ortográficas: Si el verbo termina en e, se quita la e y se añade -ing. Si termina en una sola vocal + una sola consonante, se duplica la consonante.`,
    `Ejemplos: I was cooking when the phone rang. They were playing football at 5 pm. He wasn't listening to the teacher.`,
    `Algunos verbos comunes en -ing: working, studying, playing, living, raining, running, trying.`,
    `Errores frecuentes: usar was/were con el verbo base, olvidar -ing, confundir el pasado continuo con el pasado simple.`,
    `Práctica: Completa las oraciones y verifica tus respuestas para practicar el pasado continuo.`,
    `Recursos adicionales: Visita los enlaces para más explicaciones y ejercicios sobre el pasado continuo.`,
    `Notas importantes: El pasado continuo se usa a menudo con while y when, y ayuda a ambientar las historias.`
];

function speakBotcetinaEn(idx) {
    const texto = explicacionesEn[idx] || explicacionesEn[0];
    const utterance = new window.SpeechSynthesisUtterance(texto);
    utterance.lang = 'en-US';
    utterance.rate = 0.98;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
}
function speakBotcetinaEs(idx) {
    const texto = explicacionesEs[idx] || explicacionesEs[0];
    const utterance = new window.SpeechSynthesisUtterance(texto);
    utterance.lang = 'es-ES';
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
}

// Inserta los controles de botcetina en cada fila automáticamente
window.addEventListener('DOMContentLoaded', function() {
    const filas = document.querySelectorAll('section.fila, section.fila.fila-invertida');
    filas.forEach((fila, idx) => {
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.gap = '10px';
        div.style.marginBottom = '10px';
        div.innerHTML = `
            <button class="botcetina-btn" onclick="speakBotcetinaEn(${idx})">🔊 Explicación en inglés</button>
            <button class="botcetina-btn" onclick="speakBotcetinaEs(${idx})">🔊 Explicación en español</button>
            <img src="botcetina.png" alt="Botcetina" class="botcetina-speaker" style="width:60px;vertical-align:middle;cursor:pointer;" onclick="speakBotcetinaEn(${idx})">
        `;
        // Insertar al inicio de la fila
        fila.insertBefore(div, fila.firstElementChild);
    });
});
