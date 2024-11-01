import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'tu-app-name',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    Geolocation: {
      permissions: {
        'android': {
          'foregroundService': {
            'enabled': true,
            'notificationTitle': 'Usando ubicación',
            'notificationText': 'Rastreando ubicación'
          }
        }
      }
    }
  }
};

export default config;
