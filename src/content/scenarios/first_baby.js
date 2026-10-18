export default {
  schemaVersion: 1,
  title: {
    fi: 'Ensimmäinen lapsi',
    en: 'First baby',
  },
  presentation: {
    contextTitle: {
      fi: 'Valmistaudutaan yhdessä',
      en: "Let's prepare together",
    },
    tasksTitle: {
      fi: 'Pieni tarkistus kerrallaan',
      en: 'One small check at a time',
    },
    topicTitles: {
      car: {
        fi: 'Turvaistuin ja autoilu',
        en: 'Car seat and travel',
      },
      sleep: {
        fi: 'Nukkuminen ja kalusteet',
        en: 'Sleep and furniture',
      },
      home: {
        fi: 'Kemikaalit ja sähkö',
        en: 'Chemicals and electricity',
      },
    },
    progressTitle: {
      fi: 'Kaikkien aiheiden valmistelut',
      en: 'Preparations across all topics',
    },
    progressNotice: {
      fi: 'Mittari laskee kaikki hankintatapaan soveltuvat tehtävät aihevalinnasta riippumatta. Se ei ole turvallisuustodistus tai arvio vakuutuksen myöntämisestä.',
      en: 'The indicator counts all tasks relevant to the purchase type, regardless of topic filter. It is not a safety certificate or insurance underwriting assessment.',
    },
    emptyTasksLabel: {
      fi: 'Tälle aiheelle ei ole näkyviä tehtäviä.',
      en: 'No tasks are visible for this topic.',
    },
    packetLabel: {
      fi: 'Kysymysluonnos · kuvitteellinen perhe',
      en: 'Question draft · fictional family',
    },
    conditionLabel: {
      fi: 'Hankintatapa',
      en: 'Purchase type',
    },
    commonChecksLabel: {
      fi: 'Myös yhteiset tarkistukset ovat mukana. Aihevalinta rajaa vain tehtävälistaa.',
      en: 'Common checks remain included. The topic filter only narrows the displayed tasks.',
    },
  },
  persona: {
    fi: 'Esikoisen odotus – Laskettu aika 6 viikon kuluttua',
    en: 'Expecting a first baby – Due in 6 weeks',
  },
  referenceYear: 2026,
  demoNotice: {
    fi: 'Kuvitteellinen perhe. Tuotteita tai vakuutusturvaa ei ole tarkastettu. Älä syötä terveystietoja.',
    en: 'Fictional family. Products and insurance cover have not been checked. Do not enter health information.',
  },
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
      label: {
        fi: 'Tarkistusten aihe',
        en: 'Topic to check',
      },
      options: [
        {
          value: 'all',
          label: {
            fi: 'Kaikki',
            en: 'All',
          },
        },
        {
          value: 'car',
          label: {
            fi: 'Turvaistuin & Autoilu',
            en: 'Car seats & travel',
          },
        },
        {
          value: 'sleep',
          label: {
            fi: 'Nukkuminen & Kalusteet',
            en: 'Sleep & furniture',
          },
        },
        {
          value: 'home',
          label: {
            fi: 'Kodin kemikaalit & Sähkö',
            en: 'Household chemicals & electricity',
          },
        },
      ],
      help: {
        fi: 'Aihe rajaa tehtävälistaa. Se ei poista muiden aiheiden valmisteluja.',
        en: 'The topic filters the task list. It does not remove preparations in other topics.',
      },
    },
    {
      id: 'equipmentCondition',
      type: 'choice',
      label: {
        fi: 'Hankintatapa',
        en: 'Purchase type',
      },
      options: [
        {
          value: 'new',
          label: {
            fi: 'Uudet hankinnat',
            en: 'Bought new',
          },
        },
        {
          value: 'used',
          label: {
            fi: 'Käytettynä hankitut',
            en: 'Bought second-hand',
          },
        },
      ],
      help: {
        fi: 'Käytetyt hankinnat tuovat lisäkysymyksiä historiasta ja osista. Myös uudet tuotteet tarkistetaan.',
        en: 'Second-hand items add questions about history and parts. New products also need checking.',
      },
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
      limitation: {
        fi: 'Uutena myytävien R129-hyväksyntä ja vanhojen R44/03–04-istuinten edelleen sallittu käyttö ovat eri asioita. Historiasta, käyttöiästä ja sopivuudesta on varmistuttava tuotekohtaisesti.',
        en: 'R129 approval for seats sold new and continued permitted use of older R44/03–04 seats are separate matters. History, service life and compatibility must be checked for each product.',
      },
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
      limitation: {
        fi: 'Noudata myös istuimen, telakan ja auton ohjeita. Valmistaja määrittelee käyttöiän ja kolarin jälkeiset toimet. R129 ja i-Size eivät ole synonyymejä. Demo ei hyväksy yksittäistä istuinta turvalliseksi.',
        en: 'Also follow the seat, base and vehicle instructions. The manufacturer defines service life and actions after a collision. R129 and i-Size are not synonyms. The demo does not approve an individual seat as safe.',
      },
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
      limitation: {
        fi: 'Kuluttajaohje pinnoista, laidoista ja patjasta; ei standardin koko testiohjelma tai yksittäisen sängyn hyväksyntä. Tukesin ohje vahvistaa 6,5 cm enimmäisvälin, ei tässä käytettävää 4,5 cm alarajaa.',
        en: 'Consumer guidance on bars, sides and mattresses; not the complete standard test programme or approval of a particular cot. Tukes confirms a 6.5 cm maximum, not a 4.5 cm minimum used here.',
      },
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
      limitation: {
        fi: 'Arjen valmistautumisohjeita. Valvonta on tarpeen myös uuden hoitopöydän kanssa. Ohje ei oikeuta omatoimisiin kiinteisiin sähköasennuksiin.',
        en: 'Everyday preparation guidance. Supervision is also required with a new changing table. This does not authorise DIY work on fixed electrical installations.',
      },
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
      limitation: {
        fi: 'Tukee kokoamisohjeiden, osien ja turvallisen rakenteen tarkistamista. Huonekaluille ei vaadita CE-merkkiä. Valintaruutu ei todista vaatimustenmukaisuutta.',
        en: 'Supports checking assembly instructions, parts and safe construction. Furniture does not require CE marking. A tick does not prove conformity.',
      },
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
      limitation: {
        fi: 'Koskee kemikaalien merkintöjä ja säilyttämistä lasten ulottumattomissa. Ei lääkkeiden säilytysohje, myrkytystilanteen hoito-ohje tai väite kaikkien kemikaalien vaarallisuudesta.',
        en: "Covers chemical labels and keeping chemicals out of children's reach. Not medicine storage or poisoning treatment guidance, or a claim that all chemicals are dangerous.",
      },
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
      limitation: {
        fi: 'Vain julkinen soveltamisala ja EN-vastaavuus luettu. Ei maksullista standardia, suomalaista SFS-painosta tai tuotteen testiraporttia. Ei hoitopöydän tai kaikkien kehtotyyppien yleisstandardi.',
        en: 'Only the public scope and EN equivalence were read, not the paid standard, Finnish SFS edition or a product test report. Not a general standard for changing tables or all cradle types.',
      },
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
      limitation: {
        fi: 'Vain hoitotason käyttötarkoituksen soveltamisala tarkistettu. Ei täyttä standardia, SFS-julkaisun tilaa tai yksittäisen tuotteen vaatimustenmukaisuutta.',
        en: 'Only the scope for changing units was checked, not the full standard, SFS publication status or conformity of an individual product.',
      },
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
      limitation: {
        fi: 'Tuotesivun hakuajankohta ei ole myöntämis- tai korvauslupaus. Terveysselvitys, muut myöntämisperusteet, vakuutuskirja ja ehdot on tarkistettava erikseen.',
        en: "The product page's application deadline is not a promise of acceptance or compensation. A health declaration, other criteria, policy schedule and terms require separate review.",
      },
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
      limitation: {
        fi: 'Myyntiopas, ei koko vakuutussopimus. Syntymän jälkeen terveydentila voi vaikuttaa myöntämiseen ja rajoituksiin. Henkilökohtaista terveydentilaa tai vakuutuksen myöntämistä ei arvioida demossa.',
        en: 'Sales guide, not the full insurance contract. Health after birth can affect acceptance and exclusions. The demo does not assess personal health or underwriting.',
      },
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
      limitation: {
        fi: 'Vakuutuskirja kertoo sopimukseen sisältyvät tuotteet ja turvat. Demo ei väitä kaikkien kulujen tai sairauksien olevan vakuutettuja eikä arvioi perheen sopimusta.',
        en: "The policy schedule lists the contract's products and cover. The demo does not claim that all expenses or illnesses are insured or assess the family's contract.",
      },
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
      limitation: {
        fi: 'Pelkkä ikä, hyväksyntämerkintä tai käytetty/uusi-valinta ei osoita istuimen ja telakan turvallisuutta. Tarkista historia, kunto, käyttöikä ja sopivuus.',
        en: 'Age, an approval label or a new/used selection alone cannot establish the safety of a seat and base. Check history, condition, service life and compatibility.',
      },
    },
    cotBarSpacing: {
      status: 'verified',
      sourceIds: ['baby-tukes-sleep'],
      maximumGapCm: 6.5,
      minimumGapCm: null,
      limitation: {
        fi: 'Tukesin kuluttajaohjeen enimmäisväli. Mitta ei ole sängyn hyväksyntätesti eikä tue kaikkia aukkoja koskevaa yleistä 4,5–6,5 cm sääntöä.',
        en: 'Maximum spacing in Tukes consumer guidance. This measurement is not an approval test for the cot and does not establish a general 4.5–6.5 cm rule for every opening.',
      },
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
      limitation: {
        fi: 'Kalenterikuukausia ei muunnettaisi yleiseksi kahdeksan viikon rajaksi. Kuuden viikon esimerkki on hakuajan jälkeen, mutta olemassa oleva vakuutus ja syntymän jälkeiset vaihtoehdot ovat erillisiä kysymyksiä.',
        en: 'Calendar months must not be converted into a general eight-week limit. This six-week example is past the application deadline, but existing insurance and options after birth are separate questions.',
      },
    },
    filtering: {
      status: 'illustrative',
      sourceIds: ['baby-liikenneturva-faq', 'baby-tukes-furniture'],
      categoryChangesApplicability: false,
      readinessBasis: 'allConditionApplicableTasks',
      preserveHiddenTaskState: true,
      limitation: {
        fi: 'Aihepainike rajaa vain näkymää. Hankintatapa muuttaa lisätarkistusten soveltuvuutta, mutta uusi tuote ei vapauta kaikille yhteisistä tarkistuksista.',
        en: 'The topic button only filters the view. Purchase type changes which extra checks apply; a new item still needs the common checks.',
      },
    },
  },
  standards: [
    {
      id: 'cot',
      category: 'sleep',
      label: {
        fi: 'Pinnasängyt: EN 716-1',
        en: 'Cots: EN 716-1',
      },
      status: 'verified',
      sourceIds: ['baby-bsi-cot-metadata'],
      limitation: {
        fi: 'Julkinen EN-soveltamisala tarkistettu BSI:n kautta. SFS-painosta ja tuotteen testitulosta ei ole tarkistettu; ei yleinen hoitopöytästandardi.',
        en: "The public EN scope was checked through BSI. The SFS edition and the product's test result were not checked; this is not a general changing-table standard.",
      },
    },
    {
      id: 'changing-unit',
      category: 'sleep',
      label: {
        fi: 'Hoitotasot: EN 12221',
        en: 'Changing units: EN 12221',
      },
      status: 'verified',
      sourceIds: ['baby-bsi-changing-metadata'],
      limitation: {
        fi: 'Julkinen EN-soveltamisala tarkistettu BSI:n kautta. Ei yksittäisen tuotteen hyväksyntä tai väite vanhan tuotteen takautuvasta testivaatimuksesta.',
        en: 'The public EN scope was checked through BSI. This does not approve a particular product or claim a retrospective test requirement for an old item.',
      },
    },
  ],
  insights: {
    usedEquipment: {
      title: {
        fi: 'Selvitä käytetyn tuotteen historia ennen käyttöä',
        en: "Establish a second-hand product's history before use",
      },
      status: 'verified',
      sourceIds: ['baby-liikenneturva-faq', 'baby-tukes-furniture'],
      when: {
        equipmentCondition: 'used',
      },
      text: {
        fi: 'Turvaistuimen ja telakan tausta on tunnettava. Hanki myös kalusteiden ohjeet ja tarkista osat.',
        en: 'You need to know the history of the car seat and base. Obtain furniture instructions and check the parts too.',
      },
      limitation: {
        fi: 'Käytetty ei automaattisesti tarkoita vaarallista. Epäselvää historiaa ei kuitenkaan ratkaista pelkällä siistillä ulkonäöllä tai valintaruudulla.',
        en: 'Second-hand does not automatically mean unsafe. A clean appearance or a tick cannot resolve an unknown history.',
      },
    },
    newEquipment: {
      title: {
        fi: 'Myös uudet hankinnat tarvitsevat tarkistuksen',
        en: 'New purchases need checking too',
      },
      status: 'verified',
      sourceIds: ['baby-liikenneturva-faq', 'baby-tukes-furniture'],
      when: {
        equipmentCondition: 'new',
      },
      text: {
        fi: 'Varmista tuotteen sopivuus, ohjeet ja oikea kokoaminen ennen ensimmäistä käyttöä.',
        en: 'Confirm compatibility, instructions and correct assembly before first use.',
      },
      limitation: {
        fi: 'Uusi-valinta ei vahvista valmistajaa, tuotetta tai asennusta turvalliseksi.',
        en: 'Selecting new does not certify the manufacturer, product or installation as safe.',
      },
    },
    approval: {
      title: {
        fi: 'Hyväksyntä ja sopivuus tarkistetaan erikseen',
        en: 'Check approval and compatibility separately',
      },
      category: 'car',
      status: 'verified',
      sourceIds: ['baby-liikenneturva-seat', 'baby-liikenneturva-faq'],
      text: {
        fi: 'Uutena myytävissä istuimissa käytetään R129-hyväksyntää. Vanhan R44/03–04-istuimen käyttöä arvioidaan erikseen. Kaikki R129-istuimet eivät ole i-Size-istuimia.',
        en: 'New seats sold use R129 approval. Use of an older R44/03–04 seat is assessed separately. Not every R129 seat is an i-Size seat.',
      },
      limitation: {
        fi: 'Noudata istuimen, telakan ja auton ohjeita. Hyväksyntä ei yksin osoita juuri teidän yhdistelmänne sopivuutta.',
        en: 'Follow the seat, base and vehicle instructions. Approval alone does not establish compatibility for your particular combination.',
      },
    },
    preparation: {
      title: {
        fi: 'Pieni tarkistus kerrallaan',
        en: 'One small check at a time',
      },
      status: 'illustrative',
      sourceIds: ['baby-tukes-sleep', 'baby-tukes-interior'],
      text: {
        fi: 'Valmistele vauvan arkea rauhassa. Osa kodin järjestelyistä auttaa myös myöhemmin, kun lapsi alkaa liikkua.',
        en: 'Prepare calmly for everyday life with a baby. Some arrangements at home will also help later when your child starts moving.',
      },
      limitation: {
        fi: 'Esimerkkilista ei kata kaikkia vauvan turvallisuusasioita. Valmistumisprosentti kuvaa tehtäviä, ei kodin tai tuotteen turvallisuustodistusta.',
        en: 'The example list does not cover every baby safety issue. The completion percentage describes tasks, not a safety certificate for a home or product.',
      },
    },
    insurance: {
      title: {
        fi: 'Tarkista nykyinen turva ja seuraavat vaihtoehdot',
        en: 'Review current cover and the next options',
      },
      status: 'verified',
      sourceIds: ['baby-if-product', 'baby-if-guide', 'baby-if-terms'],
      alwaysVisible: true,
      text: {
        fi: 'Kuuden viikon esimerkissä Ifin ilmoittama kahden kuukauden määräaika uudelle raskausaikaiselle vakuutukselle on jo ohitettu. Tarkista mahdollinen nykyinen vakuutuksesi. Lapsivakuutusta voi hakea seitsemän vuorokauden iästä alkaen; terveydentila ja muut myöntämisperusteet vaikuttavat.',
        en: "In this six-week example, If's published two-month deadline for new insurance during pregnancy has already passed. Check any insurance you already have. Child insurance can be applied for from seven days of age; health and other underwriting criteria affect acceptance.",
      },
      limitation: {
        fi: 'Ei vakuutushakemus, hinta- tai myöntämislupaus. Älä muuta tai päätä nykyistä vakuutusta tämän demon perusteella. Terveystietoja ei kerätä.',
        en: 'This is not an application, quote or promise of acceptance. Do not change or cancel existing insurance based on this demo. No health information is collected.',
      },
    },
    existingInsurance: {
      title: {
        fi: 'Vauvavakuutus löytyy jo esimerkistä',
        en: 'Baby insurance is already in this example',
      },
      text: {
        fi: 'Tässä profiilissa vauvavakuutus on jo hankittu. Kokoa vakuutuskirja ja kysy, mitä sopimuksen tiedoista ja syntymän jälkeisistä käytännöistä tulee tarkistaa.',
        en: 'This profile already has baby insurance. Gather the policy schedule and ask which contract details and arrangements after birth need reviewing.',
      },
      status: 'illustrative',
      sourceIds: ['baby-if-product', 'baby-if-terms'],
      limitation: {
        fi: 'Kuvitteellinen vakuutusvalinta. Olemassaoloa, turvan sisältöä tai tarvittavia jatkotoimia ei ole tarkistettu. Tämä ei ole uusi hakemus, myöntämislupaus tai ohje muuttaa vakuutusta.',
        en: 'Fictional policy selection. Existence, cover and required next steps have not been checked. This is not a new application, promise of acceptance or advice to change a policy.',
      },
    },
  },
  tasks: [
    {
      id: 'seat-fit',
      category: 'car',
      title: {
        fi: 'Tarkista turvakaukalon ja telakan sopivuus autoon',
        en: 'Check that the infant seat and base fit the car',
      },
      why: {
        fi: 'Varaa aikaa käyttöohjeiden lukemiseen ja oikean asennuksen harjoitteluun.',
        en: 'Allow time to read the instructions and practise correct installation.',
      },
      priority: 'high',
      status: 'verified',
      sourceIds: ['baby-liikenneturva-faq'],
      limitation: {
        fi: 'Varmista sopivuus myös lapsen koon ja auton ohjeiden mukaan. Demo ei tarkasta asennusta.',
        en: "Also check compatibility with your child's size and the vehicle instructions. The demo does not inspect installation.",
      },
    },
    {
      id: 'seat-history',
      category: 'car',
      title: {
        fi: 'Selvitä käytetyn istuimen ja telakan historia',
        en: 'Establish the history of the second-hand seat and base',
      },
      why: {
        fi: 'Varmista aiemmat vauriot ja valmistajan määrittämä käyttöikä sekä sen laskentatapa.',
        en: "Check previous damage and the manufacturer's stated service life and how it is calculated.",
      },
      priority: 'critical',
      status: 'verified',
      sourceIds: ['baby-liikenneturva-faq'],
      when: {
        equipmentCondition: 'used',
      },
      limitation: {
        fi: 'Jos historia jää epäselväksi, turvallisuudesta ei voida varmistua. Kolarin jälkeinen käyttö selvitetään valmistajan ohjeista, ei demon ikärajalla.',
        en: "If the history remains unclear, safety cannot be established. Follow the manufacturer's instructions on use after a collision, not an age limit from the demo.",
      },
    },
    {
      id: 'cot-check',
      category: 'sleep',
      title: {
        fi: 'Tarkista pinnasängyn laidat, pinnat ja patjan sopivuus',
        en: 'Check the cot sides, bars and mattress fit',
      },
      why: {
        fi: 'Varmista laitojen kiinnitys, ohjeiden mukainen patja ja enintään 6,5 cm pinnojen väli.',
        en: 'Check side fixings, a mattress matching the instructions and bar spacing of no more than 6.5 cm.',
      },
      priority: 'high',
      status: 'verified',
      sourceIds: ['baby-tukes-sleep'],
      limitation: {
        fi: 'Tämä kuluttajatarkistus ei kata standardin kaikkia mittoja ja testejä. Sängyn pitää soveltua lapsen kehitysvaiheeseen.',
        en: "This consumer check does not cover every dimension and test in the standard. The cot must suit the child's developmental stage.",
      },
    },
    {
      id: 'used-furniture',
      category: 'sleep',
      title: {
        fi: 'Hanki käytettyjen kalusteiden kokoamisohjeet ja tarkista osat',
        en: 'Get assembly instructions and check second-hand furniture parts',
      },
      why: {
        fi: 'Vertaa osia ohjeeseen ja selvitä epäselvät kiinnitykset myyjältä tai valmistajalta.',
        en: 'Compare the parts with the instructions; ask the seller or manufacturer about unclear fixings.',
      },
      priority: 'high',
      status: 'illustrative',
      sourceIds: ['baby-tukes-furniture'],
      when: {
        equipmentCondition: 'used',
      },
      limitation: {
        fi: 'Ohjeiden ja osien läpikäynti on käytettyyn kalusteeseen sovellettu valmistautumistehtävä, ei kuntotodistus tai itse tehtävä rakenteellinen korjausohje.',
        en: 'Reviewing instructions and parts is preparation for second-hand furniture, not a condition certificate or instructions for structural DIY repairs.',
      },
    },
    {
      id: 'changing-unit',
      category: 'sleep',
      title: {
        fi: 'Valmistele hoitopiste ja valvonta',
        en: 'Prepare the changing area and supervision',
      },
      why: {
        fi: 'Pidä tarvikkeet käden ulottuvilla. Vauvaa ei jätetä hoitopöydälle yksin edes hetkeksi.',
        en: 'Keep supplies within reach. Never leave a baby alone on a changing table, even briefly.',
      },
      priority: 'high',
      status: 'verified',
      sourceIds: ['baby-tukes-interior'],
      limitation: {
        fi: 'Reunat tai mahdolliset valjaat eivät korvaa valvontaa. Noudata oman hoitotason ohjeita.',
        en: 'Edges or straps do not replace supervision. Follow the instructions for your own changing unit.',
      },
    },
    {
      id: 'sleep-cords',
      category: 'sleep',
      title: {
        fi: 'Siirrä johdot ja kaihtimien narut pois sängyn läheltä',
        en: 'Move cables and blind cords away from the cot',
      },
      why: {
        fi: 'Varmista, ettei lapsi ylety naruihin tai johdoista muodostuviin lenkkeihin.',
        en: 'Make sure the child cannot reach cords or loops formed by cables.',
      },
      priority: 'high',
      status: 'verified',
      sourceIds: ['baby-tukes-interior'],
      limitation: {
        fi: 'Huomioi myös itkuhälyttimen johto. Tarkista sijoittelu uudelleen lapsen kasvaessa.',
        en: 'Include the baby monitor cable. Recheck placement as your child grows.',
      },
    },
    {
      id: 'chemicals',
      category: 'home',
      title: {
        fi: 'Lue kemikaalien merkinnät ja järjestä säilytys',
        en: 'Read chemical labels and arrange safe storage',
      },
      why: {
        fi: 'Noudata pakkausten ohjeita ja pidä varoitusmerkein merkityt kemikaalit lasten ulottumattomissa.',
        en: "Follow packaging instructions and keep chemicals with warning symbols out of children's reach.",
      },
      priority: 'high',
      status: 'verified',
      sourceIds: ['baby-tukes-chemicals'],
      limitation: {
        fi: 'Valmistaudu myös lapsen liikkumiseen. Tämä ei ole myrkytystilanteen hoito-ohje.',
        en: 'Prepare for your child becoming mobile too. This is not treatment advice for poisoning.',
      },
    },
    {
      id: 'electricity',
      category: 'home',
      title: {
        fi: 'Tarkista pistorasioiden lapsisuojaus ja sähkölaitteiden kunto',
        en: 'Check child protection on sockets and the condition of appliances',
      },
      why: {
        fi: 'Poista rikkoutuneet laitteet käytöstä. Pyydä sähköalan ammattilaista vaihtamaan suojaamattomat rasiat tarvittaessa.',
        en: 'Stop using damaged appliances. Ask an electrical professional to replace unprotected sockets where necessary.',
      },
      priority: 'high',
      status: 'verified',
      sourceIds: ['baby-tukes-interior'],
      limitation: {
        fi: 'Pistorasioita ei avata tai vaihdeta itse tämän listan perusteella. Valmistelu ei korvaa sähköasennusten ammattilaisarviota.',
        en: 'Do not open or replace sockets yourself based on this list. Preparation does not replace a professional assessment of electrical installations.',
      },
    },
  ],
  actions: [
    {
      id: 'prepare-questions',
      label: {
        fi: 'Valmistele kysymykset – demo',
        en: 'Prepare questions – demo',
      },
      title: {
        fi: 'Kysymykset myyjälle tai valmistajalle',
        en: 'Questions for the seller or manufacturer',
      },
      status: 'illustrative',
      sourceIds: ['baby-liikenneturva-faq', 'baby-tukes-furniture'],
      text: {
        fi: 'Mikä on tuotteen malli? Löytyvätkö ohjeet ja kaikki osat? Miten käyttöikä määritellään? Mitä historiasta tiedetään?',
        en: 'What is the product model? Are instructions and all parts available? How is service life defined? What is known about its history?',
      },
      confirmation: {
        fi: 'Kysymyslista on esimerkki. Mitään ei lähetetty eikä tuotetta tarkastettu.',
        en: 'This question list is an example. Nothing was sent and no product was inspected.',
      },
      limitation: {
        fi: 'Ei yhteyttä myyjään, valmistajaan tai vakuutuspalveluun. Tietoja tai terveysselvitystä ei toimiteta.',
        en: 'No connection to a seller, manufacturer or insurance service. No details or health declaration are submitted.',
      },
    },
  ],
  business: {
    status: 'illustrative',
    label: {
      fi: 'Liiketoimintahypoteesi',
      en: 'Business hypothesis',
    },
    sourceIds: [
      'baby-tukes-interior',
      'baby-liikenneturva-faq',
      'baby-if-guide',
    ],
    text: {
      fi: 'Elämänvaiheeseen ajoitetut tarkistukset voivat helpottaa valmistautumista ja ohjata oikean lähteen äärelle.',
      en: 'Checks timed to a life stage could help people prepare and find the right sources.',
    },
    proposedMetrics: [
      {
        fi: 'Valmistelutehtävien valmistumisaste',
        en: 'Preparation task completion rate',
      },
      {
        fi: 'Valmistajan ohjeiden löytyminen käyttäjätestissä',
        en: 'Finding manufacturer instructions in user testing',
      },
      {
        fi: 'Vakuutuksen hakuajan ymmärtäminen',
        en: 'Understanding the insurance application deadline',
      },
    ],
    limitation: {
      fi: 'Ehdotettuja pilotin mittareita. Tapaturmien vähenemistä, vakuutusmyyntiä tai asiakaspysyvyyden kasvua ei ole mitattu.',
      en: 'Proposed pilot measures. Fewer accidents, insurance sales and increased retention have not been measured.',
    },
  },
  audiences: {
    visitor: {
      caseIntro: {
        fi: 'Valmistaudu vauvan tuloon ja selvitä tuotteiden tarkistukset sekä vakuutuskysymykset. Nykyistä lapsen turvaa ei oleteta.',
        en: 'Prepare for your baby, check equipment and explore insurance questions. Existing child cover is not assumed.',
      },
      contextTitle: {
        fi: 'Ensimmäiset tarkistukset ja vakuutuskysymykset',
        en: 'First checks and cover questions',
      },
      progressTitle: {
        fi: 'Valmistautuminen vauvan tuloon',
        en: 'Getting ready for your baby',
      },
      packetContext: {
        fi: 'Uuden asiakkaan kysymykset: tuotteet ja mahdolliset vakuutusvaihtoehdot ovat tarkistamatta.',
        en: 'New customer questions: products and possible insurance options have not been checked.',
      },
    },
    customer: {
      caseIntro: {
        fi: 'Jatka perheesi valmisteluja ja tarkista esimerkin nykyinen turva. Jo valittu vauvavakuutus tuo hankintaohjeen tilalle sopimuksen tarkistuksen.',
        en: 'Continue your family preparations and review the example cover. Already-selected baby insurance brings a contract review in place of buying guidance.',
      },
      contextTitle: {
        fi: 'Perheesi valmistelut ja nykyinen turva',
        en: 'Your preparations and existing cover',
      },
      progressTitle: {
        fi: 'Perheesi valmistelutehtävät',
        en: 'Your family preparation tasks',
      },
      packetContext: {
        fi: 'Nykyisen asiakkaan kysymykset: valitun perheen turvan sisältöä tai tuotteita ei ole vahvistettu.',
        en: 'Existing customer questions: selected family cover and product details have not been verified.',
      },
    },
  },
};
