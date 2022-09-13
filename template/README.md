# rn-webview-boilerplate

#### Настройка окружения

Для запуска проекта необходимо настроить окружение, см [статью из офф. документации.](https://reactnative.dev/docs/environment-setup)

> Важно - если путь к ANDROID_SDK_ROOT настроен через
> терминал bash, то проект следует запускать через bash. Если zsh -
> запуск через zsh.

## Запуск проекта, типы сборок (prod/dev)

ENV константы хранятся в файлах `.env.development` и `.env.production`

В файл `.env` при запуске iOS записываются константы из файла `.env.development` или `.env.production` - в зависимости от выбранной схемы запуска.

#### Запуск iOS

```
$ yarn // установка npm пакетов
$ cd ios && pod install && cd .. // установка pod файлов (для iOS)
```

Затем открыть проект в XCode (Открыть XCode -> Open a project or file -> Выбрать папку ios проекта)
Выбрать [схему](https://monosnap.com/file/ivh3YGzl7B2vWuLzWNx0IaTNeWT6rO) для запуска и эмулятор/устройство, нажать кнопку запуска.

#### iOS проект содержит 3 схемы для запуска

- `WebViewApp` - дефолтная схема, если потребуется создать новую схему - необходимо склонировать эту схему и таргет `WebviewApp`
- `WebViewAppDev` - схема для запуска тестовой версии.
  Конфигурация тестового приложения находится в файле `DevelopmentInfo.plist`, таргет `WebViewAppDevTarget`
- `WebViewAppProd` - схема для запуска продакшен версии.
  Конфигурация продакшен приложения находится в файле `ProductionInfo.plist`, таргет `WebViewAppProdTarget`

Отличия prod и dev схем:

- разные `.env` файлы (перед запуском проекта выполняется скрипт, который записывает в файл `.env` данные из `.env.development` или `.env.production`
- разные .plist файлы
  > Важно: при изменении .plist файлов (например: добавление доступа к камере) - необходимо внести изменения во все .plist файлы - `DevelopmentInfo.plist`, `ProductionInfo.plist` и `Info.plist`

При необходимости можно задать разные иконки/splash скрины для разных типов сборок, для этого необходимо изменить нужный .plist файл или таргет [Изменение иконки/splash screen'а](https://monosnap.com/file/J85IhyKaBd6wZGobOESpTFEKm7zBIo)

#### Запуск Android

```
$ yarn // установка npm пакетов
```

Файл `package.json` содержит 4 скрипта для запуска Android:

- `android:dev` - запуск dev версии, `.env` константы будут использоваться из `.env.development`
- `android:production` - запуск production версии, `.env` константы будут использоваться из `.env.production`
- `android:build:dev` - сборка apk установщика, файл будет сгенерирован в папке `android/app/build/outputs/apk/development/release/app-development-release.apk`
- `android:build:production` - сборка apk установщика, файл будет сгенерирован в папке `android/app/build/outputs/apk/production/release/app-production-release.apk`

#### Изменение конфигурации Android приложения

В файле `android/app/build.gradle` описаны параметры сборки приложения. Env файлы прописаны в

    project.ext.envConfigFiles = [
        debug: '.env.development',
        release: '.env.production',
    ]

Настройки названия и id приложения находятся в этом же файле, параметр `productFlavors`, который содержит две конфигурации (production & development)

Чтобы изменить id приложения, необходимо изменить параметр `applicationId`.
Для изменения названия приложения, необходимо изменить параметр

    resValue "string", "app_name", "Webview Production"

> Параметр `app_name` подставляется в `AndroidManifest.xml` > `android:label="@string/app_name"`

### OneSignal

Настройка OneSignal для андроид выполнена. Необходимо создать проект в OneSignal и получить app id, изменить app id в `.env` файлах

[Инструкция по добавлению OneSignal SDK для iOS + Android](https://documentation.onesignal.com/docs/react-native-sdk-setup)

[Инструкция по настройке OneSignal для Андроид](https://documentation.onesignal.com/docs/generate-a-google-server-api-key)

### WebView

[Докуменатация react-native-webview](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md)

В файле `webviewExamples.js` пример отправки сообщения с веб-страницы на WebView (приложение)

> window.ReactNativeWebView.postMessage("Hello!");

и наоборот, обработка на веб-странице сообщений, полученных от WebView (приложения)

> `document.addEventListener("message", function (event) { alert('get message from mobile app') });`

Получение сообщений от веб-страницы в моб. приложении:

```
<WebView
	...
	onMessage={(event) => {
		console.log('Get from web page:',  event.nativeEvent.data); // "Hello!"
	}}
/>
```

#### Загрузка файлов через WebView

Для загрузки файлов необходимо запросить у пользователя доступы

[Инструкция по добавлению разрешений в AndroidManifest.xml и .plist файлы](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md#add-support-for-file-upload)

### Изменение иконок приложения

Для разных типов сборок заданы разные иконки приложения.

#### iOS

[Расположение иконки iOS приложения в XCode](https://monosnap.com/file/DTJtyjRYTJgvXlJ3b4tHbXHZtNeKz8)
Где выбрать нужную иконку - см. [Изменение иконки/splash screen'а](https://monosnap.com/file/J85IhyKaBd6wZGobOESpTFEKm7zBIo)

Для генерации иконки iOS приложения можно воспользоваться сервисом [app icon generator](https://appicon.co/).

#### Android

Иконка задается в файле `android/app/build.gradle`

```
productFlavors {
	production {
		manifestPlaceholders = [
			appIcon: "@mipmap/ic_launcher_prod",
			appIconRound: "@mipmap/ic_launcher_prod_round"
		]
	}
....
}
```

Переменные `appIcon` и `appIconRound` подставляются в `AndroidManifest.xml`

```
<application
	android:name=".MainApplication"
	android:label="@string/app_name"
	android:icon="${appIcon}"
	android:roundIcon="${appIconRound}"
	.....
```

[Инструкция по добавлению новой иконки](https://developer.android.com/codelabs/basic-android-kotlin-training-change-app-icon#5)

#### Splash screen

Документация [react-native-bootsplash (v3.2.6)](https://github.com/zoontek/react-native-bootsplash/tree/3.2.6)
При необходимости можно сделать разные сплэш скрины для прод/тест сборок по аналогии с иконкой приложения.

## Сборка проекта для выгрузки в Google Play Console / TestFlight

### Подготовка

#### Android

Необходимо сгенерировать ключ подписи приложения.
[Подробная инструкция по генерации ключа](https://reactnative.dev/docs/signed-apk-android)

#### iOS

[Документация Apple](https://developer.apple.com/documentation/xcode/preparing-your-app-for-distribution)
Необходимо добавить в XCode аккаунт разработчика, создать и скачать сертификаты Development и Distribution (через App Store Connect).

Выставить `Bundle Identifier` (раздел `General` из настроек выбранного таргета в XCode), который был указан при создании приложения в App Store Connect

### Сборка

#### iOS

1. Выбрать нужную схему (прод/тест)
2. Перед каждой новой сборкой необходимо изменить `Build Number` (раздел `General` из настроек выбранного таргета в XCode)
   Например, если номер текущей сборки 12, то следует изменить номер сборки на 13.
3. Выбрать устройство для сборки `"Any iOS Device"` из списка эмуляторов)
4. Выбрать в меню XCode `Product -> Archive`
5. Далее загружаем созданный [билд по инструкции](https://developer.apple.com/documentation/xcode/distributing-your-app-for-beta-testing-and-releases)

#### Android

1. Изменить номер сборки и версию (файл `android/app/build.gradle`)
2. Открыть проект в Android Studio
3. Выбрать в меню Build -> Generate Signed Bundle / APK
4. В появившемся окне выбрать "Android App Bundle"
5. Выбрать сгенерированный ключ подписи, заполнить поля (пароль, alias и тп), нажать далее
6. Выбрать нужный тип сборки
7. Файл формата .aab можно загружать в Google Play Console
