/****************************************************
 * RESTAURANT/FOOD TRUCK EXAMPLE - CLIENT API v2
 * For index.html
 * Apps Script Web App: Execute as Me / Anyone
 ****************************************************/

const SPREADSHEET_ID = '1QShD3GKMicitcqPZKi1tDCkCo1iDfsjZNJUQEvcHn2U';
const PUBLIC_BASE_URL = 'https://example.com/restaurant-food-truck-example';
const ADMIN_EMAIL = 'owner@example.com';

const SHEETS = {
  CONFIG: 'Config',
  MENU: 'Menu',
  PROMOTIONS: 'Promotions',
  TESTIMONIALS: 'Testimonials',
  PAYMENTS: 'Payments',
  ORDERS: 'Orders',
  USERS: 'Users',
  SESSIONS: 'AdminSessions',
  LOGS: 'Logs',
  PICKUP_LOGS: 'PickupQRLogs',
  TRACKING: 'DeliveryTracking',
  SUMMARY: 'DeliverySummary'
};

const CONFIG_HEADERS = ['Key', 'Value'];
const PAYMENTS_HEADERS = ['Key', 'Value'];
const MENU_HEADERS = ['ID','Categoria','Nombre','Descripcion','Precio','Imagen','Disponible','Orden','Notas','TiempoPreparacionMin','Taxable','TieneOpciones','Opciones'];
const PROMO_HEADERS = ['Code','Title','Description','Type','Value','Active','StartDate','EndDate','MinSubtotal'];
const TESTIMONIAL_HEADERS = ['Name','Text','Rating','Visible'];
const ORDER_HEADERS = ['OrderID','Timestamp','ClienteNombre','ClienteTelefono','ClienteCorreo','TipoOrden','DireccionEntrega','InstruccionesEntrega','ItemsJSON','Subtotal','Descuento','Tax','DeliveryFee','Tip','Total','MetodoPago','PaymentStatus','Estado','AssignedDeliveryEmail','AssignedDeliveryName','CreatedBy','UpdatedAt','PickupToken','TrackingToken','PickupQRUrl','TrackingURL','AdminNotes','CustomerNotes','EmailClienteEnviado','EmailAdminEnviado','QRContent','QRStatus','QRExpiresAt','QRUsedAt'];
const USER_HEADERS = ['UserID','Nombre','Email','Password','Role','Estado','Disponible','FuncionesPermitidas','PuedeDelivery','PuedeKitchen','PuedePickup','RecibeCorreos','UltimoLogin','IntentosFallidos'];
const SESSION_HEADERS = ['SessionToken','Email','Name','Role','CreatedAt','ExpiresAt','Active','UserAgent'];
const LOG_HEADERS = ['LogID','Timestamp','UserEmail','UserRole','Action','OrderID','Details','Result','UserAgent'];
const PICKUP_LOG_HEADERS = ['LogID','Timestamp','OrderID','PickupToken','ScannedByEmail','ScannedByRole','Result','PreviousStatus','NewStatus','UserAgent','Notes'];
const TRACKING_HEADERS = ['TrackingID','OrderID','Timestamp','DeliveryEmail','DeliveryName','Event','Lat','Lng','Accuracy','Speed','Heading','OriginAddress','DestinationAddress','Status','UserAgent','Notes'];
const SUMMARY_HEADERS = ['OrderID','DeliveryEmail','DeliveryName','StartedAt','CompletedAt','DurationSeconds','DurationText','OriginAddress','DestinationAddress','StartLat','StartLng','EndLat','EndLng','LastLat','LastLng','TotalUpdates','FinalStatus'];

const DEFAULT_CONFIG = {
  name: 'Restaurant/Food Truck Example',
  email: ADMIN_EMAIL,
  adminEmail: ADMIN_EMAIL,
  phone: '(904) 000-0000',
  address: 'Jacksonville, FL',
  tagline: 'Order fresh. Track fast.',
  aboutText: 'Fresh food, smooth ordering, pickup QR, delivery tracking and professional receipts.',
  instagramUrl: '',
  heroImage: '',
  taxRate: 0.07,
  deliveryFee: 4.99,
  fixedDeliveryFee: 4.99,
  deliveryEnabled: 'Yes',
  pickupEnabled: 'Yes',
  defaultOrderStatus: 'Pending',
  currency: 'USD',
  licenseName: 'Restaurant/Food Truck Example Ordering System',
  licenseBy: 'Visual Event Network',
  publicBaseUrl: PUBLIC_BASE_URL,
  trackingPage: 'tracking.html',
  deliveryPage: 'admin.html',
  qrEnabled: 'Yes',
  agreementText: 'Please confirm that your order details are correct before placing the order.'
};

