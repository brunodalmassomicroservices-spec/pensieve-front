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
  badgeBg: '#245a40',
};

export default function NovoGatilhoScreen() {
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [activeInput, setActiveInput] = useState<string | null>(null);

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
        {/* Badge de Estágio do Aprendizado */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>DIA 0 • SÍNTESE INICIAL</Text>
        </View>

        {/* Formulário */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Matéria</Text>
          <TextInput
            style={[
              styles.input,
              activeInput === 'subject' && styles.inputFocused,
            ]}
            value={subject}
            onChangeText={setSubject}
            onFocus={() => setActiveInput('subject')}
            onBlur={() => setActiveInput(null)}
            placeholder="Ex.: Arquitetura de sistemas"
            placeholderTextColor={COLORS.placeholder}
            returnKeyType="next"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Palavra-gatilho</Text>
          <TextInput
            style={[
              styles.input,
              activeInput === 'title' && styles.inputFocused,
            ]}
            value={title}
            onChangeText={setTitle}
            onFocus={() => setActiveInput('title')}
            onBlur={() => setActiveInput(null)}
            placeholder="Ex.: Idempotência"
            placeholderTextColor={COLORS.placeholder}
            returnKeyType="next"
          />
          <Text style={styles.fieldHelp}>
            Use um termo curto que faça você recuperar o conceito.
          </Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Anotação</Text>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              activeInput === 'notes' && styles.inputFocused,
            ]}
            value={notes}
            onChangeText={setNotes}
            onFocus={() => setActiveInput('notes')}
            onBlur={() => setActiveInput(null)}
            placeholder="Registre sua síntese do conceito."
            placeholderTextColor={COLORS.placeholder}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Botão posicionado logo abaixo do formulário */}
        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
          <Text style={styles.primaryButtonText}>Salvar e agendar revisões</Text>
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
    paddingTop: 12,
    paddingHorizontal: 18,
    paddingBottom: 24,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.badgeBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 20,
  },
  badgeText: {
    color: COLORS.brand,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  formGroup: {
    marginBottom: 18,
  },
  label: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 7,
  },
  input: {
    width: '100%',
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    fontSize: 15,
  },
  inputFocused: {
    borderColor: COLORS.borderActive,
  },
  textArea: {
    height: 110,
  },
  fieldHelp: {
    marginTop: 6,
    color: COLORS.textMuted,
    fontSize: 12,
    lineHeight: 16,
  },
  primaryButton: {
    backgroundColor: COLORS.brand,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  primaryButtonText: {
    color: COLORS.brandText,
    fontSize: 16,
    fontWeight: '600',
  },
});