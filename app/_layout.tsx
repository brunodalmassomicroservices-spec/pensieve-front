import { Stack } from 'expo-router';
import { useState } from 'react';

export default function RootLayout() {
  // Altere para true para testar o fluxo logado futuramente
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      {/* Se não estiver logado, redireciona para a rota correta do grupo 
      {!isAuthenticated && <Redirect href="/(auth)/login" />}
*/}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </>
  );
}