// Main JavaScript for MUST QUEST
// Manages the main map view and navigation

// Variables globales
let userProgress = {
    stars: 0,
    level: 1,
    completedLevels: {
        'present-simple': false,
        'present-continuous': false,
        'present-perfect': false,
        'past': false,
        'future': false,
        'exam': false
    },
    achievements: {
        'first-step': false,
        'three-day-streak': false,
        'must-master': false,
        'lightning-speed': false,
        'perfectionist': false,
        'scholar': false
    },
    lastVisit: new Date().toISOString(),
    streak: 0
};

// Elementos del DOM
document.addEventListener('DOMContentLoaded', function() {
    // Clean up any avatar-related localStorage items
    cleanupAvatarData();
    
    // Inicializar elementos
    const soundToggle = document.getElementById('sound-toggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const starsCount = document.getElementById('stars-count');
    const levelCount = document.getElementById('level-count');
    
    // Cargar progreso del usuario
    loadUserProgress();
    
    // Actualizar interfaz con el progreso del usuario
    updateProgressUI();
    
    // Inicializar avatar
    loadSavedAvatar();
    setupAvatarButton();
    checkAvatarStatus();
    
    // Configurar el control de sonido
    if (soundToggle) {
        soundToggle.addEventListener('click', toggleSound);
    }
    
    // Inicializar los botones de navegación de vista
    const worldNavButtons = document.querySelectorAll('.world-nav-btn');
    worldNavButtons.forEach(button => {
        button.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            changeView(view);
        });
    });
    
    // Inicializar nodos de nivel
    const levelNodes = document.querySelectorAll('.level-node');
    levelNodes.forEach(node => {
        const level = node.getAttribute('data-level');
        const section = node.getAttribute('data-section');
        
        // Verificar si el nivel está desbloqueado
        if (isLevelUnlocked(level)) {
            node.querySelector('.node-status').classList.remove('locked');
            node.querySelector('.node-status').classList.add('unlocked');
            node.querySelector('.node-status i').className = 'fas fa-unlock';
        }
        
        // Verificar si el nivel está completado
        if (userProgress.completedLevels[section]) {
            node.classList.add('completed');
        }    });
});

// Función para cargar el progreso del usuario
function loadUserProgress() {
    const savedProgress = localStorage.getItem('mustQuestProgress');
    if (savedProgress) {
        userProgress = JSON.parse(savedProgress);
        
        // Actualizar streak si es un nuevo día
        const lastVisit = new Date(userProgress.lastVisit);
        const today = new Date();
        
        if (isNewDay(lastVisit, today)) {
            // Si es el día siguiente, incrementar streak
            if (isDayAfter(lastVisit, today)) {
                userProgress.streak++;
                
                // Verificar logro de streak de 3 días
                if (userProgress.streak >= 3 && !userProgress.achievements['three-day-streak']) {
                    userProgress.achievements['three-day-streak'] = true;
                    userProgress.stars += 5;
                    showAchievementNotification('¡Streak de 3 días!', 'Has estudiado durante 3 días consecutivos. ¡Sigue así!');
                    updateAchievementUI('achievement-2');
                }
            } else {
                // Si no es el día siguiente, reiniciar streak
                userProgress.streak = 1;
            }
            
            userProgress.lastVisit = new Date().toISOString();
            saveUserProgress();
        }

    }
    updateLockStatus();
}

// Verificar si es un nuevo día
function isNewDay(date1, date2) {
    return date1.getDate() !== date2.getDate() || 
           date1.getMonth() !== date2.getMonth() || 
           date1.getFullYear() !== date2.getFullYear();
}

// Verificar si date2 es el día siguiente a date1
function isDayAfter(date1, date2) {
    const oneDayInMs = 24 * 60 * 60 * 1000;
    const diffTime = Math.abs(date2 - date1);
    return diffTime < oneDayInMs * 2 && diffTime > 0;
}

