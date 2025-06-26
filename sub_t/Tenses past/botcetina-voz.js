// botcetina-voz.js

// Explicaciones por sección (en orden de aparición de las filas)
const explicacionesEn = [
    `The simple past is used to talk about actions, facts, or situations that started and finished in the past. For example: I visited London last year.`,
    `The objective of the simple past is to express actions or situations that happened and ended at a specific time in the past, with no direct relation to the present.`,
    `Main uses: finished actions in the past, sequence of actions, past habits, and general facts.`,
    `The simple past is formed with regular verbs by adding -ed, and irregular verbs have their own forms. Affirmative: She visited her grandmother yesterday. Negative: They did not play football last week. Question: Did you see that movie?`,
    `Spelling rules: If the verb ends in e, just add d. If it ends in consonant + y, change y to i and add ed. If it ends in vowel + y, just add ed. If it ends in a single vowel + single consonant, double the consonant.`,
    `Examples: I studied English last night. He went to the park two days ago. We didn't watch TV yesterday. Did she call you?`,
    `Some common irregular verbs: be - was/were, begin - began, come - came, do - did, eat - ate, go - went, have - had, make - made, see - saw, take - took.`,
    `Common mistakes: using the past form after did in negatives or questions, forgetting -ed in regular verbs, confusing regular and irregular verbs, using incorrect time expressions.`,
    `Practice: Complete the sentences and check your answers to practice the simple past.`,
    `Additional resources: Visit the links for more explanations and exercises about the simple past.`,
    `Important notes: In negative and interrogative forms, the main verb is always in its base form. It's essential to learn the most common irregular verbs. The simple past is key for basic communication in English.`
];
const explicacionesEs = [
    `El pasado simple se usa para hablar de acciones, hechos o situaciones que comenzaron y terminaron en el pasado. Por ejemplo: I visited London last year.`,
    `El objetivo del pasado simple es expresar acciones o situaciones que ocurrieron y finalizaron en un momento determinado del pasado, sin relación directa con el presente.`,
    `Usos principales: acciones finalizadas en el pasado, secuencia de acciones, hábitos pasados y hechos generales.`,
    `El pasado simple se forma con verbos regulares añadiendo -ed, y los irregulares tienen su propia forma. Afirmativa: She visited her grandmother yesterday. Negativa: They did not play football last week. Interrogativa: Did you see that movie?`,
    `Reglas ortográficas: Si el verbo termina en e, solo se añade d. Si termina en consonante + y, se cambia la y por i y se añade ed. Si termina en vocal + y, solo se añade ed. Si termina en una sola vocal + una sola consonante, se duplica la consonante.`,
    `Ejemplos: I studied English last night. He went to the park two days ago. We didn't watch TV yesterday. Did she call you?`,
    `Algunos verbos irregulares comunes: be - was/were, begin - began, come - came, do - did, eat - ate, go - went, have - had, make - made, see - saw, take - took.`,
    `Errores frecuentes: usar el verbo en pasado después de did en negativas o preguntas, olvidar -ed en verbos regulares, confundir verbos regulares e irregulares, usar expresiones de tiempo incorrectas.`,
    `Práctica: Completa las oraciones y verifica tus respuestas para practicar el pasado simple.`,
    `Recursos adicionales: Visita los enlaces para más explicaciones y ejercicios sobre el pasado simple.`,
    `Notas importantes: En la forma negativa e interrogativa, el verbo principal siempre va en su forma base. Es fundamental aprender los verbos irregulares más comunes. El pasado simple es esencial para la comunicación básica en inglés.`
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