const DEFAULT_PAYMENTS = {
  enabled: 'No',
  provider: '',
  link: '',
  loginUrl: '',
  buttonLabel: 'Pay Securely',
  redirectMessage: 'You are being redirected to the restaurant secure payment page.'
};

function doGet(e) {
  const p = e && e.parameter ? e.parameter : {};
  const action = p.action || '';
  const callback = p.callback || '';
  try {
    setupClientSheets_();
    const payload = parsePayload_(p.payload);
    let data;
    switch (action) {
      case 'setup':
        data = { ok: true, sheets: Object.keys(SHEETS) };
        break;
      case 'health':
        data = { ok: true, api: 'client', timestamp: new Date() };
        break;
      case 'getRestaurantConfig':
        data = getRestaurantConfig_();
        break;
      case 'getMenu':
        data = getMenu_();
        break;
      case 'getPromotions':
        data = getPromotions_();
        break;
      case 'getTestimonials':
        data = getTestimonials_();
        break;
      case 'submitTestimonial':
      case 'submitReview':
        data = submitTestimonial_(payload);
        break;
      case 'getPaymentsConfig':
        data = getPaymentsConfig_();
        break;
      case 'validateCoupon':
        data = validateCoupon_(payload);
        break;
      case 'calculateCart':
        data = calculateCart_(payload);
        break;
      case 'createOrder':
        data = createOrder_(payload);
        break;
      default:
        throw new Error('Unknown client action: ' + action);
    }
    return output_({ success: true, data, message: 'OK' }, callback);
  } catch (err) {
    logAction_({ userEmail: 'public', userRole: 'customer', action: 'CLIENT_API_ERROR', orderId: '', details: err.stack || String(err), result: 'error', userAgent: p.userAgent || '' });
    return output_({ success: false, data: null, message: err.message || String(err) }, callback);
  }
}
function doPost(e) { return doGet(e); }

function getRestaurantConfig_() {
  const sheet = ensureSheet_(SHEETS.CONFIG, CONFIG_HEADERS);
  seedKeyValue_(sheet, DEFAULT_CONFIG);
  const config = normalizeTemplateConfig_(Object.assign({}, DEFAULT_CONFIG, readKeyValue_(sheet)));
  config.taxRate = Number(config.taxRate || 0);
  config.deliveryFee = Number(config.deliveryFee || 0);
  config.fixedDeliveryFee = Number(config.fixedDeliveryFee || config.deliveryFee || 0);
  config.publicBaseUrl = config.publicBaseUrl || PUBLIC_BASE_URL;
  config.trackingPage = config.trackingPage || 'tracking.html';
  config.payments = getPaymentsConfig_();
  return config;
}
function normalizeTemplateConfig_(config) {
  const oldName = ['Restaurant','Test'].join(' ');
  const oldEmail = '2808' + 'joel@' + 'gmail.com';
  const oldBaseUrl = 'https://' + 'visual' + 'network' + 'dev.github.io/' + 'restaurant' + 'test';
  if (String(config.name || '') === oldName) config.name = DEFAULT_CONFIG.name;
  if (String(config.email || '') === oldEmail) config.email = DEFAULT_CONFIG.email;
  if (String(config.adminEmail || '') === oldEmail) config.adminEmail = DEFAULT_CONFIG.adminEmail;
  if (String(config.licenseName || '') === oldName + ' Ordering System') config.licenseName = DEFAULT_CONFIG.licenseName;
  if (String(config.publicBaseUrl || '').indexOf(oldBaseUrl) !== -1) config.publicBaseUrl = DEFAULT_CONFIG.publicBaseUrl;
  return config;
}

function getPaymentsConfig_() {
  const sheet = ensureSheet_(SHEETS.PAYMENTS, PAYMENTS_HEADERS);
  seedKeyValue_(sheet, DEFAULT_PAYMENTS);
  return Object.assign({}, DEFAULT_PAYMENTS, readKeyValue_(sheet));
}

