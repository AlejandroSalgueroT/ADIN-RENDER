// botsam-voz.js

// Explicaciones por sección (en orden de aparición de las filas)
const explicacionesEn = [
    `The past perfect is a tense used to describe an action that happened before another action in the past. For example: She had already left when I arrived.`,
    `The objective of the past perfect is to show that one action happened before another in the past, making the order of events clear.`,
    `Main uses: actions before another past moment, completed experiences before a past time, causes of past situations, and with words like just, already, never, ever, yet.`,
    `The past perfect is formed with 'had' plus the past participle. Affirmative: They had studied before the exam. Negative: I had not seen that movie before yesterday. Question: Had you finished your homework?`,
    `Difference: Past simple is for actions at a specific time in the past. Past perfect is for actions before another past event. Example: When I arrived, she had already left.`,
    `Examples: She had worked there for five years before she resigned. We hadn't heard about the accident until we arrived home. Had you ever visited London before that trip?`,
    `Some common irregular past participles: been, begun, broken, done, eaten, gone, known, seen, spoken, written.`,
    `Common mistakes: confusing past perfect with present perfect, forgetting 'had', confusing past participle with past simple, not showing the time relationship clearly.`,
    `Practice: Complete the sentences and check your answers to practice the past perfect.`,
    `Additional resources: Visit the links for more explanations and exercises about the past perfect.`,
    `Important notes: The past perfect always compares times in the past and helps set the correct chronology in stories.`
];
const explicacionesEs = [
    `El pasado perfecto es un tiempo verbal que se usa para describir una acción que ocurrió antes que otra en el pasado. Por ejemplo: Ella ya se había ido cuando yo llegué.`,
    `El objetivo del pasado perfecto es mostrar que una acción ocurrió antes que otra en el pasado, aclarando el orden de los eventos.`,
    `Usos principales: acciones anteriores a otro momento pasado, experiencias completadas antes de un tiempo pasado, causas de situaciones pasadas y con palabras como just, already, never, ever, yet.`,
    `El pasado perfecto se forma con 'had' más el participio pasado. Afirmativa: They had studied before the exam. Negativa: I had not seen that movie before yesterday. Interrogativa: Had you finished your homework?`,
    `Diferencia: El pasado simple es para acciones en un momento específico del pasado. El pasado perfecto es para acciones anteriores a otro evento pasado. Ejemplo: When I arrived, she had already left.`,
    `Ejemplos: She had worked there for five years before she resigned. We hadn't heard about the accident until we arrived home. Had you ever visited London before that trip?`,
    `Algunos participios pasados irregulares comunes: been, begun, broken, done, eaten, gone, known, seen, spoken, written.`,
    `Errores frecuentes: confundir el pasado perfecto con el presente perfecto, olvidar 'had', confundir el participio pasado con el pasado simple, no mostrar claramente la relación temporal.`,
    `Práctica: Completa las oraciones y verifica tus respuestas para practicar el pasado perfecto.`,
    `Recursos adicionales: Visita los enlaces para más explicaciones y ejercicios sobre el pasado perfecto.`,
    `Notas importantes: El pasado perfecto siempre compara tiempos en el pasado y ayuda a establecer la cronología correcta en historias.`
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
