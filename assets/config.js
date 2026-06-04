/* Restaurant Test - GitHub Pages frontend configuration
   Replace the three API URLs after deploying each Apps Script web app.
   Keep this file in GitHub so all pages use the same endpoints. */
window.RESTAURANT_SYSTEM = {
  appName: 'Restaurant Test Ordering System',
  businessName: 'Restaurant Test',
  licenseName: 'Restaurant Test Ordering System',
  licenseBy: 'Visual Event Network',
  currency: 'USD',
  defaultLat: 30.3322,
  defaultLng: -81.6557,
  locationUpdateSeconds: 30,

  clientApiUrl: 'https://script.google.com/macros/s/AKfycbz3trsuRc4F-AolagUeX3O4Ildr83YoJnPOxhdLYNvJgN1mTYOxVv7DGCifm-SGJ34NaA/exec',
  adminApiUrl: 'https://script.google.com/macros/s/AKfycbwnIrpJ618l_esUejx5JpLTO50mt8yjGKLksU0q2xNrIEfP8YmyJExRTBf5od0_ZeC7/exec',
  deliveryApiUrl: 'PASTE_DELIVERY_TRACKING_API_WEB_APP_URL_HERE',

  trackingPage: 'tracking.html',
  deliveryPage: 'delivery.html',
  adminPage: 'admin.html',
  indexPage: 'index.html'
};

(function(){
  function buildUrl(baseUrl, params){
    const query = Object.entries(params)
      .filter(([,v]) => v !== undefined && v !== null && v !== '')
      .map(([k,v]) => encodeURIComponent(k) + '=' + encodeURIComponent(typeof v === 'string' ? v : JSON.stringify(v)))
      .join('&');
    return baseUrl + (baseUrl.includes('?') ? '&' : '?') + query;
  }

  function jsonp(baseUrl, action, payload = {}){
    return new Promise((resolve, reject) => {
      if(!baseUrl || baseUrl.includes('PASTE_')){
        reject(new Error('API URL is not configured yet in assets/config.js'));
        return;
      }
      const callback = 'rt_cb_' + Date.now() + '_' + Math.random().toString(36).slice(2);
      const script = document.createElement('script');
      const timer = setTimeout(() => {
        cleanup();
        reject(new Error('API request timed out'));
      }, 30000);
      function cleanup(){
        clearTimeout(timer);
        try{ delete window[callback]; }catch(e){ window[callback] = undefined; }
        script.remove();
      }
      window[callback] = (response) => {
        cleanup();
        if(response && response.success) resolve(response.data || response);
        else reject(new Error((response && response.message) || 'API error'));
      };
      script.onerror = () => {
        cleanup();
        reject(new Error('Could not reach API'));
      };
      script.src = buildUrl(baseUrl, { action, callback, payload });
      document.body.appendChild(script);
    });
  }

  window.RTApi = {
    client(action, payload){ return jsonp(window.RESTAURANT_SYSTEM.clientApiUrl, action, payload); },
    admin(action, payload){ return jsonp(window.RESTAURANT_SYSTEM.adminApiUrl, action, payload); },
    delivery(action, payload){ return jsonp(window.RESTAURANT_SYSTEM.deliveryApiUrl, action, payload); },
    money(value){ return '$' + (Number(value || 0)).toFixed(2); },
    esc(value){ return String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }
  };
})();
