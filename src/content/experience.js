export default {
  roles: {
    visitor: {
      fi: 'Uusi asiakas',
      en: 'New customer',
    },
    customer: {
      fi: 'Nykyinen asiakas',
      en: 'Existing customer',
    },
    staff: {
      fi: 'Ifin henkilöstö',
      en: 'If staff',
    },
  },
  roleLabel: {
    fi: 'Demon näkymä',
    en: 'Demo view',
  },
  visitor: {
    title: {
      fi: 'Tutustu turvaan ennen vakuutuksen valintaa',
      en: 'Explore cover before choosing a policy',
    },
    text: {
      fi: 'Valitse elämäntilanne ja kokeile tarkistuksia kuvitteellisilla tiedoilla. Näet, mitä vakuutuksista ja palveluista kannattaa kysyä ilman oletettua Ifin asiakkuutta.',
      en: 'Choose a life situation and try the checks with fictional details. Find out what to ask about policies and services without assumed If customer status.',
    },
    notice: {
      fi: 'Avoin verkkosivun esimerkki · ei kirjautumista tai tarjouspyyntöä',
      en: 'Public website example · no login or quote request',
    },
    eyebrow: {
      fi: 'Tutustu Ifiin oman elämäntilanteesi kautta',
      en: 'Explore If through your everyday life',
    },
    heroLine1: {
      fi: 'Uusi Ifillä?',
      en: 'New to If?',
    },
    heroLine2: {
      fi: 'Aloita arjestasi.',
      en: 'Start with your life.',
    },
    heroText: {
      fi: 'Tutustu pieniin turvatekoihin ja kokoa kysymykset ennen vakuutuksen valintaa.',
      en: 'Explore small preventive steps and prepare questions before choosing cover.',
    },
  },
  customer: {
    title: {
      fi: 'Nykyiset vakuutuksesi ja seuraavat pienet teot',
      en: 'Your selected policies and next small steps',
    },
    text: {
      fi: 'Kuvitteellinen asiakasnäkymä. Esimerkin vakuutukset auttavat nostamaan esiin sopivia palveluja ja tarkistuksia.',
      en: 'Fictional customer view. The example policies help highlight relevant services and checks.',
    },
    notice: {
      fi: 'Demoasiakkuus · vakuutustietoja ei haettu eikä palveluoikeutta tarkistettu',
      en: 'Demo customer · no policy details retrieved or service eligibility checked',
    },
    portfolioLabel: {
      fi: 'Esimerkin vakuutuskokonaisuus',
      en: 'Example insurance setup',
    },
    policiesLabel: {
      fi: 'Esimerkin vakuutukset',
      en: 'Example policies',
    },
    bundleNotice: {
      fi: 'Yhdistämisetu on tässä vain valitun esimerkkikokonaisuuden laskentaoletus. Todellinen etutaso ja kelpoisuus tarkistetaan erikseen.',
      en: 'The bundle benefit is only a calculation assumption for the selected example setup. Actual benefit level and eligibility must be checked separately.',
    },
    eyebrow: {
      fi: 'Oma vakuutuskokonaisuus, oma seuraava teko',
      en: 'Your insurance setup, your next useful step',
    },
    heroLine1: {
      fi: 'Turvasi arjessa.',
      en: 'Your cover, every day.',
    },
    heroLine2: {
      fi: 'Pieni teko tänään.',
      en: 'One useful step at a time.',
    },
    heroText: {
      fi: 'Löydä nykyisiin vakuutuksiisi sopivat palvelut, jatka valmisteluja ja tarkista sopimuksesi kysymykset.',
      en: 'Find services for your selected policies, continue your preparations and review questions about your contract.',
    },
  },
  portfolios: [
    {
      id: 'multi',
      label: {
        fi: 'Koti, koira ja matka',
        en: 'Home, dog and travel',
      },
      policies: [
        {
          type: 'home',
          label: {
            fi: 'Kotivakuutus',
            en: 'Home insurance',
          },
        },
        {
          type: 'dog',
          label: {
            fi: 'Koiravakuutus – Hilla',
            en: 'Dog insurance – Hilla',
          },
        },
        {
          type: 'travel',
          label: {
            fi: 'Matkavakuutus',
            en: 'Travel insurance',
          },
        },
      ],
      demoBundleDiscountBps: 1000,
      effect: {
        fi: 'Esimerkkihinnan yhdistämisetu 10 % · Eläinapu 24/7 · matkavakuutus mukana',
        en: 'Example bundle benefit 10% · Eläinapu 24/7 · includes travel insurance',
      },
    },
    {
      id: 'home',
      label: {
        fi: 'Vain kotivakuutus',
        en: 'Home insurance only',
      },
      policies: [
        {
          type: 'home',
          label: {
            fi: 'Kotivakuutus',
            en: 'Home insurance',
          },
        },
      ],
      demoBundleDiscountBps: 0,
      effect: {
        fi: 'Esimerkkihinnan yhdistämisetu 0 % · eläin- tai matkavakuutusta ei valittu',
        en: 'Example bundle benefit 0% · no pet or travel insurance selected',
      },
    },
    {
      id: 'family',
      label: {
        fi: 'Koti ja vauvavakuutus',
        en: 'Home and baby insurance',
      },
      policies: [
        {
          type: 'home',
          label: {
            fi: 'Kotivakuutus',
            en: 'Home insurance',
          },
        },
        {
          type: 'unborn-child',
          label: {
            fi: 'Vauvavakuutus – jo hankittu esimerkissä',
            en: 'Baby insurance – already purchased in this example',
          },
        },
      ],
      demoBundleDiscountBps: 1000,
      effect: {
        fi: 'Esimerkkihinnan yhdistämisetu 10 % · vauvan vakuutuksen tarkistus hankintaohjeen sijaan',
        en: 'Example bundle benefit 10% · review existing baby insurance instead of buying guidance',
      },
    },
  ],
  staff: {
    title: {
      fi: 'Asiakkuusanalytiikka',
      en: 'Customer analytics',
    },
    subtitle: {
      fi: 'Henkilöstön analyysinäkymä · vakuutuskanta, valmistelut ja esimerkkipalaute',
      en: 'Staff analysis view · policies, preparations and example feedback',
    },
    notice: {
      fi: 'Synteettinen demo. Kaikki asiakkuudet, vakuutukset, palaute ja tehtävämerkinnät ovat keksittyjä. Ei yhteyttä Ifin järjestelmiin.',
      en: 'Synthetic demo. All customers, policies, feedback and task records are invented. No connection to If systems.',
    },
    analyticsTitle: {
      fi: 'Valitun joukon yhteenveto',
      en: 'Selected customer group',
    },
    analyticsNotice: {
      fi: 'Tunnusluvut, jakaumat ja taulukko lasketaan samasta suodatetusta esimerkkiaineistosta. Ne eivät kuvaa Ifin asiakkaita tai mitattua liiketoimintavaikutusta.',
      en: 'Metrics, distributions and the table use the same filtered example data. They do not describe If customers or measured business impact.',
    },
    metricLabels: {
      customers: {
        fi: 'Asiakkuuksia',
        en: 'Customers',
      },
      policies: {
        fi: 'Vakuutuksia',
        en: 'Policies',
      },
      multi: {
        fi: 'Useita vakuutuksia',
        en: 'Multiple policies',
      },
      feedback: {
        fi: 'Palaute / 5',
        en: 'Feedback / 5',
      },
    },
    feedbackCountLabel: {
      fi: 'vastausta',
      en: 'responses',
    },
    filtersTitle: {
      fi: 'Rajaa aineistoa',
      en: 'Filter example data',
    },
    policyFilterLabel: {
      fi: 'Vakuutuslaji',
      en: 'Policy type',
    },
    caseFilterLabel: {
      fi: 'Elämäntilanne',
      en: 'Life situation',
    },
    allPoliciesLabel: {
      fi: 'Kaikki vakuutuslajit',
      en: 'All policy types',
    },
    allCasesLabel: {
      fi: 'Kaikki elämäntilanteet',
      en: 'All life situations',
    },
    policyTypes: [
      {
        id: 'home',
        label: {
          fi: 'Kotivakuutus',
          en: 'Home insurance',
        },
      },
      {
        id: 'dog',
        label: {
          fi: 'Koiravakuutus',
          en: 'Dog insurance',
        },
      },
      {
        id: 'travel',
        label: {
          fi: 'Matkavakuutus',
          en: 'Travel insurance',
        },
      },
      {
        id: 'unborn-child',
        label: {
          fi: 'Vauvavakuutus',
          en: 'Baby insurance',
        },
      },
    ],
    distributionTitle: {
      fi: 'Vakuutuskannan jakauma',
      en: 'Policy distribution',
    },
    distributionNotice: {
      fi: 'Vakuutusten lukumäärä valitussa asiakasjoukossa. Samalla asiakkuudella voi olla useita vakuutuksia.',
      en: 'Policy counts in the selected customer group. One customer may hold several policies.',
    },
    preparationTitle: {
      fi: 'Valmistelumerkinnät elämäntilanteittain',
      en: 'Preparation ticks by life situation',
    },
    preparationNotice: {
      fi: 'Käyttäjän demomerkintöjä soveltuvista tehtävistä. Valmistumisaste ei ole turvallisuus-, terveys- tai riskiluokitus.',
      en: 'User ticks on applicable demo tasks. Completion is not a safety, health or risk rating.',
    },
    feedbackTitle: {
      fi: 'Esimerkkipalautteen jakauma',
      en: 'Example feedback distribution',
    },
    feedbackNotice: {
      fi: 'Keksittyjen vastausten lukumäärä asteikolla 1–5. Ei osoita muutosta asiakastyytyväisyydessä.',
      en: 'Counts of invented responses on a scale of 1–5. These do not demonstrate a change in customer satisfaction.',
    },
    tableTitle: {
      fi: 'Suodatetut esimerkkiasiakkuudet',
      en: 'Filtered example customers',
    },
    tableCaption: {
      fi: 'Taulukon asiakkuudet muodostavat yllä olevat tunnusluvut. Aineisto on erillinen asiakasnäkymän muistissa olevista valinnoista.',
      en: "The customers in this table form the metrics above. This data is separate from the customer view's in-memory selections.",
    },
    columns: {
      customer: {
        fi: 'Asiakkuus',
        en: 'Customer',
      },
      policies: {
        fi: 'Vakuutukset',
        en: 'Policies',
      },
      lifeCase: {
        fi: 'Elämäntilanne',
        en: 'Life situation',
      },
      preparation: {
        fi: 'Tehty / soveltuvat',
        en: 'Done / applicable',
      },
      feedback: {
        fi: 'Palaute / 5',
        en: 'Feedback / 5',
      },
    },
    feedbackDetailsLabel: {
      fi: 'Palauteteksti',
      en: 'Feedback text',
    },
    caseColumn: {
      fi: 'Elämäntilanne',
      en: 'Life situation',
    },
    customerCountColumn: {
      fi: 'Asiakkuuksia',
      en: 'Customers',
    },
    taskCountColumn: {
      fi: 'Tehty / soveltuvat',
      en: 'Done / applicable',
    },
    emptyLabel: {
      fi: 'Ei asiakkuuksia näillä rajauksilla.',
      en: 'No customers match these filters.',
    },
    noFeedbackLabel: {
      fi: 'Ei vastauksia',
      en: 'No responses',
    },
    unitLabel: {
      fi: 'kpl',
      en: 'policies',
    },
    filterResultLabel: {
      fi: 'Rajauksen asiakkuuksia',
      en: 'Customers matching filters',
    },
    customers: [
      {
        id: 'demo-001',
        name: {
          fi: 'Matti ja Liisa · demo',
          en: 'Matti and Liisa · demo',
        },
        caseId: 'new_home',
        portfolioId: 'multi',
        completedTaskIds: ['main-valve'],
        feedbackScore: 3,
        feedbackText: {
          fi: 'Haluamme ymmärtää, mitä kodin vuotovähennys tarkoittaa.',
          en: "We want to understand what the home's leakage deduction means.",
        },
      },
      {
        id: 'demo-002',
        name: {
          fi: 'Aino · demo',
          en: 'Aino · demo',
        },
        caseId: 'first_baby',
        portfolioId: 'family',
        completedTaskIds: [],
        feedbackScore: 4,
        feedbackText: {
          fi: 'Hankintojen turvallisuudesta on vaikea löytää selkeää kokonaiskuvaa.',
          en: 'It is hard to find a clear overview of the safety of our purchases.',
        },
      },
      {
        id: 'demo-003',
        name: {
          fi: 'Olli · demo',
          en: 'Olli · demo',
        },
        caseId: 'absence',
        portfolioId: 'home',
        completedTaskIds: ['water-plan'],
        feedbackScore: 5,
        feedbackText: {
          fi: 'Lähtövalmisteluista toivotaan muistutusta ennen esimerkkimatkaa.',
          en: 'We would like a preparation reminder before the example trip.',
        },
      },
    ],
    unitSingularLabel: {
      fi: 'kpl',
      en: 'policy',
    },
    feedbackSingularLabel: {
      fi: 'vastaus',
      en: 'response',
    },
  },
  info: {
    businessLabel: {
      fi: 'Miksi nämä tehtävät?',
      en: 'Why these tasks?',
    },
    pricingLabel: {
      fi: 'Tietoa esimerkkihinnasta',
      en: 'About the example price',
    },
    deductionLabel: {
      fi: 'Miten vuotovähennys lasketaan?',
      en: 'How is the leakage deduction calculated?',
    },
    policyLabel: {
      fi: 'Mitä valinta muuttaa?',
      en: 'What does this selection change?',
    },
    notice: {
      fi: 'Taustatietoa prototyypistä. Mitään ei lähetetty tai muutettu vakuutukseen.',
      en: 'Prototype background. Nothing was sent or changed in an insurance policy.',
    },
    metricsLabel: {
      fi: 'Pilotissa tutkittavaa',
      en: 'Questions for a pilot',
    },
    policyTitle: {
      fi: 'Vakuutusvalinta ohjaa esimerkkiä',
      en: 'Insurance selection shapes the example',
    },
    policyText: {
      fi: 'Valinta suodattaa vakuutuksiin liittyviä ohjeita, tehtäviä ja asiakasetuja. Soveltuva eläinvakuutus tuo yhden If Eläinavun yhteysohjeen. Matkavakuutus lisää omien vakuutustietojen kokoamisen lähtölistaan; jo hankittu vauvavakuutus vaihtaa hankintaohjeen sopimuksen tarkistukseen. Yleiset valmistelut ja hätätilanteen toimintaohje pysyvät mukana.',
      en: 'The selection filters policy-related guidance, tasks and customer benefits. Applicable pet insurance provides a single If Eläinapu contact route. Travel insurance adds gathering policy details to the departure checklist; already-purchased baby insurance replaces buying guidance with a contract review. General preparations and emergency guidance remain available.',
    },
    policyLimits: {
      fi: 'Kaikki vakuutukset ja hinnat ovat kuvitteellisia. Vakuutusten lukumäärä ei yksin osoita todellista etutasoa tai palveluoikeutta.',
      en: 'All policies and prices are fictional. Policy count alone does not establish a real benefit level or service eligibility.',
    },
  },
  policyContext: {
    visitor: {
      fi: 'Tutustujan esimerkki · vakuutuksia ei oleteta eikä yhdistämisetua lasketa.',
      en: 'Visitor example · no policies assumed and no bundle benefit applied.',
    },
    new_home: {
      fi: 'Kotivakuutus valittu · tarkista oman sopimuksen ehdot. Hinta reagoi valittuun esimerkkikokonaisuuteen.',
      en: 'Home insurance selected · check your own contract terms. The price responds to the selected example setup.',
    },
    absenceTravel: {
      fi: 'Koti- ja matkavakuutus valittu · kokoa matkavakuutuksen tiedot osana lähtötehtäviä.',
      en: 'Home and travel insurance selected · gather travel policy details as part of the departure tasks.',
    },
    absenceHome: {
      fi: 'Matkavakuutusta ei valittu · lähtölista keskittyy kodin valmisteluihin. Kysymysluonnoksessa voit selvittää matkaturvan tarpeen.',
      en: 'No travel insurance selected · the checklist focuses on preparing the home. You can clarify travel cover needs in the question draft.',
    },
    first_baby: {
      fi: 'Vauvavakuutusta ei valittu · tarkista nykyinen turva ja myöhemmät vaihtoehdot. Lapsen vakuutusta ei oleteta.',
      en: 'No baby insurance selected · review current cover and later options. Child insurance is not assumed.',
    },
    petIncluded: {
      fi: 'Koiravakuutus valittu · löydät If Eläinavun 24/7-yhteysohjeen alta.',
      en: 'Dog insurance selected · find the If Eläinapu 24/7 contact instructions below.',
    },
    petNotIncluded: {
      fi: 'Eläinvakuutusta ei valittu · palveluoikeutta ei oleteta. Hoitoon hakeutuminen ei odota vakuutuksen ostoa.',
      en: 'No pet insurance selected · service eligibility is not assumed. Seeking care must not wait for an insurance purchase.',
    },
    homePriceLabel: {
      fi: 'Esimerkkivuosihinta',
      en: 'Example annual price',
    },
    questionsLabel: {
      fi: 'Valmistele vakuutuskysymykset',
      en: 'Prepare insurance questions',
    },
    questionsTitle: {
      fi: 'Kysymykset valittuun elämäntilanteeseen',
      en: 'Questions for the selected life situation',
    },
    packetLabel: {
      fi: 'Valittava kysymysluonnos · ei tarjouspyyntö',
      en: 'Selectable question draft · not a quote request',
    },
    policiesLabel: {
      fi: 'Valitut esimerkkivakuutukset',
      en: 'Selected example policies',
    },
    noPolicies: {
      fi: 'Ei oletettuja vakuutuksia',
      en: 'No policies assumed',
    },
    question: {
      fi: 'Mitkä valittujen vakuutusten ehdot ja palvelut liittyvät tähän elämäntilanteeseen?',
      en: 'Which terms and services in the selected policies relate to this life situation?',
    },
    travelQuestion: {
      fi: 'Mitä matkaturvasta on syytä selvittää ennen esimerkkimatkaa?',
      en: 'What travel cover questions should we clarify before the example trip?',
    },
    babyQuestion: {
      fi: 'Mitä nykyinen turva sisältää ja mitä lapsen vakuutusvaihtoehdoista tulee selvittää?',
      en: 'What does current cover include, and what should we check about child insurance options?',
    },
    notSent: {
      fi: 'Paikallinen luonnos. Mitään ei lähetetty eikä vakuutusturvaa muutettu.',
      en: 'Local draft. Nothing was sent and no insurance cover was changed.',
    },
    babyIncluded: {
      fi: 'Vauvavakuutus on jo valittu esimerkkiin · tarkista olemassa oleva sopimus. Uuden vakuutuksen hankintaohjetta ei näytetä.',
      en: 'Baby insurance already selected in this example · review the existing contract. New insurance buying guidance is not shown.',
    },
    babyOwnedQuestion: {
      fi: 'Mitä jo hankitun vauvavakuutuksen tiedoista ja syntymän jälkeisistä käytännöistä tulee tarkistaa?',
      en: 'Which details of the existing baby policy and arrangements after birth need checking?',
    },
  },
};
