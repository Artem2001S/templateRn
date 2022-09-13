import env from 'react-native-config';

export const config = {
  webviewUrl: env.WEBVIEW_URL,
  isProduction: env.IS_PRODUCTION === '1',
  ONESIGNAL_APP_ID: env.ONESIGNAL_APP_ID,
};
