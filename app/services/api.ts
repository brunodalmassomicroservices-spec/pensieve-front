import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Se estiver usando emulador Android use http://10.0.2.2:8080
// Para dispositivo físico via Expo Go, use o IP local da sua máquina (ex: http://192.168.x.x:8080)
const API_URL = 'http://10.0.2.2:8080/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
});

// Interceptor: adiciona o token Bearer em todas as chamadas automaticamente
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('user_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});