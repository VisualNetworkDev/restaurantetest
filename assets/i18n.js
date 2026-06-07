(function () {
  const STORAGE_KEY = 'rt_lang';
  const supported = ['en', 'es'];

  const es = {
    'Restaurant/Food Truck Example - Management': 'Restaurant/Food Truck Example - Administracion',
    'Track Order - Restaurant/Food Truck Example': 'Rastrear pedido - Restaurant/Food Truck Example',
    'Delivery - Restaurant/Food Truck Example': 'Delivery - Restaurant/Food Truck Example',
    'Offline - Restaurant/Food Truck Example': 'Sin conexion - Restaurant/Food Truck Example',
    'Order - Pickup - Delivery': 'Orden - Recogida - Delivery',
    'Order tracking': 'Rastreo de pedido',
    'Management app': 'App de administracion',
    'Delivery tools': 'Herramientas de delivery',
    'Offline mode': 'Modo sin conexion',
    'Preparing your menu': 'Preparando tu menu',
    'Loading fresh items, offers, reviews, and checkout settings.': 'Cargando productos frescos, ofertas, resenas y ajustes de checkout.',
    'Connecting to the restaurant...': 'Conectando con el restaurante...',
    'Opening management': 'Abriendo administracion',
    'Preparing orders, delivery tools, reviews, permissions, and settings.': 'Preparando ordenes, herramientas de delivery, resenas, permisos y ajustes.',
    'Checking secure session...': 'Verificando sesion segura...',
    'Sign in to manage orders, delivery, menu, and settings.': 'Inicia sesion para gestionar ordenes, delivery, menu y ajustes.',
    'Loading management data...': 'Cargando datos de administracion...',
    'Finding your order': 'Buscando tu pedido',
    'Loading status, receipt details, and pickup or delivery information.': 'Cargando estado, detalles del recibo e informacion de recogida o delivery.',
    'Checking your secure order link...': 'Verificando tu enlace seguro de pedido...',
    'Loading order status...': 'Cargando estado del pedido...',
    'Preparing delivery tools': 'Preparando herramientas de delivery',
    'Opening the route, GPS, and order handoff experience.': 'Abriendo ruta, GPS y experiencia de entrega.',
    'Preparing delivery access...': 'Preparando acceso de delivery...',
    'Checking connection': 'Verificando conexion',
    'Opening saved pages while the live restaurant data reconnects.': 'Abriendo paginas guardadas mientras se reconectan los datos en vivo del restaurante.',
    'Preparing offline access...': 'Preparando acceso sin conexion...',
    'Still connecting. You can continue while the latest data finishes loading.': 'Todavia conectando. Puedes continuar mientras terminan de cargar los datos mas recientes.',
    'Main menu': 'Menu principal',
    'Management menu': 'Menu de administracion',
    'Menu': 'Menu',
    'Offers': 'Ofertas',
    'My order': 'Mi pedido',
    'About': 'Nosotros',
    'Reviews': 'Resenas',
    'Contact': 'Contacto',
    'Install': 'Instalar',
    'Install app': 'Instalar app',
    'Cart': 'Carrito',
    'Fresh food - Mobile menu - Live tracking': 'Comida fresca - Menu movil - Rastreo en vivo',
    'Order fresh. Track fast.': 'Ordena fresco. Rastrea rapido.',
    'Browse the menu, place your order, choose pickup or delivery, and get a professional receipt with pickup QR or delivery tracking.': 'Explora el menu, haz tu pedido, elige recogida o delivery y recibe un recibo profesional con QR de recogida o rastreo de delivery.',
    'Start order': 'Empezar orden',
    'View offers': 'Ver ofertas',
    "Today's order flow": 'Flujo de orden de hoy',
    'Pickup or delivery': 'Recogida o delivery',
    'The customer menu feels like a mobile app. Pickup gets a QR; delivery gets a live tracking link.': 'El menu del cliente se siente como una app movil. La recogida recibe un QR; el delivery recibe un enlace de rastreo en vivo.',
    'Pick items': 'Elegir productos',
    'Checkout': 'Checkout',
    'Track': 'Rastrear',
    'Select a category, add items to the cart, and complete pickup or delivery checkout.': 'Selecciona una categoria, agrega productos al carrito y completa el checkout de recogida o delivery.',
    'Promotions': 'Promociones',
    'Active offers configured from the restaurant admin.': 'Ofertas activas configuradas desde la administracion del restaurante.',
    'Check where your order is': 'Revisa por donde va tu pedido',
    'Check the status without leaving this page. If you are on another device, use the Order ID from the receipt with your phone or email.': 'Consulta el estado sin salir de esta pagina. Si estas en otro dispositivo, usa el Order ID del recibo junto con tu telefono o email.',
    'Last order': 'Ultimo pedido',
    'No recent order is saved on this device.': 'No hay un pedido reciente guardado en este dispositivo.',
    'Search order': 'Buscar pedido',
    'Order ID': 'Order ID',
    'Phone or email': 'Telefono o email',
    'Example: RT-20260607-ABCDE': 'Ejemplo: RT-20260607-ABCDE',
    'Phone or email from receipt': 'Telefono o email del recibo',
    'Check order': 'Buscar pedido',
    'This keeps order details private while still making it easy to reopen your status.': 'Esto mantiene privados los detalles del pedido y facilita volver a abrir su estado.',
    'About us': 'Sobre nosotros',
    'Fresh food, easy pickup, smooth delivery, and a clean ordering experience.': 'Comida fresca, recogida facil, delivery claro y una experiencia de orden moderna.',
    'Recent notes from customers who ordered with us.': 'Comentarios recientes de clientes que ordenaron con nosotros.',
    'Leave a review': 'Deja una resena',
    'Tell us how everything tasted': 'Cuentanos como estuvo todo',
    'Share what you ordered and what other guests should try next.': 'Comparte que ordenaste y que deberian probar otros clientes.',
    'Name': 'Nombre',
    'Rating': 'Calificacion',
    'Review': 'Resena',
    'What did you order? What should others try?': 'Que ordenaste? Que deberian probar otros clientes?',
    'Share review': 'Enviar resena',
    'Restaurant contact': 'Contacto del restaurante',
    'Visit, call, or order ahead': 'Visita, llama u ordena antes',
    'Everything you need is in one place: restaurant address, phone, email, maps, and social link when available.': 'Todo lo que necesitas esta en un solo lugar: direccion del restaurante, telefono, email, mapas y enlace social cuando este disponible.',
    'Phone': 'Telefono',
    'Email': 'Email',
    'Restaurant address': 'Direccion del restaurante',
    'Maps': 'Mapa',
    'Call': 'Llamar',
    'Open': 'Abrir',
    'Follow us': 'Siguenos',
    'Your cart': 'Tu carrito',
    'Review order and checkout': 'Revisa la orden y completa el checkout',
    'Close': 'Cerrar',
    'Order type': 'Tipo de orden',
    'Pickup - Free': 'Recogida - Gratis',
    'Delivery - restaurant fee': 'Delivery - tarifa del restaurante',
    'Tip': 'Propina',
    'Delivery address': 'Direccion de delivery',
    'Street, city, state, ZIP': 'Calle, ciudad, estado, ZIP',
    'Delivery instructions': 'Instrucciones de delivery',
    'Apartment, gate code, notes...': 'Apartamento, codigo de entrada, notas...',
    'Coupon': 'Cupon',
    'Optional': 'Opcional',
    'Payment': 'Pago',
    'Cash - pay in person': 'Efectivo - pagar en persona',
    'Payment link': 'Enlace de pago',
    'Zelle': 'Zelle',
    'Cash App': 'Cash App',
    'Notes': 'Notas',
    'No onions, extra sauce, etc.': 'Sin cebolla, salsa extra, etc.',
    'I confirm my order information is correct.': 'Confirmo que la informacion de mi orden esta correcta.',
    'Place order': 'Hacer pedido',
    'Pay Securely': 'Pagar seguro',
    'Order agreement': 'Confirmacion de orden',
    'Confirm your order': 'Confirma tu orden',
    'Confirm action': 'Confirmar accion',
    'Are you sure?': 'Estas seguro?',
    'This action will update live restaurant data.': 'Esta accion actualizara datos activos del restaurante.',
    'Confirm': 'Confirmar',
    'Cancel': 'Cancelar',
    'Confirm status change': 'Confirmar cambio de estado',
    'Update status': 'Actualizar estado',
    'Confirm payment update': 'Confirmar actualizacion de pago',
    'Update payment': 'Actualizar pago',
    'Save payment settings?': 'Guardar ajustes de pago?',
    'These settings affect checkout and customer payment instructions.': 'Estos ajustes afectan el checkout y las instrucciones de pago del cliente.',
    'Save restaurant settings?': 'Guardar ajustes del restaurante?',
    'These changes can affect the public customer page and delivery fees.': 'Estos cambios pueden afectar la pagina publica del cliente y las tarifas de delivery.',
    'Complete delivery?': 'Completar delivery?',
    'Complete delivery': 'Completar delivery',
    'Complete scanned order?': 'Completar orden escaneada?',
    'This will close the QR and mark the order as completed.': 'Esto cerrara el QR y marcara la orden como completada.',
    'Complete order': 'Completar orden',
    'Please confirm that your order details are correct before placing the order.': 'Confirma que los detalles de tu orden estan correctos antes de enviarla.',
    'Review again': 'Revisar otra vez',
    'I agree and place order': 'Acepto y hago el pedido',
    'Secure payment': 'Pago seguro',
    'Pay securely': 'Pagar seguro',
    'Stay here': 'Quedarse aqui',
    'Continue to payment': 'Continuar al pago',
    'Preparing your order': 'Preparando tu orden',
    'Finalizing your order': 'Finalizando tu orden',
    'Checking menu prices, totals, and restaurant settings.': 'Revisando precios, totales y configuracion del restaurante.',
    'Online ordering, pickup QR, operations tools, and live delivery tracking.': 'Ordenes online, QR de recogida, herramientas operativas y rastreo de delivery en vivo.',
    'Licensed / Powered by': 'Licenciado / Desarrollado por',
    'Order received': 'Orden recibida',
    'Delivery confirmation QR': 'QR de confirmacion de delivery',
    'If you meet the driver outside, they can scan this to confirm delivery.': 'Si te encuentras con el delivery afuera, puede escanear esto para confirmar la entrega.',
    'Pickup QR': 'QR de recogida',
    'Show this QR/token at pickup. Token:': 'Muestra este QR/token al recoger. Token:',
    'Cash payment is due in person.': 'El pago en efectivo se realiza en persona.',
    'You are being redirected to the restaurant secure payment page.': 'Seras redirigido a la pagina segura de pago del restaurante.',
    'Current status:': 'Estado actual:',
    'View order status': 'Ver estado del pedido',
    'Recent order': 'Pedido reciente',
    'Received': 'Recibido',
    'Dashboard': 'Dashboard',
    'Today orders': 'Ordenes de hoy',
    'Today sales': 'Ventas de hoy',
    'Total sales': 'Ventas totales',
    'Average order': 'Promedio por orden',
    'Pending orders': 'Ordenes pendientes',
    'Pending payments': 'Pagos pendientes',
    'Latest order': 'Ultima orden',
    'No orders yet': 'No hay ordenes todavia',
    'Open orders': 'Abrir ordenes',
    'Open delivery': 'Abrir delivery',
    'Top items': 'Productos mas vendidos',
    'Top items appear after orders are placed.': 'Los productos mas vendidos apareceran despues de recibir ordenes.',
    'Attention': 'Atencion',
    'Unpaid orders': 'Ordenes sin pagar',
    'Paid orders': 'Ordenes pagadas',
    'Paid revenue': 'Ingresos pagados',
    'Orders': 'Ordenes',
    'Delivery': 'Delivery',
    'Settings': 'Ajustes',
    'Testimonials': 'Resenas',
    'Reviews': 'Resenas',
    'Scan QR': 'Escanear QR',
    'Payments': 'Pagos',
    'Users': 'Usuarios',
    'Logs': 'Logs',
    'Logout': 'Salir',
    'Login': 'Entrar',
    'User': 'Usuario',
    'Password': 'Contrasena',
    'Enter password': 'Escribe la contrasena',
    'Required for new user; leave blank to keep current': 'Requerida para usuario nuevo; dejar en blanco para mantener la actual',
    'Session active': 'Sesion activa',
    'Choose a section from the admin menu.': 'Elige una seccion del menu de administracion.',
    'Back': 'Atras',
    'Refresh': 'Actualizar',
    'Manage pickup, delivery, totals, and status.': 'Administra recogida, delivery, totales y estados.',
    'Open route, start GPS, update tracking, deliver.': 'Abre ruta, inicia GPS, actualiza rastreo y completa entregas.',
    'Edit dishes, prices, availability, and photos.': 'Edita platos, precios, disponibilidad y fotos.',
    'Create coupons, dates, and active discounts.': 'Crea cupones, fechas y descuentos activos.',
    'Control visible customer reviews and ratings.': 'Controla resenas y calificaciones visibles.',
    'Restaurant information and fixed delivery fee.': 'Informacion del restaurante y tarifa fija de delivery.',
    'Verify pickup/delivery QR and complete orders.': 'Verifica QR de recogida/delivery y completa ordenes.',
    'Configure payment links, cash, and verification notes.': 'Configura enlaces de pago, efectivo y notas de verificacion.',
    'Create staff accounts and roles.': 'Crea cuentas de staff y roles.',
    'Create staff accounts and section permissions.': 'Crea cuentas de staff y permisos por seccion.',
    'Review security, order, payment, and system activity.': 'Revisa seguridad, ordenes, pagos y actividad del sistema.',
    'Review security and system activity.': 'Revisa seguridad y actividad del sistema.',
    'Approve or hide customer reviews from the public page.': 'Aprueba u oculta resenas de clientes en la pagina publica.',
    'Reload orders': 'Recargar ordenes',
    'Open delivery section': 'Abrir seccion de delivery',
    'Order': 'Orden',
    'Customer': 'Cliente',
    'Items': 'Productos',
    'Total': 'Total',
    'Status': 'Estado',
    'Actions': 'Acciones',
    'Delivery inside management': 'Delivery dentro de administracion',
    'Active delivery orders': 'Ordenes activas de delivery',
    'Delivery is handled from this management section. When an order is ready, staff handles route, GPS tracking, maps, customer phone, order items, and delivery completion from here.': 'El delivery se maneja desde esta seccion. Cuando una orden esta lista, el staff maneja ruta, GPS, mapas, telefono del cliente, productos y entrega desde aqui.',
    'Menu item': 'Producto del menu',
    'Category': 'Categoria',
    'Description': 'Descripcion',
    'Price': 'Precio',
    'Available': 'Disponible',
    'No image selected': 'No hay imagen seleccionada',
    'Menu photo': 'Foto del menu',
    'Choose a photo from the computer. The system optimizes it before saving, so the admin does not need to paste image URLs.': 'Elige una foto desde la computadora. El sistema la optimiza antes de guardar, para que no sea necesario pegar URLs de imagen.',
    'Has options/extras': 'Tiene opciones/extras',
    'Sort order': 'Orden',
    'Options/extras structure': 'Estructura de opciones/extras',
    'Example: Extra cheese +1.00, Avocado +2.00': 'Ejemplo: Queso extra +1.00, Aguacate +2.00',
    'Save item': 'Guardar producto',
    'Clear': 'Limpiar',
    'Promotion': 'Promocion',
    'Code': 'Codigo',
    'Title': 'Titulo',
    'Type': 'Tipo',
    'Value': 'Valor',
    'Active': 'Activo',
    'Minimum subtotal': 'Subtotal minimo',
    'Start date': 'Fecha inicial',
    'End date': 'Fecha final',
    'Save promotion': 'Guardar promocion',
    'Customer feedback': 'Comentarios de clientes',
    'Customer reviews': 'Resenas de clientes',
    'Review approval inbox': 'Bandeja de aprobacion de resenas',
    'Reviews submitted from the customer page arrive here. Staff can approve them for the public page, hide them, or keep them pending. The original customer text is not edited here.': 'Las resenas enviadas desde la pagina del cliente llegan aqui. El staff puede aprobarlas para la pagina publica, ocultarlas o dejarlas pendientes. El texto original del cliente no se edita aqui.',
    'All reviews': 'Todas las resenas',
    'Approved': 'Aprobadas',
    'Hidden': 'Ocultas',
    'Updating review status...': 'Actualizando estado de la resena...',
    'Review status updated': 'Estado de resena actualizado',
    'No customer reviews match this filter.': 'No hay resenas que coincidan con este filtro.',
    'Text': 'Texto',
    'Save review': 'Guardar resena',
    'Payment settings': 'Ajustes de pago',
    'Cash is payment in person. Payment links can be displayed to customers, but automatic paid/pending/rejected verification requires a provider webhook or API connection before unpaid online orders can be securely blocked.': 'Efectivo es pago en persona. Los enlaces de pago pueden mostrarse al cliente, pero la verificacion automatica de pagado/pendiente/rechazado requiere un webhook o API del proveedor antes de bloquear ordenes online sin pagar.',
    'Online payment enabled': 'Pago online activo',
    'Provider': 'Proveedor',
    'Square, Clover, Stripe, Cash App, Zelle...': 'Square, Clover, Stripe, Cash App, Zelle...',
    'Customer payment checkout URL': 'URL de checkout para el cliente',
    'Provider login URL': 'URL de login del proveedor',
    'Provider dashboard URL': 'URL del dashboard del proveedor',
    'Cash enabled': 'Efectivo activo',
    'Verification mode': 'Modo de verificacion',
    'Cash instructions': 'Instrucciones de efectivo',
    'Pay in person at pickup or delivery.': 'Pagar en persona al recoger o al recibir delivery.',
    'Cash App link': 'Enlace de Cash App',
    'Zelle instructions': 'Instrucciones de Zelle',
    'Zelle email/phone and what reference to include.': 'Email/telefono de Zelle y referencia que debe incluir.',
    'Provider instructions': 'Instrucciones del proveedor',
    'How the admin checks processed, pending, or rejected payments.': 'Como se revisan pagos procesados, pendientes o rechazados.',
    'Button label': 'Texto del boton',
    'Block unpaid online orders': 'Bloquear ordenes online sin pagar',
    'Redirect message': 'Mensaje de redireccion',
    'Save payments': 'Guardar pagos',
    'Restaurant settings': 'Ajustes del restaurante',
    'Restaurant name': 'Nombre del restaurante',
    'Delivery enabled': 'Delivery activo',
    'Pickup enabled': 'Recogida activa',
    'Fixed delivery fee': 'Tarifa fija de delivery',
    'Tax rate': 'Impuesto',
    'Instagram URL': 'URL de Instagram',
    'Hero image URL': 'URL de imagen principal',
    'About text': 'Texto sobre el negocio',
    'Order QR enabled': 'QR de orden activo',
    'Website license': 'Licencia del website',
    'This identifies the website package and the public pages used by the customer. Keep it read-only unless the site is redeployed to a new public URL.': 'Esto identifica el paquete del website y las paginas publicas usadas por el cliente. Mantener solo lectura a menos que el sitio se publique en una nueva URL.',
    'License name': 'Nombre de licencia',
    'Licensed / powered by': 'Licenciado / desarrollado por',
    'Public base URL': 'URL publica base',
    'Tracking page': 'Pagina de rastreo',
    'Location update seconds': 'Segundos para actualizar ubicacion',
    'Save settings': 'Guardar ajustes',
    'Create / update user': 'Crear / actualizar usuario',
    'Section permissions control what this user can see and do in the management app.': 'Los permisos por seccion controlan lo que este usuario puede ver y hacer en la app de administracion.',
    'Remove permissions': 'Quitar permisos',
    'Clear form': 'Limpiar formulario',
    'User / email': 'Usuario / email',
    'Role': 'Rol',
    'Save user': 'Guardar usuario',
    'Saving user...': 'Guardando usuario...',
    'Updating user permissions...': 'Actualizando permisos del usuario...',
    'Creating user...': 'Creando usuario...',
    'Editing': 'Editando',
    'Delete': 'Borrar',
    'Deleting user...': 'Borrando usuario...',
    'Delete user': 'Borrar usuario',
    'This cannot be undone.': 'Esto no se puede deshacer.',
    'User updated': 'Usuario actualizado',
    'User deleted': 'Usuario borrado',
    'The owner user cannot be deleted.': 'El usuario owner no se puede borrar.',
    'You cannot delete the user currently signed in.': 'No puedes borrar el usuario que esta conectado ahora.',
    'Activity logs': 'Logs de actividad',
    'System activity': 'Actividad del sistema',
    'Filter admin actions, order updates, payment changes, security events, and API errors.': 'Filtra acciones admin, cambios de orden, pagos, eventos de seguridad y errores API.',
    'Search': 'Buscar',
    'User, order, action, details...': 'Usuario, orden, accion, detalles...',
    'Action': 'Accion',
    'All actions': 'Todas las acciones',
    'Result': 'Resultado',
    'All results': 'Todos los resultados',
    'Reload logs': 'Recargar logs',
    'Clear logs': 'Borrar logs',
    'Time': 'Hora',
    'Details': 'Detalles',
    'No logs match the current filters.': 'No hay logs que coincidan con los filtros.',
    'Logs updated': 'Logs actualizados',
    'Clear logs?': 'Borrar logs?',
    'This clears logs, pickup scans, delivery tracking history, and delivery summaries.': 'Esto borra logs, escaneos pickup, historial de tracking delivery y resumenes de delivery.',
    'Logs cleared': 'Logs borrados',
    'Only owner/admin can clear logs.': 'Solo owner/admin puede borrar logs.',
    'Order QR scanner': 'Escaner QR de orden',
    'Scan pickup QR at the counter or delivery QR when the customer meets the driver. If the customer is not outside, mark delivery complete with a note and optional photo proof.': 'Escanea el QR de recogida en el counter o el QR de delivery cuando el cliente se encuentre con el repartidor. Si el cliente no esta afuera, marca la entrega completa con una nota y foto opcional.',
    'Open the camera here and point it at the pickup or delivery QR. The order will be verified inside this panel.': 'Abre la camara aqui y apunta al QR de recogida o delivery. La orden se verificara dentro de este panel.',
    'Start camera': 'Iniciar camara',
    'Stop camera': 'Detener camara',
    'Order token': 'Token de orden',
    'Paste scanned pickup/delivery token': 'Pega el token escaneado de recogida/delivery',
    'Scan QR photo': 'Escanear foto de QR',
    'Delivery note': 'Nota de delivery',
    'Example: Left at front door / Handed to customer.': 'Ejemplo: Dejado en la puerta / Entregado al cliente.',
    'Optional delivery photo': 'Foto opcional de delivery',
    'Verify order': 'Verificar orden',
    'Complete scanned order': 'Completar orden escaneada',
    'Checking access...': 'Verificando acceso...',
    'Opening management dashboard': 'Abriendo dashboard de administracion',
    'Updated': 'Actualizado',
    'Select staff/delivery': 'Seleccionar staff/delivery',
    'Assign': 'Asignar',
    'Send to Delivery': 'Enviar a Delivery',
    'More status': 'Mas estados',
    'No orders yet.': 'No hay ordenes todavia.',
    'Payment marked paid': 'Pago marcado como pagado',
    'Payment status updated': 'Estado de pago actualizado',
    'Select staff/delivery first': 'Selecciona staff/delivery primero',
    'Delivery assigned': 'Delivery asignado',
    'Destination:': 'Destino:',
    'Instructions:': 'Instrucciones:',
    'No instructions': 'Sin instrucciones',
    'Google Maps': 'Google Maps',
    'Apple Maps': 'Apple Maps',
    'Start GPS': 'Iniciar GPS',
    'Update GPS': 'Actualizar GPS',
    'Delivered': 'Entregado',
    'Customer Tracking': 'Rastreo del cliente',
    'No delivery orders ready right now.': 'No hay ordenes de delivery listas ahora.',
    'GPS is not available on this device.': 'GPS no esta disponible en este dispositivo.',
    'Delivery GPS started': 'GPS de delivery iniciado',
    'GPS updated': 'GPS actualizado',
    'Order delivered': 'Orden entregada',
    'Optimizing image...': 'Optimizando imagen...',
    'Uploading optimized image...': 'Subiendo imagen optimizada...',
    'Image ready': 'Imagen lista',
    'Image upload failed': 'Error al subir imagen',
    'Please choose a valid image.': 'Elige una imagen valida.',
    'Could not read image.': 'No se pudo leer la imagen.',
    'Could not load image.': 'No se pudo cargar la imagen.',
    'No menu items.': 'No hay productos en el menu.',
    'Menu item saved': 'Producto guardado',
    'Menu price must be greater than zero.': 'El precio del producto debe ser mayor que cero.',
    'Item updated': 'Producto actualizado',
    'No promotions configured.': 'No hay promociones configuradas.',
    'Promotion saved': 'Promocion guardada',
    'Promotion updated': 'Promocion actualizada',
    'No reviews configured.': 'No hay resenas configuradas.',
    'Testimonial saved': 'Resena guardada',
    'Testimonial updated': 'Resena actualizada',
    'Payments saved': 'Pagos guardados',
    'Settings saved': 'Ajustes guardados',
    'No users.': 'No hay usuarios.',
    'Load / reset password': 'Cargar / resetear contrasena',
    'Edit permissions': 'Editar permisos',
    'Unlock': 'Desbloquear',
    'User saved': 'Usuario guardado',
    'You do not have access to that section': 'No tienes acceso a esa seccion',
    'Review status updated': 'Estado de resena actualizado',
    'Review row not found': 'Fila de resena no encontrada',
    'No customer reviews have been submitted yet.': 'Todavia no se han enviado resenas de clientes.',
    'User unlocked': 'Usuario desbloqueado',
    'Camera stopped. Press Start camera to scan another order.': 'Camara detenida. Presiona Iniciar camara para escanear otra orden.',
    'Camera active. Hold the QR steady inside the video box.': 'Camara activa. Mantén el QR quieto dentro del video.',
    'Camera scanning requires HTTPS or localhost. Open the published HTTPS admin page, or paste/upload the QR token.': 'El escaneo con camara requiere HTTPS o localhost. Abre la pagina admin publicada en HTTPS, o pega/sube el token QR.',
    'Camera is not available on this device. Paste the token or upload a QR photo.': 'La camara no esta disponible en este dispositivo. Pega el token o sube una foto del QR.',
    'The QR reader is still loading. Wait a moment and press Start camera again.': 'El lector QR todavia esta cargando. Espera un momento y presiona Iniciar camara otra vez.',
    'Camera permission is blocked. Allow camera access in the browser, use HTTPS, or paste/upload the QR token.': 'El permiso de camara esta bloqueado. Permite acceso a la camara en el navegador, usa HTTPS, o pega/sube el token QR.',
    'No usable camera was found. Paste the token or upload a QR photo.': 'No se encontro una camara usable. Pega el token o sube una foto del QR.',
    'The camera is busy in another app. Close the other app or paste/upload the QR token.': 'La camara esta ocupada en otra app. Cierra la otra app o pega/sube el token QR.',
    'Could not open the camera. Paste the token or upload a QR photo.': 'No se pudo abrir la camara. Pega el token o sube una foto del QR.',
    'The QR reader is still loading. Try again in a moment.': 'El lector QR todavia esta cargando. Intenta de nuevo en un momento.',
    'Could not load QR image.': 'No se pudo cargar la imagen del QR.',
    'Could not read that QR image. Try a clearer photo.': 'No se pudo leer esa imagen QR. Intenta con una foto mas clara.',
    'No QR code found in the camera. Keep the QR centered and try again.': 'No se encontro un QR en la camara. Mantén el QR centrado e intenta otra vez.',
    'No QR code found in the image. Keep the QR centered and try again.': 'No se encontro un QR en la imagen. Mantén el QR centrado e intenta otra vez.',
    'The QR was detected but no order token was readable.': 'El QR fue detectado, pero no se pudo leer un token de orden.',
    'QR token captured. Verifying order...': 'Token QR capturado. Verificando orden...',
    'Scanning is still active. Keep the QR inside the video box.': 'El escaneo sigue activo. Mantén el QR dentro del video.',
    'Choose a valid delivery photo.': 'Elige una foto de delivery valida.',
    'Could not read delivery photo.': 'No se pudo leer la foto de delivery.',
    'Verify token first': 'Verifica el token primero',
    'Order completed': 'Orden completada',
    'Ready to complete': 'Lista para completar',
    'Receipt': 'Recibo',
    'This QR is closed because the order was already completed. Receipt shown for record.': 'Este QR esta cerrado porque la orden ya fue completada. Se muestra el recibo para registro.',
    'Complete delivery after handoff, or add a note/photo if left at a safe location.': 'Completa el delivery despues de entregarlo, o agrega nota/foto si lo dejaste en un lugar seguro.',
    'Complete pickup after checking the customer token.': 'Completa la recogida despues de verificar el token del cliente.',
    'QR:': 'QR:',
    'Closed:': 'Cerrado:',
    'Subtotal': 'Subtotal',
    'Discount': 'Descuento',
    'Tax': 'Impuesto',
    'Delivery fee': 'Tarifa de delivery',
    'Delivery Fee': 'Tarifa de delivery',
    'Delivery fee set by restaurant': 'Tarifa de delivery configurada por el restaurante',
    'Pickup': 'Recogida',
    'Free': 'Gratis',
    'Each': 'Cada uno',
    'Your cart is empty.': 'Tu carrito esta vacio.',
    'No menu items available.': 'No hay productos disponibles.',
    'No active promotions right now.': 'No hay promociones activas ahora.',
    'No approved reviews yet.': 'No hay resenas aprobadas todavia.',
    'Pairs well with': 'Combina bien con',
    'Complete the meal': 'Completa la comida',
    'Optional recommendations only. Nothing is added unless you tap Add.': 'Solo recomendaciones opcionales. Nada se agrega a menos que toques Agregar.',
    'House special': 'Plato de la casa',
    'House Specials': 'Platos de la casa',
    'Add': 'Agregar',
    'Added to cart': 'Agregado al carrito',
    'Checking menu prices from the restaurant.': 'Revisando precios del menu del restaurante.',
    'Preparing a clean receipt for your order.': 'Preparando un recibo claro para tu orden.',
    'Finding the best pickup or delivery details.': 'Buscando los mejores detalles de recogida o delivery.',
    'Saving your order and tracking information.': 'Guardando tu orden y la informacion de rastreo.',
    'Recent guests recommend ordering ahead and tracking from the receipt.': 'Clientes recientes recomiendan ordenar antes y rastrear desde el recibo.',
    'Could not load menu. Check Client API URL.': 'No se pudo cargar el menu. Revisa la URL del Client API.',
    'Order ID is required': 'El Order ID es requerido',
    'Phone or email is required': 'Telefono o email es requerido',
    'Checking...': 'Revisando...',
    'Name is required': 'El nombre es requerido',
    'Review must be at least 8 characters': 'La resena debe tener al menos 8 caracteres',
    'Sharing your review...': 'Compartiendo tu resena...',
    'Thank you. Your review was received.': 'Gracias. Recibimos tu resena.',
    'Cart is empty': 'El carrito esta vacio',
    'Delivery address is required': 'La direccion de delivery es requerida',
    'Processing order...': 'Procesando orden...',
    'Tracking details are not available yet': 'Los detalles de rastreo todavia no estan disponibles',
    'That order is no longer available on this device.': 'Ese pedido ya no esta disponible en este dispositivo.',
    'That order is no longer available. Use the Order ID from the receipt to search for it.': 'Ese pedido ya no esta disponible. Usa el Order ID del recibo para buscarlo.',
    'No recent orders are available on this device.': 'No hay pedidos recientes disponibles en este dispositivo.',
    'We could not find that order. Use the Order ID and phone or email from your receipt.': 'No pudimos encontrar ese pedido. Usa el Order ID y el telefono o correo del recibo.',
    'No recent order is saved on this device': 'No hay un pedido reciente guardado en este dispositivo',
    'Live order status': 'Estado de orden en vivo',
    'Track your order': 'Rastrea tu pedido',
    'This page updates order status, purchase details, customer information, and delivery location when GPS is active.': 'Esta pagina actualiza el estado de la orden, detalles de compra, informacion del cliente y ubicacion de delivery cuando el GPS esta activo.',
    'Loading...': 'Cargando...',
    'Order details': 'Detalles de la orden',
    'Delivery map': 'Mapa de delivery',
    'The map shows the destination until the driver starts sharing GPS.': 'El mapa muestra el destino hasta que el delivery empiece a compartir GPS.',
    'Back to restaurant': 'Volver al restaurante',
    'Notify me': 'Notificarme',
    'Thank you for ordering with us.': 'Gracias por ordenar con nosotros.',
    'Tracking active': 'Rastreo activo',
    'Customer': 'Cliente',
    'Last update': 'Ultima actualizacion',
    'Instructions': 'Instrucciones',
    'No public items available.': 'No hay productos publicos disponibles.',
    'Pickup location': 'Ubicacion de recogida',
    'Order map': 'Mapa de la orden',
    'Show your pickup QR/token at the counter.': 'Muestra tu QR/token de recogida en el counter.',
    'Driver location active. Last update:': 'Ubicacion del delivery activa. Ultima actualizacion:',
    'Waiting for driver GPS update. Destination map is shown for now.': 'Esperando actualizacion GPS del delivery. Por ahora se muestra el mapa del destino.',
    'Destination map is shown. Driver GPS appears once delivery starts.': 'Se muestra el mapa del destino. El GPS del delivery aparece cuando empiece el delivery.',
    'Invalid tracking link': 'Enlace de rastreo invalido',
    'This page requires a secure tracking or pickup token.': 'Esta pagina requiere un token seguro de rastreo o recogida.',
    'Tracking unavailable': 'Rastreo no disponible',
    'Open the restaurant page or contact the restaurant if this link looks incorrect.': 'Abre la pagina del restaurante o contacta al restaurante si este enlace parece incorrecto.',
    'Notifications are not supported here': 'Las notificaciones no estan soportadas aqui',
    'Notifications enabled': 'Notificaciones activadas',
    'Notifications not enabled': 'Notificaciones no activadas',
    'Delivery is managed inside the management panel.': 'El delivery se maneja dentro del panel de administracion.',
    'Staff handles assigned orders from the delivery section.': 'El staff maneja ordenes asignadas desde la seccion de delivery.',
    'Open the management panel, go to the Delivery section, select the active order, use Google Maps or Apple Maps, start GPS tracking, and mark the order Delivered.': 'Abre el panel de administracion, ve a Delivery, selecciona la orden activa, usa Google Maps o Apple Maps, inicia el rastreo GPS y marca la orden como entregada.',
    'Open management panel': 'Abrir panel de administracion',
    "You're offline": 'Estas sin conexion',
    'Some saved pages are still available.': 'Algunas paginas guardadas todavia estan disponibles.',
    'Reconnect to place orders, update delivery tracking, send reviews, or manage live order data.': 'Reconectate para hacer pedidos, actualizar rastreo de delivery, enviar resenas o administrar datos de ordenes en vivo.',
    'Open customer app': 'Abrir app de cliente',
    'Open management app': 'Abrir app de administracion',
    'Pending': 'Pendiente',
    'Confirmed': 'Confirmado',
    'Preparing': 'En preparacion',
    'Ready for pickup': 'Listo para recoger',
    'Ready for delivery': 'Listo para delivery',
    'On the way': 'En camino',
    'Picked up': 'Recogido',
    'Cancelled': 'Cancelado',
    'Finalized': 'Finalizado',
    'Completed': 'Completado',
    'Payment pending': 'Pago pendiente',
    'Paid': 'Pagado',
    'Rejected': 'Rechazado',
    'Notice': 'Aviso',
    'Yes': 'Si',
    'No': 'No',
    'Manual': 'Manual',
    'Webhook required': 'Requiere webhook',
    'Provider API required': 'Requiere API del proveedor',
    'Yes - requires webhook/API': 'Si - requiere webhook/API',
    'percent': 'porcentaje',
    'fixed': 'monto fijo',
    'staff': 'staff',
    'admin': 'admin',
    'delivery': 'delivery',
    'kitchen': 'cocina',
    'Enable': 'Activar',
    'Disable': 'Desactivar',
    'Edit': 'Editar',
    'Toggle': 'Cambiar',
    'Hide': 'Ocultar',
    'Approve': 'Aprobar',
    'Enter a valid customer email.': 'Escribe un correo valido.',
    'Enter a valid customer phone.': 'Escribe un telefono valido.',
    'Invalid item quantity.': 'Cantidad de producto invalida.',
    'Order total is invalid.': 'El total de la orden no es valido.',
    'This status does not match the order type.': 'Ese estado no corresponde al tipo de orden.',
    'This order is already closed and cannot change status.': 'Esta orden ya esta cerrada y no puede cambiar estado.',
    'Order must be Ready for delivery before starting GPS.': 'La orden debe estar lista para delivery antes de iniciar GPS.',
    'Delivery GPS can only update while the order is On the way.': 'El GPS solo se puede actualizar cuando la orden esta en camino.',
    'Delivery can only be completed when ready or on the way.': 'El delivery solo se puede completar si esta listo o en camino.',
    'This pickup order is already closed.': 'Esta orden pickup ya esta cerrada.',
    'This delivery order is already closed.': 'Esta orden de delivery ya esta cerrada.',
    'Assigned delivery user was not found.': 'No se encontro el usuario asignado al delivery.',
    'Assigned delivery user is not active.': 'El usuario asignado al delivery no esta activo.',
    'Assigned user does not have delivery permission.': 'El usuario asignado no tiene permiso de delivery.',
    'Delivery permission is required.': 'Se requiere permiso de delivery.',
    'This delivery order is assigned to another user.': 'Esta orden de delivery esta asignada a otro usuario.',
    'Refunded payments cannot be changed again.': 'Un pago reembolsado no se puede cambiar nuevamente.',
    'Cancelled orders can only have Cancelled or Refunded payment status.': 'Las ordenes canceladas solo pueden tener pago cancelado o reembolsado.',
    'Completed orders can only be marked Paid, Refunded, or Cancelled.': 'Las ordenes completadas solo pueden marcarse pagadas, reembolsadas o canceladas.',
    'Pending review': 'Revision pendiente'
  };

  const dynamicRules = [
    [/^Order (.+)$/i, 'Pedido $1'],
    [/^Order ID: (.+)$/i, 'Order ID: $1'],
    [/^Payment status: (.+)$/i, 'Estado del pago: $1'],
    [/^Current status: (.+)$/i, 'Estado actual: $1'],
    [/^Status: (.+) \| Payment: (.+)$/i, 'Estado: $1 | Pago: $2'],
    [/^QR: (.+)$/i, 'QR: $1'],
    [/^Closed: (.+)$/i, 'Cerrado: $1'],
    [/^Image uploaded: (.+) KB$/i, 'Imagen subida: $1 KB'],
    [/^Good choice: (.+) is being added to a clean receipt\.$/i, 'Buena eleccion: $1 se esta agregando a un recibo claro.'],
    [/^Checking active offers like (.+)\.$/i, 'Revisando ofertas activas como $1.'],
    [/^Order (.+) is now (.+)$/i, 'El pedido $1 ahora esta $2'],
    [/^Driver location active\. Last update: (.+)$/i, 'Ubicacion del delivery activa. Ultima actualizacion: $1'],
    [/^Subtotal (.+) \| Discount (.+) \| Tax (.+) \| Delivery (.+) \| Tip (.+)$/i, 'Subtotal $1 | Descuento $2 | Impuesto $3 | Delivery $4 | Propina $5'],
    [/^Rating (.+) \| Status (.+)$/i, 'Calificacion $1 | Estado $2'],
    [/^active (.+) \| available (.+) \| failed attempts (.+)$/i, 'activo $1 | disponible $2 | intentos fallidos $3'],
    [/^(.+) each$/i, '$1 cada uno'],
    [/^Pairs well with (.+)$/i, 'Combina bien con $1'],
    [/^Assigned: (.+)$/i, 'Asignado: $1'],
    [/^Address: (.+)$/i, 'Direccion: $1'],
    [/^Instructions: (.+)$/i, 'Instrucciones: $1']
  ];

  function getLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (supported.indexOf(saved) !== -1) return saved;
    return (navigator.language || '').toLowerCase().startsWith('es') ? 'es' : 'en';
  }

  let lang = getLang();

  function normalize(text) {
    return String(text || '').replace(/\s+/g, ' ').trim();
  }

  function translate(text) {
    if (lang !== 'es') return text;
    const original = String(text || '');
    const trimmed = normalize(original);
    if (!trimmed) return original;
    let translated = es[trimmed];
    if (!translated) {
      for (const rule of dynamicRules) {
        if (rule[0].test(trimmed)) {
          translated = trimmed.replace(rule[0], rule[1]);
          break;
        }
      }
    }
    if (!translated || translated === trimmed) return original;
    return original.replace(trimmed, translated);
  }

  function prepareOptionValues(root) {
    const scope = root && root.querySelectorAll ? root : document;
    scope.querySelectorAll('option').forEach(option => {
      if (!option.hasAttribute('value')) option.setAttribute('value', normalize(option.textContent));
    });
  }

  function shouldSkip(node) {
    const parent = node.parentElement;
    if (!parent) return true;
    if (parent.closest('[data-i18n-skip]')) return true;
    return /^(SCRIPT|STYLE|TEXTAREA|NOSCRIPT|CODE|PRE)$/i.test(parent.tagName);
  }

  function translateTextNodes(root) {
    if (lang !== 'es') return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (shouldSkip(node)) return NodeFilter.FILTER_REJECT;
        return normalize(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const next = translate(node.nodeValue);
      if (next !== node.nodeValue) node.nodeValue = next;
    });
  }

  function translateAttributes(root) {
    if (lang !== 'es') return;
    const scope = root && root.querySelectorAll ? root : document;
    const elements = scope.querySelectorAll('[placeholder], [title], [aria-label], input[type="button"], input[type="submit"]');
    elements.forEach(element => {
      ['placeholder', 'title', 'aria-label'].forEach(attr => {
        if (element.hasAttribute(attr)) {
          const value = element.getAttribute(attr);
          const next = translate(value);
          if (next !== value) element.setAttribute(attr, next);
        }
      });
      if ((element.type === 'button' || element.type === 'submit') && element.value) {
        const next = translate(element.value);
        if (next !== element.value) element.value = next;
      }
    });
  }

  function apply(root) {
    document.documentElement.lang = lang;
    prepareOptionValues(root || document);
    if (lang === 'es') {
      if (document.title) document.title = translate(document.title);
      translateAttributes(root || document);
      translateTextNodes(root || document.body || document);
    }
  }

  function setLanguage(nextLang) {
    if (supported.indexOf(nextLang) === -1) return;
    localStorage.setItem(STORAGE_KEY, nextLang);
    location.reload();
  }

  function injectToggle() {
    if (document.querySelector('.lang-toggle')) return;
    const wrap = document.createElement('div');
    wrap.className = 'lang-toggle';
    wrap.setAttribute('data-i18n-skip', 'true');
    wrap.setAttribute('aria-label', 'Language selector');
    wrap.innerHTML = '<button type="button" data-lang="en">EN</button><button type="button" data-lang="es">ES</button>';
    wrap.querySelectorAll('button').forEach(button => {
      button.classList.toggle('active', button.dataset.lang === lang);
      button.addEventListener('click', () => setLanguage(button.dataset.lang));
    });
    document.body.appendChild(wrap);
  }

  function observe() {
    if (!('MutationObserver' in window)) return;
    const observer = new MutationObserver(records => {
      records.forEach(record => {
        record.addedNodes.forEach(node => {
          if (node.nodeType === 1) apply(node);
          if (node.nodeType === 3 && lang === 'es' && !shouldSkip(node)) {
            const next = translate(node.nodeValue);
            if (next !== node.nodeValue) node.nodeValue = next;
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function init() {
    apply(document);
    injectToggle();
    observe();
  }

  window.RTI18N = { get lang() { return lang; }, setLanguage, translate, apply };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
