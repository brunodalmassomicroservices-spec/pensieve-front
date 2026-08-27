import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
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

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar visibilidade da senha

  // Função para gerar senha forte aleatória
  const generateStrongPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let newPassword = '';
    for (let i = 0; i < 12; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
  };

  const handleRegister = () => {
    // Insira a lógica de cadastro no seu backend/serviço aqui
    // Exemplo de redirecionamento após cadastro com sucesso:
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
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View style={styles.title}>
            <AntDesign name="arrow-left" size={24} color="#e8f4ed" onPress={() => router.push('/(auth)/login')}/>
            <Text style={styles.brand}>Pensieve</Text>
          </View>
          
          <Text style={styles.subtitle}>Crie sua conta na Digital Pensieve</Text>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nome completo</Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Ex.: Nome completo"
              placeholderTextColor={COLORS.placeholder}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="seuemail@exemplo.com"
              placeholderTextColor={COLORS.placeholder}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
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

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                placeholder="Digite uma senha"
                placeholderTextColor={COLORS.placeholder}
                secureTextEntry={!showPassword} // Oculta/revela conforme o estado
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
      </ScrollView>

      {/* Ações / Rodapé Fixo */}
      <View style={styles.footer}>
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
    marginTop: 40,
    paddingHorizontal: 18,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    flexDirection: "row",
    width: '100%',
    gap: 18,
    alignItems: 'center',
    marginBottom: 20,
  },
  brand: {
    fontSize: 28,
    fontWeight: 'bold',
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
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 7,
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
    padding: 12,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    fontSize: 15,
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
  /* Campo de Senha com Ícone Interno */
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    height: 49,
  },
  passwordInput: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 15,
    paddingHorizontal: 12,
    height: '100%',
  },
  eyeIcon: {
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});