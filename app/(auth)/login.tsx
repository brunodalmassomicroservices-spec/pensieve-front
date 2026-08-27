import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
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
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar visibilidade da senha
  
  const router = useRouter();

  function handlerHome() {
    router.navigate("/(tabs)/revisar");
  }

  function handlerSingup() {
    router.navigate("/(auth)/signup");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              placeholder="Sua senha secreta"
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
   
      <TouchableOpacity
        style={styles.primaryButton}
        activeOpacity={0.8}
        onPress={handlerHome}>
        <Text style={styles.primaryButtonText}>Entrar</Text>
      </TouchableOpacity>
      
      <View style={styles.containerSeparator}>
        <View style={styles.separator} />
        <Text style={styles.containerSeparatorText}>ou continuar com</Text>
        <View style={styles.separator} />
      </View>

      {/* Botões de Login Social */}
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
          <Ionicons name="logo-google" size={28} color={COLORS.textPrimary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
          <Ionicons name="logo-apple" size={28} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Rodapé / Link para Cadastro */}
      <View style={styles.signupFooter}>
        <Text style={styles.footerText}>Não possui conta?</Text>
        
        <TouchableOpacity onPress={handlerSingup} activeOpacity={0.7}>
          <Text style={styles.footerButtonText}> Cadastre-se!</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignSelf: 'flex-start',
    marginTop: 40,
  },
  brand: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: -1,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  form: {
    width: "100%",
    marginTop: 40,
    alignItems: 'center',
    gap: 18,   
  },
  formGroup: {
    width: '100%',
  },
  label: {
    width: '100%',
    color: COLORS.textPrimary,
    fontSize: 15,
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
    paddingHorizontal: 12,
    height: 49,
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
  primaryButton: {
    backgroundColor: COLORS.brand,
    width: '100%',
    height: 49,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  primaryButtonText: {
    color: COLORS.brandText,
    fontSize: 16,
    fontWeight: '600',
  },
  containerSeparator: {
    width: "100%",
    marginTop: 36,
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
    fontSize: 14,
    fontWeight: '400',
  },
  socialContainer: {
    marginTop: 24,
    flexDirection: 'row',
    gap: 16,
  },
  socialButton: {
    width: 80,
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
  },
  signupFooter: {
    marginTop: 'auto',
    marginBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.textMuted,
    fontSize: 15,
    fontWeight: '400',
  },
  footerButtonText: {
    color: COLORS.brand,
    fontSize: 15,
    fontWeight: '600',
  }
});