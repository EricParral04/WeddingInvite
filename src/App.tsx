import { useEffect, useState } from "react";

type Language = "en" | "es";
type Question = {
  id: string;
  text: Record<Language, string>;
  options: Record<Language, string[]>;
  answer: number;
};
type Screen = "intro" | "quiz" | "verdict" | "pass" | "fail";
type Feedback = { kind: "correct" | "wrong" | "bossWrong" | "thirdStrike"; variant: number };

const COUPLE = {
  names: ["Sonia Jimenes", "Eric Parral"],
  mistakesAllowed: 2,
  googleFormUrl: "",
  galleryPhotos: ["", "", ""],
};

const QUESTIONS: Question[] = [
  {
    id: "bride",
    text: { en: "First things first: what is the bride's name?", es: "Primero lo primero: ¿cómo se llama la novia?" },
    options: { en: ["Sonia", "Sofía", "Sarah", "Sandra"], es: ["Sonia", "Sofía", "Sarah", "Sandra"] },
    answer: 0,
  },
  {
    id: "groom",
    text: { en: "And who is the lucky groom?", es: "¿Y quién es el afortunado novio?" },
    options: { en: ["Emilio", "Eric", "Enrique", "Eduardo"], es: ["Emilio", "Eric", "Enrique", "Eduardo"] },
    answer: 1,
  },
  {
    id: "met",
    text: { en: "How did these two first meet?", es: "¿Cómo se conocieron?" },
    options: { en: ["At a school dance", "On a Zoom call in high school", "Through mutual friends", "In the school library"], es: ["En un baile escolar", "En una llamada de Zoom en la preparatoria", "Por amigos en común", "En la biblioteca de la escuela"] },
    answer: 1,
  },
  {
    id: "years",
    text: { en: "How long have Sonia and Eric known each other?", es: "¿Cuánto tiempo llevan Sonia y Eric de conocerse?" },
    options: { en: ["3 years", "4 years", "5 years", "6 years"], es: ["3 años", "4 años", "5 años", "6 años"] },
    answer: 2,
  },
  {
    id: "proposal",
    text: { en: "Where did Eric pop the question?", es: "¿Dónde le pidió matrimonio Eric?" },
    options: { en: ["On a beach", "At a flower farm", "At a restaurant", "On a hike"], es: ["En la playa", "En una granja de flores", "En un restaurante", "Durante una caminata"] },
    answer: 1,
  },
  {
    id: "iloveyou",
    text: { en: 'Who said "I love you" first?', es: '¿Quién dijo "te amo" primero?' },
    options: { en: ["Sonia", "Eric", "They said it at the same time", "Sol (obviously)"], es: ["Sonia", "Eric", "Lo dijeron al mismo tiempo", "Sol (obviamente)"] },
    answer: 1,
  },
  {
    id: "petname",
    text: { en: "What is Eric's pet name?", es: "¿Cuál es el apodo cariñoso de Eric?" },
    options: { en: ["Sol", "Sunny", "Amorcito", "The spreadsheet guy"], es: ["Sol", "Sunny", "Amorcito", "El de las hojas de cálculo"] },
    answer: 0,
  },
  {
    id: "bridejob",
    text: { en: "What does Sonia do for work?", es: "¿A qué se dedica Sonia?" },
    options: { en: ["Healthcare Coordinator", "Wedding Planner", "Veterinarian", "Professional snack critic"], es: ["Coordinadora de atención médica", "Organizadora de bodas", "Veterinaria", "Catadora profesional de antojitos"] },
    answer: 0,
  },
  {
    id: "groomjob",
    text: { en: "And Eric's line of work?", es: "¿Y a qué se dedica Eric?" },
    options: { en: ["Integration Engineer", "Meteorologist", "Project Manager", "Professional gamer"], es: ["Ingeniero de Integración", "Meteorólogo", "Gerente de proyectos", "Jugador profesional"] },
    answer: 0,
  },
  {
    id: "firsttext",
    text: { en: "Who sent the first text?", es: "¿Quién mandó el primer mensaje?" },
    options: { en: ["Sonia", "Eric", "A very brave mutual friend", "Sol took Eric's phone"], es: ["Sonia", "Eric", "Un amigo muy valiente", "Sol tomó el teléfono de Eric"] },
    answer: 0,
  },
  {
    id: "incharge",
    text: { en: "Be honest: who's in charge?", es: "Seamos sinceros: ¿quién manda?" },
    options: { en: ["Eric, obviously", "Sonia (we all know it)", "It's a democracy", "Sol runs the household"], es: ["Eric, obviamente", "Sonia (todos lo sabemos)", "Es una democracia", "Sol manda en la casa"] },
    answer: 1,
  },
];

