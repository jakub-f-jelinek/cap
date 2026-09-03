import quizResult1 from "@/assets/images/quiz-result-1.png";
import quizResult2 from "@/assets/images/quiz-result-2.png";
import quizResult3 from "@/assets/images/quiz-result-3.png";
import quizResult4 from "@/assets/images/quiz-result-4.png";

export const quizQuestions = [
  {
    question: "Přijde vám zpráva během jízdy?",
    options: [
      { label: "Počká to.", score: 0 },
      { label: "Když to pípne několikrát, podívám se.", score: 1 },
      { label: "Jen mrknu, kdo píše.", score: 3 },
    ],
  },
  {
    question: "Telefonujete při jízdě?",
    options: [
      { label: "Zavolám později.", score: 0 },
      { label: "Jen přes handsfree.", score: 1 },
      { label: "Ano, když je potřeba.", score: 3 },
    ],
  },
  {
    question: "Dodržujete rychlostní limit?",
    options: [
      { label: "Ano, hlídám si ho.", score: 0 },
      { label: "Někdy mi to ujede.", score: 1 },
      { label: "10 km/h navíc je normální.", score: 3 },
    ],
  },
  {
    question: "Padesátka v prázdné ulici?",
    options: [
      { label: "Limit je limit.", score: 0 },
      { label: "Občas jedu o něco rychleji.", score: 1 },
      { label: "Šedesát je v normě.", score: 3 },
    ],
  },
  {
    question: "Je noc a silnice je úplně prázdná?",
    options: [
      { label: "Pravidla platí pořád.", score: 0 },
      { label: "Trochu přidám.", score: 1 },
      { label: "Když nikde nikdo není, dovolím si víc.", score: 3 },
    ],
  },
  {
    question: "Dodržujete bezpečnou vzdálenost?",
    options: [
      { label: "Ano, držím si správný odstup.", score: 0 },
      { label: "Jen, když mě někdo brzdí.", score: 1 },
      { label: "Přiznávám, že se „lepím“.", score: 3 },
    ],
  },
  {
    question: "Na semaforu vám svítí žlutá?",
    options: [
      { label: "Když můžu bezpečně zastavit, zastavím.", score: 0 },
      { label: "Záleží, jak daleko jsem.", score: 1 },
      { label: "To ještě stihnu.", score: 3 },
    ],
  },
  {
    question: "Předjíždíte na plné čáře?",
    options: [
      { label: "Nikdy, zákaz je zákaz.", score: 0 },
      { label: "Když mám dobrý rozhled, občas ano.", score: 1 },
      { label: "Když spěchám.", score: 3 },
    ],
  },
  {
    question: "Na železničním přejezdu bliká červená?",
    options: [
      { label: "Nikdy.", score: 0 },
      { label: "Občas to risknu.", score: 1 },
      { label: "To ještě projedu.", score: 3 },
    ],
  },
  {
    question: "Závory na přejezdu jdou dolů?",
    options: [
      { label: "Nejsem blázen, zastavím.", score: 0 },
      { label: "Když nevidím vlak, tak jedu.", score: 1 },
      { label: "Přidám, ať nemusím čekat.", score: 3 },
    ],
  },
  {
    question: "Jedno pivo na zahrádce?",
    options: [
      { label: "Když piju, neřídím.", score: 0 },
      { label: "Záleží jak se cítím.", score: 1 },
      { label: "Jedno pivo přece zvládnu.", score: 3 },
    ],
  },
  {
    question: "Používáte za jízdy sluchátka?",
    options: [
      { label: "Za volant nepatří.", score: 0 },
      { label: "Jen na telefonování.", score: 1 },
      { label: "Ano, běžně.", score: 3 },
    ],
  },
  {
    question: "Respektujete pravidlo „zipu“?",
    options: [
      { label: "Jasně, zrychluje provoz.", score: 0 },
      { label: "Jen, když nespěchám.", score: 1 },
      { label: "Ne, tlačím se dopředu.", score: 3 },
    ],
  },
  {
    question: "Chcete odbočit, ale jste ve špatném pruhu?",
    options: [
      { label: "Jedu dál, neodbočím.", score: 0 },
      { label: "Zkusím se zařadit.", score: 1 },
      { label: "Když je mezera, ještě to střihnu.", score: 3 },
    ],
  },
  {
    question: "Potřebujete se zařadit?",
    options: [
      { label: "Počkám na místo.", score: 0 },
      { label: "Dám blinkr a zkusím to.", score: 1 },
      { label: "Blinkr je upozornění, ne prosba.", score: 3 },
    ],
  },
];

export const quizResults = [
  {
    minScore: 0,
    maxScore: 5,
    label: "VZORŇÁK",
    image: quizResult1,
    description:
      "Nepoužíváte telefon za jízdy, nehoníte každou oranžovou a bezpečný odstup pro vás není sprosté slovo. Gratulujeme, jste noční můrou všech netrpělivých řidičů. Vaše odpovědi ukazují, že za volantem nepokoušíte osud zbytečně. Nehody se samozřejmě nevyhýbají ani opatrným řidičům, ale máte velkou šanci že dojedete bezpečně. Jen tak dál. Silnice potřebují víc lidí jako jste vy.",
  },
  {
    minScore: 6,
    maxScore: 26,
    label: "NORMÁLNÍ ŘIDIČ",
    image: quizResult2,
    description:
      'Takových jako vy je nejvíc. A právě proto vznikla tato kampaň. Občas rychleji. Občas telefon. Občas oranžová. Nic, za co by vás kamarádi označili za piráta silnic. Jenže právě tohle "vždyť to dělají všichni, je to normální" stojí za velkou částí vážných nehod. Normální totiž neznamená bezpečné. A někdy stačí jediná vteřina a z běžného návyku se stane životní průšvih s tragickými důsledky.',
  },
  {
    minScore: 27,
    maxScore: 40,
    label: "KASKADÉR",
    image: quizResult3,
    description:
      "Kdyby byly silnice filmové kulisy, nejspíš byste měli vlastní trailer. Rychlá rozhodnutí, trochu risku a víra, že všechno dopadne dobře. Jenže většina lidí, kteří způsobili tragickou nehodu, si pár vteřin před tím myslela úplně to samé. Máte štěstí, že jste ještě tady. Nezkoušejte, jak dlouho vám vydrží.",
  },
  {
    minScore: 41,
    maxScore: 45,
    label: "PIRÁT SILNIC",
    image: quizResult4,
    description:
      "Přiznejte si to. Pravidla silničního provozu pro vás nejsou pravidla. Jsou to spíš doporučení. Rychlostní limity berete s rezervou. Občas hodíte myšku, nalepíte se na auto před sebou nebo si zazávodíte s někým na semaforu. Telefon v ruce nebo oranžová vás příliš netrápí. Pokud by řízení bylo videohra, máte slušně nahráno. Jenže tady nejsou další životy. Hodilo by se výrazně změnit řidičské návyky - dokud je ještě čas.",
  },
];

export const getQuizResult = (score) =>
  quizResults.find(
    (result) => score >= result.minScore && score <= result.maxScore,
  ) ?? quizResults[0];
