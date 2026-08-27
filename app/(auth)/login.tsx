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

const COLORS = {
  background: '#17231d',
  surface: '#17231d',
  border: '#304339',
  textPrimary: '#e8f4ed',
  textMuted: '#a4c6b6',
  placeholder: '#527265',
  brand: '#7ed7ae',
  brandText: '#10251a',
};

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    
    router.replace('/(tabs)');
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
        <View style={styles.header}>
          <Text style={styles.brand}>Acesse sua Digital Pensieve</Text>
        </View>

        <View style={styles.form}>
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
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Sua senha secreta"
              placeholderTextColor={COLORS.placeholder}
              secureTextEntry
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.8}
          onPress={handleLogin}
        >
          <Text style={styles.primaryButtonText}>Entrar</Text>
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
   paddingTop: 80,
   paddingHorizontal: 20,
   paddingBottom: 24,
  },
  header: {
    marginBottom: 32,
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
  label: {
   color: COLORS.textPrimary,
   fontSize: 14,
   fontWeight: '600',
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
  footer: {
    paddingHorizontal: 18,
    paddingBottom: 40,
    paddingTop: 12,
    backgroundColor: COLORS.background,
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
});