type Copy = {
  masthead: string;
  language: string;
  galleryTitle: string;
  gallerySubtitle: string;
  galleryCaptions: string[];
  photoComing: string;
  eyebrow: string;
  introTitle: React.ReactNode;
  introDescription: string;
  rules: string[];
  start: string;
  footer: string;
  question: string;
  of: string;
  mistakesLeft: (count: number) => string;
  correct: string[];
  wrong: string[];
  bossWrong: string;
  thirdStrike: string;
  next: string;
  reveal: string;
  verdict: string;
  verdictTitle: string;
  verdictCopy: string;
  revealNow: string;
  denied: string;
  failTitle: string;
  failMessage: string;
  failScore: (wrong: number) => string;
  rejectTitle: string;
  rejectBody: string;
  attire: string;
  attireDetail: string;
  plusOne: string;
  plusOneDetail: string;
  missed: string;
  appeal: string;
  passTitle: string;
  perfect: string;
  passed: (wrong: number) => string;
  together: string;
  invite: string;
  day: string;
  place: string;
  dress: string;
  rsvpBy: string;
  rsvp: string;
  rsvpComing: string;
  note: string;
  restart: string;
};

const COPY: Record<Language, Copy> = {
  en: {
    masthead: "A celebration of love, laughter & a life together",
    language: "Español",
    galleryTitle: "The love story gallery",
    gallerySubtitle: "A little life, lovingly collected",
    galleryCaptions: ["The beginning", "The best chapter", "A question & a yes"],
    photoComing: "Your photograph goes here",
    eyebrow: "A very official guest-list examination",
    introTitle: <>So, you think you know <em>us?</em></>,
    introDescription: "Before you get near the cake, the dance floor, or the open bar, there's one tiny question: how well do you know Sonia & Eric?",
    rules: ["11 questions. No phone-a-friend.", "Answer every question; the verdict waits.", "Three wrong answers means you're out."],
    start: "Let's find out",
    footer: "Made with love, family stories, and a very selective guest list.",
    question: "Question",
    of: "of",
    mistakesLeft: (count: number) => `${count} ${count === 1 ? "mistake" : "mistakes"} left`,
    correct: ["Correct. Your seat remains tentatively reserved.", "Right! You've clearly been paying attention.", "Okay, show-off. Your plus-one is safe."],
    wrong: ["A confident answer. Unfortunately, confidence was not the question.", "Somewhere, the couple just felt a mysterious chill.", "The group chat will be hearing about this."],
    bossWrong: "Nice try. The household committee has reviewed your answer and revoked your remote-control privileges.",
    thirdStrike: "That's three. The committee will deliver its verdict after the final question.",
    next: "Next question",
    reveal: "Submit final answer",
    verdict: "Continue",
    verdictTitle: "The gallery committee is deliberating",
    verdictCopy: "Every answer is in. One moment while the guest-list committee reaches its very official decision.",
    revealNow: "I can't take the suspense — show me",
    denied: "A very different kind of invitation",
    failTitle: "We regret to inform you...",
    failMessage: "We love you dearly. We simply cannot trust you with a seating chart after this performance.",
    failScore: (wrong: number) => `${wrong} wrong. ${COUPLE.mistakesAllowed} allowed. The math is not in your favor.`,
    rejectTitle: "You're cordially invited to reconsider your answers.",
    rejectBody: "Join us for an intimate evening of awkward eye contact and quietly Googling the couple's relationship history.",
    attire: "Attire:",
    attireDetail: "Something suitable for a learning experience.",
    plusOne: "Plus-one:",
    plusOneDetail: "The friend who clearly gave you the wrong answers.",
    missed: "You missed",
    appeal: "Appeal your results",
    passTitle: "You really do know us.",
    perfect: "A perfect score! You know the couple almost as well as they know each other.",
    passed: (wrong: number) => `You made it with ${wrong} ${wrong === 1 ? "wrong answer" : "wrong answers"}. Your invitation is officially unlocked!`,
    together: "Together with their families",
    invite: "joyfully invite you to celebrate their wedding",
    day: "The day",
    place: "The place",
    dress: "Dress code",
    rsvpBy: "Kindly reply by",
    rsvp: "Kindly RSVP",
    rsvpComing: "RSVP details are coming soon.",
    note: "Wedding-day details coming soon. The quiz committee is working on it.",
    restart: "Take the quiz again",
  },
  es: {
    masthead: "Una celebración de amor, risas y una vida juntos",
    language: "English",
    galleryTitle: "La galería de nuestra historia",
    gallerySubtitle: "Un poquito de vida, con mucho cariño",
    galleryCaptions: ["El comienzo", "El mejor capítulo", "Una pregunta y un sí"],
    photoComing: "Aquí va su fotografía",
    eyebrow: "Un examen muy oficial de la lista de invitados",
    introTitle: <>¿Así que dices que <em>nos conoces?</em></>,
    introDescription: "Antes de acercarte al pastel, la pista de baile o la barra libre, una preguntita: ¿qué tanto conoces a Sonia y Eric?",
    rules: ["11 preguntas. Sin ayuda de tus amigos.", "Contesta todas; el veredicto espera.", "Con tres errores, quedas fuera."],
    start: "¡A ver qué tanto sabes!",
    footer: "Hecho con amor, historias familiares y una lista muy selectiva.",
    question: "Pregunta",
    of: "de",
    mistakesLeft: (count: number) => `${count} ${count === 1 ? "error restante" : "errores restantes"}`,
    correct: ["¡Correcto! Tu lugar sigue apartado... por ahora.", "¡Muy bien! Sí has estado poniendo atención.", "Bueno, presumido. Tu acompañante está a salvo."],
    wrong: ["Respuesta segura. Lástima que no preguntamos por seguridad.", "En algún lugar, la pareja acaba de sentir un escalofrío.", "El chat familiar se va a enterar de esto."],
    bossWrong: "Casi. El comité de la casa revisó tu respuesta y te quitó el control remoto.",
    thirdStrike: "Ya son tres errores. El comité dará su veredicto después de la última pregunta.",
    next: "Siguiente pregunta",
    reveal: "Enviar respuesta final",
    verdict: "Veredicto final",
    verdictTitle: "El comité de la galería está deliberando",
    verdictCopy: "Ya tenemos todas tus respuestas. Un momento mientras el comité de invitados toma su decisión muy oficial.",
    revealNow: "Ya no aguanto la intriga — mostrar resultado",
    denied: "Una invitación muy diferente",
    failTitle: "Lamentamos informarte...",
    failMessage: "Te queremos mucho, pero después de esto no te podemos confiar el plano de las mesas.",
    failScore: (wrong: number) => `${wrong} errores. Se permiten ${COUPLE.mistakesAllowed}. Las matemáticas no están de tu lado.`,
    rejectTitle: "Te invitamos cordialmente a reconsiderar tus respuestas.",
    rejectBody: "Acompáñanos en una velada íntima de miradas incómodas y búsquedas discretas en Google sobre la pareja.",
    attire: "Vestimenta:",
    attireDetail: "Algo apropiado para una experiencia de aprendizaje.",
    plusOne: "Acompañante:",
    plusOneDetail: "La persona que claramente te dio las respuestas equivocadas.",
    missed: "Fallaste",
    appeal: "Apelar mi resultado",
    passTitle: "¡Sí nos conoces!",
    perfect: "¡Puntuación perfecta! Conoces a la pareja casi tan bien como se conocen ellos.",
    passed: (wrong: number) => `¡Lo lograste con ${wrong} ${wrong === 1 ? "respuesta incorrecta" : "respuestas incorrectas"}! Tu invitación ya está desbloqueada.`,
    together: "Junto con sus familias",
    invite: "se complacen en invitarte a celebrar su boda",
    day: "El día",
    place: "El lugar",
    dress: "Vestimenta",
    rsvpBy: "Confirma antes del",
    rsvp: "Confirmar asistencia",
    rsvpComing: "Pronto compartiremos los detalles para confirmar.",
    note: "Pronto compartiremos los detalles de la boda. El comité está trabajando en ello.",
    restart: "Volver a jugar",
  },
};

