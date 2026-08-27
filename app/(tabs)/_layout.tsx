import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs, router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const COLORS = {
  background: '#17231d',
  brand: '#7ed7ae',
  brandSoft: '#245a40',
  textMuted: '#a4c6b6',
  textPrimary: '#e8f4ed',
};

export default function TabLayout() {
  const userInitial = 'A';

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
        // Avatar fixo em todas as telas
        headerRight: () => (
          <TouchableOpacity
            style={styles.profile}
            onPress={() => router.push('/conta')}
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
        options={{
          title: 'revisasdfasdf',
          tabBarLabel: 'Revisar',
          headerLeft: () => null, // Oculta o botão de voltar nesta tela
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'today' : 'today-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />

      {/* Tela Novo Gatilho: COM a seta de voltar */}
      <Tabs.Screen
        name="novoGatilho"
        options={{
          title: 'Novo Gatilho',
          tabBarLabel: 'Novo Gatilho',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.navigate('/(tabs)/revisar')}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <AntDesign name="arrowleft" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'add-circle' : 'add-circle-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />

      {/* Tela Sobre: COM a seta de voltar */}
      <Tabs.Screen
        name="sobre"
        options={{
          title: 'Sobre',
          tabBarLabel: 'Sobre',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.navigate('/(tabs)/revisar')}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <AntDesign name="arrowleft" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
          ),
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
  backButton: {
    marginLeft: 18,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#245a40',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
  profileText: {
    color: '#7ed7ae',
    fontSize: 14,
    fontWeight: '600',
  },
});