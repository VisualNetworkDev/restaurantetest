/****************************************************
 * RESTAURANT TEST — CLIENT API
 * For index.html
 ****************************************************/

const SPREADSHEET_ID = 'PASTE_YOUR_SHEET_ID_HERE';
const PUBLIC_BASE_URL = 'https://visualnetworkdev.github.io/restaurantetest';
const ADMIN_EMAIL = '2808joel@gmail.com';

const SHEETS = {
  CONFIG: 'Config',
  MENU: 'Menu',
  PROMOTIONS: 'Promotions',
  TESTIMONIALS: 'Testimonials',
  ORDERS: 'Orders',
  LOGS: 'Logs'
};

const CONFIG_HEADERS = ['Key','Value'];
const MENU_HEADERS = ['ID','Categoria','Nombre','Descripcion','Precio','Imagen','Disponible','Orden','Notas','TiempoPreparacionMin','Taxable','TieneOpciones','Opciones'];
const PROMO_HEADERS = ['Code','Title','Description','Type','Value','Active','StartDate','EndDate','MinSubtotal'];
const TESTIMONIAL_HEADERS = ['Name','Text','Rating','Visible'];
const ORDER_HEADERS = ['OrderID','Timestamp','ClienteNombre','ClienteTelefono','ClienteCorreo','TipoOrden','DireccionEntrega','InstruccionesEntrega','ItemsJSON','Subtotal','Descuento','Tax','DeliveryFee','Tip','Total','MetodoPago','PaymentStatus','Estado','AssignedDeliveryEmail','AssignedDeliveryName','CreatedBy','UpdatedAt','PickupToken','TrackingToken','PickupQRUrl','TrackingURL','AdminNotes','CustomerNotes','EmailClienteEnviado','EmailAdminEnviado'];
const LOG_HEADERS = ['LogID','Timestamp','UserEmail','UserRole','Action','OrderID','Details','Result','UserAgent'];

const DEFAULT_CONFIG = {
  name: 'Restaurant Test',
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
  deliveryEnabled: 'Yes',
  pickupEnabled: 'Yes',
  defaultOrderStatus: 'Pending',
  currency: 'USD',
  licenseName: 'Restaurant Test Ordering System',
  licenseBy: 'Visual Event Network',
  publicBaseUrl: PUBLIC_BASE_URL,
  trackingPage: 'tracking.html',
  agreementText: 'Please confirm that your order details are correct before placing the order.'
};

function doGet(e){
  const p=e&&e.parameter?e.parameter:{};
  const action=p.action||'';
  const callback=p.callback||'';
  try{
    setupSheets_();
    const payload=parsePayload_(p.payload);
    let data;
    switch(action){
      case 'health': data={ok:true,api:'client',timestamp:new Date()}; break;
      case 'getRestaurantConfig': data=getRestaurantConfig_(); break;
      case 'getMenu': data=getMenu_(); break;
      case 'getPromotions': data=getPromotions_(); break;
      case 'getTestimonials': data=getTestimonials_(); break;
      case 'validateCoupon': data=validateCoupon_(payload); break;
      case 'createOrder': data=createOrder_(payload); break;
      default: throw new Error('Unknown client action: '+action);
    }
    return out_({success:true,data:data,message:'OK'},callback);
  }catch(err){
    log_('public','customer','CLIENT_API_ERROR','',err.stack||String(err),'error',p.userAgent||'');
    return out_({success:false,data:null,message:err.message||String(err)},callback);
  }
}
function doPost(e){return doGet(e)}

