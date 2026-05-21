const steps = [
  {
    title: "Elige un hotel boutique",
    text: "Explora campañas de alojamientos con identidad propia que quieren reducir su huella energética.",
  },
  {
    title: "Aporta a una meta solar",
    text: "Tu contribución ayuda a financiar la instalación de paneles solares y mejoras sostenibles.",
  },
  {
    title: "Recibe recompensas",
    text: "Los hoteles agradecen tu apoyo con noches preferentes, descuentos, experiencias gastronómicas y trato especial.",
  },
];

const rewards = [
  "Descuentos en futuras estancias",
  "Experiencias culinarias locales",
  "Upgrades y detalles de bienvenida",
  "Acceso a preventas o fechas especiales",
];

const campaigns = [
  {
    hotel: "Casa Nube",
    place: "Valle de Bravo",
    goal: "$480,000 MXN",
    progress: "68%",
    reward: "20% de descuento y desayuno para dos",
  },
  {
    hotel: "Luz de Agua",
    place: "Bacalar",
    goal: "$620,000 MXN",
    progress: "42%",
    reward: "Cena de autor frente a la laguna",
  },
  {
    hotel: "Monte Clara",
    place: "San Miguel de Allende",
    goal: "$390,000 MXN",
    progress: "81%",
    reward: "Upgrade sujeto a disponibilidad",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">SOLANGE® by SONUEL®</p>
          <h1>Luz que transforma.</h1>
          <p className="hero-text">
            Solange conecta huéspedes conscientes con hoteles boutique que buscan financiar proyectos solares. Tú aportas a una campaña, el hotel avanza hacia una operación más limpia y recibes recompensas para tu próxima escapada.
          </p>
          <div className="hero-actions">
            <a href="#campanas" className="primary-link">Explorar campañas</a>
            <a href="#como-funciona" className="secondary-link">Cómo funciona</a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Hotel boutique sostenible con energía solar">
          <div className="sun-mark" />
          <div className="hotel-card">
            <span>Hotel boutique</span>
            <strong>Financia su transición solar</strong>
          </div>
          <div className="impact-card">
            <strong>68%</strong>
            <span>meta financiada</span>
          </div>
          <div className="solar-panel-grid" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="intro-band">
        <div>
          <p className="section-kicker">Turismo que preserva</p>
          <h2>Energía limpia impulsada por comunidad.</h2>
        </div>
        <p>
          Solange no vende paneles solares. Es la plataforma donde hoteles boutique presentan campañas verificables y huéspedes convierten su deseo de viajar en una acción con impacto tangible.
        </p>
      </section>

      <section id="como-funciona" className="section">
        <div className="section-heading">
          <p className="section-kicker">Cómo funciona</p>
          <h2>Una forma simple de viajar con intención.</h2>
        </div>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <article className="step-card" key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="campanas" className="campaign-section">
        <div className="section-heading">
          <p className="section-kicker">Campañas destacadas</p>
          <h2>Hoteles boutique listos para cambiar su energía.</h2>
        </div>
        <div className="campaign-grid">
          {campaigns.map((campaign) => (
            <article className="campaign-card" key={campaign.hotel}>
              <div>
                <p>{campaign.place}</p>
                <h3>{campaign.hotel}</h3>
              </div>
              <div className="progress-track">
                <span style={{ width: campaign.progress }} />
              </div>
              <dl>
                <div>
                  <dt>Meta</dt>
                  <dd>{campaign.goal}</dd>
                </div>
                <div>
                  <dt>Avance</dt>
                  <dd>{campaign.progress}</dd>
                </div>
              </dl>
              <p className="reward">{campaign.reward}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rewards-section">
        <div>
          <p className="section-kicker">Recompensas</p>
          <h2>El agradecimiento se vive en el destino.</h2>
          <p>
            Cada hotel define beneficios alineados con su hospitalidad: experiencias memorables, trato preferente y motivos reales para volver.
          </p>
        </div>
        <ul>
          {rewards.map((reward) => (
            <li key={reward}>{reward}</li>
          ))}
        </ul>
      </section>

      <section className="closing-section">
        <p className="section-kicker">Para hoteles y huéspedes</p>
        <h2>Energía que transforma, turismo que preserva.</h2>
        <p>
          Solange crea un puente entre descanso, comunidad e impacto ambiental para que cada estancia también pueda dejar algo mejor detrás.
        </p>
        <a href="#campanas" className="primary-link">Ver oportunidades</a>
      </section>
    </main>
  );
}
