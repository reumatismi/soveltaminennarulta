'use strict';

const leftButton = document.getElementById('vaihtoehto1');
const rightButton = document.getElementById('vaihtoehto2');

const pStory = document.getElementById('storyP');
pStory.innerText = 'Olet avaruusaluksen kapteeni. Kesken rutiinilennon Jupiteriin on edessäsi yhtäkkiä musta aukko. Mitä teet?';

let situation = 0;

const leftChoice = () => {
  storyContinuesLeft(situation);
};

const rightChoice = () => {
  storyContinuesRight(situation);
};

let lefts = [
  [
    'Huokaiset helpotuksesta. Vältit mustan aukon. Samassa kojelautaan syttyy välkkyvä valo. Mitä teet?',
    'Painan sen vieressä olevaa nappia.', 'En ole huomaavinani valoa.', 1],
  [
    'Painat nappia ja valo sammuu. Ehdit hädin tuskin hymyillä ennen kuin valo syttyy uudestaan. ' +
    'Kaiken lisäksi ärsyttävä hälytysääni pärähtää soimaan. Mitä teet?',
    'Painan nappia vielä kerran',
    'Etsin kuulosuojat',
    3],
  [
    'Varovaisesti ohjaat aluksesi suuren juustopalan läheisyyteen. Mitä teet?',
    'Ammun juustopalaa.', 'Avaan radioyhteyden.', 5],
  [
    'Alus räjähtää palasiksi. Onneksi hätäpelastussuojakenttä kietoutuu ympärillesi ja selviät hengissä. ' +
    'Sinun ei auta muuta kuin rauhassa odottaa että sinut tullaan pelastamaan. Loppu!',
    'Jos haluat,',
    'palaa alkuun',
    null],
  [
    'Radioyhteys ei toimi. Samassa iso tuntematon alus nielaisee sinun aluksesi sisuksiinsa. Mitä teet?',
    'Ammun alukseni kaikilla tykeillä.',
    'Odotan mitä tuleman pitää.',
    8],
  [
    'Ammut juustopalaa. Se välähtää kirkkaasti paljastaen hurjan näköisen avaruusaluksen. Mitä teet?',
    'Lähden karkuun.', 'Pyydän anteeksi.', 9],
  [
    'Nukahdat. Näet unta äitisi tekemästä appelsiinitäytekakusta. Loppu!',
    'Jos haluat,',
    'palaa alkuun',
    null],
  [
    'Alus räjähtää palasiksi. Onneksi hätäpelastussuojakenttä kietoutuu ympärillesi ja selviät hengissä. ' +
    'Sinun ei auta muuta kuin rauhassa odottaa että sinut tullaan pelastamaan. Loppu!',
    'Jos haluat,',
    'palaa alkuun',
    null],
  [
    'Voi voi! Kummatkin alukset räjähtävät palasiksi. Onneksi suojakenttä ympäröi sinut ja vihaisen avaruusolennon ja selviätte ' +
    'hengissä kunnes teidät pelastetaan. Loppu!', 'Jos haluat,',
    'palaa alkuun', null],
  [
    'Lähdet karkuun. Heti kohta tajuat että se on raukkamaista ja päätät palata pyytämään anteeksi. Ison aluksen omistaja onkin ' +
    'mukava avaruusolio ja antaa anteeksi. Loppu!', 'Jos haluat,',
    'palaa alkuun', null],
];
let rights = [
  [
    'Suljet silmäsi. Kun avaat ne uudestaan huomaat että musta aukko onkin juustonpalalta ' +
    'näyttävä avaruusalus. Mitä teet?',
    'Päätän lähestyä alusta.',
    'En vieläkään usko silmiäni.',
    2],
  [
    'Et kiinnitä valoon mitään huomiota ja jatkat matkaa. Syöt voileivän ja pari keksiä ja ' +
    'sitten aluksesi moottori räjähtää. Mitä teet?',
    'Otan yhteyttä tukikohtaan ja pyydän apua.',
    'Voivottelen.',
    4],
  [
    'Nyt juustopala ' +
    'onkin jättimäinen appelsiini. Mitä ihmettä?',
    'Suljen vielä kerran silmäni.',
    'Käännän aluksen ympäri.',
    6],
  [
    'Muistat ettei sinulla ' +
    'ole kuulosuojia. Ennen kuin ehdit miettiä että mitä tekisit alus tärähtää voimakkaasti. On syytä ehkä toimia nopeasti. Mitä teet?',
    'Painan nappia uudestaan.', 'Huudan pelosta.', 7],
  [
    'Sinun surkutellessa suuri alus imaisee sinun aluksesi ja lempeä ääni sanoo ' +
    'pelastavansa sinut ja vievänsä sinut takaisin tukikohtaasi. Loppu!',
    'Jos haluat,',
    'palaa alkuun',
    null],
  [
    'Otat radioyhteyden. Mutta mitä ihmettä sanoa juustolle? Ennen kuin ehdit sanoa mitään ottaa komentajasi yhteyttä ' +
    'ja kertoo että sinulle on uusi tehtävä. Aurinkokuntaan on saapunut avaruusolento, joka sinun pitää vastaanottaa. Aluksen tunnistat siitä, ' +
    'että se vaikutta tietyssä valossa joko mustalta aukolta, juustolta tai appelsiinilta. Loppu!',
    'Jos haluat,',
    'palaa alkuun',
    null],
  [
    'Ennen kuin ehdit tehdä niin saat viestin komentajaltasi jossa kerrotaan että sinulle on uusi tehtävä. Aurinkokuntaan on ' +
    'saapunut avaruusolento, joka sinun pitää vastaanottaa. Aluksen tunnistat siitä että se vaikutta tietyssä valossa joko mustalta aukolta, ' +
    'juustolta tai appelsiinilta. Loppu!', 'Jos haluat,',
    'palaa alkuun', null],
  [
    'Alus räjähtää palasiksi. Onneksi hätäpelastussuojakenttä kietoutuu ympärillesi ja selviät hengissä. Sinun ei auta muuta ' +
    'kuin rauhassa odottaa että sinut tullaan pelastamaan. Loppu!',
    'Jos haluat,',
    'palaa alkuun',
    null],
  [
    'Leppoisa avaruusolento kertoo huomanneensa että aluksesi oli rikki ja siksi nappasi sinut ennen kuin aluksesi ehti räjähtää. Loppu!',
    'Jos haluat,',
    'palaa alkuun',
    null],
  [
    'Mukavista mukavin avaruusolento antaa sinulle anteeksi! Loppu!',
    'Jos haluat,',
    'palaa alkuun',
    null],
];

