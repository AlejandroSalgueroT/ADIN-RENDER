// Script para cargar avatar en páginas de nivel
function loadAvatarInLevel() {
    const savedAvatarSvg = localStorage.getItem('mustQuestAvatarSvg');
    const sidebarImg = document.querySelector('.sidebar-img');
    const dialogueImg = document.querySelector('.dialogue-img');
    
    const defaultAvatarSvg = `
        <svg viewBox="0 0 360 360" style="width: 100%; height: 100%; border-radius: 50%;">
            <circle fill="#e3f2fd" cx="180" cy="180" r="180"/>
            <ellipse fill="#fdbcb4" cx="180" cy="280" rx="60" ry="80"/>
            <circle fill="#fdbcb4" cx="180" cy="180" r="80"/>
            <path fill="#8b4513" d="M100 120c0-50 35-80 80-80s80 30 80 80c0 20-10 40-10 60-20-10-50-10-70-10-20 0-50 0-70 10-10-20-10-40-10-60z"/>
            <circle fill="#000" cx="155" cy="165" r="8"/>
            <circle fill="#000" cx="205" cy="165" r="8"/>
            <ellipse fill="#f4a583" cx="180" cy="185" rx="6" ry="4"/>
            <path fill="#ff6b6b" d="M165 200c15 10 30 10 45 0-5 8-20 8-25 0-5 8-15 8-20 0"/>
            <path fill="#8b4513" d="M120 140c20-30 40-50 60-50 20 0 40 20 60 50-10-20-25-30-60-30-35 0-50 10-60 30z"/>
            <rect fill="#4a90e2" x="120" y="260" width="120" height="100" rx="10"/>
        </svg>
    `;
    
    const avatarToUse = savedAvatarSvg || defaultAvatarSvg;
    
    if (sidebarImg) {
        const avatarContainer = document.createElement('div');
        avatarContainer.innerHTML = avatarToUse;
        avatarContainer.style.width = sidebarImg.offsetWidth + 'px';
        avatarContainer.style.height = sidebarImg.offsetHeight + 'px';
        avatarContainer.style.borderRadius = '50%';
        avatarContainer.style.overflow = 'hidden';
        avatarContainer.style.border = '3px solid #ffd700';
        avatarContainer.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
        
        sidebarImg.parentNode.replaceChild(avatarContainer, sidebarImg);
    }
    
    if (dialogueImg) {
        const avatarContainer = document.createElement('div');
        avatarContainer.innerHTML = avatarToUse;
        avatarContainer.style.width = dialogueImg.offsetWidth + 'px';
        avatarContainer.style.height = dialogueImg.offsetHeight + 'px';
        avatarContainer.style.borderRadius = '50%';
        avatarContainer.style.overflow = 'hidden';
        avatarContainer.style.border = '3px solid #ffd700';
        avatarContainer.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
        avatarContainer.className = 'dialogue-img';
        
        dialogueImg.parentNode.replaceChild(avatarContainer, dialogueImg);
    }
    
    // Buscar y reemplazar todas las imágenes del personaje en la página
    const allCharacterImgs = document.querySelectorAll('img[src*="0MbrTTX"], img[alt*="Wizard"], img[alt*="Musty"]');
    allCharacterImgs.forEach(img => {
        if (!img.closest('.dialogue-img') && !img.classList.contains('sidebar-img')) {
            const avatarContainer = document.createElement('div');
            avatarContainer.innerHTML = avatarToUse;
            avatarContainer.style.width = img.offsetWidth + 'px';
            avatarContainer.style.height = img.offsetHeight + 'px';
            avatarContainer.style.borderRadius = '50%';
            avatarContainer.style.overflow = 'hidden';
            avatarContainer.style.border = '2px solid #ffd700';
            avatarContainer.className = img.className;
            
            img.parentNode.replaceChild(avatarContainer, img);
        }
    });
}

// Cargar el avatar cuando la página esté lista
document.addEventListener('DOMContentLoaded', loadAvatarInLevel);
