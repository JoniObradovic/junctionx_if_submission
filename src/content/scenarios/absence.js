export default {
  schemaVersion: 1,
  title: {
    fi: 'Koti tyhjillään',
    en: 'Away from home',
  },
  presentation: {
    contextTitle: {
      fi: 'Matkasi valmistelut',
      en: 'Prepare for your trip',
    },
    tripTemplate: {
      fi: '{season} {durationDays} vrk – Rivitalo, sähkölämmitys',
      en: '{season} for {durationDays} days – Terraced home, electric heating',
    },
    tripLabels: {
      winter: {
        fi: 'Talviloma',
        en: 'Winter holiday',
      },
      summer: {
        fi: 'Kesäloma',
        en: 'Summer holiday',
      },
    },
    tasksTitle: {
      fi: 'Ennen kuin suljet oven',
      en: 'Before you close the door',
    },
    waterTitle: {
      fi: 'Vesi ja vesihanat',
      en: 'Water and taps',
    },
    heatingTitle: {
      fi: 'Lämmitys ja seuranta',
      en: 'Heating and monitoring',
    },
    departureTitle: {
      fi: 'Lukitus ja läheisen apu',
      en: 'Locks and help from someone you trust',
    },
    progressTitle: {
      fi: 'Lähtövalmistelujen tilanne',
      en: 'Departure preparations',
    },
    progressNotice: {
      fi: 'Mittari kuvaa näkyvien esimerkkitehtävien merkintöjä, ei kodin turvallisuutta, vakuutusturvaa tai alennusta.',
      en: 'This indicator counts completed example tasks, not home safety, insurance cover or a discount.',
    },
    priorityNotice: {
      fi: 'Yli viikon kohdalla korostuvat tehtävät ovat demon huomiojärjestys, eivät erillisiä vakuutusehtoja.',
      en: "Tasks highlighted after one week reflect the demo's priorities, not additional policy conditions.",
    },
    assignLabel: {
      fi: 'Lisää läheisen viestiin',
      en: "Add to the helper's message",
    },
    notSent: {
      fi: 'Luonnos. Mitään ei lähetetty eikä läheinen ole hyväksynyt tehtäviä.',
      en: 'Draft only. Nothing was sent and the helper has not accepted any tasks.',
    },
    manualCopyLabel: {
      fi: 'Valittava viestiluonnos · voit kopioida tekstin myös itse',
      en: 'Selectable message draft · you can also copy the text manually',
    },
    invalidTripLabel: {
      fi: 'Matkan päiviä ei voida laskea näillä tiedoilla.',
      en: 'The trip dates cannot be calculated from these details.',
    },
    scopeLabel: {
      fi: 'Soveltuvuus tarkistetaan kohteen ja huollon kanssa',
      en: 'Check applicability with building maintenance',
    },
  },
  persona: {
    fi: 'Talviloma 14 vrk (15.2.–1.3.) – Rivitalo, sähkölämmitys',
    en: 'Winter holiday, 14 days (15 February–1 March) – Terraced home, electric heating',
  },
  referenceYear: 2026,
  demoNotice: {
    fi: 'Kuvitteellinen matka ja läheinen. Vakuutusturvaa, taloyhtiön ohjeita tai kodin olosuhteita ei ole tarkistettu.',
    en: 'Fictional trip and helper. Insurance cover, housing company instructions and conditions at home have not been checked.',
  },
  defaults: {
    season: 'winter',
    durationDays: 14,
    completedTaskIds: [],
    assignedTaskIds: ['heating', 'mailbox'],
    neighborName: 'Pekka',
  },
  controls: [
    {
      id: 'season',
      type: 'choice',
      label: {
        fi: 'Vuodenaika',
        en: 'Season',
      },
      options: [
        {
          value: 'winter',
          label: {
            fi: 'Talvi (Pakkaskausi)',
            en: 'Winter (cold season)',
          },
        },
        {
          value: 'summer',
          label: {
            fi: 'Kesä',
            en: 'Summer',
          },
        },
      ],
      help: {
        fi: 'Talvivalinta tuo esiin lämmityksen ja jäätymisen ehkäisyn.',
        en: 'Winter brings heating and frost prevention into view.',
      },
    },
    {
      id: 'durationDays',
      type: 'range',
      min: 2,
      max: 30,
      step: 1,
      label: {
        fi: 'Poissaolon kesto (vrk)',
        en: 'Time away (days)',
      },
      help: {
        fi: 'Paluu lasketaan lähtöpäivästä. Yli viikon kohdalla veden sulun selvittäminen korostuu.',
        en: 'The return is calculated from the departure date. After one week, clarifying the water shut-off becomes a priority.',
      },
    },
  ],
  sources: [
    {
      id: 'absence-oma-water',
      publisher: 'If',
      title: 'Kodin Omaisuusvakuutusehdot – lämmitys ja veden sulku',
      url: 'https://www.if.fi/globalassets/fi/pdf/ehdot/kotivakuutusehdot.pdf',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'OMA 200.27',
      effectiveFrom: '2026-01-01',
      locator: 's. 7, 5.5 kohdat 1–3 ja 6',
      limitation: {
        fi: 'Rakennusta koskevan suojeluohjeen soveltuvuus on tarkistettava vakuutuskirjasta. Yhden rivitaloasunnon poissaolo ei osoita koko rakennuksen olevan asumaton. Yhteisten järjestelmien toimet sovitaan huollon kanssa.',
        en: "Check the building safety instruction's applicability in the policy schedule. One terraced-home resident's absence does not establish that the whole building is unoccupied. Agree shared-system measures with maintenance.",
      },
    },
    {
      id: 'absence-oma-monitoring',
      publisher: 'If',
      title: 'Kodin Omaisuusvakuutusehdot – valvonta ja lukitus',
      url: 'https://www.if.fi/globalassets/fi/pdf/ehdot/kotivakuutusehdot.pdf',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'OMA 200.27',
      effectiveFrom: '2026-01-01',
      locator: 's. 6, 5 ja 5.1 kohta 1; s. 7, 5.5 kohta 2',
      limitation: {
        fi: 'Rakennuksen yleinen kuukausittainen valvonta ja ilman riittävää peruslämpöä jätetyn rakennuksen viikoittainen lämmitystarkistus ovat eri ohjeita. Kumpikaan ei yksin todista olosuhteita turvallisiksi.',
        en: 'General monthly building monitoring and weekly heating checks for a building without sufficient background heat are different instructions. Neither alone proves safe conditions.',
      },
    },
    {
      id: 'absence-if-general-terms',
      publisher: 'If',
      title: 'Yleiset sopimusehdot – suojeluohjeiden noudattaminen',
      url: 'https://www.if.fi/globalassets/fi/pdf/ehdot/yleiset-sopimusehdot.pdf',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'YLE 900.14',
      effectiveFrom: '2025-07-01',
      locator: 's. 1, soveltaminen; s. 4, 5.1.1',
      limitation: {
        fi: 'Vakuutuskirjassa mainittuihin sopimuksiin sovellettava ehto. Tahallinen tai vähäistä suuremmasta huolimattomuudesta johtuva laiminlyönti voi vaikuttaa korvaukseen. Ehto ei anna yleistä vähennysprosenttia.',
        en: 'Applies to contracts specified in the policy schedule. Intentional failure or negligence greater than minor may affect compensation. The condition provides no universal deduction percentage.',
      },
    },
    {
      id: 'absence-if-water-guidance',
      publisher: 'If',
      title: 'Jos kodissasi sattuu vesivahinko vuodon tai putkirikon takia',
      url: 'https://www.if.fi/henkiloasiakkaat/vahingot/koti-ja-omaisuus/vesivahinko',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'Verkkosivu, ei julkaistua versionumeroa',
      locator:
        'Toimintaohjeet vesi- ja vuotovahingoissa → Kerros- tai rivitalo; Suojeluohjeet',
      limitation: {
        fi: 'Rivitalon vahinkotilanteessa yhteys huoltoon tai isännöitsijään. Ennakkoon sovittava vastuunjako on demon valmistautumisehdotus. Sivun sulkuventtiili/pumppu-tiivistelmä eroaa varsinaisen ehdon ja-sanamuodosta; sääntö perustuu PDF-ehtoon.',
        en: "Contact maintenance or the property manager for a leak in a terraced home. Agreeing responsibilities in advance is demo preparation. The web summary differs from the actual condition's wording; the rule follows the PDF terms.",
      },
    },
    {
      id: 'absence-if-neighbor',
      publisher: 'If',
      title: 'Näin estät asuntomurrot',
      url: 'https://www.if.fi/henkiloasiakkaat/vakuutukset/kotivakuutus/kodin-turvallisuus/murtojen-estaminen',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'Verkkosivu, ei julkaistua versionumeroa',
      locator: '3. Lukitse ikkunat ja ovet; 5. Luota naapuriapuun',
      limitation: {
        fi: 'Kuluttajaohje naapuriavusta ja postien noudosta, ei vaatimus nimetä talonvahtia seitsemän päivän kohdalla eikä lupaus murron estymisestä.',
        en: 'Consumer guidance about neighbourly help and collecting mail, not a requirement to name a caretaker at seven days or a guarantee against burglary.',
      },
    },
    {
      id: 'absence-if-travel',
      publisher: 'If',
      title: 'Matkavakuutus',
      url: 'https://www.if.fi/henkiloasiakkaat/vakuutukset/matkavakuutus',
      status: 'verified',
      checkedAt: '2026-10-17',
      version: 'Tuotesivu, tarkistettu 17.10.2026',
      locator:
        'Miksi ottaa matkavakuutus Ifistä?; Ifin matka-apu; Mitä matkavakuutus sisältää?',
      limitation: {
        fi: 'Tukee matka-avun olemassaoloa. Esimerkkitehtävä on toimituksellinen valmistelu; sivu ei vahvista valitun asiakkaan sopimusta, matkan kattavuutta tai yhteystietoja.',
        en: "Supports the existence of travel assistance. The example task is editorial preparation; the page does not verify this customer's contract, trip cover or contact details.",
      },
    },
  ],
  rules: {
    extendedAbsence: {
      status: 'verified',
      sourceIds: ['absence-oma-water'],
      durationDaysGreaterThan: 7,
      seasons: ['winter', 'summer'],
      requiresUnoccupiedBuilding: true,
      applicability: 'checkPolicyAndBuildingResponsibilities',
      closeBuildingInternalMainValve: true,
      turnOffDomesticWaterPumpIfPresent: true,
      closeBeforeWaterMeterIfPresent: true,
      limitation: {
        fi: 'Ehdon rajana on yli viikko, ei tasan seitsemän päivää. Rakennuksen asumattomuutta tai sopimuksen soveltuvuutta ei päätellä asukkaan loman pituudesta.',
        en: "The condition refers to more than one week, not exactly seven days. A resident's holiday length does not establish whether the building is unoccupied or the policy condition applies.",
      },
    },
    winterHeating: {
      status: 'verified',
      sourceIds: ['absence-oma-water'],
      seasons: ['winter'],
      minimumTemperatureC: null,
      limitation: {
        fi: 'Ehto vaatii riittävää lämmitystä, mutta ei määritä kaikille kodeille +12–15 °C:n vähimmäistä. Demon vuodenaika ei mittaa säätä, putkien lämpöä tai jäätymisriskiä.',
        en: "The condition requires sufficient heating; it does not set a universal minimum of +12–15 °C. The demo's season does not measure weather, pipe temperature or freezing risk.",
      },
    },
    insufficientBaseHeat: {
      status: 'verified',
      sourceIds: ['absence-oma-water', 'absence-oma-monitoring'],
      condition: 'coldSeasonWithoutSufficientBaseHeat',
      drainLviAndPipework: true,
      maintainWaterMeterRoomHeat: true,
      heatingVisitAtLeastEveryDays: 7,
      limitation: {
        fi: 'Viikoittainen lämmityksen tarkistus liittyy tähän erityistilanteeseen. Demo ei oleta rakennusta kylmilleen jätetyksi eikä ohjaa asukasta itse tyhjentämään yhteisiä järjestelmiä.',
        en: 'Weekly heating checks relate to this specific situation. The demo does not assume the building is unheated or instruct a resident to drain shared systems themselves.',
      },
    },
    buildingMonitoring: {
      status: 'verified',
      sourceIds: ['absence-oma-monitoring'],
      minimumVisitFrequency: 'atLeastOnceAMonth',
      limitation: {
        fi: 'Yleinen rakennuksen valvontaohje. Kuukautta ei muuteta automaattisesti 30 päivän rajaksi eikä 14 päivän matka tarkoita velvollisuutta nimetä tietty henkilö. Tarkista soveltuva ohje.',
        en: 'General building monitoring guidance. A month is not automatically treated as 30 days; a 14-day trip does not itself require a named helper. Check the applicable instructions.',
      },
    },
    priorityEscalation: {
      status: 'illustrative',
      sourceIds: ['absence-oma-water', 'absence-if-neighbor'],
      durationDaysGreaterThan: 7,
      taskIds: ['water-plan', 'caretaker'],
      priority: 'critical',
      limitation: {
        fi: 'Demon huomiojärjestys. Kriittinen-merkintä tai talonvahdin nimeäminen ei ole erillinen vakuutusehto eikä korvauspäätös.',
        en: 'Demo priorities only. A critical label or naming a helper is not an additional policy condition or a claim decision.',
      },
    },
    compensation: {
      status: 'verified',
      sourceIds: ['absence-if-general-terms'],
      reductionPercent: null,
      calculationEnabled: false,
      limitation: {
        fi: 'Laiminlyönnin seurausta ei voi päätellä tästä tehtävälistasta. Ei yleistä 20–100 %:n asteikkoa tai automaattista korvauksen alenemaa.',
        en: 'The consequences of a failure cannot be inferred from this checklist. There is no general 20–100% scale or automatic reduction of compensation.',
      },
    },
    tripDates: {
      status: 'illustrative',
      sourceIds: ['absence-if-neighbor'],
      departureBySeason: {
        winter: '2026-02-15',
        summer: '2026-07-15',
      },
      returnDateBasis: 'departurePlusDurationCalendarDays',
      limitation: {
        fi: 'Kuvitteelliset päivät. Kesävalinta vaihtaa myös lähtöpäivän heinäkuulle; kesto määrää paluun. Päivät eivät ole varaustietoja.',
        en: 'Fictional dates. Summer also moves the departure to July; duration determines the return. These are not booking details.',
      },
    },
  },
  insights: {
    preparation: {
      title: {
        fi: 'Poissaolon valmistelut',
        en: 'Prepare for time away',
      },
      status: 'illustrative',
      sourceIds: ['absence-oma-water', 'absence-oma-monitoring'],
      pendingLabel: {
        fi: 'Valmisteluja vielä avoinna',
        en: 'Some preparations are still open',
      },
      completedLabel: {
        fi: 'Näkyvät tehtävät merkitty tehdyiksi esimerkissä',
        en: 'Visible tasks marked complete in the example',
      },
      text: {
        fi: 'Tehtävälista auttaa sopimaan käytännön toimista ennen lähtöä.',
        en: 'The checklist helps you agree practical steps before leaving.',
      },
      limitation: {
        fi: 'Merkinnät ovat käyttäjän esimerkkivalintoja. Ne eivät varmista suojeluohjeiden täyttymistä tai vakuutuksen kattavuutta.',
        en: 'Ticks are example selections. They do not establish compliance with safety instructions or insurance cover.',
      },
    },
    winter: {
      title: {
        fi: 'Varmista riittävä lämmitys',
        en: 'Ensure sufficient heating',
      },
      status: 'verified',
      sourceIds: ['absence-oma-water'],
      text: {
        fi: 'Huolehdi kylmänä vuodenaikana riittävästä lämmityksestä. Jos rakennus jää ilman riittävää peruslämpöä, tarvitaan erilliset toimet: putkiston tyhjennys, vesimittaritilan lämpö ja viikoittainen lämmitystarkistus.',
        en: 'Keep the building sufficiently heated during the cold season. If adequate background heating is unavailable, separate measures are needed: draining pipes, heating the water meter space and checking heating weekly.',
      },
      limitation: {
        fi: 'Sovi kohdekohtaiset toimet huollon tai ammattilaisen kanssa. Pelkkä termostaatin lukema ei vahvista kaikkien putkien olosuhteita.',
        en: 'Agree measures for this property with maintenance or a professional. A thermostat reading alone does not establish conditions around all pipes.',
      },
    },
    water: {
      title: {
        fi: 'Yli viikon poissaolo: selvitä veden sulku',
        en: 'Away over a week: clarify the water shut-off',
      },
      status: 'verified',
      sourceIds: ['absence-oma-water', 'absence-if-water-guidance'],
      text: {
        fi: 'Rakennusta koskeva ehto edellyttää yli viikon asumattomuudessa pääsulun sulkemista ja käyttövesipumpun poiskytkentää. Vesimittarillisessa kohteessa sulku tehdään ennen mittaria.',
        en: 'The building condition requires closing the main valve and switching off the domestic water pump when unoccupied for more than a week. Where there is a water meter, the valve is closed before it.',
      },
      limitation: {
        fi: 'Rivitalossa yhden asunnon loma ei tarkoita koko rakennuksen asumattomuutta. Selvitä huollosta oman asunnon toimet; yhteisen pääsulun käyttöä ei delegoida naapurille.',
        en: "One terraced-home resident's holiday does not make the whole building unoccupied. Ask maintenance about your own apartment; do not delegate a shared main valve to a neighbour.",
      },
    },
    consequences: {
      title: {
        fi: 'Miksi suojeluohjeet kannattaa tarkistaa?',
        en: 'Why check the safety instructions?',
      },
      status: 'verified',
      sourceIds: ['absence-if-general-terms'],
      text: {
        fi: 'Suojeluohjeen tahallinen tai vähäistä suuremmasta huolimattomuudesta johtuva laiminlyönti voi johtaa korvauksen alentamiseen tai epäämiseen.',
        en: 'Intentional failure to follow a safety instruction, or negligence greater than minor, may lead to reduced or refused compensation.',
      },
      limitation: {
        fi: 'Demo ei arvioi laiminlyöntiä, huolimattomuutta eikä korvausseurausta. Tarkista oma vakuutuskirja ja siihen liittyvät ehdot.',
        en: 'The demo does not assess a failure, negligence or its effect on compensation. Check your own policy schedule and applicable terms.',
      },
    },
  },
  tasks: [
    {
      id: 'water-plan',
      title: {
        fi: 'Sovi veden sulusta huollon kanssa',
        en: 'Agree the water shut-off with maintenance',
      },
      why: {
        fi: 'Selvitä oman asunnon sulut ja soveltuvat poissaolo-ohjeet ennen lähtöä.',
        en: "Identify your apartment's valves and applicable absence instructions before leaving.",
      },
      priority: 'high',
      status: 'illustrative',
      sourceIds: ['absence-oma-water', 'absence-if-water-guidance'],
      delegatable: false,
      limitation: {
        fi: 'Valmistautumistehtävä rivitalon esimerkkiasukkaalle. OMA-ehdon rakennussääntöä ei sovelleta automaattisesti huoneistoon. Älä käytä yhteisiä venttiilejä ilman sovittua menettelyä.',
        en: 'Preparation for a fictional terraced-home resident. The OMA building condition is not automatically applied to an apartment. Do not operate shared valves without an agreed procedure.',
      },
    },
    {
      id: 'heating',
      title: {
        fi: 'Varmista lämmitys ja sovi sen seurannasta',
        en: 'Check heating and agree how to monitor it',
      },
      why: {
        fi: 'Sovi kohteeseen sopivat asetukset ja toimintatapa, jos lämmitys ei toimi.',
        en: 'Agree suitable settings for the property and what to do if heating fails.',
      },
      priority: 'high',
      status: 'illustrative',
      sourceIds: ['absence-oma-water'],
      when: {
        season: 'winter',
      },
      delegatable: true,
      delegationText: {
        fi: 'Tarkista sovitusti, että lämmitys toimii. Kerro poikkeamista meille ja huollolle.',
        en: 'Check that the heating works as agreed. Tell us and maintenance about anything unusual.',
      },
      limitation: {
        fi: 'Naapurin havainto ei ole tekninen tarkastus. Ei kaikille kodeille sopivaa astelukua tai automaattista viikoittaista käyntipakkoa.',
        en: "A neighbour's observation is not a technical inspection. No universal temperature or automatic weekly visit requirement is implied.",
      },
    },
    {
      id: 'caretaker',
      title: {
        fi: 'Sovi läheisen kanssa tehtävät ja yhteydenpito',
        en: 'Agree tasks and contact arrangements with a helper',
      },
      why: {
        fi: 'Varmista, kuka voi auttaa ja miten hän saa sinut ja huollon kiinni.',
        en: 'Confirm who can help and how they can reach you and building maintenance.',
      },
      priority: 'medium',
      status: 'illustrative',
      sourceIds: ['absence-if-neighbor', 'absence-oma-monitoring'],
      delegatable: false,
      limitation: {
        fi: 'Sopimisen ehdotus. Luonnoksen valinta ei tarkoita, että Pekka olisi saanut tai hyväksynyt tehtäviä. Nimeäminen yli viikon kohdalla ei ole erillinen sopimusehto.',
        en: 'A suggestion for making arrangements. Selecting a draft does not mean Pekka received or accepted tasks. Naming someone after one week is not an additional policy condition.',
      },
    },
    {
      id: 'appliance-taps',
      title: {
        fi: 'Sulje pesukoneiden vesihanat',
        en: 'Close washing machine and dishwasher water taps',
      },
      why: {
        fi: 'Pesukoneen sulkuventtiilin tulee olla kiinni, kun konetta ei käytetä.',
        en: 'The appliance shut-off valve must be closed when the appliance is not in use.',
      },
      priority: 'high',
      status: 'verified',
      sourceIds: ['absence-oma-water'],
      delegatable: false,
      limitation: {
        fi: 'Noudata laitteen ja asennuksen ohjeita. Laitteen hana on eri asia kuin rakennuksen yhteinen pääsulku.',
        en: "Follow the appliance and installation instructions. An appliance tap is separate from the building's shared main valve.",
      },
    },
    {
      id: 'locks',
      title: {
        fi: 'Lukitse ovet ja ikkunat ennen lähtöä',
        en: 'Lock doors and windows before leaving',
      },
      why: {
        fi: 'Tarkista kodin lukitus osana lähtövalmisteluja.',
        en: "Check your home's locks as part of the preparations.",
      },
      priority: 'high',
      status: 'verified',
      sourceIds: ['absence-oma-monitoring', 'absence-if-neighbor'],
      delegatable: false,
      limitation: {
        fi: 'Tämä ei ole kaikkien murtoriskien tai lukitusehtojen tarkastus.',
        en: 'This is not a review of every burglary risk or locking condition.',
      },
    },
    {
      id: 'mailbox',
      title: {
        fi: 'Sovi postilaatikon tyhjennyksestä',
        en: 'Arrange for someone to empty the mailbox',
      },
      why: {
        fi: 'If suosittelee naapuriapua, jotta koti näyttää asutulta loman aikana.',
        en: 'If recommends neighbourly help so the home looks occupied during a holiday.',
      },
      priority: 'recommendation',
      status: 'verified',
      sourceIds: ['absence-if-neighbor'],
      delegatable: true,
      delegationText: {
        fi: 'Tyhjennä postilaatikko sovitusti.',
        en: 'Empty the mailbox as agreed.',
      },
      limitation: {
        fi: 'Vapaaehtoinen naapuriapu ei takaa murron estymistä. Sovi käytännöistä läheisen kanssa itse.',
        en: 'Voluntary neighbourly help does not guarantee prevention of burglary. Agree the arrangements with the helper yourself.',
      },
    },
    {
      id: 'travel-documents',
      title: {
        fi: 'Kokoa oman matkavakuutuksen tiedot',
        en: 'Gather your travel insurance details',
      },
      why: {
        fi: 'Pidä vakuutuskirja ja matka-avun yhteystiedot saatavilla ennen esimerkkimatkaa.',
        en: 'Keep your policy schedule and travel assistance contacts available before the example trip.',
      },
      priority: 'recommendation',
      status: 'illustrative',
      sourceIds: ['absence-if-travel'],
      requiresPolicyType: 'travel',
      delegatable: false,
      limitation: {
        fi: 'Näkyy vain matkavakuutuksen sisältävässä esimerkkiprofiilissa. Tämä on tietojen kokoamista, ei voimassaolon tai korvattavuuden tarkistus. Yhteystietoja ei haeta eikä palveluun yhdistetä.',
        en: 'Shown only for a profile with travel insurance. This gathers details; it does not check validity or cover. No contacts are retrieved and no service connection is opened.',
      },
    },
  ],
  delegation: {
    title: {
      fi: 'Jaettava tehtäväviesti läheiselle',
      en: 'A task message to share with your helper',
    },
    status: 'illustrative',
    sourceIds: ['absence-if-neighbor', 'absence-oma-water'],
    introTemplate: {
      fi: 'Hei {neighborName}! Olemme poissa {departureDate}–{returnDate} ({durationDays} vrk). Voisitko auttaa näissä tehtävissä?',
      en: 'Hi {neighborName}! We are away {departureDate}–{returnDate} ({durationDays} days). Could you help with these tasks?',
    },
    includeOnlyVisibleAssignedIncompleteTasks: true,
    emptyText: {
      fi: 'Ei avoimia läheiselle valittuja tehtäviä. Voit valita tehtävän viestiin.',
      en: 'No open tasks selected for the helper. You can add a task to the message.',
    },
    closingText: {
      fi: 'Sovitaan käynnit ja yhteydenpito erikseen. Kerro, sopiiko tämä sinulle.',
      en: "Let's agree visits and contact arrangements separately. Please let us know if this works for you.",
    },
    limitation: {
      fi: 'Luonnos vain kuvitteellisilla tiedoilla. Ei jaettavaa verkkolinkkiä, toimituskuittausta tai vahvistettua avun sopimista.',
      en: 'Draft using fictional details only. There is no shareable link, delivery receipt or confirmed arrangement.',
    },
  },
  actions: [
    {
      id: 'copy-message',
      label: {
        fi: 'Kopioi tehtäväviesti',
        en: 'Copy task message',
      },
      title: {
        fi: 'Viesti kopioitavaksi',
        en: 'Message ready to copy',
      },
      status: 'illustrative',
      sourceIds: ['absence-if-neighbor'],
      confirmation: {
        fi: 'Viesti kopioitu. Mitään ei lähetetty.',
        en: 'Message copied. Nothing was sent.',
      },
      fallbackLabel: {
        fi: 'Kopiointi ei onnistunut. Valitse viesti tästä ja kopioi itse.',
        en: 'Copying was unavailable. Select the message here and copy it manually.',
      },
      emptyLabel: {
        fi: 'Valitse ensin avoin tehtävä läheisen viestiin.',
        en: "First select an open task for the helper's message.",
      },
      limitation: {
        fi: 'Kopiointi ei avaa WhatsAppia tai tekstiviestiä eikä lähetä viestiä. Epäonnistunut kopiointi näyttää valittavan tekstin.',
        en: 'Copying does not open WhatsApp or SMS, or send a message. If copying fails, selectable text remains available.',
      },
    },
  ],
  business: {
    status: 'illustrative',
    label: {
      fi: 'Liiketoimintahypoteesi',
      en: 'Business hypothesis',
    },
    sourceIds: ['absence-oma-water', 'absence-if-neighbor'],
    text: {
      fi: 'Poissaolon valmistelut ja selkeä tehtäväviesti voivat helpottaa ehkäisevien toimien sopimista.',
      en: 'Departure preparations and a clear task message could help people agree preventive measures.',
    },
    proposedMetrics: [
      {
        fi: 'Valmistelutehtävien valmistumisaste',
        en: 'Preparation task completion rate',
      },
      {
        fi: 'Tehtäväviestin kopiointien osuus',
        en: 'Share of task messages copied',
      },
      {
        fi: 'Ohjeiden ymmärtäminen käyttäjätestissä',
        en: 'Understanding the instructions in user testing',
      },
    ],
    limitation: {
      fi: 'Ehdotettuja pilotin mittareita. Kopiointi ei osoita lähettämistä tai tehtävien toteutumista. Vahinkosäästöä, asiakaspysyvyyttä tai kumppanituloa ei ole mitattu.',
      en: 'Proposed pilot measures. Copying does not prove sending or task completion. Claims savings, retention and partner revenue have not been measured.',
    },
  },
  audiences: {
    visitor: {
      caseIntro: {
        fi: 'Lähdössä matkalle? Kokoa kodin valmistelut ja mieti, mitä kodin ja matkan turvasta pitäisi selvittää.',
        en: 'Going away? Plan the preparations at home and identify what to ask about home and travel cover.',
      },
      contextTitle: {
        fi: 'Suunnittele ensimmäiset lähtövalmistelut',
        en: 'Plan your departure preparations',
      },
      progressTitle: {
        fi: 'Valmistelut ennen turvan valintaa',
        en: 'Preparations before choosing cover',
      },
    },
    customer: {
      caseIntro: {
        fi: 'Valmistele koti poissaoloon ja tarkista oman sopimuksesi ohjeet. Matkavakuutuksen sisältävä esimerkki nostaa myös matkatiedot tehtäviin.',
        en: 'Prepare your home for time away and review the instructions in your own contract. A setup with travel insurance also adds gathering your travel policy details.',
      },
      contextTitle: {
        fi: 'Oman kotisi ja matkasi valmistelut',
        en: 'Prepare your home and policy details',
      },
      progressTitle: {
        fi: 'Omien lähtötehtävien tilanne',
        en: 'Your departure task progress',
      },
    },
  },
};