function getMenu_() {
  const sheet = ensureSheet_(SHEETS.MENU, MENU_HEADERS);
  seedMenu_(sheet);
  const items = rowsToObjects_(sheet)
    .filter(r => isYes_(r.Disponible))
    .sort((a,b) => Number(a.Orden || 9999) - Number(b.Orden || 9999))
    .map(r => ({
      id: String(r.ID || '').trim(),
      category: String(r.Categoria || 'Menu').trim(),
      name: String(r.Nombre || '').trim(),
      description: String(r.Descripcion || '').trim(),
      price: Number(r.Precio || 0),
      image: String(r.Imagen || '').trim(),
      available: String(r.Disponible || 'Yes'),
      order: Number(r.Orden || 9999),
      notes: String(r.Notas || ''),
      preparationMinutes: Number(r.TiempoPreparacionMin || 0),
      taxable: isYes_(r.Taxable),
      hasOptions: isYes_(r.TieneOpciones),
      options: String(r.Opciones || '')
    }))
    .filter(i => i.id && i.name);
  return { categories: [...new Set(items.map(i => i.category).filter(Boolean))], items };
}

function getPromotions_() {
  const sheet = ensureSheet_(SHEETS.PROMOTIONS, PROMO_HEADERS);
  seedPromotions_(sheet);
  const today = new Date();
  return rowsToObjects_(sheet)
    .filter(r => isYes_(r.Active))
    .filter(r => inDateRange_(today, r.StartDate, r.EndDate))
    .map(r => ({
      code: String(r.Code || '').trim(),
      title: String(r.Title || '').trim(),
      description: String(r.Description || '').trim(),
      type: String(r.Type || '').trim(),
      value: Number(r.Value || 0),
      minSubtotal: Number(r.MinSubtotal || 0)
    }))
    .filter(p => p.code);
}

function getTestimonials_() {
  const sheet = ensureSheet_(SHEETS.TESTIMONIALS, TESTIMONIAL_HEADERS);
  seedTestimonials_(sheet);
  return rowsToObjects_(sheet)
    .filter(r => isYes_(r.Visible))
    .map(r => ({ name: String(r.Name || '').trim(), text: String(r.Text || '').trim(), rating: Number(r.Rating || 5) }))
    .filter(t => t.name && t.text);
}

function submitTestimonial_(payload) {
  const name = clean_(payload.name || payload.customerName);
  const text = clean_(payload.text || payload.review);
  const rating = Math.max(1, Math.min(5, Number(payload.rating || 5)));
  const userAgent = clean_(payload.userAgent);
  if (!name) throw new Error('Name is required.');
  if (!text || text.length < 8) throw new Error('Review must be at least 8 characters.');
  ensureSheet_(SHEETS.TESTIMONIALS, TESTIMONIAL_HEADERS).appendRow([name, text, rating, 'Pending']);
  logAction_({ userEmail: 'public', userRole: 'customer', action: 'SUBMIT_REVIEW', orderId: '', details: name + ' rating ' + rating, result: 'pending', userAgent });
  return { status: 'Pending', message: 'Thank you. Your review was received.' };
}

function validateCoupon_(payload) {
  const code = clean_(payload.code || payload.coupon).toUpperCase();
  const subtotal = Number(payload.subtotal || 0);
  if (!code) return { valid: false, discount: 0, message: 'No coupon code provided.' };
  const promo = getPromotions_().find(p => String(p.code).toUpperCase() === code);
  if (!promo) return { valid: false, discount: 0, message: 'Invalid or inactive coupon.' };
  if (subtotal < Number(promo.minSubtotal || 0)) return { valid: false, discount: 0, message: 'Minimum subtotal not reached.' };
  return { valid: true, code: promo.code, type: promo.type, value: promo.value, discount: calculateDiscount_(promo, subtotal), message: 'Coupon applied.' };
}

