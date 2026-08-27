import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
};

interface NewTriggerScreenProps {
  onSave?: (data: { subject: string; title: string; notes: string }) => void;
}

export default function NewTriggerScreen({ onSave }: NewTriggerScreenProps) {
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    if (onSave) {
      onSave({ subject, title, notes });
    }
  };

  return (
    <View style={styles.container}>

        {/* Cabeçalho */}
        <Text style={styles.eyebrow}>Dia 0</Text>
        <Text style={styles.title}>Novo gatilho</Text>

        {/* Formulário */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Matéria</Text>
          <TextInput
            style={styles.input}
            value={subject}
            onChangeText={setSubject}
            placeholder="Ex.: Arquitetura de sistemas"
            placeholderTextColor={COLORS.placeholder}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Palavra-gatilho</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Ex.: Idempotência"
            placeholderTextColor={COLORS.placeholder}
          />
          <Text style={styles.fieldHelp}>
            Use um termo curto que faça você recuperar o conceito.
          </Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Anotação</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Registre sua síntese do conceito."
            placeholderTextColor={COLORS.placeholder}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>


      {/* Botão Fixo no Rodapé */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.8}
          onPress={handleSubmit}
        >
          <Text style={styles.primaryButtonText}>Salvar e agendar revisões</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 16,
    paddingHorizontal: 18,
    paddingBottom: 16,
  },
  eyebrow: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginBottom: 4,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 18,
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
  textArea: {
    height: 100,
  },
  fieldHelp: {
    marginTop: 7,
    color: COLORS.textMuted,
    fontSize: 12,
    lineHeight: 16,
  },
  footer: {
    paddingHorizontal: 18,
    paddingBottom: 24,
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