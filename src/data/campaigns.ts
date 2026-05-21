export type CampaignTier = {
  name: string;
  amount: number;
  description: string;
  rewards: string[];
  available: number;
};

export type Campaign = {
  id: number;
  slug: string;
  hotel: string;
  location: string;
  description: string;
  longDescription: string;
  category: string;
  goal: number;
  raised: number;
  supporters: number;
  minTier: number;
  maxTier: number;
  reward: string;
  imageTone: string;
  rooms: number;
  solarGoal: string;
  impact: string[];
  amenities: string[];
  highlights: string[];
  tiers: CampaignTier[];
};

export const campaigns: Campaign[] = [
  {
    id: 1,
    slug: "casa-nube",
    hotel: "Casa Nube",
    location: "Valle de Bravo, Estado de México",
    description: "Refugio de montaña con ocho suites, cocina de temporada y una terraza rodeada de bosque.",
    longDescription:
      "Casa Nube busca financiar una instalación solar que reduzca el consumo eléctrico de sus áreas comunes, cocina y sistema de agua caliente. La campaña invita a huéspedes frecuentes y nuevos viajeros a participar en una mejora visible, medible y alineada con la calma del destino.",
    category: "Montaña",
    goal: 480000,
    raised: 326400,
    supporters: 142,
    minTier: 750,
    maxTier: 12000,
    reward: "20% de descuento, desayuno para dos y late checkout.",
    imageTone: "forest",
    rooms: 8,
    solarGoal: "Instalar 34 paneles solares para cubrir áreas comunes y cocina.",
    impact: ["Hasta 42% menos consumo de red", "17 toneladas de CO2 evitadas al año", "Operación más estable en temporada alta"],
    amenities: ["Terraza al bosque", "Cocina de temporada", "Spa pequeño", "Chimeneas privadas"],
    highlights: ["Arquitectura integrada al paisaje", "Experiencias de senderismo", "Hospitalidad íntima"],
    tiers: [
      {
        name: "Huella Solar",
        amount: 750,
        description: "Una aportación accesible para formar parte de la transición energética del hotel.",
        rewards: ["10% de descuento en hospedaje", "Bebida de bienvenida", "Nombre en muro digital de aportantes"],
        available: 120,
      },
      {
        name: "Escapada Consciente",
        amount: 2500,
        description: "Pensado para huéspedes que ya imaginan su próxima visita a Valle de Bravo.",
        rewards: ["20% de descuento en estancia", "Desayuno para dos", "Late checkout sujeto a disponibilidad"],
        available: 54,
      },
      {
        name: "Estancia Fundadora",
        amount: 12000,
        description: "Una recompensa premium para quienes quieren vivir el proyecto desde dentro.",
        rewards: ["Noche para dos entre semana", "Cena privada de temporada", "Tour del proyecto solar"],
        available: 12,
      },
    ],
  },
  {
    id: 2,
    slug: "luz-de-agua",
    hotel: "Luz de Agua",
    location: "Bacalar, Quintana Roo",
    description: "Hotel boutique frente a la laguna con habitaciones luminosas y experiencias de bajo impacto.",
    longDescription:
      "Luz de Agua quiere alimentar parte de su operación con energía solar para proteger la experiencia serena de la laguna. La campaña prioriza iluminación, refrigeración eficiente y áreas de servicio, con recompensas ligadas a gastronomía local y estancias futuras.",
    category: "Laguna",
    goal: 620000,
    raised: 260400,
    supporters: 88,
    minTier: 500,
    maxTier: 18000,
    reward: "Cena de autor frente a la laguna y prioridad de reserva.",
    imageTone: "water",
    rooms: 14,
    solarGoal: "Instalar un sistema solar híbrido para operación diurna y respaldo parcial.",
    impact: ["Menor dependencia de generadores", "Iluminación limpia en zonas comunes", "Reducción de costos operativos"],
    amenities: ["Muelle privado", "Kayaks", "Cocina de autor", "Habitaciones con vista al agua"],
    highlights: ["Frente a la laguna", "Diseño luminoso", "Experiencias acuáticas responsables"],
    tiers: [
      {
        name: "Brillo Inicial",
        amount: 500,
        description: "Apoyo de entrada para viajeros que quieren sumar al cuidado de Bacalar.",
        rewards: ["Crédito de $650 MXN para alimentos", "Prioridad en newsletter de fechas especiales"],
        available: 180,
      },
      {
        name: "Mesa Solar",
        amount: 3500,
        description: "Una recompensa centrada en la cocina del hotel y el paisaje de la laguna.",
        rewards: ["Cena de autor para dos", "Coctel de bienvenida", "15% de descuento en hospedaje"],
        available: 40,
      },
      {
        name: "Laguna Fundadora",
        amount: 18000,
        description: "Para aportantes que quieren reservar una experiencia completa.",
        rewards: ["Dos noches para dos", "Cena frente a la laguna", "Paseo privado al amanecer"],
        available: 8,
      },
    ],
  },
  {
    id: 3,
    slug: "monte-clara",
    hotel: "Monte Clara",
    location: "San Miguel de Allende, Guanajuato",
    description: "Casa patrimonial restaurada con patios íntimos, arte local y hospitalidad de ritmo lento.",
    longDescription:
      "Monte Clara combina una casa histórica con mejoras energéticas discretas. Su campaña busca financiar paneles solares sin alterar la estética patrimonial, enfocándose en habitaciones, patios iluminados y sistemas de agua caliente.",
    category: "Ciudad colonial",
    goal: 390000,
    raised: 315900,
    supporters: 176,
    minTier: 1000,
    maxTier: 9500,
    reward: "Upgrade sujeto a disponibilidad y amenidad de bienvenida.",
    imageTone: "terracotta",
    rooms: 11,
    solarGoal: "Cubrir iluminación y agua caliente sin intervenir la fachada histórica.",
    impact: ["Menor consumo en habitaciones", "Ahorro energético en lavandería", "Proyecto compatible con patrimonio"],
    amenities: ["Patios interiores", "Galería local", "Café de especialidad", "Tina en habitaciones selectas"],
    highlights: ["Casa restaurada", "Arte local", "Ubicación caminable"],
    tiers: [
      {
        name: "Patio Solar",
        amount: 1000,
        description: "Una aportación para iluminar patios y áreas compartidas con energía limpia.",
        rewards: ["Amenidad de bienvenida", "12% de descuento en reserva directa"],
        available: 80,
      },
      {
        name: "Noche Clara",
        amount: 4200,
        description: "Ideal para quienes planean una escapada colonial de fin de semana.",
        rewards: ["Upgrade sujeto a disponibilidad", "Desayuno para dos", "Crédito en café de especialidad"],
        available: 32,
      },
      {
        name: "Casa Mecenas",
        amount: 9500,
        description: "Una experiencia íntima con acceso especial al proyecto y al equipo del hotel.",
        rewards: ["Noche para dos", "Recorrido privado de arte local", "Cena maridaje"],
        available: 10,
      },
    ],
  },
  {
    id: 4,
    slug: "mar-serena",
    hotel: "Mar Serena",
    location: "Todos Santos, Baja California Sur",
    description: "Pequeño hotel costero con arquitectura sobria, cocina del huerto y caminatas al atardecer.",
    longDescription:
      "Mar Serena quiere aprovechar la radiación solar de Baja California Sur para operar de forma más eficiente durante temporadas de alta ocupación. La campaña apoya energía para habitaciones, cocina del huerto y zonas de descanso.",
    category: "Costa",
    goal: 710000,
    raised: 376300,
    supporters: 121,
    minTier: 1500,
    maxTier: 22000,
    reward: "Noche preferente entre semana y cata privada para dos.",
    imageTone: "sand",
    rooms: 16,
    solarGoal: "Instalar paneles para habitaciones, cocina y zonas exteriores.",
    impact: ["Aprovechamiento solar costero", "Menos ruido por respaldo eléctrico", "Mayor resiliencia operativa"],
    amenities: ["Huerto propio", "Alberca silenciosa", "Catas privadas", "Rutas al atardecer"],
    highlights: ["Arquitectura sobria", "Cocina de huerto", "Cercanía al mar"],
    tiers: [
      {
        name: "Rayo Costero",
        amount: 1500,
        description: "Aporte para sumar a la energía limpia de zonas comunes.",
        rewards: ["15% de descuento", "Bebida del huerto", "Acceso anticipado a promociones"],
        available: 70,
      },
      {
        name: "Atardecer Serena",
        amount: 6000,
        description: "Experiencia para dos con sabor local y mirada al mar.",
        rewards: ["Cata privada para dos", "Late checkout", "Crédito en restaurante"],
        available: 24,
      },
      {
        name: "Fundador del Mar",
        amount: 22000,
        description: "El tier premium para vivir el hotel con trato preferente.",
        rewards: ["Dos noches entre semana", "Cena privada", "Clase de cocina del huerto"],
        available: 6,
      },
    ],
  },
  {
    id: 5,
    slug: "hacienda-albor",
    hotel: "Hacienda Albor",
    location: "Mérida, Yucatán",
    description: "Hacienda contemporánea con jardines amplios, alberca tranquila y habitaciones de diseño local.",
    longDescription:
      "Hacienda Albor busca financiar su primera etapa solar para disminuir el consumo en jardines, alberca y habitaciones. La campaña está pensada para visitantes que aman Yucatán y quieren regresar con beneficios exclusivos.",
    category: "Hacienda",
    goal: 540000,
    raised: 145800,
    supporters: 64,
    minTier: 350,
    maxTier: 8000,
    reward: "Day pass con comida regional y descuento en hospedaje.",
    imageTone: "garden",
    rooms: 12,
    solarGoal: "Primera etapa solar para alberca, jardines y habitaciones.",
    impact: ["Menor consumo en climatización", "Iluminación eficiente en jardines", "Ahorro para reinvertir en comunidad local"],
    amenities: ["Alberca tranquila", "Jardines amplios", "Comida regional", "Diseño yucateco"],
    highlights: ["Hacienda contemporánea", "Cerca del centro histórico", "Experiencia regional"],
    tiers: [
      {
        name: "Semilla Solar",
        amount: 350,
        description: "Aporte inicial para huéspedes que quieren apoyar desde cualquier lugar.",
        rewards: ["Café de bienvenida", "Nombre en comunidad Solange"],
        available: 200,
      },
      {
        name: "Día Albor",
        amount: 1800,
        description: "Una forma sencilla de vivir la hacienda y apoyar su transición.",
        rewards: ["Day pass para dos", "Comida regional", "10% de descuento en hospedaje"],
        available: 60,
      },
      {
        name: "Huésped Fundador",
        amount: 8000,
        description: "Para quienes quieren reservar una estancia con trato especial.",
        rewards: ["Noche para dos", "Cena regional", "Detalle artesanal en habitación"],
        available: 14,
      },
    ],
  },
];

export function getCampaignBySlug(slug: string) {
  return campaigns.find((campaign) => campaign.slug === slug);
}

export function getProgress(campaign: Pick<Campaign, "raised" | "goal">) {
  return Math.min(Math.round((campaign.raised / campaign.goal) * 100), 100);
}

export const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});
