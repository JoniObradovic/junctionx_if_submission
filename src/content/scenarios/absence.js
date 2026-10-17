export default {
  schemaVersion: 1,
  title: 'Koti tyhjillään',
  presentation: {
    contextTitle: 'Matkasi valmistelut',
    tripTemplate: '{season} {durationDays} vrk – Rivitalo, sähkölämmitys',
    tripLabels: {
      winter: 'Talviloma',
      summer: 'Kesäloma',
    },
    tasksTitle: 'Ennen kuin suljet oven',
    waterTitle: 'Vesi ja vesihanat',
    heatingTitle: 'Lämmitys ja seuranta',
    departureTitle: 'Lukitus ja läheisen apu',
    progressTitle: 'Lähtövalmistelujen tilanne',
    progressNotice:
      'Mittari kuvaa näkyvien esimerkkitehtävien merkintöjä, ei kodin turvallisuutta, vakuutusturvaa tai alennusta.',
    priorityNotice:
      'Yli viikon kohdalla korostuvat tehtävät ovat demon huomiojärjestys, eivät erillisiä vakuutusehtoja.',
    assignLabel: 'Lisää läheisen viestiin',
    notSent:
      'Luonnos. Mitään ei lähetetty eikä läheinen ole hyväksynyt tehtäviä.',
    manualCopyLabel:
      'Valittava viestiluonnos · voit kopioida tekstin myös itse',
    invalidTripLabel: 'Matkan päiviä ei voida laskea näillä tiedoilla.',
    scopeLabel: 'Soveltuvuus tarkistetaan kohteen ja huollon kanssa',
  },
  persona: 'Talviloma 14 vrk (15.2.–1.3.) – Rivitalo, sähkölämmitys',
  referenceYear: 2026,
  demoNotice:
    'Kuvitteellinen matka ja läheinen. Vakuutusturvaa, taloyhtiön ohjeita tai kodin olosuhteita ei ole tarkistettu.',
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
      label: 'Vuodenaika',
      options: [
        {
          value: 'winter',
          label: 'Talvi (Pakkaskausi)',
        },
        {
          value: 'summer',
          label: 'Kesä',
        },
      ],
      help: 'Talvivalinta tuo esiin lämmityksen ja jäätymisen ehkäisyn.',
    },
    {
      id: 'durationDays',
      type: 'range',
      min: 2,
      max: 30,
      step: 1,
      label: 'Poissaolon kesto (vrk)',
      help: 'Paluu lasketaan lähtöpäivästä. Yli viikon kohdalla veden sulun selvittäminen korostuu.',
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
      limitation:
        'Rakennusta koskevan suojeluohjeen soveltuvuus on tarkistettava vakuutuskirjasta. Yhden rivitaloasunnon poissaolo ei osoita koko rakennuksen olevan asumaton. Yhteisten järjestelmien toimet sovitaan huollon kanssa.',
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
      limitation:
        'Rakennuksen yleinen kuukausittainen valvonta ja ilman riittävää peruslämpöä jätetyn rakennuksen viikoittainen lämmitystarkistus ovat eri ohjeita. Kumpikaan ei yksin todista olosuhteita turvallisiksi.',
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
      limitation:
        'Vakuutuskirjassa mainittuihin sopimuksiin sovellettava ehto. Tahallinen tai vähäistä suuremmasta huolimattomuudesta johtuva laiminlyönti voi vaikuttaa korvaukseen. Ehto ei anna yleistä vähennysprosenttia.',
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
      limitation:
        'Rivitalon vahinkotilanteessa yhteys huoltoon tai isännöitsijään. Ennakkoon sovittava vastuunjako on demon valmistautumisehdotus. Sivun sulkuventtiili/pumppu-tiivistelmä eroaa varsinaisen ehdon ja-sanamuodosta; sääntö perustuu PDF-ehtoon.',
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
      limitation:
        'Kuluttajaohje naapuriavusta ja postien noudosta, ei vaatimus nimetä talonvahtia seitsemän päivän kohdalla eikä lupaus murron estymisestä.',
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
      limitation:
        'Tukee matka-avun olemassaoloa. Esimerkkitehtävä on toimituksellinen valmistelu; sivu ei vahvista valitun asiakkaan sopimusta, matkan kattavuutta tai yhteystietoja.',
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
      limitation:
        'Ehdon rajana on yli viikko, ei tasan seitsemän päivää. Rakennuksen asumattomuutta tai sopimuksen soveltuvuutta ei päätellä asukkaan loman pituudesta.',
    },
    winterHeating: {
      status: 'verified',
      sourceIds: ['absence-oma-water'],
      seasons: ['winter'],
      minimumTemperatureC: null,
      limitation:
        'Ehto vaatii riittävää lämmitystä, mutta ei määritä kaikille kodeille +12–15 °C:n vähimmäistä. Demon vuodenaika ei mittaa säätä, putkien lämpöä tai jäätymisriskiä.',
    },
    insufficientBaseHeat: {
      status: 'verified',
      sourceIds: ['absence-oma-water', 'absence-oma-monitoring'],
      condition: 'coldSeasonWithoutSufficientBaseHeat',
      drainLviAndPipework: true,
      maintainWaterMeterRoomHeat: true,
      heatingVisitAtLeastEveryDays: 7,
      limitation:
        'Viikoittainen lämmityksen tarkistus liittyy tähän erityistilanteeseen. Demo ei oleta rakennusta kylmilleen jätetyksi eikä ohjaa asukasta itse tyhjentämään yhteisiä järjestelmiä.',
    },
    buildingMonitoring: {
      status: 'verified',
      sourceIds: ['absence-oma-monitoring'],
      minimumVisitFrequency: 'atLeastOnceAMonth',
      limitation:
        'Yleinen rakennuksen valvontaohje. Kuukautta ei muuteta automaattisesti 30 päivän rajaksi eikä 14 päivän matka tarkoita velvollisuutta nimetä tietty henkilö. Tarkista soveltuva ohje.',
    },
    priorityEscalation: {
      status: 'illustrative',
      sourceIds: ['absence-oma-water', 'absence-if-neighbor'],
      durationDaysGreaterThan: 7,
      taskIds: ['water-plan', 'caretaker'],
      priority: 'critical',
      limitation:
        'Demon huomiojärjestys. Kriittinen-merkintä tai talonvahdin nimeäminen ei ole erillinen vakuutusehto eikä korvauspäätös.',
    },
    compensation: {
      status: 'verified',
      sourceIds: ['absence-if-general-terms'],
      reductionPercent: null,
      calculationEnabled: false,
      limitation:
        'Laiminlyönnin seurausta ei voi päätellä tästä tehtävälistasta. Ei yleistä 20–100 %:n asteikkoa tai automaattista korvauksen alenemaa.',
    },
    tripDates: {
      status: 'illustrative',
      sourceIds: ['absence-if-neighbor'],
      departureBySeason: {
        winter: '2026-02-15',
        summer: '2026-07-15',
      },
      returnDateBasis: 'departurePlusDurationCalendarDays',
      limitation:
        'Kuvitteelliset päivät. Kesävalinta vaihtaa myös lähtöpäivän heinäkuulle; kesto määrää paluun. Päivät eivät ole varaustietoja.',
    },
  },
  insights: {
    preparation: {
      title: 'Poissaolon valmistelut',
      status: 'illustrative',
      sourceIds: ['absence-oma-water', 'absence-oma-monitoring'],
      pendingLabel: 'Valmisteluja vielä avoinna',
      completedLabel: 'Näkyvät tehtävät merkitty tehdyiksi esimerkissä',
      text: 'Tehtävälista auttaa sopimaan käytännön toimista ennen lähtöä.',
      limitation:
        'Merkinnät ovat käyttäjän esimerkkivalintoja. Ne eivät varmista suojeluohjeiden täyttymistä tai vakuutuksen kattavuutta.',
    },
    winter: {
      title: 'Varmista riittävä lämmitys',
      status: 'verified',
      sourceIds: ['absence-oma-water'],
      text: 'Huolehdi kylmänä vuodenaikana riittävästä lämmityksestä. Jos rakennus jää ilman riittävää peruslämpöä, tarvitaan erilliset toimet: putkiston tyhjennys, vesimittaritilan lämpö ja viikoittainen lämmitystarkistus.',
      limitation:
        'Sovi kohdekohtaiset toimet huollon tai ammattilaisen kanssa. Pelkkä termostaatin lukema ei vahvista kaikkien putkien olosuhteita.',
    },
    water: {
      title: 'Yli viikon poissaolo: selvitä veden sulku',
      status: 'verified',
      sourceIds: ['absence-oma-water', 'absence-if-water-guidance'],
      text: 'Rakennusta koskeva ehto edellyttää yli viikon asumattomuudessa pääsulun sulkemista ja käyttövesipumpun poiskytkentää. Vesimittarillisessa kohteessa sulku tehdään ennen mittaria.',
      limitation:
        'Rivitalossa yhden asunnon loma ei tarkoita koko rakennuksen asumattomuutta. Selvitä huollosta oman asunnon toimet; yhteisen pääsulun käyttöä ei delegoida naapurille.',
    },
    consequences: {
      title: 'Miksi suojeluohjeet kannattaa tarkistaa?',
      status: 'verified',
      sourceIds: ['absence-if-general-terms'],
      text: 'Suojeluohjeen tahallinen tai vähäistä suuremmasta huolimattomuudesta johtuva laiminlyönti voi johtaa korvauksen alentamiseen tai epäämiseen.',
      limitation:
        'Demo ei arvioi laiminlyöntiä, huolimattomuutta eikä korvausseurausta. Tarkista oma vakuutuskirja ja siihen liittyvät ehdot.',
    },
  },
  tasks: [
    {
      id: 'water-plan',
      title: 'Sovi veden sulusta huollon kanssa',
      why: 'Selvitä oman asunnon sulut ja soveltuvat poissaolo-ohjeet ennen lähtöä.',
      priority: 'high',
      status: 'illustrative',
      sourceIds: ['absence-oma-water', 'absence-if-water-guidance'],
      delegatable: false,
      limitation:
        'Valmistautumistehtävä rivitalon esimerkkiasukkaalle. OMA-ehdon rakennussääntöä ei sovelleta automaattisesti huoneistoon. Älä käytä yhteisiä venttiilejä ilman sovittua menettelyä.',
    },
    {
      id: 'heating',
      title: 'Varmista lämmitys ja sovi sen seurannasta',
      why: 'Sovi kohteeseen sopivat asetukset ja toimintatapa, jos lämmitys ei toimi.',
      priority: 'high',
      status: 'illustrative',
      sourceIds: ['absence-oma-water'],
      when: {
        season: 'winter',
      },
      delegatable: true,
      delegationText:
        'Tarkista sovitusti, että lämmitys toimii. Kerro poikkeamista meille ja huollolle.',
      limitation:
        'Naapurin havainto ei ole tekninen tarkastus. Ei kaikille kodeille sopivaa astelukua tai automaattista viikoittaista käyntipakkoa.',
    },
    {
      id: 'caretaker',
      title: 'Sovi läheisen kanssa tehtävät ja yhteydenpito',
      why: 'Varmista, kuka voi auttaa ja miten hän saa sinut ja huollon kiinni.',
      priority: 'medium',
      status: 'illustrative',
      sourceIds: ['absence-if-neighbor', 'absence-oma-monitoring'],
      delegatable: false,
      limitation:
        'Sopimisen ehdotus. Luonnoksen valinta ei tarkoita, että Pekka olisi saanut tai hyväksynyt tehtäviä. Nimeäminen yli viikon kohdalla ei ole erillinen sopimusehto.',
    },
    {
      id: 'appliance-taps',
      title: 'Sulje pesukoneiden vesihanat',
      why: 'Pesukoneen sulkuventtiilin tulee olla kiinni, kun konetta ei käytetä.',
      priority: 'high',
      status: 'verified',
      sourceIds: ['absence-oma-water'],
      delegatable: false,
      limitation:
        'Noudata laitteen ja asennuksen ohjeita. Laitteen hana on eri asia kuin rakennuksen yhteinen pääsulku.',
    },
    {
      id: 'locks',
      title: 'Lukitse ovet ja ikkunat ennen lähtöä',
      why: 'Tarkista kodin lukitus osana lähtövalmisteluja.',
      priority: 'high',
      status: 'verified',
      sourceIds: ['absence-oma-monitoring', 'absence-if-neighbor'],
      delegatable: false,
      limitation:
        'Tämä ei ole kaikkien murtoriskien tai lukitusehtojen tarkastus.',
    },
    {
      id: 'mailbox',
      title: 'Sovi postilaatikon tyhjennyksestä',
      why: 'If suosittelee naapuriapua, jotta koti näyttää asutulta loman aikana.',
      priority: 'recommendation',
      status: 'verified',
      sourceIds: ['absence-if-neighbor'],
      delegatable: true,
      delegationText: 'Tyhjennä postilaatikko sovitusti.',
      limitation:
        'Vapaaehtoinen naapuriapu ei takaa murron estymistä. Sovi käytännöistä läheisen kanssa itse.',
    },
    {
      id: 'travel-documents',
      title: 'Kokoa oman matkavakuutuksen tiedot',
      why: 'Pidä vakuutuskirja ja matka-avun yhteystiedot saatavilla ennen esimerkkimatkaa.',
      priority: 'recommendation',
      status: 'illustrative',
      sourceIds: ['absence-if-travel'],
      requiresPolicyType: 'travel',
      delegatable: false,
      limitation:
        'Näkyy vain matkavakuutuksen sisältävässä esimerkkiprofiilissa. Tämä on tietojen kokoamista, ei voimassaolon tai korvattavuuden tarkistus. Yhteystietoja ei haeta eikä palveluun yhdistetä.',
    },
  ],
  delegation: {
    title: 'Jaettava tehtäväviesti läheiselle',
    status: 'illustrative',
    sourceIds: ['absence-if-neighbor', 'absence-oma-water'],
    introTemplate:
      'Hei {neighborName}! Olemme poissa {departureDate}–{returnDate} ({durationDays} vrk). Voisitko auttaa näissä tehtävissä?',
    includeOnlyVisibleAssignedIncompleteTasks: true,
    emptyText:
      'Ei avoimia läheiselle valittuja tehtäviä. Voit valita tehtävän viestiin.',
    closingText:
      'Sovitaan käynnit ja yhteydenpito erikseen. Kerro, sopiiko tämä sinulle.',
    limitation:
      'Luonnos vain kuvitteellisilla tiedoilla. Ei jaettavaa verkkolinkkiä, toimituskuittausta tai vahvistettua avun sopimista.',
  },
  actions: [
    {
      id: 'copy-message',
      label: 'Kopioi tehtäväviesti',
      title: 'Viesti kopioitavaksi',
      status: 'illustrative',
      sourceIds: ['absence-if-neighbor'],
      confirmation: 'Viesti kopioitu. Mitään ei lähetetty.',
      fallbackLabel:
        'Kopiointi ei onnistunut. Valitse viesti tästä ja kopioi itse.',
      emptyLabel: 'Valitse ensin avoin tehtävä läheisen viestiin.',
      limitation:
        'Kopiointi ei avaa WhatsAppia tai tekstiviestiä eikä lähetä viestiä. Epäonnistunut kopiointi näyttää valittavan tekstin.',
    },
  ],
  business: {
    status: 'illustrative',
    label: 'Liiketoimintahypoteesi',
    sourceIds: ['absence-oma-water', 'absence-if-neighbor'],
    text: 'Poissaolon valmistelut ja selkeä tehtäväviesti voivat helpottaa ehkäisevien toimien sopimista.',
    proposedMetrics: [
      'Valmistelutehtävien valmistumisaste',
      'Tehtäväviestin kopiointien osuus',
      'Ohjeiden ymmärtäminen käyttäjätestissä',
    ],
    limitation:
      'Ehdotettuja pilotin mittareita. Kopiointi ei osoita lähettämistä tai tehtävien toteutumista. Vahinkosäästöä, asiakaspysyvyyttä tai kumppanituloa ei ole mitattu.',
  },
  english: {
    title: 'Away from home',
    'presentation.tripTemplate':
      '{season} for {durationDays} days – Terraced home, electric heating',
    'presentation.tripLabels.summer': 'Summer holiday',
    'presentation.heatingTitle': 'Heating and monitoring',
    'presentation.departureTitle': 'Locks and help from someone you trust',
    'presentation.progressTitle': 'Departure preparations',
    'presentation.progressNotice':
      'This indicator counts completed example tasks, not home safety, insurance cover or a discount.',
    'presentation.priorityNotice':
      "Tasks highlighted after one week reflect the demo's priorities, not additional policy conditions.",
    'presentation.assignLabel': "Add to the helper's message",
    'presentation.notSent':
      'Draft only. Nothing was sent and the helper has not accepted any tasks.',
    'presentation.manualCopyLabel':
      'Selectable message draft · you can also copy the text manually',
    'presentation.invalidTripLabel':
      'The trip dates cannot be calculated from these details.',
    'presentation.scopeLabel': 'Check applicability with building maintenance',
    persona:
      'Winter holiday, 14 days (15 February–1 March) – Terraced home, electric heating',
    demoNotice:
      'Fictional trip and helper. Insurance cover, housing company instructions and conditions at home have not been checked.',
    'controls.0.label': 'Season',
    'controls.0.options.0.label': 'Winter (cold season)',
    'controls.0.options.1.label': 'Summer',
    'controls.0.help': 'Winter brings heating and frost prevention into view.',
    'controls.1.label': 'Time away (days)',
    'controls.1.help':
      'The return is calculated from the departure date. After one week, clarifying the water shut-off becomes a priority.',
    'rules.extendedAbsence.limitation':
      "The condition refers to more than one week, not exactly seven days. A resident's holiday length does not establish whether the building is unoccupied or the policy condition applies.",
    'rules.winterHeating.limitation':
      "The condition requires sufficient heating; it does not set a universal minimum of +12–15 °C. The demo's season does not measure weather, pipe temperature or freezing risk.",
    'rules.insufficientBaseHeat.limitation':
      'Weekly heating checks relate to this specific situation. The demo does not assume the building is unheated or instruct a resident to drain shared systems themselves.',
    'rules.buildingMonitoring.limitation':
      'General building monitoring guidance. A month is not automatically treated as 30 days; a 14-day trip does not itself require a named helper. Check the applicable instructions.',
    'rules.priorityEscalation.limitation':
      'Demo priorities only. A critical label or naming a helper is not an additional policy condition or a claim decision.',
    'rules.compensation.limitation':
      'The consequences of a failure cannot be inferred from this checklist. There is no general 20–100% scale or automatic reduction of compensation.',
    'rules.tripDates.limitation':
      'Fictional dates. Summer also moves the departure to July; duration determines the return. These are not booking details.',
    'insights.preparation.title': 'Prepare for time away',
    'insights.preparation.pendingLabel': 'Some preparations are still open',
    'insights.preparation.completedLabel':
      'Visible tasks marked complete in the example',
    'insights.preparation.text':
      'The checklist helps you agree practical steps before leaving.',
    'insights.preparation.limitation':
      'Ticks are example selections. They do not establish compliance with safety instructions or insurance cover.',
    'insights.winter.title': 'Ensure sufficient heating',
    'insights.winter.text':
      'Keep the building sufficiently heated during the cold season. If adequate background heating is unavailable, separate measures are needed: draining pipes, heating the water meter space and checking heating weekly.',
    'insights.winter.limitation':
      'Agree measures for this property with maintenance or a professional. A thermostat reading alone does not establish conditions around all pipes.',
    'insights.water.title': 'Away over a week: clarify the water shut-off',
    'insights.water.text':
      'The building condition requires closing the main valve and switching off the domestic water pump when unoccupied for more than a week. Where there is a water meter, the valve is closed before it.',
    'insights.water.limitation':
      "One terraced-home resident's holiday does not make the whole building unoccupied. Ask maintenance about your own apartment; do not delegate a shared main valve to a neighbour.",
    'insights.consequences.title': 'Why check the safety instructions?',
    'insights.consequences.text':
      'Intentional failure to follow a safety instruction, or negligence greater than minor, may lead to reduced or refused compensation.',
    'insights.consequences.limitation':
      'The demo does not assess a failure, negligence or its effect on compensation. Check your own policy schedule and applicable terms.',
    'tasks.0.title': 'Agree the water shut-off with maintenance',
    'tasks.0.why':
      "Identify your apartment's valves and applicable absence instructions before leaving.",
    'tasks.0.limitation':
      'Preparation for a fictional terraced-home resident. The OMA building condition is not automatically applied to an apartment. Do not operate shared valves without an agreed procedure.',
    'tasks.1.title': 'Check heating and agree how to monitor it',
    'tasks.1.why':
      'Agree suitable settings for the property and what to do if heating fails.',
    'tasks.1.delegationText':
      'Check that the heating works as agreed. Tell us and maintenance about anything unusual.',
    'tasks.1.limitation':
      "A neighbour's observation is not a technical inspection. No universal temperature or automatic weekly visit requirement is implied.",
    'tasks.2.title': 'Agree tasks and contact arrangements with a helper',
    'tasks.2.why':
      'Confirm who can help and how they can reach you and building maintenance.',
    'tasks.2.limitation':
      'A suggestion for making arrangements. Selecting a draft does not mean Pekka received or accepted tasks. Naming someone after one week is not an additional policy condition.',
    'tasks.3.title': 'Close washing machine and dishwasher water taps',
    'tasks.3.why':
      'The appliance shut-off valve must be closed when the appliance is not in use.',
    'tasks.3.limitation':
      "Follow the appliance and installation instructions. An appliance tap is separate from the building's shared main valve.",
    'tasks.4.title': 'Lock doors and windows before leaving',
    'tasks.4.why': "Check your home's locks as part of the preparations.",
    'tasks.4.limitation':
      'This is not a review of every burglary risk or locking condition.',
    'tasks.5.title': 'Arrange for someone to empty the mailbox',
    'tasks.5.why':
      'If recommends neighbourly help so the home looks occupied during a holiday.',
    'tasks.5.delegationText': 'Empty the mailbox as agreed.',
    'tasks.5.limitation':
      'Voluntary neighbourly help does not guarantee prevention of burglary. Agree the arrangements with the helper yourself.',
    'tasks.6.title': 'Gather your travel insurance details',
    'tasks.6.why':
      'Keep your policy schedule and travel assistance contacts available before the example trip.',
    'tasks.6.limitation':
      'Shown only for a profile with travel insurance. This gathers details; it does not check validity or cover. No contacts are retrieved and no service connection is opened.',
    'delegation.title': 'A task message to share with your helper',
    'delegation.introTemplate':
      'Hi {neighborName}! We are away {departureDate}–{returnDate} ({durationDays} days). Could you help with these tasks?',
    'delegation.emptyText':
      'No open tasks selected for the helper. You can add a task to the message.',
    'delegation.closingText':
      "Let's agree visits and contact arrangements separately. Please let us know if this works for you.",
    'delegation.limitation':
      'Draft using fictional details only. There is no shareable link, delivery receipt or confirmed arrangement.',
    'actions.0.label': 'Copy task message',
    'actions.0.title': 'Message ready to copy',
    'actions.0.confirmation': 'Message copied. Nothing was sent.',
    'actions.0.fallbackLabel':
      'Copying was unavailable. Select the message here and copy it manually.',
    'actions.0.emptyLabel':
      "First select an open task for the helper's message.",
    'actions.0.limitation':
      'Copying does not open WhatsApp or SMS, or send a message. If copying fails, selectable text remains available.',
    'business.label': 'Business hypothesis',
    'business.text':
      'Departure preparations and a clear task message could help people agree preventive measures.',
    'business.proposedMetrics.0': 'Preparation task completion rate',
    'business.proposedMetrics.1': 'Share of task messages copied',
    'business.proposedMetrics.2':
      'Understanding the instructions in user testing',
    'business.limitation':
      'Proposed pilot measures. Copying does not prove sending or task completion. Claims savings, retention and partner revenue have not been measured.',
    'presentation.contextTitle': 'Prepare for your trip',
    'presentation.tripLabels.winter': 'Winter holiday',
    'presentation.tasksTitle': 'Before you close the door',
    'presentation.waterTitle': 'Water and taps',
    'sources.0.limitation':
      "Check the building safety instruction's applicability in the policy schedule. One terraced-home resident's absence does not establish that the whole building is unoccupied. Agree shared-system measures with maintenance.",
    'sources.1.limitation':
      'General monthly building monitoring and weekly heating checks for a building without sufficient background heat are different instructions. Neither alone proves safe conditions.',
    'sources.2.limitation':
      'Applies to contracts specified in the policy schedule. Intentional failure or negligence greater than minor may affect compensation. The condition provides no universal deduction percentage.',
    'sources.3.limitation':
      "Contact maintenance or the property manager for a leak in a terraced home. Agreeing responsibilities in advance is demo preparation. The web summary differs from the actual condition's wording; the rule follows the PDF terms.",
    'sources.4.limitation':
      'Consumer guidance about neighbourly help and collecting mail, not a requirement to name a caretaker at seven days or a guarantee against burglary.',
    'sources.5.limitation':
      "Supports the existence of travel assistance. The example task is editorial preparation; the page does not verify this customer's contract, trip cover or contact details.",
    'audiences.visitor.caseIntro':
      'Going away? Plan the preparations at home and identify what to ask about home and travel cover.',
    'audiences.visitor.contextTitle': 'Plan your departure preparations',
    'audiences.visitor.progressTitle': 'Preparations before choosing cover',
    'audiences.customer.caseIntro':
      'Prepare your home for time away and review the instructions in your own contract. A setup with travel insurance also adds gathering your travel policy details.',
    'audiences.customer.contextTitle': 'Prepare your home and policy details',
    'audiences.customer.progressTitle': 'Your departure task progress',
  },
  audiences: {
    visitor: {
      caseIntro:
        'Lähdössä matkalle? Kokoa kodin valmistelut ja mieti, mitä kodin ja matkan turvasta pitäisi selvittää.',
      contextTitle: 'Suunnittele ensimmäiset lähtövalmistelut',
      progressTitle: 'Valmistelut ennen turvan valintaa',
    },
    customer: {
      caseIntro:
        'Valmistele koti poissaoloon ja tarkista oman sopimuksesi ohjeet. Matkavakuutuksen sisältävä esimerkki nostaa myös matkatiedot tehtäviin.',
      contextTitle: 'Oman kotisi ja matkasi valmistelut',
      progressTitle: 'Omien lähtötehtävien tilanne',
    },
  },
};
