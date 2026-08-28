import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

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
  brandSoft: '#245a40',
  danger: '#e74c3c',
  dangerSoft: '#3a1f1d',
};

export default function AccountScreen() {
  const { user, logout, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [activeInput, setActiveInput] = useState<string | null>(null);

  // Atualizar Nome de Exibição
  const handleUpdateName = async () => {
    if (!name.trim()) {
      Alert.alert('Atenção', 'O nome não pode ficar em branco.');
      return;
    }

    try {
      setIsUpdatingProfile(true);
      await api.put('/users/profile', { name });
      await updateUser(name, currentPassword);
      Alert.alert('Sucesso', 'Nome atualizado com sucesso!');
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Erro ao atualizar nome.';
      Alert.alert('Erro', message);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  // Alterar Senha
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      Alert.alert('Atenção', 'Preencha a senha atual e a nova senha.');
      return;
    }

    try {
      setIsUpdatingPassword(true);
      await api.put('/users/password', {
        currentPassword,
        newPassword,
      });
      Alert.alert('Sucesso', 'Senha alterada com sucesso!');
      setCurrentPassword('');
      setNewPassword('');
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Erro ao alterar a senha.';
      Alert.alert('Erro', message);
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  // Confirmar Logout
  const handleLogout = () => {
    Alert.alert('Sair da conta', 'Deseja realmente sair da sua Digital Pensieve?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: logout },
    ]);
  };

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

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
        {/* Cabeçalho de Perfil */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{userInitial}</Text>
          </View>
          <Text style={styles.profileName}>{user?.name || 'Usuário'}</Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
        </View>

        {/* Seção 1: Dados Pessoais */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados Pessoais</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Nome Completo</Text>
            <TextInput
              style={[
                styles.input,
                activeInput === 'name' && styles.inputFocused,
              ]}
              value={name}
              onChangeText={setName}
              onFocus={() => setActiveInput('name')}
              onBlur={() => setActiveInput(null)}
              placeholder="Seu nome"
              placeholderTextColor={COLORS.placeholder}
              returnKeyType="done"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>E-mail (não alterável)</Text>
            <TextInput
              style={[styles.input, styles.inputDisabled]}
              value={email}
              editable={false}
            />
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.8}
            onPress={handleUpdateName}
            disabled={isUpdatingProfile}
          >
            {isUpdatingProfile ? (
              <ActivityIndicator color={COLORS.brandText} />
            ) : (
              <Text style={styles.primaryButtonText}>Salvar Alterações</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Seção 2: Alterar Senha */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Segurança</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Senha Atual</Text>
            <View
              style={[
                styles.passwordContainer,
                activeInput === 'currentPassword' && styles.inputFocused,
              ]}
            >
              <TextInput
                style={styles.passwordInput}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                onFocus={() => setActiveInput('currentPassword')}
                onBlur={() => setActiveInput(null)}
                placeholder="Sua senha atual"
                placeholderTextColor={COLORS.placeholder}
                secureTextEntry={!showCurrentPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={showCurrentPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={COLORS.textMuted}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Nova Senha</Text>
            <View
              style={[
                styles.passwordContainer,
                activeInput === 'newPassword' && styles.inputFocused,
              ]}
            >
              <TextInput
                style={styles.passwordInput}
                value={newPassword}
                onChangeText={setNewPassword}
                onFocus={() => setActiveInput('newPassword')}
                onBlur={() => setActiveInput(null)}
                placeholder="Digite a nova senha"
                placeholderTextColor={COLORS.placeholder}
                secureTextEntry={!showNewPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowNewPassword(!showNewPassword)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={showNewPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={COLORS.textMuted}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.8}
            onPress={handleChangePassword}
            disabled={isUpdatingPassword}
          >
            {isUpdatingPassword ? (
              <ActivityIndicator color={COLORS.textPrimary} />
            ) : (
              <Text style={styles.secondaryButtonText}>Alterar Senha</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Botão de Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
          <Text style={styles.logoutButtonText}>Sair da conta</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 32,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.brandSoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: COLORS.brand,
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileName: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileEmail: {
    color: COLORS.textMuted,
    fontSize: 14,
    marginTop: 2,
  },
  section: {
    marginBottom: 28,
    gap: 14,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  formGroup: {
    width: '100%',
  },
  label: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 6,
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
  inputDisabled: {
    opacity: 0.6,
    backgroundColor: '#121c17',
  },
  inputFocused: {
    borderColor: COLORS.borderActive,
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
  eyeIcon: {
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: COLORS.brand,
    width: '100%',
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  primaryButtonText: {
    color: COLORS.brandText,
    fontSize: 15,
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
    marginTop: 4,
  },
  secondaryButtonText: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.dangerSoft,
    borderWidth: 1,
    borderColor: '#5a221e',
    borderRadius: 14,
    height: 48,
    marginTop: 8,
  },
  logoutButtonText: {
    color: COLORS.danger,
    fontSize: 15,
    fontWeight: '600',
  },
});