// Guardar progreso del usuario
function saveUserProgress() {
    localStorage.setItem('mustQuestProgress', JSON.stringify(userProgress));
    // Actualizar la interfaz cada vez que se guarda el progreso
    updateProgressUI();
    updateLockStatus();
}

// Actualizar la interfaz con el progreso
function updateProgressUI() {
    const starsCount = document.getElementById('stars-count');
    const levelCount = document.getElementById('level-count');
    
    if (starsCount) starsCount.textContent = userProgress.stars;
    if (levelCount) levelCount.textContent = userProgress.level;
    
    // Actualizar el estado de los logros
    for (const achievement in userProgress.achievements) {
        if (userProgress.achievements[achievement]) {
            updateAchievementUI('achievement-' + achievement.split('-')[1]);
        }
    }
}

// Actualizar la UI de un logro específico
function updateAchievementUI(achievementId) {
    const achievementCard = document.getElementById(achievementId);
    if (achievementCard) {
        achievementCard.classList.remove('locked');
        achievementCard.classList.add('unlocked');
    }
}

// Mostrar notificación de logro
function showAchievementNotification(title, message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'achievement-notification animate__animated animate__fadeInUp';
    
    notification.innerHTML = `
        <div class="notification-icon">🏆</div>
        <div class="notification-content">
            <h3>${title}</h3>
            <p>${message}</p>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Añadir al cuerpo del documento
    document.body.appendChild(notification);
    
    // Reproducir sonido
    document.getElementById('levelUpSound').play();
    
    // Configurar botón de cierre
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.classList.remove('animate__fadeInUp');
        notification.classList.add('animate__fadeOutDown');
        setTimeout(() => {
            notification.remove();
        }, 500);
    });
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('animate__fadeInUp');
            notification.classList.add('animate__fadeOutDown');
            setTimeout(() => {
                if (notification.parentNode) notification.remove();
            }, 500);
        }
    }, 5000);
}

// Verificar si un nivel está desbloqueado
function isLevelUnlocked(level) {
    // El nivel 1 siempre está desbloqueado
    if (level === '1' || level === 1) return true;
    
    // El nivel final requiere que todos los demás niveles estén completados
    if (level === 'final') {
        return userProgress.completedLevels['present-simple'] &&
               userProgress.completedLevels['present-continuous'] &&
               userProgress.completedLevels['present-perfect'] &&
               userProgress.completedLevels['past'] &&
               userProgress.completedLevels['future'];
    }
    
    // Para los demás niveles, el nivel anterior debe estar completado
    const previousLevel = parseInt(level) - 1;
    const previousLevelSection = getLevelSection(previousLevel);
    return userProgress.completedLevels[previousLevelSection];
}

// Obtener la sección correspondiente a un nivel
function getLevelSection(level) {
    const levelMap = {
        1: 'present-simple',
        2: 'present-continuous',
        3: 'present-perfect',
        4: 'past',
        5: 'future'
    };
    return levelMap[level];
}

// Cambiar entre vistas (mapa, recursos, logros)
function changeView(view) {
    // Reproducir sonido de clic
    document.getElementById('clickSound').play();
    
    // Actualizar botones de navegación
    const navButtons = document.querySelectorAll('.world-nav-btn');
    navButtons.forEach(btn => {
        if (btn.getAttribute('data-view') === view) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Actualizar vistas
    const views = document.querySelectorAll('.world-view');
    views.forEach(v => {
        if (v.id === view + '-view') {
            v.classList.add('active');
        } else {
            v.classList.remove('active');
        }
    });
    
    // Actualizar el mensaje del personaje según la vista
    const characterSpeech = document.getElementById('character-speech');
    if (characterSpeech) {
        switch (view) {
            case 'map':
                characterSpeech.textContent = '¡Bienvenido al mapa de nuestra aventura! Selecciona un reino gramatical para comenzar, o explora los recursos adicionales que te ayudarán en tu viaje.';
                break;
            case 'resources':
                characterSpeech.textContent = 'Estos recursos te ayudarán en tu aventura. Explora el libro de teoría para entender mejor el uso de MUST, o practica con las tarjetas y ejercicios.';
                break;
            case 'achievements':
                characterSpeech.textContent = '¡Aquí puedes ver tus logros! Completa lecciones, mantén una racha de estudio y supera desafíos para desbloquearlos todos.';
                break;
        }
    }
}

// Ir a un nivel específico
function goToLevel(section) {
    // Verificar si el nivel está desbloqueado
    const levelNode = document.querySelector(`.level-node[data-section="${section}"]`);
    const level = levelNode.getAttribute('data-level');
    
    if (!isLevelUnlocked(level)) {
        // Mostrar mensaje de nivel bloqueado
        const characterSpeech = document.getElementById('character-speech');
        characterSpeech.textContent = '¡Este nivel aún está bloqueado! Debes completar los niveles anteriores para desbloquearlo.';
        
        // Reproducir sonido de error
        document.getElementById('wrongSound').play();
        
        // Agitar el nodo de nivel para indicar que está bloqueado
        levelNode.classList.add('shake');
        setTimeout(() => {
            levelNode.classList.remove('shake');
        }, 500);
        
        return;
    }
    
    // Reproducir sonido de clic
    document.getElementById('clickSound').play();
    
    // Redirigir a la página del nivel
    setTimeout(() => {
        window.location.href = `views/${section}.html`;
    }, 300);
}

// Ir a un recurso específico
function goToResource(resource) {
    // Reproducir sonido de clic
    document.getElementById('clickSound').play();
    
    // Redirigir a la página del recurso
    setTimeout(() => {
        switch (resource) {
            case 'theory':
                window.location.href = 'views/theory.html';
                break;
            case 'flashcards':
                window.location.href = 'views/flashcards.html';
                break;
            case 'practice':
                window.location.href = 'views/practice.html';
                break;
            case 'avatar':
                goToAvatarSelection();
                break;
            case 'quiz':
                window.location.href = 'views/quiz.html';
                break;
        }
    }, 300);
}

// Control de sonido
function toggleSound() {
    const soundBtn = document.getElementById('sound-toggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    if (backgroundMusic.paused) {
        backgroundMusic.volume = 0.3;
        backgroundMusic.play();
        soundBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        backgroundMusic.pause();
        soundBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
}

// Utility function to play sounds safely
function playSound(soundId) {
    try {
        const sound = document.getElementById(soundId);
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => {
                // Ignore audio play errors (user hasn't interacted with page yet)
                console.log('Audio play prevented:', e.message);
            });
        }
    } catch (error) {
        console.log('Error playing sound:', error);
    }
}

// Clean up avatar-related localStorage items
function cleanupAvatarData() {
    localStorage.removeItem('playerAvatarCode');
    localStorage.removeItem('savedAvatars');
    localStorage.removeItem('avatarSettings');
    localStorage.removeItem('customAvatarData');
}

// Avatar management functions
let currentAvatar = null;

// Función para cargar el avatar guardado
function loadSavedAvatar() {
    const avatarContainer = document.getElementById('character-display');
    
    // Buscar avatar avanzado de MustQuest
    const savedAdvancedAvatar = localStorage.getItem('mustQuestAvatarSvg');
    
    if (savedAdvancedAvatar && avatarContainer) {
        // Cargar avatar avanzado
        avatarContainer.innerHTML = savedAdvancedAvatar;
        
        // Ajustar el SVG para que se vea bien
        const svgElement = avatarContainer.querySelector('svg');
        if (svgElement) {
            svgElement.style.width = '100%';
            svgElement.style.height = '100%';
            svgElement.style.maxWidth = '150px';
            svgElement.style.maxHeight = '150px';
            svgElement.removeAttribute('width');
            svgElement.removeAttribute('height');
        }
        
        // Ocultar imagen por defecto
        const defaultImg = avatarContainer.querySelector('img');
        if (defaultImg) {
            defaultImg.style.display = 'none';
        }
        
        // Mensaje de avatar avanzado
        updateCharacterSpeech('¡Hola! Soy tu avatar personalizado avanzado. ¡Estoy listo para la aventura!');
    } else {
        // Avatar por defecto
        const defaultImg = avatarContainer.querySelector('img');
        if (defaultImg) {
            defaultImg.style.display = 'block';
        }
        
        updateCharacterSpeech('¡Hola! Haz clic en mí para crear tu avatar personalizado.');
    }
}

// Función para ir a la selección de avatar
function goToAvatarSelection() {
    console.log('goToAvatarSelection called'); // Debug
    playSound('clickSound');
    
    const characterSpeech = document.getElementById('character-speech');
    if (characterSpeech) {
        characterSpeech.textContent = '¡Vamos a personalizar tu avatar! Te llevaré al taller de personalización.';
    }
    
    setTimeout(() => {
        // Detectar si estamos en la raíz de MUST o en una subcarpeta (views)
        const currentPath = window.location.pathname;
        let avatarPath;
        
        if (currentPath.includes('/views/')) {
            // Estamos en la carpeta views, usar ruta relativa hacia arriba
            avatarPath = '../avatar/avatar.html';
        } else {
            // Estamos en la raíz de MUST, usar ruta directa
            avatarPath = 'avatar/avatar.html';
        }
        
        console.log('Current path:', currentPath);
        console.log('Avatar path:', avatarPath);
        
        window.location.href = avatarPath;
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

// Verificar el estado del avatar y mostrar mensaje apropiado
function checkAvatarStatus() {
    const hasAvatar = hasCustomAvatar();
    const isFirstVisit = !localStorage.getItem('mustQuestFirstVisit');
    
    if (isFirstVisit) {
        localStorage.setItem('mustQuestFirstVisit', 'true');
        setTimeout(() => {
            const characterSpeech = document.getElementById('character-speech');
            if (characterSpeech) {
                characterSpeech.textContent = '¡Bienvenido por primera vez a MUST QUEST! Haz clic en mí para personalizarme y empezar tu aventura con estilo.';
            }
        }, 2000);
    } else if (hasAvatar) {
        setTimeout(() => {
            const characterSpeech = document.getElementById('character-speech');
            if (characterSpeech) {
                characterSpeech.textContent = '¡Hola de nuevo! Me gusta cómo me has personalizado. ¿Listos para continuar aprendiendo MUST?';
            }
        }, 1500);
    }
}

// Función para actualizar la visualización de los niveles desbloqueados
function updateLevelUI() {
    const levelNodes = document.querySelectorAll('.level-node');
    levelNodes.forEach(node => {
        const level = node.getAttribute('data-level');
        const section = node.getAttribute('data-section');
        
        // Verificar si el nivel está desbloqueado
        if (isLevelUnlocked(level)) {
            // Actualizar el estado visual del candado a desbloqueado y verde
            const nodeStatus = node.querySelector('.node-status');
            nodeStatus.classList.remove('locked');
            nodeStatus.classList.add('unlocked');
            node.querySelector('.node-status i').className = 'fas fa-unlock';
            
            // Opcional: Añadir estilos CSS para el candado verde
            nodeStatus.style.backgroundColor = '#4CAF50'; // verde
            nodeStatus.style.color = '#fff'; // texto blanco
        }
        
        // Verificar si el nivel está completado
        if (userProgress.completedLevels[section]) {
            node.classList.add('completed');
        }
    });
}

// Modificar la función loadUserProgress para llamar a updateLevelUI
function loadUserProgress() {
    const savedProgress = localStorage.getItem('mustQuestProgress');
    if (savedProgress) {
        userProgress = JSON.parse(savedProgress);
        
        // Actualizar streak si es un nuevo día
        const lastVisit = new Date(userProgress.lastVisit);
        const today = new Date();
        
        if (isNewDay(lastVisit, today)) {
            // Si es el día siguiente, incrementar streak
            if (isDayAfter(lastVisit, today)) {
                userProgress.streak++;
                
                // Verificar logro de streak de 3 días
                if (userProgress.streak >= 3 && !userProgress.achievements['three-day-streak']) {
                    userProgress.achievements['three-day-streak'] = true;
                    userProgress.stars += 5;
                    showAchievementNotification('¡Streak de 3 días!', 'Has estudiado durante 3 días consecutivos. ¡Sigue así!');
                    updateAchievementUI('achievement-2');
                }
            } else {
                // Si no es el día siguiente, reiniciar streak
                userProgress.streak = 1;
            }
            
            userProgress.lastVisit = today.toISOString();
            saveUserProgress();
        }
    }
    
    // Actualizar la interfaz de los niveles después de cargar el progreso
    updateLevelUI();
}

// Añadir una función para marcar un nivel como completado
function markLevelCompleted(section) {
    // Marcar el nivel como completado
    userProgress.completedLevels[section] = true;
    
    // Incrementar nivel si es necesario
    const levelNode = document.querySelector(`.level-node[data-section="${section}"]`);
    if (levelNode) {
        const level = parseInt(levelNode.getAttribute('data-level'));
        userProgress.level = Math.max(userProgress.level, level + 1);
    }
    
    // Guardar y actualizar
    saveUserProgress();
    updateLevelUI();
}
window.completeLevel = completeLevel;

// Función que debe llamarse cuando se completa un nivel
// Esta función debería ser llamada desde cada página de nivel cuando se completa
function onLevelComplete(section) {
    markLevelCompleted(section);
    
    // Avanzar al siguiente nivel si es necesario
    const currentLevel = parseInt(document.querySelector(`.level-node[data-section="${section}"]`).getAttribute('data-level'));
    if (currentLevel < 5) { // Asumiendo que hay 5 niveles (1-4 + final)
        userProgress.level = Math.max(userProgress.level, currentLevel + 1);
    }
    
    // Otorgar estrellas por completar el nivel
    userProgress.stars += 10;
    
    // Guardar el progreso actualizado
    saveUserProgress();
    
    // Actualizar la interfaz
    updateProgressUI();
    updateLevelUI();
}

// Asegurarse de que updateLevelUI se llame al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Código existente...
    
    // Actualizar la interfaz de los niveles
    updateLevelUI();
});

// Añade esta nueva función para actualizar el estado visual de los candados
function updateLockStatus() {
    // Obtener todos los nodos de nivel
    const levelNodes = document.querySelectorAll('.level-node');
    
    levelNodes.forEach(node => {
        const level = node.getAttribute('data-level');
        const section = node.getAttribute('data-section');
        const nodeStatus = node.querySelector('.node-status');
        
        // Verificar si el nivel está desbloqueado según la lógica existente
        if (isLevelUnlocked(level)) {
            // Actualizar clases CSS y icono
            nodeStatus.classList.remove('locked');
            nodeStatus.classList.add('unlocked');
            nodeStatus.querySelector('i').className = 'fas fa-unlock';
            
            // Cambiar el color del candado a verde
            nodeStatus.style.color = '#4CAF50';
        } else {
            // Mantener el candado bloqueado
            nodeStatus.classList.remove('unlocked');
            nodeStatus.classList.add('locked');
            nodeStatus.querySelector('i').className = 'fas fa-lock';
            nodeStatus.style.color = ''; // Usar el color por defecto
        }
        
        // Marcar como completado si corresponde
        if (userProgress.completedLevels[section]) {
            node.classList.add('completed');
        }
    });
}