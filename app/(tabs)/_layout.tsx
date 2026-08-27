import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs, router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// 🎨 Centralização de Cores
const COLORS = {
  background: '#17231d',
  brand: '#7ed7ae',
  brandSoft: '#245a40',
  textMuted: '#a4c6b6',
  textPrimary: '#e8f4ed',
};

export default function TabLayout() {
  const userInitial = 'A';

  const handleOpenAccount = () => {
    router.push('/conta'); // Redireciona para a rota da conta
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.brand,
        tabBarInactiveTintColor: COLORS.textMuted,
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerShadowVisible: false,
        headerTintColor: COLORS.textPrimary,
        headerTitleStyle: {
          fontWeight: '650',
          fontSize: 22,
        },
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: '#304339',
        },
        // Componente do avatar posicionado à direita do cabeçalho
        headerRight: () => (
          <TouchableOpacity
            style={styles.profile}
            onPress={handleOpenAccount}
            activeOpacity={0.7}
            accessibilityLabel="Perfil do usuário"
          >
            <Text style={styles.profileText}>
              {userInitial.charAt(0).toUpperCase()}
            </Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Revisar',
          tabBarLabel: 'Revisar',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'today' : 'today-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="novoGatilho"
        options={{
          title: 'Novo Gatilho',
          tabBarLabel: 'Novo Gatilho',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'add-circle' : 'add-circle-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="sobre"
        options={{
          title: 'Sobre',
          tabBarLabel: 'Sobre',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'help-circle' : 'help-circle-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  profile: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.brandSoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
  profileText: {
    color: COLORS.brand,
    fontSize: 14,
    fontWeight: '600',
  },
});