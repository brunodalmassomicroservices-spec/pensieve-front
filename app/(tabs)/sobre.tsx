import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 🎨 Centralização de Cores (Tema Escuro)
const COLORS = {
  background: '#17231d',
  surface: '#17231d',
  border: '#304339',
  textPrimary: '#e8f4ed',
  textMuted: '#a4c6b6',
  brand: '#7ed7ae',
  brandSoft: '#245a40',
};

export default function AboutScreen({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollArea} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Introdução */}
        <Text style={styles.paragraph}>
          O Penseira nasce de uma premissa clara: a sua memória é um músculo que pode ser treinado e dominado. Inspirado na Penseira, o lendário artefato usado para examinar e organizar pensamentos com clareza. Nosso aplicativo é a sua Digital Pensieve: uma ferramenta projetada para fortalecer sua retenção, reativar lembranças com velocidade e consolidar tudo o que você aprende no longo prazo.
        </Text>

        {/* Seção 1: A Ciência por Trás da Magia */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>A Ciência por Trás da Magia</Text>
          <Text style={styles.paragraph}>
            Por trás da experiência simples e ultrarrápida do aplicativo, existe um motor fundamentado em ciência cognitiva sólida.
          </Text>
          <Text style={styles.paragraph}>
            O Pensieve combina duas das estratégias de aprendizagem mais eficazes demonstradas pela neurociência: a <Text style={styles.highlight}>Repetição Espaçada (Spaced Repetition)</Text> e a <Text style={styles.highlight}>Evocação Ativa (Active Recall)</Text>.
          </Text>
          <Text style={styles.paragraph}>
            Ao utilizar apenas palavras-chave em vez de frases completas, você obriga seu cérebro a fazer o esforço consciente de reconstruir o conceito — em vez de apenas ler passivamente. É esse esforço metabólico do cérebro que fortalece as conexões sinápticas.
          </Text>
        </View>

        {/* Seção 2: Como Funciona */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Como Funciona</Text>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureLabel}>Gatilhos, Não Textos:</Text>
            <Text style={styles.featureText}>
              No Dia 0, você estuda um assunto e sintetiza o aprendizado em palavras-chave estratégicas.
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureLabel}>Intervalos Precisos:</Text>
            <Text style={styles.featureText}>
              O Pensieve assume o controle da régua do tempo, organizando revisões automáticas no ritmo ideal para vencer a curva do esquecimento (D+1, D+7, D+30 e D+180).
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureLabel}>Sessões Ultrarrápidas:</Text>
            <Text style={styles.featureText}>
              No Modo Foco, você visualiza o gatilho, força a recuperação da memória e valida a resposta em poucos segundos.
            </Text>
          </View>
        </View>

        {/* Conclusão / Slogan */}
        <View style={styles.callout}>
          <Text style={styles.calloutText}>
            Transforme conhecimento disperso em retenção de longo prazo. Esvazie a mente, ative os gatilhos e domine qualquer assunto.
          </Text>
        </View>
      </ScrollView>

      {/* Botão de Voltar/Fechar (Opção Fixo no Rodapé) */}
      {onBack && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.secondaryButton} onPress={onBack} activeOpacity={0.8}>
            <Text style={styles.secondaryButtonText}>Voltar</Text>
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
    paddingTop: 16,
    paddingHorizontal: 18,
    paddingBottom: 24,
  },
  eyebrow: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginBottom: 4,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  paragraph: {
    color: COLORS.textPrimary,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  bold: {
    fontWeight: 'bold',
  },
  highlight: {
    color: COLORS.brand,
    fontWeight: '600',
  },
  sectionCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    color: COLORS.brand,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  featureItem: {
    marginBottom: 12,
  },
  featureLabel: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  featureText: {
    color: COLORS.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  callout: {
    backgroundColor: COLORS.brandSoft,
    borderRadius: 14,
    padding: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  calloutText: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 18,
    paddingBottom: 24,
    paddingTop: 12,
    backgroundColor: COLORS.background,
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