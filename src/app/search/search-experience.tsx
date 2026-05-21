"use client";

import { useMemo, useState } from "react";
import { FiChevronDown, FiMapPin, FiSliders, FiSun, FiUsers } from "react-icons/fi";
import Link from "next/link";
import { campaigns, currency, getProgress } from "@/data/campaigns";

const locations = ["Todas", ...Array.from(new Set(campaigns.map((campaign) => campaign.location.split(",")[0])))];
const priceRanges = [
  { label: "Hasta $750", min: 0, max: 750 },
  { label: "$750 - $1,500", min: 750, max: 1500 },
  { label: "$1,500 - $5,000", min: 1500, max: 5000 },
  { label: "Más de $5,000", min: 5000, max: Number.POSITIVE_INFINITY },
];

export default function SearchExperience() {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const matchesLocation =
        selectedLocations.length === 0 ||
        selectedLocations.some((selectedLocation) => campaign.location.startsWith(selectedLocation));
      const matchesTierRange =
        selectedPriceRanges.length === 0 ||
        selectedPriceRanges.some((selectedLabel) => {
          const range = priceRanges.find((priceRange) => priceRange.label === selectedLabel);

          return range ? campaign.minTier <= range.max && campaign.maxTier >= range.min : true;
        });

      return matchesLocation && matchesTierRange;
    });
  }, [selectedLocations, selectedPriceRanges]);

  const toggleLocation = (option: string) => {
    setSelectedLocations((current) =>
      current.includes(option) ? current.filter((item) => item !== option) : [...current, option],
    );
  };

  const togglePriceRange = (option: string) => {
    setSelectedPriceRanges((current) =>
      current.includes(option) ? current.filter((item) => item !== option) : [...current, option],
    );
  };

  return (
    <main className="search-page">
      <section className="search-hero">
        <p className="section-kicker">Explorar campañas</p>
        <h1>Encuentra hoteles boutique que están transformando su energía.</h1>
        <p>
          Busca por destino, nombre del hotel o rango de aportación. Cada campaña combina una meta solar clara con recompensas pensadas para huéspedes conscientes.
        </p>
      </section>

      <section className="search-shell">
        <aside className="filters-panel" aria-label="Filtros de búsqueda">
          <div className="filters-title">
            <FiSliders size={20} />
            <h2>Filtros</h2>
          </div>

          <details className="multi-filter" open>
            <summary>
              <span>
                Localización
                <small>{selectedLocations.length === 0 ? "Todas" : `${selectedLocations.length} seleccionadas`}</small>
              </span>
              <FiChevronDown size={18} />
            </summary>
            <div className="multi-filter-options">
              {locations.slice(1).map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={selectedLocations.includes(option)}
                    onChange={() => toggleLocation(option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </details>

          <details className="multi-filter" open>
            <summary>
              <span>
                Rango de tiers
                <small>
                  {selectedPriceRanges.length === 0 ? "Cualquier aporte" : `${selectedPriceRanges.length} seleccionados`}
                </small>
              </span>
              <FiChevronDown size={18} />
            </summary>
            <div className="multi-filter-options">
              {priceRanges.map((range) => (
                <label key={range.label}>
                  <input
                    type="checkbox"
                    checked={selectedPriceRanges.includes(range.label)}
                    onChange={() => togglePriceRange(range.label)}
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </details>

          {(selectedLocations.length > 0 || selectedPriceRanges.length > 0) && (
            <button
              type="button"
              className="clear-filters"
              onClick={() => {
                setSelectedLocations([]);
                setSelectedPriceRanges([]);
              }}
            >
              Limpiar filtros
            </button>
          )}
        </aside>

        <div className="results-area">
          <div className="results-summary">
            <div>
              <p>{filteredCampaigns.length} campañas encontradas</p>
              <h2>Hoteles con proyectos solares activos</h2>
            </div>
            <span>Orden sugerido: mayor relevancia</span>
          </div>

          <div className="hotel-results">
            {filteredCampaigns.map((campaign) => {
              const progress = getProgress(campaign);

              return (
                <article className="hotel-result-card" key={campaign.id}>
                  <div className={`hotel-image ${campaign.imageTone}`}>
                    <span>{campaign.category}</span>
                  </div>

                  <div className="hotel-info">
                    <div>
                      <p className="hotel-location">
                        <FiMapPin size={16} />
                        {campaign.location}
                      </p>
                      <h3>{campaign.hotel}</h3>
                      <p className="hotel-description">{campaign.description}</p>
                    </div>

                    <div className="reward-strip">
                      <FiSun size={18} />
                      <span>{campaign.reward}</span>
                    </div>
                  </div>

                  <div className="funding-panel">
                    <p className="tier-range">
                      Tiers desde <strong>{currency.format(campaign.minTier)}</strong>
                    </p>
                    <div className="funding-progress">
                      <div className="funding-copy">
                        <strong>{progress}% financiado</strong>
                        <span>{currency.format(campaign.raised)} de {currency.format(campaign.goal)}</span>
                      </div>
                      <div className="progress-track">
                        <span style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                    <div className="supporters">
                      <FiUsers size={17} />
                      <span>{campaign.supporters} aportantes</span>
                    </div>
                    <Link href={`/campaigns/${campaign.slug}`} className="campaign-link">Ver campaña</Link>
                  </div>
                </article>
              );
            })}
          </div>

          {filteredCampaigns.length === 0 && (
            <div className="empty-results">
              <h3>No encontramos campañas con esos filtros.</h3>
              <p>Prueba con otro destino o un rango de aportación más amplio.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
