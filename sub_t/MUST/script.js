// Variables globales
let currentSectionIndex = 0;
const sections = ['present-simple', 'present-continuous', 'present-perfect', 'past', 'future'];
let completedSections = {
    'present-simple': false,
    'present-continuous': false,
    'present-perfect': false,
    'past': false,
    'future': false
};
let characterSpeeches = {
    'welcome': '¡Hola! Soy Mustín, tu guía en esta aventura. ¡Vamos a aprender sobre MUST en inglés!',
    'present-simple': '¡Excelente! Ahora estamos aprendiendo MUST en presente simple. Es muy útil para expresar obligaciones.',
    'present-continuous': 'Ahora veremos MUST con el presente continuo. Recuerda que usamos "be + -ing".',
    'present-perfect': 'En el presente perfecto, MUST se combina con "have + participio". ¡Es super útil para hacer deducciones!',
    'past': 'En el pasado, MUST cambia a HAD TO. ¡Es importante recordar esta diferencia!',
    'future': 'Y finalmente, para hablar del futuro con MUST, podemos usar WILL HAVE TO. ¡Casi completamos nuestra aventura!',
    'correct': '¡Muy bien! ¡Esa es la respuesta correcta! Sigamos adelante.',
    'incorrect': 'Mmm, esa no es la respuesta correcta. ¡Inténtalo de nuevo!',
    'completed': '¡Felicidades! Has completado toda la aventura. ¡Ahora eres un experto en el uso de MUST!'
};

// Elementos del DOM
const characterSpeech = document.getElementById('character-speech');
const characterImg = document.getElementById('character-img');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const tabButtons = document.querySelectorAll('.tab-button');
const sectionContents = document.querySelectorAll('.section');
const optionButtons = document.querySelectorAll('.option');

// Función para inicializar la página
function initializePage() {
    console.log('Initializing page...'); // Debug
    updateCharacterSpeech('welcome');
    setupEventListeners();
    updateProgressBar();
    loadSavedAvatar();
    
    // Verificar si es la primera vez o si hay avatar personalizado
    checkAvatarStatus();
    
    // Agregar event listener adicional al botón del avatar
    setupAvatarButton();
}

// Verificar el estado del avatar y mostrar mensaje apropiado
function checkAvatarStatus() {
    const hasAvatar = hasCustomAvatar();
    const isFirstVisit = !localStorage.getItem('mustQuestFirstVisit');
    
    if (isFirstVisit) {
        localStorage.setItem('mustQuestFirstVisit', 'true');
        setTimeout(() => {
            updateCharacterSpeech('¡Bienvenido por primera vez a MUST QUEST! Haz clic en mí para personalizarme y empezar tu aventura con estilo.');
        }, 2000);
    } else if (hasAvatar) {
        setTimeout(() => {
            updateCharacterSpeech('¡Hola de nuevo! Me gusta cómo me has personalizado. ¿Listos para continuar aprendiendo MUST?');
        }, 1500);
    }
}

// Configurar los event listeners
function setupEventListeners() {
    // Botones de tab
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const section = button.getAttribute('data-section');
            changeSection(section);
        });
    });

    // Opciones de respuesta
    optionButtons.forEach(button => {
        button.addEventListener('click', handleOptionClick);
    });

    // Botones de navegación
    prevBtn.addEventListener('click', navigatePrev);
    nextBtn.addEventListener('click', navigateNext);

    // Cargar imagen del personaje (la primera vez mostrará una imagen por defecto)
    loadCharacterImage();
}

// Cargar imagen del personaje (simulado, en producción se usaría una imagen real)
function loadCharacterImage() {
    // Como no tenemos la imagen real, usamos una URL placeholder
    characterImg.src = 'https://via.placeholder.com/150x200/8248F6/FFFFFF?text=Mustin';
    
    // En un entorno real, se usaría la imagen del personaje:
    // characterImg.src = 'character.png';
}

// Cambiar la sección activa
function changeSection(sectionId) {
    // Actualizar la clase activa en los botones de tab
    tabButtons.forEach(button => {
        if (button.getAttribute('data-section') === sectionId) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    // Actualizar la clase activa en las secciones
    sectionContents.forEach(section => {
        if (section.id === sectionId) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });

    // Actualizar el índice de la sección actual
    currentSectionIndex = sections.indexOf(sectionId);
    updateNavigationButtons();

    // Actualizar el discurso del personaje
    updateCharacterSpeech(sectionId);
}

// Manejar clic en las opciones de respuesta
function handleOptionClick(event) {
    const button = event.currentTarget;
    const correct = button.hasAttribute('data-correct');
    const parentQuestion = button.closest('.question');
    
    // Remover clases previas
    parentQuestion.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('correct', 'incorrect');
        opt.disabled = true;
    });
    
    if (correct) {
        button.classList.add('correct');
        updateCharacterSpeech('correct');
        
        // Marcar la sección como completada
        const section = button.closest('.exercise').getAttribute('data-section');
        completedSections[section] = true;
        
        // Actualizar progreso
        updateProgressBar();
        
        // Habilitar navegación al siguiente si corresponde
        setTimeout(() => {
            if (currentSectionIndex < sections.length - 1) {
                navigateNext();
            } else if (allSectionsCompleted()) {
                updateCharacterSpeech('completed');
            }
        }, 1500);
    } else {
        button.classList.add('incorrect');
        updateCharacterSpeech('incorrect');
        
        // Habilitar intentar de nuevo después de un tiempo
        setTimeout(() => {
            parentQuestion.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('correct', 'incorrect');
                opt.disabled = false;
            });
            updateCharacterSpeech(sections[currentSectionIndex]);
        }, 1500);
    }
}

