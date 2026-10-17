window.IF_KNOWLEDGE = window.IF_KNOWLEDGE || {};

window.IF_KNOWLEDGE.pet = {
  "schemaVersion": 1,
  "title": "Lemmikin vointi",
  "presentation": {
    "contextTitle": "Kerro esimerkkihavainnot",
    "tasksTitle": "Vapaaehtoiset esitietojen valmistelut",
    "progressTitle": "Tietojen kokoamisen merkinnät",
    "progressNotice": "Tietojen täydentäminen ei saa viivästyttää yhteydenottoa. Merkinnät eivät ole tutkimustuloksia, paranemisarvio tai alennuksen peruste.",
    "observationsTitle": "Jo tiedossa olevat havainnot",
    "serviceEligibilityLabel": "Esimerkin palveluoikeus: ei vahvistettu",
    "serviceHoursTemplate": "Chat ja video arkisin {weekday}, viikonloppuisin {weekend}. Muulloin: {otherTimes}.",
    "packetLabel": "Paikallinen esitietoluonnos · voit valita ja kopioida tekstin",
    "durationLabel": "Oireiden kesto",
    "symptomsLabel": "Valitut oirehavainnot",
    "emergencyLabel": "Valitut vaaranmerkit",
    "routeLabel": "Ohjaus tässä esimerkissä",
    "notSent": "Kuvitteellinen luonnos. Mitään ei lähetetty eikä yhteyttä avattu.",
    "guidancePrompt": "Älä odota esitietojen valmistumista tai etäpalvelua.",
    "showGuidanceLabel": "Näytä toimintaohje",
    "insuredContactTitle": "If Eläinapu · eläinlääkärin apua 24/7",
    "insuredUrgentTitle": "Ota yhteys nyt · If Eläinapu 24/7",
    "channelDetailsLabel": "Kanavat, lähteet ja palvelun rajat"
  },
  "persona": "Hilla – Kultainennoutaja, 4 v, 28 kg",
  "referenceYear": 2026,
  "demoNotice": "Kuvitteellinen koira ja havainnot. Älä syötä oikeita terveystietoja. Demo ei tutki eläintä tai määritä diagnoosia.",
  "animal": {
    "name": "Hilla",
    "species": "dog",
    "breed": "Kultainennoutaja",
    "ageYears": 4,
    "weightKg": 28
  },
  "defaults": {
    "symptomIds": [
      "vomiting-diarrhea",
      "lethargy"
    ],
    "emergencySignIds": [],
    "duration": "6-24h",
    "observations": {
      "breathing": "unknown",
      "waterRetention": "unknown"
    },
    "completedTaskIds": []
  },
  "controls": [
    {
      "id": "symptomIds",
      "type": "multiChoice",
      "label": "Esimerkkioireet",
      "help": "Valinnat kuvaavat havaintoja, eivät diagnoosia. Valitsematon oire ei tarkoita, että se on varmasti poissuljettu."
    },
    {
      "id": "emergencySignIds",
      "type": "multiChoice",
      "label": "Kiireelliset vaaranmerkit",
      "help": "Kiireellinen oire ohittaa etäpalvelun. Luettelo ei kata kaikkia hätätilanteita."
    },
    {
      "id": "duration",
      "type": "choice",
      "label": "Oireiden kesto",
      "options": [
        {
          "value": "under-6h",
          "label": "Alle 6 tuntia"
        },
        {
          "value": "6-24h",
          "label": "6–24 tuntia"
        },
        {
          "value": "over-24h",
          "label": "Yli 24 tuntia"
        }
      ],
      "help": "Lyhyt kesto ei sulje pois kiireellistä tilannetta. Älä odota seuraavan aikarajan täyttymistä, jos vointi huononee."
    }
  ],
  "sources": [
    {
      "id": "pet-hy-emergency",
      "publisher": "Helsingin yliopisto, Yliopistollinen eläinsairaala",
      "title": "Mitä on päivystyshoito",
      "url": "https://www.helsinki.fi/fi/yliopistollinen-elainsairaala/paivystys/mita-paivystyshoito",
      "status": "verified",
      "checkedAt": "2026-10-17",
      "version": "Verkkosivu, ei julkaistua versionumeroa",
      "locator": "Päivystyksen määritelmä; tyypilliset sairaudet ja omistajan havaitsemat oireet; Saapuminen päivystykseen",
      "limitation": "Yleisiä kiireellisiä vaaranmerkkejä, ei tyhjentävä lista tai etädiagnoosi. Valitse oman alueen päivystys; lähde kuvaa myös Yliopistollisen eläinsairaalan alueellista palvelua."
    },
    {
      "id": "pet-evidensia-gi",
      "publisher": "Evidensia Eläinlääkäriasemat",
      "title": "Oksentelu, ripulointi ja mahakipu voivat kertoa tulehduksesta",
      "url": "https://evidensia.fi/hoitovinkit/koiran-mahasuolikanavan-tulehdukset/",
      "status": "verified",
      "checkedAt": "2026-10-17",
      "version": "Päivitetty 4.10.2024",
      "locator": "Oireet ruansulatuskanavan tulehdustilassa; Akuutin gastroenteriitin hoito",
      "limitation": "Koirien oireita ja eläinlääkäriin hakeutumisen syitä; oireilla voi olla useita syitä. Oksennetun veden ja heikon yleisvoinnin merkitystä ei muuteta kotihoidon sallivaksi diagnoosiksi."
    },
    {
      "id": "pet-clinic-gdv",
      "publisher": "Koirakissaklinikka",
      "title": "Mahalaukun laajentuma ja kiertymä",
      "url": "https://koirakissaklinikka.fi/koira-artikkelit/mahalaukun-laajentuma-ja-kiertyma",
      "status": "verified",
      "checkedAt": "2026-10-17",
      "version": "Verkkosivu, ei julkaistua versionumeroa",
      "locator": "Johdanto ja oirekuvaus ennen hoito-osiota",
      "limitation": "Vatsan turpoaminen ja oksennusyritykset voivat liittyä välitöntä hoitoa vaativaan tilaan. Demo ei diagnosoi kiertymää eikä ohjeista mahalaukun tyhjentämistä tai lääkehoitoa."
    },
    {
      "id": "pet-pyynikki-history",
      "publisher": "Pyynikin eläinlääkärit",
      "title": "Koiralla vatsakipuja? Näin tunnistat vaaran merkit ja toimi oikein",
      "url": "https://pyynikinelainlaakarit.fi/ajankohtaista/koiralla-vatsakipuja-nain-tunnistat-vaaran-merkit-ja-toimi-oikein/",
      "status": "verified",
      "checkedAt": "2026-10-17",
      "version": "Verkkosivu, ei vahvistettua julkaisupäivää",
      "locator": "Milloin ottaa yhteyttä eläinlääkäriin?; luettelo yhteydenotossa kerrottavista tiedoista",
      "limitation": "Tukee esitietojen keräämistä ja yhteydenottoa huonossa yleisvoinnissa. Demon tehtävät eivät ota käyttöön artikkelin paasto-, ruokinta- tai lääkeohjeita eivätkä korvaa tutkimusta."
    },
    {
      "id": "pet-if-service",
      "publisher": "If",
      "title": "Eläinapu – etäeläinlääkärin chat ja päivystys apunasi 24/7",
      "url": "https://www.if.fi/henkiloasiakkaat/vakuutukset/elainvakuutukset/elainapu",
      "status": "verified",
      "checkedAt": "2026-10-17",
      "version": "Palvelusivu, tarkistettu 17.10.2026",
      "locator": "Mitä eläinavusta saa?; Näin käytät eläinapua; Lisätietoa eläinavusta; asiakasetua koskeva loppuhuomautus",
      "limitation": "Ifin koira-, kissa- tai hevosvakuutuksen asiakasetu, jonka sisältö voi muuttua. Ei osa vakuutussopimusta. Demo ei tarkista oikeutta palveluun, kirjaudu tai yhdistä vastaanotolle. Chat/video ja puhelinpäivystys ovat eri kanavia."
    },
    {
      "id": "pet-if-terms",
      "publisher": "If",
      "title": "Eläinvakuutusehdot",
      "url": "https://www.if.fi/globalassets/fi/pdf/ehdot/elainvakuutusehdot.pdf",
      "status": "verified",
      "checkedAt": "2026-10-17",
      "version": "EVA 240.10",
      "effectiveFrom": "2026-01-01",
      "locator": "s. 1 vakuutussopimuksen sisältö; s. 3, 6.4 ja 9",
      "limitation": "Klinikkahoidon omavastuu ja korvattavuus riippuvat sopimuksesta. Asiakasetuun kuuluva maksuton etäpalvelu ei tarkoita maksutonta jatkohoitoa tai vaikutuksettomuutta kaikkiin vakuutustietoihin."
    }
  ],
  "symptoms": [
    {
      "id": "vomiting-diarrhea",
      "label": "Äkillinen oksentelu tai ripuli",
      "status": "verified",
      "sourceIds": [
        "pet-evidensia-gi"
      ],
      "limitation": "Yhdistetty oirevalinta ei erottele määrää, syytä tai vakavuutta."
    },
    {
      "id": "lethargy",
      "label": "Apaattisuus / vetämättömyys",
      "status": "verified",
      "sourceIds": [
        "pet-evidensia-gi",
        "pet-hy-emergency"
      ],
      "limitation": "Yleisvointi on arvioitava kokonaisuutena. Valinta ei ole diagnoosi."
    },
    {
      "id": "limping-wound",
      "label": "Ontuminen tai tassuhaava",
      "status": "illustrative",
      "sourceIds": [
        "pet-if-service",
        "pet-hy-emergency"
      ],
      "limitation": "Oireotsikko palveluohjauksen esimerkkiin. Vakava vamma, kipu tai verenvuoto vaatii kiireellistä arviota."
    },
    {
      "id": "eye-ear",
      "label": "Silmä- tai korvaoire",
      "status": "illustrative",
      "sourceIds": [
        "pet-if-service",
        "pet-hy-emergency"
      ],
      "limitation": "Ei osoita oiretta lieväksi. Silmävamma tai voimakas siristely voi vaatia päivystystä."
    }
  ],
  "emergencySigns": [
    {
      "id": "breathing-difficulty",
      "label": "Hengitys on vaikeaa",
      "status": "verified",
      "sourceIds": [
        "pet-hy-emergency"
      ],
      "limitation": "Älä odota esitietojen valmistumista tai etäyhteyttä."
    },
    {
      "id": "bloat-retching",
      "label": "Vatsa turpoaa tai koira yrittää oksentaa tuloksetta",
      "status": "verified",
      "sourceIds": [
        "pet-hy-emergency",
        "pet-clinic-gdv"
      ],
      "limitation": "Välittömän tutkimuksen tarve; ei kiertymädiagnoosi."
    },
    {
      "id": "collapse",
      "label": "Koira romahtaa tai ei pysy pystyssä",
      "status": "verified",
      "sourceIds": [
        "pet-hy-emergency"
      ],
      "limitation": "Kiireellinen vaaranmerkki riippumatta oireen kestosta."
    },
    {
      "id": "poisoning",
      "label": "Epäily myrkyn tai vaarallisen aineen syömisestä",
      "status": "verified",
      "sourceIds": [
        "pet-hy-emergency"
      ],
      "limitation": "Kysy heti päivystävältä eläinlääkäriltä toimintaohje. Älä kokeile demon perusteella kotihoitoa."
    }
  ],
  "observations": [
    {
      "id": "breathing",
      "label": "Hengityshavainto (esimerkki)",
      "status": "verified",
      "sourceIds": [
        "pet-hy-emergency"
      ],
      "options": [
        {
          "value": "unknown",
          "label": "Ei tiedossa"
        },
        {
          "value": "unremarkable",
          "label": "Omistaja ei huomannut poikkeamaa"
        },
        {
          "value": "difficult",
          "label": "Hengitys vaikuttaa vaikealta"
        }
      ],
      "limitation": "Poikkeaman huomaamatta jääminen ei sulje pois sairautta tai kumoa muita vaaranmerkkejä. Tarkkailu ei saa viivästyttää avun hakemista."
    },
    {
      "id": "waterRetention",
      "label": "Pysyykö juotu vesi sisällä? (esimerkki)",
      "status": "verified",
      "sourceIds": [
        "pet-evidensia-gi"
      ],
      "options": [
        {
          "value": "unknown",
          "label": "Ei tiedossa"
        },
        {
          "value": "retained",
          "label": "Omistajan mukaan on pysynyt"
        },
        {
          "value": "vomited",
          "label": "Koira oksentaa myös juomansa veden"
        }
      ],
      "limitation": "Kirjaa vain jo havaittu asia. Tämä ei ohjaa juottamaan koiraa kokeeksi tai sulje pois kuivumista. Vedenkin oksentaminen vaatii kiireellistä arviota."
    }
  ],
  "rules": {
    "routing": {
      "status": "illustrative",
      "sourceIds": [
        "pet-hy-emergency",
        "pet-evidensia-gi",
        "pet-clinic-gdv"
      ],
      "precedence": [
        "emergency",
        "urgent",
        "contact"
      ],
      "emergency": {
        "anyEmergencySign": true,
        "anyObservationEquals": [
          {
            "id": "breathing",
            "value": "difficult"
          },
          {
            "id": "waterRetention",
            "value": "vomited"
          }
        ]
      },
      "urgent": {
        "anySymptomIds": [
          "lethargy"
        ],
        "allSymptomIdsWithDuration": {
          "symptomIds": [
            "vomiting-diarrhea"
          ],
          "duration": "over-24h"
        }
      },
      "fallbackRoute": "contact",
      "unknownInputRoute": "contact",
      "primaryActionByRoute": {
        "emergency": "emergency-help",
        "urgent": "urgent-help",
        "contact": "vet-contact-help"
      },
      "homeCareClearanceAllowed": false,
      "completionCanLowerUrgency": false,
      "limitation": "Varovainen käyttöliittymän ohjaus, ei validoitu hoidon tarpeen arvio tai diagnoosikone. Oireiden poistaminen valinnoista ei tarkoita paranemista. Kesto tai tehtävälista ei voi kumota vaaranmerkkiä.",
      "insuredActionByRoute": {
        "contact": "insured-help",
        "urgent": "insured-help",
        "emergency": "emergency-help"
      }
    },
    "observations": {
      "status": "illustrative",
      "sourceIds": [
        "pet-hy-emergency",
        "pet-pyynikki-history"
      ],
      "mandatoryBeforeContact": false,
      "normalTemperatureRangeC": null,
      "unknownResultLabel": "Ei tiedossa",
      "taskCompletionImpliesNormalFindings": false,
      "limitation": "Tietojen kokoaminen on vapaaehtoista eikä saa viivästyttää hoitoa. Lämpöä, limakalvojen normaaliutta tai nestetasapainoa ei päätellä tehtävän kuittauksesta."
    }
  },
  "insights": {
    "emergency": {
      "title": "Hakeudu viipymättä eläinlääkäripäivystykseen",
      "status": "verified",
      "sourceIds": [
        "pet-hy-emergency",
        "pet-clinic-gdv",
        "pet-evidensia-gi"
      ],
      "text": "Ota heti yhteys oman alueesi päivystävään eläinlääkäriin ja hakeudu hoitoon ohjeen mukaan. Älä odota etävastaanottoa tai tietopaketin valmistumista.",
      "limitation": "Demo ei selvitä sijaintia, klinikan aukioloa tai vastaanottokykyä. Vakavassa tilanteessa tietojen täydentäminen ei ole edellytys avulle."
    },
    "urgent": {
      "title": "Ota yhteys eläinlääkäriin nyt",
      "status": "illustrative",
      "sourceIds": [
        "pet-hy-emergency",
        "pet-evidensia-gi",
        "pet-pyynikki-history"
      ],
      "text": "Vetämättömyys tai pitkittynyt vatsaoire tarvitsee eläinlääkärin arviota. Soita eläinlääkärille; päivystysaikana oman alueesi päivystykseen. Älä jää odottamaan seuraavaa kestorajaa tai etächatin avautumista.",
      "limitation": "Esimerkin varovainen palveluohjaus ei ole tutkimus. Jos ilmenee hätämerkki tai vointi romahtaa, noudata kiireellistä päivystysohjetta."
    },
    "contact": {
      "title": "Kysy eläinlääkäriltä hoidon tarpeesta",
      "status": "illustrative",
      "sourceIds": [
        "pet-if-service",
        "pet-hy-emergency"
      ],
      "text": "Jos lemmikin vointi huolestuttaa, ota yhteys eläinlääkäriin. Sopivassa tilanteessa If Eläinapu voi auttaa palveluun oikeutettua asiakasta.",
      "limitation": "Hätämerkin puuttuminen valinnoista ei tarkoita turvallista kotihoitoa. Kiireellinen oire kuuluu päivystykseen eikä etäpalvelun jonoon."
    },
    "alwaysVisibleBoundary": {
      "title": "Kiireelliset oireet ohittavat etäpalvelun",
      "status": "verified",
      "sourceIds": [
        "pet-hy-emergency",
        "pet-clinic-gdv"
      ],
      "alwaysVisible": true,
      "text": "Hengitysvaikeus, romahtaminen, vatsan turpoaminen, tuloksettomat oksennusyritykset tai myrkytysepäily vaativat välitöntä eläinlääkärin arviota. Myös voimakas kipu, verenvuoto, verinen oksennus tai ripuli sekä silmävamma voivat vaatia päivystystä.",
      "limitation": "Esimerkkejä, ei täydellinen luettelo. Ota yhteyttä myös epävarmassa tilanteessa. Oireiden kesto, valintaruudut tai aiempi rauhallinen havainto eivät poissulje hätää."
    }
  },
  "tasks": [
    {
      "id": "notice-urgency",
      "title": "Huomioi hengitys ja yleisvoinnin muutokset",
      "why": "Kerro havaitsemistasi muutoksista eläinlääkärille heti yhteyttä ottaessasi.",
      "priority": "critical",
      "status": "illustrative",
      "sourceIds": [
        "pet-hy-emergency"
      ],
      "limitation": "Ei pakollinen tutkimus tai testi ennen yhteydenottoa. Kuittaus ei vahvista normaalia hengitystä tai yleisvointia."
    },
    {
      "id": "symptom-timeline",
      "title": "Kokoa oireiden alku ja muutokset",
      "why": "Esitiedoissa auttaa tieto oireiden alkamisesta, etenemisestä ja muista havaituista oireista.",
      "priority": "high",
      "status": "verified",
      "sourceIds": [
        "pet-pyynikki-history"
      ],
      "limitation": "Kirjaa vain tiedossa oleva. Epätarkat tai puuttuvat ajat eivät saa viivästyttää yhteydenottoa."
    },
    {
      "id": "water-observation",
      "title": "Kirjaa tiedossa oleva juomishavainto",
      "why": "Kerro, mitä juomisesta ja mahdollisesta veden oksentamisesta jo tiedetään.",
      "priority": "high",
      "status": "illustrative",
      "sourceIds": [
        "pet-evidensia-gi",
        "pet-pyynikki-history"
      ],
      "limitation": "Älä juota kokeeksi tätä listaa varten. Kuittaus ei ole nestetasapainon arvio tai oirevalinnan vastaus."
    },
    {
      "id": "background",
      "title": "Kokoa tiedossa olevat lääkitykset ja mahdolliset altistukset",
      "why": "Eläinlääkäri voi tarvita tiedot sairauksista, lääkkeistä ja mahdollisesta sopimattoman aineen syömisestä.",
      "priority": "high",
      "status": "verified",
      "sourceIds": [
        "pet-pyynikki-history"
      ],
      "limitation": "Demossa tiedot pysyvät tuntemattomina, eikä vapaata terveystietokenttää ole. Myrkytysepäilyssä ota heti yhteys päivystävään eläinlääkäriin."
    }
  ],
  "service": {
    "title": "If Eläinapu · apua 24/7",
    "status": "verified",
    "sourceIds": [
      "pet-if-service",
      "pet-if-terms"
    ],
    "access": {
      "included": "Esimerkin koiravakuutukseen kuuluva asiakasetu",
      "unknown": "Palveluoikeutta ei tiedetä tässä tutustujanäkymässä",
      "notIncluded": "Esimerkin vakuutuksissa ei ole eläinvakuutusta",
      "includedText": "Ifin koira-, kissa- tai hevosvakuutuksen asiakkaana saat eläinlääkärin apua ympäri vuorokauden. Esimerkin Hilla on koiravakuutettu. Avaa oikea If Eläinapu -sovellus; löydät päivystysnumeron sovelluksesta, kun chat on suljettu.",
      "unknownText": "Ifin eläinvakuutusasiakkaat saavat If Eläinavusta apua 24/7. Tutustujalle ei oleteta vakuutusta tai palveluoikeutta. Hoidon tarpeessa ota yhteys eläinlääkäriin oman tilanteesi mukaan.",
      "notIncludedText": "Pelkkä Ifin asiakkuus tai kotivakuutus ei vahvista oikeutta If Eläinapuun. Etua varten tarvitaan soveltuva Ifin koira-, kissa- tai hevosvakuutus. Älä odota vakuutuksen hankintaa, jos eläin tarvitsee hoitoa.",
      "demoNotice": "Kuvitteellinen vakuutuskokonaisuus. Oikeus ja saatavuus tarkistetaan oikeassa palvelussa; demo ei avaa sovellusta tai puhelua.",
      "urgentNotice": "Kiireellinen tilanne: ota yhteys eläinlääkäriin nyt. Älä odota chatin avautumista tai tämän luonnoksen valmistumista.",
      "emergencyNotice": "Hätätilanne: hakeudu viipymättä eläinlääkäripäivystykseen. Etäpalvelun odottaminen ei saa viivästyttää hoitoa.",
      "detailsLabel": "Palvelun kanavat, käyttö ja rajat",
      "actionLabel": "Näytä 24/7-yhteysohje – demo",
      "actionTitle": "Näin löydät If Eläinavun yhteyden",
      "actionConfirmation": "Yhteysohje vain. Sovellusta tai puhelua ei avattu, eikä mitään lähetetty.",
      "publicLabel": "Tutustu eläinvakuutuksiin Ifin sivulla"
    },
    "eligibilityStatus": "unknown",
    "eligibleInsuranceTypes": [
      "dog",
      "cat",
      "horse"
    ],
    "unlimitedConsultations": true,
    "annualVisitLimit": null,
    "remoteServiceDeductibleEur": 0,
    "customerBenefit": true,
    "partOfInsuranceContract": false,
    "availability": {
      "overall": "24/7",
      "weekdayChatVideo": "8–20",
      "weekendChatVideo": "9–16",
      "otherTimes": "Puhelinpäivystys"
    },
    "text": "Ifin julkaisema asiakasetu antaa palveluun oikeutetulle asiakkaalle rajattoman etäeläinlääkäriavun ilman omavastuuta. Chat ja video toimivat ilmoitettuina aikoina, muulloin apua saa puhelimitse.",
    "limitation": "Asiakasnäkymän vakuutukset ovat kuvitteellisia ja tutustujan oikeus on tuntematon. Ajantasainen oikeus, kanava ja saatavuus tarkistetaan oikeassa palvelussa. Klinikkahoidon kulut arvioidaan erikseen; ei yleistä lupausta omavastuun tai vakuutuksen muuttumattomuudesta."
  },
  "packet": {
    "title": "Esitietoluonnos eläinlääkärille – demo",
    "status": "illustrative",
    "sourceIds": [
      "pet-pyynikki-history",
      "pet-if-service"
    ],
    "includeFields": [
      "animal",
      "symptoms",
      "emergencySigns",
      "duration",
      "observations",
      "route",
      "completedTasks"
    ],
    "emptySymptomsLabel": "Oireita ei valittu; tämä ei tarkoita oireettomuutta",
    "unselectedEmergencyLabel": "Hätämerkkejä ei valittu; niitä ei ole suljettu pois",
    "unknownBackgroundLabel": "Sairaudet, lääkitys ja altistukset: ei tiedossa",
    "temperatureLabel": "Lämpö: ei tiedossa (ei mitata tässä demossa)",
    "completedTasksLabel": "Tiedon kokoamisen demomerkinnät – eivät tutkimustuloksia",
    "limitation": "Paikallinen kuvitteellinen yhteenveto, ei diagnoosi, potilaskertomus, tallennus ulkoiseen palveluun tai lähetetty viesti. Puuttuva havainto säilyy tuntemattomana."
  },
  "actions": [
    {
      "id": "emergency-help",
      "label": "Näytä päivystysohje",
      "allowedRoutes": [
        "emergency"
      ],
      "title": "Ota heti yhteys oman alueen eläinlääkäripäivystykseen",
      "status": "verified",
      "sourceIds": [
        "pet-hy-emergency"
      ],
      "text": "Hakeudu hoitoon viipymättä päivystyksen ohjeen mukaan. Älä odota etäkonsultaatiota tai esitietojen täydentymistä.",
      "confirmation": "Tämä on toimintaohje. Puhelua, varausta tai viestiä ei tehty.",
      "limitation": "Demo ei avaa yhteyttä tai valitse lähintä klinikkaa. Ohje on näkyvissä myös ennen painikkeen käyttöä."
    },
    {
      "id": "urgent-help",
      "label": "Näytä yhteydenotto-ohje",
      "allowedRoutes": [
        "urgent"
      ],
      "title": "Soita eläinlääkärille nyt",
      "status": "illustrative",
      "sourceIds": [
        "pet-hy-emergency",
        "pet-pyynikki-history"
      ],
      "text": "Kerro oireet ja yleisvoinnin muutos eläinlääkärille. Päivystysaikana ota yhteys oman alueesi päivystykseen.",
      "confirmation": "Ohje on esimerkki. Puhelua, varausta tai viestiä ei tehty.",
      "limitation": "Tietopaketin valmistuminen ei ole yhteydenoton edellytys eikä etächatin odottaminen ole oletuspolku."
    },
    {
      "id": "vet-contact-help",
      "label": "Näytä eläinlääkärin yhteydenotto-ohje",
      "allowedRoutes": [
        "contact"
      ],
      "title": "Ota yhteys eläinlääkäriin voinnin arvioimiseksi",
      "text": "Jos lemmikin vointi huolestuttaa, ota yhteys eläinlääkäriin. Sopivassa tilanteessa If Eläinapu voi auttaa palveluun oikeutettua asiakasta.",
      "status": "illustrative",
      "sourceIds": [
        "pet-if-service",
        "pet-hy-emergency"
      ],
      "confirmation": "Ohje vain. Puhelua, varausta tai viestiä ei tehty.",
      "limitation": "Hätämerkin puuttuminen valinnoista ei tarkoita turvallista kotihoitoa. Kiireellinen oire kuuluu päivystykseen eikä etäpalvelun jonoon."
    },
    {
      "id": "insured-help",
      "label": "Näytä If Eläinavun 24/7-yhteysohje",
      "allowedRoutes": [
        "contact",
        "urgent"
      ],
      "title": "If Eläinapu – yhteysohje vakuutetulle esimerkkiasiakkaalle",
      "text": "Ifin koira-, kissa- tai hevosvakuutuksen asiakkaana saat eläinlääkärin apua ympäri vuorokauden. Esimerkin Hilla on koiravakuutettu. Avaa oikea If Eläinapu -sovellus; löydät päivystysnumeron sovelluksesta, kun chat on suljettu.",
      "status": "illustrative",
      "sourceIds": [
        "pet-if-service"
      ],
      "confirmation": "Yhteysohje vain. Sovellusta tai puhelua ei avattu, eikä mitään lähetetty.",
      "limitation": "Kuvitteellinen palveluoikeus. Puhelinpäivystyksen numero löytyy oikeasta sovelluksesta. Älä odota chatin aukeamista tai tietojen kokoamista, jos eläin tarvitsee hoitoa."
    },
    {
      "id": "intro-help",
      "allowedRoutes": [
        "urgent",
        "contact"
      ],
      "label": "Tutustu maksuttomaan yhteydenottoon – konsepti",
      "title": "Yksi maksuton yhteydenotto · konsepti",
      "text": "Tuoteidea Ifin asiakkaalle, jonka esimerkkivakuutuksissa ei ole eläinvakuutusta: yksi maksuton yhteydenotto 24/7-eläinlääkäriapuun tutustumista varten.",
      "confirmation": "Vain tuoteidean esikatselu. Mitään ei lähetetty eikä yhteyttä avattu. Esikatselu ei käytä simuloitua kertaa.",
      "status": "illustrative",
      "limitation": "Ehdotus vakuutusyhtiölle, ei nykyinen If-etu tai vahvistettu palveluoikeus. Yksi simuloitu käyttökerta asiakasnäkymän muistissa; vakuutusvalinnan tai kielen vaihto ei palauta sitä. Mitään ei varata, avata tai lähetetä.",
      "sourceScope": "Lähde vahvistaa olemassa olevan eläinvakuutusasiakkaan 24/7-palvelun. Se ei vahvista tätä ehdotettua maksutonta tutustumiskertaa.",
      "sourceIds": [
        "pet-if-service"
      ]
    }
  ],
  "business": {
    "status": "illustrative",
    "label": "Liiketoimintahypoteesi",
    "sourceIds": [
      "pet-if-service",
      "pet-pyynikki-history"
    ],
    "text": "Selkeä esitietoluonnos voi helpottaa huolen sanoittamista ja palveluohjausta oikeaan kanavaan. Yksi ehdotettu maksuton tutustumiskerta voisi tehdä palvelun arvon näkyväksi myös ilman eläinvakuutusta. Pilotissa arvioitaisiin käyttöä, kustannuksia ja ymmärrettävyyttä.",
    "proposedMetrics": [
      "Esitietojen ymmärrettävyys käyttäjätestissä",
      "Kiireellisten vaaranmerkkien tunnistaminen",
      "Palvelun ehtojen ymmärtäminen",
      "Pilotin palvelukustannus ja kiinnostus eläinvakuutukseen"
    ],
    "limitation": "Ehdotettuja arviointimittareita. Hoidon tuloksia, säästöä tai asiakaspysyvyyttä ei ole mitattu. Päivystykseen hakeutumisen vähentäminen ei ole tämän demon tavoite."
  },
  "english": {
    "title": "Pet wellbeing",
    "presentation.progressTitle": "Information gathering progress",
    "presentation.progressNotice": "Adding details must not delay contact. Ticks are not examination results, a recovery assessment or grounds for a discount.",
    "presentation.serviceEligibilityLabel": "Example service eligibility: not verified",
    "presentation.packetLabel": "Local information draft · you can select and copy the text",
    "presentation.durationLabel": "Symptom duration",
    "presentation.symptomsLabel": "Selected symptom observations",
    "presentation.emergencyLabel": "Selected warning signs",
    "presentation.routeLabel": "Guidance in this example",
    "presentation.notSent": "Fictional draft. Nothing was sent and no connection was opened.",
    "presentation.guidancePrompt": "Do not wait for the information draft or a remote consultation.",
    "presentation.showGuidanceLabel": "Show guidance",
    "presentation.insuredContactTitle": "If Eläinapu · veterinary help 24/7",
    "presentation.insuredUrgentTitle": "Contact a vet now · If Eläinapu 24/7",
    "presentation.channelDetailsLabel": "Channels, sources and service limitations",
    "persona": "Hilla – Golden retriever, 4 years old, 28 kg",
    "demoNotice": "Fictional dog and observations. Do not enter real health information. The demo does not examine the animal or make a diagnosis.",
    "controls.0.label": "Example symptoms",
    "controls.0.help": "Selections describe observations, not a diagnosis. An unselected symptom has not necessarily been ruled out.",
    "controls.1.label": "Emergency warning signs",
    "controls.1.help": "An emergency symptom takes priority over remote help. This list does not cover every emergency.",
    "controls.2.label": "Symptom duration",
    "controls.2.options.0.label": "Under 6 hours",
    "controls.2.options.1.label": "6–24 hours",
    "controls.2.options.2.label": "Over 24 hours",
    "controls.2.help": "A short duration does not rule out an urgent situation. Do not wait for the next time threshold if the animal gets worse.",
    "symptoms.0.label": "Sudden vomiting or diarrhoea",
    "symptoms.0.limitation": "This combined selection does not distinguish amount, cause or severity.",
    "symptoms.1.label": "Lethargy / listlessness",
    "symptoms.1.limitation": "Overall condition needs assessment as a whole. This selection is not a diagnosis.",
    "symptoms.2.label": "Limping or a paw wound",
    "symptoms.2.limitation": "A symptom label for the service guidance example. Serious injury, pain or bleeding needs urgent assessment.",
    "symptoms.3.label": "Eye or ear symptoms",
    "symptoms.3.limitation": "This does not establish that symptoms are mild. An eye injury or marked squinting may need emergency care.",
    "emergencySigns.0.label": "Difficulty breathing",
    "emergencySigns.0.limitation": "Do not wait for the information draft or a remote connection.",
    "emergencySigns.1.label": "Swollen abdomen or unsuccessful attempts to vomit",
    "emergencySigns.1.limitation": "Needs immediate examination; this is not a diagnosis of gastric torsion.",
    "emergencySigns.2.label": "Collapse or inability to stand",
    "emergencySigns.2.limitation": "An emergency warning sign regardless of symptom duration.",
    "emergencySigns.3.label": "Suspected ingestion of poison or a dangerous substance",
    "emergencySigns.3.limitation": "Ask an emergency vet for instructions immediately. Do not try home treatment based on this demo.",
    "observations.0.label": "Breathing observation (example)",
    "observations.0.options.0.label": "Unknown",
    "observations.0.options.1.label": "Owner noticed no abnormality",
    "observations.0.options.2.label": "Breathing appears difficult",
    "observations.0.limitation": "Not noticing an abnormality does not rule out illness or override other warning signs. Observation must not delay seeking help.",
    "observations.1.label": "Does the dog keep water down? (example)",
    "observations.1.options.0.label": "Unknown",
    "observations.1.options.1.label": "Owner reports water stayed down",
    "observations.1.options.2.label": "The dog also vomits the water it drinks",
    "observations.1.limitation": "Record only something already observed. This does not instruct you to give water as a test or rule out dehydration. Vomiting water also needs urgent assessment.",
    "rules.routing.limitation": "Cautious interface guidance, not validated triage or a diagnostic engine. Removing selected symptoms does not mean recovery. Duration or a checklist cannot override a warning sign.",
    "rules.observations.unknownResultLabel": "Unknown",
    "rules.observations.limitation": "Gathering information is optional and must not delay care. A task tick does not establish temperature, normal mucous membranes or hydration.",
    "insights.emergency.title": "Seek emergency veterinary care immediately",
    "insights.emergency.text": "Contact your local emergency vet immediately and seek care as instructed. Do not wait for a remote appointment or a completed information draft.",
    "insights.emergency.limitation": "The demo does not find your location or check clinic hours or capacity. Completing information is not a prerequisite for help in a serious situation.",
    "insights.urgent.title": "Contact a vet now",
    "insights.urgent.text": "Lethargy or prolonged stomach symptoms need a vet's assessment. Call a vet; outside normal hours, call your local emergency service. Do not wait for another duration threshold or for chat to open.",
    "insights.urgent.limitation": "The example's cautious service guidance is not an examination. If an emergency sign appears or the animal collapses, follow the emergency instructions.",
    "insights.contact.title": "Ask a vet about the need for care",
    "insights.contact.text": "If you are concerned about your pet, contact a vet. In a suitable situation, If Eläinapu may help an eligible customer.",
    "insights.contact.limitation": "Not selecting an emergency sign does not mean home care is safe. An emergency symptom needs emergency care, not a remote-service queue.",
    "insights.alwaysVisibleBoundary.title": "Emergency symptoms take priority over remote help",
    "insights.alwaysVisibleBoundary.text": "Difficulty breathing, collapse, a swollen abdomen, unsuccessful attempts to vomit or suspected poisoning need immediate veterinary assessment. Severe pain, bleeding, bloody vomit or diarrhoea and an eye injury may also need emergency care.",
    "insights.alwaysVisibleBoundary.limitation": "Examples, not a complete list. Contact a vet if uncertain too. Duration, ticks or a previously calm observation cannot rule out an emergency.",
    "tasks.0.title": "Notice breathing and changes in overall condition",
    "tasks.0.why": "Tell the vet about changes you have noticed as soon as you contact them.",
    "tasks.0.limitation": "Not a mandatory examination or test before making contact. A tick does not establish normal breathing or overall condition.",
    "tasks.1.title": "Gather the onset and changes in symptoms",
    "tasks.1.why": "Knowing when symptoms began, how they progressed and any other observed symptoms can help the vet.",
    "tasks.1.limitation": "Record only what is known. Inaccurate or missing times must not delay contact.",
    "tasks.2.title": "Record an existing observation about drinking",
    "tasks.2.why": "Tell the vet what is already known about drinking and any vomiting of water.",
    "tasks.2.limitation": "Do not give water as a test for this checklist. A tick is not a hydration assessment or an answer to the symptom selection.",
    "tasks.3.title": "Gather known medication and possible exposures",
    "tasks.3.why": "The vet may need information on illnesses, medicines and possible ingestion of something unsuitable.",
    "tasks.3.limitation": "In this demo, these details remain unknown and there is no free-text health field. Suspected poisoning needs immediate contact with an emergency vet.",
    "service.title": "If Eläinapu · help 24/7",
    "service.access.unknown": "Service eligibility is unknown in this visitor view",
    "service.access.notIncluded": "No pet insurance in the example policies",
    "service.access.includedText": "If dog, cat or horse insurance customers can get veterinary help around the clock. In this example, Hilla has dog insurance. Open the real If Eläinapu app; when chat is closed, the emergency phone number is available in the app.",
    "service.access.unknownText": "If pet insurance customers can get help from If Eläinapu 24/7. No insurance or eligibility is assumed for a visitor. Contact a vet according to your pet's needs.",
    "service.access.notIncludedText": "Being an If customer or having home insurance alone does not establish eligibility for If Eläinapu. The benefit requires applicable If dog, cat or horse insurance. Do not wait to buy insurance if the animal needs care.",
    "service.access.demoNotice": "Fictional policies. Eligibility and availability must be checked in the real service; the demo does not open the app or a phone call.",
    "service.access.urgentNotice": "Urgent situation: contact a vet now. Do not wait for chat to open or for this draft to be complete.",
    "service.access.emergencyNotice": "Emergency: seek emergency veterinary care immediately. Waiting for remote help must not delay care.",
    "service.access.detailsLabel": "Service channels, use and limitations",
    "service.access.actionLabel": "Show 24/7 contact instructions – demo",
    "service.access.actionTitle": "How to find If Eläinapu contact details",
    "service.access.actionConfirmation": "Instructions only. No app or call was opened and nothing was sent.",
    "service.access.publicLabel": "Explore pet insurance on If's website",
    "service.availability.weekdayChatVideo": "08:00–20:00",
    "service.availability.weekendChatVideo": "09:00–16:00",
    "service.availability.otherTimes": "Telephone assistance",
    "service.text": "If's published customer benefit provides eligible customers with unlimited remote veterinary help without a deductible. Chat and video operate during the stated hours; telephone help is available at other times.",
    "service.limitation": "Customer-view policies are fictional and visitor eligibility is unknown. Current eligibility, channel and availability must be checked in the real service. Clinic treatment costs are assessed separately; no general promise about an unchanged deductible or policy is made.",
    "packet.title": "Information draft for a vet – demo",
    "packet.emptySymptomsLabel": "No symptoms selected; this does not mean symptom-free",
    "packet.unselectedEmergencyLabel": "No emergency signs selected; they have not been ruled out",
    "packet.unknownBackgroundLabel": "Illnesses, medication and exposures: unknown",
    "packet.temperatureLabel": "Temperature: unknown (not measured in this demo)",
    "packet.completedTasksLabel": "Demo information-gathering ticks – not examination results",
    "packet.limitation": "Local fictional summary, not a diagnosis, medical record, external service entry or sent message. Missing observations remain unknown.",
    "actions.0.label": "Show emergency instructions",
    "actions.0.title": "Contact your local emergency veterinary service immediately",
    "actions.0.text": "Seek care promptly as instructed by the emergency service. Do not wait for a remote consultation or completed background information.",
    "actions.0.confirmation": "Guidance only. No call, booking or message was made.",
    "actions.0.limitation": "The demo does not open a connection or choose the nearest clinic. Guidance is visible before using the button too.",
    "actions.1.label": "Show contact instructions",
    "actions.1.title": "Call a vet now",
    "actions.1.text": "Tell the vet about symptoms and changes in overall condition. Outside normal hours, contact your local emergency service.",
    "actions.1.confirmation": "Example guidance. No call, booking or message was made.",
    "actions.1.limitation": "A completed information draft is not a prerequisite for contact, and waiting for remote chat is not the default route.",
    "actions.2.label": "Show veterinary contact instructions",
    "actions.2.title": "Contact a vet to assess your pet's condition",
    "actions.2.text": "If you are concerned about your pet, contact a vet. In a suitable situation, If Eläinapu may help an eligible customer.",
    "actions.2.confirmation": "Instructions only. No call, booking or message was made.",
    "actions.2.limitation": "Not selecting an emergency sign does not mean home care is safe. An emergency symptom needs emergency care, not a remote-service queue.",
    "actions.3.label": "Show If Eläinapu 24/7 contact instructions",
    "actions.3.title": "If Eläinapu – instructions for the insured example customer",
    "actions.3.text": "If dog, cat or horse insurance customers can get veterinary help around the clock. In this example, Hilla has dog insurance. Open the real If Eläinapu app; when chat is closed, the emergency phone number is available in the app.",
    "actions.3.confirmation": "Instructions only. No app or call was opened and nothing was sent.",
    "actions.3.limitation": "Fictional service eligibility. The emergency phone number is in the real app. Do not wait for chat to open or to gather information if the animal needs care.",
    "business.label": "Business hypothesis",
    "business.text": "A clear information draft could help people express their concern and reach the right service channel. One proposed complimentary contact could help customers without pet insurance discover the service’s value. A pilot would assess use, costs and understanding.",
    "business.proposedMetrics.0": "Clarity of background information in user testing",
    "business.proposedMetrics.2": "Understanding service conditions",
    "business.limitation": "Proposed evaluation measures. Care outcomes, savings and retention have not been measured. Reducing emergency care visits is not the aim of this demo.",
    "presentation.contextTitle": "Example observations",
    "presentation.tasksTitle": "Optional background preparation",
    "presentation.observationsTitle": "Observations already known",
    "presentation.serviceHoursTemplate": "Chat and video: weekdays {weekday}, weekends {weekend}. At other times: {otherTimes}.",
    "animal.breed": "Golden retriever",
    "business.proposedMetrics.1": "Understanding emergency guidance",
    "sources.0.limitation": "General urgent warning signs, not an exhaustive list or remote diagnosis. Use your local emergency vet; the source also describes the University Veterinary Hospital's regional service.",
    "sources.1.limitation": "Canine symptoms and reasons to seek veterinary care; symptoms may have several causes. Vomiting water and poor overall condition are not converted into a diagnosis permitting home care.",
    "sources.2.limitation": "A swollen abdomen and attempts to vomit can indicate a condition needing immediate care. The demo does not diagnose gastric torsion or give instructions for emptying the stomach or medication.",
    "sources.3.limitation": "Supports gathering background information and contacting a vet when overall condition is poor. Demo tasks do not adopt the article's fasting, feeding or medication advice and do not replace an examination.",
    "sources.4.limitation": "An If dog, cat or horse insurance customer benefit that can change. Not part of the insurance contract. The demo does not check eligibility, log in or connect to a consultation. Chat/video and telephone assistance are separate channels.",
    "sources.5.limitation": "Clinic treatment deductibles and cover depend on the contract. Free remote help as a customer benefit does not mean free follow-up treatment or no effect on any insurance details.",
    "introOffer.title": "One complimentary contact · concept",
    "introOffer.text": "A product idea for an If customer whose example policies do not include pet insurance: one complimentary contact with 24/7 veterinary help to try the service.",
    "introOffer.limitation": "Proposal for an insurer, not a current If benefit or verified entitlement. One simulated use held in the customer view's memory; changing policy setup or language does not reset it. Nothing is booked, opened or sent.",
    "introOffer.usedText": "The example complimentary contact has been used in the simulation. Nothing was sent and no real connection was opened. Contact a vet if needed.",
    "introOffer.confirmLabel": "Simulate using one contact",
    "introOffer.usedLabel": "Simulated contact used",
    "introOffer.sourceScope": "The source confirms the existing 24/7 service for eligible pet insurance customers. It does not verify this proposed complimentary trial.",
    "actions.4.label": "Preview complimentary contact – concept",
    "actions.4.title": "One complimentary contact · concept",
    "actions.4.text": "A product idea for an If customer whose example policies do not include pet insurance: one complimentary contact with 24/7 veterinary help to try the service.",
    "actions.4.confirmation": "Product idea preview only. Nothing was sent and no connection was opened. Previewing does not consume the simulated contact.",
    "actions.4.limitation": "Proposal for an insurer, not a current If benefit or verified entitlement. One simulated use held in the customer view's memory; changing policy setup or language does not reset it. Nothing is booked, opened or sent.",
    "actions.4.sourceScope": "The source confirms the existing 24/7 service for eligible pet insurance customers. It does not verify this proposed complimentary trial.",
    "service.access.included": "Benefit included in the example dog insurance",
    "introOffer.notice": "Product idea, not a current If benefit. One simulated contact; nothing is sent.",
    "business.proposedMetrics.3": "Pilot service cost and interest in pet insurance",
    "audiences.visitor.caseIntro": "Concerned about your pet? Start with the guidance and gather only observations you already have. No policy or If Eläinapu entitlement is assumed.",
    "audiences.visitor.contextTitle": "Your observations for a vet",
    "audiences.visitor.progressTitle": "Prepare to contact a vet",
    "audiences.visitor.packetContext": "New customer example: If Eläinapu eligibility is unknown.",
    "audiences.customer.caseIntro": "Select your example policies to find the relevant contact route. Urgency always takes priority over gathering background information.",
    "audiences.customer.contextTitle": "Your pet observations and service options",
    "audiences.customer.progressTitle": "Your information preparation",
    "audiences.customer.packetContext": "Existing customer example: service options depend on the selected policies; the need for care is assessed separately."
  },
  "introOffer": {
    "status": "illustrative",
    "title": "Yksi maksuton yhteydenotto · konsepti",
    "text": "Tuoteidea Ifin asiakkaalle, jonka esimerkkivakuutuksissa ei ole eläinvakuutusta: yksi maksuton yhteydenotto 24/7-eläinlääkäriapuun tutustumista varten.",
    "limitation": "Ehdotus vakuutusyhtiölle, ei nykyinen If-etu tai vahvistettu palveluoikeus. Yksi simuloitu käyttökerta asiakasnäkymän muistissa; vakuutusvalinnan tai kielen vaihto ei palauta sitä. Mitään ei varata, avata tai lähetetä.",
    "usedText": "Esimerkin maksuton yhteydenotto on käytetty simulaatiossa. Mitään ei lähetetty eikä oikeaa yhteyttä avattu. Tarvittaessa ota yhteys eläinlääkäriin.",
    "confirmLabel": "Simuloi yhden yhteydenoton käyttö",
    "usedLabel": "Simuloitu käyttökerta käytetty",
    "sourceIds": [
      "pet-if-service"
    ],
    "sourceScope": "Lähde vahvistaa olemassa olevan eläinvakuutusasiakkaan 24/7-palvelun. Se ei vahvista tätä ehdotettua maksutonta tutustumiskertaa.",
    "notice": "Tuoteidea, ei nykyinen If-etu. Yksi simuloitu yhteydenotto; mitään ei lähetetä."
  },
  "audiences": {
    "visitor": {
      "caseIntro": "Huolestuttaako lemmikin vointi? Aloita toimintaohjeesta ja kokoa vain jo tiedossa olevat havainnot. Vakuutusta tai If Eläinavun palveluoikeutta ei oleteta.",
      "contextTitle": "Havaintosi eläinlääkärille",
      "progressTitle": "Valmistele yhteydenottoa",
      "packetContext": "Uuden asiakkaan esimerkki: If Eläinavun palveluoikeus on tuntematon."
    },
    "customer": {
      "caseIntro": "Valitse esimerkkivakuutuksesi ja löydä niihin sopiva yhteysohje. Kiireellisyys ohjaa aina toimintaa ennen esitietojen kokoamista.",
      "contextTitle": "Lemmikkisi havainnot ja palveluvaihtoehdot",
      "progressTitle": "Omat esitietomerkintäsi",
      "packetContext": "Nykyisen asiakkaan esimerkki: palveluvaihtoehto riippuu valituista vakuutuksista, ja hoidon tarve arvioidaan erikseen."
    }
  }
};
