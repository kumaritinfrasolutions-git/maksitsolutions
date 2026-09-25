// Psychological Blue Theme Controller
(function() {
  const savedTheme = localStorage.getItem('maks_theme');
  if (savedTheme === 'deep-blue') {
    document.documentElement.setAttribute('data-theme', 'deep-blue');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  function setupToggle() {
    const toggleBtn = document.getElementById('themeToggleBtn');
    if (!toggleBtn) return;

    function updateBtn() {
      const isDeep = document.documentElement.getAttribute('data-theme') === 'deep-blue';
      toggleBtn.innerHTML = isDeep 
        ? `<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg> <span>Azure Blue</span>`
        : `<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg> <span>Deep Navy</span>`;
      toggleBtn.setAttribute('title', isDeep ? 'Switch to Azure Trust Blue' : 'Switch to Deep Sapphire Navy');
    }

    toggleBtn.addEventListener('click', () => {
      const isDeep = document.documentElement.getAttribute('data-theme') === 'deep-blue';
      if (isDeep) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('maks_theme', 'azure');
      } else {
        document.documentElement.setAttribute('data-theme', 'deep-blue');
        localStorage.setItem('maks_theme', 'deep-blue');
      }
      updateBtn();
    });

    updateBtn();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupToggle);
  } else {
    setupToggle();
  }
})();
