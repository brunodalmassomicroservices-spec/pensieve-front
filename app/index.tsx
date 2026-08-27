import { StyleSheet, Text, View } from 'react-native';

// 🎨 Centralização de Cores (Tema Escuro)
const COLORS = {
  background: '#17231d',
  surface: '#17231d',
  border: '#304339',
  textPrimary: '#e8f4ed',
  textMuted: '#a4c6b6',
  brand: '#7ed7ae',
  brandText: '#10251a',
  progressTrack: '#26362e',
  badgeWarning: '#e3aa39',
};

export default function Index() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sua revisão de hoje</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // 1. Estrutura Principal
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
  },
});