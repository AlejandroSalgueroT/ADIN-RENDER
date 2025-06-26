// botsam-voz-ppc.js

// Explicaciones por sección (en orden de aparición de las filas)
const explicacionesEn = [
    `The past perfect continuous is used to talk about actions that started in the past and continued up to another point in the past. For example: She had been studying for three hours when her friend arrived.`,
    `The objective of the past perfect continuous is to express the duration of an action that continued up to another moment in the past, often highlighting effort, duration, or results.`,
    `Main uses: actions that lasted until another past moment, causes of past situations, repeated actions before a point in the past, and visible results in the past.`,
    `The past perfect continuous is formed with 'had been' plus the verb in -ing form. Affirmative: I had been waiting for two hours. Negative: They had not been living there for long. Question: Had you been working all night?`,
    `Differences: Past continuous describes an action in progress at a specific time in the past. Past perfect describes an action completed before another past action. Past perfect continuous emphasizes the duration of an action up to a point in the past.`,
    `Examples: She had been teaching for ten years before she became a principal. The ground was wet because it had been raining all night. Had they been waiting long before the bus arrived?`,
    `Some common verbs in -ing form: working, studying, waiting, living, raining, running, trying.`,
    `Common mistakes: forgetting the auxiliary 'been', using it with stative verbs, confusing it with the past perfect, or incorrect negative form.`,
    `Practice: Complete the sentences and check your answers to practice the past perfect continuous.`,
    `Additional resources: Visit the links for more explanations and exercises about the past perfect continuous.`,
    `Important notes: The past perfect continuous is not used with stative verbs, always includes 'had been' plus the -ing form, and is often used with 'for' or 'since'.`
];
const explicacionesEs = [
    `El pasado perfecto continuo se usa para hablar de acciones que comenzaron en el pasado y continuaron hasta otro momento también en el pasado. Por ejemplo: Ella había estado estudiando durante tres horas cuando llegó su amiga.`,
    `El objetivo del pasado perfecto continuo es expresar la duración de una acción que continuó hasta otro momento del pasado, destacando el esfuerzo, la duración o los resultados.`,
    `Usos principales: acciones que duraron hasta otro momento pasado, causas de situaciones pasadas, acciones repetidas antes de un punto en el pasado y resultados visibles en el pasado.`,
    `El pasado perfecto continuo se forma con 'had been' más el verbo en -ing. Afirmativa: I had been waiting for two hours. Negativa: They had not been living there for long. Interrogativa: Had you been working all night?`,
    `Diferencias: El pasado continuo describe una acción en progreso en un momento específico del pasado. El pasado perfecto describe una acción completada antes de otra acción pasada. El pasado perfecto continuo enfatiza la duración de una acción hasta un punto en el pasado.`,
    `Ejemplos: She had been teaching for ten years before she became a principal. The ground was wet because it had been raining all night. Had they been waiting long before the bus arrived?`,
    `Algunos verbos comunes en -ing: working, studying, waiting, living, raining, running, trying.`,
    `Errores frecuentes: olvidar el auxiliar 'been', usarlo con verbos de estado, confundirlo con el pasado perfecto o usar mal la forma negativa.`,
    `Práctica: Completa las oraciones y verifica tus respuestas para practicar el pasado perfecto continuo.`,
    `Recursos adicionales: Visita los enlaces para más explicaciones y ejercicios sobre el pasado perfecto continuo.`,
    `Notas importantes: El pasado perfecto continuo no se usa con verbos de estado, siempre incluye 'had been' más el verbo en -ing y suele usarse con 'for' o 'since'.`
];

function speakBotsamEn(idx) {
    const texto = explicacionesEn[idx] || explicacionesEn[0];
    const utterance = new window.SpeechSynthesisUtterance(texto);
    utterance.lang = 'en-US';
    utterance.rate = 0.98;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
}
function speakBotsamEs(idx) {
    const texto = explicacionesEs[idx] || explicacionesEs[0];
    const utterance = new window.SpeechSynthesisUtterance(texto);
    utterance.lang = 'es-ES';
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
}

// Inserta los controles de botsam en cada fila automáticamente
window.addEventListener('DOMContentLoaded', function() {
    const filas = document.querySelectorAll('section.fila, section.fila.fila-invertida');
    filas.forEach((fila, idx) => {
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.gap = '10px';
        div.style.marginBottom = '10px';
        div.innerHTML = `
            <button class="botsam-btn" onclick="speakBotsamEn(${idx})">🔊 Explicación en inglés</button>
            <button class="botsam-btn" onclick="speakBotsamEs(${idx})">🔊 Explicación en español</button>
            <img src="botsam.png" alt="BotSam" class="botsam-speaker" style="width:60px;vertical-align:middle;cursor:pointer;" onclick="speakBotsamEn(${idx})">
        `;
        // Insertar al inicio de la fila
        fila.insertBefore(div, fila.firstElementChild);
    });
});
