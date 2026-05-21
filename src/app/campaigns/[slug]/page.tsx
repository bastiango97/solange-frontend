import { notFound } from "next/navigation";
import { FiMapPin, FiSun, FiUsers } from "react-icons/fi";
import { campaigns, currency, getCampaignBySlug, getProgress } from "@/data/campaigns";
import CampaignCarousel from "./campaign-carousel";
import TierCarousel from "./tier-carousel";

export function generateStaticParams() {
  return campaigns.map((campaign) => ({
    slug: campaign.slug,
  }));
}

export default async function CampaignDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const campaign = getCampaignBySlug(slug);

  if (!campaign) {
    notFound();
  }

  const progress = getProgress(campaign);

  return (
    <main className="campaign-detail-page">
      <section className="campaign-hero">
        <div className="campaign-hero-copy">
          <p className="section-kicker">{campaign.category}</p>
          <h1>{campaign.hotel}</h1>
          <p className="campaign-location">
            <FiMapPin size={18} />
            {campaign.location}
          </p>
          <p>{campaign.description}</p>
        </div>

        <CampaignCarousel hotel={campaign.hotel} category={campaign.category} imageTone={campaign.imageTone} />
      </section>

      <section className="campaign-content">
        <div className="campaign-main">
          <section className="detail-section tiers-highlight" id="tiers">
            <div className="tiers-headline">
              <div>
                <p className="section-kicker">Tiers de aportación</p>
                <h2>Elige cómo quieres participar.</h2>
              </div>
              <p>
                Cada tier funciona como una recompensa reservable: aportas al proyecto solar y recibes beneficios para vivir el hotel en una próxima visita.
              </p>
            </div>
            <TierCarousel tiers={campaign.tiers} />
          </section>

          <section className="detail-section">
            <p className="section-kicker">El hotel</p>
            <h2>Hospitalidad boutique con una meta solar clara.</h2>
            <p>{campaign.longDescription}</p>
            <div className="hotel-facts">
              <div>
                <strong>{campaign.rooms}</strong>
                <span>habitaciones</span>
              </div>
              <div>
                <strong>{campaign.supporters}</strong>
                <span>aportantes</span>
              </div>
              <div>
                <strong>{progress}%</strong>
                <span>financiado</span>
              </div>
            </div>
          </section>

          <section className="detail-section">
            <p className="section-kicker">Proyecto solar</p>
            <h2>{campaign.solarGoal}</h2>
            <p>
              La campaña está enfocada en financiar la instalación solar del hotel con aportaciones de huéspedes y comunidad. Los detalles técnicos se irán publicando conforme el proyecto avance con el socio instalador.
            </p>
          </section>

          <section className="detail-section">
            <p className="section-kicker">Experiencia</p>
            <h2>Qué hace especial a {campaign.hotel}.</h2>
            <div className="feature-grid">
              {campaign.highlights.map((highlight) => (
                <article key={highlight}>
                  <FiSun size={20} />
                  <h3>{highlight}</h3>
                </article>
              ))}
            </div>
            <div className="amenities-list">
              {campaign.amenities.map((amenity) => (
                <span key={amenity}>{amenity}</span>
              ))}
            </div>
          </section>
        </div>

        <aside className="campaign-summary" aria-label="Resumen de campaña">
          <p className="section-kicker">Crowdfunding solar</p>
          <h2>{progress}% financiado</h2>
          <div className="progress-track">
            <span style={{ width: `${progress}%` }} />
          </div>
          <dl>
            <div>
              <dt>Recaudado</dt>
              <dd>{currency.format(campaign.raised)}</dd>
            </div>
            <div>
              <dt>Meta</dt>
              <dd>{currency.format(campaign.goal)}</dd>
            </div>
            <div>
              <dt>Aportantes</dt>
              <dd>
                <FiUsers size={17} />
                {campaign.supporters}
              </dd>
            </div>
          </dl>
          <p>{campaign.reward}</p>
          <a href="#tiers">Ver recompensas</a>
        </aside>
      </section>
    </main>
  );
}
