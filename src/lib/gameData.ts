import type {
  BadgeData,
  BuildingData,
  DecorationData,
  SidequestData,
  SkillBranchData,
} from '../types/game.types';

export const MAP_SIZE = 20;
export const PLAYER_START = { x: 10, y: 13 };

// ─────────────────────────────────────────────────────────────────
// GEBÄUDE & FRAGEN
// ─────────────────────────────────────────────────────────────────

export const BUILDINGS: BuildingData[] = [
  {
    id: 'rathaus',
    name: 'Rathaus',
    emoji: '🏠',
    theme: 'Einführung & Überblick Betreiberverantwortung',
    description: 'Hier beginnt deine Reise: Was bedeutet Betreiberverantwortung überhaupt?',
    unlockLevel: 0,
    position: { x: 8, y: 2 },
    size: { w: 4, h: 3 },
    npcName: 'Stadtdirektorin Weber',
    npcIntro:
      'Willkommen in Betreiberstadt! Ich bin Stadtdirektorin Weber. Bevor du Verantwortung für unsere Stadt übernehmen kannst, musst du verstehen, was Betreiberverantwortung bedeutet. Bist du bereit für deine erste Aufgabe?',
    npcOutro:
      'Hervorragend! Du hast die Grundidee verstanden: Wer eine Anlage betreibt, trägt Verantwortung für ihre Sicherheit. Besuche als Nächstes die Grundschule, um dein Wissen zu vertiefen!',
    color: '#1E3A5F',
    questions: [
      {
        id: 'rathaus-1',
        type: 'multiple-choice',
        text: 'Was beschreibt der Begriff „Betreiberverantwortung" am treffendsten?',
        options: [
          { text: 'Die Pflicht des Herstellers, fehlerfreie Produkte zu liefern', correct: false },
          {
            text: 'Die Gesamtheit der Pflichten dessen, der eine Anlage tatsächlich betreibt – insbesondere für deren sicheren Zustand und Betrieb',
            correct: true,
          },
          { text: 'Die Versicherungspflicht für Immobilieneigentümer', correct: false },
          { text: 'Die Pflicht der Behörden, Anlagen regelmäßig zu kontrollieren', correct: false },
        ],
        explanation:
          'Betreiberverantwortung umfasst alle Rechtspflichten, die mit dem Betrieb baulicher und technischer Anlagen verbunden sind – von der Verkehrssicherung über Prüfpflichten bis zur Dokumentation.',
        lawHint: 'Vgl. u. a. § 823 BGB (Verkehrssicherungspflicht), BetrSichV, ArbSchG.',
      },
      {
        id: 'rathaus-2',
        type: 'true-false',
        text: 'Betreiberverantwortung betrifft nur große Industrieanlagen – ein normales Bürogebäude ist davon nicht betroffen.',
        options: [
          { text: 'Wahr', correct: false },
          { text: 'Falsch', correct: true },
        ],
        explanation:
          'Falsch! Jedes Gebäude mit technischen Anlagen (Heizung, Aufzug, Elektroinstallation, Brandschutzeinrichtungen …) unterliegt der Betreiberverantwortung – auch ein kleines Bürogebäude.',
      },
      {
        id: 'rathaus-3',
        type: 'multiple-choice',
        text: 'Welches Instrument ist die zentrale Grundlage, um Pflichten und Prüffristen für Arbeitsmittel festzulegen?',
        options: [
          { text: 'Die Hausordnung', correct: false },
          { text: 'Die Gefährdungsbeurteilung', correct: true },
          { text: 'Der Mietvertrag', correct: false },
          { text: 'Die Bauakte', correct: false },
        ],
        explanation:
          'Die Gefährdungsbeurteilung nach § 3 BetrSichV bzw. § 5 ArbSchG ist das zentrale Instrument: Aus ihr leiten sich Schutzmaßnahmen, Prüffristen und Qualifikationsanforderungen ab.',
        lawHint: '§ 3 BetrSichV: „Der Arbeitgeber hat … eine Gefährdungsbeurteilung durchzuführen."',
      },
      {
        id: 'rathaus-4',
        type: 'multiple-choice',
        text: 'Warum ist eine lückenlose Dokumentation für den Betreiber so wichtig?',
        options: [
          { text: 'Sie ist nur für die Buchhaltung relevant', correct: false },
          {
            text: 'Sie dient im Schadensfall als Nachweis, dass der Betreiber seinen Pflichten nachgekommen ist (Entlastungsbeweis)',
            correct: true,
          },
          { text: 'Sie ersetzt die tatsächliche Durchführung von Prüfungen', correct: false },
          { text: 'Sie ist gesetzlich nirgends gefordert', correct: false },
        ],
        explanation:
          'Im Schadensfall gilt: Was nicht dokumentiert ist, gilt als nicht durchgeführt. Die Dokumentation ist der wichtigste Entlastungsbeweis des Betreibers.',
      },
      {
        id: 'rathaus-5',
        type: 'true-false',
        text: 'Der Betreiber kann seine Pflichten durch Delegation vollständig „loswerden" und trägt danach keinerlei Verantwortung mehr.',
        options: [
          { text: 'Wahr', correct: false },
          { text: 'Falsch', correct: true },
        ],
        explanation:
          'Falsch! Auch bei wirksamer Delegation verbleiben beim Betreiber immer Auswahl-, Organisations- und Überwachungspflichten. Verantwortung lässt sich delegieren – aber nie vollständig abgeben.',
      },
    ],
  },
  {
    id: 'grundschule',
    name: 'Grundschule',
    emoji: '🏫',
    theme: 'Grundlagen: Was ist Betreiberverantwortung?',
    description: 'Wer ist Betreiber? Was sind Betreiberpflichten? Rechtliche Grundlagen.',
    unlockLevel: 0,
    position: { x: 2, y: 6 },
    size: { w: 3, h: 2 },
    npcName: 'Lehrer Hoffmann',
    npcIntro:
      'Hallo! Ich bin Lehrer Hoffmann. In meiner Klasse lernst du das Einmaleins der Betreiberverantwortung: Wer ist eigentlich Betreiber? Und welche Pflichten hat er? Setz dich – die Stunde beginnt!',
    npcOutro:
      'Klasse, du hast die Grundlagen gemeistert! Mit diesem Fundament kannst du nun die schwierigeren Gebäude der Stadt erkunden. Viel Erfolg!',
    color: '#B45309',
    questions: [
      {
        id: 'grundschule-1',
        type: 'multiple-choice',
        text: 'Wer gilt als Betreiber einer technischen Anlage?',
        options: [
          { text: 'Immer der Eigentümer der Immobilie', correct: false },
          { text: 'Wer die tatsächliche Sachherrschaft und Nutzungsmacht ausübt', correct: true },
          { text: 'Nur juristische Personen', correct: false },
          { text: 'Der Hersteller der Anlage', correct: false },
        ],
        explanation:
          'Der Betreiber ist die Person oder Organisation, die die Anlage tatsächlich nutzt und kontrolliert – unabhängig vom Eigentum.',
        lawHint:
          'Die Betreiberstellung knüpft an die tatsächliche Sachherrschaft an, nicht an das Eigentum (vgl. Rechtsprechung zu § 823 BGB).',
      },
      {
        id: 'grundschule-2',
        type: 'multiple-choice',
        text: 'Welche Verordnung regelt primär den sicheren Betrieb von Arbeitsmitteln?',
        options: [
          { text: 'DGUV Vorschrift 1', correct: false },
          { text: 'Betriebssicherheitsverordnung (BetrSichV)', correct: true },
          { text: 'Arbeitsstättenverordnung (ArbStättV)', correct: false },
          { text: 'Produkthaftungsgesetz', correct: false },
        ],
        explanation:
          'Die BetrSichV regelt die Bereitstellung und Benutzung von Arbeitsmitteln sowie den Betrieb überwachungsbedürftiger Anlagen.',
      },
      {
        id: 'grundschule-3',
        type: 'free-text',
        text: 'Was versteht man unter einer „übertragenen Unternehmerpflicht"? Nenne die wichtigsten Wirksamkeitsvoraussetzungen.',
        keywords: ['schriftlich', 'qualifiziert', 'verantwortung', 'befugnis', 'auswahl'],
        explanation:
          'Unternehmerpflichten können nach § 13 ArbSchG / DGUV V1 § 13 auf zuverlässige und fachkundige (qualifizierte) Personen übertragen werden. Die Übertragung muss schriftlich erfolgen, den Verantwortungsbereich und die Befugnisse klar festlegen – und der Unternehmer behält Auswahl- und Überwachungspflichten.',
        hint: 'Denke an die Form der Übertragung und an die Eignung der Person.',
      },
      {
        id: 'grundschule-4',
        type: 'multiple-choice',
        text: 'Was bedeutet „Verkehrssicherungspflicht"?',
        options: [
          { text: 'Die Pflicht, den Straßenverkehr rund um das Gebäude zu regeln', correct: false },
          {
            text: 'Wer eine Gefahrenquelle schafft oder unterhält, muss zumutbare Vorkehrungen treffen, um Schäden Dritter zu verhindern',
            correct: true,
          },
          { text: 'Die Pflicht, eine Haftpflichtversicherung abzuschließen', correct: false },
          { text: 'Eine reine Empfehlung ohne rechtliche Bindung', correct: false },
        ],
        explanation:
          'Die Verkehrssicherungspflicht (aus § 823 BGB entwickelt) verpflichtet jeden, der eine Gefahrenquelle beherrscht, Dritte vor daraus resultierenden Schäden zu schützen.',
        lawHint: '§ 823 Abs. 1 BGB – deliktische Haftung für Verletzung von Verkehrssicherungspflichten.',
      },
      {
        id: 'grundschule-5',
        type: 'true-false',
        text: 'In einem gemieteten Gebäude ist grundsätzlich der Mieter Betreiber der Anlagen, die er tatsächlich nutzt und beherrscht.',
        options: [
          { text: 'Wahr', correct: true },
          { text: 'Falsch', correct: false },
        ],
        explanation:
          'Wahr! Entscheidend ist die tatsächliche Sachherrschaft. Der Mieter betreibt die Anlagen in seinem Verfügungsbereich; je nach Mietvertrag können Pflichten zwischen Vermieter und Mieter aufgeteilt sein – das muss klar geregelt werden.',
      },
      {
        id: 'grundschule-6',
        type: 'multiple-choice',
        text: 'Welche drei Pflichten verbleiben beim Unternehmer auch nach wirksamer Pflichtenübertragung?',
        options: [
          { text: 'Auswahl-, Organisations- und Überwachungspflicht', correct: true },
          { text: 'Zahlungs-, Buchführungs- und Steuerpflicht', correct: false },
          { text: 'Keine – alle Pflichten gehen vollständig über', correct: false },
          { text: 'Nur die Pflicht zur jährlichen Betriebsfeier', correct: false },
        ],
        explanation:
          'Die Letztverantwortung bleibt: Der Unternehmer muss geeignete Personen auswählen, die Organisation sicherstellen und die Pflichterfüllung stichprobenartig überwachen.',
      },
    ],
    caseStudy: {
      scenario:
        'Herr Müller ist Geschäftsführer einer GmbH, die ein Bürogebäude gemietet hat. Im Mietvertrag steht, dass sich der Vermieter um die Instandhaltung der haustechnischen Anlagen kümmert. Eines Nachts verursacht die defekte Heizungsanlage einen Brand, bei dem ein Mitarbeiter der GmbH, der Überstunden machte, verletzt wird. Die Ermittlungen ergeben: Die Heizung wurde seit drei Jahren nicht gewartet. Herr Müller hatte einen tropfenden Heizkörper bemerkt, dies aber niemandem gemeldet. Ein externer Facility Manager war nicht beauftragt.',
      questions: [
        {
          id: 'grundschule-cs-1',
          type: 'multiple-choice',
          text: 'Wer ist in diesem Fall Betreiber der Heizungsanlage?',
          options: [
            { text: 'Ausschließlich der Vermieter, weil er Eigentümer ist', correct: false },
            {
              text: 'Es kommt auf die tatsächliche Sachherrschaft an – durch die vertragliche Regelung trägt der Vermieter die Instandhaltung, aber die GmbH bleibt für die sichere Nutzung in ihrem Bereich mitverantwortlich',
              correct: true,
            },
            { text: 'Der verletzte Mitarbeiter', correct: false },
            { text: 'Niemand – gemietete Anlagen haben keinen Betreiber', correct: false },
          ],
          explanation:
            'Mietvertragliche Regelungen verteilen Pflichten, heben aber die Verantwortung des Nutzers für seinen Herrschaftsbereich nicht auf. Beide Seiten tragen Pflichten.',
        },
        {
          id: 'grundschule-cs-2',
          type: 'multiple-choice',
          text: 'Welche Pflicht hatte Herr Müller bezüglich des tropfenden Heizkörpers?',
          options: [
            { text: 'Keine – Mängel gehen ihn nichts an', correct: false },
            {
              text: 'Eine Mängelanzeigepflicht: Erkannte Mängel müssen unverzüglich dem Vermieter gemeldet werden',
              correct: true,
            },
            { text: 'Er hätte die Heizung selbst reparieren müssen', correct: false },
            { text: 'Er hätte sofort das Gebäude abreißen lassen müssen', correct: false },
          ],
          explanation:
            'Der Mieter hat eine Anzeigepflicht (§ 536c BGB): Erkannte Mängel müssen dem Vermieter unverzüglich gemeldet werden. Das Unterlassen kann zur Mithaftung führen.',
          lawHint: '§ 536c BGB – Anzeigepflicht des Mieters bei Mängeln.',
        },
        {
          id: 'grundschule-cs-3',
          type: 'multiple-choice',
          text: 'Ändert sich die Haftungslage, wenn Herr Müller einen Facility Manager beauftragt hätte?',
          options: [
            { text: 'Ja, dann wäre Herr Müller von allen Pflichten vollständig befreit', correct: false },
            {
              text: 'Teilweise: Operative Pflichten gehen über, aber Auswahl-, Organisations- und Überwachungspflichten verbleiben bei Herrn Müller',
              correct: true,
            },
            { text: 'Nein, Delegation ist rechtlich unwirksam', correct: false },
            { text: 'Ja, dann haftet ausschließlich der Hersteller der Heizung', correct: false },
          ],
          explanation:
            'Delegation entlastet nur, wenn sie sorgfältig erfolgt – und auch dann bleiben Restpflichten. Ein vergessener oder schlecht ausgewählter Dienstleister entlastet nicht.',
        },
      ],
    },
  },
  {
    id: 'krankenhaus',
    name: 'Krankenhaus',
    emoji: '🏥',
    theme: 'Notfallsituationen & Prüfpflichten',
    description: 'Prüffristen, wiederkehrende Prüfungen, Verhalten bei Ausfall sicherheitsrelevanter Anlagen.',
    unlockLevel: 2,
    position: { x: 15, y: 5 },
    size: { w: 3, h: 2 },
    npcName: 'Dr. Yilmaz, Technische Leiterin',
    npcIntro:
      'Im Krankenhaus hängen Menschenleben an funktionierender Technik. Notstrom, Brandmeldeanlage, Druckbehälter – alles muss geprüft sein. Zeig mir, dass du Prüfpflichten und Notfallmanagement beherrschst!',
    npcOutro:
      'Sehr gut! Du weißt jetzt, dass Prüffristen keine Bürokratie sind, sondern Lebensversicherungen. Weiter so!',
    color: '#DC2626',
    questions: [
      {
        id: 'krankenhaus-1',
        type: 'multiple-choice',
        text: 'Eine Brandmeldeanlage (BMA) muss laut DIN 14675 mindestens wie oft gewartet werden?',
        options: [
          { text: 'Alle 2 Jahre', correct: false },
          { text: 'Jährlich', correct: true },
          { text: 'Alle 6 Monate', correct: false },
          { text: 'Nur bei Auffälligkeiten', correct: false },
        ],
        explanation:
          'DIN 14675 fordert mindestens eine jährliche Wartung der BMA durch eine zertifizierte Fachfirma – zusätzlich zu den vierteljährlichen Inspektionen nach DIN VDE 0833-1.',
        hint: 'Zusätzlich zur Wartung gibt es Inspektionen in kürzeren Intervallen.',
      },
      {
        id: 'krankenhaus-2',
        type: 'order',
        text: 'Die Notstromanlage des Krankenhauses fällt aus. Bringe die Sofortmaßnahmen in die richtige Reihenfolge:',
        orderItems: [
          'Gefahr für Patienten abwenden – kritische Bereiche (OP, Intensiv) sichern',
          'Technische Leitung und Krisenstab alarmieren',
          'Ursache lokalisieren und Wiederinbetriebnahme einleiten',
          'Behörden bzw. Aufsichtspersonen informieren (sofern meldepflichtig)',
          'Vorfall dokumentieren und Maßnahmen zur künftigen Vermeidung ableiten',
        ],
        explanation:
          'Immer zuerst: Menschen schützen. Dann Alarmierung, Ursachenbehebung, Meldepflichten und zuletzt die Dokumentation mit Lessons Learned.',
      },
      {
        id: 'krankenhaus-3',
        type: 'multiple-choice',
        text: 'Wer darf die Abnahmeprüfung einer ortsfesten Druckbehälteranlage durchführen?',
        options: [
          { text: 'Ein interner Techniker mit Meistertitel', correct: false },
          { text: 'Eine zugelassene Überwachungsstelle (ZÜS)', correct: true },
          { text: 'Der Hersteller', correct: false },
          { text: 'Der TÜV Süd ausschließlich', correct: false },
        ],
        explanation:
          'Überwachungsbedürftige Anlagen wie Druckbehälteranlagen müssen durch eine zugelassene Überwachungsstelle (ZÜS) geprüft werden – das kann TÜV, DEKRA oder eine andere zugelassene Stelle sein.',
        lawHint: '§ 15 BetrSichV – Prüfung vor Inbetriebnahme überwachungsbedürftiger Anlagen durch eine ZÜS.',
      },
      {
        id: 'krankenhaus-4',
        type: 'multiple-choice',
        text: 'Wer legt die Prüffristen für „normale" (nicht überwachungsbedürftige) Arbeitsmittel fest?',
        options: [
          { text: 'Die Berufsgenossenschaft per Einzelbescheid', correct: false },
          {
            text: 'Der Arbeitgeber/Betreiber selbst – auf Basis der Gefährdungsbeurteilung',
            correct: true,
          },
          { text: 'Der Hersteller verbindlich für alle Betreiber', correct: false },
          { text: 'Die Feuerwehr', correct: false },
        ],
        explanation:
          'Nach § 3 Abs. 6 BetrSichV ermittelt der Arbeitgeber Art, Umfang und Fristen erforderlicher Prüfungen selbst in der Gefährdungsbeurteilung. Herstellerangaben und Technische Regeln (TRBS) sind dabei Orientierung.',
      },
      {
        id: 'krankenhaus-5',
        type: 'true-false',
        text: 'Aufzugsanlagen sind überwachungsbedürftige Anlagen und müssen wiederkehrend durch eine ZÜS geprüft werden.',
        options: [
          { text: 'Wahr', correct: true },
          { text: 'Falsch', correct: false },
        ],
        explanation:
          'Wahr! Aufzüge unterliegen als überwachungsbedürftige Anlagen der wiederkehrenden Prüfung durch eine ZÜS: Hauptprüfung spätestens alle 2 Jahre, dazwischen eine Zwischenprüfung.',
      },
      {
        id: 'krankenhaus-6',
        type: 'multiple-choice',
        text: 'Eine sicherheitsrelevante Anlage (z. B. Sicherheitsbeleuchtung) fällt aus und kann nicht sofort repariert werden. Was ist die richtige Betreiber-Reaktion?',
        options: [
          { text: 'Nichts tun – der Ausfall wird schon niemandem auffallen', correct: false },
          {
            text: 'Gefährdung neu beurteilen, Kompensationsmaßnahmen festlegen (z. B. Brandwache, Sperrung), Reparatur priorisieren und alles dokumentieren',
            correct: true,
          },
          { text: 'Die Anlage aus dem Prüfbuch streichen', correct: false },
          { text: 'Nur ein Schild „Defekt" aufhängen', correct: false },
        ],
        explanation:
          'Bei Ausfall sicherheitsrelevanter Einrichtungen müssen unverzüglich kompensierende Maßnahmen getroffen und dokumentiert werden – bis die volle Funktion wiederhergestellt ist.',
      },
    ],
    caseStudy: {
      scenario:
        'Im Kreiskrankenhaus Betreiberstadt fällt freitags um 22 Uhr die Sicherheitsbeleuchtung im OP-Trakt aus. Der Haustechniker im Bereitschaftsdienst stellt fest, dass die Batterieanlage defekt ist – ein Ersatzteil ist erst Montag lieferbar. Die letzte dokumentierte Prüfung der Sicherheitsbeleuchtung liegt 26 Monate zurück, obwohl die Gefährdungsbeurteilung eine jährliche Prüfung vorsieht. Der Technische Leiter ist im Urlaub, eine Vertretungsregelung existiert nicht.',
      questions: [
        {
          id: 'krankenhaus-cs-1',
          type: 'multiple-choice',
          text: 'Welche Sofortmaßnahme ist am Wochenende vorrangig?',
          options: [
            { text: 'Abwarten bis Montag – Bestellung läuft ja', correct: false },
            {
              text: 'Kompensationsmaßnahmen einleiten: z. B. mobile Sicherheitsleuchten, ggf. Verschiebung planbarer OPs, Information der Verantwortlichen',
              correct: true,
            },
            { text: 'Den OP-Trakt heimlich weiterbetreiben', correct: false },
            { text: 'Die Feuerwehr dauerhaft im Haus stationieren', correct: false },
          ],
          explanation:
            'Der Betrieb darf nur weiterlaufen, wenn das Schutzziel anderweitig erreicht wird. Kompensationsmaßnahmen plus Risikoabwägung sind Pflicht.',
        },
        {
          id: 'krankenhaus-cs-2',
          type: 'multiple-choice',
          text: 'Welches Organisationsversagen zeigt der Fall besonders deutlich?',
          options: [
            { text: 'Zu viele Prüfungen wurden durchgeführt', correct: false },
            {
              text: 'Überschrittene Prüffrist und fehlende Vertretungsregelung – ein klassisches Organisationsverschulden',
              correct: true,
            },
            { text: 'Der Haustechniker hätte gar nicht reagieren dürfen', correct: false },
            { text: 'Es gibt kein Versagen – Pech kann jeden treffen', correct: false },
          ],
          explanation:
            'Die um 14 Monate überzogene Prüffrist und die fehlende Urlaubsvertretung sind Organisationsmängel, für die die Leitung haftet (Organisationsverschulden).',
        },
        {
          id: 'krankenhaus-cs-3',
          type: 'multiple-choice',
          text: 'Wie hätte der Betreiber den Vorfall strukturell verhindern können?',
          options: [
            { text: 'Durch ein Verbot von Nachtdiensten', correct: false },
            {
              text: 'Durch ein funktionierendes Instandhaltungs- und Prüffristenmanagement (CAFM), klare Verantwortlichkeiten und Vertretungsregelungen',
              correct: true,
            },
            { text: 'Durch den Verzicht auf Sicherheitsbeleuchtung', correct: false },
            { text: 'Durch mündliche Absprachen ohne Dokumentation', correct: false },
          ],
          explanation:
            'Strukturierte Betreiberorganisation heißt: Prüffristen systematisch überwachen, Verantwortliche benennen, Vertretungen regeln, Eskalationswege definieren.',
        },
      ],
    },
  },
  {
    id: 'gerichtssaal',
    name: 'Gerichtssaal',
    emoji: '⚖️',
    theme: 'Haftung, Rechtspflichten, Konsequenzen',
    description: 'Straf- und zivilrechtliche Haftung, Exkulpation, Organisationsverschulden.',
    unlockLevel: 3,
    position: { x: 2, y: 11 },
    size: { w: 3, h: 2 },
    npcName: 'Richterin Brandt',
    npcIntro:
      'Erheben Sie sich! In meinem Gerichtssaal lernst du, was passiert, wenn Betreiberpflichten verletzt werden: Schadensersatz, Bußgelder – bis hin zur Freiheitsstrafe. Die Verhandlung ist eröffnet!',
    npcOutro:
      'Das Urteil lautet: bestanden! Du kennst nun die rechtlichen Konsequenzen von Pflichtverletzungen. Möge dieses Wissen dich stets zu sorgfältigem Handeln motivieren.',
    color: '#7C3AED',
    questions: [
      {
        id: 'gerichtssaal-1',
        type: 'multiple-choice',
        text: 'Ein Mitarbeiter verletzt sich an einer nicht geprüften Maschine. Der Betreiber behauptet, er habe einen Techniker damit beauftragt. Reicht das als Entlastung?',
        options: [
          { text: 'Ja, die Verantwortung liegt beim Techniker', correct: false },
          {
            text: 'Nur wenn die Übertragung schriftlich, vollständig und an eine qualifizierte Person erfolgte',
            correct: true,
          },
          { text: 'Ja, Delegation befreit immer vom Verschulden', correct: false },
          { text: 'Nein, der Betreiber haftet immer persönlich, Delegation ist unwirksam', correct: false },
        ],
        explanation:
          'Eine Pflichtenübertragung entlastet nur bei sorgfältiger Auswahl, klarer (schriftlicher) Beauftragung, ausreichenden Befugnissen und fortlaufender Überwachung.',
        lawHint: '§ 13 Abs. 2 ArbSchG, § 13 DGUV Vorschrift 1 – Pflichtenübertragung.',
      },
      {
        id: 'gerichtssaal-2',
        type: 'multiple-choice',
        text: 'Was versteht man unter „Organisationsverschulden"?',
        options: [
          { text: 'Einen Fehler bei der Organisation der Weihnachtsfeier', correct: false },
          {
            text: 'Die Haftung der Unternehmensleitung, weil betriebliche Abläufe, Zuständigkeiten oder Kontrollen mangelhaft organisiert wurden',
            correct: true,
          },
          { text: 'Das Verschulden eines einzelnen Mitarbeiters', correct: false },
          { text: 'Eine Ordnungswidrigkeit im Straßenverkehr', correct: false },
        ],
        explanation:
          'Organisationsverschulden liegt vor, wenn ein Schaden auf mangelhafte betriebliche Organisation zurückgeht – z. B. fehlende Zuständigkeiten, keine Kontrollen, keine Vertretungsregelungen. Es trifft die Leitungsebene direkt.',
        lawHint: '§ 130 OWiG – Verletzung der Aufsichtspflicht; § 831 BGB – Haftung für Verrichtungsgehilfen.',
      },
      {
        id: 'gerichtssaal-3',
        type: 'multiple-choice',
        text: 'Welche Rechtsfolgen drohen einem Betreiber bei grober Pflichtverletzung mit Personenschaden?',
        options: [
          { text: 'Maximal eine mündliche Verwarnung', correct: false },
          {
            text: 'Zivilrechtlicher Schadensersatz, Bußgelder, Regress der Unfallversicherung und strafrechtliche Verfolgung (z. B. fahrlässige Körperverletzung)',
            correct: true,
          },
          { text: 'Nur der Verlust von Bonuspunkten bei der Versicherung', correct: false },
          { text: 'Keine – Personenschäden deckt immer die Berufsgenossenschaft ab', correct: false },
        ],
        explanation:
          'Pflichtverletzungen können parallel zivilrechtliche (§ 823 BGB), ordnungsrechtliche (§ 130 OWiG, bis 1 Mio. € Bußgeld) und strafrechtliche Konsequenzen (§§ 222, 229 StGB) haben. Bei grober Fahrlässigkeit droht zudem Regress des Unfallversicherungsträgers (§ 110 SGB VII).',
      },
      {
        id: 'gerichtssaal-4',
        type: 'true-false',
        text: 'Eine Führungskraft kann sich auch durch Unterlassen strafbar machen, wenn sie als „Garant" für die Sicherheit verantwortlich war.',
        options: [
          { text: 'Wahr', correct: true },
          { text: 'Falsch', correct: false },
        ],
        explanation:
          'Wahr! Wer eine Garantenstellung innehat (z. B. als verantwortlicher Betreiber), macht sich nach § 13 StGB strafbar, wenn er gebotene Sicherheitsmaßnahmen unterlässt und dadurch ein Schaden eintritt.',
        lawHint: '§ 13 StGB – Begehen durch Unterlassen (Garantenstellung).',
      },
      {
        id: 'gerichtssaal-5',
        type: 'multiple-choice',
        text: 'Was bedeutet „Exkulpation" im Zusammenhang mit § 831 BGB?',
        options: [
          {
            text: 'Der Geschäftsherr kann sich entlasten, wenn er nachweist, dass er seine Gehilfen sorgfältig ausgewählt und überwacht hat',
            correct: true,
          },
          { text: 'Eine besondere Form der Kündigung', correct: false },
          { text: 'Die automatische Haftungsbefreiung durch Versicherungsabschluss', correct: false },
          { text: 'Ein Begriff aus dem Steuerrecht', correct: false },
        ],
        explanation:
          'Exkulpation = Entlastungsbeweis. Genau hier zahlt sich Dokumentation aus: Wer Auswahl, Einweisung und Überwachung nachweisen kann, entgeht der Haftung für Verrichtungsgehilfen.',
        lawHint: '§ 831 Abs. 1 Satz 2 BGB – Entlastungsbeweis des Geschäftsherrn.',
      },
      {
        id: 'gerichtssaal-6',
        type: 'free-text',
        text: 'Nenne mindestens zwei Voraussetzungen, damit eine Delegation von Betreiberpflichten haftungsentlastend wirkt.',
        keywords: ['schriftlich', 'qualifiziert', 'überwachung', 'auswahl', 'befugnis', 'fachkunde'],
        explanation:
          'Wirksame Delegation erfordert: sorgfältige Auswahl einer fachkundigen/zuverlässigen Person, schriftliche Übertragung mit klarem Aufgaben- und Verantwortungsbereich, Ausstattung mit Befugnissen und Mitteln sowie regelmäßige Überwachung.',
        bonusSkill: 'jurist',
      },
    ],
    caseStudy: {
      scenario:
        'Die Maschinenbau Krause GmbH betreibt eine Lagerhalle mit elektrisch betriebenen Rolltoren. Geschäftsführer Krause hat die Verantwortung für die Toranlagen mündlich „dem Hausmeister übergeben". Der Hausmeister hat keine Ausbildung für Toranlagen und erhielt nie ein Budget für Wartungen. Die jährliche Prüfung der kraftbetätigten Tore (ASR A1.7) unterblieb vier Jahre lang. Ein Tor stürzt ab und verletzt eine Speditionsfahrerin schwer. Die Staatsanwaltschaft ermittelt gegen Krause wegen fahrlässiger Körperverletzung.',
      questions: [
        {
          id: 'gerichtssaal-cs-1',
          type: 'multiple-choice',
          text: 'War die Pflichtenübertragung an den Hausmeister wirksam?',
          options: [
            { text: 'Ja, mündliche Übertragung genügt immer', correct: false },
            {
              text: 'Nein – sie war weder schriftlich noch an eine qualifizierte Person gerichtet, und es fehlten Budget und Befugnisse',
              correct: true,
            },
            { text: 'Ja, weil der Hausmeister sie nicht ablehnte', correct: false },
            { text: 'Unklar – das spielt für die Haftung keine Rolle', correct: false },
          ],
          explanation:
            'Es fehlte an allem: Schriftform, Qualifikation, Befugnissen und Mitteln. Krause kann sich nicht entlasten – die Verantwortung blieb vollständig bei ihm.',
        },
        {
          id: 'gerichtssaal-cs-2',
          type: 'multiple-choice',
          text: 'Mit welchen parallelen Verfahren muss Krause rechnen?',
          options: [
            { text: 'Nur mit dem Strafverfahren', correct: false },
            {
              text: 'Strafverfahren, zivilrechtliche Schadensersatz-/Schmerzensgeldansprüche, Regress der Berufsgenossenschaft und ggf. Bußgeld nach § 130 OWiG',
              correct: true,
            },
            { text: 'Nur mit einer Ermahnung durch die IHK', correct: false },
            { text: 'Mit gar keinen – die Fahrerin war betriebsfremd', correct: false },
          ],
          explanation:
            'Gerade weil die Fahrerin betriebsfremd ist, greift das Haftungsprivileg der gesetzlichen Unfallversicherung nicht vollständig – zivilrechtliche Ansprüche kommen voll zum Tragen.',
        },
        {
          id: 'gerichtssaal-cs-3',
          type: 'multiple-choice',
          text: 'Welche Maßnahme hätte Krause am wirksamsten geschützt?',
          options: [
            { text: 'Eine bessere Ausrede vor Gericht', correct: false },
            {
              text: 'Ein dokumentiertes Wartungs- und Prüfkonzept mit schriftlicher Beauftragung einer fachkundigen Stelle und jährlicher Torprüfung',
              correct: true,
            },
            { text: 'Ein Schild „Benutzung auf eigene Gefahr"', correct: false },
            { text: 'Die Tore einfach immer offen lassen', correct: false },
          ],
          explanation:
            'Kraftbetätigte Tore müssen nach ASR A1.7 jährlich durch einen Sachkundigen geprüft werden. Ein dokumentiertes Prüfmanagement hätte den Unfall verhindert und Krause entlastet.',
        },
      ],
    },
  },
  {
    id: 'fabrik',
    name: 'Fabrik',
    emoji: '🏭',
    theme: 'Technische Anlagen: DGUV, ASR, BetrSichV',
    description: 'Das Regelwerk für technische Anlagen und Arbeitsmittel in der Praxis.',
    unlockLevel: 3,
    position: { x: 15, y: 10 },
    size: { w: 3, h: 3 },
    npcName: 'Betriebsleiter Petrov',
    npcIntro:
      'Willkommen in der Fabrik! Hier laufen Maschinen rund um die Uhr – und jede einzelne braucht Prüfungen, Unterweisungen und eine saubere Gefährdungsbeurteilung. Pack mit an und zeig, was du drauf hast!',
    npcOutro:
      'Stark! Du verstehst jetzt das Zusammenspiel von BetrSichV, DGUV-Regelwerk und Technischen Regeln. Die Fabrik läuft sicher – dank Leuten wie dir.',
    color: '#475569',
    questions: [
      {
        id: 'fabrik-1',
        type: 'multiple-choice',
        text: 'Was zählt nach BetrSichV alles zu den „Arbeitsmitteln"?',
        options: [
          { text: 'Nur große Produktionsmaschinen', correct: false },
          {
            text: 'Werkzeuge, Geräte, Maschinen und Anlagen, die für die Arbeit verwendet werden – vom Hammer bis zur Gesamtanlage',
            correct: true,
          },
          { text: 'Nur elektrisch betriebene Geräte', correct: false },
          { text: 'Nur Fahrzeuge', correct: false },
        ],
        explanation:
          '§ 2 Abs. 1 BetrSichV definiert Arbeitsmittel sehr weit: Werkzeuge, Geräte, Maschinen oder Anlagen, die für die Arbeit verwendet werden.',
      },
      {
        id: 'fabrik-2',
        type: 'multiple-choice',
        text: 'Wer darf die wiederkehrende Prüfung eines „normalen" Arbeitsmittels (z. B. Regalanlage) durchführen?',
        options: [
          { text: 'Jeder Mitarbeiter ohne weitere Anforderungen', correct: false },
          {
            text: 'Eine „zur Prüfung befähigte Person" mit Berufsausbildung, Berufserfahrung und zeitnaher beruflicher Tätigkeit im Prüfgebiet',
            correct: true,
          },
          { text: 'Ausschließlich eine ZÜS', correct: false },
          { text: 'Nur der Hersteller', correct: false },
        ],
        explanation:
          'Für nicht überwachungsbedürftige Arbeitsmittel genügt eine „zur Prüfung befähigte Person" nach TRBS 1203 – mit den drei Säulen Ausbildung, Erfahrung, zeitnahe Tätigkeit.',
        hint: 'Die Anforderungen stehen in der TRBS 1203.',
      },
      {
        id: 'fabrik-3',
        type: 'true-false',
        text: 'Arbeitsstättenregeln (ASR) konkretisieren die Anforderungen der Arbeitsstättenverordnung; bei ihrer Einhaltung gilt die Vermutungswirkung.',
        options: [
          { text: 'Wahr', correct: true },
          { text: 'Falsch', correct: false },
        ],
        explanation:
          'Wahr! Wer die ASR einhält, kann davon ausgehen, die Anforderungen der ArbStättV zu erfüllen (Vermutungswirkung). Abweichungen sind möglich, müssen aber gleichwertig sicher sein – und das muss man nachweisen können.',
      },
      {
        id: 'fabrik-4',
        type: 'multiple-choice',
        text: 'Wie oft müssen Beschäftigte mindestens zu Sicherheit und Gesundheitsschutz unterwiesen werden?',
        options: [
          { text: 'Einmalig bei Einstellung – das reicht für immer', correct: false },
          { text: 'Vor Aufnahme der Tätigkeit und danach mindestens jährlich, zusätzlich bei Veränderungen', correct: true },
          { text: 'Alle 5 Jahre', correct: false },
          { text: 'Nur nach einem Unfall', correct: false },
        ],
        explanation:
          'Nach § 12 ArbSchG und § 4 DGUV Vorschrift 1 sind Unterweisungen vor Tätigkeitsaufnahme, bei Veränderungen und mindestens jährlich zu wiederholen – und zu dokumentieren!',
        lawHint: '§ 12 ArbSchG, § 4 DGUV Vorschrift 1 – Unterweisungspflicht.',
      },
      {
        id: 'fabrik-5',
        type: 'multiple-choice',
        text: 'Eine neue Produktionsmaschine wird aufgestellt. Was muss VOR der ersten Verwendung passieren?',
        options: [
          { text: 'Nichts – neue Maschinen sind automatisch sicher', correct: false },
          {
            text: 'Gefährdungsbeurteilung, Prüfung nach Montage (§ 14 BetrSichV), Betriebsanweisung erstellen und Beschäftigte unterweisen',
            correct: true,
          },
          { text: 'Nur ein Foto für die Dokumentation', correct: false },
          { text: 'Eine Feier zur Inbetriebnahme', correct: false },
        ],
        explanation:
          'Vor der ersten Verwendung: Gefährdungsbeurteilung, ggf. Prüfung nach Montage/Installation, Betriebsanweisung und Unterweisung. CE-Kennzeichnung allein genügt nicht!',
      },
      {
        id: 'fabrik-6',
        type: 'order',
        text: 'Bringe die Schritte einer Gefährdungsbeurteilung in die richtige Reihenfolge:',
        orderItems: [
          'Arbeitsbereiche und Tätigkeiten festlegen',
          'Gefährdungen ermitteln',
          'Gefährdungen bewerten (Risiko einschätzen)',
          'Maßnahmen festlegen und durchführen (STOP-Prinzip)',
          'Wirksamkeit überprüfen',
          'Ergebnisse dokumentieren und fortschreiben',
        ],
        explanation:
          'Der klassische Regelkreis: erfassen → ermitteln → bewerten → Maßnahmen (Substitution, Technisch, Organisatorisch, Persönlich) → Wirksamkeitskontrolle → Dokumentation/Fortschreibung.',
        bonusSkill: 'techniker',
      },
    ],
    caseStudy: {
      scenario:
        'In der Möbelfabrik Eichenholz GmbH wird eine zehn Jahre alte Plattensäge betrieben. Die Schutzhaube wurde vor Monaten demontiert, „weil sie beim Arbeiten stört" – der Schichtleiter wusste davon. Die letzte dokumentierte Prüfung der Säge liegt drei Jahre zurück, die Gefährdungsbeurteilung wurde seit der Anschaffung nie aktualisiert. Ein Leiharbeiter, der nie an der Säge unterwiesen wurde, verliert bei Reinigungsarbeiten am laufenden Gerät zwei Finger.',
      questions: [
        {
          id: 'fabrik-cs-1',
          type: 'find-errors',
          text: 'Welche vier Betreiber-Pflichtverletzungen liegen in diesem Fall vor?',
          selectCount: 4,
          options: [
            { text: 'Demontierte Schutzeinrichtung wurde geduldet', correct: true },
            { text: 'Prüffrist des Arbeitsmittels überschritten', correct: true },
            { text: 'Gefährdungsbeurteilung nicht aktuell', correct: true },
            { text: 'Leiharbeiter nicht unterwiesen', correct: true },
            { text: 'Die Säge war zu alt – Maschinen müssen nach 5 Jahren ersetzt werden', correct: false },
            { text: 'Reinigungsarbeiten sind grundsätzlich verboten', correct: false },
          ],
          explanation:
            'Vier klare Verstöße: Manipulation von Schutzeinrichtungen geduldet, Prüffristen überschritten, Gefährdungsbeurteilung veraltet, Unterweisung unterlassen. Ein Maschinen-Höchstalter gibt es dagegen nicht.',
        },
        {
          id: 'fabrik-cs-2',
          type: 'multiple-choice',
          text: 'Welche Besonderheit gilt bei Leiharbeitnehmern?',
          options: [
            { text: 'Für sie ist ausschließlich die Zeitarbeitsfirma verantwortlich', correct: false },
            {
              text: 'Der Entleiher trägt die Arbeitsschutzverantwortung am Einsatzort – inklusive tätigkeitsbezogener Unterweisung',
              correct: true,
            },
            { text: 'Sie dürfen an Maschinen gar nicht eingesetzt werden', correct: false },
            { text: 'Sie brauchen keine Unterweisung, weil sie nur kurz bleiben', correct: false },
          ],
          explanation:
            'Nach § 11 Abs. 6 AÜG ist der Entleiher für den Arbeitsschutz während des Einsatzes verantwortlich. Die Unterweisung am Arbeitsplatz ist seine Pflicht.',
        },
        {
          id: 'fabrik-cs-3',
          type: 'multiple-choice',
          text: 'Der Schichtleiter wusste von der fehlenden Schutzhaube. Welche Konsequenz hat das?',
          options: [
            { text: 'Keine – er ist ja nicht Geschäftsführer', correct: false },
            {
              text: 'Auch er haftet: Als Führungskraft hatte er eine Garantenstellung und hätte einschreiten müssen',
              correct: true,
            },
            { text: 'Er bekommt automatisch eine Abmahnung, mehr nicht', correct: false },
            { text: 'Die Verantwortung liegt allein beim Leiharbeiter', correct: false },
          ],
          explanation:
            'Führungskräfte tragen im Rahmen ihrer Aufgaben Mitverantwortung (Garantenstellung). Wer Manipulationen duldet, haftet zivil- und strafrechtlich mit.',
        },
      ],
    },
  },
  {
    id: 'feuerwache',
    name: 'Feuerwache',
    emoji: '🔥',
    theme: 'Brandschutz, Brandmeldeanlagen, Fluchtwege',
    description: 'Vorbeugender und organisatorischer Brandschutz im Betrieb.',
    unlockLevel: 4,
    position: { x: 2, y: 16 },
    size: { w: 3, h: 2 },
    npcName: 'Brandmeister Funke',
    npcIntro:
      'Tatütata! Brandmeister Funke mein Name. 90 % aller Brandtoten sterben an Rauchgasen – deshalb sind freie Fluchtwege und funktionierende Brandmeldetechnik überlebenswichtig. Lass sehen, ob du im Brandschutz sattelfest bist!',
    npcOutro:
      'Ausgezeichnet! Mit dir als Brandschutz-Verantwortlichem brennt hier höchstens noch die Leidenschaft für Sicherheit. Weiter geht\'s!',
    color: '#EA580C',
    questions: [
      {
        id: 'feuerwache-1',
        type: 'multiple-choice',
        text: 'In welchem Intervall müssen tragbare Feuerlöscher instand gehalten (gewartet) werden?',
        options: [
          { text: 'Jährlich', correct: false },
          { text: 'Mindestens alle 2 Jahre durch einen Sachkundigen', correct: true },
          { text: 'Alle 10 Jahre', correct: false },
          { text: 'Nur nach Benutzung', correct: false },
        ],
        explanation:
          'Nach ASR A2.2 i. V. m. DIN 14406-4 sind Feuerlöscher mindestens alle 2 Jahre durch einen Sachkundigen instand zu halten.',
      },
      {
        id: 'feuerwache-2',
        type: 'multiple-choice',
        text: 'Wie viele Beschäftigte müssen laut ASR A2.2 in der Regel als Brandschutzhelfer ausgebildet sein?',
        options: [
          { text: 'Mindestens 5 % der Beschäftigten', correct: true },
          { text: 'Genau eine Person pro Gebäude', correct: false },
          { text: '50 % der Beschäftigten', correct: false },
          { text: 'Brandschutzhelfer sind freiwillig', correct: false },
        ],
        explanation:
          'ASR A2.2 nennt als Richtwert mindestens 5 % der Beschäftigten – bei erhöhter Brandgefährdung, Schichtbetrieb oder Abwesenheiten entsprechend mehr.',
      },
      {
        id: 'feuerwache-3',
        type: 'true-false',
        text: 'Fluchtwege dürfen kurzzeitig mit Kartons zugestellt werden, solange ein schmaler Durchgang frei bleibt.',
        options: [
          { text: 'Wahr', correct: false },
          { text: 'Falsch', correct: true },
        ],
        explanation:
          'Falsch! Fluchtwege müssen ständig in voller Breite freigehalten werden (ASR A2.3). Auch „nur kurz" abgestellte Gegenstände sind ein Verstoß – im Brandfall zählt jede Sekunde.',
        lawHint: 'ASR A2.3 – Fluchtwege und Notausgänge, Flucht- und Rettungsplan.',
      },
      {
        id: 'feuerwache-4',
        type: 'multiple-choice',
        text: 'Welche Norm regelt Aufbau und Inhalt einer Brandschutzordnung (Teil A, B, C)?',
        options: [
          { text: 'DIN 14096', correct: true },
          { text: 'DIN EN ISO 9001', correct: false },
          { text: 'DIN 277', correct: false },
          { text: 'VDE 0100', correct: false },
        ],
        explanation:
          'DIN 14096 gliedert die Brandschutzordnung: Teil A (Aushang für alle), Teil B (für Beschäftigte), Teil C (für Personen mit besonderen Brandschutzaufgaben).',
        hint: 'Die Zahl beginnt mit 14 – wie viele Feuerwehr-Normen.',
      },
      {
        id: 'feuerwache-5',
        type: 'multiple-choice',
        text: 'Eine Brandschutztür wird im Alltag mit einem Holzkeil offen gehalten. Wie bewertest du das als Betreiber?',
        options: [
          { text: 'Praktisch und zulässig, solange es alle wissen', correct: false },
          {
            text: 'Unzulässig! Brandschutztüren müssen selbstschließend bleiben – offenhalten nur mit zugelassener Feststellanlage',
            correct: true,
          },
          { text: 'Nur im Sommer erlaubt', correct: false },
          { text: 'Zulässig, wenn der Keil schwer entflammbar ist', correct: false },
        ],
        explanation:
          'Verkeilte Brandschutztüren sind ein Klassiker bei Begehungen: Sie verlieren ihre Schutzwirkung komplett. Offenhalten ist nur mit bauaufsichtlich zugelassenen Feststellanlagen (mit Rauchmeldern) erlaubt – die jährlich gewartet werden müssen.',
      },
      {
        id: 'feuerwache-6',
        type: 'order',
        text: 'Es brennt! Bringe die Grundregeln des Verhaltens im Brandfall in die richtige Reihenfolge:',
        orderItems: [
          'Ruhe bewahren und Brand melden (Notruf 112 / Brandmelder)',
          'Gefährdete Personen warnen und in Sicherheit bringen',
          'Türen zum Brandraum schließen (nicht abschließen)',
          'Wenn gefahrlos möglich: Löschversuch unternehmen',
          'Gebäude über Fluchtwege verlassen und Sammelplatz aufsuchen',
        ],
        explanation:
          'Melden vor Retten vor Löschen – und Menschenrettung geht immer vor Sachwertschutz. Aufzüge im Brandfall nie benutzen!',
      },
    ],
    caseStudy: {
      scenario:
        'Im Logistikzentrum der Blitzversand GmbH löst nachts die Brandmeldeanlage aus. Die Feuerwehr findet: Der betroffene Rauchmelder war wegen Staubs schon zweimal in Fehlalarm gegangen und wurde deshalb vom Hausmeister abgeklebt – der echte Schwelbrand wurde dadurch erst spät erkannt. Der Notausgang zur Rampe war mit Paletten zugestellt, zwei Mitarbeiter der Nachtschicht erlitten Rauchgasvergiftungen. Die jährliche BMA-Wartung war zwar beauftragt, der Wartungstermin wurde aber dreimal verschoben, weil „der Betrieb nicht gestört werden sollte".',
      questions: [
        {
          id: 'feuerwache-cs-1',
          type: 'find-errors',
          text: 'Identifiziere die drei gravierendsten Brandschutz-Verstöße:',
          selectCount: 3,
          options: [
            { text: 'Manipulation der Brandmeldeanlage (abgeklebter Melder)', correct: true },
            { text: 'Zugestellter Notausgang', correct: true },
            { text: 'Verschleppte BMA-Wartung', correct: true },
            { text: 'Nachtschichten sind generell unzulässig', correct: false },
            { text: 'Es gab zu viele Rauchmelder im Gebäude', correct: false },
          ],
          explanation:
            'Abgeklebte Melder, blockierte Notausgänge und verschleppte Wartung – jede dieser Pflichtverletzungen allein wäre schon gravierend. Zusammen hätten sie tödlich enden können.',
        },
        {
          id: 'feuerwache-cs-2',
          type: 'multiple-choice',
          text: 'Wer trägt die Hauptverantwortung dafür, dass der Hausmeister den Melder abkleben konnte?',
          options: [
            { text: 'Nur der Hausmeister persönlich', correct: false },
            {
              text: 'Die Betriebsleitung: Wiederholte Fehlalarme hätten gemeldet und fachgerecht behoben werden müssen – stattdessen fehlten Kontrolle und klare Prozesse',
              correct: true,
            },
            { text: 'Die Feuerwehr, weil sie nicht früher kam', correct: false },
            { text: 'Der Hersteller des Rauchmelders', correct: false },
          ],
          explanation:
            'Der Hausmeister handelte falsch – aber dass sein Handeln möglich war und niemandem auffiel, ist ein Organisationsverschulden der Leitung.',
        },
        {
          id: 'feuerwache-cs-3',
          type: 'multiple-choice',
          text: 'Was wäre der richtige Umgang mit den Staub-Fehlalarmen gewesen?',
          options: [
            { text: 'Melder dauerhaft deaktivieren', correct: false },
            {
              text: 'Fachfirma beauftragen: Melder reinigen/tauschen oder auf staubtolerante Meldertechnik umrüsten – die Überwachung muss erhalten bleiben',
              correct: true,
            },
            { text: 'Die BMA komplett abschalten', correct: false },
            { text: 'Fehlalarme einfach ignorieren', correct: false },
          ],
          explanation:
            'Fehlalarme sind ein Wartungs-/Planungsthema, nie ein Grund zur Manipulation. Die Schutzfunktion muss jederzeit gewährleistet bleiben.',
        },
      ],
    },
  },
  {
    id: 'elektrowerk',
    name: 'Elektrowerk',
    emoji: '🔌',
    theme: 'Elektrische Anlagen, VEFK, VDE, DGUV V3',
    description: 'VEFK, DGUV Vorschrift 3, VDE 0105, Wiederholungsprüfungen, Schaltberechtigung.',
    unlockLevel: 4,
    position: { x: 15, y: 16 },
    size: { w: 3, h: 2 },
    npcName: 'VEFK Ampere',
    npcIntro:
      'Vorsicht, Hochspannung! Ich bin Frau Ampere, Verantwortliche Elektrofachkraft. Strom verzeiht keine Fehler – deshalb gibt es klare Regeln, wer was an elektrischen Anlagen darf. Zeig mir, dass du unter Spannung einen kühlen Kopf behältst!',
    npcOutro:
      'Widerstand zwecklos – du hast bestanden! Die fünf Sicherheitsregeln sitzen, und du weißt, wofür eine VEFK da ist. Hochachtung!',
    color: '#CA8A04',
    questions: [
      {
        id: 'elektrowerk-1',
        type: 'multiple-choice',
        text: 'Was ist die Aufgabe einer Verantwortlichen Elektrofachkraft (VEFK)?',
        options: [
          { text: 'Sie wechselt alle Glühbirnen im Unternehmen', correct: false },
          {
            text: 'Sie trägt die Fach- und Führungsverantwortung für den sicheren Betrieb der elektrotechnischen Organisation des Unternehmens',
            correct: true,
          },
          { text: 'Sie ist nur für die Stromrechnung zuständig', correct: false },
          { text: 'Sie vertritt den Betriebsrat in Elektrofragen', correct: false },
        ],
        explanation:
          'Die VEFK (DIN VDE 1000-10) übernimmt per schriftlicher Bestellung die Fachverantwortung für den Elektrobereich: Organisation, Prüfkonzepte, Qualifikation des Personals, Arbeitsanweisungen.',
        lawHint: 'DIN VDE 1000-10 – Anforderungen an die im Bereich der Elektrotechnik tätigen Personen.',
      },
      {
        id: 'elektrowerk-2',
        type: 'multiple-choice',
        text: 'In welchem Richtwert-Intervall sind ortsveränderliche elektrische Betriebsmittel in einem Büro nach DGUV V3 zu prüfen?',
        options: [
          { text: 'Alle 6 Monate', correct: false },
          { text: 'Richtwert 24 Monate – verlängerbar bei nachweislich niedriger Fehlerquote (< 2 %)', correct: true },
          { text: 'Alle 10 Jahre', correct: false },
          { text: 'Ortsveränderliche Geräte müssen nie geprüft werden', correct: false },
        ],
        explanation:
          'In Büroumgebungen gilt ein Richtwert von 24 Monaten. Wird eine Fehlerquote unter 2 % nachgewiesen, kann die Frist gemäß Gefährdungsbeurteilung verlängert werden; auf Baustellen gelten dagegen drastisch kürzere Fristen (3 Monate).',
        hint: 'Büro = geringe Beanspruchung = längere Frist.',
      },
      {
        id: 'elektrowerk-3',
        type: 'order',
        text: 'Bringe die 5 Sicherheitsregeln der Elektrotechnik in die richtige Reihenfolge:',
        orderItems: [
          'Freischalten',
          'Gegen Wiedereinschalten sichern',
          'Spannungsfreiheit feststellen',
          'Erden und kurzschließen',
          'Benachbarte, unter Spannung stehende Teile abdecken oder abschranken',
        ],
        explanation:
          'Die 5 Sicherheitsregeln (DIN VDE 0105-100) sind in genau dieser Reihenfolge anzuwenden – und in umgekehrter Reihenfolge wieder aufzuheben.',
      },
      {
        id: 'elektrowerk-4',
        type: 'multiple-choice',
        text: 'Was bedeutet „Freischalten" im Sinne der 5 Sicherheitsregeln?',
        options: [
          { text: 'Das WLAN für Gäste freigeben', correct: false },
          {
            text: 'Allseitiges und allpoliges Trennen der Anlage von allen spannungsführenden Teilen',
            correct: true,
          },
          { text: 'Den Hauptschalter mit einem Schild markieren', correct: false },
          { text: 'Die Anlage auf halbe Leistung drosseln', correct: false },
        ],
        explanation:
          'Freischalten heißt: vollständige, allpolige Trennung von allen möglichen Einspeisungen – nicht nur ausschalten, sondern sicher trennen.',
      },
      {
        id: 'elektrowerk-5',
        type: 'true-false',
        text: 'Eine elektrotechnisch unterwiesene Person (EuP) darf eigenständig komplexe Schalthandlungen im Mittelspannungsnetz durchführen.',
        options: [
          { text: 'Wahr', correct: false },
          { text: 'Falsch', correct: true },
        ],
        explanation:
          'Falsch! Eine EuP darf nur klar definierte, einfache Tätigkeiten unter Leitung und Aufsicht einer Elektrofachkraft ausführen. Schaltberechtigung im Mittelspannungsbereich erfordert eine spezielle, schriftlich erteilte Qualifikation.',
      },
      {
        id: 'elektrowerk-6',
        type: 'multiple-choice',
        text: 'Der Geschäftsführer eines Maschinenbaubetriebs ist kein Elektriker. Wie organisiert er die Elektro-Verantwortung korrekt?',
        options: [
          { text: 'Gar nicht – ohne Elektro-Ausbildung hat er keine Pflichten', correct: false },
          {
            text: 'Er bestellt schriftlich eine qualifizierte VEFK und stattet sie mit Befugnissen und Mitteln aus',
            correct: true,
          },
          { text: 'Er macht schnell selbst einen Wochenendkurs', correct: false },
          { text: 'Er verbietet einfach alle Elektroarbeiten', correct: false },
        ],
        explanation:
          'Wer die Fachkunde nicht selbst hat, muss sie organisieren: schriftliche Bestellung einer VEFK mit klarem Verantwortungsbereich, Befugnissen und Ressourcen.',
        bonusSkill: 'techniker',
      },
    ],
    caseStudy: {
      scenario:
        'Bei der Metallbau Schmidt GmbH prüft seit Jahren „der Azubi im dritten Lehrjahr" sämtliche ortsveränderlichen Geräte, weil er „das in der Berufsschule gelernt hat". Prüfprotokolle existieren nicht, nur eine Excel-Liste mit grünen Häkchen. Eine geliehene Handbohrmaschine mit beschädigter Leitung verursacht einen Stromunfall: Ein Geselle erleidet Herzkammerflimmern, überlebt aber. Die Berufsgenossenschaft stellt fest, dass es im Betrieb weder eine bestellte VEFK noch ein Prüfkonzept gibt.',
      questions: [
        {
          id: 'elektrowerk-cs-1',
          type: 'multiple-choice',
          text: 'Durfte der Azubi die DGUV-V3-Prüfungen durchführen?',
          options: [
            { text: 'Ja, Berufsschulwissen genügt', correct: false },
            {
              text: 'Nein – Prüfungen erfordern eine Elektrofachkraft bzw. befähigte Person; ein Azubi darf höchstens unter Aufsicht mitwirken',
              correct: true,
            },
            { text: 'Ja, wenn er volljährig ist', correct: false },
            { text: 'Nur freitags', correct: false },
          ],
          explanation:
            'Prüfungen nach DGUV V3 erfordern eine zur Prüfung befähigte Person (Elektrofachkraft mit Prüferfahrung). Auszubildende dürfen nur unter Leitung und Aufsicht mitwirken.',
        },
        {
          id: 'elektrowerk-cs-2',
          type: 'multiple-choice',
          text: 'Welches Dokumentationsproblem verschärft die Haftung des Unternehmens?',
          options: [
            { text: 'Die Excel-Liste war nicht farbig genug', correct: false },
            {
              text: 'Es fehlen aussagekräftige Prüfprotokolle (Messwerte, Prüfer, Datum, Ergebnis) – die Prüfungen sind faktisch nicht nachweisbar',
              correct: true,
            },
            { text: 'Es wurde zu viel dokumentiert', correct: false },
            { text: 'Excel ist als Software generell verboten', correct: false },
          ],
          explanation:
            'Ein Prüfnachweis braucht: Prüfdatum, Prüfer mit Qualifikation, Prüfumfang, Messwerte und Ergebnis. Grüne Häkchen ohne Substanz sind vor Gericht wertlos.',
        },
        {
          id: 'elektrowerk-cs-3',
          type: 'multiple-choice',
          text: 'Welche organisatorische Maßnahme ist nach dem Unfall am dringendsten?',
          options: [
            { text: 'Den Azubi entlassen und weitermachen wie bisher', correct: false },
            {
              text: 'Elektroorganisation aufbauen: VEFK bestellen, Prüfkonzept mit Fristen erstellen, qualifiziertes Prüfpersonal und ordentliche Protokolle einführen',
              correct: true,
            },
            { text: 'Alle Elektrogeräte verkaufen', correct: false },
            { text: 'Ein Schild „Vorsicht Strom" aufhängen', correct: false },
          ],
          explanation:
            'Der Unfall offenbart ein Systemversagen. Die Antwort muss systemisch sein: Verantwortung (VEFK), Konzept (Prüffristen), Qualifikation und Dokumentation.',
        },
      ],
    },
  },
  {
    id: 'baustelle',
    name: 'Baustelle',
    emoji: '🏗️',
    theme: 'Fremdfirmenverwaltung, Koordinationspflicht',
    description: 'Zusammenarbeit mehrerer Unternehmen: Auswahl, Einweisung, Koordination.',
    unlockLevel: 5,
    position: { x: 9, y: 16 },
    size: { w: 3, h: 2 },
    npcName: 'Polier Kowalski',
    npcIntro:
      'He, Helm auf! Hier arbeiten fünf Firmen gleichzeitig – Elektriker, Gerüstbauer, Dachdecker… Wenn das keiner koordiniert, gibt\'s Chaos und Unfälle. Zeig mir, dass du weißt, wie man Fremdfirmen sauber managt!',
    npcOutro:
      'Sauber! Du hast verstanden: Wer Fremdfirmen beauftragt, gibt die Verantwortung nicht am Werkstor ab. Koordination ist Chefsache!',
    color: '#D97706',
    questions: [
      {
        id: 'baustelle-1',
        type: 'multiple-choice',
        text: 'Mehrere Firmen arbeiten gleichzeitig auf deinem Betriebsgelände. Was fordert § 8 ArbSchG / § 6 DGUV V1?',
        options: [
          { text: 'Jede Firma macht ihrs – Hauptsache, der Preis stimmt', correct: false },
          {
            text: 'Die Arbeitgeber müssen zusammenarbeiten und sich gegenseitig über Gefährdungen informieren; bei gegenseitiger Gefährdung ist eine koordinierende Person zu bestellen',
            correct: true,
          },
          { text: 'Nur die größte Firma trägt die Verantwortung', correct: false },
          { text: 'Die Behörde übernimmt automatisch die Koordination', correct: false },
        ],
        explanation:
          'Bei Zusammenarbeit mehrerer Unternehmen sind gegenseitige Information und Abstimmung Pflicht. Bei möglicher gegenseitiger Gefährdung muss ein Koordinator bestellt werden.',
        lawHint: '§ 8 ArbSchG – Zusammenarbeit mehrerer Arbeitgeber; § 6 DGUV Vorschrift 1.',
      },
      {
        id: 'baustelle-2',
        type: 'multiple-choice',
        text: 'Was gehört zur Auswahlpflicht bei der Beauftragung einer Fremdfirma?',
        options: [
          { text: 'Nur der Preisvergleich', correct: false },
          {
            text: 'Prüfung von Eignung und Zuverlässigkeit: Qualifikationen, Referenzen, ggf. Zertifikate und arbeitsschutzbezogene Auskünfte',
            correct: true,
          },
          { text: 'Ein sympathisches Erstgespräch genügt', correct: false },
          { text: 'Es gibt keine Auswahlpflicht', correct: false },
        ],
        explanation:
          'Der Auftraggeber muss sich vergewissern, dass der Auftragnehmer fachlich geeignet und zuverlässig ist – sonst droht Haftung wegen Auswahlverschuldens.',
      },
      {
        id: 'baustelle-3',
        type: 'multiple-choice',
        text: 'Wann ist ein Erlaubnisschein (z. B. für Heißarbeiten wie Schweißen) erforderlich?',
        options: [
          { text: 'Nie – Schweißer wissen, was sie tun', correct: false },
          {
            text: 'Bei gefährlichen Arbeiten außerhalb dafür vorgesehener Bereiche: Er legt Schutzmaßnahmen, Verantwortliche und Brandwache fest',
            correct: true,
          },
          { text: 'Nur bei Arbeiten an Wochenenden', correct: false },
          { text: 'Nur wenn die Versicherung ihn verlangt', correct: false },
        ],
        explanation:
          'Schweiß-, Schneid- und Lötarbeiten außerhalb fester Arbeitsplätze erfordern einen Erlaubnisschein (Schweißerlaubnis) mit definierten Schutzmaßnahmen, Brandwache und Nachkontrolle.',
      },
      {
        id: 'baustelle-4',
        type: 'true-false',
        text: 'Fremdfirmen-Mitarbeiter müssen vor Arbeitsbeginn in die betriebsspezifischen Gefahren des Einsatzortes eingewiesen werden.',
        options: [
          { text: 'Wahr', correct: true },
          { text: 'Falsch', correct: false },
        ],
        explanation:
          'Wahr! Die Fremdfirma unterweist ihre Leute fachlich – aber der Auftraggeber muss über die spezifischen Gefahren seines Betriebs (Verkehrswege, Alarmierung, Gefahrstoffe …) informieren und einweisen.',
      },
      {
        id: 'baustelle-5',
        type: 'multiple-choice',
        text: 'Was regelt die Baustellenverordnung (BaustellV) bei größeren Bauvorhaben?',
        options: [
          { text: 'Die Farbe der Bauzäune', correct: false },
          {
            text: 'Der Bauherr muss u. a. einen SiGe-Koordinator bestellen und einen Sicherheits- und Gesundheitsschutzplan erstellen lassen, wenn mehrere Firmen tätig werden',
            correct: true,
          },
          { text: 'Die Arbeitszeiten der Architekten', correct: false },
          { text: 'Nur den Umgang mit Baulärm', correct: false },
        ],
        explanation:
          'Die BaustellV nimmt den Bauherrn in die Pflicht: Bei Baustellen mit mehreren Arbeitgebern sind SiGeKo-Bestellung und SiGe-Plan zentrale Anforderungen.',
      },
      {
        id: 'baustelle-6',
        type: 'free-text',
        text: 'Ein Wartungsunternehmen arbeitet regelmäßig in deinem Gebäude. Nenne mindestens zwei Pflichten, die du als Auftraggeber trotzdem behältst.',
        keywords: ['einweisung', 'koordination', 'überwachung', 'auswahl', 'information', 'kontrolle'],
        explanation:
          'Beim Einsatz von Fremdfirmen behält der Auftraggeber: sorgfältige Auswahl, Information/Einweisung in betriebsspezifische Gefahren, Koordination bei gegenseitiger Gefährdung und stichprobenartige Überwachung der vereinbarten Sicherheitsregeln.',
        bonusSkill: 'manager',
      },
    ],
    caseStudy: {
      scenario:
        'Die Verwaltung der Betreiberstadt-Arena beauftragt für das Hallendach gleichzeitig eine Dachdeckerfirma (Abdichtung mit Gasbrenner) und eine Elektrofirma (Montage einer PV-Anlage). Eine Koordination zwischen beiden Firmen gibt es nicht, „die machen das schon". Die Dachdecker wissen nichts von den bereits verlegten, teils offenen PV-Leitungen. Beim Abflämmen entzündet sich die Dämmung nahe einer Kabeltrasse; ein Elektriker, der hinter einem Lüftungsgerät arbeitet, wird vom Rauch überrascht und kann sich nur knapp retten. Ein Erlaubnisschein für die Heißarbeiten existierte nicht, eine Brandwache ebenfalls nicht.',
      questions: [
        {
          id: 'baustelle-cs-1',
          type: 'find-errors',
          text: 'Welche drei Koordinations-Pflichtverletzungen des Auftraggebers liegen vor?',
          selectCount: 3,
          options: [
            { text: 'Keine Koordination der gleichzeitig arbeitenden Firmen', correct: true },
            { text: 'Kein Erlaubnisschein/keine Brandwache für Heißarbeiten veranlasst', correct: true },
            { text: 'Keine gegenseitige Information über Gefährdungen organisiert', correct: true },
            { text: 'PV-Anlagen sind auf Dächern grundsätzlich verboten', correct: false },
            { text: 'Dacharbeiten dürfen nur im Winter stattfinden', correct: false },
          ],
          explanation:
            'Der Auftraggeber hätte die Arbeiten koordinieren, Informationsaustausch sicherstellen und das Erlaubnisschein-Verfahren für Heißarbeiten durchsetzen müssen.',
        },
        {
          id: 'baustelle-cs-2',
          type: 'multiple-choice',
          text: '„Die machen das schon" – warum entlastet diese Haltung den Auftraggeber nicht?',
          options: [
            { text: 'Weil Vertrauen grundsätzlich verboten ist', correct: false },
            {
              text: 'Weil bei gegenseitiger Gefährdung mehrerer Firmen die Koordinationspflicht beim Auftraggeber/Bauherrn liegt und aktiv wahrgenommen werden muss',
              correct: true,
            },
            { text: 'Weil nur schriftliche Verträge zählen', correct: false },
            { text: 'Sie entlastet ihn doch vollständig', correct: false },
          ],
          explanation:
            'Koordination ist eine aktive Pflicht: Schnittstellen erkennen, Koordinator bestellen, Abstimmungen dokumentieren. Passives „Laufenlassen" ist ein Organisationsverschulden.',
        },
        {
          id: 'baustelle-cs-3',
          type: 'multiple-choice',
          text: 'Wie hätte das Erlaubnisschein-Verfahren den Beinahe-Unfall verhindert?',
          options: [
            { text: 'Gar nicht – Papier brennt ja auch', correct: false },
            {
              text: 'Vor den Heißarbeiten wären Gefahren (PV-Leitungen, Dämmung, anwesende Dritte) erfasst, Schutzmaßnahmen und eine Brandwache festgelegt und alle Beteiligten informiert worden',
              correct: true,
            },
            { text: 'Es hätte nur die Versicherungsprämie gesenkt', correct: false },
            { text: 'Es hätte die Arbeiten lediglich verteuert', correct: false },
          ],
          explanation:
            'Der Erlaubnisschein erzwingt genau die Prüfschritte, die hier fehlten: Gefahrenanalyse am Ort, Schutzmaßnahmen, Brandwache, Information aller Gewerke und Nachkontrolle.',
        },
      ],
    },
  },
  {
    id: 'geheimbibliothek',
    name: 'Geheimbibliothek',
    emoji: '🗝️',
    theme: 'Das verborgene Wissen der Regelwerke',
    description: 'Nur Eingeweihte finden den Weg hierher: Die Rechtssystematik hinter allem.',
    unlockLevel: 99,
    unlockSpecial: 'sidequest-hausmeister',
    position: { x: 1, y: 1 },
    size: { w: 2, h: 2 },
    npcName: 'Bibliothekarin Sophia',
    npcIntro:
      'Du hast den Weg gefunden… Willkommen in der Geheimbibliothek. Hier lagert das Wissen über die Systematik der Regelwerke – das Fundament, das die meisten nie verstehen. Bist du bereit für die hohe Schule?',
    npcOutro:
      'Beeindruckend. Du verstehst nun nicht nur die Regeln, sondern auch ihre Ordnung. Dieses Wissen macht dich zu einem wahren Meister der Betreiberverantwortung.',
    color: '#0F766E',
    questions: [
      {
        id: 'bibliothek-1',
        type: 'order',
        text: 'Ordne die Regelwerke nach ihrer Verbindlichkeit – vom höchsten staatlichen Recht zur untergesetzlichen Konkretisierung:',
        orderItems: [
          'Gesetz (z. B. ArbSchG)',
          'Verordnung (z. B. BetrSichV, ArbStättV)',
          'Unfallverhütungsvorschrift (z. B. DGUV Vorschrift 1)',
          'Technische Regel (z. B. TRBS, ASR)',
          'Norm (z. B. DIN, VDE)',
        ],
        explanation:
          'Gesetze und Verordnungen sind staatliches Recht, DGUV-Vorschriften autonomes Recht der Unfallversicherungsträger. Technische Regeln konkretisieren mit Vermutungswirkung; Normen sind zunächst private Standards, die den Stand der Technik abbilden.',
      },
      {
        id: 'bibliothek-2',
        type: 'multiple-choice',
        text: 'Was bedeutet die „Vermutungswirkung" Technischer Regeln (z. B. TRBS, ASR)?',
        options: [
          { text: 'Man darf vermuten, dass sie bald abgeschafft werden', correct: false },
          {
            text: 'Bei ihrer Einhaltung wird vermutet, dass die Anforderungen der zugehörigen Verordnung erfüllt sind; Abweichungen erfordern einen gleichwertigen Sicherheitsnachweis',
            correct: true,
          },
          { text: 'Sie gelten nur, wenn die Behörde es vermutet', correct: false },
          { text: 'Sie sind unverbindliche Werbetexte', correct: false },
        ],
        explanation:
          'Die Vermutungswirkung macht Technische Regeln zum sichersten Weg der Pflichterfüllung: Wer abweicht, trägt die Beweislast für die Gleichwertigkeit seiner Lösung.',
      },
      {
        id: 'bibliothek-3',
        type: 'multiple-choice',
        text: 'Worin unterscheiden sich „Stand der Technik" und „allgemein anerkannte Regeln der Technik"?',
        options: [
          { text: 'Es gibt keinen Unterschied', correct: false },
          {
            text: 'Der Stand der Technik ist der fortschrittlichere Maßstab (entwickelte, erprobte Verfahren), die anerkannten Regeln der Technik sind der etablierte, in der Praxis bewährte Mindeststandard',
            correct: true,
          },
          { text: 'Der Stand der Technik gilt nur in Bayern', correct: false },
          { text: 'Anerkannte Regeln der Technik sind immer strenger', correct: false },
        ],
        explanation:
          'Drei-Stufen-Theorie: anerkannte Regeln der Technik < Stand der Technik < Stand von Wissenschaft und Technik. Die BetrSichV verlangt für Schutzmaßnahmen den Stand der Technik!',
      },
      {
        id: 'bibliothek-4',
        type: 'multiple-choice',
        text: 'Ein Betreiber hält eine veraltete DIN-Norm ein, obwohl es eine neuere gibt. Ist er auf der sicheren Seite?',
        options: [
          { text: 'Ja, einmal DIN, immer sicher', correct: false },
          {
            text: 'Nicht unbedingt – maßgeblich ist der aktuelle Stand der Technik bzw. die aktuelle Regel; veraltete Normen können die Vermutungswirkung verlieren',
            correct: true,
          },
          { text: 'Ja, Normen verfallen nie', correct: false },
          { text: 'Nein, DIN-Normen waren noch nie relevant', correct: false },
        ],
        explanation:
          'Regelwerke leben: Der Betreiber muss sein Regelwerkskataster aktuell halten und Änderungen verfolgen – sonst prüft und betreibt er nach überholten Maßstäben.',
      },
      {
        id: 'bibliothek-5',
        type: 'free-text',
        text: 'Warum sollte ein Betreiber ein „Rechtskataster" (Verzeichnis relevanter Pflichten und Regelwerke) führen? Nenne zwei Gründe.',
        keywords: ['überblick', 'aktualität', 'nachweis', 'compliance', 'änderung', 'systematisch', 'dokumentation'],
        explanation:
          'Ein Rechtskataster verschafft systematischen Überblick über alle einschlägigen Pflichten, stellt durch regelmäßige Aktualisierung die Rechtskonformität sicher und dient als Nachweis einer funktionierenden Betreiberorganisation (Compliance).',
      },
    ],
  },
  {
    id: 'ruine',
    name: 'Ruine',
    emoji: '💀',
    theme: 'Boss-Level: Der Unfall – vollständige Fallanalyse',
    description: 'Hier ist es passiert. Analysiere den Unfall in drei Akten – nur die Besten bestehen.',
    unlockLevel: 6,
    position: { x: 17, y: 1 },
    size: { w: 2, h: 2 },
    npcName: 'Der Ermittler',
    npcIntro:
      'Diese Ruine war einmal die Chemiefabrik „Solventa". Vor zwei Jahren starb hier ein Mensch. Ich bin der Ermittler – und du wirst diesen Fall mit mir aufarbeiten. Drei Akte: Vor dem Unfall. Der Unfall. Die Nachbetrachtung. Nur wer alle besteht, erhält das Abschlusszertifikat. Bereit?',
    npcOutro:
      'Fall abgeschlossen. Du hast bewiesen, dass du Mängel erkennst, im Notfall richtig handelst und die rechtlichen Konsequenzen verstehst. Der Weg zum Bürgermeisteramt ist frei.',
    color: '#44403C',
    questions: [
      {
        id: 'ruine-akt1',
        type: 'find-errors',
        text: 'AKT 1 – VOR DEM UNFALL: Du sichtest die Akten der Solventa GmbH. Identifiziere die 7 echten Mängel (von 10 Hinweisen):',
        selectCount: 7,
        options: [
          { text: 'Prüfprotokoll der Abluftanlage fehlt seit 3 Jahren', correct: true },
          { text: 'ZÜS-Zertifikat des Druckbehälters ist seit 14 Monaten abgelaufen', correct: true },
          { text: 'Zwei neue Mitarbeiter wurden nie unterwiesen', correct: true },
          { text: 'Gefährdungsbeurteilung für den Umgang mit Lösemitteln existiert nicht', correct: true },
          { text: 'Die Brandschutzordnung Teil B wurde nie an Beschäftigte verteilt', correct: true },
          { text: 'Der Not-Aus-Taster der Mischanlage ist seit Wochen defekt gemeldet, aber nicht repariert', correct: true },
          { text: 'Die schriftliche Bestellung des Gefahrstoffbeauftragten fehlt, obwohl er benannt wurde', correct: true },
          { text: 'Die Kaffeemaschine im Pausenraum ist entkalkt', correct: false },
          { text: 'Der Parkplatz wurde neu asphaltiert', correct: false },
          { text: 'Das Firmenlogo an der Fassade ist verblasst', correct: false },
        ],
        explanation:
          'Sieben gravierende Organisationsmängel: fehlende Prüfungen, abgelaufene Zertifikate, unterlassene Unterweisungen, fehlende Gefährdungsbeurteilung, nicht kommunizierte Brandschutzordnung, ignorierte Mängelmeldung und formlose Beauftragung.',
      },
      {
        id: 'ruine-akt2-1',
        type: 'order',
        text: 'AKT 2 – DER UNFALL: In der Mischhalle kommt es zur Verpuffung, ein Mitarbeiter wird schwer verletzt. Bringe die Sofortmaßnahmen in die richtige Reihenfolge:',
        orderItems: [
          'Eigenschutz beachten, Gefahrenbereich sichern/räumen',
          'Notruf 112 absetzen und Erste Hilfe leisten',
          'Anlage notabschalten, weitere Eskalation verhindern',
          'Unfallstelle unverändert lassen und absperren (Beweissicherung)',
          'Meldungen: Berufsgenossenschaft und ggf. Behörden informieren',
        ],
        explanation:
          'Eigenschutz → Rettung → Eskalation stoppen → Beweissicherung → Meldepflichten. Ein meldepflichtiger Arbeitsunfall (mehr als 3 Tage Arbeitsunfähigkeit oder tödlich) muss dem UV-Träger gemeldet werden; bei schweren Unfällen sofort.',
        timeLimit: 90,
      },
      {
        id: 'ruine-akt2-2',
        type: 'multiple-choice',
        text: 'AKT 2: Die Geschäftsführung möchte den defekten Not-Aus-Taster „schnell noch reparieren lassen", bevor die Ermittler kommen. Wie bewertest du das?',
        options: [
          { text: 'Gute Idee – Ordnung muss sein', correct: false },
          {
            text: 'Strafbar! Das wäre Beweismittelmanipulation; die Unfallstelle muss für die Ermittlungen unverändert bleiben',
            correct: true,
          },
          { text: 'Erlaubt, wenn es schnell geht', correct: false },
          { text: 'Nur mit Genehmigung des Betriebsrats erlaubt', correct: false },
        ],
        explanation:
          'Nach einem schweren Unfall darf die Unfallstelle nur verändert werden, soweit es die Rettung erfordert. Manipulation von Beweismitteln ist eine Straftat und verschlimmert die Lage massiv.',
        timeLimit: 60,
      },
      {
        id: 'ruine-akt3-1',
        type: 'multiple-choice',
        text: 'AKT 3 – NACHBETRACHTUNG: Der Geschäftsführer wusste vom defekten Not-Aus und den fehlenden Prüfungen. Welche strafrechtliche Bewertung liegt nahe?',
        options: [
          { text: 'Freispruch – er hat ja nicht selbst gemischt', correct: false },
          {
            text: 'Fahrlässige Körperverletzung durch Unterlassen: Als Garant kannte er die Gefahren und schritt nicht ein',
            correct: true,
          },
          { text: 'Höchstens ein Knöllchen wie beim Falschparken', correct: false },
          { text: 'Nur die GmbH haftet, nie natürliche Personen', correct: false },
        ],
        explanation:
          'Wer als Verantwortlicher konkrete Gefahren kennt und nicht handelt, macht sich wegen fahrlässiger Körperverletzung (§ 229 StGB), ggf. i. V. m. § 13 StGB (Unterlassen), strafbar. Strafrechtlich haften immer natürliche Personen.',
      },
      {
        id: 'ruine-akt3-2',
        type: 'find-errors',
        text: 'AKT 3: Welche drei Maßnahmen hätten den Unfall am wirksamsten verhindert?',
        selectCount: 3,
        options: [
          { text: 'Funktionierendes Mängelmanagement: defekter Not-Aus wird sofort repariert oder Anlage stillgesetzt', correct: true },
          { text: 'Gefährdungsbeurteilung für Lösemittel mit Ex-Schutz-Maßnahmen', correct: true },
          { text: 'Konsequente Unterweisung aller Mitarbeiter vor Tätigkeitsaufnahme', correct: true },
          { text: 'Ein größerer Pausenraum', correct: false },
          { text: 'Mehr Werbebudget für das Firmenimage', correct: false },
        ],
        explanation:
          'Die Unfallkette wäre an drei Stellen unterbrochen worden: stillgesetzte Anlage (Mängelmanagement), Ex-Schutz-Maßnahmen (Gefährdungsbeurteilung) und unterwiesenes Personal, das die Gefahr erkannt hätte.',
      },
      {
        id: 'ruine-akt3-3',
        type: 'multiple-choice',
        text: 'AKT 3: Was lernt ein Betreiber aus dem Fall Solventa für seine eigene Organisation?',
        options: [
          { text: 'Hauptsache, man hat einen guten Anwalt', correct: false },
          {
            text: 'Betreiberverantwortung braucht ein System: klare Zuständigkeiten, gelebtes Prüf- und Mängelmanagement, Unterweisungen und Dokumentation – bevor etwas passiert',
            correct: true,
          },
          { text: 'Unfälle sind Schicksal und nicht vermeidbar', correct: false },
          { text: 'Weniger dokumentieren, dann kann einem weniger vorgeworfen werden', correct: false },
        ],
        explanation:
          'Jeder schwere Unfall ist das Ende einer Kette von Organisationsversäumnissen. Eine gelebte Betreiberorganisation unterbricht diese Kette – und schützt Menschen wie Verantwortliche.',
      },
    ],
  },
  {
    id: 'buergermeisteramt',
    name: 'Bürgermeisteramt',
    emoji: '🏆',
    theme: 'Abschluss, Zertifikat, vollständige Beherrschung',
    description: 'Die letzte Prüfung. Beweise dem Bürgermeister, dass du bereit bist, Verantwortung zu tragen.',
    unlockLevel: 0,
    unlockSpecial: 'all-main-buildings',
    position: { x: 8, y: 9 },
    size: { w: 4, h: 3 },
    npcName: 'Bürgermeister Stein',
    npcIntro:
      'Du hast jedes Gebäude dieser Stadt gemeistert. Vor dir liegt die letzte Prüfung: ein Querschnitt durch alles, was du gelernt hast. Bestehst du auch sie, ernenne ich dich zum Verantwortlichen Betreiber von Betreiberstadt – mit Brief und Siegel!',
    npcOutro:
      'Hiermit ernenne ich dich feierlich zum VERANTWORTLICHEN BETREIBER! Du kannst nun dein Zertifikat herunterladen. Die Stadt ist stolz auf dich – trage dein Wissen hinaus in die Welt!',
    color: '#B45309',
    questions: [
      {
        id: 'amt-1',
        type: 'multiple-choice',
        text: 'ABSCHLUSSPRÜFUNG 1/8: Welche Aussage zur Betreiberstellung ist korrekt?',
        options: [
          { text: 'Betreiber ist immer der Grundstückseigentümer', correct: false },
          { text: 'Betreiber ist, wer die tatsächliche Sachherrschaft über die Anlage ausübt', correct: true },
          { text: 'Betreiber kann nur eine GmbH sein', correct: false },
          { text: 'Die Betreiberstellung kann man formlos abstreiten', correct: false },
        ],
        explanation: 'Die tatsächliche Sachherrschaft und Nutzungsmacht begründet die Betreiberstellung.',
      },
      {
        id: 'amt-2',
        type: 'multiple-choice',
        text: 'ABSCHLUSSPRÜFUNG 2/8: Welche vier Elemente machen eine Pflichtenübertragung wirksam?',
        options: [
          {
            text: 'Schriftform, qualifizierte/zuverlässige Person, klare Aufgaben und Befugnisse, fortlaufende Überwachung',
            correct: true,
          },
          { text: 'Handschlag, Sympathie, kurze E-Mail, jährliches Mitarbeiterfest', correct: false },
          { text: 'Nur die Schriftform – sonst nichts', correct: false },
          { text: 'Mündliche Absprache und gegenseitiges Vertrauen', correct: false },
        ],
        explanation:
          'Auswahl + Schriftform + Befugnisse/Mittel + Überwachung: Fehlt eines, wirkt die Delegation nicht entlastend.',
      },
      {
        id: 'amt-3',
        type: 'true-false',
        text: 'ABSCHLUSSPRÜFUNG 3/8: Die Gefährdungsbeurteilung legt auch Art, Umfang und Fristen der Prüfungen von Arbeitsmitteln fest.',
        options: [
          { text: 'Wahr', correct: true },
          { text: 'Falsch', correct: false },
        ],
        explanation: 'Richtig – § 3 Abs. 6 BetrSichV: Prüfungen werden in der Gefährdungsbeurteilung ermittelt und festgelegt.',
      },
      {
        id: 'amt-4',
        type: 'multiple-choice',
        text: 'ABSCHLUSSPRÜFUNG 4/8: Überwachungsbedürftige Anlagen (Aufzüge, Druckanlagen) werden wiederkehrend geprüft durch …',
        options: [
          { text: 'eine zugelassene Überwachungsstelle (ZÜS)', correct: true },
          { text: 'den Hausmeister', correct: false },
          { text: 'den Azubi mit Berufsschulwissen', correct: false },
          { text: 'niemanden – einmal zugelassen, immer sicher', correct: false },
        ],
        explanation: 'Überwachungsbedürftige Anlagen erfordern die ZÜS-Prüfung nach BetrSichV.',
      },
      {
        id: 'amt-5',
        type: 'order',
        text: 'ABSCHLUSSPRÜFUNG 5/8: Die 5 Sicherheitsregeln der Elektrotechnik – in der richtigen Reihenfolge:',
        orderItems: [
          'Freischalten',
          'Gegen Wiedereinschalten sichern',
          'Spannungsfreiheit feststellen',
          'Erden und kurzschließen',
          'Benachbarte, unter Spannung stehende Teile abdecken oder abschranken',
        ],
        explanation: 'Die 5 Sicherheitsregeln nach DIN VDE 0105-100 retten Leben – Reihenfolge ist Pflicht.',
      },
      {
        id: 'amt-6',
        type: 'multiple-choice',
        text: 'ABSCHLUSSPRÜFUNG 6/8: Mehrere Fremdfirmen arbeiten gleichzeitig mit gegenseitiger Gefährdung. Was ist zu tun?',
        options: [
          { text: 'Eine koordinierende Person bestellen und gegenseitige Information sicherstellen', correct: true },
          { text: 'Nichts – jede Firma haftet für sich', correct: false },
          { text: 'Die günstigste Firma koordiniert automatisch', correct: false },
          { text: 'Die Arbeiten heimlich nachts durchführen lassen', correct: false },
        ],
        explanation: '§ 8 ArbSchG / § 6 DGUV V1: Koordination und Information sind Pflicht des Auftraggebers.',
      },
      {
        id: 'amt-7',
        type: 'multiple-choice',
        text: 'ABSCHLUSSPRÜFUNG 7/8: Warum ist Dokumentation der beste Freund des Betreibers?',
        options: [
          {
            text: 'Sie ermöglicht den Entlastungsbeweis: Nachweis von Prüfungen, Unterweisungen und Organisation im Schadensfall',
            correct: true,
          },
          { text: 'Sie beschäftigt die Verwaltung', correct: false },
          { text: 'Papier ist geduldig und ersetzt echte Maßnahmen', correct: false },
          { text: 'Sie ist nur für ISO-Zertifikate nötig', correct: false },
        ],
        explanation: 'Vor Gericht gilt: Was nicht dokumentiert ist, wurde nicht gemacht. Dokumentation = Exkulpation.',
      },
      {
        id: 'amt-8',
        type: 'free-text',
        text: 'ABSCHLUSSPRÜFUNG 8/8: Beschreibe in eigenen Worten die drei Säulen einer funktionierenden Betreiberorganisation.',
        keywords: ['zuständigkeit', 'verantwortung', 'prüfung', 'dokumentation', 'überwachung', 'organisation', 'unterweisung', 'delegation'],
        explanation:
          'Eine funktionierende Betreiberorganisation ruht auf: (1) klaren Zuständigkeiten und wirksamer Delegation, (2) systematischem Prüf-, Wartungs- und Mängelmanagement inkl. Unterweisungen, (3) lückenloser Dokumentation und Überwachung (Kontrolle der Pflichterfüllung).',
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────
// SIDEQUESTS
// ─────────────────────────────────────────────────────────────────

export const SIDEQUESTS: SidequestData[] = [
  {
    id: 'hausmeister',
    name: 'Der alte Hausmeister',
    emoji: '🧹',
    description: 'Ein geheimnisvoller alter Mann wartet vor einem verwitterten Gebäude im Nordwesten…',
    unlockLevel: 2,
    position: { x: 4, y: 2 },
    npcName: 'Der alte Hausmeister',
    npcIntro:
      'Psst… ich hüte den Schlüssel zur Geheimbibliothek. Vierzig Jahre habe ich Anlagen gewartet und alles gesehen. Beantworte mir drei Fragen – ohne Hilfe, ohne Hinweise. Bestehst du, gehört der Schlüssel dir.',
    xpReward: 75,
    badgeReward: 'bibliotheksdetektiv',
    questions: [
      {
        id: 'sq-hausmeister-1',
        type: 'multiple-choice',
        text: 'Ein Betreiber lässt eine Prüfung von einer „befähigten Person" durchführen, die zwar ausgebildet, aber seit 15 Jahren nicht mehr im Prüfgebiet tätig ist. Problem?',
        options: [
          { text: 'Nein, Ausbildung verfällt nie', correct: false },
          {
            text: 'Ja – TRBS 1203 fordert neben Ausbildung und Erfahrung auch eine ZEITNAHE berufliche Tätigkeit im Prüfgebiet',
            correct: true,
          },
          { text: 'Nur wenn die Person über 60 ist', correct: false },
          { text: 'Befähigte Personen gibt es gar nicht', correct: false },
        ],
        explanation:
          'Die drei Säulen der befähigten Person: Berufsausbildung, Berufserfahrung UND zeitnahe berufliche Tätigkeit. Fehlt eine, ist die Prüfung angreifbar.',
      },
      {
        id: 'sq-hausmeister-2',
        type: 'multiple-choice',
        text: 'Der Chef sagt: „Wir sind ISO-9001-zertifiziert, damit ist die Betreiberverantwortung doch abgedeckt." Stimmt das?',
        options: [
          { text: 'Ja, Zertifikat ist Zertifikat', correct: false },
          {
            text: 'Nein – ein QM-Zertifikat ersetzt weder Gefährdungsbeurteilungen noch Prüfungen, Unterweisungen oder die Betreiberorganisation',
            correct: true,
          },
          { text: 'Ja, aber nur in Kombination mit ISO 14001', correct: false },
          { text: 'Die Frage ist sinnlos, weil ISO 9001 ein Gesetz ist', correct: false },
        ],
        explanation:
          'Managementsystem-Zertifikate können eine Betreiberorganisation stützen, ersetzen aber keine einzige konkrete Betreiberpflicht.',
      },
      {
        id: 'sq-hausmeister-3',
        type: 'multiple-choice',
        text: 'Vierzig Jahre Berufserfahrung – welche Erkenntnis des Hausmeisters trifft den Kern der Betreiberverantwortung?',
        options: [
          { text: '„Was lange hält, muss man nicht prüfen."', correct: false },
          { text: '„Verantwortung kann man kaufen wie Ersatzteile."', correct: false },
          {
            text: '„Technik versagt selten plötzlich – fast immer hat die Organisation vorher schon versagt."',
            correct: true,
          },
          { text: '„Hauptsache, das Prüfbuch sieht ordentlich aus."', correct: false },
        ],
        explanation:
          'Fast jeder technische Unfall hat organisatorische Wurzeln: ignorierte Mängel, überschrittene Fristen, fehlende Zuständigkeiten. Genau dort setzt Betreiberverantwortung an.',
      },
    ],
  },
  {
    id: 'dokument',
    name: 'Das fehlende Dokument',
    emoji: '📄',
    description: 'Vor der Fabrik flattert ein einzelnes Blatt Papier im Wind…',
    unlockLevel: 3,
    position: { x: 13, y: 11 },
    npcName: 'Ein verlorenes Blatt Papier',
    npcIntro:
      'Du hebst das Blatt auf: Es ist Seite 3 eines Prüfberichts der Fabrik – aber welches Dokument fehlt im Prüfordner? Kombiniere die Hinweise!',
    xpReward: 75,
    questions: [
      {
        id: 'sq-dokument-1',
        type: 'multiple-choice',
        text: 'Hinweis 1: Auf dem Blatt steht „…Messung des Isolationswiderstands: 2,1 MΩ – BESTANDEN". Zu welcher Prüfung gehört das Blatt?',
        options: [
          { text: 'Prüfung der Klimaanlage nach Kältemittelverordnung', correct: false },
          { text: 'Elektroprüfung nach DGUV Vorschrift 3', correct: true },
          { text: 'Trinkwasseruntersuchung', correct: false },
          { text: 'Aufzugs-Hauptprüfung', correct: false },
        ],
        explanation: 'Isolationswiderstandsmessung ist klassischer Bestandteil der elektrischen Prüfung nach DGUV V3 / VDE 0105.',
      },
      {
        id: 'sq-dokument-2',
        type: 'multiple-choice',
        text: 'Hinweis 2: Im Prüfordner der Fabrik finden sich Protokolle der Anlagenprüfung von 2022 und 2025 – die Gefährdungsbeurteilung fordert eine Prüffrist von 2 Jahren. Was fehlt?',
        options: [
          { text: 'Nichts – zwei Protokolle reichen doch', correct: false },
          { text: 'Das Prüfprotokoll von 2024 (bzw. der Nachweis der fristgerechten Prüfung dazwischen)', correct: true },
          { text: 'Ein Foto der Anlage', correct: false },
          { text: 'Die Visitenkarte des Prüfers', correct: false },
        ],
        explanation:
          'Bei 2-Jahres-Frist ab 2022 hätte 2024 geprüft werden müssen. Die Lücke im Prüfordner ist der Beweis einer überschrittenen Prüffrist.',
      },
      {
        id: 'sq-dokument-3',
        type: 'multiple-choice',
        text: 'Du meldest die Lücke dem Betriebsleiter. Er sagt: „Drucken wir halt nachträglich ein Protokoll." Deine Antwort?',
        options: [
          { text: '„Gute Idee, ich hole schon mal Papier."', correct: false },
          {
            text: '„Auf keinen Fall – das wäre Urkundenfälschung. Wir prüfen unverzüglich nach und dokumentieren die Fristüberschreitung ehrlich."',
            correct: true,
          },
          { text: '„Wir schreddern einfach den ganzen Ordner."', correct: false },
          { text: '„Egal, merkt ja keiner."', correct: false },
        ],
        explanation:
          'Rückdatierte Protokolle sind Urkundenfälschung (§ 267 StGB). Der richtige Weg: sofort nachprüfen, Abweichung dokumentieren, Prüffristen-Controlling verbessern.',
      },
    ],
  },
  {
    id: 'zeuge',
    name: 'Der Zeuge',
    emoji: '👤',
    description: 'Ein Mann mit hängenden Schultern steht vor dem Gerichtssaal. Er will reden.',
    unlockLevel: 3,
    requiresBuilding: 'gerichtssaal',
    position: { x: 6, y: 12 },
    npcName: 'Der Zeuge',
    npcIntro:
      'Ich war dabei, damals im Sägewerk… Der Kollege verlor seine Hand. Ich erzähle dir, wie es dazu kam – und du sagst mir, welche fünf Fehler der Betreiber gemacht hat: Die Maschine war seit Monaten als defekt gemeldet, aber es gab keinen Prozess für Mängelmeldungen. Der Kollege war neu und wurde nie unterwiesen – „dafür war keine Zeit". Die Schutzeinrichtung war überbrückt, das wussten alle, auch der Meister. Die letzte Prüfung lag vier Jahre zurück. Und als es passierte, fand niemand den Erste-Hilfe-Kasten, ein Ersthelfer war nicht benannt.',
    xpReward: 75,
    questions: [
      {
        id: 'sq-zeuge-1',
        type: 'find-errors',
        text: 'Identifiziere die 5 Fehler des Betreibers aus der Geschichte des Zeugen:',
        selectCount: 5,
        options: [
          { text: 'Kein funktionierendes Mängelmelde-/Instandhaltungsverfahren', correct: true },
          { text: 'Fehlende Unterweisung des neuen Mitarbeiters', correct: true },
          { text: 'Überbrückte Schutzeinrichtung wurde geduldet', correct: true },
          { text: 'Prüffrist der Maschine massiv überschritten', correct: true },
          { text: 'Erste-Hilfe-Organisation fehlte (kein benannter Ersthelfer, Material nicht auffindbar)', correct: true },
          { text: 'Das Sägewerk hatte zu wenige Parkplätze', correct: false },
          { text: 'Der Kollege trug die falsche Schuhgröße', correct: false },
        ],
        explanation:
          'Fünf klassische Organisationsfehler: kein Mängelmanagement, keine Unterweisung, geduldete Manipulation, überschrittene Prüffristen, fehlende Notfallorganisation (§ 10 ArbSchG, ASR A4.3).',
      },
    ],
  },
  {
    id: 'feuerwache-nacht',
    name: 'Nachts in der Feuerwache',
    emoji: '🌙',
    description: 'Die Feuerwache bei Nacht: Blaulicht-Training gegen die Uhr!',
    unlockLevel: 4,
    position: { x: 6, y: 15 },
    npcName: 'Brandmeister Funke (Nachtschicht)',
    npcIntro:
      'Nachtübung! Im Einsatz zählt jede Sekunde – genau wie jetzt: 10 Fragen, 3 Minuten. Schaffst du es unter 2:30, gibt es das Speedrunner-Abzeichen obendrauf. Bereit? Los!',
    totalTimeLimit: 180,
    xpReward: 75,
    badgeReward: 'feuerwehr',
    questions: [
      {
        id: 'sq-nacht-1',
        type: 'true-false',
        text: 'Notruf in Deutschland: Die 112 gilt europaweit.',
        options: [
          { text: 'Wahr', correct: true },
          { text: 'Falsch', correct: false },
        ],
        explanation: 'Die 112 ist der einheitliche EU-Notruf.',
      },
      {
        id: 'sq-nacht-2',
        type: 'true-false',
        text: 'Im Brandfall darf man Aufzüge benutzen, wenn man es eilig hat.',
        options: [
          { text: 'Wahr', correct: false },
          { text: 'Falsch', correct: true },
        ],
        explanation: 'Aufzüge im Brandfall nie benutzen – Stromausfall- und Rauchfalle!',
      },
      {
        id: 'sq-nacht-3',
        type: 'true-false',
        text: 'Brandschutztüren dürfen mit Keilen offen gehalten werden.',
        options: [
          { text: 'Wahr', correct: false },
          { text: 'Falsch', correct: true },
        ],
        explanation: 'Nur zugelassene Feststellanlagen dürfen Brandschutztüren offen halten.',
      },
      {
        id: 'sq-nacht-4',
        type: 'true-false',
        text: 'Feuerlöscher müssen mindestens alle 2 Jahre sachkundig geprüft werden.',
        options: [
          { text: 'Wahr', correct: true },
          { text: 'Falsch', correct: false },
        ],
        explanation: 'Richtig – Instandhaltung alle 2 Jahre nach ASR A2.2 / DIN 14406-4.',
      },
      {
        id: 'sq-nacht-5',
        type: 'true-false',
        text: 'Richtwert: Mindestens 5 % der Beschäftigten sollen Brandschutzhelfer sein.',
        options: [
          { text: 'Wahr', correct: true },
          { text: 'Falsch', correct: false },
        ],
        explanation: 'ASR A2.2 nennt 5 % als Richtwert.',
      },
      {
        id: 'sq-nacht-6',
        type: 'true-false',
        text: 'Fluchtwege dürfen kurzfristig als Lagerfläche genutzt werden.',
        options: [
          { text: 'Wahr', correct: false },
          { text: 'Falsch', correct: true },
        ],
        explanation: 'Fluchtwege sind IMMER vollständig freizuhalten (ASR A2.3).',
      },
      {
        id: 'sq-nacht-7',
        type: 'true-false',
        text: 'Die Brandschutzordnung Teil A ist der Aushang für alle Personen im Gebäude.',
        options: [
          { text: 'Wahr', correct: true },
          { text: 'Falsch', correct: false },
        ],
        explanation: 'DIN 14096: Teil A = Aushang, Teil B = Beschäftigte, Teil C = besondere Aufgaben.',
      },
      {
        id: 'sq-nacht-8',
        type: 'true-false',
        text: 'Eine Brandmeldeanlage nach DIN 14675 braucht nur alle 5 Jahre eine Wartung.',
        options: [
          { text: 'Wahr', correct: false },
          { text: 'Falsch', correct: true },
        ],
        explanation: 'Mindestens jährliche Wartung plus vierteljährliche Inspektionen.',
      },
      {
        id: 'sq-nacht-9',
        type: 'true-false',
        text: 'Beim Verlassen des Gebäudes im Brandfall: Türen zum Brandraum schließen, aber nicht abschließen.',
        options: [
          { text: 'Wahr', correct: true },
          { text: 'Falsch', correct: false },
        ],
        explanation: 'Geschlossene Türen bremsen Feuer und Rauch – abgeschlossene behindern die Feuerwehr.',
      },
      {
        id: 'sq-nacht-10',
        type: 'true-false',
        text: 'Menschenrettung geht im Brandfall immer vor Löschversuch.',
        options: [
          { text: 'Wahr', correct: true },
          { text: 'Falsch', correct: false },
        ],
        explanation: 'Personen warnen und retten hat oberste Priorität – löschen nur, wenn gefahrlos möglich.',
      },
    ],
  },
  {
    id: 'inspektion',
    name: 'Die Inspektion',
    emoji: '🔍',
    description: 'Die letzte Bewährungsprobe: Eine vollständige Begehung des Verwaltungsgebäudes.',
    unlockLevel: 6,
    position: { x: 12, y: 10 },
    npcName: 'Inspektorin Klar',
    npcIntro:
      'Bevor der Bürgermeister dich empfängt, begleitest du mich auf einer Begehung. Wir gehen Raum für Raum durch das Verwaltungsgebäude – und du markierst alle Mängel, die dir auffallen. Augen auf!',
    xpReward: 75,
    questions: [
      {
        id: 'sq-inspektion-1',
        type: 'find-errors',
        text: 'RAUM 1 – Eingangshalle & Flur: Welche 4 Mängel erkennst du?',
        selectCount: 4,
        options: [
          { text: 'Notausgangstür ist mit einer Kette verschlossen', correct: true },
          { text: 'Feuerlöscher: Prüfplakette 3 Jahre alt', correct: true },
          { text: 'Flucht- und Rettungsplan hängt nicht aus', correct: true },
          { text: 'Kopierer steht im Fluchtweg und engt ihn ein', correct: true },
          { text: 'Die Wandfarbe ist unmodern', correct: false },
          { text: 'Der Empfangstresen ist aus Holz', correct: false },
        ],
        explanation:
          'Verschlossene Notausgänge, überfällige Löscherprüfung, fehlender Rettungsplan und eingeengte Fluchtwege – alles klare Verstöße gegen ASR A2.2/A2.3/A1.3.',
      },
      {
        id: 'sq-inspektion-2',
        type: 'find-errors',
        text: 'RAUM 2 – Technikraum & Teeküche: Welche 4 Mängel erkennst du?',
        selectCount: 4,
        options: [
          { text: 'Sicherungskasten ist mit Kartons zugestellt', correct: true },
          { text: 'Mehrfachsteckdosen-Kaskade („Steckdosenleiste an Steckdosenleiste") an der Kaffeemaschine', correct: true },
          { text: 'Tür zum Technikraum steht offen, Unbefugte haben Zutritt', correct: true },
          { text: 'Wasserkocher hat beschädigtes, mit Isolierband geflicktes Kabel', correct: true },
          { text: 'Im Kühlschrank steht abgelaufener Joghurt', correct: false },
          { text: 'Die Kaffeetassen sind nicht gespült', correct: false },
        ],
        explanation:
          'Elektroverteilungen müssen frei zugänglich sein, Steckdosen-Kaskaden sind brandgefährlich, Technikräume sind gegen unbefugten Zutritt zu sichern und beschädigte Geräte sofort außer Betrieb zu nehmen. Der Joghurt ist nur eklig, kein Betreiberthema.',
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────────────────────────────

export const SKILL_TREE: SkillBranchData[] = [
  {
    id: 'jurist',
    name: 'Jurist',
    icon: '⚖️',
    tiers: [
      { tier: 1, name: 'Paragrafenkenner', description: 'Haftungsfragen zeigen einen Gesetzestext-Hinweis an.' },
      { tier: 2, name: 'Anwalt des Betreibers', description: 'Komplexe Rechtsfragen mit 50 % mehr Zeit.' },
      { tier: 3, name: 'Richter', description: 'Schaltet Bonusfragen im Gerichtssaal frei.' },
    ],
  },
  {
    id: 'techniker',
    name: 'Techniker',
    icon: '🔧',
    tiers: [
      { tier: 1, name: 'Prüfprotokoll-Profi', description: 'Checklisten-Fragen zeigen Beispielprotokolle/Hinweise.' },
      { tier: 2, name: 'Anlagenspezialist', description: 'Technische Fragen erhalten einen zweiten Hinweis.' },
      { tier: 3, name: 'Sachverständiger', description: 'Schaltet das Bonuslevel in der Fabrik frei.' },
    ],
  },
  {
    id: 'manager',
    name: 'Manager',
    icon: '📋',
    tiers: [
      { tier: 1, name: 'Delegationsfähig', description: 'Fremdfirmen-Quests zeigen Musterdokumente/Hinweise.' },
      { tier: 2, name: 'Krisenmanager', description: 'Zeitlimit-Fragen haben 30 % mehr Zeit.' },
      { tier: 3, name: 'Compliance-Officer', description: 'Erleichtert den Zugang zur Geheimbibliothek (Hinweispfeil zur Sidequest).' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────
// BADGES
// ─────────────────────────────────────────────────────────────────

export const BADGES: BadgeData[] = [
  { id: 'grundlagen', emoji: '🎓', name: 'Grundlagen-Absolvent', condition: 'Grundschule 100 %' },
  { id: 'notfall', emoji: '⚕️', name: 'Notfall-Experte', condition: 'Krankenhaus 100 %' },
  { id: 'recht', emoji: '⚖️', name: 'Rechtskundiger', condition: 'Gerichtssaal 100 %' },
  { id: 'anlagen', emoji: '⚙️', name: 'Anlagenspezialist', condition: 'Fabrik 100 %' },
  { id: 'brandschutz', emoji: '🔥', name: 'Brandschutzbeauftragter', condition: 'Feuerwache 100 %' },
  { id: 'vefk', emoji: '⚡', name: 'VEFK-Kandidat', condition: 'Elektrowerk 100 %' },
  { id: 'koordination', emoji: '🏗️', name: 'Koordinationsprofi', condition: 'Baustelle 100 %' },
  { id: 'bibliotheksdetektiv', emoji: '🗝️', name: 'Bibliotheksdetektiv', condition: 'Geheimbibliothek entdeckt' },
  { id: 'unfallanalyst', emoji: '💀', name: 'Unfallanalyst', condition: 'Ruine (Boss-Level) bestanden' },
  { id: 'betreiber', emoji: '🏆', name: 'Verantwortlicher Betreiber', condition: 'Alle Hauptgebäude 100 %' },
  { id: 'feuerwehr', emoji: '🚒', name: 'Feuerwehr-Abzeichen', condition: 'Sidequest „Nachts in der Feuerwache" bestanden' },
  { id: 'speedrunner', emoji: '⚡', name: 'Speedrunner', condition: '„Nachts in der Feuerwache" in unter 2:30' },
  { id: 'perfektionist', emoji: '🧙', name: 'Perfektionist', condition: 'Alle Fragen beim ersten Versuch richtig' },
];

/** Gebäude-ID → Badge-ID bei 100 % Abschluss */
export const BUILDING_BADGES: Partial<Record<string, string>> = {
  grundschule: 'grundlagen',
  krankenhaus: 'notfall',
  gerichtssaal: 'recht',
  fabrik: 'anlagen',
  feuerwache: 'brandschutz',
  elektrowerk: 'vefk',
  baustelle: 'koordination',
  ruine: 'unfallanalyst',
};

/** Hauptgebäude, die für das Bürgermeisteramt abgeschlossen sein müssen */
export const MAIN_BUILDINGS = [
  'rathaus',
  'grundschule',
  'krankenhaus',
  'gerichtssaal',
  'fabrik',
  'feuerwache',
  'elektrowerk',
  'baustelle',
] as const;

// ─────────────────────────────────────────────────────────────────
// DEKORATION
// ─────────────────────────────────────────────────────────────────

export const DECORATIONS: DecorationData[] = [
  { type: 'tree', x: 0, y: 5 }, { type: 'tree', x: 6, y: 1 }, { type: 'tree', x: 13, y: 1 },
  { type: 'tree', x: 19, y: 4 }, { type: 'tree', x: 0, y: 14 }, { type: 'tree', x: 19, y: 8 },
  { type: 'tree', x: 6, y: 8 }, { type: 'tree', x: 13, y: 8 }, { type: 'tree', x: 0, y: 19 },
  { type: 'tree', x: 19, y: 19 }, { type: 'tree', x: 7, y: 14 }, { type: 'tree', x: 14, y: 14 },
  { type: 'lantern', x: 7, y: 6 }, { type: 'lantern', x: 12, y: 6 }, { type: 'lantern', x: 7, y: 12 },
  { type: 'lantern', x: 12, y: 12 }, { type: 'lantern', x: 5, y: 18 }, { type: 'lantern', x: 14, y: 18 },
  { type: 'bench', x: 9, y: 6 }, { type: 'bench', x: 10, y: 12 }, { type: 'bench', x: 5, y: 9 },
  { type: 'bush', x: 1, y: 8 }, { type: 'bush', x: 18, y: 13 }, { type: 'bush', x: 3, y: 13 },
  { type: 'bush', x: 16, y: 7 }, { type: 'bush', x: 8, y: 19 }, { type: 'bush', x: 12, y: 19 },
  { type: 'flowers', x: 2, y: 4 }, { type: 'flowers', x: 17, y: 4 }, { type: 'flowers', x: 6, y: 10 },
  { type: 'flowers', x: 13, y: 10 }, { type: 'flowers', x: 2, y: 19 }, { type: 'flowers', x: 17, y: 19 },
];
