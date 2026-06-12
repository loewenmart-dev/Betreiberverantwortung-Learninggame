import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { BADGES } from '../../lib/gameData';
import { de } from '../../i18n/de';

const styles = StyleSheet.create({
  page: { padding: 48, backgroundColor: '#F8FAFC', fontFamily: 'Helvetica' },
  border: { border: '4px solid #1E3A5F', borderRadius: 8, padding: 36, flex: 1 },
  header: { textAlign: 'center', marginBottom: 24 },
  title: { fontSize: 34, color: '#1E3A5F', fontFamily: 'Helvetica-Bold', letterSpacing: 4 },
  subtitle: { fontSize: 14, color: '#F59E0B', marginTop: 8, fontFamily: 'Helvetica-Bold' },
  name: { fontSize: 26, color: '#1E3A5F', textAlign: 'center', marginVertical: 18, fontFamily: 'Helvetica-Bold' },
  text: { fontSize: 12, color: '#334155', textAlign: 'center', lineHeight: 1.6 },
  badgeSection: { marginTop: 28 },
  badgeTitle: { fontSize: 13, color: '#1E3A5F', fontFamily: 'Helvetica-Bold', marginBottom: 8, textAlign: 'center' },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 6 },
  badge: {
    fontSize: 10,
    color: '#1E3A5F',
    backgroundColor: '#FEF3C7',
    padding: '4px 8px',
    borderRadius: 4,
    margin: 2,
  },
  footer: { marginTop: 'auto', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 24 },
  footerText: { fontSize: 10, color: '#64748B' },
  seal: {
    position: 'absolute',
    bottom: 60,
    right: 60,
    width: 70,
    height: 70,
    borderRadius: 35,
    border: '3px solid #F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sealText: { fontSize: 9, color: '#F59E0B', textAlign: 'center', fontFamily: 'Helvetica-Bold' },
});

function CertificateDocument({ name, badgeIds }: { name: string; badgeIds: string[] }) {
  const earned = BADGES.filter((b) => badgeIds.includes(b.id));
  const today = new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });
  return (
    <Document title="BETREIBERSTADT Zertifikat" author="Betreiberstadt">
      <Page size="A4" style={styles.page}>
        <View style={styles.border}>
          <View style={styles.header}>
            <Text style={styles.title}>{de.certificate.certTitle}</Text>
            <Text style={styles.subtitle}>{de.certificate.certSubtitle}</Text>
          </View>
          <Text style={styles.text}>Hiermit wird bestätigt, dass</Text>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.text}>{de.certificate.certText}</Text>

          <View style={styles.badgeSection}>
            <Text style={styles.badgeTitle}>{de.certificate.earnedBadges} ({earned.length})</Text>
            <View style={styles.badgeRow}>
              {earned.map((b) => (
                <Text key={b.id} style={styles.badge}>{b.name}</Text>
              ))}
            </View>
          </View>

          <View style={styles.seal}>
            <Text style={styles.sealText}>BETREIBER{'\n'}STADT{'\n'}★</Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>{de.certificate.date}: {today}</Text>
            <Text style={styles.footerText}>BETREIBERSTADT – Die Stadt der Verantwortung</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default function CertificateDownload({ name, badgeIds }: { name: string; badgeIds: string[] }) {
  return (
    <PDFDownloadLink
      document={<CertificateDocument name={name} badgeIds={badgeIds} />}
      fileName={`Betreiberstadt-Zertifikat-${name.replace(/\s+/g, '_')}.pdf`}
      className="block w-full bg-accent text-primary text-center font-bold py-3 rounded-xl hover:bg-accent/90"
    >
      {({ loading }) => (loading ? 'Erzeuge PDF…' : `📜 ${de.certificate.download}`)}
    </PDFDownloadLink>
  );
}