// Verificar si todas las secciones están completadas
function allSectionsCompleted() {
    return Object.values(completedSections).every(value => value === true);
}

// Actualizar la barra de progreso
function updateProgressBar() {
    const completedCount = Object.values(completedSections).filter(value => value === true).length;
    const totalSections = Object.keys(completedSections).length;
    const percentage = (completedCount / totalSections) * 100;
    
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${Math.round(percentage)}%`;
}

// Actualizar el texto del personaje
function updateCharacterSpeech(speechKey) {
    characterSpeech.textContent = characterSpeeches[speechKey] || characterSpeeches['welcome'];
    
    // Animar el personaje
    characterImg.style.animation = 'none';
    setTimeout(() => {
        characterImg.style.animation = 'bounce 2s infinite';
    }, 10);
}

// Navegar a la sección anterior
function navigatePrev() {
    if (currentSectionIndex > 0) {
        currentSectionIndex--;
        changeSection(sections[currentSectionIndex]);
    }
}

// Navegar a la sección siguiente
function navigateNext() {
    if (currentSectionIndex < sections.length - 1) {
        currentSectionIndex++;
        changeSection(sections[currentSectionIndex]);
    }
}

// Actualizar los botones de navegación
function updateNavigationButtons() {
    prevBtn.disabled = currentSectionIndex === 0;
    nextBtn.disabled = currentSectionIndex === sections.length - 1;
}

// Avatar management
let currentAvatar = null;

// Función para cargar el avatar guardado
function loadSavedAvatar() {
    const avatarContainer = document.getElementById('character-display');
    const savedAvatarSvg = localStorage.getItem('mustQuestAvatarSvg');
    const savedAvatar = localStorage.getItem('mustQuestAvatar');
    
    if (savedAvatarSvg && avatarContainer) {
        // Crear un contenedor para el SVG
        const svgContainer = document.createElement('div');
        svgContainer.style.width = '100%';
        svgContainer.style.height = '100%';
        svgContainer.style.display = 'flex';
        svgContainer.style.alignItems = 'center';
        svgContainer.style.justifyContent = 'center';
        svgContainer.innerHTML = savedAvatarSvg;
        
        // Limpiar el contenedor y agregar el SVG
        avatarContainer.innerHTML = '';
        avatarContainer.appendChild(svgContainer);
        
        // Asegurar que el SVG se vea bien
        const svgElement = svgContainer.querySelector('svg');
        if (svgElement) {
            svgElement.style.width = '120px';
            svgElement.style.height = '120px';
            svgElement.style.maxWidth = '100%';
            svgElement.style.maxHeight = '100%';
        }
        
        currentAvatar = savedAvatar ? JSON.parse(savedAvatar) : null;
        
        // Agregar clase para indicar que es un avatar personalizado
        const avatarButton = document.getElementById('character-avatar-button');
        if (avatarButton) {
            avatarButton.classList.add('custom-avatar');
        }
        
        // Actualizar mensaje de bienvenida
        updateCharacterSpeech('¡Hola! Soy tu avatar personalizado. ¡Estoy listo para acompañarte en esta aventura de MUST!');
    } else if (avatarContainer) {
        // Mostrar avatar por defecto
        const defaultImg = avatarContainer.querySelector('img');
        if (defaultImg) {
            defaultImg.style.display = 'block';
        }
        
        // Mensaje para invitar a personalizar
        updateCharacterSpeech('¡Hola! Soy tu guía en esta aventura. ¡Haz clic en mí para personalizarme y hacer que me vea como tú quieras!');
    }
}

// Función para ir a la selección de avatar
function goToAvatarSelection() {
    console.log('goToAvatarSelection called'); // Debug
    playClickSound();
    updateCharacterSpeech('¡Vamos a personalizar tu avatar! Te llevaré al taller de personalización.');
    setTimeout(() => {
        window.location.href = '../avatar/avatar.html';
    }, 1000);
}

// Hacer la función global para que sea accesible desde onclick
window.goToAvatarSelection = goToAvatarSelection;

// Función para detectar si hay un avatar personalizado
function hasCustomAvatar() {
    return localStorage.getItem('mustQuestAvatarSvg') !== null;
}

// Función para limpiar avatar (útil para testing)
function clearAvatar() {
    localStorage.removeItem('mustQuestAvatarSvg');
    localStorage.removeItem('mustQuestAvatar');
    location.reload();
}

// Funciones de sonido
function playClickSound() {
    const audio = document.getElementById('clickSound');
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
}

function playCorrectSound() {
    const audio = document.getElementById('correctSound');
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
}

function playWrongSound() {
    const audio = document.getElementById('wrongSound');
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
}

function playLevelUpSound() {
    const audio = document.getElementById('levelUpSound');
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
}

// Función para cambiar vista del mundo
function changeView(view) {
    playClickSound();
    
    // Ocultar todas las vistas
    document.querySelectorAll('.world-view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.world-nav-btn').forEach(btn => btn.classList.remove('active'));
    
    // Mostrar la vista seleccionada
    const viewElement = document.getElementById(`${view}-view`);
    const buttonElement = document.querySelector(`[data-view="${view}"]`);
    
    if (viewElement) viewElement.classList.add('active');
    if (buttonElement) buttonElement.classList.add('active');
    
    // Actualizar el mensaje del personaje según la vista
    switch(view) {
        case 'map':
            updateCharacterSpeech('¡Aquí está nuestro mapa de aventuras! Selecciona un reino para comenzar tu entrenamiento.');
            break;
        case 'resources':
            updateCharacterSpeech('¡Estos recursos te ayudarán en tu aventura! No olvides que puedes personalizarme haciendo clic en mí.');
            break;
        case 'achievements':
            updateCharacterSpeech('¡Mira todos los logros que puedes desbloquear! Cada nivel completado te acerca más a la maestría.');
            break;
    }
}

// Función para navegar a diferentes recursos
function goToResource(resource) {
    playClickSound();
    
    switch(resource) {
        case 'theory':
            window.open('views/theory.html', '_blank');
            break;
        case 'flashcards':
            window.open('views/theory.html', '_blank');
            break;
        case 'practice':
            window.open('views/present-simple.html', '_blank');
            break;
        case 'avatar':
            goToAvatarSelection();
            break;
        case 'quiz':
            window.open('views/exam.html', '_blank');
            break;
        default:
            console.log('Recurso no encontrado:', resource);
    }
}

// Función para navegar a un nivel específico
function goToLevel(level) {
    playClickSound();
    
    // Verificar si el nivel está desbloqueado
    if (isLevelUnlocked(level)) {
        window.open(`views/${level}.html`, '_blank');
    } else {
        updateCharacterSpeech('¡Primero debes completar los niveles anteriores para desbloquear este reino!');
        playWrongSound();
    }
}

// Verificar si un nivel está desbloqueado
function isLevelUnlocked(level) {
    const levelOrder = ['present-simple', 'present-continuous', 'present-perfect', 'past', 'future', 'exam'];
    const levelIndex = levelOrder.indexOf(level);
    
    if (levelIndex === 0) return true; // El primer nivel siempre está desbloqueado
    
    // Verificar que todos los niveles anteriores estén completados
    for (let i = 0; i < levelIndex; i++) {
        const previousLevel = levelOrder[i];
        if (!localStorage.getItem(`completed_${previousLevel}`)) {
            return false;
        }
    }
    return true;
}

// Función para actualizar el discurso del personaje
function updateCharacterSpeech(message) {
    const speechElement = document.getElementById('character-speech');
    if (speechElement) {
        // Si es una clave de mensaje, usar el mensaje correspondiente
        if (characterSpeeches[message]) {
            speechElement.textContent = characterSpeeches[message];
        } else {
            // Si es un mensaje directo, usarlo tal como está
            speechElement.textContent = message;
        }
    }
}

// Configurar el botón del avatar
function setupAvatarButton() {
    const avatarButton = document.getElementById('character-avatar-button');
    const characterDisplay = document.getElementById('character-display');
    
    console.log('Setting up avatar button...', avatarButton); // Debug
    
    if (avatarButton) {
        // Remover cualquier event listener previo
        avatarButton.removeEventListener('click', goToAvatarSelection);
        
        // Agregar nuevo event listener
        avatarButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Avatar button clicked!'); // Debug
            goToAvatarSelection();
        });
        
        // También agregar al display interno por si acaso
        if (characterDisplay) {
            characterDisplay.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Character display clicked!'); // Debug
                goToAvatarSelection();
            });
        }
        
        console.log('Avatar button setup complete'); // Debug
    } else {
        console.error('Avatar button not found!'); // Debug
    }
}

// Inicializar la página cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializePage);
