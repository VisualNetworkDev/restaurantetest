(function(){
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function(){
      navigator.serviceWorker.register('./service-worker.js').catch(function(){});
    });
  }

  window.addEventListener('beforeinstallprompt', function(event){
    event.preventDefault();
    window.restaurantInstallPrompt = event;
    document.querySelectorAll('[data-install-app]').forEach(function(button){
      button.style.display = '';
    });
  });

  window.RTPWA = {
    install: async function(){
      const promptEvent = window.restaurantInstallPrompt;
      if (!promptEvent) return false;
      promptEvent.prompt();
      await promptEvent.userChoice.catch(function(){});
      window.restaurantInstallPrompt = null;
      document.querySelectorAll('[data-install-app]').forEach(function(button){
        button.style.display = 'none';
      });
      return true;
    }
  };
})();
