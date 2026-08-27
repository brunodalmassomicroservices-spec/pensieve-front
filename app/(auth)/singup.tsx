import {
  StyleSheet
} from 'react-native';

// 🎨 Centralização de Cores (Tema Escuro)
const COLORS = {
  background: '#17231d',
  surface: '#17231d',
  border: '#304339',
  textPrimary: '#e8f4ed',
  textMuted: '#a4c6b6',
  placeholder: '#527265',
  brand: '#7ed7ae',
  brandText: '#10251a',
  brandSoft: '#245a40',
};

interface LoginScreenProps {
  onLogin?: (email: string, pass: string) => void;
  onNavigateToRegister?: () => void;
}

export default function SingUp({ onLogin, onNavigateToRegister }: LoginScreenProps) {
  
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
    paddingTop: 48,
    paddingHorizontal: 18,
    paddingBottom: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 32,
  },
  brand: {
    fontSize: 32,
    fontWeight: '650',
    letterSpacing: -1,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  subtitle: {
    color: COLORS.textMuted,
    fontSize: 15,
  },
  form: {
    gap: 18,
  },
  formGroup: {
    width: '100%',
  },
  label: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '650',
    marginBottom: 7,
  },
  input: {
    width: '100%',
    padding: 12,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    fontSize: 15,
  },
  forgotButton: {
    alignSelf: 'flex-end',
  },
  forgotText: {
    color: COLORS.brand,
    fontSize: 13,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 18,
    paddingBottom: 24,
    paddingTop: 12,
    backgroundColor: COLORS.background,
    gap: 10,
  },
  primaryButton: {
    backgroundColor: COLORS.brand,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: COLORS.brandText,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});