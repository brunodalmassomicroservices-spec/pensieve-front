import { useRouter } from 'expo-router';
import { useEffect } from 'react';

import LoginScreen from './(auth)/login';

export default function Index() {
  const router = useRouter();

  useEffect (() => {
    const timeout = setTimeout(() => {
      const isLoggedIn = false;

      if (isLoggedIn) {
        router.navigate("/(tabs)/revisar");
      } else {
        return <LoginScreen />
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [])

  return <LoginScreen />
}
