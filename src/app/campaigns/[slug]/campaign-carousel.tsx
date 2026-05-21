"use client";

import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type CampaignCarouselProps = {
  hotel: string;
  category: string;
  imageTone: string;
};

const photoLabels = ["Fachada boutique", "Habitación principal", "Terraza solar", "Experiencia local"];

export default function CampaignCarousel({ hotel, category, imageTone }: CampaignCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % photoLabels.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + photoLabels.length) % photoLabels.length);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % photoLabels.length);
  };

  return (
    <div className="campaign-carousel" aria-label={`Carrusel de fotos de ${hotel}`}>
      <div className={`carousel-frame hotel-image ${imageTone} carousel-shot-${activeIndex}`}>
        <span>{category}</span>
        <p>{photoLabels[activeIndex]}</p>
      </div>

      <button type="button" className="carousel-arrow previous" onClick={goToPrevious} aria-label="Foto anterior">
        <FiChevronLeft size={24} />
      </button>
      <button type="button" className="carousel-arrow next" onClick={goToNext} aria-label="Siguiente foto">
        <FiChevronRight size={24} />
      </button>

      <div className="carousel-dots" aria-label="Fotos disponibles">
        {photoLabels.map((label, index) => (
          <button
            type="button"
            key={label}
            className={index === activeIndex ? "active" : ""}
            onClick={() => setActiveIndex(index)}
            aria-label={`Ver ${label}`}
          />
        ))}
      </div>
    </div>
  );
}
