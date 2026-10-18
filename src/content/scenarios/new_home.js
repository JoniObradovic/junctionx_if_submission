export default {
  schemaVersion: 1,
  title: {
    fi: 'Uusi koti & Ikävähennykset',
    en: 'New home & age deductions',
  },
  persona: {
    fi: 'Matti & Liisa – Muutto 1994 rakennettuun omakotitaloon (120 m²)',
    en: 'Matti & Liisa – Moving into a detached house built in 1994 (120 m²)',
  },
  referenceYear: 2026,
  demoNotice: {
    fi: 'Kuvitteellinen esimerkkikoti. Vertailuvuosi on 2026. Oma vakuutusturvasi ei ole tiedossa.',
    en: 'Fictional example home. Reference year: 2026. Your own insurance cover is unknown.',
  },
  presentation: {
    navTitle: {
      fi: 'Uusi koti',
      en: 'New home',
    },
    navSubtitle: {
      fi: 'Ikävähennykset & pienet teot',
      en: 'Age deductions & small steps',
    },
    contextTitle: {
      fi: 'Seuraava pieni teko',
      en: 'Next small step',
    },
    homeLabel: {
      fi: 'Esimerkkikoti · omakotitalo, 120 m²',
      en: 'Example home · detached house, 120 m²',
    },
    pipeTaskTitle: {
      fi: 'Selvitä putkiston tiedot ja vuotovähennys',
      en: 'Find pipe details and the leakage deduction',
    },
    pipeTaskHelp: {
      fi: 'Muuta vuotta ja näe tähän tehtävään liittyvä laskenta heti. Merkintä tarkoittaa tietojen kokoamista, ei putkiston korjaamista.',
      en: "Change the year to see this task's calculation immediately. A tick means gathering information, not repairing the pipes.",
    },
    resultLabel: {
      fi: 'Vuotovähennys tässä laskentaesimerkissä',
      en: 'Leakage deduction in this calculation example',
    },
    nextActionLabel: {
      fi: 'Näytä tehtävä',
      en: 'Show task',
    },
    allDoneTitle: {
      fi: 'Esimerkin tehtävät on merkitty tehdyiksi',
      en: 'Example tasks marked complete',
    },
    allDoneText: {
      fi: 'Voit tarkistaa merkinnät ja valmistella kysymykset. Merkinnät eivät vahvista turvallisuutta tai vakuutusturvaa.',
      en: 'Review your ticks and prepare questions. Ticks do not establish safety or insurance cover.',
    },
    missingYearText: {
      fi: 'Selvitä putkiston käyttöönotto- tai uusimisvuosi asiakirjoista. Puuttuvalla vuodella vähennystä ei arvioida.',
      en: 'Find the pipe installation or renewal year in the documents. A deduction is not estimated without a year.',
    },
    deductionText: {
      fi: 'Vuoden {year} putkisto: ehdollinen vuotovähennys {percent} %. Kokoa tiedot vakuutusehtojen läpikäyntiin.',
      en: 'Pipes from {year}: conditional leakage deduction {percent}%. Gather the details to review the policy terms.',
    },
    zeroDeductionText: {
      fi: 'Vuoden {year} putkiston esimerkkivähennys on 0 %. Valitse seuraavaksi avoin huoltotehtävä.',
      en: 'Pipes from {year}: the example deduction is 0%. Choose an open maintenance task next.',
    },
    surfaceSummary: {
      fi: 'Märkätilatieto: {year}. Remonttivuosi ohjaa asiakirjojen tarkistusta.',
      en: 'Wet-room information: {year}. The renovation year guides document checks.',
    },
    tasksTitle: {
      fi: 'Pienet teot uudessa kodissa',
      en: 'Small steps for your home',
    },
    prioritiesNotice: {
      fi: 'Prioriteetit ovat demon ehdottama järjestys, eivät vakuutusehdon luokitus.',
      en: "Priorities are the demo's suggested order, not a classification in the policy terms.",
    },
    progressNotice: {
      fi: 'Valmius kertoo vain esimerkkitehtävien merkinnöistä. Se ei arvioi kodin turvallisuutta tai vakuutusturvaa.',
      en: 'Readiness describes ticks on example tasks only. It does not assess home safety or insurance cover.',
    },
    calculationScope: {
      fi: 'Ehdot täyttävän rakennuksen putkivuotovahingon laskentaesimerkki',
      en: 'Calculation example for a building pipe leak meeting the policy conditions',
    },
    unknownYearLabel: {
      fi: 'Putkiston vuosi ei ole tiedossa',
      en: 'Pipe year is unknown',
    },
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
      label: {
        fi: 'Putkiston käyttöönotto- tai uusimisvuosi',
        en: 'Pipe installation or renewal year',
      },
      help: {
        fi: 'Esimerkissä putkisto on alkuperäinen. Vaihda vuosi, jos putkisto on uusittu.',
        en: 'The example has original pipes. Change the year if they have been renewed.',
      },
    },
    {
      id: 'surfaceYear',
      type: 'choice',
      label: {
        fi: 'Märkätilan remonttivuosi',
        en: 'Wet-room renovation year',
      },
      options: [
        {
          value: 1994,
          label: {
            fi: 'Alkuperäinen 1994',
            en: 'Original, 1994',
          },
        },
        {
          value: 2018,
          label: {
            fi: 'Remontoitu 2018',
            en: 'Renovated, 2018',
          },
        },
      ],
      help: {
        fi: 'Erillinen esimerkkitieto: märkätilaremontti ei tarkoita putkiston uusimista.',
        en: 'Separate example detail: renovating the wet room does not mean the pipes were renewed.',
      },
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
      limitation: {
        fi: '10/15 % ovat julkaistuja ohjelmatasoja. Kelpoisuus, sähköinen vakuutusposti, soveltuvat vakuutukset ja etukausi ratkaisevat. Esimerkkiperheen oikeutta etuun ei ole selvitetty; ehkäisyetua ei ole tällä sivulla vahvistettu.',
        en: "10/15% are published programme levels. Eligibility, electronic insurance mail, applicable policies and benefit period govern access. The example family's eligibility was not checked; the prevention benefit is not verified on this page.",
      },
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
      limitation: {
        fi: 'Uusi asiakas liittyy ehtojen täyttyessä, nykyinen seuraavan kauden alusta. Edut vahvistetaan vuosittain. PDF:n historiallista omavastuurahaa ei käytetä uutena etuna.',
        en: 'New customers join when conditions are met; existing customers from the next period. Benefits are confirmed annually. Historical deductible credit in the PDF is not treated as a new benefit.',
      },
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
      limitation: {
        fi: 'Pankkikanavan tarjous uuden kotivakuutuksen ensimmäiselle kaudelle, ei kaikkien uusien asiakkaiden yleinen etu. Kelpoisuus ja alennusten yhdistäminen varmistettava; ei lisätä demon hintaan.',
        en: 'Bank-channel offer for the first period of new home insurance, not a general benefit for all new customers. Eligibility and stacking must be checked; not included in the demo price.',
      },
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
      limitation: {
        fi: 'Laaja/LaajaPlus-omakotitalon vakuutuksenottajalle ehdollinen palvelu, ei rakenteita rikkova kuntotutkimus eikä sisätilojen kosteusmittaus. Demossa ei todeta kelpoisuutta eikä varata käyntiä.',
        en: 'Conditional service for Laaja/LaajaPlus detached-home policyholders; not a destructive condition survey or indoor moisture measurement. The demo does not establish eligibility or book a visit.',
      },
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
      limitation: {
        fi: 'Nykyisen kunnossapitopalvelun kotikäyntitietoja ei voida käyttää korvauspäätöksiin tai vakuutusmaksun määrittelyyn. Tarkastusten puutehavainnot eivät ole korvausten hyväksymisprosentteja.',
        en: "The existing maintenance service's home-visit data cannot be used for claim decisions or premium determination. Inspection findings are not claim acceptance rates.",
      },
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
      limitation: {
        fi: 'Soveltuu vakuutuskirjan mukaan. Tahallinen tai vähäistä suurempi huolimattomuus suojeluohjeissa voi vaikuttaa korvaukseen. Tarvittavat selvitykset ovat tapauskohtaisia; ohjeiden noudattaminen ei takaa korvausta.',
        en: 'Applies according to the policy schedule. Intentional failure or negligence greater than minor in following safety instructions may affect compensation. Required evidence is case-specific; following guidance does not guarantee compensation.',
      },
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
      limitation: {
        fi: 'Vain korvauspiiriin kuuluva rakennuksen johtoverkon rikkoutumisesta aiheutunut vuotovahinko. Vakuutuskirja voi määrätä toisin. Muut vähennykset ja omavastuu arvioidaan erikseen.',
        en: 'Only a covered building leak caused by broken pipework. The policy schedule may state otherwise. Other deductions and the deductible are assessed separately.',
      },
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
      limitation: {
        fi: 'Vuotovahingon ja putken oman korjauksen laskentaperusteet eroavat. Vahingon syy, vakuutuskirja, valittu turva ja mahdolliset laajennukset ratkaisevat soveltuvuuden.',
        en: 'The loss from escaped water and repairing the pipe itself use different calculation rules. Cause, policy schedule, selected cover and any extensions determine applicability.',
      },
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
      limitation: {
        fi: 'Suojeluohjeet eivät yksin ratkaise korvattavuutta. Noudata myös laitteen ja asennuksen omia huolto-ohjeita.',
        en: 'Safety instructions alone do not determine cover. Also follow the appliance and installation maintenance instructions.',
      },
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
      limitation: {
        fi: 'Päähanan sulkeminen on toimintaohje vahingossa. Venttiilin paikantaminen etukäteen on demon valmistautumistehtävä; sivu ei anna venttiilin koestusohjetta. Sivun ikätaulukkoa ei käytetä laskentasääntönä.',
        en: 'Closing the main valve is leak-response guidance. Locating it beforehand is a demo preparation task; this page does not give valve-testing instructions. Its age table is not used as a calculation rule.',
      },
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
      limitation: {
        fi: 'Ennaltaehkäisevää kuluttajaohjeistusta. Ei korvauspäätös eikä peruste mitatulle vahinkosäästölle.',
        en: 'Preventive consumer guidance, not a claim decision or evidence of measured claims savings.',
      },
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
      limitation: {
        fi: 'Erillinen vakuutuskirjaan merkitty laajennus, jolla on voimassaolo-, enimmäismäärä- ja korjauskulurajoituksia. Demo ei oleta tätä turvaa eikä laske sen korvausta.',
        en: 'A separate extension listed on the policy schedule with validity, maximum amount and repair-cost limitations. The demo does not assume this cover or calculate compensation from it.',
      },
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
      limitation: {
        fi: 'Vain nykyisten ohjekorttien tunnukset ja käyttötarkoitus tarkistettu. Maksullisia käyttöikätaulukoita ei luettu. Ei tue yleistä 36 vuoden rajaa eikä materiaalikohtaista käyttöikäarviota.',
        en: 'Only current guidance-card identifiers and purpose checked. Paid service-life tables were not read. This does not support a universal 36-year limit or a material-specific service-life estimate.',
      },
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
      limitation: {
        fi: 'Taulukko kuvaa yhtä vähennystä ehdot täyttävän vahingon laskentapohjasta. Se ei osoita, että vahinko korvataan.',
        en: 'The table shows one deduction from the calculation basis for a qualifying loss. It does not establish that the loss is covered.',
      },
    },
    pipeRepair: {
      status: 'verified',
      sourceIds: ['if-oma-200-27-scope'],
      annualDeductionPercent: 3,
      noDeductionAges: [0, 1],
      includedInLeakageBar: false,
      limitation: {
        fi: 'Putken omat korjaus- ja uusimiskulut arvioidaan erikseen kohdan 6.2.1.4 mukaan. Vuotovähennyksen prosenttia ei käytetä näihin kuluihin.',
        en: 'Repairing or replacing the pipe itself is assessed separately under section 6.2.1.4. The leakage deduction percentage does not apply to those costs.',
      },
    },
    surfaceYear: {
      status: 'illustrative',
      sourceIds: [
        'if-oma-200-27-leak',
        'if-oma-200-27-scope',
        'if-olr-260-7-wet-room',
      ],
      affectsLeakageDeduction: false,
      limitation: {
        fi: 'Demon remonttivalinta muuttaa muistutusta remonttiasiakirjoista. Pelkkä pintojen vuosi ei osoita putkien uusimista, vesieristeen kuntoa tai vakuutuksen kattavuutta.',
        en: 'The renovation selection changes the document reminder. Surface age alone does not establish pipe renewal, waterproofing condition or insurance cover.',
      },
    },
    technicalLifespan: {
      status: 'unverified',
      sourceIds: ['rakennustieto-lifespan-metadata'],
      criticalAge: null,
      limitation: {
        fi: 'Materiaalikohtainen taulukko ja kohteen kunto puuttuvat. Ikä yksin ei laukaise käyttöiän päättymistä koskevaa varoitusta.',
        en: "A material-specific table and the property's condition are missing. Age alone does not trigger an end-of-service-life warning.",
      },
    },
  },
  insights: {
    deduction: {
      title: {
        fi: 'Putkiston vuotovähennys',
        en: 'Pipe leakage deduction',
      },
      status: 'verified',
      sourceIds: ['if-oma-200-27-leak'],
      remainingLabel: {
        fi: 'Laskentapohjaa jäljellä ennen muita vähennyksiä',
        en: 'Calculation basis remaining before other deductions',
      },
      deductionLabel: {
        fi: 'Vuotovähennys',
        en: 'Leakage deduction',
      },
      unknownLabel: {
        fi: 'Vuotovähennystä ei voida arvioida näillä tiedoilla',
        en: 'The leakage deduction cannot be estimated from these details',
      },
      limitation: {
        fi: 'Havainnollistus, ei korvauslupaus. Omavastuu, vahingon syy, vakuutusturva ja muut rajoitukset arvioidaan erikseen.',
        en: 'Illustration, not a compensation promise. The deductible, cause, cover and other limitations are assessed separately.',
      },
    },
    scope: {
      title: {
        fi: 'Vahingon syy ja oma vakuutuskirja ratkaisevat',
        en: 'The cause and your own policy schedule matter',
      },
      status: 'verified',
      sourceIds: ['if-oma-200-27-scope', 'if-olr-260-7-wet-room'],
      text: {
        fi: 'Vuotanut vesi ja itse rikkoutunut putki arvioidaan erikseen. Vesieristeen läpi päässeeseen veteen liittyy rajoituksia; erillinen LaajaPlus-turva voi laajentaa suojaa omilla ehdoillaan.',
        en: 'Escaped water and the broken pipe itself are assessed separately. Water passing through waterproofing is subject to limitations; separate LaajaPlus cover may extend protection under its own terms.',
      },
      limitation: {
        fi: 'Demo ei päättele vahingon syytä eikä vakuutusturvaasi. Sisäinen syöpyminen tai ulkoinen rikkoutuminen ei yksin ratkaise laskentaa.',
        en: 'The demo does not infer the cause or your insurance cover. Internal corrosion or external breakage alone does not determine the calculation.',
      },
    },
    surface: {
      title: {
        fi: 'Mitä märkätilaremontissa uusittiin?',
        en: 'What was renewed in the wet-room renovation?',
      },
      status: 'illustrative',
      sourceIds: ['if-oma-200-27-leak', 'if-oma-200-27-scope'],
      originalText: {
        fi: 'Esimerkissä märkätila on alkuperäinen. Kokoa saatavilla olevat rakenne- ja huoltotiedot.',
        en: 'The example wet room is original. Gather available construction and maintenance details.',
      },
      renovatedText: {
        fi: 'Esimerkissä remontti tehtiin 2018. Tarkista asiakirjoista, uusittiinko myös putkisto ja vesieristys.',
        en: 'The example renovation was in 2018. Check the documents to see whether pipes and waterproofing were renewed too.',
      },
      limitation: {
        fi: 'Valinta ei ole kuntotutkimus eikä muuta vuotovähennystä. Käyttöikää ei arvioida tässä demossa.',
        en: 'This selection is not a condition survey and does not change the leakage deduction. Service life is not assessed in this demo.',
      },
    },
  },
  tasks: [
    {
      id: 'main-valve',
      title: {
        fi: 'Paikanna veden pääsulkuventtiili',
        en: 'Locate the main water shut-off valve',
      },
      why: {
        fi: 'Kun tiedät venttiilin paikan, löydät sen vuototilanteessa.',
        en: 'Knowing its location helps you find it during a leak.',
      },
      priority: 'high',
      status: 'illustrative',
      sourceIds: ['if-water-damage-actions'],
      limitation: {
        fi: 'Ennakkoon paikantaminen on demon sovellus vahingon toimintaohjeesta. Merkintä on esimerkissä valmiina; venttiiliä ei ole oikeasti tarkastettu.',
        en: "Locating the valve in advance is the demo's application of leak-response guidance. It is pre-ticked in this example; the valve has not actually been inspected.",
      },
    },
    {
      id: 'kitchen-leaks',
      title: {
        fi: 'Tarkista allaskaappi ja kodinkoneiden vuotokaukalot',
        en: 'Check under the sink and appliance drip trays',
      },
      why: {
        fi: 'Katso, näkyykö allaskaapissa vuotojälkiä ja onko laitteiden alla asianmukainen kaukalo.',
        en: 'Look for leak marks in the sink cabinet and appropriate trays beneath appliances.',
      },
      priority: 'high',
      status: 'verified',
      sourceIds: ['if-water-prevention', 'if-oma-200-27-prevention'],
      limitation: {
        fi: 'Kaukalovaatimus koskee lattiakaivotonta tilaa tai lattiaa, jolla vuoto ei näy heti. Silmämääräinen tarkistus ei sulje pois piilevää vuotoa.',
        en: 'The tray requirement concerns rooms without a floor drain or floors where a leak is not immediately visible. A visual check cannot rule out a hidden leak.',
      },
    },
    {
      id: 'floor-drain',
      title: {
        fi: 'Puhdista lattiakaivot ja hajulukot',
        en: 'Clean floor drains and water traps',
      },
      why: {
        fi: 'Pidä veden kulkureitti avoimena ja noudata oman kaivon huolto-ohjetta.',
        en: 'Keep the drainage path clear and follow the maintenance instructions for your drain.',
      },
      priority: 'medium',
      status: 'verified',
      sourceIds: ['if-oma-200-27-prevention'],
      limitation: {
        fi: 'Puhdistus ei osoita vesieristyksen tai liitosten tiiviyttä. Tämä tehtävä ei ohjaa rakenteiden tai kiinteiden liitosten purkamiseen.',
        en: 'Cleaning does not establish that waterproofing or joints are watertight. This task does not instruct dismantling structures or permanent joints.',
      },
    },
    {
      id: 'professional-review',
      title: {
        fi: 'Kokoa putkiston tiedot ammattilaisen arviota varten',
        en: 'Gather pipe details for a professional assessment',
      },
      why: {
        fi: 'Kirjaa putkien materiaali, uusimisvuosi ja aiemmat havainnot yhteen kysymyslistaan.',
        en: 'Put pipe materials, renewal year and previous observations in one question list.',
      },
      priority: 'recommendation',
      status: 'illustrative',
      sourceIds: ['rakennustieto-lifespan-metadata', 'if-oma-200-27-leak'],
      limitation: {
        fi: 'Demon valmistautumisehdotus. Tarkastuksen tarvetta, hintaa tai Ifin kumppanipalvelun saatavuutta ei ole vahvistettu.',
        en: 'A demo preparation suggestion. The need, price and availability of an If partner inspection have not been verified.',
      },
      actionId: 'plumbing-help',
    },
  ],
  actions: [
    {
      id: 'plumbing-help',
      label: {
        fi: 'Valmistele avunpyyntö – demo',
        en: 'Prepare a request for help – demo',
      },
      status: 'illustrative',
      sourceIds: ['rakennustieto-lifespan-metadata'],
      title: {
        fi: 'Kysymyslista LVI-ammattilaiselle',
        en: 'Questions for a plumbing professional',
      },
      text: {
        fi: 'Mitä putkiston kunnosta tiedetään? Mitä lisäselvityksiä tarvitaan?',
        en: "What is known about the pipework's condition? What further checks are needed?",
      },
      confirmation: {
        fi: 'Tämä on palveluohjauksen demo. Mitään ei lähetetty eikä aikaa varattu.',
        en: 'This is a service guidance demo. Nothing was sent and no appointment was booked.',
      },
      limitation: {
        fi: 'Ei yhteyttä palveluntarjoajaan, vahvistettua kumppanuutta tai lupausta vakuutuskorvauksesta.',
        en: 'No connection to a provider, verified partnership or promise of insurance compensation.',
      },
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
    sourceScope: {
      fi: 'Julkaistu 10 % ohjelmataso on laskelman vertailukohta. Kelpoisuutesi on tuntematon. Ehkäisytehtävien lähteet eivät vahvista ehdotettua lisäetua tai mitattua riskin vähenemistä.',
      en: 'The published 10% programme level is a calculation reference. Your eligibility is unknown. Sources for preventive tasks do not verify the proposed additional benefit or a measured risk reduction.',
    },
    limitation: {
      fi: 'Tuoteidea, ei vakuutustarjous. Lähtöhinta, tehtävien etuosuudet, enimmäisetu ja lisäedun yhdistäminen ovat kuvitteellisia oletuksia. Ehkäisyetu ei ole vahvistettu nykyinen If-etu. Vakuutustasi, turvaasi tai maksuasi ei muuteta.',
      en: 'Product idea, not an insurance quote. Base price, task rewards, cap and stacking are fictional assumptions. The prevention benefit is not a verified current If benefit. Your policy, cover and premium are not changed.',
    },
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
      title: {
        fi: 'Ennaltaehkäisyetu',
        en: 'Prevention benefit',
      },
      conceptLabel: {
        fi: 'Hinnoittelukonsepti – esimerkkihinta',
        en: 'Pricing concept – example price',
      },
      intro: {
        fi: 'Tehtävälistan ehkäisyteot päivittävät tätä esimerkkihintaa. Vakuutuskokonaisuuden vaihto muuttaa erillistä yhdistämisetua.',
        en: 'Preventive tasks update this example price. Switching the insurance setup changes the separate bundle benefit.',
      },
      projectedLabel: {
        fi: 'Mahdollinen vuosihinta',
        en: 'Possible annual price',
      },
      perYear: {
        fi: '/ vuosi',
        en: '/ year',
      },
      savingLabel: {
        fi: 'Säästöä ehkäisyteoista',
        en: 'Savings from preventive steps',
      },
      baseLabel: {
        fi: 'Kuvitteellinen lähtöhinta',
        en: 'Fictional base price',
      },
      bundleLabel: {
        fi: 'Valitun kokonaisuuden demoetu',
        en: "Selected setup's demo benefit",
      },
      afterBundleLabel: {
        fi: 'Vuosihinta ennen ehkäisyetua',
        en: 'Annual price before the prevention benefit',
      },
      preventionLabel: {
        fi: 'Mahdollinen ennaltaehkäisyetu',
        en: 'Possible prevention benefit',
      },
      eligibleCountLabel: {
        fi: 'Etuun laskettavia esimerkkitekoja',
        en: 'Example steps counting towards the benefit',
      },
      capLabel: {
        fi: 'Ehkäisyedun enimmäismäärä demossa',
        en: 'Maximum prevention benefit in this demo',
      },
      assumptionsLabel: {
        fi: 'Mistä esimerkkihinta muodostuu?',
        en: 'How is the example price calculated?',
      },
      assumptionsText: {
        fi: 'Valitulle usean vakuutuksen esimerkille oletetaan 10 % yhdistämisetu; yhden vakuutuksen ja tutustujan esimerkeissä se on 0 %. Nämä ovat käyttöliittymän oletuksia. Omaa kelpoisuuttasi ei ole selvitetty. Ehkäisyn lisäetu lasketaan jäljelle jäävästä hinnasta vain demossa. Vaiheet pyöristetään lähimpään senttiin, puolikas ylöspäin. Tehtäväosuudet ovat keksittyjä oletuksia, eivät mitattuja riskipainoja.',
        en: 'The selected multi-policy example assumes a 10% bundle benefit; single-policy and visitor examples use 0%. These are interface assumptions. Your eligibility has not been checked. The additional prevention benefit is calculated from the remaining price only in the demo. Each stage rounds to the nearest cent, half up. Task rewards are invented assumptions, not measured risk weights.',
      },
      evidenceLabel: {
        fi: 'Ehkäisytehtävien lähteet ja konseptin rajat',
        en: 'Sources for tasks and concept limitations',
      },
      verificationNotice: {
        fi: 'Merkinnät ovat oma ilmoitus demossa. Toimia ei ole todennettu eikä oikeaa alennusta hyväksytty. Pääsulun paikantaminen on esimerkissä valmiiksi merkitty.',
        en: 'Ticks are self-reported in this demo. Actions have not been verified and no real discount has been approved. Locating the main valve is pre-ticked in the example.',
      },
      verificationPlan: {
        fi: 'Oikeassa palvelussa soveltuva näyttö, kuten tarkastusasiakirja, ja vakuutusyhtiön hyväksyntä arvioitaisiin erikseen. Näyttövaatimuksia tai voimassaoloa ei ole määritelty tässä konseptissa.',
        en: 'A real service would assess suitable evidence, such as an inspection document, and insurer approval separately. Evidence requirements and validity periods are not defined in this concept.',
      },
      deductionNotice: {
        fi: 'Vuosihinnan etu on erillinen vuotovähennyksen laskentaesimerkistä. Tehtävämerkinnät eivät muuta vahingon korvattavuutta, omavastuuta tai vuotovähennystä.',
        en: 'The annual price benefit is separate from the leakage deduction example. Task ticks do not change coverage, the deductible or the leakage deduction.',
      },
      completedLabel: {
        fi: 'Ilmoitettu tehdyksi · demo',
        en: 'Reported complete · demo',
      },
      incompleteLabel: {
        fi: 'Ei vielä merkitty',
        en: 'Not marked yet',
      },
      taskBenefitTemplate: {
        fi: 'Demoetu +{percent} %-yks.',
        en: 'Demo benefit {percent}%',
      },
      preparationLabel: {
        fi: 'Ei demoetua · valmistautuminen',
        en: 'No demo benefit · preparation',
      },
      preparationNotice: {
        fi: 'Kysymyslistan valmistelu tai avunpyynnön avaaminen ei osoita tarkastuksen tai korjauksen toteutumista, joten siitä ei kerry demoetua.',
        en: 'Preparing questions or opening a request does not prove an inspection or repair was completed, so it earns no demo benefit.',
      },
      unavailableLabel: {
        fi: 'Esimerkkihintaa ei voida laskea näillä hintatiedoilla.',
        en: 'The example price cannot be calculated from these price details.',
      },
      announcementTemplate: {
        fi: 'Mahdollinen vuosihinta {price}. Säästöä ehkäisyteoista {saving} vuodessa. Hinnoittelukonsepti, ei hyväksytty alennus.',
        en: 'Possible annual price {price}. Preventive savings {saving} per year. Pricing concept, not an approved discount.',
      },
      feedbackLabel: {
        fi: 'Esimerkkihinta · ei hyväksytty alennus',
        en: 'Example price · no approved discount',
      },
      feedbackSavingTemplate: {
        fi: 'Ehkäisyn lisäsäästö {saving}/vuosi',
        en: 'Additional preventive savings {saving}/year',
      },
      showCalculationLabel: {
        fi: 'Näytä laskelma',
        en: 'Show calculation',
      },
    },
  },
  publishedBenefits: {
    title: {
      fi: 'Julkaistuja asiakasetuja vertailuksi',
      en: 'Published customer benefits for comparison',
    },
    notice: {
      fi: 'Etujen ehdot ja voimassaolo tarkistettu 17.10.2026. Oma oikeutesi etuihin on tuntematon. Näitä etuja ei pinota laskelmaan automaattisesti.',
      en: 'Benefit terms and validity checked on 17 October 2026. Your eligibility is unknown. These benefits are not automatically stacked into the calculation.',
    },
    items: [
      {
        id: 'programme',
        title: {
          fi: 'Ohjelmatasot 10 % / 15 %',
          en: 'Programme levels 10% / 15%',
        },
        status: 'verified',
        sourceIds: ['if-benefit-programme', 'if-benefit-rules'],
        text: {
          fi: '10 % taso edellyttää soveltuvaa koti- tai kaskovakuutusta ja sähköistä vakuutuspostia. 15 % tasolle voi päästä kahdella hyväksytyllä vakuutusryhmällä.',
          en: 'The 10% level requires applicable home or comprehensive vehicle insurance and electronic insurance mail. Two accepted policy groups can qualify for the 15% level.',
        },
        limitation: {
          fi: 'Tuote- ja kausikohtaiset ehdot ratkaisevat. Uusi asiakas mukaan ehtojen täyttyessä; nykyinen seuraavan kauden alusta. Laskelmassa oletetaan vain 10 % taso.',
          en: 'Product- and period-specific terms govern eligibility. New customers join when conditions are met; existing customers from the next period. The calculation assumes only the 10% level.',
        },
        audiences: ['visitor', 'customer'],
      },
      {
        id: 'new-customer',
        title: {
          fi: 'Nordean kanava: 25 % ensimmäiselle kaudelle',
          en: 'Nordea channel: 25% for the first period',
        },
        status: 'verified',
        sourceIds: ['nordea-new-home-offer'],
        text: {
          fi: 'Nordea julkaisee asiakkailleen uuden If-kotivakuutuksen 25 % ensikausiedun ja pääsyn 15 % ohjelmatasolle.',
          en: 'Nordea publishes a 25% first-period benefit on new If home insurance for its customers, and access to the 15% programme level.',
        },
        limitation: {
          fi: 'Ei yleinen tarjous kaikille uusille asiakkaille. Yhdistämistä ei päätellä laskemalla prosentteja yhteen; tarjous ei sisälly demon hintaan.',
          en: 'Not a general offer for every new customer. Stacking cannot be inferred by adding percentages; this offer is not in the demo price.',
        },
        audiences: ['visitor'],
      },
      {
        id: 'maintenance',
        title: {
          fi: 'Ehdollinen maksuton kunnossapitosuunnitelma',
          en: 'Conditional free maintenance plan',
        },
        status: 'verified',
        sourceIds: ['if-maintenance-service', 'if-maintenance-data-boundary'],
        text: {
          fi: 'Laaja/LaajaPlus-omakotitalon vakuutuksenottaja voi kuulua palveluun, johon sisältyy kotikäynti neljän vuoden välein ja neuvonta.',
          en: 'An eligible Laaja/LaajaPlus detached-home policyholder may receive a service including a home visit every four years and advice.',
        },
        limitation: {
          fi: 'Nykyisen palvelun kotikäyntitietoja ei käytetä vakuutusmaksun tai korvauspäätöksen määrittelyyn. Tämä palvelu on erillinen ehdottamastamme ehkäisyedusta. Kelpoisuutta ei tarkistettu eikä käyntiä tilattu.',
          en: "The existing service's home-visit details are not used to determine premiums or claim decisions. That service is separate from our proposed prevention benefit. Eligibility was not checked and no visit was ordered.",
        },
        audiences: ['customer'],
      },
    ],
  },
  claimsGuidance: {
    title: {
      fi: 'Vähemmän epäselvyyksiä korvaustilanteessa',
      en: 'Fewer uncertainties when making a claim',
    },
    status: 'illustrative',
    sourceIds: [
      'if-general-protection-and-claims',
      'if-oma-200-27-scope',
      'if-oma-200-27-prevention',
    ],
    observedSuccessRatePercent: null,
    successEvidenceStatus: 'unverified',
    successNotice: {
      fi: 'Näiden tehtävien tekemiseen sidottua korvausten hyväksymisprosenttia ei löytynyt tarkistetuista julkisista lähteistä. Emme arvioi korvauspäätöksen todennäköisyyttä.',
      en: 'The reviewed public sources provided no claim acceptance rate tied to completing these tasks. We do not estimate the probability of a claim decision.',
    },
    limitation: {
      fi: 'Ohjeiden toimituksellinen koonti. Huolto ja asiakirjat eivät laajenna vakuutusturvaa, poista vähennyksiä tai takaa hyväksyttyä korvauspäätöstä.',
      en: 'An editorial summary of guidance. Maintenance and documents do not extend cover, remove deductions or guarantee an accepted claim.',
    },
    items: [
      {
        title: {
          fi: 'Noudata soveltuvia suojeluohjeita',
          en: 'Follow the applicable safety instructions',
        },
        text: {
          fi: 'Suojeluohjeen tahallinen tai vähäistä suuremmasta huolimattomuudesta johtuva laiminlyönti voi johtaa korvauksen alentamiseen tai epäämiseen.',
          en: 'Intentional failure to follow a safety instruction, or negligence greater than minor, may lead to reduced or refused compensation.',
        },
        status: 'verified',
        sourceIds: [
          'if-general-protection-and-claims',
          'if-oma-200-27-prevention',
        ],
        limitation: {
          fi: 'Soveltuva ohje, vakuutuskirja ja vahingon olosuhteet arvioidaan erikseen. Tehtävämerkintä ei osoita ohjeen toteutumista.',
          en: 'The applicable instruction, policy schedule and circumstances are assessed separately. A task tick does not prove an instruction was followed.',
        },
      },
      {
        title: {
          fi: 'Pidä olennaiset työ- ja vahinkotiedot saatavilla',
          en: 'Keep essential work and loss details available',
        },
        text: {
          fi: 'Korvauskäsittelyssä tarvitaan tietoa tapahtumasta ja vahingon määrästä. Esimerkkitehtävän merkitseminen ei korvaa tarpeellisia asiakirjoja.',
          en: 'Claim handling requires information about the event and amount of loss. Ticking an example task does not replace necessary documents.',
        },
        status: 'illustrative',
        sourceIds: ['if-general-protection-and-claims'],
        limitation: {
          fi: 'Tarvittavat selvitykset riippuvat tapauksesta. Emme kerää asiakirjoja tai muuta nykyisen kunnossapitopalvelun tietojen käyttötarkoitusta.',
          en: 'Required evidence depends on the case. We do not collect documents or change the purpose of information from the existing maintenance service.',
        },
      },
      {
        title: {
          fi: 'Tarkista vahingon syy, turva ja rajoitukset',
          en: 'Check the cause, cover and limitations',
        },
        text: {
          fi: 'Kaikki vuotovahingot eivät kuulu samaan turvaan. Esimerkiksi vesieristeen läpi päässeeseen veteen liittyvät rajoitukset eivät poistu huoltotehtävillä.',
          en: 'Not all water damage falls under the same cover. For example, maintenance tasks do not remove limitations on water passing through waterproofing.',
        },
        status: 'verified',
        sourceIds: ['if-oma-200-27-scope', 'if-olr-260-7-wet-room'],
        limitation: {
          fi: 'Mahdollinen laajennus ja oma vakuutuskirja ratkaisevat. Putkiston vuotovähennyksen prosentti ei ole hyväksymisprosentti.',
          en: 'Any extension and your own policy schedule determine cover. The leakage deduction percentage is not a claim acceptance percentage.',
        },
      },
    ],
  },
  business: {
    status: 'illustrative',
    label: {
      fi: 'Liiketoimintahypoteesi',
      en: 'Business hypothesis',
    },
    sourceIds: ['if-water-prevention', 'if-oma-200-27-leak'],
    text: {
      fi: 'Ehdotettu hinnoitteluetu voisi kannustaa ehkäisytekoihin. Pilotissa tutkittaisiin, riittäisikö vahinkokulujen mahdollinen väheneminen rahoittamaan edut ja todentamisen. Selkeä vähennysesimerkki voisi helpottaa vakuutuksen ymmärtämistä.',
      en: 'A proposed pricing benefit could encourage preventive steps. A pilot would investigate whether possible claims savings could fund benefits and verification. A clear deduction example could improve understanding of insurance.',
    },
    proposedMetrics: [
      {
        fi: 'Ehkäisytehtävien valmistumisaste',
        en: 'Preventive task completion rate',
      },
      {
        fi: 'Ilmoitettujen toimien todennettavuus',
        en: 'Verification completion and cost in a pilot',
      },
      {
        fi: 'Hinnan ja vähennyksen ymmärtäminen käyttäjätestissä',
        en: 'Understanding price and deductions in user testing',
      },
      {
        fi: 'Vahinkokulut suhteessa etuihin ja todentamiskuluihin',
        en: 'Claims costs relative to benefits and verification costs',
      },
    ],
    limitation: {
      fi: 'Pilotin hypoteeseja. Hinnoittelumallia, vahinkosäästöä, kannattavuutta tai asiakaspysyvyyden kasvua ei ole vahvistettu. Demon hinnat eivät kuvaa nykyistä If-tuotetta.',
      en: 'Pilot hypotheses. The pricing model, claims savings, profitability and increased retention have not been verified. Demo prices do not represent a current If product.',
    },
  },
  audiences: {
    visitor: {
      caseIntro: {
        fi: 'Muutatko uuteen kotiin? Selvitä tärkeät huoltotiedot ja kokoa kysymykset ennen vakuutuksen valintaa.',
        en: 'Moving into a new home? Gather maintenance details and questions before choosing cover.',
      },
      contextTitle: {
        fi: 'Ensimmäinen teko ennen vakuutuksen valintaa',
        en: 'Your first step before choosing cover',
      },
      tasksTitle: {
        fi: 'Valmistaudu uuteen kotiin',
        en: 'Prepare for your new home',
      },
      priceTitle: {
        fi: 'Tutustu ehkäisyedun ideaan',
        en: 'Explore a prevention benefit',
      },
      priceIntro: {
        fi: 'Kokeile, miten pienet ehkäisyteot voisivat vaikuttaa tulevaan hintaan. Tämä on kuvitteellinen hinnoitteluesimerkki, ei tarjous.',
        en: 'Explore how small preventive steps could shape a future price. This is a fictional pricing concept, not a quote.',
      },
      packetContext: {
        fi: 'Uuden asiakkaan esimerkki: vakuutusta tai palveluoikeutta ei oleteta.',
        en: 'New customer example: no policy or service entitlement is assumed.',
      },
    },
    customer: {
      caseIntro: {
        fi: 'Kotivakuutus on valittu esimerkkiin. Tarkista kotisi tiedot, jatka huoltotehtäviä ja valmistele nykyiseen sopimukseen liittyvät kysymykset.',
        en: 'Home insurance is selected in this example. Review your home details, continue maintenance tasks and prepare questions about the selected contract.',
      },
      contextTitle: {
        fi: 'Seuraava teko oman kotisi ylläpitoon',
        en: 'Your next home maintenance step',
      },
      tasksTitle: {
        fi: 'Oman kotisi huoltotehtävät',
        en: 'Your home maintenance tasks',
      },
      priceTitle: {
        fi: 'Oman kokonaisuutesi ehkäisyetu · esimerkki',
        en: 'Your example prevention benefit',
      },
      priceIntro: {
        fi: 'Näe, miten valittu vakuutuskokonaisuus ja omat demomerkinnät muuttavat esimerkkihintaa. Oikea vakuutusmaksusi ei muutu.',
        en: 'See how your selected setup and reported demo actions change the example price. Your real premium is not changed.',
      },
      packetContext: {
        fi: 'Nykyisen asiakkaan esimerkki: valitun kotivakuutuksen sopimustiedot ovat tarkistamatta.',
        en: 'Existing customer example: details of the selected home contract remain unverified.',
      },
    },
  },
};