function calculateCart_(payload) {
  const config = getRestaurantConfig_();
  const orderType = clean_(payload.orderType || 'pickup').toLowerCase();
  const requestedItems = Array.isArray(payload.items) ? payload.items : [];
  const coupon = clean_(payload.coupon).toUpperCase();

  if (orderType !== 'pickup' && orderType !== 'delivery') throw new Error('Invalid order type.');
  if (orderType === 'delivery' && !isYes_(config.deliveryEnabled)) throw new Error('Delivery is disabled.');
  if (orderType === 'pickup' && !isYes_(config.pickupEnabled)) throw new Error('Pickup is disabled.');
  if (!requestedItems.length) throw new Error('Cart is empty.');

  const menuItems = getMenu_().items;
  const finalItems = [];
  let subtotal = 0;

  requestedItems.forEach(req => {
    const id = String(req.id || '').trim();
    const qty = Number(req.qty || req.quantity || 1);
    if (!id || qty < 1) throw new Error('Invalid cart item.');
    const item = menuItems.find(i => String(i.id) === id);
    if (!item) throw new Error('Menu item not found or unavailable: ' + id);
    const lineTotal = roundMoney_(Number(item.price) * qty);
    subtotal += lineTotal;
    finalItems.push({
      id: item.id,
      category: item.category,
      name: item.name,
      quantity: qty,
      price: Number(item.price),
      lineTotal,
      notes: clean_(req.notes)
    });
  });

  let discount = 0;
  let couponResult = null;
  if (coupon) {
    couponResult = validateCoupon_({ code: coupon, subtotal });
    if (couponResult.valid) discount = Number(couponResult.discount || 0);
  }

  const taxableSubtotal = Math.max(0, subtotal - discount);
  const tax = roundMoney_(taxableSubtotal * Number(config.taxRate || 0));
  const deliveryFee = orderType === 'delivery' ? getFixedDeliveryFee_(config) : 0;
  const tip = roundMoney_(Math.max(0, Number(payload.tip || 0)));
  const total = roundMoney_(taxableSubtotal + tax + deliveryFee + tip);

  return {
    orderType,
    items: finalItems,
    subtotal: roundMoney_(subtotal),
    discount: roundMoney_(discount),
    tax,
    deliveryFee: roundMoney_(deliveryFee),
    tip,
    total,
    taxRate: Number(config.taxRate || 0),
    couponResult,
    deliveryFeeMode: 'fixed'
  };
}