const CONFETTI = ["✦", "✿", "◆", "✧", "❋"];

function App() {
  const [language, setLanguage] = useState<Language>("en");
  const [screen, setScreen] = useState<Screen>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [missedQuestions, setMissedQuestions] = useState<Question[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [verdictCountdown, setVerdictCountdown] = useState(3);
  const t = COPY[language];
  const question = QUESTIONS[questionIndex];
  const feedbackText = feedback === null ? "" : feedback.kind === "correct"
    ? t.correct[feedback.variant]
    : feedback.kind === "wrong"
      ? t.wrong[feedback.variant]
      : t[feedback.kind];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    if (screen !== "verdict") return;
    if (verdictCountdown === 0) {
      const timeout = window.setTimeout(() => {
        setScreen(wrongAnswers > COUPLE.mistakesAllowed ? "fail" : "pass");
      }, 450);
      return () => window.clearTimeout(timeout);
    }

    const timeout = window.setTimeout(() => setVerdictCountdown(verdictCountdown - 1), 1000);
    return () => window.clearTimeout(timeout);
  }, [screen, verdictCountdown, wrongAnswers]);

  function startQuiz() {
    setQuestionIndex(0);
    setWrongAnswers(0);
    setMissedQuestions([]);
    setSelectedAnswer(null);
    setFeedback(null);
    setScreen("quiz");
  }

  function answerQuestion(index: number) {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    if (index === question.answer) {
      setFeedback({ kind: "correct", variant: Math.floor(Math.random() * t.correct.length) });
      return;
    }

    const newWrongAnswers = wrongAnswers + 1;
    setWrongAnswers(newWrongAnswers);
    setMissedQuestions([...missedQuestions, question]);
    setFeedback(question.id === "incharge"
      ? { kind: "bossWrong", variant: 0 }
      : newWrongAnswers > COUPLE.mistakesAllowed
        ? { kind: "thirdStrike", variant: 0 }
        : { kind: "wrong", variant: Math.floor(Math.random() * t.wrong.length) });
  }

  function advance() {
    if (questionIndex === QUESTIONS.length - 1) {
      setVerdictCountdown(3);
      setScreen("verdict");
    } else {
      setQuestionIndex(questionIndex + 1);
      setSelectedAnswer(null);
      setFeedback(null);
    }
  }

  function revealVerdict() {
    setScreen(wrongAnswers > COUPLE.mistakesAllowed ? "fail" : "pass");
  }

  return (
    <div className="page-shell">
      <div className={`confetti${screen === "pass" ? " celebrate" : ""}`} aria-hidden="true">
        {CONFETTI.map((shape, index) => <span key={index} style={{ "--i": index } as React.CSSProperties}>{shape}</span>)}
      </div>
      <header className="site-header">
        <div className="brand-mark" aria-hidden="true"><span>S</span><i>&amp;</i><span>E</span></div>
        <p>{t.masthead}</p>
        <button className="language-toggle" onClick={() => setLanguage(language === "en" ? "es" : "en")} aria-label={language === "en" ? "Cambiar a español" : "Switch to English"}>
          <span aria-hidden="true">◎</span> {t.language}
        </button>
      </header>

      <main className="main-content">
        {screen === "intro" && (
          <section className="intro-card" key="intro">
            <div className="museum-entry">
              <div className="gallery-heading">
                <span>SONIA &amp; ERIC · NO. 01</span>
                <p>{t.galleryTitle}</p>
                <small>{t.gallerySubtitle}</small>
              </div>
              <div className="gallery-wall">
                {COUPLE.galleryPhotos.map((photo, index) => (
                  <figure className={`gallery-frame gallery-frame-${index + 1}`} key={index}>
                    <div className="frame-mat">
                      {photo
                        ? <img src={photo} alt={`Sonia and Eric — ${t.galleryCaptions[index]}`} />
                        : <div className={`photo-placeholder placeholder-${index + 1}`}><span aria-hidden="true">S <i>&amp;</i> E</span><small>{t.photoComing}</small></div>}
                    </div>
                    <figcaption>{t.galleryCaptions[index]}</figcaption>
                  </figure>
                ))}
              </div>
              <span className="museum-door museum-door-left" aria-hidden="true" />
              <span className="museum-door museum-door-right" aria-hidden="true" />
            </div>
            <p className="eyebrow"><span>✦</span> {t.eyebrow} <span>✦</span></p>
            <h1>{t.introTitle}</h1>
            <p className="intro-copy">{t.introDescription}</p>
            <div className="rule-list">
              {t.rules.map((rule, index) => <div className="rule" key={rule}><span>{String(index + 1).padStart(2, "0")}</span><p>{rule}</p></div>)}
            </div>
            <button className="primary-button" onClick={startQuiz}>{t.start}<span aria-hidden="true"> ↗</span></button>
            <p className="small-note">Sonia Jimenes <span>♥</span> Eric Parral</p>
          </section>
        )}

        {screen === "quiz" && (
          <section className="quiz" key="quiz">
            <div className="quiz-meta">
              <p>{t.question} <strong>{questionIndex + 1}</strong> {t.of} {QUESTIONS.length}</p>
              <div className="hearts" aria-label={t.mistakesLeft(COUPLE.mistakesAllowed - wrongAnswers)}>
                {Array.from({ length: COUPLE.mistakesAllowed }, (_, index) => <span className={index < wrongAnswers ? "used" : ""} key={index} aria-hidden="true">♥</span>)}
              </div>
            </div>
            <div className="progress-track"><span style={{ width: `${(questionIndex / QUESTIONS.length) * 100}%` }} /></div>
            <article className="question-card">
              <p className="question-kicker">{t.question} {String(questionIndex + 1).padStart(2, "0")}</p>
              <h1>{question.text[language]}</h1>
              <div className="answers">
                {question.options[language].map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = selectedAnswer !== null && index === question.answer;
                  const isWrong = isSelected && index !== question.answer;
                  return (
                    <button className={`answer ${isCorrect ? "correct" : ""} ${isWrong ? "incorrect" : ""}`} key={option} disabled={selectedAnswer !== null} onClick={() => answerQuestion(index)}>
                      <span className="answer-letter">{String.fromCharCode(65 + index)}</span>{option}
                      {isCorrect && <span className="answer-mark" aria-label="Correct">✓</span>}
                    </button>
                  );
                })}
              </div>
              <p className="feedback" aria-live="polite">{feedbackText}</p>
              {selectedAnswer !== null && (
                <button className="primary-button next-button" onClick={advance}>
                  {questionIndex === QUESTIONS.length - 1 ? t.reveal : t.next}<span aria-hidden="true"> →</span>
                </button>
              )}
            </article>
            <p className="quiz-whisper">{language === "en" ? "Choose wisely. The aunties are watching." : "Elige bien. Las tías están observando."}</p>
          </section>
        )}

        {screen === "verdict" && (
          <section className="result-card verdict-room" key="verdict" aria-live="polite">
            <p className="result-stamp">{language === "en" ? "Final review" : "Revisión final"}</p>
            <div className="verdict-arch">
              <p>{t.verdictTitle}</p>
              <div className="countdown-wrap">
                <span className="countdown-halo" key={verdictCountdown} />
                <strong key={`number-${verdictCountdown}`}>{verdictCountdown || "✦"}</strong>
              </div>
              <p className="verdict-copy">{t.verdictCopy}</p>
              <button className="text-button reveal-now" onClick={revealVerdict}>{t.revealNow}</button>
            </div>
          </section>
        )}

        {screen === "fail" && (
          <section className="result-card" key="fail">
            <p className="result-stamp denied">{t.denied}</p>
            <h1>{t.failTitle}</h1>
            <p className="result-copy">{t.failMessage}</p>
            <p className="result-score">{t.failScore(wrongAnswers)}</p>
            <article className="rejection">
              <p className="rejection-label">{language === "en" ? "Official notice from the very serious committee" : "Aviso oficial del comité muy serio"}</p>
              <h2>{t.rejectTitle}</h2>
              <p>{t.rejectBody}</p>
              <div className="rejection-details">
                <p><strong>{t.attire}</strong> {t.attireDetail}</p>
                <p><strong>{t.plusOne}</strong> {t.plusOneDetail}</p>
              </div>
            </article>
            <ul className="missed-list">
              {missedQuestions.map(item => <li key={item.id}><span>×</span> {item.text[language]}</li>)}
            </ul>
            <button className="primary-button" onClick={startQuiz}>{t.appeal}<span aria-hidden="true"> ↻</span></button>
          </section>
        )}

        {screen === "pass" && (
          <section className="result-card pass-card" key="pass">
            <p className="result-stamp approved">{language === "en" ? "Guest list approved" : "Invitado aprobado"}</p>
            <h1>{t.passTitle}</h1>
            <p className="result-copy">{wrongAnswers === 0 ? t.perfect : t.passed(wrongAnswers)}</p>
            <article className="invitation">
              <span className="invitation-flower flower-one" aria-hidden="true">✿</span>
              <span className="invitation-flower flower-two" aria-hidden="true">✿</span>
              <p className="invitation-small">{t.together}</p>
              <h2>{COUPLE.names[0]}<span>&amp;</span>{COUPLE.names[1]}</h2>
              <p>{t.invite}</p>
              <div className="invitation-divider"><span>✦</span></div>
              <p className="coming-soon">{t.note}</p>
              {COUPLE.googleFormUrl
                ? <a className="primary-button rsvp-button" href={COUPLE.googleFormUrl} target="_blank" rel="noreferrer">{t.rsvp}<span aria-hidden="true"> ↗</span></a>
                : <p className="rsvp-pending">{t.rsvpComing}</p>}
              <p className="invitation-signoff">{language === "en" ? "Con mucho amor," : "Con mucho amor,"}<br /><strong>Sonia &amp; Eric</strong></p>
            </article>
            <button className="text-button" onClick={startQuiz}>{t.restart}</button>
          </section>
        )}
      </main>

      <footer className="site-footer"><span>✿</span> {t.footer} <span>✿</span></footer>
    </div>
  );
}

export default App;
