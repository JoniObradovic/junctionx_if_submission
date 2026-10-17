export default {
  schemaVersion: 1,
  title: 'Ensimmäinen lapsi',
  presentation: {
    contextTitle: 'Valmistaudutaan yhdessä',
    tasksTitle: 'Pieni tarkistus kerrallaan',
    topicTitles: {
      car: 'Turvaistuin ja autoilu',
      sleep: 'Nukkuminen ja kalusteet',
      home: 'Kemikaalit ja sähkö',
    },
    progressTitle: 'Kaikkien aiheiden valmistelut',
    progressNotice:
      'Mittari laskee kaikki hankintatapaan soveltuvat tehtävät aihevalinnasta riippumatta. Se ei ole turvallisuustodistus tai arvio vakuutuksen myöntämisestä.',
    emptyTasksLabel: 'Tälle aiheelle ei ole näkyviä tehtäviä.',
    packetLabel: 'Kysymysluonnos · kuvitteellinen perhe',
    conditionLabel: 'Hankintatapa',
    commonChecksLabel:
      'Myös yhteiset tarkistukset ovat mukana. Aihevalinta rajaa vain tehtävälistaa.',
  },
  persona: 'Esikoisen odotus – Laskettu aika 6 viikon kuluttua',
  referenceYear: 2026,
  demoNotice:
    'Kuvitteellinen perhe. Tuotteita tai vakuutusturvaa ei ole tarkastettu. Älä syötä terveystietoja.',
  defaults: {
    category: 'all',
    equipmentCondition: 'used',
    weeksUntilDue: 6,
    completedTaskIds: [],
  },
  controls: [
    {
      id: 'category',
      type: 'choice',
      label: 'Tarkistusten aihe',
      options: [
        {
          value: 'all',
          label: 'Kaikki',
        },
        {
          value: 'car',
          label: 'Turvaistuin & Autoilu',
        },
        {
          value: 'sleep',
          label: 'Nukkuminen & Kalusteet',
        },
        {
          value: 'home',
          label: 'Kodin kemikaalit & Sähkö',
        },
      ],
      help: 'Aihe rajaa tehtävälistaa. Se ei poista muiden aiheiden valmisteluja.',
    },
    {
      id: 'equipmentCondition',
      type: 'choice',
      label: 'Hankintatapa',
      options: [
        {
          value: 'new',
          label: 'Uudet hankinnat',
        },
        {
          value: 'used',
          label: 'Käytettynä hankitut',
        },
      ],
      help: 'Käytetyt hankinnat tuovat lisäkysymyksiä historiasta ja osista. Myös uudet tuotteet tarkistetaan.',
    },
  ],
  sources: [
    {
      id: 'baby-liikenneturva-seat',
      publisher: 'Liikenneturva',
      title: 'Turvaistuin',
      url: 'https://www.liikenneturva.fi/liikenteessa/turvaistuin/',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'Verkkosivu, tarkistettu 17.10.2026',
      locator: 'E-hyväksyntä; Käytetty turvaistuin',
      limitation:
        'Uutena myytävien R129-hyväksyntä ja vanhojen R44/03–04-istuinten edelleen sallittu käyttö ovat eri asioita. Historiasta, käyttöiästä ja sopivuudesta on varmistuttava tuotekohtaisesti.',
    },
    {
      id: 'baby-liikenneturva-faq',
      publisher: 'Liikenneturva',
      title: 'Turvaistuin: usein kysytyt kysymykset',
      url: 'https://www.liikenneturva.fi/liikenteessa/turvaistuin-usein-kysytyt-kysymykset/',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'Verkkosivu, tarkistettu 17.10.2026',
      locator:
        'Voiko kolarissa ollutta istuinta käyttää?; Mikä on turvaistuimen käyttöikä?; Voiko käytettyä turvaistuinta käyttää?; Mitä i-Size tarkoittaa?',
      limitation:
        'Noudata myös istuimen, telakan ja auton ohjeita. Valmistaja määrittelee käyttöiän ja kolarin jälkeiset toimet. R129 ja i-Size eivät ole synonyymejä. Demo ei hyväksy yksittäistä istuinta turvalliseksi.',
    },
    {
      id: 'baby-tukes-sleep',
      publisher: 'Turvallisuus- ja kemikaalivirasto (Tukes)',
      title: 'Turvallinen uni',
      url: 'https://tukes.fi/turvallinen-uni',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'Verkkosivu, ei julkaistua versionumeroa',
      locator: 'Pikkuvauvan sänky; johdanto',
      limitation:
        'Kuluttajaohje pinnoista, laidoista ja patjasta; ei standardin koko testiohjelma tai yksittäisen sängyn hyväksyntä. Tukesin ohje vahvistaa 6,5 cm enimmäisvälin, ei tässä käytettävää 4,5 cm alarajaa.',
    },
    {
      id: 'baby-tukes-interior',
      publisher: 'Turvallisuus- ja kemikaalivirasto (Tukes)',
      title: 'Turvallinen sisustus lapsiperheissä',
      url: 'https://tukes.fi/turvallinen-sisustus-lapsiperheissa',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'Verkkosivu, ei julkaistua versionumeroa',
      locator: 'Sähköturvallisuus; Kaihtimet ja verhot; Hoitopöytä',
      limitation:
        'Arjen valmistautumisohjeita. Valvonta on tarpeen myös uuden hoitopöydän kanssa. Ohje ei oikeuta omatoimisiin kiinteisiin sähköasennuksiin.',
    },
    {
      id: 'baby-tukes-furniture',
      publisher: 'Turvallisuus- ja kemikaalivirasto (Tukes)',
      title: 'Huonekalut',
      url: 'https://tukes.fi/tuotteet-ja-palvelut/yleiset-kulutustavarat/huonekalut',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'Verkkosivu, ei julkaistua versionumeroa',
      locator: 'Huonekalujen turvallisuus; Merkinnät ja käyttöohjeet',
      limitation:
        'Tukee kokoamisohjeiden, osien ja turvallisen rakenteen tarkistamista. Huonekaluille ei vaadita CE-merkkiä. Valintaruutu ei todista vaatimustenmukaisuutta.',
    },
    {
      id: 'baby-tukes-chemicals',
      publisher: 'Turvallisuus- ja kemikaalivirasto (Tukes)',
      title: 'Kemikaalit – Turvallinen koti lapselle',
      url: 'https://tukes.fi/kemikaalit1',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'Verkkosivu, ei julkaistua versionumeroa',
      locator:
        'Lue pakkausselosteet, kysy tarvittaessa myyjältä; Opettele kemikaalien varoitusmerkit',
      limitation:
        'Koskee kemikaalien merkintöjä ja säilyttämistä lasten ulottumattomissa. Ei lääkkeiden säilytysohje, myrkytystilanteen hoito-ohje tai väite kaikkien kemikaalien vaarallisuudesta.',
    },
    {
      id: 'baby-bsi-cot-metadata',
      publisher: 'BSI',
      title:
        "BS EN 716-1:2017 – Furniture. Children's cots and folding cots for domestic use. Safety requirements",
      url: 'https://knowledge.bsigroup.com/products/furniture-childrens-cots-and-folding-cots-for-domestic-use-safety-requirements-1',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'BS EN 716-1:2017; EN 716-1:2017/Cor1:2019',
      locator: 'Public Overview; Product Details → International relationships',
      limitation:
        'Vain julkinen soveltamisala ja EN-vastaavuus luettu. Ei maksullista standardia, suomalaista SFS-painosta tai tuotteen testiraporttia. Ei hoitopöydän tai kaikkien kehtotyyppien yleisstandardi.',
    },
    {
      id: 'baby-bsi-changing-metadata',
      publisher: 'BSI',
      title:
        'BS EN 12221:2026 – Child care articles. Changing units and changing pads for domestic use. Safety requirements and test methods',
      url: 'https://knowledge.bsigroup.com/products/child-care-articles-changing-units-and-changing-pads-for-domestic-use-safety-requirements-and-test-methods',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'BS EN 12221:2026, julkaistu 31.3.2026',
      locator: 'Julkinen metadata ja Scope, sivun palvelimelta toimitettu HTML',
      limitation:
        'Vain hoitotason käyttötarkoituksen soveltamisala tarkistettu. Ei täyttä standardia, SFS-julkaisun tilaa tai yksittäisen tuotteen vaatimustenmukaisuutta.',
    },
    {
      id: 'baby-if-product',
      publisher: 'If',
      title: 'Vauvavakuutus – Syntymättömän lapsen vakuutus',
      url: 'https://www.if.fi/henkiloasiakkaat/vakuutukset/henkilovakuutukset/vauvavakuutus',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'Verkkosivu, tarkistettu 17.10.2026',
      locator:
        'Miten ostan vauvavakuutuksen?; Milloin vauvavakuutus pitää ottaa?; Terveysselvitys oston jälkeen',
      limitation:
        'Tuotesivun hakuajankohta ei ole myöntämis- tai korvauslupaus. Terveysselvitys, muut myöntämisperusteet, vakuutuskirja ja ehdot on tarkistettava erikseen.',
    },
    {
      id: 'baby-if-guide',
      publisher: 'If',
      title: 'Lapsivakuutusopas',
      url: 'https://www.if.fi/globalassets/fi/pdf/opas/lapsivakuutusopas.pdf',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'Voimassa 1.1.2026 alkaen',
      effectiveFrom: '2026-01-01',
      locator: 's. 5 myöntämisperusteet; s. 18–19 terveydentilan vaikutus',
      limitation:
        'Myyntiopas, ei koko vakuutussopimus. Syntymän jälkeen terveydentila voi vaikuttaa myöntämiseen ja rajoituksiin. Henkilökohtaista terveydentilaa tai vakuutuksen myöntämistä ei arvioida demossa.',
    },
    {
      id: 'baby-if-terms',
      publisher: 'If',
      title: 'Henkilövakuutusehdot',
      url: 'https://www.if.fi/globalassets/fi/pdf/ehdot/henkilovakuutusehdot.pdf',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'HEN 100.26',
      effectiveFrom: '2026-01-01',
      locator: 's. 1 Henkilövakuutustuotteet ja vakuutuskirjan merkitys',
      limitation:
        'Vakuutuskirja kertoo sopimukseen sisältyvät tuotteet ja turvat. Demo ei väitä kaikkien kulujen tai sairauksien olevan vakuutettuja eikä arvioi perheen sopimusta.',
    },
  ],
  rules: {
    carSeat: {
      status: 'verified',
      sourceIds: ['baby-liikenneturva-seat', 'baby-liikenneturva-faq'],
      universalMaximumAgeYears: null,
      lifetimeBasis: 'manufacturerAndModel',
      newSaleApproval: 'UN ECE R129',
      legacyUseApprovals: ['UN ECE R44/03', 'UN ECE R44/04'],
      allR129AreISize: false,
      automaticSafetyApproval: false,
      limitation:
        'Pelkkä ikä, hyväksyntämerkintä tai käytetty/uusi-valinta ei osoita istuimen ja telakan turvallisuutta. Tarkista historia, kunto, käyttöikä ja sopivuus.',
    },
    cotBarSpacing: {
      status: 'verified',
      sourceIds: ['baby-tukes-sleep'],
      maximumGapCm: 6.5,
      minimumGapCm: null,
      limitation:
        'Tukesin kuluttajaohjeen enimmäisväli. Mitta ei ole sängyn hyväksyntätesti eikä tue kaikkia aukkoja koskevaa yleistä 4,5–6,5 cm sääntöä.',
    },
    insuranceTiming: {
      status: 'verified',
      sourceIds: ['baby-if-product', 'baby-if-guide', 'baby-if-terms'],
      latestBeforeDue: {
        value: 2,
        unit: 'calendarMonths',
      },
      postnatalMinimumAgeDays: 7,
      healthDeclarationRequiredForChildInsurance: true,
      automaticEligibilityCheck: false,
      limitation:
        'Kalenterikuukausia ei muunnettaisi yleiseksi kahdeksan viikon rajaksi. Kuuden viikon esimerkki on hakuajan jälkeen, mutta olemassa oleva vakuutus ja syntymän jälkeiset vaihtoehdot ovat erillisiä kysymyksiä.',
    },
    filtering: {
      status: 'illustrative',
      sourceIds: ['baby-liikenneturva-faq', 'baby-tukes-furniture'],
      categoryChangesApplicability: false,
      readinessBasis: 'allConditionApplicableTasks',
      preserveHiddenTaskState: true,
      limitation:
        'Aihepainike rajaa vain näkymää. Hankintatapa muuttaa lisätarkistusten soveltuvuutta, mutta uusi tuote ei vapauta kaikille yhteisistä tarkistuksista.',
    },
  },
  standards: [
    {
      id: 'cot',
      category: 'sleep',
      label: 'Pinnasängyt: EN 716-1',
      status: 'verified',
      sourceIds: ['baby-bsi-cot-metadata'],
      limitation:
        'Julkinen EN-soveltamisala tarkistettu BSI:n kautta. SFS-painosta ja tuotteen testitulosta ei ole tarkistettu; ei yleinen hoitopöytästandardi.',
    },
    {
      id: 'changing-unit',
      category: 'sleep',
      label: 'Hoitotasot: EN 12221',
      status: 'verified',
      sourceIds: ['baby-bsi-changing-metadata'],
      limitation:
        'Julkinen EN-soveltamisala tarkistettu BSI:n kautta. Ei yksittäisen tuotteen hyväksyntä tai väite vanhan tuotteen takautuvasta testivaatimuksesta.',
    },
  ],
  insights: {
    usedEquipment: {
      title: 'Selvitä käytetyn tuotteen historia ennen käyttöä',
      status: 'verified',
      sourceIds: ['baby-liikenneturva-faq', 'baby-tukes-furniture'],
      when: {
        equipmentCondition: 'used',
      },
      text: 'Turvaistuimen ja telakan tausta on tunnettava. Hanki myös kalusteiden ohjeet ja tarkista osat.',
      limitation:
        'Käytetty ei automaattisesti tarkoita vaarallista. Epäselvää historiaa ei kuitenkaan ratkaista pelkällä siistillä ulkonäöllä tai valintaruudulla.',
    },
    newEquipment: {
      title: 'Myös uudet hankinnat tarvitsevat tarkistuksen',
      status: 'verified',
      sourceIds: ['baby-liikenneturva-faq', 'baby-tukes-furniture'],
      when: {
        equipmentCondition: 'new',
      },
      text: 'Varmista tuotteen sopivuus, ohjeet ja oikea kokoaminen ennen ensimmäistä käyttöä.',
      limitation:
        'Uusi-valinta ei vahvista valmistajaa, tuotetta tai asennusta turvalliseksi.',
    },
    approval: {
      title: 'Hyväksyntä ja sopivuus tarkistetaan erikseen',
      category: 'car',
      status: 'verified',
      sourceIds: ['baby-liikenneturva-seat', 'baby-liikenneturva-faq'],
      text: 'Uutena myytävissä istuimissa käytetään R129-hyväksyntää. Vanhan R44/03–04-istuimen käyttöä arvioidaan erikseen. Kaikki R129-istuimet eivät ole i-Size-istuimia.',
      limitation:
        'Noudata istuimen, telakan ja auton ohjeita. Hyväksyntä ei yksin osoita juuri teidän yhdistelmänne sopivuutta.',
    },
    preparation: {
      title: 'Pieni tarkistus kerrallaan',
      status: 'illustrative',
      sourceIds: ['baby-tukes-sleep', 'baby-tukes-interior'],
      text: 'Valmistele vauvan arkea rauhassa. Osa kodin järjestelyistä auttaa myös myöhemmin, kun lapsi alkaa liikkua.',
      limitation:
        'Esimerkkilista ei kata kaikkia vauvan turvallisuusasioita. Valmistumisprosentti kuvaa tehtäviä, ei kodin tai tuotteen turvallisuustodistusta.',
    },
    insurance: {
      title: 'Tarkista nykyinen turva ja seuraavat vaihtoehdot',
      status: 'verified',
      sourceIds: ['baby-if-product', 'baby-if-guide', 'baby-if-terms'],
      alwaysVisible: true,
      text: 'Kuuden viikon esimerkissä Ifin ilmoittama kahden kuukauden määräaika uudelle raskausaikaiselle vakuutukselle on jo ohitettu. Tarkista mahdollinen nykyinen vakuutuksesi. Lapsivakuutusta voi hakea seitsemän vuorokauden iästä alkaen; terveydentila ja muut myöntämisperusteet vaikuttavat.',
      limitation:
        'Ei vakuutushakemus, hinta- tai myöntämislupaus. Älä muuta tai päätä nykyistä vakuutusta tämän demon perusteella. Terveystietoja ei kerätä.',
    },
    existingInsurance: {
      title: 'Vauvavakuutus löytyy jo esimerkistä',
      text: 'Tässä profiilissa vauvavakuutus on jo hankittu. Kokoa vakuutuskirja ja kysy, mitä sopimuksen tiedoista ja syntymän jälkeisistä käytännöistä tulee tarkistaa.',
      status: 'illustrative',
      sourceIds: ['baby-if-product', 'baby-if-terms'],
      limitation:
        'Kuvitteellinen vakuutusvalinta. Olemassaoloa, turvan sisältöä tai tarvittavia jatkotoimia ei ole tarkistettu. Tämä ei ole uusi hakemus, myöntämislupaus tai ohje muuttaa vakuutusta.',
    },
  },
  tasks: [
    {
      id: 'seat-fit',
      category: 'car',
      title: 'Tarkista turvakaukalon ja telakan sopivuus autoon',
      why: 'Varaa aikaa käyttöohjeiden lukemiseen ja oikean asennuksen harjoitteluun.',
      priority: 'high',
      status: 'verified',
      sourceIds: ['baby-liikenneturva-faq'],
      limitation:
        'Varmista sopivuus myös lapsen koon ja auton ohjeiden mukaan. Demo ei tarkasta asennusta.',
    },
    {
      id: 'seat-history',
      category: 'car',
      title: 'Selvitä käytetyn istuimen ja telakan historia',
      why: 'Varmista aiemmat vauriot ja valmistajan määrittämä käyttöikä sekä sen laskentatapa.',
      priority: 'critical',
      status: 'verified',
      sourceIds: ['baby-liikenneturva-faq'],
      when: {
        equipmentCondition: 'used',
      },
      limitation:
        'Jos historia jää epäselväksi, turvallisuudesta ei voida varmistua. Kolarin jälkeinen käyttö selvitetään valmistajan ohjeista, ei demon ikärajalla.',
    },
    {
      id: 'cot-check',
      category: 'sleep',
      title: 'Tarkista pinnasängyn laidat, pinnat ja patjan sopivuus',
      why: 'Varmista laitojen kiinnitys, ohjeiden mukainen patja ja enintään 6,5 cm pinnojen väli.',
      priority: 'high',
      status: 'verified',
      sourceIds: ['baby-tukes-sleep'],
      limitation:
        'Tämä kuluttajatarkistus ei kata standardin kaikkia mittoja ja testejä. Sängyn pitää soveltua lapsen kehitysvaiheeseen.',
    },
    {
      id: 'used-furniture',
      category: 'sleep',
      title: 'Hanki käytettyjen kalusteiden kokoamisohjeet ja tarkista osat',
      why: 'Vertaa osia ohjeeseen ja selvitä epäselvät kiinnitykset myyjältä tai valmistajalta.',
      priority: 'high',
      status: 'illustrative',
      sourceIds: ['baby-tukes-furniture'],
      when: {
        equipmentCondition: 'used',
      },
      limitation:
        'Ohjeiden ja osien läpikäynti on käytettyyn kalusteeseen sovellettu valmistautumistehtävä, ei kuntotodistus tai itse tehtävä rakenteellinen korjausohje.',
    },
    {
      id: 'changing-unit',
      category: 'sleep',
      title: 'Valmistele hoitopiste ja valvonta',
      why: 'Pidä tarvikkeet käden ulottuvilla. Vauvaa ei jätetä hoitopöydälle yksin edes hetkeksi.',
      priority: 'high',
      status: 'verified',
      sourceIds: ['baby-tukes-interior'],
      limitation:
        'Reunat tai mahdolliset valjaat eivät korvaa valvontaa. Noudata oman hoitotason ohjeita.',
    },
    {
      id: 'sleep-cords',
      category: 'sleep',
      title: 'Siirrä johdot ja kaihtimien narut pois sängyn läheltä',
      why: 'Varmista, ettei lapsi ylety naruihin tai johdoista muodostuviin lenkkeihin.',
      priority: 'high',
      status: 'verified',
      sourceIds: ['baby-tukes-interior'],
      limitation:
        'Huomioi myös itkuhälyttimen johto. Tarkista sijoittelu uudelleen lapsen kasvaessa.',
    },
    {
      id: 'chemicals',
      category: 'home',
      title: 'Lue kemikaalien merkinnät ja järjestä säilytys',
      why: 'Noudata pakkausten ohjeita ja pidä varoitusmerkein merkityt kemikaalit lasten ulottumattomissa.',
      priority: 'high',
      status: 'verified',
      sourceIds: ['baby-tukes-chemicals'],
      limitation:
        'Valmistaudu myös lapsen liikkumiseen. Tämä ei ole myrkytystilanteen hoito-ohje.',
    },
    {
      id: 'electricity',
      category: 'home',
      title: 'Tarkista pistorasioiden lapsisuojaus ja sähkölaitteiden kunto',
      why: 'Poista rikkoutuneet laitteet käytöstä. Pyydä sähköalan ammattilaista vaihtamaan suojaamattomat rasiat tarvittaessa.',
      priority: 'high',
      status: 'verified',
      sourceIds: ['baby-tukes-interior'],
      limitation:
        'Pistorasioita ei avata tai vaihdeta itse tämän listan perusteella. Valmistelu ei korvaa sähköasennusten ammattilaisarviota.',
    },
  ],
  actions: [
    {
      id: 'prepare-questions',
      label: 'Valmistele kysymykset – demo',
      title: 'Kysymykset myyjälle tai valmistajalle',
      status: 'illustrative',
      sourceIds: ['baby-liikenneturva-faq', 'baby-tukes-furniture'],
      text: 'Mikä on tuotteen malli? Löytyvätkö ohjeet ja kaikki osat? Miten käyttöikä määritellään? Mitä historiasta tiedetään?',
      confirmation:
        'Kysymyslista on esimerkki. Mitään ei lähetetty eikä tuotetta tarkastettu.',
      limitation:
        'Ei yhteyttä myyjään, valmistajaan tai vakuutuspalveluun. Tietoja tai terveysselvitystä ei toimiteta.',
    },
  ],
  business: {
    status: 'illustrative',
    label: 'Liiketoimintahypoteesi',
    sourceIds: [
      'baby-tukes-interior',
      'baby-liikenneturva-faq',
      'baby-if-guide',
    ],
    text: 'Elämänvaiheeseen ajoitetut tarkistukset voivat helpottaa valmistautumista ja ohjata oikean lähteen äärelle.',
    proposedMetrics: [
      'Valmistelutehtävien valmistumisaste',
      'Valmistajan ohjeiden löytyminen käyttäjätestissä',
      'Vakuutuksen hakuajan ymmärtäminen',
    ],
    limitation:
      'Ehdotettuja pilotin mittareita. Tapaturmien vähenemistä, vakuutusmyyntiä tai asiakaspysyvyyden kasvua ei ole mitattu.',
  },
  english: {
    title: 'First baby',
    'presentation.contextTitle': "Let's prepare together",
    'presentation.topicTitles.home': 'Chemicals and electricity',
    'presentation.progressNotice':
      'The indicator counts all tasks relevant to the purchase type, regardless of topic filter. It is not a safety certificate or insurance underwriting assessment.',
    'presentation.emptyTasksLabel': 'No tasks are visible for this topic.',
    'presentation.packetLabel': 'Question draft · fictional family',
    'presentation.conditionLabel': 'Purchase type',
    'presentation.commonChecksLabel':
      'Common checks remain included. The topic filter only narrows the displayed tasks.',
    persona: 'Expecting a first baby – Due in 6 weeks',
    demoNotice:
      'Fictional family. Products and insurance cover have not been checked. Do not enter health information.',
    'controls.0.label': 'Topic to check',
    'controls.0.options.0.label': 'All',
    'controls.0.options.1.label': 'Car seats & travel',
    'controls.0.options.2.label': 'Sleep & furniture',
    'controls.0.options.3.label': 'Household chemicals & electricity',
    'controls.0.help':
      'The topic filters the task list. It does not remove preparations in other topics.',
    'controls.1.label': 'Purchase type',
    'controls.1.options.0.label': 'Bought new',
    'controls.1.options.1.label': 'Bought second-hand',
    'controls.1.help':
      'Second-hand items add questions about history and parts. New products also need checking.',
    'rules.carSeat.limitation':
      'Age, an approval label or a new/used selection alone cannot establish the safety of a seat and base. Check history, condition, service life and compatibility.',
    'rules.cotBarSpacing.limitation':
      'Maximum spacing in Tukes consumer guidance. This measurement is not an approval test for the cot and does not establish a general 4.5–6.5 cm rule for every opening.',
    'rules.insuranceTiming.limitation':
      'Calendar months must not be converted into a general eight-week limit. This six-week example is past the application deadline, but existing insurance and options after birth are separate questions.',
    'rules.filtering.limitation':
      'The topic button only filters the view. Purchase type changes which extra checks apply; a new item still needs the common checks.',
    'standards.0.label': 'Cots: EN 716-1',
    'standards.0.limitation':
      "The public EN scope was checked through BSI. The SFS edition and the product's test result were not checked; this is not a general changing-table standard.",
    'standards.1.label': 'Changing units: EN 12221',
    'standards.1.limitation':
      'The public EN scope was checked through BSI. This does not approve a particular product or claim a retrospective test requirement for an old item.',
    'insights.usedEquipment.title':
      "Establish a second-hand product's history before use",
    'insights.usedEquipment.text':
      'You need to know the history of the car seat and base. Obtain furniture instructions and check the parts too.',
    'insights.usedEquipment.limitation':
      'Second-hand does not automatically mean unsafe. A clean appearance or a tick cannot resolve an unknown history.',
    'insights.newEquipment.title': 'New purchases need checking too',
    'insights.newEquipment.text':
      'Confirm compatibility, instructions and correct assembly before first use.',
    'insights.newEquipment.limitation':
      'Selecting new does not certify the manufacturer, product or installation as safe.',
    'insights.approval.title': 'Check approval and compatibility separately',
    'insights.approval.text':
      'New seats sold use R129 approval. Use of an older R44/03–04 seat is assessed separately. Not every R129 seat is an i-Size seat.',
    'insights.approval.limitation':
      'Follow the seat, base and vehicle instructions. Approval alone does not establish compatibility for your particular combination.',
    'insights.preparation.title': 'One small check at a time',
    'insights.preparation.text':
      'Prepare calmly for everyday life with a baby. Some arrangements at home will also help later when your child starts moving.',
    'insights.preparation.limitation':
      'The example list does not cover every baby safety issue. The completion percentage describes tasks, not a safety certificate for a home or product.',
    'insights.insurance.title': 'Review current cover and the next options',
    'insights.insurance.text':
      "In this six-week example, If's published two-month deadline for new insurance during pregnancy has already passed. Check any insurance you already have. Child insurance can be applied for from seven days of age; health and other underwriting criteria affect acceptance.",
    'insights.insurance.limitation':
      'This is not an application, quote or promise of acceptance. Do not change or cancel existing insurance based on this demo. No health information is collected.',
    'insights.existingInsurance.title':
      'Baby insurance is already in this example',
    'insights.existingInsurance.text':
      'This profile already has baby insurance. Gather the policy schedule and ask which contract details and arrangements after birth need reviewing.',
    'insights.existingInsurance.limitation':
      'Fictional policy selection. Existence, cover and required next steps have not been checked. This is not a new application, promise of acceptance or advice to change a policy.',
    'tasks.0.title': 'Check that the infant seat and base fit the car',
    'tasks.0.why':
      'Allow time to read the instructions and practise correct installation.',
    'tasks.0.limitation':
      "Also check compatibility with your child's size and the vehicle instructions. The demo does not inspect installation.",
    'tasks.1.title': 'Establish the history of the second-hand seat and base',
    'tasks.1.why':
      "Check previous damage and the manufacturer's stated service life and how it is calculated.",
    'tasks.1.limitation':
      "If the history remains unclear, safety cannot be established. Follow the manufacturer's instructions on use after a collision, not an age limit from the demo.",
    'tasks.2.title': 'Check the cot sides, bars and mattress fit',
    'tasks.2.why':
      'Check side fixings, a mattress matching the instructions and bar spacing of no more than 6.5 cm.',
    'tasks.2.limitation':
      "This consumer check does not cover every dimension and test in the standard. The cot must suit the child's developmental stage.",
    'tasks.3.title':
      'Get assembly instructions and check second-hand furniture parts',
    'tasks.3.why':
      'Compare the parts with the instructions; ask the seller or manufacturer about unclear fixings.',
    'tasks.3.limitation':
      'Reviewing instructions and parts is preparation for second-hand furniture, not a condition certificate or instructions for structural DIY repairs.',
    'tasks.4.title': 'Prepare the changing area and supervision',
    'tasks.4.why':
      'Keep supplies within reach. Never leave a baby alone on a changing table, even briefly.',
    'tasks.4.limitation':
      'Edges or straps do not replace supervision. Follow the instructions for your own changing unit.',
    'tasks.5.title': 'Move cables and blind cords away from the cot',
    'tasks.5.why':
      'Make sure the child cannot reach cords or loops formed by cables.',
    'tasks.5.limitation':
      'Include the baby monitor cable. Recheck placement as your child grows.',
    'tasks.6.title': 'Read chemical labels and arrange safe storage',
    'tasks.6.why':
      "Follow packaging instructions and keep chemicals with warning symbols out of children's reach.",
    'tasks.6.limitation':
      'Prepare for your child becoming mobile too. This is not treatment advice for poisoning.',
    'tasks.7.title':
      'Check child protection on sockets and the condition of appliances',
    'tasks.7.why':
      'Stop using damaged appliances. Ask an electrical professional to replace unprotected sockets where necessary.',
    'tasks.7.limitation':
      'Do not open or replace sockets yourself based on this list. Preparation does not replace a professional assessment of electrical installations.',
    'actions.0.label': 'Prepare questions – demo',
    'actions.0.title': 'Questions for the seller or manufacturer',
    'actions.0.text':
      'What is the product model? Are instructions and all parts available? How is service life defined? What is known about its history?',
    'actions.0.confirmation':
      'This question list is an example. Nothing was sent and no product was inspected.',
    'actions.0.limitation':
      'No connection to a seller, manufacturer or insurance service. No details or health declaration are submitted.',
    'business.label': 'Business hypothesis',
    'business.text':
      'Checks timed to a life stage could help people prepare and find the right sources.',
    'business.proposedMetrics.0': 'Preparation task completion rate',
    'business.proposedMetrics.1':
      'Finding manufacturer instructions in user testing',
    'business.proposedMetrics.2':
      'Understanding the insurance application deadline',
    'business.limitation':
      'Proposed pilot measures. Fewer accidents, insurance sales and increased retention have not been measured.',
    'presentation.tasksTitle': 'One small check at a time',
    'presentation.topicTitles.car': 'Car seat and travel',
    'presentation.topicTitles.sleep': 'Sleep and furniture',
    'presentation.progressTitle': 'Preparations across all topics',
    'sources.0.limitation':
      'R129 approval for seats sold new and continued permitted use of older R44/03–04 seats are separate matters. History, service life and compatibility must be checked for each product.',
    'sources.1.limitation':
      'Also follow the seat, base and vehicle instructions. The manufacturer defines service life and actions after a collision. R129 and i-Size are not synonyms. The demo does not approve an individual seat as safe.',
    'sources.2.limitation':
      'Consumer guidance on bars, sides and mattresses; not the complete standard test programme or approval of a particular cot. Tukes confirms a 6.5 cm maximum, not a 4.5 cm minimum used here.',
    'sources.3.limitation':
      'Everyday preparation guidance. Supervision is also required with a new changing table. This does not authorise DIY work on fixed electrical installations.',
    'sources.4.limitation':
      'Supports checking assembly instructions, parts and safe construction. Furniture does not require CE marking. A tick does not prove conformity.',
    'sources.5.limitation':
      "Covers chemical labels and keeping chemicals out of children's reach. Not medicine storage or poisoning treatment guidance, or a claim that all chemicals are dangerous.",
    'sources.6.limitation':
      'Only the public scope and EN equivalence were read, not the paid standard, Finnish SFS edition or a product test report. Not a general standard for changing tables or all cradle types.',
    'sources.7.limitation':
      'Only the scope for changing units was checked, not the full standard, SFS publication status or conformity of an individual product.',
    'sources.8.limitation':
      "The product page's application deadline is not a promise of acceptance or compensation. A health declaration, other criteria, policy schedule and terms require separate review.",
    'sources.9.limitation':
      'Sales guide, not the full insurance contract. Health after birth can affect acceptance and exclusions. The demo does not assess personal health or underwriting.',
    'sources.10.limitation':
      "The policy schedule lists the contract's products and cover. The demo does not claim that all expenses or illnesses are insured or assess the family's contract.",
    'audiences.visitor.caseIntro':
      'Prepare for your baby, check equipment and explore insurance questions. Existing child cover is not assumed.',
    'audiences.visitor.contextTitle': 'First checks and cover questions',
    'audiences.visitor.progressTitle': 'Getting ready for your baby',
    'audiences.visitor.packetContext':
      'New customer questions: products and possible insurance options have not been checked.',
    'audiences.customer.caseIntro':
      'Continue your family preparations and review the example cover. Already-selected baby insurance brings a contract review in place of buying guidance.',
    'audiences.customer.contextTitle': 'Your preparations and existing cover',
    'audiences.customer.progressTitle': 'Your family preparation tasks',
    'audiences.customer.packetContext':
      'Existing customer questions: selected family cover and product details have not been verified.',
  },
  audiences: {
    visitor: {
      caseIntro:
        'Valmistaudu vauvan tuloon ja selvitä tuotteiden tarkistukset sekä vakuutuskysymykset. Nykyistä lapsen turvaa ei oleteta.',
      contextTitle: 'Ensimmäiset tarkistukset ja vakuutuskysymykset',
      progressTitle: 'Valmistautuminen vauvan tuloon',
      packetContext:
        'Uuden asiakkaan kysymykset: tuotteet ja mahdolliset vakuutusvaihtoehdot ovat tarkistamatta.',
    },
    customer: {
      caseIntro:
        'Jatka perheesi valmisteluja ja tarkista esimerkin nykyinen turva. Jo valittu vauvavakuutus tuo hankintaohjeen tilalle sopimuksen tarkistuksen.',
      contextTitle: 'Perheesi valmistelut ja nykyinen turva',
      progressTitle: 'Perheesi valmistelutehtävät',
      packetContext:
        'Nykyisen asiakkaan kysymykset: valitun perheen turvan sisältöä tai tuotteita ei ole vahvistettu.',
    },
  },
};
