export const handleMessagesFromReactNativeOnWebPage = `document.addEventListener("message", function (event) {
    alert('get')
  });`;

export const sendMessageFromWebPageToReactNative = `setTimeout(function () {
    window.ReactNativeWebView.postMessage("Hello!");
  }, 2000)`;
