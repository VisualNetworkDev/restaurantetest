/****************************************************
 * RESTAURANT TEST — ADMIN API CONFIG
 * Initial login: Admin / Admin123
 ****************************************************/

const SPREADSHEET_ID = 'PASTE_YOUR_SHEET_ID_HERE';
const MENU_IMAGE_FOLDER_NAME = 'Restaurant Test Menu Images';

const SHEETS = {
  CONFIG: 'Config',
  MENU: 'Menu',
  PROMOTIONS: 'Promotions',
  TESTIMONIALS: 'Testimonials',
  ORDERS: 'Orders',
  USERS: 'Users',
  SESSIONS: 'AdminSessions',
  PAYMENTS: 'Payments',
  LOGS: 'Logs',
  PICKUP_LOGS: 'PickupQRLogs'
};

const CONFIG_HEADERS = ['Key', 'Value'];
const MENU_HEADERS = ['ID', 'Categoria', 'Nombre', 'Descripcion', 'Precio', 'Imagen', 'Disponible', 'Orden', 'Notas', 'TiempoPreparacionMin', 'Taxable', 'TieneOpciones', 'Opciones'];
const PROMO_HEADERS = ['Code', 'Title', 'Description', 'Type', 'Value', 'Active', 'StartDate', 'EndDate', 'MinSubtotal'];
const TESTIMONIAL_HEADERS = ['Name', 'Text', 'Rating', 'Visible'];
const ORDER_HEADERS = ['OrderID', 'Timestamp', 'ClienteNombre', 'ClienteTelefono', 'ClienteCorreo', 'TipoOrden', 'DireccionEntrega', 'InstruccionesEntrega', 'ItemsJSON', 'Subtotal', 'Descuento', 'Tax', 'DeliveryFee', 'Tip', 'Total', 'MetodoPago', 'PaymentStatus', 'Estado', 'AssignedDeliveryEmail', 'AssignedDeliveryName', 'CreatedBy', 'UpdatedAt', 'PickupToken', 'TrackingToken', 'PickupQRUrl', 'TrackingURL', 'AdminNotes', 'CustomerNotes', 'EmailClienteEnviado', 'EmailAdminEnviado'];
const USER_HEADERS = ['UserID', 'Nombre', 'Email', 'Password', 'Role', 'Estado', 'Disponible', 'FuncionesPermitidas', 'PuedeDelivery', 'PuedeKitchen', 'PuedePickup', 'RecibeCorreos', 'UltimoLogin', 'IntentosFallidos'];
const SESSION_HEADERS = ['SessionToken', 'Email', 'Name', 'Role', 'CreatedAt', 'ExpiresAt', 'Active', 'UserAgent'];
const PAYMENT_HEADERS = ['Key', 'Value'];
const LOG_HEADERS = ['LogID', 'Timestamp', 'UserEmail', 'UserRole', 'Action', 'OrderID', 'Details', 'Result', 'UserAgent'];
const PICKUP_LOG_HEADERS = ['LogID', 'Timestamp', 'OrderID', 'PickupToken', 'ScannedByEmail', 'ScannedByRole', 'Result', 'PreviousStatus', 'NewStatus', 'UserAgent', 'Notes'];

const DEFAULT_CONFIG = {
  name: 'Restaurant Test',
  adminEmail: '2808joel@gmail.com',
  email: '2808joel@gmail.com',
  phone: '(904) 000-0000',
  address: 'Jacksonville, FL',
  taxRate: 0.07,
  deliveryFee: 4.99,
  deliveryEnabled: 'Yes',
  pickupEnabled: 'Yes',
  defaultOrderStatus: 'Pending',
  instagramUrl: '',
  licenseBy: 'Visual Event Network',
  licenseName: 'Restaurant Test Ordering System',
  publicBaseUrl: 'https://visualnetworkdev.github.io/restaurantetest',
  trackingPage: 'tracking.html',
  locationUpdateSeconds: 30
};
