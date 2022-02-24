
function makeAppConfig() {
    let url = 'https://dev-backend-dot-api-backend-dot-cadent-dev-316413.nw.r.appspot.com/'; // for dev
    // let host = window.location.host;
    // if(host.includes('uat')){
    //     url = 'https://uat-dot-api-backend-dot-cadent-dev-316413.nw.r.appspot.com/';
    // }else if(host.includes('cadent-dev')){
    //     url = 'https://dev-backend-dot-api-backend-dot-cadent-dev-316413.nw.r.appspot.com/';
    // } else if(host.includes('localhost')){
    //     url = 'http://localhost:8080/';
    // } 

    let AppConfig = {
      appUrl: url,
      admin: 'admin',
      manager:'manager',
      token_key:'access_token',
      email_key:'access_email',
      role_key:'access_role',
      user_full_name:'access_user',
      user_id:'user_id',
      failedUploadFile:'failed_uploads_'+Date.now(),
      failedEmailFile:'failed_email_'+Date.now(),
      userReportFile:'cadent_app_users'+Date.now(),
      fileStorageId:'filestgidentifier'

  };
  return AppConfig;
}
export const APPCONFIG = makeAppConfig();