document.addEventListener("DOMContentLoaded", () => {
  const avatar = document.getElementById("avatar-pixelado");
  const dialog = document.getElementById("dialog-box");

  let posX = -64; // Inicia fuera de la pantalla
  avatar.style.left = posX + "px";

  const destino = 200;
  let hablando = false;
  let intervalo;

  function mostrarDialogo(texto) {
    dialog.textContent = texto;
    dialog.style.display = "block";
    setTimeout(() => {
      dialog.style.display = "none";
    }, 3000);
  }

  function hablar(texto, callback) {
    if (hablando) return;

    hablando = true;
    const msg = new SpeechSynthesisUtterance(texto);
    msg.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
    mostrarDialogo(texto);

    msg.onend = () => {
      hablando = false;
      if (callback) callback();
    };
  }

  function caminarHasta(destinoFinal, callback) {
    avatar.classList.add("walking");
    intervalo = setInterval(() => {
      if (posX < destinoFinal) {
        posX += 2;
        avatar.style.left = posX + "px";
      } else {
        clearInterval(intervalo);
        avatar.classList.remove("walking");
        if (callback) callback();
      }
    }, 20);
  }

  // Secuencia inicial: entrar caminando y hablar
  caminarHasta(destino, () => {
    setTimeout(() => {
      hablar("Welcome! Choose your game:", () => {
        setTimeout(() => {
          hablar("Game 1: Might plus base verb.", () => {
            setTimeout(() => {
              hablar("Game 2: Might be doing.", () => {
                setTimeout(() => {
                  hablar("Game 3: Might have done.");
                }, 2000);
              });
            }, 2000);
          });
        }, 2000);
      });
    }, 1000);
  });

  // Click en el avatar
  avatar.addEventListener("click", () => {
    hablar("Use the arrow keys to move me!");
  });

  // Movimiento con teclas
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      posX += 10;
      avatar.style.left = posX + "px";
      avatar.classList.add("walking");
      avatar.style.transform = "scaleX(1)";
    } else if (e.key === "ArrowLeft") {
      posX -= 10;
      avatar.style.left = posX + "px";
      avatar.classList.add("walking");
      avatar.style.transform = "scaleX(-1)";
    } else if (e.key === "Enter") {
      hablar("Hello! I might help you learn English.");
    }
  });

  document.addEventListener("keyup", () => {
    avatar.classList.remove("walking");
  });
});
