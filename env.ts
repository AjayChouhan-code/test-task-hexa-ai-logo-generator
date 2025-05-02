import Constants from 'expo-constants';

type EnvConfig = {
  API_KEY: string;
  AUTH_DOMAIN: string;
  PROJECT_ID: string;
  STORAGE_BUCKET: string;
  MESSAGING_SENDER_ID: string;
  APP_ID: string;
};

const config = Constants.expoConfig?.extra as EnvConfig;

export const env = {
  API_KEY: config.API_KEY,
  AUTH_DOMAIN: config.AUTH_DOMAIN,
  PROJECT_ID: config.PROJECT_ID,
  STORAGE_BUCKET: config.STORAGE_BUCKET,
  MESSAGING_SENDER_ID: config.MESSAGING_SENDER_ID,
  APP_ID: config.APP_ID,
};