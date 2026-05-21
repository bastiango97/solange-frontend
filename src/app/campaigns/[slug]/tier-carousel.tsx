"use client";

import { useRef } from "react";
import { FiCheck, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { CampaignTier } from "@/data/campaigns";
import { currency } from "@/data/campaigns";

type TierCarouselProps = {
  tiers: CampaignTier[];
};

export default function TierCarousel({ tiers }: TierCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    track.scrollBy({
      left: direction === "left" ? -360 : 360,
      behavior: "smooth",
    });
  };

  return (
    <div className="tier-carousel">
      <div className="tier-carousel-actions">
        <button type="button" onClick={() => scroll("left")} aria-label="Ver tier anterior">
          <FiChevronLeft size={22} />
        </button>
        <button type="button" onClick={() => scroll("right")} aria-label="Ver siguiente tier">
          <FiChevronRight size={22} />
        </button>
      </div>

      <div className="tier-track" ref={trackRef}>
        {tiers.map((tier) => (
          <article className="tier-card" key={tier.name}>
            <div className="tier-heading">
              <div>
                <p>{tier.name}</p>
                <h3>{currency.format(tier.amount)}</h3>
              </div>
              <span>{tier.available} disponibles</span>
            </div>
            <p>{tier.description}</p>
            <ul>
              {tier.rewards.map((reward) => (
                <li key={reward}>
                  <FiCheck size={17} />
                  <span>{reward}</span>
                </li>
              ))}
            </ul>
            <button type="button">Aportar a este tier</button>
          </article>
        ))}
      </div>
    </div>
  );
}