function createOrder_(payload) {
  const config = getRestaurantConfig_();
  const payments = getPaymentsConfig_();

  const customerName = clean_(payload.customerName);
  const customerPhone = clean_(payload.customerPhone);
  const customerEmail = clean_(payload.customerEmail);
  const orderType = clean_(payload.orderType || 'pickup').toLowerCase();
  const deliveryAddress = orderType === 'delivery' ? clean_(payload.deliveryAddress) : '';
  const customerNotes = clean_(payload.customerNotes);
  const coupon = clean_(payload.coupon).toUpperCase();
  const agreementAccepted = payload.agreementAccepted === true || payload.agreementAccepted === 'true';
  const userAgent = clean_(payload.userAgent);

  if (!customerName) throw new Error('Customer name is required.');
  if (!customerPhone) throw new Error('Customer phone is required.');
  if (!customerEmail) throw new Error('Customer email is required.');
  if (!agreementAccepted) throw new Error('Order agreement must be accepted.');
  if (orderType !== 'pickup' && orderType !== 'delivery') throw new Error('Invalid order type.');
  if (orderType === 'delivery' && (!isYes_(config.deliveryEnabled) || !deliveryAddress)) throw new Error('Delivery address is required or delivery is disabled.');
  if (orderType === 'pickup' && !isYes_(config.pickupEnabled)) throw new Error('Pickup is disabled.');

  const requestedItems = Array.isArray(payload.items) ? payload.items : [];
  if (!requestedItems.length) throw new Error('Cart is empty.');

  const menuItems = getMenu_().items;
  const finalItems = [];
  let subtotal = 0;

  requestedItems.forEach(req => {
    const id = String(req.id || '').trim();
    const qty = Number(req.qty || req.quantity || 1);
    if (!id || qty < 1) throw new Error('Invalid cart item.');
    const item = menuItems.find(i => String(i.id) === id);
    if (!item) throw new Error('Menu item not found or unavailable: ' + id);
    const lineTotal = roundMoney_(Number(item.price) * qty);
    subtotal += lineTotal;
    finalItems.push({ id: item.id, category: item.category, name: item.name, quantity: qty, price: Number(item.price), lineTotal, notes: clean_(req.notes) });
  });

  let discount = 0;
  let couponResult = null;
  if (coupon) {
    couponResult = validateCoupon_({ code: coupon, subtotal });
    if (couponResult.valid) discount = Number(couponResult.discount || 0);
  }

  const taxableSubtotal = Math.max(0, subtotal - discount);
  const tax = roundMoney_(taxableSubtotal * Number(config.taxRate || 0));
  const deliveryFee = orderType === 'delivery' ? getFixedDeliveryFee_(config) : 0;
  const tip = Number(payload.tip || 0);
  const total = roundMoney_(taxableSubtotal + tax + deliveryFee + tip);

  const orderId = createOrderId_();
  const pickupToken = orderType === 'pickup' ? createToken_('PU') : '';
  const trackingToken = orderType === 'delivery' ? createToken_('TRK') : '';
  const publicTrackingToken = orderType === 'delivery' ? trackingToken : pickupToken;
  const trackingURL = publicTrackingToken ? publicUrl_(config, config.trackingPage || 'tracking.html') + '?token=' + encodeURIComponent(publicTrackingToken) : '';
  const actionToken = pickupToken || trackingToken;
  const qrActive = isYes_(config.qrEnabled || 'Yes') && actionToken;
  const qrContent = qrActive ? qrContent_(orderId, actionToken) : '';
  const qrExpiresAt = '';
  const pickupQRUrl = pickupToken && qrActive ? qrUrl_(qrContent) : '';
  const deliveryQRUrl = trackingToken && qrActive ? qrUrl_(qrContent) : '';
  const paymentMethod = clean_(payload.paymentMethod || (isYes_(payments.enabled) ? payments.provider : 'Pay at pickup/delivery'));
  const isCashPayment = String(paymentMethod || '').toLowerCase().indexOf('cash') !== -1;
  const paymentStatus = isCashPayment ? 'Cash due in person' : (isYes_(payments.enabled) && clean_(payload.paymentStatus) === 'Paid' ? 'Paid' : 'Payment pending');

  const order = {
    orderId, timestamp: new Date(), customerName, customerPhone, customerEmail,
    orderType, deliveryAddress, deliveryInstructions: clean_(payload.deliveryInstructions),
    items: finalItems, subtotal: roundMoney_(subtotal), discount: roundMoney_(discount), tax,
    deliveryFee: roundMoney_(deliveryFee), tip: roundMoney_(tip), total,
    paymentMethod, paymentStatus, status: clean_(config.defaultOrderStatus || 'Pending'),
    pickupToken, trackingToken, pickupQRUrl, deliveryQRUrl, trackingURL, customerNotes, coupon, couponResult,
    qrContent, qrStatus: qrActive ? 'Active' : 'Disabled', qrExpiresAt, qrUsedAt: ''
  };

  ensureSheet_(SHEETS.ORDERS, ORDER_HEADERS).appendRow([
    orderId, order.timestamp, customerName, customerPhone, customerEmail, orderType, deliveryAddress, order.deliveryInstructions,
    JSON.stringify(finalItems), order.subtotal, order.discount, order.tax, order.deliveryFee, order.tip, order.total,
    paymentMethod, paymentStatus, order.status, '', '', 'customer', order.timestamp, pickupToken, trackingToken, pickupQRUrl,
    trackingURL, '', customerNotes, '', '', order.qrContent, order.qrStatus, order.qrExpiresAt, order.qrUsedAt
  ]);

  let customerEmailSent = 'No', adminEmailSent = 'No';
  try { sendCustomerOrderEmail_(order, config, payments); customerEmailSent = 'Yes'; } catch (err) { logAction_({ userEmail: customerEmail, userRole: 'customer', action: 'CUSTOMER_EMAIL_FAILED', orderId, details: String(err), result: 'error', userAgent }); }
  try { sendAdminOrderEmail_(order, config); adminEmailSent = 'Yes'; } catch (err) { logAction_({ userEmail: ADMIN_EMAIL, userRole: 'admin', action: 'ADMIN_EMAIL_FAILED', orderId, details: String(err), result: 'error', userAgent }); }

  updateEmailFlags_(orderId, customerEmailSent, adminEmailSent);
  logAction_({ userEmail: customerEmail, userRole: 'customer', action: 'CREATE_ORDER', orderId, details: JSON.stringify({ orderType, total, status: order.status }), result: 'success', userAgent });
  return { order, payments };
}

