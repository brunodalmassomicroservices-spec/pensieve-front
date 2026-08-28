import { AuthProvider, useAuth } from '../app/context/AuthContext';

import { Stack, router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

function RootLayoutNav() {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace('/(auth)/login');
      } else {
        router.replace('/(tabs)/revisar');
      }
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#17231d' }}>
        <ActivityIndicator size="large" color="#7ed7ae" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ animation: 'none' }}/>
      <Stack.Screen name="(tabs)" options={{ animation: 'none' }}/>
      <Stack.Screen
        name="conta"
        options={{
          headerShown: true,
          headerTitle: 'Minha Conta',
          headerStyle: { backgroundColor: '#17231d' },
          headerTintColor: '#e8f4ed',
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}