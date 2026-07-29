// Content is a placeholder — scoring & copy will be finalized later.
export const quizQuestions = [
  {
    question: 'Přijde vám zpráva během jízdy',
    options: [
      { label: 'Jen mrknu, kdo píše', score: 1 },
      { label: 'Když to pípá potřetí, podívám se', score: 2 },
      { label: 'Počká to', score: 3 },
    ],
  },
  {
    question: 'Blíží se oranžová na semaforu',
    options: [
      { label: 'Přidám plyn a projedu', score: 1 },
      { label: 'Podle situace se rozhodnu', score: 2 },
      { label: 'Radši zpomalím a zastavím', score: 3 },
    ],
  },
  {
    question: 'Jak často kontrolujete rychloměr na známé silnici',
    options: [
      { label: 'Skoro vůbec, znám tu trasu', score: 1 },
      { label: 'Občas mrknu', score: 2 },
      { label: 'Pravidelně', score: 3 },
    ],
  },
]

export const quizResults = [
  { minScore: 3, maxScore: 5, label: 'Rizikový řidič', description: 'Malé kompromisy za volantem se vám mohou vymstít. Zkuste zpomalit.' },
  { minScore: 6, maxScore: 7, label: 'Průměrný řidič', description: 'Jedete jako většina — a většina za normální řízení platí vysokou cenu.' },
  { minScore: 8, maxScore: 9, label: 'Bezpečný řidič', description: 'Držíte se zásad, které zachraňují životy. Tak dál.' },
]
