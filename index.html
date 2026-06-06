/* Restaurant Test - shared frontend configuration */
window.RESTAURANT_SYSTEM = {
  appName: 'Restaurant Test Ordering System',
  businessName: 'Restaurant Test',
  licenseName: 'Restaurant Test Ordering System',
  licenseBy: 'Visual Event Network',
  currency: 'USD',
  defaultLat: 30.3322,
  defaultLng: -81.6557,
  locationUpdateSeconds: 30,
  apiTimeoutMs: 30000,

  clientApiUrl: 'https://script.google.com/macros/s/AKfycbz3trsuRc4F-AolagUeX3O4Ildr83YoJnPOxhdLYNvJgN1mTYOxVv7DGCifm-SGJ34NaA/exec',
  adminApiUrl: 'https://script.google.com/macros/s/AKfycbwnIrpJ618l_esUejx5JpLTO50mt8yjGKLksU0q2xNrIEfP8YmyJExRTBf5od0_ZeC7/exec',
  deliveryApiUrl: 'https://script.google.com/macros/s/AKfycbw4LhlOWZ1oK0UnuhRTCwd7ce2cEXw_DpiSru2Oaq29A6_qklb6xABv1fsLzuhxHjO-8w/exec',

  trackingPage: 'tracking.html',
  deliveryPage: 'admin.html',
  adminPage: 'admin.html',
  indexPage: 'index.html'
};

(function(){
  function buildUrl(baseUrl, params){
    const query = Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(typeof value === 'string' ? value : JSON.stringify(value)))
      .join('&');
    return baseUrl + (baseUrl.includes('?') ? '&' : '?') + query;
  }

  function jsonp(baseUrl, action, payload = {}){
    return new Promise((resolve, reject) => {
      if(!baseUrl || baseUrl.includes('PASTE' + '_')){
        reject(new Error('API URL is not configured yet in assets/config.js'));
        return;
      }

      const callback = 'rt_cb_' + Date.now() + '_' + Math.random().toString(36).slice(2);
      const script = document.createElement('script');
      const timer = setTimeout(() => {
        cleanup();
        reject(new Error('API request timed out'));
      }, window.RESTAURANT_SYSTEM.apiTimeoutMs || 30000);

      function cleanup(){
        clearTimeout(timer);
        try { delete window[callback]; } catch(err) { window[callback] = undefined; }
        if(script.parentNode) script.parentNode.removeChild(script);
      }

      window[callback] = response => {
        cleanup();
        if(response && response.success) resolve(response.data || response);
        else reject(new Error((response && response.message) || 'API error'));
      };

      script.onerror = () => {
        cleanup();
        reject(new Error('Could not reach API'));
      };

      script.src = buildUrl(baseUrl, {
        action: action,
        callback: callback,
        payload: typeof payload === 'string' ? payload : JSON.stringify(payload || {})
      });
      document.body.appendChild(script);
    });
  }

  window.RTApi = {
    client(action, payload){ return jsonp(window.RESTAURANT_SYSTEM.clientApiUrl, action, payload); },
    admin(action, payload){ return jsonp(window.RESTAURANT_SYSTEM.adminApiUrl, action, payload); },
    delivery(action, payload){ return jsonp(window.RESTAURANT_SYSTEM.deliveryApiUrl, action, payload); },
    money(value){ return '$' + (Number(value || 0)).toFixed(2); },
    esc(value){
      return String(value ?? '').replace(/[&<>"']/g, character => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[character]));
    }
  };
})();