function sendCustomerOrderEmail_(order, config, payments) {
  MailApp.sendEmail({ to: order.customerEmail, subject: config.name + ' — Order received ' + order.orderId, htmlBody: receiptHtml_(order, config, payments, false), name: config.name });
}
function sendAdminOrderEmail_(order, config) {
  MailApp.sendEmail({ to: config.adminEmail || config.email || ADMIN_EMAIL, subject: 'New order — ' + order.orderId, htmlBody: receiptHtml_(order, config, {}, true), name: config.name });
}
function receiptHtml_(order, config, payments, isAdmin) {
  const itemsHtml = order.items.map(item => '<tr><td style="padding:10px 0;border-bottom:1px solid #eadfce;"><strong>' + html_(item.quantity) + 'x ' + html_(item.name) + '</strong><br><span style="color:#766657;">' + html_(item.category || '') + '</span></td><td style="padding:10px 0;border-bottom:1px solid #eadfce;text-align:right;">$' + money_(item.lineTotal) + '</td></tr>').join('');
  const payLink = payments && isYes_(payments.enabled) && payments.link ? '<p><a href="' + html_(payments.link) + '" style="display:inline-block;background:#b54718;color:white;text-decoration:none;padding:12px 18px;border-radius:999px;font-weight:800;">Pay online</a></p>' : '';
  const pickupBlock = !isAdmin && order.pickupQRUrl ? '<div style="margin-top:18px;padding:16px;border:1px dashed #b54718;border-radius:18px;background:#fff8ef;"><h3>Pickup QR</h3><p>Show this QR/token when picking up your order. The restaurant can scan it to complete pickup.</p><img src="' + html_(order.pickupQRUrl) + '" style="width:180px;height:180px;border-radius:16px;background:white;padding:10px;border:1px solid #eadfce;"><p style="font-size:12px;color:#766657;">Token: ' + html_(order.pickupToken) + '</p></div>' : '';
  const deliveryQRBlock = !isAdmin && order.deliveryQRUrl ? '<div style="margin-top:18px;padding:16px;border:1px dashed #b54718;border-radius:18px;background:#fff8ef;"><h3>Delivery confirmation QR</h3><p>If you meet the driver outside, they can scan this QR to confirm delivery.</p><img src="' + html_(order.deliveryQRUrl) + '" style="width:180px;height:180px;border-radius:16px;background:white;padding:10px;border:1px solid #eadfce;"></div>' : '';
  const trackingBlock = !isAdmin && order.trackingURL ? '<div style="margin-top:18px;padding:16px;border:1px solid #eadfce;border-radius:18px;background:#fff8ef;"><h3>Order tracking</h3><p>Use this link to reopen your order status anytime.</p><a href="' + html_(order.trackingURL) + '" style="display:inline-block;background:#21120b;color:white;text-decoration:none;padding:12px 18px;border-radius:999px;font-weight:800;">Track order</a></div>' : '';
  const adminDeliveryUrl = publicUrl_(config, config.deliveryPage || config.adminPage || 'admin.html') + '?panel=delivery&order=' + encodeURIComponent(order.orderId || '');
  const adminActionBlock = isAdmin ? '<div style="margin-top:18px;padding:16px;border:1px solid #eadfce;border-radius:18px;background:#fff8ef;"><h3>Team action</h3><p>Open the delivery panel to manage this order, update status, start delivery, or confirm completion.</p><a href="' + html_(adminDeliveryUrl) + '" style="display:inline-block;background:#21120b;color:white;text-decoration:none;padding:12px 18px;border-radius:999px;font-weight:800;">Open delivery panel</a></div>' : '';
  const adminBlock = isAdmin ? '<div style="margin-top:18px;padding:16px;border-radius:18px;background:#f7ecde;"><h3>Team order details</h3><p><b>Customer:</b> ' + html_(order.customerName) + '</p><p><b>Phone:</b> ' + html_(order.customerPhone) + '</p><p><b>Email:</b> ' + html_(order.customerEmail) + '</p><p><b>Address:</b> ' + html_(order.deliveryAddress || 'N/A') + '</p><p><b>Notes:</b> ' + html_(order.customerNotes || 'N/A') + '</p></div>' : '';
  return '<div style="background:#fff8ef;font-family:Arial,sans-serif;color:#211812;padding:24px;"><div style="max-width:720px;margin:0 auto;"><div style="background:#21120b;color:white;border-radius:28px;padding:26px;"><p style="margin:0;color:#f0a642;font-weight:800;text-transform:uppercase;">' + html_(config.name) + '</p><h1 style="font-family:Georgia,serif;">Order received</h1><p>' + html_(order.orderId) + ' - ' + html_(order.status) + '</p></div><div style="background:white;border:1px solid #eadfce;border-radius:28px;padding:22px;margin-top:18px;"><p><b>Type:</b> ' + html_(order.orderType) + '</p><p><b>Payment:</b> ' + html_(order.paymentStatus) + '</p><table style="width:100%;border-collapse:collapse;">' + itemsHtml + '</table><div style="margin-top:16px;background:#fff8ef;border:1px solid #eadfce;border-radius:18px;padding:14px;"><p>Subtotal: <b>$' + money_(order.subtotal) + '</b></p><p>Discount: <b>-$' + money_(order.discount) + '</b></p><p>Tax: <b>$' + money_(order.tax) + '</b></p><p>Delivery fee: <b>$' + money_(order.deliveryFee) + '</b></p><p style="font-size:22px;"><b>Total: $' + money_(order.total) + '</b></p></div>' + payLink + pickupBlock + deliveryQRBlock + trackingBlock + adminActionBlock + adminBlock + '</div><p style="text-align:center;color:#766657;font-size:12px;">' + html_(config.licenseName || 'Restaurant/Food Truck Example Ordering System') + ' - Powered by ' + html_(config.licenseBy || 'Visual Event Network') + '</p></div></div>';
}

