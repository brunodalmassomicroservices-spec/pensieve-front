import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const COLORS = {
  background: '#17231d',
  surface: '#17231d',
  border: '#304339',
  borderActive: '#7ed7ae',
  textPrimary: '#e8f4ed',
  textMuted: '#a4c6b6',
  placeholder: '#6c8e7e',
  brand: '#7ed7ae',
  brandText: '#10251a',
};

export default function SignupScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeInput, setActiveInput] = useState<string | null>(null);

  const router = useRouter();

  const generateStrongPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let newPassword = '';
    for (let i = 0; i < 12; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
    setShowPassword(true);
  };

  const handleRegister = () => {
    router.replace('/(tabs)/revisar');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Cabeçalho alinhado com a marca */}
        <View style={styles.header}>
          <Text style={styles.brandTitle}>Crie sua conta na Digital Pensieve</Text>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nome completo</Text>
            <TextInput
              style={[
                styles.input,
                activeInput === 'fullName' && styles.inputFocused,
              ]}
              value={fullName}
              onChangeText={setFullName}
              onFocus={() => setActiveInput('fullName')}
              onBlur={() => setActiveInput(null)}
              placeholder="Ex.: Kryon Zex"
              placeholderTextColor={COLORS.placeholder}
              autoCapitalize="words"
              returnKeyType="next"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={[
                styles.input,
                activeInput === 'email' && styles.inputFocused,
              ]}
              value={email}
              onChangeText={setEmail}
              onFocus={() => setActiveInput('email')}
              onBlur={() => setActiveInput(null)}
              placeholder="seuemail@exemplo.com"
              placeholderTextColor={COLORS.placeholder}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />
          </View>

          <View style={styles.formGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Senha</Text>
              <TouchableOpacity
                style={styles.suggestButton}
                onPress={generateStrongPassword}
                activeOpacity={0.7}
              >
                <Ionicons name="key-outline" size={14} color={COLORS.brand} />
                <Text style={styles.suggestText}>Sugerir senha</Text>
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.passwordContainer,
                activeInput === 'password' && styles.inputFocused,
              ]}
            >
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setActiveInput('password')}
                onBlur={() => setActiveInput(null)}
                placeholder="Digite ou sugira uma senha"
                placeholderTextColor={COLORS.placeholder}
                secureTextEntry={!showPassword}
                returnKeyType="done"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={22}
                  color={COLORS.textMuted}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Ações agrupadas com o formulário */}
        <View style={styles.actionGroup}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.8}
            onPress={handleRegister}
          >
            <Text style={styles.primaryButtonText}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.7}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.secondaryButtonText}>Já tenho uma conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 28,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: -1,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  brandSubtitle: {
    fontSize: 15,
    color: COLORS.textMuted,
  },
  form: {
    width: '100%',
    gap: 16,
  },
  formGroup: {
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 7,
  },
  suggestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 7,
  },
  suggestText: {
    color: COLORS.brand,
    fontSize: 13,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    color: COLORS.textPrimary,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    fontSize: 15,
    paddingHorizontal: 14,
    height: 48,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    height: 48,
  },
  passwordInput: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 15,
    paddingHorizontal: 14,
    height: '100%',
  },
  inputFocused: {
    borderColor: COLORS.borderActive,
  },
  eyeIcon: {
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionGroup: {
    marginTop: 28,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: COLORS.brand,
    width: '100%',
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '100%',
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
});