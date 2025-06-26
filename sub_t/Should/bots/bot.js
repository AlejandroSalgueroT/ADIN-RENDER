const bot = document.getElementById("bot-avatar");
const textBox = document.getElementById("bot-text-box");
const sections = document.querySelectorAll(".card, h1, h2");

const btnToggleSound = document.getElementById("toggle-sound");
const btnToggleVisibility = document.getElementById("toggle-visibility");

let isDragging = false;
let offset = { x: 0, y: 0 };
let isTalking = false;
let isMuted = false;
let isMinimized = false;

const messages = {
  "intro": [
    "Hola, soy tu guía virtual.",
    "¡Vamos a aprender sobre 'should' juntos!"
  ],
  "estructura": [
    "Aquí tienes la estructura de 'should' en presente simple:",
    "Afirmativa: Sujeto + should + verbo base. Ejemplo: You should study.",
    "Negativa: Sujeto + shouldn't + verbo base. Ejemplo: You shouldn't forget this.",
    "Interrogativa: Should + sujeto + verbo base? Ejemplo: Should we start now?",
    "Consejo: Usa 'should' para dar sugerencias o expresar lo ideal.",
    "No uses 'should' como una orden fuerte. ¡Eso sería rude!"
  ],
  "juego1": [
    "En este juego vas a completar frases usando 'should'.",
    "Lee cada oración y piensa en el verbo correcto."
  ],
  "juego2": [
    "Aquí deberás elegir la oración correcta que use 'should'.",
    "¡Lee bien antes de hacer clic!"
  ],
  "juego3": [
    "Corrige los errores en frases que contienen 'should'.",
    "Piensa si el verbo está en la forma correcta y si la estructura tiene sentido."
  ]
};

// Función para hablar
function speak(text) {
  if (isMuted) return;
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "es-MX";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
}

// Mostrar texto paso a paso
function botTalk(messagesArray) {
  if (isTalking || isMinimized) return;
  isTalking = true;
  let i = 0;

  function showNext() {
    if (i >= messagesArray.length) {
      isTalking = false;
      return;
    }

    const message = messagesArray[i];
    textBox.textContent = "";
    textBox.style.opacity = 1;

    let j = 0;
    const interval = setInterval(() => {
      textBox.textContent += message.charAt(j);
      j++;
      if (j >= message.length) {
        clearInterval(interval);
        speak(message);
        setTimeout(() => {
          i++;
          showNext();
        }, 4000);
      }
    }, 30);
  }

  showNext();
}

// Drag
bot.addEventListener("mousedown", (e) => {
  isDragging = true;
  offset = {
    x: e.clientX - bot.getBoundingClientRect().left,
    y: e.clientY - bot.getBoundingClientRect().top,
  };
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const maxX = window.innerWidth - bot.clientWidth - 20;
    const maxY = window.innerHeight - bot.clientHeight - 120;

    const x = Math.min(Math.max(0, e.clientX - offset.x), maxX);
    const y = Math.min(Math.max(0, e.clientY - offset.y), maxY);

    bot.parentElement.style.left = `${x}px`;
    bot.parentElement.style.top = `${y}px`;
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

// Hover en secciones
sections.forEach(section => {
  section.addEventListener("mouseenter", () => {
    const content = section.textContent.toLowerCase();
    if (content.includes("estructura")) {
      botTalk(messages.estructura);
    } else if (content.includes("game 1")) {
      botTalk(messages.juego1);
    } else if (content.includes("game 2")) {
      botTalk(messages.juego2);
    } else if (content.includes("game 3")) {
      botTalk(messages.juego3);
    } else if (content.includes("should")) {
      botTalk(messages.intro);
    }
  });
});

// Botón de silenciar
btnToggleSound.addEventListener("click", () => {
  isMuted = !isMuted;
  btnToggleSound.textContent = isMuted ? "🔇" : "🔊";
  window.speechSynthesis.cancel();
});

// Botón minimizar
btnToggleVisibility.addEventListener("click", () => {
  isMinimized = !isMinimized;
  bot.style.display = isMinimized ? "none" : "block";
  textBox.style.display = isMinimized ? "none" : "block";
  btnToggleVisibility.textContent = isMinimized ? "🔼" : "🔽";
});