function setupClientSheets_() {
  seedKeyValue_(ensureSheet_(SHEETS.CONFIG, CONFIG_HEADERS), DEFAULT_CONFIG);
  seedKeyValue_(ensureSheet_(SHEETS.PAYMENTS, PAYMENTS_HEADERS), DEFAULT_PAYMENTS);
  ensureSheet_(SHEETS.MENU, MENU_HEADERS); seedMenu_(getSheet_(SHEETS.MENU));
  ensureSheet_(SHEETS.PROMOTIONS, PROMO_HEADERS); seedPromotions_(getSheet_(SHEETS.PROMOTIONS));
  ensureSheet_(SHEETS.TESTIMONIALS, TESTIMONIAL_HEADERS); seedTestimonials_(getSheet_(SHEETS.TESTIMONIALS));
  ensureSheet_(SHEETS.ORDERS, ORDER_HEADERS);
  ensureSheet_(SHEETS.USERS, USER_HEADERS);
  ensureSheet_(SHEETS.SESSIONS, SESSION_HEADERS);
  ensureSheet_(SHEETS.LOGS, LOG_HEADERS);
  ensureSheet_(SHEETS.PICKUP_LOGS, PICKUP_LOG_HEADERS);
  ensureSheet_(SHEETS.TRACKING, TRACKING_HEADERS);
  ensureSheet_(SHEETS.SUMMARY, SUMMARY_HEADERS);
}

function seedMenu_(sheet) {
  if (sheet.getLastRow() > 1) return;
  sheet.getRange(2,1,4,MENU_HEADERS.length).setValues([
    ['M001','Main Dishes','Grilled Chicken Bowl','Rice, salad, grilled chicken and house sauce.',13.99,'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80','Yes',1,'',15,'Yes','No',''],
    ['M002','Main Dishes','Classic Burger','Toasted bun, beef patty, cheese and house fries.',14.99,'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80','Yes',2,'',18,'Yes','No',''],
    ['M003','Drinks','Passion Fruit Juice','Fresh tropical juice served cold.',4.50,'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=1200&q=80','Yes',3,'',3,'Yes','No',''],
    ['M004','Desserts','Chocolate Cake','Rich chocolate cake slice with creamy topping.',6.99,'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80','Yes',4,'',5,'Yes','No','']
  ]);
}
function seedPromotions_(sheet) { if (sheet.getLastRow() > 1) return; sheet.getRange(2,1,2,PROMO_HEADERS.length).setValues([['WELCOME10','Welcome offer','Get 10% off your first order.','percent',10,'Yes','','',0],['PICKUP5','Pickup special','$5 off orders over $30.','fixed',5,'Yes','','',30]]); }
function seedTestimonials_(sheet) { if (sheet.getLastRow() > 1) return; sheet.getRange(2,1,3,TESTIMONIAL_HEADERS.length).setValues([['Guest Review','The ordering page feels clean, fast and professional.',5,'Yes'],['Local Customer','Pickup QR and delivery tracking make the process easy.',5,'Yes'],['Food Lover','The menu photos make it easy to choose what I want.',5,'Yes']]); }

function getSS_(){ if (SPREADSHEET_ID && SPREADSHEET_ID !== 'PASTE_YOUR_SHEET_ID_HERE') return SpreadsheetApp.openById(SPREADSHEET_ID); const ss=SpreadsheetApp.getActiveSpreadsheet(); if(!ss) throw new Error('No spreadsheet found. Add your Sheet ID.'); return ss; }
function getSheet_(name){ const ss=getSS_(); return ss.getSheetByName(name) || ss.insertSheet(name); }
function ensureSheet_(name, headers){ const sh=getSheet_(name); if(sh.getLastRow()===0){ sh.getRange(1,1,1,headers.length).setValues([headers]); sh.setFrozenRows(1); return sh;} const current=sh.getRange(1,1,1,Math.max(headers.length,sh.getLastColumn())).getValues()[0]; let changed=false; headers.forEach((h,i)=>{ if(String(current[i]||'').trim()!==h){ current[i]=h; changed=true; }}); if(changed){ sh.getRange(1,1,1,current.length).setValues([current]); sh.setFrozenRows(1);} return sh; }
function rowsToObjects_(sheet){ const values=sheet.getDataRange().getValues(); if(values.length<2) return []; const headers=values[0].map(h=>String(h||'').trim()); return values.slice(1).filter(r=>r.some(c=>c!==''&&c!==null)).map(r=>{ const o={}; headers.forEach((h,i)=>{ if(h) o[h]=r[i];}); return o;}); }
function readKeyValue_(sheet){ const v=sheet.getDataRange().getValues(); const o={}; for(let i=1;i<v.length;i++){ const k=String(v[i][0]||'').trim(); if(k) o[k]=v[i][1]; } return o; }
function seedKeyValue_(sheet, obj){ if(sheet.getLastRow()>1) return; const rows=Object.keys(obj).map(k=>[k,obj[k]]); if(rows.length) sheet.getRange(2,1,rows.length,2).setValues(rows); }

