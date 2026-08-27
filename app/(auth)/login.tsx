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

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeInput, setActiveInput] = useState<string | null>(null);

  const router = useRouter();

  function handlerHome() {
    router.navigate('/(tabs)/revisar');
  }

  function handlerSingup() {
    router.navigate('/(auth)/signup');
  }

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
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.brandTitle}>Acesse sua Digital Pensieve</Text>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
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
            <Text style={styles.label}>Senha</Text>
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
                placeholder="Sua senha secreta"
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

            <TouchableOpacity style={styles.forgotPassword} activeOpacity={0.7}>
              <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão Entrar */}
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.8}
          onPress={handlerHome}
        >
          <Text style={styles.primaryButtonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Separador */}
        <View style={styles.containerSeparator}>
          <View style={styles.separator} />
          <Text style={styles.containerSeparatorText}>ou continuar com</Text>
          <View style={styles.separator} />
        </View>

        {/* Botões Sociais */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
            <Ionicons name="logo-google" size={26} color={COLORS.textPrimary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
            <Ionicons name="logo-apple" size={26} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Rodapé Aproximado com Espaçamento Correto */}
        <View style={styles.signupFooter}>
          <Text style={styles.footerText}>Não possui conta?</Text>
          <TouchableOpacity onPress={handlerSingup} activeOpacity={0.7}>
            <Text style={styles.footerButtonText}> Cadastre-se!</Text>
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
    paddingTop: 40,
    paddingBottom: 24,
    alignItems: 'center',
  },
  header: {
    alignSelf: 'flex-start',
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
    fontSize: 16,
    color: COLORS.textMuted,
  },
  form: {
    width: '100%',
    gap: 16,
  },
  formGroup: {
    width: '100%',
  },
  label: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 7,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    color: COLORS.brand,
    fontSize: 13,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: COLORS.brand,
    width: '100%',
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  primaryButtonText: {
    color: COLORS.brandText,
    fontSize: 16,
    fontWeight: '600',
  },
  containerSeparator: {
    width: '100%',
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  separator: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.border,
  },
  containerSeparatorText: {
    color: COLORS.textMuted,
    fontSize: 13,
  },
  socialContainer: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 16,
  },
  socialButton: {
    width: 80,
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
  },
  /* Ajuste no rodapé de cadastro: margem superior reduzida para aproximar do conteúdo */
  signupFooter: {
    marginTop: 28,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  footerButtonText: {
    color: COLORS.brand,
    fontSize: 14,
    fontWeight: '600',
  },
});