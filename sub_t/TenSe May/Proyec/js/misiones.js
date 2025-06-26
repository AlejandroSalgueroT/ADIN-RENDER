document.addEventListener('DOMContentLoaded', () => {
  // Marcar misión como completada
  document.querySelectorAll('.btn-mision').forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.mision-card');
      card.classList.add('completada');
      this.textContent = '¡Misión completada!';
      this.disabled = true;
    });
  });

 

});