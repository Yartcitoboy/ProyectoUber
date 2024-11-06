@echo off
echo Instalando dependencias...

REM Instalación principal
npm ci --legacy-peer-deps

REM Instalación de paquetes específicos
npm install @capacitor/google-maps --legacy-peer-deps
npm install @ionic-native/barcode-scanner --legacy-peer-deps
npm install @googlemaps/js-api-loader --legacy-peer-deps
npm install --save-dev @types/googlemaps --legacy-peer-deps
npm install @ionic-native/core --legacy-peer-deps
npm install capacitor-native-biometric@4.2.2 --legacy-peer-deps
npm install ng-qrcode --save --legacy-peer-deps
npm install animate.css --legacy-peer-deps

echo.
echo Instalacion completada!
echo.
pause 