function getRestaurantConfig_(){
  const sh=ensureSheet_(SHEETS.CONFIG,CONFIG_HEADERS); seedConfig_(sh);
  const rows=sh.getDataRange().getValues();
  const cfg=Object.assign({},DEFAULT_CONFIG);
  rows.slice(1).forEach(r=>{const k=String(r[0]||'').trim(); if(k) cfg[k]=r[1];});
  cfg.taxRate=Number(cfg.taxRate||0); cfg.deliveryFee=Number(cfg.deliveryFee||0);
  cfg.publicBaseUrl=cfg.publicBaseUrl||PUBLIC_BASE_URL; cfg.trackingPage=cfg.trackingPage||'tracking.html';
  return cfg;
}
function getMenu_(){
  const sh=ensureSheet_(SHEETS.MENU,MENU_HEADERS); seedMenu_(sh);
  const rows=objects_(sh);
  const items=rows.filter(r=>yes_(r.Disponible)).sort((a,b)=>Number(a.Orden||9999)-Number(b.Orden||9999)).map(r=>({
    id:String(r.ID||'').trim(), category:String(r.Categoria||'Menu').trim(), name:String(r.Nombre||'').trim(), description:String(r.Descripcion||'').trim(), price:Number(r.Precio||0), image:String(r.Imagen||'').trim(), available:String(r.Disponible||'Yes'), order:Number(r.Orden||9999), notes:String(r.Notas||''), preparationMinutes:Number(r.TiempoPreparacionMin||0), taxable:yes_(r.Taxable), hasOptions:yes_(r.TieneOpciones), options:String(r.Opciones||'')
  })).filter(i=>i.id&&i.name);
  return {categories:[...new Set(items.map(i=>i.category).filter(Boolean))],items};
}
function getPromotions_(){
  const sh=ensureSheet_(SHEETS.PROMOTIONS,PROMO_HEADERS); seedPromos_(sh);
  const today=new Date();
  return objects_(sh).filter(r=>yes_(r.Active)).filter(r=>dateOk_(today,r.StartDate,r.EndDate)).map(r=>({code:String(r.Code||'').trim(),title:String(r.Title||'').trim(),description:String(r.Description||'').trim(),type:String(r.Type||'').trim(),value:Number(r.Value||0),minSubtotal:Number(r.MinSubtotal||0)})).filter(p=>p.code);
}
function getTestimonials_(){
  const sh=ensureSheet_(SHEETS.TESTIMONIALS,TESTIMONIAL_HEADERS); seedTestimonials_(sh);
  return objects_(sh).filter(r=>yes_(r.Visible)).map(r=>({name:String(r.Name||'').trim(),text:String(r.Text||'').trim(),rating:Number(r.Rating||5)})).filter(t=>t.name&&t.text);
}
function validateCoupon_(payload){
  const code=String(payload.code||payload.coupon||'').trim().toUpperCase();
  const subtotal=Number(payload.subtotal||0);
  if(!code) return {valid:false,discount:0,message:'No coupon code provided.'};
  const promo=getPromotions_().find(p=>String(p.code).toUpperCase()===code);
  if(!promo) return {valid:false,discount:0,message:'Invalid or inactive coupon.'};
  if(subtotal<Number(promo.minSubtotal||0)) return {valid:false,discount:0,message:'Minimum subtotal not reached.'};
  const discount=discount_(promo,subtotal);
  return {valid:true,code:promo.code,type:promo.type,value:promo.value,discount:discount,message:'Coupon applied.'};
}
function createOrder_(payload){
  const cfg=getRestaurantConfig_();
  const customerName=clean_(payload.customerName), customerPhone=clean_(payload.customerPhone), customerEmail=clean_(payload.customerEmail);
  const orderType=clean_(payload.orderType||'pickup').toLowerCase();
  const deliveryAddress=clean_(payload.deliveryAddress), customerNotes=clean_(payload.customerNotes), coupon=clean_(payload.coupon).toUpperCase();
  const agreementAccepted=payload.agreementAccepted===true||payload.agreementAccepted==='true';
  if(!customerName) throw new Error('Customer name is required.');
  if(!customerPhone) throw new Error('Customer phone is required.');
  if(!customerEmail) throw new Error('Customer email is required.');
  if(!agreementAccepted) throw new Error('Order agreement must be accepted.');
  if(orderType!=='pickup'&&orderType!=='delivery') throw new Error('Invalid order type.');
  if(orderType==='delivery'&&!yes_(cfg.deliveryEnabled)) throw new Error('Delivery is currently disabled.');
  if(orderType==='delivery'&&!deliveryAddress) throw new Error('Delivery address is required.');
  if(orderType==='pickup'&&!yes_(cfg.pickupEnabled)) throw new Error('Pickup is currently disabled.');
  const requested=Array.isArray(payload.items)?payload.items:[]; if(!requested.length) throw new Error('Cart is empty.');
  const menu=getMenu_().items; const finalItems=[]; let subtotal=0;
  requested.forEach(req=>{const id=String(req.id||'').trim(); const qty=Number(req.qty||req.quantity||1); const item=menu.find(i=>String(i.id)===id); if(!item) throw new Error('Menu item not found: '+id); if(!qty||qty<1) throw new Error('Invalid quantity.'); const line=round_(Number(item.price)*qty); subtotal+=line; finalItems.push({id:item.id,category:item.category,name:item.name,quantity:qty,price:Number(item.price),lineTotal:line,notes:clean_(req.notes)});});
  let discount=0,couponResult=null; if(coupon){couponResult=validateCoupon_({code:coupon,subtotal}); if(couponResult.valid) discount=Number(couponResult.discount||0);}
  const taxable=Math.max(0,subtotal-discount); const tax=round_(taxable*Number(cfg.taxRate||0)); const deliveryFee=orderType==='delivery'?Number(cfg.deliveryFee||0):0; const tip=Number(payload.tip||0); const total=round_(taxable+tax+deliveryFee+tip);
  const orderId=orderId_(); const pickupToken=orderType==='pickup'?token_('PU'):''; const trackingToken=orderType==='delivery'?token_('TRK'):'';
  const trackingURL=trackingToken?publicUrl_(cfg,cfg.trackingPage||'tracking.html')+'?token='+encodeURIComponent(trackingToken):''; const pickupQRUrl=pickupToken?qr_(pickupToken):'';
  const now=new Date(), status=clean_(cfg.defaultOrderStatus||'Pending'), paymentStatus='Payment pending', paymentMethod=clean_(payload.paymentMethod||'Not selected');
  const order={orderId,timestamp:now,customerName,customerPhone,customerEmail,orderType,deliveryAddress,deliveryInstructions:clean_(payload.deliveryInstructions),items:finalItems,subtotal:round_(subtotal),discount:round_(discount),tax,deliveryFee:round_(deliveryFee),tip:round_(tip),total,paymentMethod,paymentStatus,status,pickupToken,trackingToken,pickupQRUrl,trackingURL,customerNotes,coupon,couponResult};
  ensureSheet_(SHEETS.ORDERS,ORDER_HEADERS).appendRow([orderId,now,customerName,customerPhone,customerEmail,orderType,deliveryAddress,order.deliveryInstructions,JSON.stringify(finalItems),order.subtotal,order.discount,order.tax,order.deliveryFee,order.tip,order.total,paymentMethod,paymentStatus,status,'','','customer',now,pickupToken,trackingToken,pickupQRUrl,trackingURL,'',customerNotes,'','']);
  let ce='No',ae='No'; try{sendCustomerEmail_(order,cfg); ce='Yes';}catch(e){log_(customerEmail,'customer','CUSTOMER_EMAIL_FAILED',orderId,String(e),'error',payload.userAgent||'');}
  try{sendAdminEmail_(order,cfg); ae='Yes';}catch(e){log_(ADMIN_EMAIL,'admin','ADMIN_EMAIL_FAILED',orderId,String(e),'error',payload.userAgent||'');}
  updateEmailFlags_(orderId,ce,ae);
  log_(customerEmail,'customer','CREATE_ORDER',orderId,JSON.stringify({orderType,total,status}),'success',payload.userAgent||'');
  return {order};
}
function sendCustomerEmail_(order,cfg){MailApp.sendEmail({to:order.customerEmail,subject:cfg.name+' — Order received '+order.orderId,htmlBody:receipt_(order,cfg,false),name:cfg.name});}
function sendAdminEmail_(order,cfg){MailApp.sendEmail({to:cfg.adminEmail||cfg.email||ADMIN_EMAIL,subject:'New order — '+order.orderId,htmlBody:receipt_(order,cfg,true),name:cfg.name});}
function receipt_(o,cfg,admin){const items=o.items.map(i=>'<tr><td style="padding:10px 0;border-bottom:1px solid #eadfce"><b>'+html_(i.quantity)+'x '+html_(i.name)+'</b><br><span style="color:#766657">'+html_(i.category||'')+'</span></td><td style="padding:10px 0;border-bottom:1px solid #eadfce;text-align:right">$'+money_(i.lineTotal)+'</td></tr>').join(''); const pickup=o.pickupQRUrl?'<div style="margin-top:18px;padding:16px;border:1px dashed #b54718;border-radius:18px;background:#fff8ef"><h3>Pickup QR</h3><img src="'+html_(o.pickupQRUrl)+'" style="width:180px;height:180px;border-radius:16px;background:white;padding:10px;border:1px solid #eadfce"><p>Token: '+html_(o.pickupToken)+'</p></div>':''; const tracking=o.trackingURL?'<div style="margin-top:18px;padding:16px;border:1px solid #eadfce;border-radius:18px;background:#fff8ef"><h3>Delivery tracking</h3><a href="'+html_(o.trackingURL)+'" style="display:inline-block;background:#21120b;color:white;text-decoration:none;padding:12px 18px;border-radius:999px;font-weight:800">Track order</a></div>':''; const adm=admin?'<div style="margin-top:18px;padding:16px;border-radius:18px;background:#f7ecde"><h3>Admin details</h3><p><b>Customer:</b> '+html_(o.customerName)+'</p><p><b>Phone:</b> '+html_(o.customerPhone)+'</p><p><b>Email:</b> '+html_(o.customerEmail)+'</p><p><b>Address:</b> '+html_(o.deliveryAddress||'N/A')+'</p><p><b>Notes:</b> '+html_(o.customerNotes||'N/A')+'</p></div>':''; return '<div style="margin:0;padding:0;background:#fff8ef;font-family:Arial,sans-serif;color:#211812"><div style="max-width:720px;margin:0 auto;padding:24px"><div style="background:#21120b;color:white;border-radius:28px;padding:26px"><p style="margin:0;color:#f0a642;font-weight:800">'+html_(cfg.name)+'</p><h1 style="margin:8px 0 4px;font-family:Georgia,serif">Order received</h1><p>'+html_(o.orderId)+' · '+html_(o.status)+'</p></div><div style="background:white;border:1px solid #eadfce;border-radius:28px;padding:22px;margin-top:18px"><p><b>Type:</b> '+html_(o.orderType)+'</p><p><b>Payment:</b> '+html_(o.paymentStatus)+'</p><table style="width:100%;border-collapse:collapse">'+items+'</table><div style="margin-top:16px;background:#fff8ef;border:1px solid #eadfce;border-radius:18px;padding:14px"><p>Subtotal: <b>$'+money_(o.subtotal)+'</b></p><p>Discount: <b>-$'+money_(o.discount)+'</b></p><p>Tax: <b>$'+money_(o.tax)+'</b></p><p>Delivery fee: <b>$'+money_(o.deliveryFee)+'</b></p><h2>Total: $'+money_(o.total)+'</h2></div>'+pickup+tracking+adm+'</div><p style="text-align:center;color:#766657;font-size:12px">'+html_(cfg.licenseName||'Restaurant Test Ordering System')+' · Powered by '+html_(cfg.licenseBy||'Visual Event Network')+'</p></div></div>';}
function setupSheets_(){const c=ensureSheet_(SHEETS.CONFIG,CONFIG_HEADERS); ensureSheet_(SHEETS.MENU,MENU_HEADERS); ensureSheet_(SHEETS.PROMOTIONS,PROMO_HEADERS); ensureSheet_(SHEETS.TESTIMONIALS,TESTIMONIAL_HEADERS); ensureSheet_(SHEETS.ORDERS,ORDER_HEADERS); ensureSheet_(SHEETS.LOGS,LOG_HEADERS); seedConfig_(c);}
function ss_(){if(SPREADSHEET_ID&&SPREADSHEET_ID!=='PASTE_YOUR_SHEET_ID_HERE') return SpreadsheetApp.openById(SPREADSHEET_ID); const ss=SpreadsheetApp.getActiveSpreadsheet(); if(!ss) throw new Error('No spreadsheet found. Add your Sheet ID.'); return ss;}
function sheet_(n){const ss=ss_(); let sh=ss.getSheetByName(n); if(!sh) sh=ss.insertSheet(n); return sh;}
function ensureSheet_(n,h){const sh=sheet_(n); if(sh.getLastRow()===0){sh.getRange(1,1,1,h.length).setValues([h]); sh.setFrozenRows(1); return sh;} const cur=sh.getRange(1,1,1,Math.max(h.length,sh.getLastColumn())).getValues()[0]; let ch=false; h.forEach((x,i)=>{if(String(cur[i]||'').trim()!==x){cur[i]=x;ch=true;}}); if(ch) sh.getRange(1,1,1,cur.length).setValues([cur]); return sh;}
function objects_(sh){const v=sh.getDataRange().getValues(); if(v.length<2)return[]; const h=v[0].map(x=>String(x||'').trim()); return v.slice(1).filter(r=>r.some(c=>c!==''&&c!==null)).map(r=>{const o={}; h.forEach((x,i)=>{if(x)o[x]=r[i];}); return o;});}
function seedConfig_(sh){if(sh.getLastRow()>1)return; sh.getRange(2,1,Object.keys(DEFAULT_CONFIG).length,2).setValues(Object.keys(DEFAULT_CONFIG).map(k=>[k,DEFAULT_CONFIG[k]]));}
function seedMenu_(sh){if(sh.getLastRow()>1)return; sh.getRange(2,1,4,MENU_HEADERS.length).setValues([['M001','Main Dishes','Grilled Chicken Bowl','Rice, salad, grilled chicken and house sauce.',13.99,'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80','Yes',1,'',15,'Yes','No',''],['M002','Main Dishes','Classic Burger','Toasted bun, beef patty, cheese and house fries.',14.99,'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80','Yes',2,'',18,'Yes','No',''],['M003','Drinks','Passion Fruit Juice','Fresh tropical juice served cold.',4.50,'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=1200&q=80','Yes',3,'',3,'Yes','No',''],['M004','Desserts','Chocolate Cake','Rich chocolate cake slice.',6.99,'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80','Yes',4,'',5,'Yes','No','']]);}
function seedPromos_(sh){if(sh.getLastRow()>1)return; sh.getRange(2,1,2,PROMO_HEADERS.length).setValues([['WELCOME10','Welcome offer','Get 10% off your first order.','percent',10,'Yes','','',0],['PICKUP5','Pickup special','$5 off orders over $30.','fixed',5,'Yes','','',30]]);}
function seedTestimonials_(sh){if(sh.getLastRow()>1)return; sh.getRange(2,1,3,TESTIMONIAL_HEADERS.length).setValues([['Guest Review','The ordering page feels clean, fast and professional.',5,'Yes'],['Local Customer','Pickup QR and delivery tracking make the process easy.',5,'Yes'],['Food Lover','The menu photos make it easy to choose what I want.',5,'Yes']]);}
function updateEmailFlags_(id,c,a){const sh=ensureSheet_(SHEETS.ORDERS,ORDER_HEADERS), v=sh.getDataRange().getValues(), h=v[0]; const idc=h.indexOf('OrderID')+1, cc=h.indexOf('EmailClienteEnviado')+1, ac=h.indexOf('EmailAdminEnviado')+1; for(let r=2;r<=v.length;r++){if(String(sh.getRange(r,idc).getValue()||'')===id){sh.getRange(r,cc).setValue(c); sh.getRange(r,ac).setValue(a); return;}}}
function log_(u,role,act,oid,det,res,ua){try{ensureSheet_(SHEETS.LOGS,LOG_HEADERS).appendRow([token_('LOG'),new Date(),u||'',role||'',act||'',oid||'',det||'',res||'',ua||'']);}catch(e){}}
function out_(o,cb){const j=JSON.stringify(o); return ContentService.createTextOutput(cb?cb+'('+j+');':j).setMimeType(cb?ContentService.MimeType.JAVASCRIPT:ContentService.MimeType.JSON);}
function parsePayload_(t){if(!t)return{}; try{return JSON.parse(t);}catch(e){throw new Error('Invalid JSON payload.');}}
function clean_(v){return String(v||'').trim();}
function yes_(v){return ['yes','true','1','active','activo','si','sí','y'].indexOf(String(v||'').trim().toLowerCase())!==-1;}
function dateOk_(d,s,e){const sd=parseDate_(s),ed=parseDate_(e); if(sd&&d<sd)return false; if(ed){ed.setHours(23,59,59,999); if(d>ed)return false;} return true;}
function parseDate_(v){if(!v)return null; if(Object.prototype.toString.call(v)==='[object Date]'&&!isNaN(v))return v; const d=new Date(v); return isNaN(d.getTime())?null:d;}
function discount_(p,sub){const t=String(p.type||'').toLowerCase(), val=Number(p.value||0); let d=0; if(t==='percent'||t==='percentage')d=sub*(val/100); else if(t==='fixed'||t==='amount')d=val; return round_(Math.min(d,sub));}
function round_(v){return Math.round((Number(v||0)+Number.EPSILON)*100)/100;}
function money_(v){return Number(v||0).toFixed(2);}
function orderId_(){return 'RT-'+Utilities.formatDate(new Date(),Session.getScriptTimeZone(),'yyyyMMdd')+'-'+Math.random().toString(36).substring(2,7).toUpperCase();}
function token_(p){return p+'-'+Utilities.getUuid().replace(/-/g,'').substring(0,24).toUpperCase();}
function qr_(t){return 'https://quickchart.io/qr?size=240&text='+encodeURIComponent(t);}
function publicUrl_(cfg,page){return String(cfg.publicBaseUrl||PUBLIC_BASE_URL).replace(/\/+$/,'')+'/'+String(page||'').replace(/^\/+/,'');}
function html_(v){return String(v||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}
