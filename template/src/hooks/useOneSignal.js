import {config} from '@/config';
import OneSignal from 'react-native-onesignal';

OneSignal.setAppId(config.ONESIGNAL_APP_ID);
OneSignal.promptForPushNotificationsWithUserResponse();

export default ({notificationOpenAppHandler}) => {
  //Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(
    notificationReceivedEvent => {
      console.log(
        'OneSignal: notification will show in foreground:',
        notificationReceivedEvent,
      );
      let notification = notificationReceivedEvent.getNotification();
      console.log('notification: ', notification);
      const data = notification.additionalData;
      console.log('additionalData: ', data);

      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    },
  );

  //Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler(notification => {
    console.log('OneSignal: notification opened:', notification);
    notificationOpenAppHandler && notificationOpenAppHandler();
  });
};
