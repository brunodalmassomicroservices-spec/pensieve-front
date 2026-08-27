import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

const hoje = new Date();
const dia = hoje.getDate();
const ano = hoje.getFullYear();
const mesLiteral = hoje.toLocaleString('pt-BR', { month: 'long' });
const diaDaSemana = hoje.toLocaleString('pt-BR', { weekday: 'long' });

export default function Index() {
  const progress = 0;

  const reviews = [
    { id: '1', title: 'asdfa', subject: 'Arquitetura de sistemas', interval: 'D+1' },
    { id: '2', title: 'asdfa', subject: 'Arquitetura de sistemas', interval: 'D+7' },
    { id: '3', title: 'fasdfasdfa', subject: 'Arquitetura de sistemasfa', interval: 'D+1' },
    { id: '4', title: 'fasdfasdfa', subject: 'Arquitetura de sistemasfa', interval: 'D+1' },
    { id: '5', title: 'fasdfasdfa', subject: 'Arquitetura de sistemasfa', interval: 'D+1' },
    { id: '6', title: 'fasdfasdfa', subject: 'Arquitetura de sistemasfa', interval: 'D+1' },
    { id: '7', title: 'fasdfasdfa', subject: 'Arquitetura de sistemasfa', interval: 'D+1' },
    { id: '8', title: 'fasdfasdfa', subject: 'Arquitetura de sistemasfa', interval: 'D+1' },
  ];

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <Text style={styles.dateText}>
        {diaDaSemana.charAt(0).toUpperCase() + diaDaSemana.slice(1)}, {dia} de {mesLiteral} de {ano}
      </Text>
      <Text style={styles.title}>Sua revisão de hoje</Text>

      {/* Progresso */}
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.subtitle}>0 de 3 concluídas</Text>
          <Text style={styles.subtitle}>{progress}%</Text>
        </View>

        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
      </View>

      {/* Lista de Cards */}
      <ScrollView style={styles.reviewList}>
        {reviews.map((item) => (
          <TouchableOpacity key={item.id} style={styles.reviewCard} activeOpacity={0.7}>
            <View style={styles.dot} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubject}>{item.subject}</Text>
            </View>
            <Text style={styles.cardInterval}>{item.interval}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Ação */}
      <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
        <Text style={styles.primaryButtonText}>Começar revisão</Text>
      </TouchableOpacity>
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

  // 2. Tipografia
  dateText: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginBottom: 4,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: COLORS.textMuted,
    fontSize: 13,
  },

  // 3. Progresso
  progressContainer: {
    width: '100%',
    marginTop: 16,
    marginBottom: 23,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBarTrack: {
    height: 7,
    width: '100%',
    backgroundColor: COLORS.progressTrack,
    borderRadius: 99,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.brand,
    borderRadius: 99,
  },

  // 4. Lista e Cards
  reviewList: {
    gap: 10,
  },
  reviewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 15,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.badgeWarning,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  cardSubject: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginTop: 3,
  },
  cardInterval: {
    color: COLORS.textMuted,
    fontSize: 13,
  },

  // 5. Botões
  primaryButton: {
    backgroundColor: COLORS.brand,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 22,
  },
  primaryButtonText: {
    color: COLORS.brandText,
    fontSize: 16,
    fontWeight: '600',
  },
});