const storyContinuesLeft = (number) => {
  if (number === null) {
    pStory.innerText = 'Olet avaruusaluksen kapteeni. Kesken rutiinilennon Jupiteriin on edessäsi yhtäkkiä musta aukko. Mitä teet?';
    leftButton.innerText = 'Käännän aluksen poispäin aukosta.';
    rightButton.innerText = 'En usko silmiäni';
    situation = 0;
  } else {
    pStory.innerText = lefts[number][0];
    leftButton.innerText = lefts[number][1];
    rightButton.innerText = lefts[number][2];
    situation = lefts[number][3];
  }
  console.log(situation);
};

const storyContinuesRight = (number) => {
  if (number ===null) {
    pStory.innerText = 'Olet avaruusaluksen kapteeni. Kesken rutiinilennon Jupiteriin on edessäsi yhtäkkiä musta aukko. Mitä teet?';
    leftButton.innerText = 'Käännän aluksen poispäin aukosta.';
    rightButton.innerText = 'En usko silmiäni';
    situation = 0;
  } else {
    pStory.innerText = rights[number][0];
    leftButton.innerText = rights[number][1];
    rightButton.innerText = rights[number][2];
    situation = rights[number][3];
  }
  console.log(situation);
};

leftButton.addEventListener('click', leftChoice);
rightButton.addEventListener('click', rightChoice);

