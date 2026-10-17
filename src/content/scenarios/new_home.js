export default {
  schemaVersion: 1,
  experience: {
    roles: {
      visitor: 'Uusi asiakas',
      customer: 'Nykyinen asiakas',
      staff: 'Ifin henkilöstö',
    },
    roleLabel: 'Demon näkymä',
    visitor: {
      title: 'Tutustu turvaan ennen vakuutuksen valintaa',
      text: 'Valitse elämäntilanne ja kokeile tarkistuksia kuvitteellisilla tiedoilla. Näet, mitä vakuutuksista ja palveluista kannattaa kysyä ilman oletettua Ifin asiakkuutta.',
      notice:
        'Avoin verkkosivun esimerkki · ei kirjautumista tai tarjouspyyntöä',
      eyebrow: 'Tutustu Ifiin oman elämäntilanteesi kautta',
      heroLine1: 'Uusi Ifillä?',
      heroLine2: 'Aloita arjestasi.',
      heroText:
        'Tutustu pieniin turvatekoihin ja kokoa kysymykset ennen vakuutuksen valintaa.',
    },
    customer: {
      title: 'Nykyiset vakuutuksesi ja seuraavat pienet teot',
      text: 'Kuvitteellinen asiakasnäkymä. Esimerkin vakuutukset auttavat nostamaan esiin sopivia palveluja ja tarkistuksia.',
      notice:
        'Demoasiakkuus · vakuutustietoja ei haettu eikä palveluoikeutta tarkistettu',
      portfolioLabel: 'Esimerkin vakuutuskokonaisuus',
      policiesLabel: 'Esimerkin vakuutukset',
      bundleNotice:
        'Yhdistämisetu on tässä vain valitun esimerkkikokonaisuuden laskentaoletus. Todellinen etutaso ja kelpoisuus tarkistetaan erikseen.',
      eyebrow: 'Oma vakuutuskokonaisuus, oma seuraava teko',
      heroLine1: 'Turvasi arjessa.',
      heroLine2: 'Pieni teko tänään.',
      heroText:
        'Löydä nykyisiin vakuutuksiisi sopivat palvelut, jatka valmisteluja ja tarkista sopimuksesi kysymykset.',
    },
    portfolios: [
      {
        id: 'multi',
        label: 'Koti, koira ja matka',
        policies: [
          {
            type: 'home',
            label: 'Kotivakuutus',
          },
          {
            type: 'dog',
            label: 'Koiravakuutus – Hilla',
          },
          {
            type: 'travel',
            label: 'Matkavakuutus',
          },
        ],
        demoBundleDiscountBps: 1000,
        effect:
          'Esimerkkihinnan yhdistämisetu 10 % · Eläinapu 24/7 · matkavakuutus mukana',
      },
      {
        id: 'home',
        label: 'Vain kotivakuutus',
        policies: [
          {
            type: 'home',
            label: 'Kotivakuutus',
          },
        ],
        demoBundleDiscountBps: 0,
        effect:
          'Esimerkkihinnan yhdistämisetu 0 % · eläin- tai matkavakuutusta ei valittu',
      },
      {
        id: 'family',
        label: 'Koti ja vauvavakuutus',
        policies: [
          {
            type: 'home',
            label: 'Kotivakuutus',
          },
          {
            type: 'unborn-child',
            label: 'Vauvavakuutus – jo hankittu esimerkissä',
          },
        ],
        demoBundleDiscountBps: 1000,
        effect:
          'Esimerkkihinnan yhdistämisetu 10 % · vauvan vakuutuksen tarkistus hankintaohjeen sijaan',
      },
    ],
    staff: {
      title: 'Asiakkuusanalytiikka',
      subtitle:
        'Henkilöstön analyysinäkymä · vakuutuskanta, valmistelut ja esimerkkipalaute',
      notice:
        'Synteettinen demo. Kaikki asiakkuudet, vakuutukset, palaute ja tehtävämerkinnät ovat keksittyjä. Ei yhteyttä Ifin järjestelmiin.',
      analyticsTitle: 'Valitun joukon yhteenveto',
      analyticsNotice:
        'Tunnusluvut, jakaumat ja taulukko lasketaan samasta suodatetusta esimerkkiaineistosta. Ne eivät kuvaa Ifin asiakkaita tai mitattua liiketoimintavaikutusta.',
      metricLabels: {
        customers: 'Asiakkuuksia',
        policies: 'Vakuutuksia',
        multi: 'Useita vakuutuksia',
        feedback: 'Palaute / 5',
      },
      feedbackCountLabel: 'vastausta',
      filtersTitle: 'Rajaa aineistoa',
      policyFilterLabel: 'Vakuutuslaji',
      caseFilterLabel: 'Elämäntilanne',
      allPoliciesLabel: 'Kaikki vakuutuslajit',
      allCasesLabel: 'Kaikki elämäntilanteet',
      policyTypes: [
        {
          id: 'home',
          label: 'Kotivakuutus',
        },
        {
          id: 'dog',
          label: 'Koiravakuutus',
        },
        {
          id: 'travel',
          label: 'Matkavakuutus',
        },
        {
          id: 'unborn-child',
          label: 'Vauvavakuutus',
        },
      ],
      distributionTitle: 'Vakuutuskannan jakauma',
      distributionNotice:
        'Vakuutusten lukumäärä valitussa asiakasjoukossa. Samalla asiakkuudella voi olla useita vakuutuksia.',
      preparationTitle: 'Valmistelumerkinnät elämäntilanteittain',
      preparationNotice:
        'Käyttäjän demomerkintöjä soveltuvista tehtävistä. Valmistumisaste ei ole turvallisuus-, terveys- tai riskiluokitus.',
      feedbackTitle: 'Esimerkkipalautteen jakauma',
      feedbackNotice:
        'Keksittyjen vastausten lukumäärä asteikolla 1–5. Ei osoita muutosta asiakastyytyväisyydessä.',
      tableTitle: 'Suodatetut esimerkkiasiakkuudet',
      tableCaption:
        'Taulukon asiakkuudet muodostavat yllä olevat tunnusluvut. Aineisto on erillinen asiakasnäkymän muistissa olevista valinnoista.',
      columns: {
        customer: 'Asiakkuus',
        policies: 'Vakuutukset',
        lifeCase: 'Elämäntilanne',
        preparation: 'Tehty / soveltuvat',
        feedback: 'Palaute / 5',
      },
      feedbackDetailsLabel: 'Palauteteksti',
      caseColumn: 'Elämäntilanne',
      customerCountColumn: 'Asiakkuuksia',
      taskCountColumn: 'Tehty / soveltuvat',
      emptyLabel: 'Ei asiakkuuksia näillä rajauksilla.',
      noFeedbackLabel: 'Ei vastauksia',
      unitLabel: 'kpl',
      filterResultLabel: 'Rajauksen asiakkuuksia',
      customers: [
        {
          id: 'demo-001',
          name: 'Matti ja Liisa · demo',
          caseId: 'new_home',
          portfolioId: 'multi',
          completedTaskIds: ['main-valve'],
          feedbackScore: 3,
          feedbackText:
            'Haluamme ymmärtää, mitä kodin vuotovähennys tarkoittaa.',
        },
        {
          id: 'demo-002',
          name: 'Aino · demo',
          caseId: 'first_baby',
          portfolioId: 'family',
          completedTaskIds: [],
          feedbackScore: 4,
          feedbackText:
            'Hankintojen turvallisuudesta on vaikea löytää selkeää kokonaiskuvaa.',
        },
        {
          id: 'demo-003',
          name: 'Olli · demo',
          caseId: 'absence',
          portfolioId: 'home',
          completedTaskIds: ['water-plan'],
          feedbackScore: 5,
          feedbackText:
            'Lähtövalmisteluista toivotaan muistutusta ennen esimerkkimatkaa.',
        },
      ],
      unitSingularLabel: 'kpl',
      feedbackSingularLabel: 'vastaus',
    },
    info: {
      businessLabel: 'Miksi nämä tehtävät?',
      pricingLabel: 'Tietoa esimerkkihinnasta',
      deductionLabel: 'Miten vuotovähennys lasketaan?',
      policyLabel: 'Mitä valinta muuttaa?',
      notice:
        'Taustatietoa prototyypistä. Mitään ei lähetetty tai muutettu vakuutukseen.',
      metricsLabel: 'Pilotissa tutkittavaa',
      policyTitle: 'Vakuutusvalinta ohjaa esimerkkiä',
      policyText:
        'Valinta suodattaa vakuutuksiin liittyviä ohjeita, tehtäviä ja asiakasetuja. Soveltuva eläinvakuutus tuo yhden If Eläinavun yhteysohjeen. Matkavakuutus lisää omien vakuutustietojen kokoamisen lähtölistaan; jo hankittu vauvavakuutus vaihtaa hankintaohjeen sopimuksen tarkistukseen. Yleiset valmistelut ja hätätilanteen toimintaohje pysyvät mukana.',
      policyLimits:
        'Kaikki vakuutukset ja hinnat ovat kuvitteellisia. Vakuutusten lukumäärä ei yksin osoita todellista etutasoa tai palveluoikeutta.',
    },
    policyContext: {
      visitor:
        'Tutustujan esimerkki · vakuutuksia ei oleteta eikä yhdistämisetua lasketa.',
      new_home:
        'Kotivakuutus valittu · tarkista oman sopimuksen ehdot. Hinta reagoi valittuun esimerkkikokonaisuuteen.',
      absenceTravel:
        'Koti- ja matkavakuutus valittu · kokoa matkavakuutuksen tiedot osana lähtötehtäviä.',
      absenceHome:
        'Matkavakuutusta ei valittu · lähtölista keskittyy kodin valmisteluihin. Kysymysluonnoksessa voit selvittää matkaturvan tarpeen.',
      first_baby:
        'Vauvavakuutusta ei valittu · tarkista nykyinen turva ja myöhemmät vaihtoehdot. Lapsen vakuutusta ei oleteta.',
      petIncluded:
        'Koiravakuutus valittu · löydät If Eläinavun 24/7-yhteysohjeen alta.',
      petNotIncluded:
        'Eläinvakuutusta ei valittu · palveluoikeutta ei oleteta. Hoitoon hakeutuminen ei odota vakuutuksen ostoa.',
      homePriceLabel: 'Esimerkkivuosihinta',
      questionsLabel: 'Valmistele vakuutuskysymykset',
      questionsTitle: 'Kysymykset valittuun elämäntilanteeseen',
      packetLabel: 'Valittava kysymysluonnos · ei tarjouspyyntö',
      policiesLabel: 'Valitut esimerkkivakuutukset',
      noPolicies: 'Ei oletettuja vakuutuksia',
      question:
        'Mitkä valittujen vakuutusten ehdot ja palvelut liittyvät tähän elämäntilanteeseen?',
      travelQuestion:
        'Mitä matkaturvasta on syytä selvittää ennen esimerkkimatkaa?',
      babyQuestion:
        'Mitä nykyinen turva sisältää ja mitä lapsen vakuutusvaihtoehdoista tulee selvittää?',
      notSent:
        'Paikallinen luonnos. Mitään ei lähetetty eikä vakuutusturvaa muutettu.',
      babyIncluded:
        'Vauvavakuutus on jo valittu esimerkkiin · tarkista olemassa oleva sopimus. Uuden vakuutuksen hankintaohjetta ei näytetä.',
      babyOwnedQuestion:
        'Mitä jo hankitun vauvavakuutuksen tiedoista ja syntymän jälkeisistä käytännöistä tulee tarkistaa?',
    },
  },
  title: 'Uusi koti & Ikävähennykset',
  persona: 'Matti & Liisa – Muutto 1994 rakennettuun omakotitaloon (120 m²)',
  referenceYear: 2026,
  demoNotice:
    'Kuvitteellinen esimerkkikoti. Vertailuvuosi on 2026. Oma vakuutusturvasi ei ole tiedossa.',
  presentation: {
    navTitle: 'Uusi koti',
    navSubtitle: 'Ikävähennykset & pienet teot',
    contextTitle: 'Seuraava pieni teko',
    homeLabel: 'Esimerkkikoti · omakotitalo, 120 m²',
    pipeTaskTitle: 'Selvitä putkiston tiedot ja vuotovähennys',
    pipeTaskHelp:
      'Muuta vuotta ja näe tähän tehtävään liittyvä laskenta heti. Merkintä tarkoittaa tietojen kokoamista, ei putkiston korjaamista.',
    resultLabel: 'Vuotovähennys tässä laskentaesimerkissä',
    nextActionLabel: 'Näytä tehtävä',
    allDoneTitle: 'Esimerkin tehtävät on merkitty tehdyiksi',
    allDoneText:
      'Voit tarkistaa merkinnät ja valmistella kysymykset. Merkinnät eivät vahvista turvallisuutta tai vakuutusturvaa.',
    missingYearText:
      'Selvitä putkiston käyttöönotto- tai uusimisvuosi asiakirjoista. Puuttuvalla vuodella vähennystä ei arvioida.',
    deductionText:
      'Vuoden {year} putkisto: ehdollinen vuotovähennys {percent} %. Kokoa tiedot vakuutusehtojen läpikäyntiin.',
    zeroDeductionText:
      'Vuoden {year} putkiston esimerkkivähennys on 0 %. Valitse seuraavaksi avoin huoltotehtävä.',
    surfaceSummary:
      'Märkätilatieto: {year}. Remonttivuosi ohjaa asiakirjojen tarkistusta.',
    tasksTitle: 'Pienet teot uudessa kodissa',
    prioritiesNotice:
      'Prioriteetit ovat demon ehdottama järjestys, eivät vakuutusehdon luokitus.',
    progressNotice:
      'Valmius kertoo vain esimerkkitehtävien merkinnöistä. Se ei arvioi kodin turvallisuutta tai vakuutusturvaa.',
    calculationScope:
      'Ehdot täyttävän rakennuksen putkivuotovahingon laskentaesimerkki',
    unknownYearLabel: 'Putkiston vuosi ei ole tiedossa',
  },
  defaults: {
    pipeworkYear: 1994,
    surfaceYear: 1994,
    completedTaskIds: ['main-valve'],
  },
  controls: [
    {
      id: 'pipeworkYear',
      type: 'range',
      min: 1970,
      max: 2026,
      step: 1,
      label: 'Putkiston käyttöönotto- tai uusimisvuosi',
      help: 'Esimerkissä putkisto on alkuperäinen. Vaihda vuosi, jos putkisto on uusittu.',
    },
    {
      id: 'surfaceYear',
      type: 'choice',
      label: 'Märkätilan remonttivuosi',
      options: [
        {
          value: 1994,
          label: 'Alkuperäinen 1994',
        },
        {
          value: 2018,
          label: 'Remontoitu 2018',
        },
      ],
      help: 'Erillinen esimerkkitieto: märkätilaremontti ei tarkoita putkiston uusimista.',
    },
  ],
  sources: [
    {
      id: 'if-benefit-programme',
      publisher: 'If',
      title: 'Ifin etuohjelma',
      url: 'https://www.if.fi/henkiloasiakkaat/vakuutukset/asiakasedut/if-etuohjelma',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'Verkkosivu, ei versionumeroa',
      locator:
        'Tasot 1 ja 2; alennukseen oikeuttavat vakuutukset; usein kysyttyä',
      limitation:
        '10/15 % ovat julkaistuja ohjelmatasoja. Kelpoisuus, sähköinen vakuutusposti, soveltuvat vakuutukset ja etukausi ratkaisevat. Esimerkkiperheen oikeutta etuun ei ole selvitetty; ehkäisyetua ei ole tällä sivulla vahvistettu.',
    },
    {
      id: 'if-benefit-rules',
      publisher: 'If',
      title: 'Ifin etuohjelman säännöt',
      url: 'https://www.if.fi/globalassets/fi/pdf/muut/if-etuohjelman-saannot.pdf',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'Voimassa 20.4.2024 alkaen',
      effectiveFrom: '2024-04-20',
      locator: 's. 1, edellytykset, voimassaolo ja vakuutusmaksualennukset',
      limitation:
        'Uusi asiakas liittyy ehtojen täyttyessä, nykyinen seuraavan kauden alusta. Edut vahvistetaan vuosittain. PDF:n historiallista omavastuurahaa ei käytetä uutena etuna.',
    },
    {
      id: 'nordea-new-home-offer',
      publisher: 'Nordea, Ifin vakuutusasiamies',
      title: 'If Kotivakuutus – Nordean asiakasetu',
      url: 'https://www.nordea.fi/henkiloasiakkaat/palvelumme/vakuutukset/if-vakuutukset/kotivakuutus.html',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'Verkkosivu, ei versionumeroa',
      locator:
        'Nordean asiakkaana saat 25 % alennuksen uudesta If-kotivakuutuksesta',
      limitation:
        'Pankkikanavan tarjous uuden kotivakuutuksen ensimmäiselle kaudelle, ei kaikkien uusien asiakkaiden yleinen etu. Kelpoisuus ja alennusten yhdistäminen varmistettava; ei lisätä demon hintaan.',
    },
    {
      id: 'if-maintenance-service',
      publisher: 'If',
      title: 'Omakotitalon kunnossapitosuunnitelma',
      url: 'https://www.if.fi/henkiloasiakkaat/vakuutukset/kotivakuutus/omakotitalo/omakotitalon-kunnossapitosuunnitelma',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'Verkkosivu, ei versionumeroa',
      locator:
        'Tilaa kotikäynti; usein kysyttyä: palvelun sisältö ja neljän vuoden väli',
      limitation:
        'Laaja/LaajaPlus-omakotitalon vakuutuksenottajalle ehdollinen palvelu, ei rakenteita rikkova kuntotutkimus eikä sisätilojen kosteusmittaus. Demossa ei todeta kelpoisuutta eikä varata käyntiä.',
    },
    {
      id: 'if-maintenance-data-boundary',
      publisher: 'If',
      title: 'Sadevesien ohjaus ja katon kunto – talotarkastushavainnot',
      url: 'https://www.if.fi/tietoa-ifista/uutishuone?id=nama-ovat-suomalaisten-omakotitalojen-haasteet-sateiden-lisaantyessa-tarkista-sadevesien-ohjaus-ja-katon-kunto',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'Tiedote 5.11.2024',
      locator: 'Lopun kunnossapitosuunnitelmaa koskeva huomautus',
      limitation:
        'Nykyisen kunnossapitopalvelun kotikäyntitietoja ei voida käyttää korvauspäätöksiin tai vakuutusmaksun määrittelyyn. Tarkastusten puutehavainnot eivät ole korvausten hyväksymisprosentteja.',
    },
    {
      id: 'if-general-protection-and-claims',
      publisher: 'If',
      title: 'Yleiset sopimusehdot – suojeluohjeet ja selvitykset',
      url: 'https://www.if.fi/globalassets/fi/pdf/ehdot/yleiset-sopimusehdot.pdf',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'YLE 900.14',
      effectiveFrom: '2025-07-01',
      locator: 's. 4, 5.1.1; s. 6, 9.1',
      limitation:
        'Soveltuu vakuutuskirjan mukaan. Tahallinen tai vähäistä suurempi huolimattomuus suojeluohjeissa voi vaikuttaa korvaukseen. Tarvittavat selvitykset ovat tapauskohtaisia; ohjeiden noudattaminen ei takaa korvausta.',
    },
    {
      id: 'if-oma-200-27-leak',
      publisher: 'If',
      title: 'Kodin Omaisuusvakuutusehdot – vuotovähennys',
      url: 'https://www.if.fi/globalassets/fi/pdf/ehdot/kotivakuutusehdot.pdf',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'OMA 200.27',
      effectiveFrom: '2026-01-01',
      locator: 's. 9, 6.2.1.3; s. 10–11, 6.4.1 ja 6.4.4',
      limitation:
        'Vain korvauspiiriin kuuluva rakennuksen johtoverkon rikkoutumisesta aiheutunut vuotovahinko. Vakuutuskirja voi määrätä toisin. Muut vähennykset ja omavastuu arvioidaan erikseen.',
    },
    {
      id: 'if-oma-200-27-scope',
      publisher: 'If',
      title: 'Kodin Omaisuusvakuutusehdot – turvat ja rajoitukset',
      url: 'https://www.if.fi/globalassets/fi/pdf/ehdot/kotivakuutusehdot.pdf',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'OMA 200.27',
      effectiveFrom: '2026-01-01',
      locator: 's. 5, 3.5–3.6 ja 4; s. 7, 6.1.1; s. 9, 6.2.1.4',
      limitation:
        'Vuotovahingon ja putken oman korjauksen laskentaperusteet eroavat. Vahingon syy, vakuutuskirja, valittu turva ja mahdolliset laajennukset ratkaisevat soveltuvuuden.',
    },
    {
      id: 'if-oma-200-27-prevention',
      publisher: 'If',
      title: 'Kodin Omaisuusvakuutusehdot – vuotovahinkojen torjunta',
      url: 'https://www.if.fi/globalassets/fi/pdf/ehdot/kotivakuutusehdot.pdf',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'OMA 200.27',
      effectiveFrom: '2026-01-01',
      locator: 's. 6, 5; s. 7, 5.5 kohdat 6–8',
      limitation:
        'Suojeluohjeet eivät yksin ratkaise korvattavuutta. Noudata myös laitteen ja asennuksen omia huolto-ohjeita.',
    },
    {
      id: 'if-water-damage-actions',
      publisher: 'If',
      title: 'Jos kodissasi sattuu vesivahinko vuodon tai putkirikon takia',
      url: 'https://www.if.fi/henkiloasiakkaat/vahingot/koti-ja-omaisuus/vesivahinko',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'Verkkosivu, ei julkaistua versionumeroa',
      locator:
        'Toimintaohjeet vesi- ja vuotovahingoissa → Omakotitalo tai mökki, kohdat 2–4',
      limitation:
        'Päähanan sulkeminen on toimintaohje vahingossa. Venttiilin paikantaminen etukäteen on demon valmistautumistehtävä; sivu ei anna venttiilin koestusohjetta. Sivun ikätaulukkoa ei käytetä laskentasääntönä.',
    },
    {
      id: 'if-water-prevention',
      publisher: 'If',
      title: 'Vesivahinko on kotien yleinen kiusa – estä vuodot',
      url: 'https://www.if.fi/henkiloasiakkaat/vakuutukset/kotivakuutus/kodin-turvallisuus/vesivahinko',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'Verkkosivu, ei julkaistua versionumeroa',
      locator: 'Kodinkoneet syyniin; Mikä ihmeen vuotokaukalo?',
      limitation:
        'Ennaltaehkäisevää kuluttajaohjeistusta. Ei korvauspäätös eikä peruste mitatulle vahinkosäästölle.',
    },
    {
      id: 'if-olr-260-7-wet-room',
      publisher: 'If',
      title: 'LaajaPlus rakennusvakuutusehdot',
      url: 'https://www.if.fi/globalassets/fi/pdf/ehdot/laajaplus-rakennusvakuutusehdot.pdf',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'OLR 260.7',
      effectiveFrom: '2024-01-01',
      locator: 's. 1, 1–3 ja 5; s. 2, 5.1',
      limitation:
        'Erillinen vakuutuskirjaan merkitty laajennus, jolla on voimassaolo-, enimmäismäärä- ja korjauskulurajoituksia. Demo ei oleta tätä turvaa eikä laske sen korvausta.',
    },
    {
      id: 'rakennustieto-lifespan-metadata',
      publisher: 'Rakennustieto',
      title: 'Rakennuksen kuntosovellus Raku on päivitetty',
      url: 'https://uutiset.rakennustieto.fi/yleinen/rakennuksen-kuntosovellus-raku-on-paivitetty/',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'Uutinen 22.9.2026',
      locator: 'Aloitus ja luettelo RT 103765 / RT 103766',
      limitation:
        'Vain nykyisten ohjekorttien tunnukset ja käyttötarkoitus tarkistettu. Maksullisia käyttöikätaulukoita ei luettu. Ei tue yleistä 36 vuoden rajaa eikä materiaalikohtaista käyttöikäarviota.',
    },
  ],
  rules: {
    leakageDeduction: {
      status: 'verified',
      sourceIds: ['if-oma-200-27-leak'],
      ageBasis: 'referenceYearMinusPipeworkYear',
      bands: [
        {
          minAge: 0,
          maxAge: 29,
          deductionPercent: 0,
        },
        {
          minAge: 30,
          maxAge: 50,
          deductionPercent: 25,
        },
        {
          minAge: 51,
          maxAge: null,
          deductionPercent: 50,
        },
      ],
      eligibleDamageRequired: true,
      unknownInputResult: null,
      limitation:
        'Taulukko kuvaa yhtä vähennystä ehdot täyttävän vahingon laskentapohjasta. Se ei osoita, että vahinko korvataan.',
    },
    pipeRepair: {
      status: 'verified',
      sourceIds: ['if-oma-200-27-scope'],
      annualDeductionPercent: 3,
      noDeductionAges: [0, 1],
      includedInLeakageBar: false,
      limitation:
        'Putken omat korjaus- ja uusimiskulut arvioidaan erikseen kohdan 6.2.1.4 mukaan. Vuotovähennyksen prosenttia ei käytetä näihin kuluihin.',
    },
    surfaceYear: {
      status: 'illustrative',
      sourceIds: [
        'if-oma-200-27-leak',
        'if-oma-200-27-scope',
        'if-olr-260-7-wet-room',
      ],
      affectsLeakageDeduction: false,
      limitation:
        'Demon remonttivalinta muuttaa muistutusta remonttiasiakirjoista. Pelkkä pintojen vuosi ei osoita putkien uusimista, vesieristeen kuntoa tai vakuutuksen kattavuutta.',
    },
    technicalLifespan: {
      status: 'unverified',
      sourceIds: ['rakennustieto-lifespan-metadata'],
      criticalAge: null,
      limitation:
        'Materiaalikohtainen taulukko ja kohteen kunto puuttuvat. Ikä yksin ei laukaise käyttöiän päättymistä koskevaa varoitusta.',
    },
  },
  insights: {
    deduction: {
      title: 'Putkiston vuotovähennys',
      status: 'verified',
      sourceIds: ['if-oma-200-27-leak'],
      remainingLabel: 'Laskentapohjaa jäljellä ennen muita vähennyksiä',
      deductionLabel: 'Vuotovähennys',
      unknownLabel: 'Vuotovähennystä ei voida arvioida näillä tiedoilla',
      limitation:
        'Havainnollistus, ei korvauslupaus. Omavastuu, vahingon syy, vakuutusturva ja muut rajoitukset arvioidaan erikseen.',
    },
    scope: {
      title: 'Vahingon syy ja oma vakuutuskirja ratkaisevat',
      status: 'verified',
      sourceIds: ['if-oma-200-27-scope', 'if-olr-260-7-wet-room'],
      text: 'Vuotanut vesi ja itse rikkoutunut putki arvioidaan erikseen. Vesieristeen läpi päässeeseen veteen liittyy rajoituksia; erillinen LaajaPlus-turva voi laajentaa suojaa omilla ehdoillaan.',
      limitation:
        'Demo ei päättele vahingon syytä eikä vakuutusturvaasi. Sisäinen syöpyminen tai ulkoinen rikkoutuminen ei yksin ratkaise laskentaa.',
    },
    surface: {
      title: 'Mitä märkätilaremontissa uusittiin?',
      status: 'illustrative',
      sourceIds: ['if-oma-200-27-leak', 'if-oma-200-27-scope'],
      originalText:
        'Esimerkissä märkätila on alkuperäinen. Kokoa saatavilla olevat rakenne- ja huoltotiedot.',
      renovatedText:
        'Esimerkissä remontti tehtiin 2018. Tarkista asiakirjoista, uusittiinko myös putkisto ja vesieristys.',
      limitation:
        'Valinta ei ole kuntotutkimus eikä muuta vuotovähennystä. Käyttöikää ei arvioida tässä demossa.',
    },
  },
  tasks: [
    {
      id: 'main-valve',
      title: 'Paikanna veden pääsulkuventtiili',
      why: 'Kun tiedät venttiilin paikan, löydät sen vuototilanteessa.',
      priority: 'high',
      status: 'illustrative',
      sourceIds: ['if-water-damage-actions'],
      limitation:
        'Ennakkoon paikantaminen on demon sovellus vahingon toimintaohjeesta. Merkintä on esimerkissä valmiina; venttiiliä ei ole oikeasti tarkastettu.',
    },
    {
      id: 'kitchen-leaks',
      title: 'Tarkista allaskaappi ja kodinkoneiden vuotokaukalot',
      why: 'Katso, näkyykö allaskaapissa vuotojälkiä ja onko laitteiden alla asianmukainen kaukalo.',
      priority: 'high',
      status: 'verified',
      sourceIds: ['if-water-prevention', 'if-oma-200-27-prevention'],
      limitation:
        'Kaukalovaatimus koskee lattiakaivotonta tilaa tai lattiaa, jolla vuoto ei näy heti. Silmämääräinen tarkistus ei sulje pois piilevää vuotoa.',
    },
    {
      id: 'floor-drain',
      title: 'Puhdista lattiakaivot ja hajulukot',
      why: 'Pidä veden kulkureitti avoimena ja noudata oman kaivon huolto-ohjetta.',
      priority: 'medium',
      status: 'verified',
      sourceIds: ['if-oma-200-27-prevention'],
      limitation:
        'Puhdistus ei osoita vesieristyksen tai liitosten tiiviyttä. Tämä tehtävä ei ohjaa rakenteiden tai kiinteiden liitosten purkamiseen.',
    },
    {
      id: 'professional-review',
      title: 'Kokoa putkiston tiedot ammattilaisen arviota varten',
      why: 'Kirjaa putkien materiaali, uusimisvuosi ja aiemmat havainnot yhteen kysymyslistaan.',
      priority: 'recommendation',
      status: 'illustrative',
      sourceIds: ['rakennustieto-lifespan-metadata', 'if-oma-200-27-leak'],
      limitation:
        'Demon valmistautumisehdotus. Tarkastuksen tarvetta, hintaa tai Ifin kumppanipalvelun saatavuutta ei ole vahvistettu.',
      actionId: 'plumbing-help',
    },
  ],
  actions: [
    {
      id: 'plumbing-help',
      label: 'Valmistele avunpyyntö – demo',
      status: 'illustrative',
      sourceIds: ['rakennustieto-lifespan-metadata'],
      title: 'Kysymyslista LVI-ammattilaiselle',
      text: 'Mitä putkiston kunnosta tiedetään? Mitä lisäselvityksiä tarvitaan?',
      confirmation:
        'Tämä on palveluohjauksen demo. Mitään ei lähetetty eikä aikaa varattu.',
      limitation:
        'Ei yhteyttä palveluntarjoajaan, vahvistettua kumppanuutta tai lupausta vakuutuskorvauksesta.',
    },
  ],
  preventionIncentive: {
    status: 'illustrative',
    proposalRef: 'README.md#what-the-prototype-demonstrates',
    sourceIds: [
      'if-benefit-programme',
      'if-benefit-rules',
      'if-water-prevention',
      'if-oma-200-27-prevention',
    ],
    sourceScope:
      'Julkaistu 10 % ohjelmataso on laskelman vertailukohta. Kelpoisuutesi on tuntematon. Ehkäisytehtävien lähteet eivät vahvista ehdotettua lisäetua tai mitattua riskin vähenemistä.',
    limitation:
      'Tuoteidea, ei vakuutustarjous. Lähtöhinta, tehtävien etuosuudet, enimmäisetu ja lisäedun yhdistäminen ovat kuvitteellisia oletuksia. Ehkäisyetu ei ole vahvistettu nykyinen If-etu. Vakuutustasi, turvaasi tai maksuasi ei muuteta.',
    policyId: 'demo-home-building',
    baseAnnualCents: 60000,
    bundleDiscountBps: 1000,
    preventionCapBps: 500,
    rounding: 'half-up-per-stage',
    eligibleActions: [
      {
        id: 'locate-main-valve',
        policyId: 'demo-home-building',
        taskId: 'main-valve',
        discountBps: 200,
      },
      {
        id: 'inspect-kitchen-leaks',
        policyId: 'demo-home-building',
        taskId: 'kitchen-leaks',
        discountBps: 200,
      },
      {
        id: 'maintain-drains',
        policyId: 'demo-home-building',
        taskId: 'floor-drain',
        discountBps: 100,
      },
    ],
    copy: {
      title: 'Ennaltaehkäisyetu',
      conceptLabel: 'Hinnoittelukonsepti – esimerkkihinta',
      intro:
        'Tehtävälistan ehkäisyteot päivittävät tätä esimerkkihintaa. Vakuutuskokonaisuuden vaihto muuttaa erillistä yhdistämisetua.',
      projectedLabel: 'Mahdollinen vuosihinta',
      perYear: '/ vuosi',
      savingLabel: 'Säästöä ehkäisyteoista',
      baseLabel: 'Kuvitteellinen lähtöhinta',
      bundleLabel: 'Valitun kokonaisuuden demoetu',
      afterBundleLabel: 'Vuosihinta ennen ehkäisyetua',
      preventionLabel: 'Mahdollinen ennaltaehkäisyetu',
      eligibleCountLabel: 'Etuun laskettavia esimerkkitekoja',
      capLabel: 'Ehkäisyedun enimmäismäärä demossa',
      assumptionsLabel: 'Mistä esimerkkihinta muodostuu?',
      assumptionsText:
        'Valitulle usean vakuutuksen esimerkille oletetaan 10 % yhdistämisetu; yhden vakuutuksen ja tutustujan esimerkeissä se on 0 %. Nämä ovat käyttöliittymän oletuksia. Omaa kelpoisuuttasi ei ole selvitetty. Ehkäisyn lisäetu lasketaan jäljelle jäävästä hinnasta vain demossa. Vaiheet pyöristetään lähimpään senttiin, puolikas ylöspäin. Tehtäväosuudet ovat keksittyjä oletuksia, eivät mitattuja riskipainoja.',
      evidenceLabel: 'Ehkäisytehtävien lähteet ja konseptin rajat',
      verificationNotice:
        'Merkinnät ovat oma ilmoitus demossa. Toimia ei ole todennettu eikä oikeaa alennusta hyväksytty. Pääsulun paikantaminen on esimerkissä valmiiksi merkitty.',
      verificationPlan:
        'Oikeassa palvelussa soveltuva näyttö, kuten tarkastusasiakirja, ja vakuutusyhtiön hyväksyntä arvioitaisiin erikseen. Näyttövaatimuksia tai voimassaoloa ei ole määritelty tässä konseptissa.',
      deductionNotice:
        'Vuosihinnan etu on erillinen vuotovähennyksen laskentaesimerkistä. Tehtävämerkinnät eivät muuta vahingon korvattavuutta, omavastuuta tai vuotovähennystä.',
      completedLabel: 'Ilmoitettu tehdyksi · demo',
      incompleteLabel: 'Ei vielä merkitty',
      taskBenefitTemplate: 'Demoetu +{percent} %-yks.',
      preparationLabel: 'Ei demoetua · valmistautuminen',
      preparationNotice:
        'Kysymyslistan valmistelu tai avunpyynnön avaaminen ei osoita tarkastuksen tai korjauksen toteutumista, joten siitä ei kerry demoetua.',
      unavailableLabel:
        'Esimerkkihintaa ei voida laskea näillä hintatiedoilla.',
      announcementTemplate:
        'Mahdollinen vuosihinta {price}. Säästöä ehkäisyteoista {saving} vuodessa. Hinnoittelukonsepti, ei hyväksytty alennus.',
      feedbackLabel: 'Esimerkkihinta · ei hyväksytty alennus',
      feedbackSavingTemplate: 'Ehkäisyn lisäsäästö {saving}/vuosi',
      showCalculationLabel: 'Näytä laskelma',
    },
  },
  publishedBenefits: {
    title: 'Julkaistuja asiakasetuja vertailuksi',
    notice:
      'Etujen ehdot ja voimassaolo tarkistettu 17.10.2026. Oma oikeutesi etuihin on tuntematon. Näitä etuja ei pinota laskelmaan automaattisesti.',
    items: [
      {
        id: 'programme',
        title: 'Ohjelmatasot 10 % / 15 %',
        status: 'verified',
        sourceIds: ['if-benefit-programme', 'if-benefit-rules'],
        text: '10 % taso edellyttää soveltuvaa koti- tai kaskovakuutusta ja sähköistä vakuutuspostia. 15 % tasolle voi päästä kahdella hyväksytyllä vakuutusryhmällä.',
        limitation:
          'Tuote- ja kausikohtaiset ehdot ratkaisevat. Uusi asiakas mukaan ehtojen täyttyessä; nykyinen seuraavan kauden alusta. Laskelmassa oletetaan vain 10 % taso.',
        audiences: ['visitor', 'customer'],
      },
      {
        id: 'new-customer',
        title: 'Nordean kanava: 25 % ensimmäiselle kaudelle',
        status: 'verified',
        sourceIds: ['nordea-new-home-offer'],
        text: 'Nordea julkaisee asiakkailleen uuden If-kotivakuutuksen 25 % ensikausiedun ja pääsyn 15 % ohjelmatasolle.',
        limitation:
          'Ei yleinen tarjous kaikille uusille asiakkaille. Yhdistämistä ei päätellä laskemalla prosentteja yhteen; tarjous ei sisälly demon hintaan.',
        audiences: ['visitor'],
      },
      {
        id: 'maintenance',
        title: 'Ehdollinen maksuton kunnossapitosuunnitelma',
        status: 'verified',
        sourceIds: ['if-maintenance-service', 'if-maintenance-data-boundary'],
        text: 'Laaja/LaajaPlus-omakotitalon vakuutuksenottaja voi kuulua palveluun, johon sisältyy kotikäynti neljän vuoden välein ja neuvonta.',
        limitation:
          'Nykyisen palvelun kotikäyntitietoja ei käytetä vakuutusmaksun tai korvauspäätöksen määrittelyyn. Tämä palvelu on erillinen ehdottamastamme ehkäisyedusta. Kelpoisuutta ei tarkistettu eikä käyntiä tilattu.',
        audiences: ['customer'],
      },
    ],
  },
  claimsGuidance: {
    title: 'Vähemmän epäselvyyksiä korvaustilanteessa',
    status: 'illustrative',
    sourceIds: [
      'if-general-protection-and-claims',
      'if-oma-200-27-scope',
      'if-oma-200-27-prevention',
    ],
    observedSuccessRatePercent: null,
    successEvidenceStatus: 'unverified',
    successNotice:
      'Näiden tehtävien tekemiseen sidottua korvausten hyväksymisprosenttia ei löytynyt tarkistetuista julkisista lähteistä. Emme arvioi korvauspäätöksen todennäköisyyttä.',
    limitation:
      'Ohjeiden toimituksellinen koonti. Huolto ja asiakirjat eivät laajenna vakuutusturvaa, poista vähennyksiä tai takaa hyväksyttyä korvauspäätöstä.',
    items: [
      {
        title: 'Noudata soveltuvia suojeluohjeita',
        text: 'Suojeluohjeen tahallinen tai vähäistä suuremmasta huolimattomuudesta johtuva laiminlyönti voi johtaa korvauksen alentamiseen tai epäämiseen.',
        status: 'verified',
        sourceIds: [
          'if-general-protection-and-claims',
          'if-oma-200-27-prevention',
        ],
        limitation:
          'Soveltuva ohje, vakuutuskirja ja vahingon olosuhteet arvioidaan erikseen. Tehtävämerkintä ei osoita ohjeen toteutumista.',
      },
      {
        title: 'Pidä olennaiset työ- ja vahinkotiedot saatavilla',
        text: 'Korvauskäsittelyssä tarvitaan tietoa tapahtumasta ja vahingon määrästä. Esimerkkitehtävän merkitseminen ei korvaa tarpeellisia asiakirjoja.',
        status: 'illustrative',
        sourceIds: ['if-general-protection-and-claims'],
        limitation:
          'Tarvittavat selvitykset riippuvat tapauksesta. Emme kerää asiakirjoja tai muuta nykyisen kunnossapitopalvelun tietojen käyttötarkoitusta.',
      },
      {
        title: 'Tarkista vahingon syy, turva ja rajoitukset',
        text: 'Kaikki vuotovahingot eivät kuulu samaan turvaan. Esimerkiksi vesieristeen läpi päässeeseen veteen liittyvät rajoitukset eivät poistu huoltotehtävillä.',
        status: 'verified',
        sourceIds: ['if-oma-200-27-scope', 'if-olr-260-7-wet-room'],
        limitation:
          'Mahdollinen laajennus ja oma vakuutuskirja ratkaisevat. Putkiston vuotovähennyksen prosentti ei ole hyväksymisprosentti.',
      },
    ],
  },
  business: {
    status: 'illustrative',
    label: 'Liiketoimintahypoteesi',
    sourceIds: ['if-water-prevention', 'if-oma-200-27-leak'],
    text: 'Ehdotettu hinnoitteluetu voisi kannustaa ehkäisytekoihin. Pilotissa tutkittaisiin, riittäisikö vahinkokulujen mahdollinen väheneminen rahoittamaan edut ja todentamisen. Selkeä vähennysesimerkki voisi helpottaa vakuutuksen ymmärtämistä.',
    proposedMetrics: [
      'Ehkäisytehtävien valmistumisaste',
      'Ilmoitettujen toimien todennettavuus',
      'Hinnan ja vähennyksen ymmärtäminen käyttäjätestissä',
      'Vahinkokulut suhteessa etuihin ja todentamiskuluihin',
    ],
    limitation:
      'Pilotin hypoteeseja. Hinnoittelumallia, vahinkosäästöä, kannattavuutta tai asiakaspysyvyyden kasvua ei ole vahvistettu. Demon hinnat eivät kuvaa nykyistä If-tuotetta.',
  },
  english: {
    'experience.roles.staff': 'If staff',
    'experience.roleLabel': 'Demo view',
    'experience.visitor.title': 'Explore cover before choosing a policy',
    'experience.visitor.text':
      'Choose a life situation and try the checks with fictional details. Find out what to ask about policies and services without assumed If customer status.',
    'experience.visitor.notice':
      'Public website example · no login or quote request',
    'experience.customer.title': 'Your selected policies and next small steps',
    'experience.customer.text':
      'Fictional customer view. The example policies help highlight relevant services and checks.',
    'experience.customer.notice':
      'Demo customer · no policy details retrieved or service eligibility checked',
    'experience.customer.portfolioLabel': 'Example insurance setup',
    'experience.customer.policiesLabel': 'Example policies',
    'experience.customer.bundleNotice':
      'The bundle benefit is only a calculation assumption for the selected example setup. Actual benefit level and eligibility must be checked separately.',
    'experience.portfolios.0.label': 'Home, dog and travel',
    'experience.portfolios.0.policies.0.label': 'Home insurance',
    'experience.portfolios.0.policies.1.label': 'Dog insurance – Hilla',
    'experience.portfolios.0.policies.2.label': 'Travel insurance',
    'experience.portfolios.0.effect':
      'Example bundle benefit 10% · Eläinapu 24/7 · includes travel insurance',
    'experience.portfolios.1.label': 'Home insurance only',
    'experience.portfolios.1.policies.0.label': 'Home insurance',
    'experience.portfolios.1.effect':
      'Example bundle benefit 0% · no pet or travel insurance selected',
    'experience.portfolios.2.label': 'Home and baby insurance',
    'experience.portfolios.2.policies.0.label': 'Home insurance',
    'experience.portfolios.2.policies.1.label':
      'Baby insurance – already purchased in this example',
    'experience.portfolios.2.effect':
      'Example bundle benefit 10% · review existing baby insurance instead of buying guidance',
    'experience.staff.title': 'Customer analytics',
    'experience.staff.subtitle':
      'Staff analysis view · policies, preparations and example feedback',
    'experience.staff.notice':
      'Synthetic demo. All customers, policies, feedback and task records are invented. No connection to If systems.',
    'experience.staff.analyticsNotice':
      'Metrics, distributions and the table use the same filtered example data. They do not describe If customers or measured business impact.',
    'experience.staff.feedbackCountLabel': 'responses',
    'experience.staff.policyFilterLabel': 'Policy type',
    'experience.staff.caseFilterLabel': 'Life situation',
    'experience.staff.allPoliciesLabel': 'All policy types',
    'experience.staff.allCasesLabel': 'All life situations',
    'experience.staff.policyTypes.0.label': 'Home insurance',
    'experience.staff.policyTypes.1.label': 'Dog insurance',
    'experience.staff.policyTypes.2.label': 'Travel insurance',
    'experience.staff.policyTypes.3.label': 'Baby insurance',
    'experience.staff.distributionNotice':
      'Policy counts in the selected customer group. One customer may hold several policies.',
    'experience.staff.preparationTitle': 'Preparation ticks by life situation',
    'experience.staff.preparationNotice':
      'User ticks on applicable demo tasks. Completion is not a safety, health or risk rating.',
    'experience.staff.feedbackNotice':
      'Counts of invented responses on a scale of 1–5. These do not demonstrate a change in customer satisfaction.',
    'experience.staff.tableCaption':
      "The customers in this table form the metrics above. This data is separate from the customer view's in-memory selections.",
    'experience.staff.columns.lifeCase': 'Life situation',
    'experience.staff.feedbackDetailsLabel': 'Feedback text',
    'experience.staff.caseColumn': 'Life situation',
    'experience.staff.emptyLabel': 'No customers match these filters.',
    'experience.staff.noFeedbackLabel': 'No responses',
    'experience.staff.unitLabel': 'policies',
    'experience.staff.filterResultLabel': 'Customers matching filters',
    'experience.staff.customers.0.name': 'Matti and Liisa · demo',
    'experience.staff.customers.0.feedbackText':
      "We want to understand what the home's leakage deduction means.",
    'experience.staff.customers.1.name': 'Aino · demo',
    'experience.staff.customers.1.feedbackText':
      'It is hard to find a clear overview of the safety of our purchases.',
    'experience.staff.customers.2.name': 'Olli · demo',
    'experience.staff.customers.2.feedbackText':
      'We would like a preparation reminder before the example trip.',
    'experience.info.businessLabel': 'Why these tasks?',
    'experience.info.pricingLabel': 'About the example price',
    'experience.info.deductionLabel':
      'How is the leakage deduction calculated?',
    'experience.info.policyLabel': 'What does this selection change?',
    'experience.info.notice':
      'Prototype background. Nothing was sent or changed in an insurance policy.',
    'experience.info.metricsLabel': 'Questions for a pilot',
    'experience.info.policyTitle': 'Insurance selection shapes the example',
    'experience.info.policyText':
      'The selection filters policy-related guidance, tasks and customer benefits. Applicable pet insurance provides a single If Eläinapu contact route. Travel insurance adds gathering policy details to the departure checklist; already-purchased baby insurance replaces buying guidance with a contract review. General preparations and emergency guidance remain available.',
    'experience.info.policyLimits':
      'All policies and prices are fictional. Policy count alone does not establish a real benefit level or service eligibility.',
    'experience.policyContext.visitor':
      'Visitor example · no policies assumed and no bundle benefit applied.',
    'experience.policyContext.new_home':
      'Home insurance selected · check your own contract terms. The price responds to the selected example setup.',
    'experience.policyContext.absenceTravel':
      'Home and travel insurance selected · gather travel policy details as part of the departure tasks.',
    'experience.policyContext.absenceHome':
      'No travel insurance selected · the checklist focuses on preparing the home. You can clarify travel cover needs in the question draft.',
    'experience.policyContext.first_baby':
      'No baby insurance selected · review current cover and later options. Child insurance is not assumed.',
    'experience.policyContext.petIncluded':
      'Dog insurance selected · find the If Eläinapu 24/7 contact instructions below.',
    'experience.policyContext.petNotIncluded':
      'No pet insurance selected · service eligibility is not assumed. Seeking care must not wait for an insurance purchase.',
    'experience.policyContext.homePriceLabel': 'Example annual price',
    'experience.policyContext.questionsLabel': 'Prepare insurance questions',
    'experience.policyContext.questionsTitle':
      'Questions for the selected life situation',
    'experience.policyContext.packetLabel':
      'Selectable question draft · not a quote request',
    'experience.policyContext.policiesLabel': 'Selected example policies',
    'experience.policyContext.question':
      'Which terms and services in the selected policies relate to this life situation?',
    'experience.policyContext.travelQuestion':
      'What travel cover questions should we clarify before the example trip?',
    'experience.policyContext.babyQuestion':
      'What does current cover include, and what should we check about child insurance options?',
    'experience.policyContext.notSent':
      'Local draft. Nothing was sent and no insurance cover was changed.',
    'experience.policyContext.babyIncluded':
      'Baby insurance already selected in this example · review the existing contract. New insurance buying guidance is not shown.',
    'experience.policyContext.babyOwnedQuestion':
      'Which details of the existing baby policy and arrangements after birth need checking?',
    title: 'New home & age deductions',
    persona:
      'Matti & Liisa – Moving into a detached house built in 1994 (120 m²)',
    demoNotice:
      'Fictional example home. Reference year: 2026. Your own insurance cover is unknown.',
    'presentation.navSubtitle': 'Age deductions & small steps',
    'presentation.homeLabel': 'Example home · detached house, 120 m²',
    'presentation.pipeTaskTitle': 'Find pipe details and the leakage deduction',
    'presentation.pipeTaskHelp':
      "Change the year to see this task's calculation immediately. A tick means gathering information, not repairing the pipes.",
    'presentation.resultLabel': 'Leakage deduction in this calculation example',
    'presentation.nextActionLabel': 'Show task',
    'presentation.allDoneTitle': 'Example tasks marked complete',
    'presentation.allDoneText':
      'Review your ticks and prepare questions. Ticks do not establish safety or insurance cover.',
    'presentation.missingYearText':
      'Find the pipe installation or renewal year in the documents. A deduction is not estimated without a year.',
    'presentation.deductionText':
      'Pipes from {year}: conditional leakage deduction {percent}%. Gather the details to review the policy terms.',
    'presentation.zeroDeductionText':
      'Pipes from {year}: the example deduction is 0%. Choose an open maintenance task next.',
    'presentation.surfaceSummary':
      'Wet-room information: {year}. The renovation year guides document checks.',
    'presentation.prioritiesNotice':
      "Priorities are the demo's suggested order, not a classification in the policy terms.",
    'presentation.progressNotice':
      'Readiness describes ticks on example tasks only. It does not assess home safety or insurance cover.',
    'presentation.calculationScope':
      'Calculation example for a building pipe leak meeting the policy conditions',
    'presentation.unknownYearLabel': 'Pipe year is unknown',
    'controls.0.label': 'Pipe installation or renewal year',
    'controls.0.help':
      'The example has original pipes. Change the year if they have been renewed.',
    'controls.1.label': 'Wet-room renovation year',
    'controls.1.options.0.label': 'Original, 1994',
    'controls.1.options.1.label': 'Renovated, 2018',
    'controls.1.help':
      'Separate example detail: renovating the wet room does not mean the pipes were renewed.',
    'rules.leakageDeduction.limitation':
      'The table shows one deduction from the calculation basis for a qualifying loss. It does not establish that the loss is covered.',
    'rules.pipeRepair.limitation':
      'Repairing or replacing the pipe itself is assessed separately under section 6.2.1.4. The leakage deduction percentage does not apply to those costs.',
    'rules.surfaceYear.limitation':
      'The renovation selection changes the document reminder. Surface age alone does not establish pipe renewal, waterproofing condition or insurance cover.',
    'rules.technicalLifespan.limitation':
      "A material-specific table and the property's condition are missing. Age alone does not trigger an end-of-service-life warning.",
    'insights.deduction.title': 'Pipe leakage deduction',
    'insights.deduction.remainingLabel':
      'Calculation basis remaining before other deductions',
    'insights.deduction.deductionLabel': 'Leakage deduction',
    'insights.deduction.unknownLabel':
      'The leakage deduction cannot be estimated from these details',
    'insights.deduction.limitation':
      'Illustration, not a compensation promise. The deductible, cause, cover and other limitations are assessed separately.',
    'insights.scope.title': 'The cause and your own policy schedule matter',
    'insights.scope.text':
      'Escaped water and the broken pipe itself are assessed separately. Water passing through waterproofing is subject to limitations; separate LaajaPlus cover may extend protection under its own terms.',
    'insights.scope.limitation':
      'The demo does not infer the cause or your insurance cover. Internal corrosion or external breakage alone does not determine the calculation.',
    'insights.surface.title': 'What was renewed in the wet-room renovation?',
    'insights.surface.originalText':
      'The example wet room is original. Gather available construction and maintenance details.',
    'insights.surface.renovatedText':
      'The example renovation was in 2018. Check the documents to see whether pipes and waterproofing were renewed too.',
    'insights.surface.limitation':
      'This selection is not a condition survey and does not change the leakage deduction. Service life is not assessed in this demo.',
    'tasks.0.title': 'Locate the main water shut-off valve',
    'tasks.0.why': 'Knowing its location helps you find it during a leak.',
    'tasks.0.limitation':
      "Locating the valve in advance is the demo's application of leak-response guidance. It is pre-ticked in this example; the valve has not actually been inspected.",
    'tasks.1.title': 'Check under the sink and appliance drip trays',
    'tasks.1.why':
      'Look for leak marks in the sink cabinet and appropriate trays beneath appliances.',
    'tasks.1.limitation':
      'The tray requirement concerns rooms without a floor drain or floors where a leak is not immediately visible. A visual check cannot rule out a hidden leak.',
    'tasks.2.title': 'Clean floor drains and water traps',
    'tasks.2.why':
      'Keep the drainage path clear and follow the maintenance instructions for your drain.',
    'tasks.2.limitation':
      'Cleaning does not establish that waterproofing or joints are watertight. This task does not instruct dismantling structures or permanent joints.',
    'tasks.3.title': 'Gather pipe details for a professional assessment',
    'tasks.3.why':
      'Put pipe materials, renewal year and previous observations in one question list.',
    'tasks.3.limitation':
      'A demo preparation suggestion. The need, price and availability of an If partner inspection have not been verified.',
    'actions.0.label': 'Prepare a request for help – demo',
    'actions.0.title': 'Questions for a plumbing professional',
    'actions.0.text':
      "What is known about the pipework's condition? What further checks are needed?",
    'actions.0.confirmation':
      'This is a service guidance demo. Nothing was sent and no appointment was booked.',
    'actions.0.limitation':
      'No connection to a provider, verified partnership or promise of insurance compensation.',
    'preventionIncentive.sourceScope':
      'The published 10% programme level is a calculation reference. Your eligibility is unknown. Sources for preventive tasks do not verify the proposed additional benefit or a measured risk reduction.',
    'preventionIncentive.limitation':
      'Product idea, not an insurance quote. Base price, task rewards, cap and stacking are fictional assumptions. The prevention benefit is not a verified current If benefit. Your policy, cover and premium are not changed.',
    'preventionIncentive.copy.title': 'Prevention benefit',
    'preventionIncentive.copy.conceptLabel': 'Pricing concept – example price',
    'preventionIncentive.copy.intro':
      'Preventive tasks update this example price. Switching the insurance setup changes the separate bundle benefit.',
    'preventionIncentive.copy.projectedLabel': 'Possible annual price',
    'preventionIncentive.copy.savingLabel': 'Savings from preventive steps',
    'preventionIncentive.copy.baseLabel': 'Fictional base price',
    'preventionIncentive.copy.bundleLabel': "Selected setup's demo benefit",
    'preventionIncentive.copy.afterBundleLabel':
      'Annual price before the prevention benefit',
    'preventionIncentive.copy.preventionLabel': 'Possible prevention benefit',
    'preventionIncentive.copy.eligibleCountLabel':
      'Example steps counting towards the benefit',
    'preventionIncentive.copy.capLabel':
      'Maximum prevention benefit in this demo',
    'preventionIncentive.copy.assumptionsLabel':
      'How is the example price calculated?',
    'preventionIncentive.copy.assumptionsText':
      'The selected multi-policy example assumes a 10% bundle benefit; single-policy and visitor examples use 0%. These are interface assumptions. Your eligibility has not been checked. The additional prevention benefit is calculated from the remaining price only in the demo. Each stage rounds to the nearest cent, half up. Task rewards are invented assumptions, not measured risk weights.',
    'preventionIncentive.copy.evidenceLabel':
      'Sources for tasks and concept limitations',
    'preventionIncentive.copy.verificationNotice':
      'Ticks are self-reported in this demo. Actions have not been verified and no real discount has been approved. Locating the main valve is pre-ticked in the example.',
    'preventionIncentive.copy.verificationPlan':
      'A real service would assess suitable evidence, such as an inspection document, and insurer approval separately. Evidence requirements and validity periods are not defined in this concept.',
    'preventionIncentive.copy.deductionNotice':
      'The annual price benefit is separate from the leakage deduction example. Task ticks do not change coverage, the deductible or the leakage deduction.',
    'preventionIncentive.copy.completedLabel': 'Reported complete · demo',
    'preventionIncentive.copy.incompleteLabel': 'Not marked yet',
    'preventionIncentive.copy.preparationLabel':
      'No demo benefit · preparation',
    'preventionIncentive.copy.preparationNotice':
      'Preparing questions or opening a request does not prove an inspection or repair was completed, so it earns no demo benefit.',
    'preventionIncentive.copy.unavailableLabel':
      'The example price cannot be calculated from these price details.',
    'preventionIncentive.copy.announcementTemplate':
      'Possible annual price {price}. Preventive savings {saving} per year. Pricing concept, not an approved discount.',
    'preventionIncentive.copy.feedbackLabel':
      'Example price · no approved discount',
    'preventionIncentive.copy.feedbackSavingTemplate':
      'Additional preventive savings {saving}/year',
    'preventionIncentive.copy.showCalculationLabel': 'Show calculation',
    'publishedBenefits.title': 'Published customer benefits for comparison',
    'publishedBenefits.notice':
      'Benefit terms and validity checked on 17 October 2026. Your eligibility is unknown. These benefits are not automatically stacked into the calculation.',
    'publishedBenefits.items.0.title': 'Programme levels 10% / 15%',
    'publishedBenefits.items.0.text':
      'The 10% level requires applicable home or comprehensive vehicle insurance and electronic insurance mail. Two accepted policy groups can qualify for the 15% level.',
    'publishedBenefits.items.0.limitation':
      'Product- and period-specific terms govern eligibility. New customers join when conditions are met; existing customers from the next period. The calculation assumes only the 10% level.',
    'publishedBenefits.items.1.title':
      'Nordea channel: 25% for the first period',
    'publishedBenefits.items.1.text':
      'Nordea publishes a 25% first-period benefit on new If home insurance for its customers, and access to the 15% programme level.',
    'publishedBenefits.items.1.limitation':
      'Not a general offer for every new customer. Stacking cannot be inferred by adding percentages; this offer is not in the demo price.',
    'publishedBenefits.items.2.title': 'Conditional free maintenance plan',
    'publishedBenefits.items.2.text':
      'An eligible Laaja/LaajaPlus detached-home policyholder may receive a service including a home visit every four years and advice.',
    'publishedBenefits.items.2.limitation':
      "The existing service's home-visit details are not used to determine premiums or claim decisions. That service is separate from our proposed prevention benefit. Eligibility was not checked and no visit was ordered.",
    'claimsGuidance.title': 'Fewer uncertainties when making a claim',
    'claimsGuidance.successNotice':
      'The reviewed public sources provided no claim acceptance rate tied to completing these tasks. We do not estimate the probability of a claim decision.',
    'claimsGuidance.limitation':
      'An editorial summary of guidance. Maintenance and documents do not extend cover, remove deductions or guarantee an accepted claim.',
    'claimsGuidance.items.0.title': 'Follow the applicable safety instructions',
    'claimsGuidance.items.0.text':
      'Intentional failure to follow a safety instruction, or negligence greater than minor, may lead to reduced or refused compensation.',
    'claimsGuidance.items.0.limitation':
      'The applicable instruction, policy schedule and circumstances are assessed separately. A task tick does not prove an instruction was followed.',
    'claimsGuidance.items.1.title':
      'Keep essential work and loss details available',
    'claimsGuidance.items.1.text':
      'Claim handling requires information about the event and amount of loss. Ticking an example task does not replace necessary documents.',
    'claimsGuidance.items.1.limitation':
      'Required evidence depends on the case. We do not collect documents or change the purpose of information from the existing maintenance service.',
    'claimsGuidance.items.2.title': 'Check the cause, cover and limitations',
    'claimsGuidance.items.2.text':
      'Not all water damage falls under the same cover. For example, maintenance tasks do not remove limitations on water passing through waterproofing.',
    'claimsGuidance.items.2.limitation':
      'Any extension and your own policy schedule determine cover. The leakage deduction percentage is not a claim acceptance percentage.',
    'business.label': 'Business hypothesis',
    'business.text':
      'A proposed pricing benefit could encourage preventive steps. A pilot would investigate whether possible claims savings could fund benefits and verification. A clear deduction example could improve understanding of insurance.',
    'business.proposedMetrics.0': 'Preventive task completion rate',
    'business.proposedMetrics.2':
      'Understanding price and deductions in user testing',
    'business.limitation':
      'Pilot hypotheses. The pricing model, claims savings, profitability and increased retention have not been verified. Demo prices do not represent a current If product.',
    'experience.roles.visitor': 'New customer',
    'experience.roles.customer': 'Existing customer',
    'experience.staff.analyticsTitle': 'Selected customer group',
    'experience.staff.metricLabels.customers': 'Customers',
    'experience.staff.metricLabels.policies': 'Policies',
    'experience.staff.metricLabels.multi': 'Multiple policies',
    'experience.staff.metricLabels.feedback': 'Feedback / 5',
    'experience.staff.filtersTitle': 'Filter example data',
    'experience.staff.distributionTitle': 'Policy distribution',
    'experience.staff.feedbackTitle': 'Example feedback distribution',
    'experience.staff.tableTitle': 'Filtered example customers',
    'experience.staff.columns.customer': 'Customer',
    'experience.staff.columns.policies': 'Policies',
    'experience.staff.columns.preparation': 'Done / applicable',
    'experience.staff.columns.feedback': 'Feedback / 5',
    'experience.staff.customerCountColumn': 'Customers',
    'experience.staff.taskCountColumn': 'Done / applicable',
    'presentation.navTitle': 'New home',
    'presentation.contextTitle': 'Next small step',
    'presentation.tasksTitle': 'Small steps for your home',
    'preventionIncentive.copy.perYear': '/ year',
    'preventionIncentive.copy.taskBenefitTemplate': 'Demo benefit {percent}%',
    'business.proposedMetrics.1': 'Verification completion and cost in a pilot',
    'sources.0.limitation':
      "10/15% are published programme levels. Eligibility, electronic insurance mail, applicable policies and benefit period govern access. The example family's eligibility was not checked; the prevention benefit is not verified on this page.",
    'sources.1.limitation':
      'New customers join when conditions are met; existing customers from the next period. Benefits are confirmed annually. Historical deductible credit in the PDF is not treated as a new benefit.',
    'sources.2.limitation':
      'Bank-channel offer for the first period of new home insurance, not a general benefit for all new customers. Eligibility and stacking must be checked; not included in the demo price.',
    'sources.3.limitation':
      'Conditional service for Laaja/LaajaPlus detached-home policyholders; not a destructive condition survey or indoor moisture measurement. The demo does not establish eligibility or book a visit.',
    'sources.4.limitation':
      "The existing maintenance service's home-visit data cannot be used for claim decisions or premium determination. Inspection findings are not claim acceptance rates.",
    'sources.5.limitation':
      'Applies according to the policy schedule. Intentional failure or negligence greater than minor in following safety instructions may affect compensation. Required evidence is case-specific; following guidance does not guarantee compensation.',
    'sources.6.limitation':
      'Only a covered building leak caused by broken pipework. The policy schedule may state otherwise. Other deductions and the deductible are assessed separately.',
    'sources.7.limitation':
      'The loss from escaped water and repairing the pipe itself use different calculation rules. Cause, policy schedule, selected cover and any extensions determine applicability.',
    'sources.8.limitation':
      'Safety instructions alone do not determine cover. Also follow the appliance and installation maintenance instructions.',
    'sources.9.limitation':
      'Closing the main valve is leak-response guidance. Locating it beforehand is a demo preparation task; this page does not give valve-testing instructions. Its age table is not used as a calculation rule.',
    'sources.10.limitation':
      'Preventive consumer guidance, not a claim decision or evidence of measured claims savings.',
    'sources.11.limitation':
      'A separate extension listed on the policy schedule with validity, maximum amount and repair-cost limitations. The demo does not assume this cover or calculate compensation from it.',
    'sources.12.limitation':
      'Only current guidance-card identifiers and purpose checked. Paid service-life tables were not read. This does not support a universal 36-year limit or a material-specific service-life estimate.',
    'experience.policyContext.noPolicies': 'No policies assumed',
    'business.proposedMetrics.3':
      'Claims costs relative to benefits and verification costs',
    'experience.staff.unitSingularLabel': 'policy',
    'experience.staff.feedbackSingularLabel': 'response',
    'audiences.visitor.caseIntro':
      'Moving into a new home? Gather maintenance details and questions before choosing cover.',
    'audiences.visitor.contextTitle': 'Your first step before choosing cover',
    'audiences.visitor.tasksTitle': 'Prepare for your new home',
    'audiences.visitor.priceTitle': 'Explore a prevention benefit',
    'audiences.visitor.priceIntro':
      'Explore how small preventive steps could shape a future price. This is a fictional pricing concept, not a quote.',
    'audiences.visitor.packetContext':
      'New customer example: no policy or service entitlement is assumed.',
    'audiences.customer.caseIntro':
      'Home insurance is selected in this example. Review your home details, continue maintenance tasks and prepare questions about the selected contract.',
    'audiences.customer.contextTitle': 'Your next home maintenance step',
    'audiences.customer.tasksTitle': 'Your home maintenance tasks',
    'audiences.customer.priceTitle': 'Your example prevention benefit',
    'audiences.customer.priceIntro':
      'See how your selected setup and reported demo actions change the example price. Your real premium is not changed.',
    'audiences.customer.packetContext':
      'Existing customer example: details of the selected home contract remain unverified.',
    'experience.visitor.eyebrow': 'Explore If through your everyday life',
    'experience.visitor.heroLine1': 'New to If?',
    'experience.visitor.heroLine2': 'Start with your life.',
    'experience.visitor.heroText':
      'Explore small preventive steps and prepare questions before choosing cover.',
    'experience.customer.eyebrow':
      'Your insurance setup, your next useful step',
    'experience.customer.heroLine1': 'Your cover, every day.',
    'experience.customer.heroLine2': 'One useful step at a time.',
    'experience.customer.heroText':
      'Find services for your selected policies, continue your preparations and review questions about your contract.',
  },
  uiEnglish: {
    'Uusi koti': 'New home',
    'Koti tyhjillään': 'Away from home',
    'Ensimmäinen lapsi': 'First baby',
    'Lemmikin vointi': 'Pet wellbeing',
    'Ei tiedossa': 'Unknown',
    'Esimerkkitehtävien tilanne:': 'Example task status:',
    'Lähteestä tarkistettu': 'Checked against a source',
    'Havainnollistava demo': 'Illustrative demo',
    'Ei vahvistettu': 'Not verified',
    'Kriittinen huomio': 'Critical attention',
    'Korkea prioriteetti': 'High priority',
    Huomioi: 'Please check',
    Suositus: 'Recommendation',
    'Lähteet ja rajoitukset': 'Sources and limitations',
    Tarkistettu: 'Checked',
    Voimassa: 'Effective from',
    alkaen: 'onwards',
    tehty: 'done',
    Ikävähennykset: 'Age deductions',
    'Merkitty tehdyksi': 'Marked complete',
    'Esitäytetty profiili': 'Example profile',
    vrk: 'days',
    'Kuvitteellinen esimerkkitilanne': 'Fictional example',
    Vuotovähennys: 'Leakage deduction',
    'Oma kysymyslistasi · voit valita ja kopioida tekstin':
      'Your question list · you can select and copy the text',
    'vuotta vuonna': 'years old in',
    Vertailuvuosi: 'Reference year',
    v: 'years',
    'Siirry tilanteen sisältöön': 'Skip to the situation',
    'Arjen pienet turvateot': 'Small steps for everyday safety',
    'Elämä muuttuu. Olemme rinnalla.': 'Life changes. We are by your side.',
    'Pieni teko tänään.': 'One small step today.',
    'Huolettomampi huominen.': 'A more carefree tomorrow.',
    'Valitse elämäntilanteesi. Aloitetaan siitä, mihin voit vaikuttaa juuri nyt.':
      'Choose your life situation. Start with something you can do today.',
    'Kokeile kuvitteellisilla tiedoilla': 'Explore with fictional details',
    'Tiedot säilyvät vain tämän sivun muistissa.':
      'Details stay in this page’s memory only.',
    'Demon näkymä': 'Demo view',
    Elämäntilanteet: 'Life situations',
    'Ota JavaScript käyttöön, jotta voit kokeilla elämäntilanteita. Sovellus toimii ilman verkkoyhteyttä.':
      'Enable JavaScript to explore the life situations. The app works offline.',
    'Kuvitteellinen demo · Vertailuvuosi 2026 · Ei henkilökohtaista vakuutus- tai terveysarviota':
      'Fictional demo · Reference year 2026 · No personal insurance or health assessment',
    'Pienin askelin eteenpäin.': 'Moving forward, one small step at a time.',
    'Lisätiedot ja luonnokset': 'Details and drafts',
    'Sulje ikkuna': 'Close dialog',
    'If rinnalla — Pieni teko tänään.': 'If rinnalla — One small step today.',
    'Siirry työtilaan': 'Skip to the workspace',
    'Asiakkuusanalytiikka · demo': 'Customer analytics · demo',
    'Takaisin asiakasnäkymiin': 'Back to customer views',
    Tutustuja: 'Visitor',
    'Ifin asiakas': 'If customer',
    'Ifin henkilöstö': 'If staff',
    Asiakkuusanalytiikka: 'Customer analytics',
    'Ota JavaScript käyttöön nähdäksesi kuvitteellisen työtilan.':
      'Enable JavaScript to see this fictional workspace.',
    'Henkilöstödemo · vain keksittyä aineistoa · mitään ei lähetetä':
      'Staff demo · invented data only · nothing is sent',
    'If rinnalla — Asiakkuusanalytiikka': 'If rinnalla — Customer analytics',
    'Uusi asiakas': 'New customer',
    'Nykyinen asiakas': 'Existing customer',
  },
  audiences: {
    visitor: {
      caseIntro:
        'Muutatko uuteen kotiin? Selvitä tärkeät huoltotiedot ja kokoa kysymykset ennen vakuutuksen valintaa.',
      contextTitle: 'Ensimmäinen teko ennen vakuutuksen valintaa',
      tasksTitle: 'Valmistaudu uuteen kotiin',
      priceTitle: 'Tutustu ehkäisyedun ideaan',
      priceIntro:
        'Kokeile, miten pienet ehkäisyteot voisivat vaikuttaa tulevaan hintaan. Tämä on kuvitteellinen hinnoitteluesimerkki, ei tarjous.',
      packetContext:
        'Uuden asiakkaan esimerkki: vakuutusta tai palveluoikeutta ei oleteta.',
    },
    customer: {
      caseIntro:
        'Kotivakuutus on valittu esimerkkiin. Tarkista kotisi tiedot, jatka huoltotehtäviä ja valmistele nykyiseen sopimukseen liittyvät kysymykset.',
      contextTitle: 'Seuraava teko oman kotisi ylläpitoon',
      tasksTitle: 'Oman kotisi huoltotehtävät',
      priceTitle: 'Oman kokonaisuutesi ehkäisyetu · esimerkki',
      priceIntro:
        'Näe, miten valittu vakuutuskokonaisuus ja omat demomerkinnät muuttavat esimerkkihintaa. Oikea vakuutusmaksusi ei muutu.',
      packetContext:
        'Nykyisen asiakkaan esimerkki: valitun kotivakuutuksen sopimustiedot ovat tarkistamatta.',
    },
  },
};
