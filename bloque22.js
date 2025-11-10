//detectDevTools auto fermer la page
(function () {
  // Fermer ou vider la page
  function lockPage() {
    try {
      window.close(); // marche si ouvert par JS
    } catch (e) {}
    setTimeout(() => {
      if (!window.closed) {
          window.location.href = "about:blank";
      }
    }, 10);
  }

  // Détection par différence de taille (dock DevTools)
  function checkBySize(threshold = 200) {
    const wDiff = Math.abs(window.outerWidth - window.innerWidth);
    const hDiff = Math.abs(window.outerHeight - window.innerHeight);
    return wDiff > threshold || hDiff > threshold;
  }

  // Détection console getter trick (DevTools ouvert)
  let consoleHit = false;
  async function checkByConsole() {
    consoleHit = false;
    const probe = {};
    Object.defineProperty(probe, 'id', {
      get() {
        consoleHit = true;
        return 'x';
      }
    });
    console.log(probe);
    return new Promise(resolve => setTimeout(() => resolve(consoleHit), 50));
  }

  // Boucle de surveillance
  async function monitor() {
    while (true) {
      try {
        if (checkBySize() || await checkByConsole()) {
          lockPage();
          break;
        }
      } catch(e) {}
      await new Promise(r => setTimeout(r, 800));
    }
  }

  monitor();
})();
