import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface UserData {
  userId: string;
  name: string;
  email: string;
}

interface AuthContextData {
  user: UserData | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  updateUser: (email: string, pass: string) => Promise<void>;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carrega os dados persistidos ao abrir o aplicativo
  useEffect(() => {
    async function loadStorageData() {
      try {
        const storedToken = await SecureStore.getItemAsync('user_token');
        const storedUser = await SecureStore.getItemAsync('user_data');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Erro ao carregar dados do SecureStore', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadStorageData();
  }, []);

  const login = async (email: string, pass: string) => {
    const response = await api.post('/auth/login', {
      email,
      password: pass,
    });

    const { token: apiToken, userId, name, email: userEmail } = response.data;
    const userData: UserData = { userId, name, email: userEmail };

    // Persiste no dispositivo de forma segura
    await SecureStore.setItemAsync('user_token', apiToken);
    await SecureStore.setItemAsync('user_data', JSON.stringify(userData));

    setToken(apiToken);
    setUser(userData);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('user_token');
    await SecureStore.deleteItemAsync('user_data');
    setToken(null);
    setUser(null);
  };

  // Adicione esta função ao contexto em context/AuthContext.tsx
  const updateUser = async (name: string, pass: String) => {

    if (user) {
      const updatedUserData = { ...user, name };
      await SecureStore.setItemAsync('user_data', JSON.stringify(updatedUserData));
      setUser(updatedUserData);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        updateUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);