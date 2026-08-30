import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { getTodayReviews, ReviewItemResponse } from '../services/reviewService';

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

export default function RevisarScreen() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<ReviewItemResponse[]>([]);
  const [totalPending, setTotalPending] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const hoje = new Date();
  const dia = hoje.getDate();
  const ano = hoje.getFullYear();
  const mesLiteral = hoje.toLocaleString('pt-BR', { month: 'long' });
  const diaDaSemana = hoje.toLocaleString('pt-BR', { weekday: 'long' });

  const fetchReviews = async () => {
    if (!user?.userId) return;

    try {
      const data = await getTodayReviews(user.userId);
      setReviews(data.items || []);
      setTotalPending(data.total_pending || 0);
    } catch (error) {
      console.error('Erro ao buscar revisões de hoje:', error);
      setReviews([]);
      setTotalPending(0);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      fetchReviews();
    }, [user?.userId])
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchReviews();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={COLORS.brand}
          />
        }
      >
        <Text style={styles.dateText}>
          {diaDaSemana.charAt(0).toUpperCase() + diaDaSemana.slice(1)}, {dia} de{' '}
          {mesLiteral} de {ano}
        </Text>
        <Text style={styles.title}>Sua revisão de hoje</Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.subtitle}>
              {totalPending} {totalPending === 1 ? 'pendente' : 'pendentes'}
            </Text>
          </View>
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.brand} />
          </View>
        ) : reviews.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma revisão pendente para hoje! 🎉</Text>
          </View>
        ) : (
          <View style={styles.reviewList}>
            {reviews.map((item) => (
              <TouchableOpacity
                key={item.reviewId}
                style={styles.reviewCard}
                activeOpacity={0.7}
              >
                <View style={styles.dot} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.triggerTitle}</Text>
                  <Text style={styles.cardSubject}>{item.subject}</Text>
                </View>
                <Text style={styles.cardInterval}>D+{item.intervalDays}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {reviews.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
            <Text style={styles.primaryButtonText}>Começar revisão</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 12,
    paddingHorizontal: 18,
    paddingBottom: 20,
  },
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
  progressContainer: {
    width: '100%',
    marginTop: 16,
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitle: {
    color: COLORS.textMuted,
    fontSize: 13,
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: 15,
  },
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
  footer: {
    paddingHorizontal: 18,
    paddingBottom: 16,
    paddingTop: 10,
    backgroundColor: COLORS.background,
  },
  primaryButton: {
    backgroundColor: COLORS.brand,
    borderRadius: 14,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: COLORS.brandText,
    fontSize: 16,
    fontWeight: '600',
  },
});