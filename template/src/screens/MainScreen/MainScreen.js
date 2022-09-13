import {config} from '@/config';
import {
  handleMessagesFromReactNativeOnWebPage,
  sendMessageFromWebPageToReactNative,
} from '@/utils/webviewExamples';
import React, {useCallback, useRef} from 'react';
import {Button, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

const runFirst = `
  window.isNativeApp = true;
  true; // note: this is required, or you'll sometimes get silent failures
`;

const html = `
  <html>
    <head></head>
    <body>
    <script>
      ${handleMessagesFromReactNativeOnWebPage}
      ${sendMessageFromWebPageToReactNative}
      </script>
      <h1>React Native Webview</h1>
      <h1>IS Production = ${JSON.stringify(config)}</h1>
    </body>
  </html>
`;

const MainScreen = () => {
  const webviewRef = useRef(null);

  const sendMessageToWebPage = useCallback(() => {
    webviewRef.current.postMessage('Hello');
    console.log('send');
  }, []);

  const webviewMessageHandler = useCallback(
    event => {
      console.log('Get from web page:', event.nativeEvent.data);
      sendMessageToWebPage();
    },
    [sendMessageToWebPage],
  );

  return (
    <SafeAreaView style={styles.root}>
      <WebView
        ref={webviewRef}
        style={styles.webview}
        source={{html}}
        injectedJavaScriptBeforeContentLoaded={runFirst}
        onMessage={webviewMessageHandler}
        javaScriptEnabled={true}
      />
      <Button title="Send message" onPress={sendMessageToWebPage} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  webview: {flex: 1},
});

export default MainScreen;
