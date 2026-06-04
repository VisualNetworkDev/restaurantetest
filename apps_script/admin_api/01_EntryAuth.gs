function doGet(e){
  const p=e&&e.parameter?e.parameter:{};
  const action=p.action||'';
  const cb=p.callback||'';
  try{
    setupSheets_();
    const payload=parsePayload_(p.payload);
    const openActions=['login','health','setup'];
    const session=openActions.indexOf(action)===-1?requireSession_(payload):null;
    let data;
    switch(action){
      case 'health': data={ok:true,api:'admin',timestamp:new Date()}; break;
      case 'setup': data={ok:true,sheets:Object.keys(SHEETS)}; break;
      case 'login': data=login_(payload); break;
      case 'bootstrap': data=bootstrap_(session); break;
      case 'getOrders': data={orders:getOrders_()}; break;
      case 'updateOrderStatus': data=updateOrderStatus_(payload,session); break;
      case 'assignDelivery': data=assignDelivery_(payload,session); break;
      case 'saveMenuItem': data=saveMenuItem_(payload,session); break;
      case 'toggleMenuItem': data=toggleMenuItem_(payload,session); break;
      case 'uploadMenuImage': data=uploadMenuImage_(payload,session); break;
      case 'saveUser': data=saveUser_(payload,session); break;
      case 'updateUserPassword': data=updateUserPassword_(payload,session); break;
      case 'resetUserLock': data=resetUserLock_(payload,session); break;
      case 'savePaymentsConfig': data=savePayments_(payload,session); break;
      case 'saveRestaurantConfig': data=saveConfig_(payload,session); break;
      case 'verifyPickupToken': data=verifyPickupToken_(payload,session); break;
      case 'completePickupOrder': data=completePickupOrder_(payload,session); break;
      case 'getLogs': data={logs:getLogs_()}; break;
      default: throw new Error('Unknown admin action: '+action);
    }
    return output_(true,data,'OK',cb);
  }catch(err){
    adminLog_('unknown','unknown','ADMIN_API_ERROR','',err.stack||String(err),'error',p.userAgent||'');
    return output_(false,null,err.message||String(err),cb);
  }
}

function doPost(e){
  return doGet(e);
}

function login_(payload){
  const username=clean_(payload.email||payload.username).toLowerCase();
  const password=clean_(payload.password);
  const userAgent=clean_(payload.userAgent);
  if(!username) throw new Error('Username or email is required.');
  if(!password) throw new Error('Password is required.');
  const usersSheet=ensureSheet_(SHEETS.USERS,USER_HEADERS);
  seedDefaultUsers_(usersSheet);
  const user=rowsToObjects_(usersSheet).find(u=>String(u.Email||'').toLowerCase()===username);
  if(!user) throw new Error('User not found.');
  if(!isYes_(user.Estado)) throw new Error('User is inactive.');
  const attempts=Number(user.IntentosFallidos||0);
  if(attempts>=5) throw new Error('User is locked after 5 failed attempts.');
  if(String(user.Password||'')!==password){
    updateUserAttempts_(username,attempts+1);
    throw new Error('Invalid password.');
  }
  updateUserLogin_(username);
  const token=createToken_('ADM');
  const now=new Date();
  const expiresAt=new Date(now.getTime()+24*60*60*1000);
  ensureSheet_(SHEETS.SESSIONS,SESSION_HEADERS).appendRow([token,username,user.Nombre||'',user.Role||'',now,expiresAt,'Yes',userAgent]);
  adminLog_(username,user.Role||'admin','LOGIN','', 'Admin login successful','success',userAgent);
  return {sessionToken:token,user:{name:user.Nombre||'',email:username,role:user.Role||'',available:user.Disponible||'',functions:user.FuncionesPermitidas||''}};
}

function requireSession_(payload){
  const token=clean_(payload.sessionToken);
  if(!token) throw new Error('Missing admin session.');
  const sheet=ensureSheet_(SHEETS.SESSIONS,SESSION_HEADERS);
  const rowInfo=findRowByValue_(sheet,'SessionToken',token);
  if(!rowInfo) throw new Error('Invalid admin session.');
  const session=getRowObject_(sheet,rowInfo.row);
  if(!isYes_(session.Active)) throw new Error('Admin session is inactive.');
  const expiresAt=parseDate_(session.ExpiresAt);
  if(expiresAt&&new Date()>expiresAt) throw new Error('Admin session expired.');
  return {token:token,email:String(session.Email||'').toLowerCase(),name:String(session.Name||''),role:String(session.Role||'')};
}

function bootstrap_(session){
  return {user:session,config:getConfig_(),orders:getOrders_(),menu:getMenuAdmin_(),users:getUsers_(),payments:getPayments_(),logs:getLogs_(),dashboard:getDashboard_()};
}
