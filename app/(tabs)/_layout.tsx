import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs, router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';

const COLORS = {
  background: '#17231d',
  brand: '#7ed7ae',
  brandSoft: '#245a40',
  textMuted: '#a4c6b6',
  textPrimary: '#e8f4ed',
};

export default function TabLayout() {
  const { user, logout, updateUser } = useAuth();
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

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
          fontWeight: '600',
          fontSize: 20,
        },
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: '#304339',
        },
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
              <AntDesign name="arrow-left" size={20} color={COLORS.textPrimary} />
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

      <Tabs.Screen
        name="sobre"
        options={{
          title: 'Sobre o Pensieve',
          tabBarLabel: 'Sobre',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.navigate('/(tabs)/revisar')}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <AntDesign name="arrow-left" size={20} color={COLORS.textPrimary} />
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

      {/* 3. Tela de Revisão: Mantida no roteador, mas OCULTA do Tab Bar */}
      <Tabs.Screen
        name="revisar"
        options={{
          title: 'Revisar',
          href: null, // <-- Remove o botão do Tab Bar inferior
          headerLeft: () => null,
        }}
      />

      {/* 4. Tela da Conta: Mantida no roteador, mas OCULTA do Tab Bar */}
      <Tabs.Screen
          name="conta"
          options={{
            headerTitle: 'Minha Conta',
            headerStyle: { backgroundColor: '#17231d' },
            headerTintColor: '#e8f4ed',
            headerShadowVisible: false,
            href: null, // <-- Remove o botão do Tab Bar inferior
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.navigate('/(tabs)/revisar')}
                style={styles.backButton}
                activeOpacity={0.7}
              >
                <AntDesign name="arrow-left" size={20} color={COLORS.textPrimary} />
              </TouchableOpacity>
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