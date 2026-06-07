(function(){
  var manifestLink = document.querySelector('link[rel="manifest"]');
  var manifestHref = manifestLink ? manifestLink.getAttribute('href') || '' : '';
  var appType = manifestHref.indexOf('management') !== -1 ? 'management' : 'client';
  var installLabel = appType === 'management' ? 'Install management app' : 'Install order app';

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function(){
      navigator.serviceWorker.register('./service-worker.js').catch(function(){});
    });
  }

  window.addEventListener('beforeinstallprompt', function(event){
    event.preventDefault();
    window.restaurantInstallPrompt = event;
    document.querySelectorAll('[data-install-app]').forEach(function(button){
      if (!button.getAttribute('data-install-label')) button.textContent = installLabel;
      button.setAttribute('aria-label', installLabel);
      button.style.display = '';
    });
  });

  window.RTPWA = {
    appType: appType,
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
