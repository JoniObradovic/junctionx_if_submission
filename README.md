# IF Lähellä

**Everyday help. Before trouble starts.**

IF Lähellä explores how insurers can earn trust before a claim by helping people
prevent problems. Customers get practical guidance and proposed rewards for taking
care of their homes, families and pets; insurers gain an opportunity to reduce risk
and build lasting relationships through useful actions.

[Live demo](https://joniobradovic.github.io/junctionx_if_submission/?lang=en) ·
[Existing customer](https://joniobradovic.github.io/junctionx_if_submission/?lang=en#asiakas) ·
[Staff view](https://joniobradovic.github.io/junctionx_if_submission/personnel.html?lang=en) ·
[Pitch deck (PDF)](public/presentation/IF-Lahella-demo-EN.pdf)

## What it does

- Guides four situations: a new home, leaving home empty, a first baby and pet wellbeing.
- Tailors advice to new visitors and existing customers with different insurance policies.
- Shows how completing preventive tasks could earn lower prices through an illustrative reward.
- Offers a proposed one-time introduction to 24/7 pet help for existing customers without pet cover.
- Gives staff a read-only view of fictional customer readiness and policy coverage.
- Supports Finnish and English, responsive layouts and keyboard navigation.

An independent prototype for the If challenge. Customers, policies and prices are
fictional; prevention rewards and the free introductory contact are proposals.
Guidance does not guarantee coverage, successful claims or medical safety. No
booking, message or transaction is sent; session data resets on reload.

The live demo opens in a browser. For local running and the source layout, see
[src/README.md](src/README.md).

## Resources used

Reference links used in the scenario content are listed below. Individual records
in [src/content](src/content/README.md) retain source dates, applicable sections and
limitations; the links do not establish entitlement to the proposed rewards.

- **If benefits:** [loyalty programme](https://www.if.fi/henkiloasiakkaat/vakuutukset/asiakasedut/if-etuohjelma), [programme rules](https://www.if.fi/globalassets/fi/pdf/muut/if-etuohjelman-saannot.pdf), [Nordea customer offer](https://www.nordea.fi/henkiloasiakkaat/palvelumme/vakuutukset/if-vakuutukset/kotivakuutus.html).
- **Home insurance:** [home terms](https://www.if.fi/globalassets/fi/pdf/ehdot/kotivakuutusehdot.pdf), [general terms](https://www.if.fi/globalassets/fi/pdf/ehdot/yleiset-sopimusehdot.pdf), [LaajaPlus building terms](https://www.if.fi/globalassets/fi/pdf/ehdot/laajaplus-rakennusvakuutusehdot.pdf).
- **Home care and travel:** [maintenance service](https://www.if.fi/henkiloasiakkaat/vakuutukset/kotivakuutus/omakotitalo/omakotitalon-kunnossapitosuunnitelma), [inspection findings and data-use limits](https://www.if.fi/tietoa-ifista/uutishuone?id=nama-ovat-suomalaisten-omakotitalojen-haasteet-sateiden-lisaantyessa-tarkista-sadevesien-ohjaus-ja-katon-kunto), [water-damage response](https://www.if.fi/henkiloasiakkaat/vahingot/koti-ja-omaisuus/vesivahinko), [leak prevention](https://www.if.fi/henkiloasiakkaat/vakuutukset/kotivakuutus/kodin-turvallisuus/vesivahinko), [burglary prevention](https://www.if.fi/henkiloasiakkaat/vakuutukset/kotivakuutus/kodin-turvallisuus/murtojen-estaminen), [travel insurance](https://www.if.fi/henkiloasiakkaat/vakuutukset/matkavakuutus), [Rakennustieto guidance metadata](https://uutiset.rakennustieto.fi/yleinen/rakennuksen-kuntosovellus-raku-on-paivitetty/).
- **Child safety:** Liikenneturva [car seats](https://www.liikenneturva.fi/liikenteessa/turvaistuin/) and [FAQ](https://www.liikenneturva.fi/liikenteessa/turvaistuin-usein-kysytyt-kysymykset/); Tukes [safe sleep](https://tukes.fi/turvallinen-uni), [interiors](https://tukes.fi/turvallinen-sisustus-lapsiperheissa), [furniture](https://tukes.fi/tuotteet-ja-palvelut/yleiset-kulutustavarat/huonekalut) and [chemicals](https://tukes.fi/kemikaalit1).
- **Standards metadata:** BSI [cots](https://knowledge.bsigroup.com/products/furniture-childrens-cots-and-folding-cots-for-domestic-use-safety-requirements-1) and [changing units](https://knowledge.bsigroup.com/products/child-care-articles-changing-units-and-changing-pads-for-domestic-use-safety-requirements-and-test-methods). Only public descriptions were consulted, not the full paid standards.
- **Family insurance:** If [baby insurance](https://www.if.fi/henkiloasiakkaat/vakuutukset/henkilovakuutukset/vauvavakuutus), [child insurance guide](https://www.if.fi/globalassets/fi/pdf/opas/lapsivakuutusopas.pdf) and [personal insurance terms](https://www.if.fi/globalassets/fi/pdf/ehdot/henkilovakuutusehdot.pdf).
- **Pet wellbeing:** [University Veterinary Hospital emergency guidance](https://www.helsinki.fi/fi/yliopistollinen-elainsairaala/paivystys/mita-paivystyshoito), [Evidensia gastrointestinal symptoms](https://evidensia.fi/hoitovinkit/koiran-mahasuolikanavan-tulehdukset/), [Koirakissaklinikka gastric dilatation and torsion](https://koirakissaklinikka.fi/koira-artikkelit/mahalaukun-laajentuma-ja-kiertyma), [Pyynikin warning signs](https://pyynikinelainlaakarit.fi/ajankohtaista/koiralla-vatsakipuja-nain-tunnistat-vaaran-merkit-ja-toimi-oikein/), If [Eläinapu](https://www.if.fi/henkiloasiakkaat/vakuutukset/elainvakuutukset/elainapu) and [pet insurance terms](https://www.if.fi/globalassets/fi/pdf/ehdot/elainvakuutusehdot.pdf).
- **Visual reference:** [If private customers](https://www.if.fi/en/private-customers).

**Technologies:** HTML, CSS, JavaScript and TypeScript; Node.js/npm and Vite;
ESLint and Prettier; GitHub Actions and GitHub Pages.
The application runs entirely in the browser with no backend.
