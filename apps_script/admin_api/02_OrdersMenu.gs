function getDashboard_(){
  const orders=getOrders_();
  const totalRevenue=orders.reduce((sum,o)=>sum+Number(o.total||0),0);
  return {totalOrders:orders.length,totalRevenue:roundMoney_(totalRevenue),pickupCount:orders.filter(o=>o.type==='pickup').length,deliveryCount:orders.filter(o=>o.type==='delivery').length,pendingCount:orders.filter(o=>['Pending','Confirmed','Preparing','Ready for pickup','Ready for delivery','On the way'].indexOf(o.status)!==-1).length};
}

function getOrders_(){
  const sheet=ensureSheet_(SHEETS.ORDERS,ORDER_HEADERS);
  return rowsToObjects_(sheet).map(row=>orderObjectFromRow_(row)).reverse();
}

function orderObjectFromRow_(row){
  return {orderId:String(row.OrderID||''),timestamp:row.Timestamp,customerName:String(row.ClienteNombre||''),customerPhone:String(row.ClienteTelefono||''),customerEmail:String(row.ClienteCorreo||''),type:String(row.TipoOrden||''),address:String(row.DireccionEntrega||''),deliveryAddress:String(row.DireccionEntrega||''),deliveryInstructions:String(row.InstruccionesEntrega||''),items:parseItems_(row.ItemsJSON),subtotal:Number(row.Subtotal||0),discount:Number(row.Descuento||0),tax:Number(row.Tax||0),deliveryFee:Number(row.DeliveryFee||0),tip:Number(row.Tip||0),total:Number(row.Total||0),paymentMethod:String(row.MetodoPago||''),paymentStatus:String(row.PaymentStatus||''),status:String(row.Estado||''),assignedDeliveryEmail:String(row.AssignedDeliveryEmail||''),assignedDeliveryName:String(row.AssignedDeliveryName||''),pickupToken:String(row.PickupToken||''),trackingToken:String(row.TrackingToken||''),pickupQRUrl:String(row.PickupQRUrl||''),trackingURL:String(row.TrackingURL||''),adminNotes:String(row.AdminNotes||''),customerNotes:String(row.CustomerNotes||'')};
}

function updateOrderStatus_(payload,session){
  const orderId=clean_(payload.orderId);
  const status=clean_(payload.status);
  if(!orderId) throw new Error('OrderID is required.');
  if(!status) throw new Error('Status is required.');
  const sheet=ensureSheet_(SHEETS.ORDERS,ORDER_HEADERS);
  const rowInfo=findRowByValue_(sheet,'OrderID',orderId);
  if(!rowInfo) throw new Error('Order not found.');
  const oldStatus=getCellByHeader_(sheet,rowInfo,'Estado');
  setCellByHeader_(sheet,rowInfo,'Estado',status);
  setCellByHeader_(sheet,rowInfo,'UpdatedAt',new Date());
  adminLog_(session.email,session.role,'UPDATE_ORDER_STATUS',orderId,oldStatus+' -> '+status,'success',payload.userAgent||'');
  trySendStatusEmail_(rowInfo,status);
  return {orderId:orderId,previousStatus:oldStatus,newStatus:status};
}

function assignDelivery_(payload,session){
  const orderId=clean_(payload.orderId);
  const deliveryEmail=clean_(payload.deliveryEmail).toLowerCase();
  const deliveryName=clean_(payload.deliveryName);
  if(!orderId) throw new Error('OrderID is required.');
  if(!deliveryEmail) throw new Error('Delivery email is required.');
  const sheet=ensureSheet_(SHEETS.ORDERS,ORDER_HEADERS);
  const rowInfo=findRowByValue_(sheet,'OrderID',orderId);
  if(!rowInfo) throw new Error('Order not found.');
  setCellByHeader_(sheet,rowInfo,'AssignedDeliveryEmail',deliveryEmail);
  setCellByHeader_(sheet,rowInfo,'AssignedDeliveryName',deliveryName);
  setCellByHeader_(sheet,rowInfo,'Estado','Ready for delivery');
  setCellByHeader_(sheet,rowInfo,'UpdatedAt',new Date());
  adminLog_(session.email,session.role,'ASSIGN_DELIVERY',orderId,'Assigned to '+deliveryEmail,'success',payload.userAgent||'');
  return {orderId:orderId,deliveryEmail:deliveryEmail,deliveryName:deliveryName};
}

function getMenuAdmin_(){
  const sheet=ensureSheet_(SHEETS.MENU,MENU_HEADERS);
  seedMenuIfEmpty_(sheet);
  return rowsToObjects_(sheet).map(r=>({id:String(r.ID||''),category:String(r.Categoria||''),name:String(r.Nombre||''),description:String(r.Descripcion||''),price:Number(r.Precio||0),image:String(r.Imagen||''),available:String(r.Disponible||'Yes'),order:Number(r.Orden||9999),notes:String(r.Notas||'')}));
}

function saveMenuItem_(payload,session){
  const item=payload.item||payload;
  const id=clean_(item.id||item.ID||createMenuId_());
  const category=clean_(item.category||item.Categoria);
  const name=clean_(item.name||item.Nombre);
  const price=Number(item.price||item.Precio||0);
  if(!category) throw new Error('Category is required.');
  if(!name) throw new Error('Name is required.');
  if(!price) throw new Error('Price is required.');
  const row=[id,category,name,clean_(item.description||item.Descripcion),price,clean_(item.image||item.Imagen),clean_(item.available||item.Disponible||'Yes'),item.order||item.Orden||9999,item.notes||'',item.preparationMinutes||'',item.taxable||'Yes',item.hasOptions||'No',item.options||''];
  const sheet=ensureSheet_(SHEETS.MENU,MENU_HEADERS);
  const rowInfo=findRowByValue_(sheet,'ID',id);
  if(rowInfo) sheet.getRange(rowInfo.row,1,1,MENU_HEADERS.length).setValues([row]);
  else sheet.appendRow(row);
  adminLog_(session.email,session.role,'SAVE_MENU_ITEM','',id+' - '+name,'success',payload.userAgent||'');
  return {item:{id:id,category:category,name:name,price:price,image:row[5],available:row[6]}};
}

function toggleMenuItem_(payload,session){
  const id=clean_(payload.id);
  if(!id) throw new Error('Item ID is required.');
  const sheet=ensureSheet_(SHEETS.MENU,MENU_HEADERS);
  const rowInfo=findRowByValue_(sheet,'ID',id);
  if(!rowInfo) throw new Error('Menu item not found.');
  const current=getCellByHeader_(sheet,rowInfo,'Disponible');
  const next=isYes_(current)?'No':'Yes';
  setCellByHeader_(sheet,rowInfo,'Disponible',next);
  adminLog_(session.email,session.role,'TOGGLE_MENU_ITEM','',id+' -> '+next,'success',payload.userAgent||'');
  return {id:id,available:next};
}
