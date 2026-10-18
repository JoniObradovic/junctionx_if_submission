export default {
  schemaVersion: 1,
  title: {
    fi: 'Lemmikin vointi',
    en: 'Pet wellbeing',
  },
  presentation: {
    contextTitle: {
      fi: 'Kerro esimerkkihavainnot',
      en: 'Example observations',
    },
    tasksTitle: {
      fi: 'Vapaaehtoiset esitietojen valmistelut',
      en: 'Optional background preparation',
    },
    progressTitle: {
      fi: 'Tietojen kokoamisen merkinnät',
      en: 'Information gathering progress',
    },
    progressNotice: {
      fi: 'Tietojen täydentäminen ei saa viivästyttää yhteydenottoa. Merkinnät eivät ole tutkimustuloksia, paranemisarvio tai alennuksen peruste.',
      en: 'Adding details must not delay contact. Ticks are not examination results, a recovery assessment or grounds for a discount.',
    },
    observationsTitle: {
      fi: 'Jo tiedossa olevat havainnot',
      en: 'Observations already known',
    },
    serviceEligibilityLabel: {
      fi: 'Esimerkin palveluoikeus: ei vahvistettu',
      en: 'Example service eligibility: not verified',
    },
    serviceHoursTemplate: {
      fi: 'Chat ja video arkisin {weekday}, viikonloppuisin {weekend}. Muulloin: {otherTimes}.',
      en: 'Chat and video: weekdays {weekday}, weekends {weekend}. At other times: {otherTimes}.',
    },
    packetLabel: {
      fi: 'Paikallinen esitietoluonnos · voit valita ja kopioida tekstin',
      en: 'Local information draft · you can select and copy the text',
    },
    durationLabel: {
      fi: 'Oireiden kesto',
      en: 'Symptom duration',
    },
    symptomsLabel: {
      fi: 'Valitut oirehavainnot',
      en: 'Selected symptom observations',
    },
    emergencyLabel: {
      fi: 'Valitut vaaranmerkit',
      en: 'Selected warning signs',
    },
    routeLabel: {
      fi: 'Ohjaus tässä esimerkissä',
      en: 'Guidance in this example',
    },
    notSent: {
      fi: 'Kuvitteellinen luonnos. Mitään ei lähetetty eikä yhteyttä avattu.',
      en: 'Fictional draft. Nothing was sent and no connection was opened.',
    },
    guidancePrompt: {
      fi: 'Älä odota esitietojen valmistumista tai etäpalvelua.',
      en: 'Do not wait for the information draft or a remote consultation.',
    },
    showGuidanceLabel: {
      fi: 'Näytä toimintaohje',
      en: 'Show guidance',
    },
    insuredContactTitle: {
      fi: 'If Eläinapu · eläinlääkärin apua 24/7',
      en: 'If Eläinapu · veterinary help 24/7',
    },
    insuredUrgentTitle: {
      fi: 'Ota yhteys nyt · If Eläinapu 24/7',
      en: 'Contact a vet now · If Eläinapu 24/7',
    },
    channelDetailsLabel: {
      fi: 'Kanavat, lähteet ja palvelun rajat',
      en: 'Channels, sources and service limitations',
    },
  },
  persona: {
    fi: 'Hilla – Kultainennoutaja, 4 v, 28 kg',
    en: 'Hilla – Golden retriever, 4 years old, 28 kg',
  },
  referenceYear: 2026,
  demoNotice: {
    fi: 'Kuvitteellinen koira ja havainnot. Älä syötä oikeita terveystietoja. Demo ei tutki eläintä tai määritä diagnoosia.',
    en: 'Fictional dog and observations. Do not enter real health information. The demo does not examine the animal or make a diagnosis.',
  },
  animal: {
    name: 'Hilla',
    species: 'dog',
    breed: {
      fi: 'Kultainennoutaja',
      en: 'Golden retriever',
    },
    ageYears: 4,
    weightKg: 28,
  },
  defaults: {
    symptomIds: ['vomiting-diarrhea', 'lethargy'],
    emergencySignIds: [],
    duration: '6-24h',
    observations: {
      breathing: 'unknown',
      waterRetention: 'unknown',
    },
    completedTaskIds: [],
  },
  controls: [
    {
      id: 'symptomIds',
      type: 'multiChoice',
      label: {
        fi: 'Esimerkkioireet',
        en: 'Example symptoms',
      },
      help: {
        fi: 'Valinnat kuvaavat havaintoja, eivät diagnoosia. Valitsematon oire ei tarkoita, että se on varmasti poissuljettu.',
        en: 'Selections describe observations, not a diagnosis. An unselected symptom has not necessarily been ruled out.',
      },
    },
    {
      id: 'emergencySignIds',
      type: 'multiChoice',
      label: {
        fi: 'Kiireelliset vaaranmerkit',
        en: 'Emergency warning signs',
      },
      help: {
        fi: 'Kiireellinen oire ohittaa etäpalvelun. Luettelo ei kata kaikkia hätätilanteita.',
        en: 'An emergency symptom takes priority over remote help. This list does not cover every emergency.',
      },
    },
    {
      id: 'duration',
      type: 'choice',
      label: {
        fi: 'Oireiden kesto',
        en: 'Symptom duration',
      },
      options: [
        {
          value: 'under-6h',
          label: {
            fi: 'Alle 6 tuntia',
            en: 'Under 6 hours',
          },
        },
        {
          value: '6-24h',
          label: {
            fi: '6–24 tuntia',
            en: '6–24 hours',
          },
        },
        {
          value: 'over-24h',
          label: {
            fi: 'Yli 24 tuntia',
            en: 'Over 24 hours',
          },
        },
      ],
      help: {
        fi: 'Lyhyt kesto ei sulje pois kiireellistä tilannetta. Älä odota seuraavan aikarajan täyttymistä, jos vointi huononee.',
        en: 'A short duration does not rule out an urgent situation. Do not wait for the next time threshold if the animal gets worse.',
      },
    },
  ],
  sources: [
    {
      id: 'pet-hy-emergency',
      publisher: 'Helsingin yliopisto, Yliopistollinen eläinsairaala',
      title: 'Mitä on päivystyshoito',
      url: 'https://www.helsinki.fi/fi/yliopistollinen-elainsairaala/paivystys/mita-paivystyshoito',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'Verkkosivu, ei julkaistua versionumeroa',
      locator:
        'Päivystyksen määritelmä; tyypilliset sairaudet ja omistajan havaitsemat oireet; Saapuminen päivystykseen',
      limitation: {
        fi: 'Yleisiä kiireellisiä vaaranmerkkejä, ei tyhjentävä lista tai etädiagnoosi. Valitse oman alueen päivystys; lähde kuvaa myös Yliopistollisen eläinsairaalan alueellista palvelua.',
        en: "General urgent warning signs, not an exhaustive list or remote diagnosis. Use your local emergency vet; the source also describes the University Veterinary Hospital's regional service.",
      },
    },
    {
      id: 'pet-evidensia-gi',
      publisher: 'Evidensia Eläinlääkäriasemat',
      title: 'Oksentelu, ripulointi ja mahakipu voivat kertoa tulehduksesta',
      url: 'https://evidensia.fi/hoitovinkit/koiran-mahasuolikanavan-tulehdukset/',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'Päivitetty 4.10.2024',
      locator:
        'Oireet ruansulatuskanavan tulehdustilassa; Akuutin gastroenteriitin hoito',
      limitation: {
        fi: 'Koirien oireita ja eläinlääkäriin hakeutumisen syitä; oireilla voi olla useita syitä. Oksennetun veden ja heikon yleisvoinnin merkitystä ei muuteta kotihoidon sallivaksi diagnoosiksi.',
        en: 'Canine symptoms and reasons to seek veterinary care; symptoms may have several causes. Vomiting water and poor overall condition are not converted into a diagnosis permitting home care.',
      },
    },
    {
      id: 'pet-clinic-gdv',
      publisher: 'Koirakissaklinikka',
      title: 'Mahalaukun laajentuma ja kiertymä',
      url: 'https://koirakissaklinikka.fi/koira-artikkelit/mahalaukun-laajentuma-ja-kiertyma',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'Verkkosivu, ei julkaistua versionumeroa',
      locator: 'Johdanto ja oirekuvaus ennen hoito-osiota',
      limitation: {
        fi: 'Vatsan turpoaminen ja oksennusyritykset voivat liittyä välitöntä hoitoa vaativaan tilaan. Demo ei diagnosoi kiertymää eikä ohjeista mahalaukun tyhjentämistä tai lääkehoitoa.',
        en: 'A swollen abdomen and attempts to vomit can indicate a condition needing immediate care. The demo does not diagnose gastric torsion or give instructions for emptying the stomach or medication.',
      },
    },
    {
      id: 'pet-pyynikki-history',
      publisher: 'Pyynikin eläinlääkärit',
      title:
        'Koiralla vatsakipuja? Näin tunnistat vaaran merkit ja toimi oikein',
      url: 'https://pyynikinelainlaakarit.fi/ajankohtaista/koiralla-vatsakipuja-nain-tunnistat-vaaran-merkit-ja-toimi-oikein/',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'Verkkosivu, ei vahvistettua julkaisupäivää',
      locator:
        'Milloin ottaa yhteyttä eläinlääkäriin?; luettelo yhteydenotossa kerrottavista tiedoista',
      limitation: {
        fi: 'Tukee esitietojen keräämistä ja yhteydenottoa huonossa yleisvoinnissa. Demon tehtävät eivät ota käyttöön artikkelin paasto-, ruokinta- tai lääkeohjeita eivätkä korvaa tutkimusta.',
        en: "Supports gathering background information and contacting a vet when overall condition is poor. Demo tasks do not adopt the article's fasting, feeding or medication advice and do not replace an examination.",
      },
    },
    {
      id: 'pet-if-service',
      publisher: 'If',
      title: 'Eläinapu – etäeläinlääkärin chat ja päivystys apunasi 24/7',
      url: 'https://www.if.fi/henkiloasiakkaat/vakuutukset/elainvakuutukset/elainapu',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'Palvelusivu, tarkistettu 17.10.2026',
      locator:
        'Mitä eläinavusta saa?; Näin käytät eläinapua; Lisätietoa eläinavusta; asiakasetua koskeva loppuhuomautus',
      limitation: {
        fi: 'Ifin koira-, kissa- tai hevosvakuutuksen asiakasetu, jonka sisältö voi muuttua. Ei osa vakuutussopimusta. Demo ei tarkista oikeutta palveluun, kirjaudu tai yhdistä vastaanotolle. Chat/video ja puhelinpäivystys ovat eri kanavia.',
        en: 'An If dog, cat or horse insurance customer benefit that can change. Not part of the insurance contract. The demo does not check eligibility, log in or connect to a consultation. Chat/video and telephone assistance are separate channels.',
      },
    },
    {
      id: 'pet-if-terms',
      publisher: 'If',
      title: 'Eläinvakuutusehdot',
      url: 'https://www.if.fi/globalassets/fi/pdf/ehdot/elainvakuutusehdot.pdf',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'EVA 240.10',
      effectiveFrom: '2026-01-01',
      locator: 's. 1 vakuutussopimuksen sisältö; s. 3, 6.4 ja 9',
      limitation: {
        fi: 'Klinikkahoidon omavastuu ja korvattavuus riippuvat sopimuksesta. Asiakasetuun kuuluva maksuton etäpalvelu ei tarkoita maksutonta jatkohoitoa tai vaikutuksettomuutta kaikkiin vakuutustietoihin.',
        en: 'Clinic treatment deductibles and cover depend on the contract. Free remote help as a customer benefit does not mean free follow-up treatment or no effect on any insurance details.',
      },
    },
  ],
  symptoms: [
    {
      id: 'vomiting-diarrhea',
      label: {
        fi: 'Äkillinen oksentelu tai ripuli',
        en: 'Sudden vomiting or diarrhoea',
      },
      status: 'verified',
      sourceIds: ['pet-evidensia-gi'],
      limitation: {
        fi: 'Yhdistetty oirevalinta ei erottele määrää, syytä tai vakavuutta.',
        en: 'This combined selection does not distinguish amount, cause or severity.',
      },
    },
    {
      id: 'lethargy',
      label: {
        fi: 'Apaattisuus / vetämättömyys',
        en: 'Lethargy / listlessness',
      },
      status: 'verified',
      sourceIds: ['pet-evidensia-gi', 'pet-hy-emergency'],
      limitation: {
        fi: 'Yleisvointi on arvioitava kokonaisuutena. Valinta ei ole diagnoosi.',
        en: 'Overall condition needs assessment as a whole. This selection is not a diagnosis.',
      },
    },
    {
      id: 'limping-wound',
      label: {
        fi: 'Ontuminen tai tassuhaava',
        en: 'Limping or a paw wound',
      },
      status: 'illustrative',
      sourceIds: ['pet-if-service', 'pet-hy-emergency'],
      limitation: {
        fi: 'Oireotsikko palveluohjauksen esimerkkiin. Vakava vamma, kipu tai verenvuoto vaatii kiireellistä arviota.',
        en: 'A symptom label for the service guidance example. Serious injury, pain or bleeding needs urgent assessment.',
      },
    },
    {
      id: 'eye-ear',
      label: {
        fi: 'Silmä- tai korvaoire',
        en: 'Eye or ear symptoms',
      },
      status: 'illustrative',
      sourceIds: ['pet-if-service', 'pet-hy-emergency'],
      limitation: {
        fi: 'Ei osoita oiretta lieväksi. Silmävamma tai voimakas siristely voi vaatia päivystystä.',
        en: 'This does not establish that symptoms are mild. An eye injury or marked squinting may need emergency care.',
      },
    },
  ],
  emergencySigns: [
    {
      id: 'breathing-difficulty',
      label: {
        fi: 'Hengitys on vaikeaa',
        en: 'Difficulty breathing',
      },
      status: 'verified',
      sourceIds: ['pet-hy-emergency'],
      limitation: {
        fi: 'Älä odota esitietojen valmistumista tai etäyhteyttä.',
        en: 'Do not wait for the information draft or a remote connection.',
      },
    },
    {
      id: 'bloat-retching',
      label: {
        fi: 'Vatsa turpoaa tai koira yrittää oksentaa tuloksetta',
        en: 'Swollen abdomen or unsuccessful attempts to vomit',
      },
      status: 'verified',
      sourceIds: ['pet-hy-emergency', 'pet-clinic-gdv'],
      limitation: {
        fi: 'Välittömän tutkimuksen tarve; ei kiertymädiagnoosi.',
        en: 'Needs immediate examination; this is not a diagnosis of gastric torsion.',
      },
    },
    {
      id: 'collapse',
      label: {
        fi: 'Koira romahtaa tai ei pysy pystyssä',
        en: 'Collapse or inability to stand',
      },
      status: 'verified',
      sourceIds: ['pet-hy-emergency'],
      limitation: {
        fi: 'Kiireellinen vaaranmerkki riippumatta oireen kestosta.',
        en: 'An emergency warning sign regardless of symptom duration.',
      },
    },
    {
      id: 'poisoning',
      label: {
        fi: 'Epäily myrkyn tai vaarallisen aineen syömisestä',
        en: 'Suspected ingestion of poison or a dangerous substance',
      },
      status: 'verified',
      sourceIds: ['pet-hy-emergency'],
      limitation: {
        fi: 'Kysy heti päivystävältä eläinlääkäriltä toimintaohje. Älä kokeile demon perusteella kotihoitoa.',
        en: 'Ask an emergency vet for instructions immediately. Do not try home treatment based on this demo.',
      },
    },
  ],
  observations: [
    {
      id: 'breathing',
      label: {
        fi: 'Hengityshavainto (esimerkki)',
        en: 'Breathing observation (example)',
      },
      status: 'verified',
      sourceIds: ['pet-hy-emergency'],
      options: [
        {
          value: 'unknown',
          label: {
            fi: 'Ei tiedossa',
            en: 'Unknown',
          },
        },
        {
          value: 'unremarkable',
          label: {
            fi: 'Omistaja ei huomannut poikkeamaa',
            en: 'Owner noticed no abnormality',
          },
        },
        {
          value: 'difficult',
          label: {
            fi: 'Hengitys vaikuttaa vaikealta',
            en: 'Breathing appears difficult',
          },
        },
      ],
      limitation: {
        fi: 'Poikkeaman huomaamatta jääminen ei sulje pois sairautta tai kumoa muita vaaranmerkkejä. Tarkkailu ei saa viivästyttää avun hakemista.',
        en: 'Not noticing an abnormality does not rule out illness or override other warning signs. Observation must not delay seeking help.',
      },
    },
    {
      id: 'waterRetention',
      label: {
        fi: 'Pysyykö juotu vesi sisällä? (esimerkki)',
        en: 'Does the dog keep water down? (example)',
      },
      status: 'verified',
      sourceIds: ['pet-evidensia-gi'],
      options: [
        {
          value: 'unknown',
          label: {
            fi: 'Ei tiedossa',
            en: 'Unknown',
          },
        },
        {
          value: 'retained',
          label: {
            fi: 'Omistajan mukaan on pysynyt',
            en: 'Owner reports water stayed down',
          },
        },
        {
          value: 'vomited',
          label: {
            fi: 'Koira oksentaa myös juomansa veden',
            en: 'The dog also vomits the water it drinks',
          },
        },
      ],
      limitation: {
        fi: 'Kirjaa vain jo havaittu asia. Tämä ei ohjaa juottamaan koiraa kokeeksi tai sulje pois kuivumista. Vedenkin oksentaminen vaatii kiireellistä arviota.',
        en: 'Record only something already observed. This does not instruct you to give water as a test or rule out dehydration. Vomiting water also needs urgent assessment.',
      },
    },
  ],
  rules: {
    routing: {
      status: 'illustrative',
      sourceIds: ['pet-hy-emergency', 'pet-evidensia-gi', 'pet-clinic-gdv'],
      precedence: ['emergency', 'urgent', 'contact'],
      emergency: {
        anyEmergencySign: true,
        anyObservationEquals: [
          {
            id: 'breathing',
            value: 'difficult',
          },
          {
            id: 'waterRetention',
            value: 'vomited',
          },
        ],
      },
      urgent: {
        anySymptomIds: ['lethargy'],
        allSymptomIdsWithDuration: {
          symptomIds: ['vomiting-diarrhea'],
          duration: 'over-24h',
        },
      },
      fallbackRoute: 'contact',
      unknownInputRoute: 'contact',
      primaryActionByRoute: {
        emergency: 'emergency-help',
        urgent: 'urgent-help',
        contact: 'vet-contact-help',
      },
      homeCareClearanceAllowed: false,
      completionCanLowerUrgency: false,
      limitation: {
        fi: 'Varovainen käyttöliittymän ohjaus, ei validoitu hoidon tarpeen arvio tai diagnoosikone. Oireiden poistaminen valinnoista ei tarkoita paranemista. Kesto tai tehtävälista ei voi kumota vaaranmerkkiä.',
        en: 'Cautious interface guidance, not validated triage or a diagnostic engine. Removing selected symptoms does not mean recovery. Duration or a checklist cannot override a warning sign.',
      },
      insuredActionByRoute: {
        contact: 'insured-help',
        urgent: 'insured-help',
        emergency: 'emergency-help',
      },
    },
    observations: {
      status: 'illustrative',
      sourceIds: ['pet-hy-emergency', 'pet-pyynikki-history'],
      mandatoryBeforeContact: false,
      normalTemperatureRangeC: null,
      unknownResultLabel: {
        fi: 'Ei tiedossa',
        en: 'Unknown',
      },
      taskCompletionImpliesNormalFindings: false,
      limitation: {
        fi: 'Tietojen kokoaminen on vapaaehtoista eikä saa viivästyttää hoitoa. Lämpöä, limakalvojen normaaliutta tai nestetasapainoa ei päätellä tehtävän kuittauksesta.',
        en: 'Gathering information is optional and must not delay care. A task tick does not establish temperature, normal mucous membranes or hydration.',
      },
    },
  },
  insights: {
    emergency: {
      title: {
        fi: 'Hakeudu viipymättä eläinlääkäripäivystykseen',
        en: 'Seek emergency veterinary care immediately',
      },
      status: 'verified',
      sourceIds: ['pet-hy-emergency', 'pet-clinic-gdv', 'pet-evidensia-gi'],
      text: {
        fi: 'Ota heti yhteys oman alueesi päivystävään eläinlääkäriin ja hakeudu hoitoon ohjeen mukaan. Älä odota etävastaanottoa tai tietopaketin valmistumista.',
        en: 'Contact your local emergency vet immediately and seek care as instructed. Do not wait for a remote appointment or a completed information draft.',
      },
      limitation: {
        fi: 'Demo ei selvitä sijaintia, klinikan aukioloa tai vastaanottokykyä. Vakavassa tilanteessa tietojen täydentäminen ei ole edellytys avulle.',
        en: 'The demo does not find your location or check clinic hours or capacity. Completing information is not a prerequisite for help in a serious situation.',
      },
    },
    urgent: {
      title: {
        fi: 'Ota yhteys eläinlääkäriin nyt',
        en: 'Contact a vet now',
      },
      status: 'illustrative',
      sourceIds: [
        'pet-hy-emergency',
        'pet-evidensia-gi',
        'pet-pyynikki-history',
      ],
      text: {
        fi: 'Vetämättömyys tai pitkittynyt vatsaoire tarvitsee eläinlääkärin arviota. Soita eläinlääkärille; päivystysaikana oman alueesi päivystykseen. Älä jää odottamaan seuraavaa kestorajaa tai etächatin avautumista.',
        en: "Lethargy or prolonged stomach symptoms need a vet's assessment. Call a vet; outside normal hours, call your local emergency service. Do not wait for another duration threshold or for chat to open.",
      },
      limitation: {
        fi: 'Esimerkin varovainen palveluohjaus ei ole tutkimus. Jos ilmenee hätämerkki tai vointi romahtaa, noudata kiireellistä päivystysohjetta.',
        en: "The example's cautious service guidance is not an examination. If an emergency sign appears or the animal collapses, follow the emergency instructions.",
      },
    },
    contact: {
      title: {
        fi: 'Kysy eläinlääkäriltä hoidon tarpeesta',
        en: 'Ask a vet about the need for care',
      },
      status: 'illustrative',
      sourceIds: ['pet-if-service', 'pet-hy-emergency'],
      text: {
        fi: 'Jos lemmikin vointi huolestuttaa, ota yhteys eläinlääkäriin. Sopivassa tilanteessa If Eläinapu voi auttaa palveluun oikeutettua asiakasta.',
        en: 'If you are concerned about your pet, contact a vet. In a suitable situation, If Eläinapu may help an eligible customer.',
      },
      limitation: {
        fi: 'Hätämerkin puuttuminen valinnoista ei tarkoita turvallista kotihoitoa. Kiireellinen oire kuuluu päivystykseen eikä etäpalvelun jonoon.',
        en: 'Not selecting an emergency sign does not mean home care is safe. An emergency symptom needs emergency care, not a remote-service queue.',
      },
    },
    alwaysVisibleBoundary: {
      title: {
        fi: 'Kiireelliset oireet ohittavat etäpalvelun',
        en: 'Emergency symptoms take priority over remote help',
      },
      status: 'verified',
      sourceIds: ['pet-hy-emergency', 'pet-clinic-gdv'],
      alwaysVisible: true,
      text: {
        fi: 'Hengitysvaikeus, romahtaminen, vatsan turpoaminen, tuloksettomat oksennusyritykset tai myrkytysepäily vaativat välitöntä eläinlääkärin arviota. Myös voimakas kipu, verenvuoto, verinen oksennus tai ripuli sekä silmävamma voivat vaatia päivystystä.',
        en: 'Difficulty breathing, collapse, a swollen abdomen, unsuccessful attempts to vomit or suspected poisoning need immediate veterinary assessment. Severe pain, bleeding, bloody vomit or diarrhoea and an eye injury may also need emergency care.',
      },
      limitation: {
        fi: 'Esimerkkejä, ei täydellinen luettelo. Ota yhteyttä myös epävarmassa tilanteessa. Oireiden kesto, valintaruudut tai aiempi rauhallinen havainto eivät poissulje hätää.',
        en: 'Examples, not a complete list. Contact a vet if uncertain too. Duration, ticks or a previously calm observation cannot rule out an emergency.',
      },
    },
  },
  tasks: [
    {
      id: 'notice-urgency',
      title: {
        fi: 'Huomioi hengitys ja yleisvoinnin muutokset',
        en: 'Notice breathing and changes in overall condition',
      },
      why: {
        fi: 'Kerro havaitsemistasi muutoksista eläinlääkärille heti yhteyttä ottaessasi.',
        en: 'Tell the vet about changes you have noticed as soon as you contact them.',
      },
      priority: 'critical',
      status: 'illustrative',
      sourceIds: ['pet-hy-emergency'],
      limitation: {
        fi: 'Ei pakollinen tutkimus tai testi ennen yhteydenottoa. Kuittaus ei vahvista normaalia hengitystä tai yleisvointia.',
        en: 'Not a mandatory examination or test before making contact. A tick does not establish normal breathing or overall condition.',
      },
    },
    {
      id: 'symptom-timeline',
      title: {
        fi: 'Kokoa oireiden alku ja muutokset',
        en: 'Gather the onset and changes in symptoms',
      },
      why: {
        fi: 'Esitiedoissa auttaa tieto oireiden alkamisesta, etenemisestä ja muista havaituista oireista.',
        en: 'Knowing when symptoms began, how they progressed and any other observed symptoms can help the vet.',
      },
      priority: 'high',
      status: 'verified',
      sourceIds: ['pet-pyynikki-history'],
      limitation: {
        fi: 'Kirjaa vain tiedossa oleva. Epätarkat tai puuttuvat ajat eivät saa viivästyttää yhteydenottoa.',
        en: 'Record only what is known. Inaccurate or missing times must not delay contact.',
      },
    },
    {
      id: 'water-observation',
      title: {
        fi: 'Kirjaa tiedossa oleva juomishavainto',
        en: 'Record an existing observation about drinking',
      },
      why: {
        fi: 'Kerro, mitä juomisesta ja mahdollisesta veden oksentamisesta jo tiedetään.',
        en: 'Tell the vet what is already known about drinking and any vomiting of water.',
      },
      priority: 'high',
      status: 'illustrative',
      sourceIds: ['pet-evidensia-gi', 'pet-pyynikki-history'],
      limitation: {
        fi: 'Älä juota kokeeksi tätä listaa varten. Kuittaus ei ole nestetasapainon arvio tai oirevalinnan vastaus.',
        en: 'Do not give water as a test for this checklist. A tick is not a hydration assessment or an answer to the symptom selection.',
      },
    },
    {
      id: 'background',
      title: {
        fi: 'Kokoa tiedossa olevat lääkitykset ja mahdolliset altistukset',
        en: 'Gather known medication and possible exposures',
      },
      why: {
        fi: 'Eläinlääkäri voi tarvita tiedot sairauksista, lääkkeistä ja mahdollisesta sopimattoman aineen syömisestä.',
        en: 'The vet may need information on illnesses, medicines and possible ingestion of something unsuitable.',
      },
      priority: 'high',
      status: 'verified',
      sourceIds: ['pet-pyynikki-history'],
      limitation: {
        fi: 'Demossa tiedot pysyvät tuntemattomina, eikä vapaata terveystietokenttää ole. Myrkytysepäilyssä ota heti yhteys päivystävään eläinlääkäriin.',
        en: 'In this demo, these details remain unknown and there is no free-text health field. Suspected poisoning needs immediate contact with an emergency vet.',
      },
    },
  ],
  service: {
    title: {
      fi: 'If Eläinapu · apua 24/7',
      en: 'If Eläinapu · help 24/7',
    },
    status: 'verified',
    sourceIds: ['pet-if-service', 'pet-if-terms'],
    access: {
      included: {
        fi: 'Esimerkin koiravakuutukseen kuuluva asiakasetu',
        en: 'Benefit included in the example dog insurance',
      },
      unknown: {
        fi: 'Palveluoikeutta ei tiedetä tässä tutustujanäkymässä',
        en: 'Service eligibility is unknown in this visitor view',
      },
      notIncluded: {
        fi: 'Esimerkin vakuutuksissa ei ole eläinvakuutusta',
        en: 'No pet insurance in the example policies',
      },
      includedText: {
        fi: 'Ifin koira-, kissa- tai hevosvakuutuksen asiakkaana saat eläinlääkärin apua ympäri vuorokauden. Esimerkin Hilla on koiravakuutettu. Avaa oikea If Eläinapu -sovellus; löydät päivystysnumeron sovelluksesta, kun chat on suljettu.',
        en: 'If dog, cat or horse insurance customers can get veterinary help around the clock. In this example, Hilla has dog insurance. Open the real If Eläinapu app; when chat is closed, the emergency phone number is available in the app.',
      },
      unknownText: {
        fi: 'Ifin eläinvakuutusasiakkaat saavat If Eläinavusta apua 24/7. Tutustujalle ei oleteta vakuutusta tai palveluoikeutta. Hoidon tarpeessa ota yhteys eläinlääkäriin oman tilanteesi mukaan.',
        en: "If pet insurance customers can get help from If Eläinapu 24/7. No insurance or eligibility is assumed for a visitor. Contact a vet according to your pet's needs.",
      },
      notIncludedText: {
        fi: 'Pelkkä Ifin asiakkuus tai kotivakuutus ei vahvista oikeutta If Eläinapuun. Etua varten tarvitaan soveltuva Ifin koira-, kissa- tai hevosvakuutus. Älä odota vakuutuksen hankintaa, jos eläin tarvitsee hoitoa.',
        en: 'Being an If customer or having home insurance alone does not establish eligibility for If Eläinapu. The benefit requires applicable If dog, cat or horse insurance. Do not wait to buy insurance if the animal needs care.',
      },
      demoNotice: {
        fi: 'Kuvitteellinen vakuutuskokonaisuus. Oikeus ja saatavuus tarkistetaan oikeassa palvelussa; demo ei avaa sovellusta tai puhelua.',
        en: 'Fictional policies. Eligibility and availability must be checked in the real service; the demo does not open the app or a phone call.',
      },
      urgentNotice: {
        fi: 'Kiireellinen tilanne: ota yhteys eläinlääkäriin nyt. Älä odota chatin avautumista tai tämän luonnoksen valmistumista.',
        en: 'Urgent situation: contact a vet now. Do not wait for chat to open or for this draft to be complete.',
      },
      emergencyNotice: {
        fi: 'Hätätilanne: hakeudu viipymättä eläinlääkäripäivystykseen. Etäpalvelun odottaminen ei saa viivästyttää hoitoa.',
        en: 'Emergency: seek emergency veterinary care immediately. Waiting for remote help must not delay care.',
      },
      detailsLabel: {
        fi: 'Palvelun kanavat, käyttö ja rajat',
        en: 'Service channels, use and limitations',
      },
      actionLabel: {
        fi: 'Näytä 24/7-yhteysohje – demo',
        en: 'Show 24/7 contact instructions – demo',
      },
      actionTitle: {
        fi: 'Näin löydät If Eläinavun yhteyden',
        en: 'How to find If Eläinapu contact details',
      },
      actionConfirmation: {
        fi: 'Yhteysohje vain. Sovellusta tai puhelua ei avattu, eikä mitään lähetetty.',
        en: 'Instructions only. No app or call was opened and nothing was sent.',
      },
      publicLabel: {
        fi: 'Tutustu eläinvakuutuksiin Ifin sivulla',
        en: "Explore pet insurance on If's website",
      },
    },
    eligibilityStatus: 'unknown',
    eligibleInsuranceTypes: ['dog', 'cat', 'horse'],
    unlimitedConsultations: true,
    annualVisitLimit: null,
    remoteServiceDeductibleEur: 0,
    customerBenefit: true,
    partOfInsuranceContract: false,
    availability: {
      overall: '24/7',
      weekdayChatVideo: {
        fi: '8–20',
        en: '08:00–20:00',
      },
      weekendChatVideo: {
        fi: '9–16',
        en: '09:00–16:00',
      },
      otherTimes: {
        fi: 'Puhelinpäivystys',
        en: 'Telephone assistance',
      },
    },
    text: {
      fi: 'Ifin julkaisema asiakasetu antaa palveluun oikeutetulle asiakkaalle rajattoman etäeläinlääkäriavun ilman omavastuuta. Chat ja video toimivat ilmoitettuina aikoina, muulloin apua saa puhelimitse.',
      en: "If's published customer benefit provides eligible customers with unlimited remote veterinary help without a deductible. Chat and video operate during the stated hours; telephone help is available at other times.",
    },
    limitation: {
      fi: 'Asiakasnäkymän vakuutukset ovat kuvitteellisia ja tutustujan oikeus on tuntematon. Ajantasainen oikeus, kanava ja saatavuus tarkistetaan oikeassa palvelussa. Klinikkahoidon kulut arvioidaan erikseen; ei yleistä lupausta omavastuun tai vakuutuksen muuttumattomuudesta.',
      en: 'Customer-view policies are fictional and visitor eligibility is unknown. Current eligibility, channel and availability must be checked in the real service. Clinic treatment costs are assessed separately; no general promise about an unchanged deductible or policy is made.',
    },
  },
  packet: {
    title: {
      fi: 'Esitietoluonnos eläinlääkärille – demo',
      en: 'Information draft for a vet – demo',
    },
    status: 'illustrative',
    sourceIds: ['pet-pyynikki-history', 'pet-if-service'],
    includeFields: [
      'animal',
      'symptoms',
      'emergencySigns',
      'duration',
      'observations',
      'route',
      'completedTasks',
    ],
    emptySymptomsLabel: {
      fi: 'Oireita ei valittu; tämä ei tarkoita oireettomuutta',
      en: 'No symptoms selected; this does not mean symptom-free',
    },
    unselectedEmergencyLabel: {
      fi: 'Hätämerkkejä ei valittu; niitä ei ole suljettu pois',
      en: 'No emergency signs selected; they have not been ruled out',
    },
    unknownBackgroundLabel: {
      fi: 'Sairaudet, lääkitys ja altistukset: ei tiedossa',
      en: 'Illnesses, medication and exposures: unknown',
    },
    temperatureLabel: {
      fi: 'Lämpö: ei tiedossa (ei mitata tässä demossa)',
      en: 'Temperature: unknown (not measured in this demo)',
    },
    completedTasksLabel: {
      fi: 'Tiedon kokoamisen demomerkinnät – eivät tutkimustuloksia',
      en: 'Demo information-gathering ticks – not examination results',
    },
    limitation: {
      fi: 'Paikallinen kuvitteellinen yhteenveto, ei diagnoosi, potilaskertomus, tallennus ulkoiseen palveluun tai lähetetty viesti. Puuttuva havainto säilyy tuntemattomana.',
      en: 'Local fictional summary, not a diagnosis, medical record, external service entry or sent message. Missing observations remain unknown.',
    },
  },
  actions: [
    {
      id: 'emergency-help',
      label: {
        fi: 'Näytä päivystysohje',
        en: 'Show emergency instructions',
      },
      allowedRoutes: ['emergency'],
      title: {
        fi: 'Ota heti yhteys oman alueen eläinlääkäripäivystykseen',
        en: 'Contact your local emergency veterinary service immediately',
      },
      status: 'verified',
      sourceIds: ['pet-hy-emergency'],
      text: {
        fi: 'Hakeudu hoitoon viipymättä päivystyksen ohjeen mukaan. Älä odota etäkonsultaatiota tai esitietojen täydentymistä.',
        en: 'Seek care promptly as instructed by the emergency service. Do not wait for a remote consultation or completed background information.',
      },
      confirmation: {
        fi: 'Tämä on toimintaohje. Puhelua, varausta tai viestiä ei tehty.',
        en: 'Guidance only. No call, booking or message was made.',
      },
      limitation: {
        fi: 'Demo ei avaa yhteyttä tai valitse lähintä klinikkaa. Ohje on näkyvissä myös ennen painikkeen käyttöä.',
        en: 'The demo does not open a connection or choose the nearest clinic. Guidance is visible before using the button too.',
      },
    },
    {
      id: 'urgent-help',
      label: {
        fi: 'Näytä yhteydenotto-ohje',
        en: 'Show contact instructions',
      },
      allowedRoutes: ['urgent'],
      title: {
        fi: 'Soita eläinlääkärille nyt',
        en: 'Call a vet now',
      },
      status: 'illustrative',
      sourceIds: ['pet-hy-emergency', 'pet-pyynikki-history'],
      text: {
        fi: 'Kerro oireet ja yleisvoinnin muutos eläinlääkärille. Päivystysaikana ota yhteys oman alueesi päivystykseen.',
        en: 'Tell the vet about symptoms and changes in overall condition. Outside normal hours, contact your local emergency service.',
      },
      confirmation: {
        fi: 'Ohje on esimerkki. Puhelua, varausta tai viestiä ei tehty.',
        en: 'Example guidance. No call, booking or message was made.',
      },
      limitation: {
        fi: 'Tietopaketin valmistuminen ei ole yhteydenoton edellytys eikä etächatin odottaminen ole oletuspolku.',
        en: 'A completed information draft is not a prerequisite for contact, and waiting for remote chat is not the default route.',
      },
    },
    {
      id: 'vet-contact-help',
      label: {
        fi: 'Näytä eläinlääkärin yhteydenotto-ohje',
        en: 'Show veterinary contact instructions',
      },
      allowedRoutes: ['contact'],
      title: {
        fi: 'Ota yhteys eläinlääkäriin voinnin arvioimiseksi',
        en: "Contact a vet to assess your pet's condition",
      },
      text: {
        fi: 'Jos lemmikin vointi huolestuttaa, ota yhteys eläinlääkäriin. Sopivassa tilanteessa If Eläinapu voi auttaa palveluun oikeutettua asiakasta.',
        en: 'If you are concerned about your pet, contact a vet. In a suitable situation, If Eläinapu may help an eligible customer.',
      },
      status: 'illustrative',
      sourceIds: ['pet-if-service', 'pet-hy-emergency'],
      confirmation: {
        fi: 'Ohje vain. Puhelua, varausta tai viestiä ei tehty.',
        en: 'Instructions only. No call, booking or message was made.',
      },
      limitation: {
        fi: 'Hätämerkin puuttuminen valinnoista ei tarkoita turvallista kotihoitoa. Kiireellinen oire kuuluu päivystykseen eikä etäpalvelun jonoon.',
        en: 'Not selecting an emergency sign does not mean home care is safe. An emergency symptom needs emergency care, not a remote-service queue.',
      },
    },
    {
      id: 'insured-help',
      label: {
        fi: 'Näytä If Eläinavun 24/7-yhteysohje',
        en: 'Show If Eläinapu 24/7 contact instructions',
      },
      allowedRoutes: ['contact', 'urgent'],
      title: {
        fi: 'If Eläinapu – yhteysohje vakuutetulle esimerkkiasiakkaalle',
        en: 'If Eläinapu – instructions for the insured example customer',
      },
      text: {
        fi: 'Ifin koira-, kissa- tai hevosvakuutuksen asiakkaana saat eläinlääkärin apua ympäri vuorokauden. Esimerkin Hilla on koiravakuutettu. Avaa oikea If Eläinapu -sovellus; löydät päivystysnumeron sovelluksesta, kun chat on suljettu.',
        en: 'If dog, cat or horse insurance customers can get veterinary help around the clock. In this example, Hilla has dog insurance. Open the real If Eläinapu app; when chat is closed, the emergency phone number is available in the app.',
      },
      status: 'illustrative',
      sourceIds: ['pet-if-service'],
      confirmation: {
        fi: 'Yhteysohje vain. Sovellusta tai puhelua ei avattu, eikä mitään lähetetty.',
        en: 'Instructions only. No app or call was opened and nothing was sent.',
      },
      limitation: {
        fi: 'Kuvitteellinen palveluoikeus. Puhelinpäivystyksen numero löytyy oikeasta sovelluksesta. Älä odota chatin aukeamista tai tietojen kokoamista, jos eläin tarvitsee hoitoa.',
        en: 'Fictional service eligibility. The emergency phone number is in the real app. Do not wait for chat to open or to gather information if the animal needs care.',
      },
    },
    {
      id: 'intro-help',
      allowedRoutes: ['urgent', 'contact'],
      label: {
        fi: 'Tutustu maksuttomaan yhteydenottoon – konsepti',
        en: 'Preview complimentary contact – concept',
      },
      title: {
        fi: 'Yksi maksuton yhteydenotto · konsepti',
        en: 'One complimentary contact · concept',
      },
      text: {
        fi: 'Tuoteidea Ifin asiakkaalle, jonka esimerkkivakuutuksissa ei ole eläinvakuutusta: yksi maksuton yhteydenotto 24/7-eläinlääkäriapuun tutustumista varten.',
        en: 'A product idea for an If customer whose example policies do not include pet insurance: one complimentary contact with 24/7 veterinary help to try the service.',
      },
      confirmation: {
        fi: 'Vain tuoteidean esikatselu. Mitään ei lähetetty eikä yhteyttä avattu. Esikatselu ei käytä simuloitua kertaa.',
        en: 'Product idea preview only. Nothing was sent and no connection was opened. Previewing does not consume the simulated contact.',
      },
      status: 'illustrative',
      limitation: {
        fi: 'Ehdotus vakuutusyhtiölle, ei nykyinen If-etu tai vahvistettu palveluoikeus. Yksi simuloitu käyttökerta asiakasnäkymän muistissa; vakuutusvalinnan tai kielen vaihto ei palauta sitä. Mitään ei varata, avata tai lähetetä.',
        en: "Proposal for an insurer, not a current If benefit or verified entitlement. One simulated use held in the customer view's memory; changing policy setup or language does not reset it. Nothing is booked, opened or sent.",
      },
      sourceScope: {
        fi: 'Lähde vahvistaa olemassa olevan eläinvakuutusasiakkaan 24/7-palvelun. Se ei vahvista tätä ehdotettua maksutonta tutustumiskertaa.',
        en: 'The source confirms the existing 24/7 service for eligible pet insurance customers. It does not verify this proposed complimentary trial.',
      },
      sourceIds: ['pet-if-service'],
    },
  ],
  business: {
    status: 'illustrative',
    label: {
      fi: 'Liiketoimintahypoteesi',
      en: 'Business hypothesis',
    },
    sourceIds: ['pet-if-service', 'pet-pyynikki-history'],
    text: {
      fi: 'Selkeä esitietoluonnos voi helpottaa huolen sanoittamista ja palveluohjausta oikeaan kanavaan. Yksi ehdotettu maksuton tutustumiskerta voisi tehdä palvelun arvon näkyväksi myös ilman eläinvakuutusta. Pilotissa arvioitaisiin käyttöä, kustannuksia ja ymmärrettävyyttä.',
      en: 'A clear information draft could help people express their concern and reach the right service channel. One proposed complimentary contact could help customers without pet insurance discover the service’s value. A pilot would assess use, costs and understanding.',
    },
    proposedMetrics: [
      {
        fi: 'Esitietojen ymmärrettävyys käyttäjätestissä',
        en: 'Clarity of background information in user testing',
      },
      {
        fi: 'Kiireellisten vaaranmerkkien tunnistaminen',
        en: 'Understanding emergency guidance',
      },
      {
        fi: 'Palvelun ehtojen ymmärtäminen',
        en: 'Understanding service conditions',
      },
      {
        fi: 'Pilotin palvelukustannus ja kiinnostus eläinvakuutukseen',
        en: 'Pilot service cost and interest in pet insurance',
      },
    ],
    limitation: {
      fi: 'Ehdotettuja arviointimittareita. Hoidon tuloksia, säästöä tai asiakaspysyvyyttä ei ole mitattu. Päivystykseen hakeutumisen vähentäminen ei ole tämän demon tavoite.',
      en: 'Proposed evaluation measures. Care outcomes, savings and retention have not been measured. Reducing emergency care visits is not the aim of this demo.',
    },
  },
  introOffer: {
    status: 'illustrative',
    title: {
      fi: 'Yksi maksuton yhteydenotto · konsepti',
      en: 'One complimentary contact · concept',
    },
    text: {
      fi: 'Tuoteidea Ifin asiakkaalle, jonka esimerkkivakuutuksissa ei ole eläinvakuutusta: yksi maksuton yhteydenotto 24/7-eläinlääkäriapuun tutustumista varten.',
      en: 'A product idea for an If customer whose example policies do not include pet insurance: one complimentary contact with 24/7 veterinary help to try the service.',
    },
    limitation: {
      fi: 'Ehdotus vakuutusyhtiölle, ei nykyinen If-etu tai vahvistettu palveluoikeus. Yksi simuloitu käyttökerta asiakasnäkymän muistissa; vakuutusvalinnan tai kielen vaihto ei palauta sitä. Mitään ei varata, avata tai lähetetä.',
      en: "Proposal for an insurer, not a current If benefit or verified entitlement. One simulated use held in the customer view's memory; changing policy setup or language does not reset it. Nothing is booked, opened or sent.",
    },
    usedText: {
      fi: 'Esimerkin maksuton yhteydenotto on käytetty simulaatiossa. Mitään ei lähetetty eikä oikeaa yhteyttä avattu. Tarvittaessa ota yhteys eläinlääkäriin.',
      en: 'The example complimentary contact has been used in the simulation. Nothing was sent and no real connection was opened. Contact a vet if needed.',
    },
    confirmLabel: {
      fi: 'Simuloi yhden yhteydenoton käyttö',
      en: 'Simulate using one contact',
    },
    usedLabel: {
      fi: 'Simuloitu käyttökerta käytetty',
      en: 'Simulated contact used',
    },
    sourceIds: ['pet-if-service'],
    sourceScope: {
      fi: 'Lähde vahvistaa olemassa olevan eläinvakuutusasiakkaan 24/7-palvelun. Se ei vahvista tätä ehdotettua maksutonta tutustumiskertaa.',
      en: 'The source confirms the existing 24/7 service for eligible pet insurance customers. It does not verify this proposed complimentary trial.',
    },
    notice: {
      fi: 'Tuoteidea, ei nykyinen If-etu. Yksi simuloitu yhteydenotto; mitään ei lähetetä.',
      en: 'Product idea, not a current If benefit. One simulated contact; nothing is sent.',
    },
  },
  audiences: {
    visitor: {
      caseIntro: {
        fi: 'Huolestuttaako lemmikin vointi? Aloita toimintaohjeesta ja kokoa vain jo tiedossa olevat havainnot. Vakuutusta tai If Eläinavun palveluoikeutta ei oleteta.',
        en: 'Concerned about your pet? Start with the guidance and gather only observations you already have. No policy or If Eläinapu entitlement is assumed.',
      },
      contextTitle: {
        fi: 'Havaintosi eläinlääkärille',
        en: 'Your observations for a vet',
      },
      progressTitle: {
        fi: 'Valmistele yhteydenottoa',
        en: 'Prepare to contact a vet',
      },
      packetContext: {
        fi: 'Uuden asiakkaan esimerkki: If Eläinavun palveluoikeus on tuntematon.',
        en: 'New customer example: If Eläinapu eligibility is unknown.',
      },
    },
    customer: {
      caseIntro: {
        fi: 'Valitse esimerkkivakuutuksesi ja löydä niihin sopiva yhteysohje. Kiireellisyys ohjaa aina toimintaa ennen esitietojen kokoamista.',
        en: 'Select your example policies to find the relevant contact route. Urgency always takes priority over gathering background information.',
      },
      contextTitle: {
        fi: 'Lemmikkisi havainnot ja palveluvaihtoehdot',
        en: 'Your pet observations and service options',
      },
      progressTitle: {
        fi: 'Omat esitietomerkintäsi',
        en: 'Your information preparation',
      },
      packetContext: {
        fi: 'Nykyisen asiakkaan esimerkki: palveluvaihtoehto riippuu valituista vakuutuksista, ja hoidon tarve arvioidaan erikseen.',
        en: 'Existing customer example: service options depend on the selected policies; the need for care is assessed separately.',
      },
    },
  },
};
