import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 🎨 Centralização de Cores
const COLORS = {
  background: '#17231d',
  textPrimary: '#e8f4ed',
  brand: '#7ed7ae',
  brandSoft: '#245a40',
};

interface TopBarProps {
  title?: string;
  userInitial?: string;
  onProfilePress?: () => void;
}

export default function TopBar({
  title = 'Pensievi',
  userInitial = 'B',
  onProfilePress,
}: TopBarProps) {
  return (
    <View style={styles.topbar}>
      <Text style={styles.brand}>{title}</Text>

      <TouchableOpacity
        style={styles.profile}
        onPress={onProfilePress}
        activeOpacity={0.7}
        accessibilityLabel="Perfil do usuário"
      >
        <Text style={styles.profileText}>
          {userInitial.charAt(0).toUpperCase()}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: COLORS.background,
  },
  brand: {
    fontSize: 22,
    fontWeight: '650',
    letterSpacing: -0.8,
    color: COLORS.textPrimary,
  },
  profile: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.brandSoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: COLORS.brand,
    fontSize: 14,
    fontWeight: '600',
  },
});