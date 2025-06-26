document.addEventListener("DOMContentLoaded", () => {
  let isDragging = false, offset = { x: 0, y: 0 };
  let isTalking = false, isMuted = false, isMinimized = false;
  let idioma = 'es';
  window.speechQueue = [];
  let voiceList = [];
  let selectedVoice = null;

  const botContainer = document.getElementById("bot-container");
  if (!botContainer) return;

  const botAvatar = document.getElementById("bot-avatar");
  const avatarImg = document.getElementById("avatar-img");
  const textBox = document.getElementById("bot-text-box");
  const btnToggleSound = document.getElementById("toggle-sound");
  const btnToggleVisibility = document.getElementById("toggle-visibility");
  const btnES = document.getElementById("btn-es");
  const btnEN = document.getElementById("btn-en");
  const voiceSelect = document.getElementById("voice-select");

  // --- Obtener lista de voces y llenar el selector ---
  function loadVoices() {
    voiceList = window.speechSynthesis.getVoices();

    if (voiceSelect) {
      voiceSelect.innerHTML = `<option value="">Voz predeterminada</option>`;
      voiceList.forEach((voice, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
      });
    }
  }

  window.speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();

  // --- Obtener voz seleccionada ---
  function getVoiceForLang(langCode) {
    if (selectedVoice) return selectedVoice;
    return voiceList.find(v => v.lang === langCode) || null;
  }

  // --- Evento: Cambio de voz manual ---
  if (voiceSelect) {
    voiceSelect.addEventListener("change", () => {
      const index = voiceSelect.value;
      selectedVoice = voiceList[index] || null;
      if (selectedVoice) {
        speak(`Voz cambiada a ${selectedVoice.name}`, selectedVoice.lang);
      }
    });
  }

  function setBotEmotion(emotion) {
    if (!avatarImg) return;
    switch (emotion) {
      case "hablando":
        avatarImg.style.transform = "scale(1.05)";
        break;
      case "feliz":
        avatarImg.style.transform = "rotate(-3deg)";
        break;
      default:
        avatarImg.style.transform = "scale(1) rotate(0)";
    }
  }

  function speak(text, lang = idioma === 'es' ? 'es-ES' : 'en-US') {
    if (isMuted || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;

    const voice = getVoiceForLang(lang);
    if (voice) utter.voice = voice;

    window.speechSynthesis.speak(utter);
  }

  function speakDual(textEn, textEs) {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();

    const utterEn = new SpeechSynthesisUtterance(textEn);
    utterEn.lang = 'en-US';
    utterEn.voice = getVoiceForLang('en-US');

    const utterEs = new SpeechSynthesisUtterance(textEs);
    utterEs.lang = 'es-ES';
    utterEs.voice = getVoiceForLang('es-ES');

    utterEn.onend = () => setTimeout(() => synth.speak(utterEs), 50);
    synth.speak(utterEn);
  }

  function botTalk(arr) {
    if (isTalking || isMinimized) return;
    isTalking = true;
    let i = 0;

    function next() {
      if (i >= arr.length) {
        isTalking = false;
        setBotEmotion("default");
        return;
      }

      const msg = arr[i];
      textBox.textContent = "";
      setBotEmotion("hablando");

      let j = 0;
      const iv = setInterval(() => {
        textBox.textContent += msg[j++];
        if (j >= msg.length) {
          clearInterval(iv);
          speak(msg);
          setBotEmotion("feliz");
          setTimeout(() => {
            i++;
            next();
          }, 3000);
        }
      }, 30);
    }
    next();
  }

  // --- Movimiento del bot ---
  [botContainer, botAvatar, textBox].forEach(el => el.style.userSelect = "none");
  botAvatar.addEventListener("mousedown", e => {
    isDragging = true;
    const rect = botContainer.getBoundingClientRect();
    offset = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  });

  function onMouseMove(e) {
    if (!isDragging) return;
    const rect = botContainer.getBoundingClientRect();
    let x = e.clientX - offset.x;
    let y = e.clientY - offset.y;
    x = Math.max(0, Math.min(x, window.innerWidth - rect.width));
    y = Math.max(0, Math.min(y, window.innerHeight - rect.height));
    botContainer.style.left = x + "px";
    botContainer.style.top = y + "px";
  }

  function onMouseUp() {
    isDragging = false;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }

  // --- Botones ---
  btnES.addEventListener("click", () => {
    idioma = 'es';
    speak("Idioma cambiado a español", "es-ES");
  });

  btnEN.addEventListener("click", () => {
    idioma = 'en';
    speak("Language switched to English", "en-US");
  });

  btnToggleSound.addEventListener("click", () => {
    isMuted = !isMuted;
    btnToggleSound.textContent = isMuted ? "🔇" : "🔊";
    window.speechSynthesis.cancel();
  });

  btnToggleVisibility.addEventListener("click", () => {
    isMinimized = !isMinimized;
    botAvatar.style.display = isMinimized ? "none" : "block";
    textBox.style.display = isMinimized ? "none" : "block";
    btnToggleVisibility.textContent = isMinimized ? "🔼" : "🔽";
  });

  // --- Lectura de ejemplos ---
  document.querySelectorAll('.play-example').forEach(button => {
    button.addEventListener('click', () => {
      const li = button.closest('li');
      const textEn = li.dataset.en;
      const textEs = li.dataset.es;

      if (idioma === 'es' && textEs) {
        speak(textEs, 'es-ES');
      } else if (idioma === 'en' && textEn) {
        speak(textEn, 'en-US');
      }
    });
  });

  // --- Mensajes según la vista ---
  const messages = {
    vista1: {
      intro: ["Bienvenido a la lección del condicional simple."],
      
    },
    vista2: {
      intro: ["Ahora estamos en el condicional continuo."],
      
    },
    vista3: {
      intro: ["Entramos al condicional perfecto."],
      
    },
    vista4: {
      intro: ["Estás en el condicional perfecto continuo."],
      
    },
    vista5: {
      intro: ["¡Llegaste a la sección de pronunciaciones!"],
      
    }
  };

  const vista = document.body.dataset.vista;
  if (vista && messages[vista]) {
    botTalk(messages[vista].intro);
    document.querySelectorAll(".explicacion").forEach(el =>
      el.addEventListener("mouseenter", () => botTalk(messages[vista].explicacion))
    );
  }
});