function updateEmailFlags_(orderId, customerFlag, adminFlag){ const sh=ensureSheet_(SHEETS.ORDERS, ORDER_HEADERS); const info=findRowByValue_(sh,'OrderID',orderId); if(!info) return; const customerCol=info.headers.indexOf('EmailClienteEnviado')+1; const adminCol=info.headers.indexOf('EmailAdminEnviado')+1; if(customerCol) sh.getRange(info.row,customerCol).setValue(customerFlag); if(adminCol) sh.getRange(info.row,adminCol).setValue(adminFlag); }
function findRowByValue_(sheet, headerName, value){ const values=sheet.getDataRange().getValues(); if(values.length<2) return null; const headers=values[0].map(h=>String(h||'').trim()); const ci=headers.indexOf(headerName); if(ci<0) return null; const target=String(value||'').trim(); for(let r=1;r<values.length;r++){ if(String(values[r][ci]||'').trim()===target) return {row:r+1,headers,values:values[r]}; } return null; }
function logAction_(entry){ try{ ensureSheet_(SHEETS.LOGS, LOG_HEADERS).appendRow([createToken_('LOG'),new Date(),entry.userEmail||'',entry.userRole||'',entry.action||'',entry.orderId||'',entry.details||'',entry.result||'',entry.userAgent||'']); }catch(e){ console.error(e); } }
function output_(obj, callback){ const json=JSON.stringify(obj); if(callback) return ContentService.createTextOutput(callback+'('+json+');').setMimeType(ContentService.MimeType.JAVASCRIPT); return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON); }
function parsePayload_(txt){ if(!txt) return {}; try{return JSON.parse(txt);}catch(e){throw new Error('Invalid JSON payload.');}}
function clean_(v){return String(v||'').trim();}
function isYes_(v){return ['yes','true','1','active','activo','si','sí','y'].indexOf(String(v||'').trim().toLowerCase())!==-1;}
function inDateRange_(date,startVal,endVal){ const s=parseDate_(startVal), e=parseDate_(endVal); if(s&&date<s) return false; if(e){e.setHours(23,59,59,999); if(date>e) return false;} return true; }
function parseDate_(v){ if(!v) return null; if(Object.prototype.toString.call(v)==='[object Date]'&&!isNaN(v)) return v; const d=new Date(v); return isNaN(d.getTime())?null:d; }
function calculateDiscount_(promo,subtotal){ const type=String(promo.type||'').toLowerCase(); const value=Number(promo.value||0); let d=0; if(type==='percent'||type==='percentage') d=subtotal*(value/100); else if(type==='fixed'||type==='amount') d=value; return roundMoney_(Math.min(d,subtotal)); }
function getFixedDeliveryFee_(config){ return Number(config.fixedDeliveryFee || config.deliveryFee || 0); }
function roundMoney_(v){ return Math.round((Number(v||0)+Number.EPSILON)*100)/100; }
function money_(v){ return Number(v||0).toFixed(2); }
function createOrderId_(){ return 'RT-'+Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd')+'-'+Math.random().toString(36).substring(2,7).toUpperCase(); }
function createToken_(prefix){ return prefix+'-'+Utilities.getUuid().replace(/-/g,'').substring(0,24).toUpperCase(); }
function qrContent_(orderId, token){ return 'ORDER|' + clean_(orderId) + '|' + clean_(token); }
function qrUrl_(text){ return 'https://quickchart.io/qr?size=240&text='+encodeURIComponent(text); }
function publicUrl_(config,page){ return String(config.publicBaseUrl||PUBLIC_BASE_URL||'').replace(/\/+$/,'')+'/'+String(page||'').replace(/^\/+/,''); }
function html_(v){ return String(v||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
