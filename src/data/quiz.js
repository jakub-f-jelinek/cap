import quizResult1 from "@/assets/images/quiz-result-1.png";
import quizResult2 from "@/assets/images/quiz-result-2.png";
import quizResult3 from "@/assets/images/quiz-result-3.png";
import quizResult4 from "@/assets/images/quiz-result-4.png";

export const quizQuestions = [
  {
    question: "Přijde vám zpráva během jízdy.",
    options: [
      { label: "Telefon nechám být.", score: 1 },
      { label: "Jen mrknu, kdo píše.", score: 2 },
      { label: "Hned odpovím.", score: 3 },
    ],
  },
  {
    question: "Naskakuje oranžová na semaforu.",
    options: [
      { label: "Brzdím a zastavuju.", score: 1 },
      { label: "Rozhodnu se podle situace.", score: 2 },
      { label: "Přidám plyn a projedu.", score: 3 },
    ],
  },
  {
    question: "Auto před vámi jede pomaleji, než byste chtěli.",
    options: [
      { label: "Držím odstup a čekám na bezpečné předjetí.", score: 1 },
      { label: "Trochu se přiblížím, ať zrychlí.", score: 2 },
      { label: "Nalepím se na něj a tlačím ho.", score: 3 },
    ],
  },
  {
    question: "Na známé trase mimo obec.",
    options: [
      { label: "Hlídám rychlost i tam, kde to znám.", score: 1 },
      { label: "Občas limit lehce překročím.", score: 2 },
      { label: "Rychlostní limity moc neřeším.", score: 3 },
    ],
  },
];

export const quizResults = [
  {
    minScore: 4,
    maxScore: 5,
    label: "VZORŇÁK",
    image: quizResult1,
    description:
      "Nepoužíváte telefon za jízdy, nehoníte každou oranžovou a bezpečný odstup pro vás není sprosté slovo. Gratulujeme, jste noční můrou všech netrpělivých řidičů. Vaše odpovědi ukazují, že za volantem nepokoušíte osud zbytečně. Nehody se samozřejmě nevyhýbají ani opatrným řidičům, ale máte velkou šanci že dojedete bezpečně. Jen tak dál. Silnice potřebují víc lidí jako jste vy.",
  },
  {
    minScore: 6,
    maxScore: 8,
    label: "NORMÁLNÍ ŘIDIČ",
    image: quizResult2,
    description:
      'Takových jako vy je nejvíc. A právě proto vznikla tato kampaň. Občas rychleji. Občas telefon. Občas oranžová. Nic, za co by vás kamarádi označili za piráta silnic. Jenže právě tohle "vždyť to dělají všichni, je to normální" stojí za velkou částí vážných nehod. Normální totiž neznamená bezpečné. A někdy stačí jediná vteřina a z běžného návyku se stane životní průšvih s tragickými důsledky.',
  },
  {
    minScore: 9,
    maxScore: 10,
    label: "KASKADÉR",
    image: quizResult3,
    description:
      "Kdyby byly silnice filmové kulisy, nejspíš byste měli vlastní trailer. Rychlá rozhodnutí, trochu risku a víra, že všechno dopadne dobře. Jenže většina lidí, kteří způsobili tragickou nehodu, si pár vteřin před tím myslela úplně to samé. Máte štěstí, že jste ještě tady. Nezkoušejte, jak dlouho vám vydrží.",
  },
  {
    minScore: 11,
    maxScore: 12,
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
