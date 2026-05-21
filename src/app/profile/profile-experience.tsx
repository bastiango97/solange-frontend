"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiGift, FiLock, FiSun, FiUser } from "react-icons/fi";
import { campaigns, currency } from "@/data/campaigns";
import { getStoredUser, setStoredUser, type AuthUser } from "@/lib/auth";

type ProfileSection = "profile" | "contributions";

const contributions = [
  {
    id: "SOL-1048",
    campaignSlug: "casa-nube",
    hotel: "Casa Nube",
    tier: "Escapada Consciente",
    amount: 2500,
    date: "12 mayo 2026",
    rewardStatus: "onHold",
    rewardLabel: "On hold",
    rewardDetail: "Se libera cuando la campaña llegue al 80%.",
  },
  {
    id: "SOL-1031",
    campaignSlug: "monte-clara",
    hotel: "Monte Clara",
    tier: "Noche Clara",
    amount: 4200,
    date: "28 abril 2026",
    rewardStatus: "redeemable",
    rewardLabel: "Redeemable",
    rewardDetail: "Ya puedes solicitar fechas para usar tu recompensa.",
  },
  {
    id: "SOL-0994",
    campaignSlug: "luz-de-agua",
    hotel: "Luz de Agua",
    tier: "Mesa Solar",
    amount: 3500,
    date: "03 abril 2026",
    rewardStatus: "sent",
    rewardLabel: "Sent",
    rewardDetail: "El hotel ya envió instrucciones de redención.",
  },
  {
    id: "SOL-0917",
    campaignSlug: "hacienda-albor",
    hotel: "Hacienda Albor",
    tier: "Día Albor",
    amount: 1800,
    date: "15 marzo 2026",
    rewardStatus: "redeemed",
    rewardLabel: "Redeemed",
    rewardDetail: "Recompensa usada correctamente.",
  },
];

const sections = [
  { id: "profile", label: "Perfil", icon: FiUser },
  { id: "contributions", label: "Aportaciones", icon: FiGift },
] satisfies Array<{ id: ProfileSection; label: string; icon: typeof FiUser }>;

export default function ProfileExperience() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<ProfileSection>("profile");
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [secondLastName, setSecondLastName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const storedUser = getStoredUser();

    if (!storedUser) {
      router.replace("/login");
      return;
    }

    setUser(storedUser);
    const [storedFirstName = "", ...restOfName] = storedUser.fullName.split(" ");
    setFirstName(storedFirstName);
    setLastName(restOfName[0] ?? "");
    setSecondLastName(restOfName.slice(1).join(" "));
    setEmail(storedUser.email);
    setIsChecking(false);
  }, [router]);

  const totalContributed = contributions.reduce((sum, contribution) => sum + contribution.amount, 0);
  const hasPasswordConfirmation = newPassword.length > 0 && confirmPassword.length > 0;
  const passwordsMatch = hasPasswordConfirmation && newPassword === confirmPassword;

  const handleSaveProfile = () => {
    const composedName = [firstName, lastName, secondLastName].map((value) => value.trim()).filter(Boolean).join(" ");
    const updatedUser = {
      fullName: composedName || user?.fullName || "",
      email: email.trim() || user?.email || "",
    };

    setStoredUser(updatedUser);
    setUser(updatedUser);
  };

  if (isChecking) {
    return <main className="protected-loading">Cargando perfil...</main>;
  }

  if (!user) {
    return null;
  }

  return (
    <main className="profile-page">
      <section className="account-shell">
        <aside className="account-sidebar">
          <div className="account-user-card">
            <div className="profile-avatar">
              <FiUser size={30} />
            </div>
            <div>
              <strong>{user.fullName}</strong>
              <span>{user.email}</span>
            </div>
          </div>

          <nav className="account-menu" aria-label="Menú de perfil">
            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <button
                  type="button"
                  key={section.id}
                  className={activeSection === section.id ? "active" : ""}
                  onClick={() => setActiveSection(section.id)}
                >
                  <Icon size={19} />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="account-sidebar-summary">
            <span>{currency.format(totalContributed)}</span>
            <p>Aportado en campañas</p>
          </div>
        </aside>

        <section className="account-content">
          {activeSection === "profile" && (
            <article className="account-section-panel">
              <div className="account-section-heading">
                <p className="section-kicker">Perfil</p>
                <h1>Información del usuario</h1>
                <p>Administra tu información personal, correo de acceso y contraseña.</p>
              </div>

              <div className="profile-form-grid">
                <label>
                  Nombre
                  <input value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                </label>
                <label>
                  Apellido paterno
                  <input value={lastName} onChange={(event) => setLastName(event.target.value)} />
                </label>
                <label>
                  Apellido materno
                  <input value={secondLastName} onChange={(event) => setSecondLastName(event.target.value)} />
                </label>
                <label>
                  Correo
                  <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </label>
              </div>
              <button type="button" className="account-primary-action" onClick={handleSaveProfile}>
                Guardar cambios
              </button>

              <div className="password-change-block">
                <div className="password-change-heading">
                  <FiLock size={20} />
                  <div>
                    <h2>Cambiar contraseña</h2>
                  </div>
                </div>

                <div className="password-form-grid">
                  <label>
                    Contraseña actual
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(event) => setCurrentPassword(event.target.value)}
                    />
                  </label>
                  <label>
                    Nueva contraseña
                    <input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
                  </label>
                  <label>
                    Confirmar nueva contraseña
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                  </label>
                </div>

                {hasPasswordConfirmation && (
                  <div className={`password-match-indicator ${passwordsMatch ? "match" : "mismatch"}`}>
                    <span aria-hidden="true" />
                    <p>{passwordsMatch ? "Las contraseñas coinciden" : "Las contraseñas no coinciden"}</p>
                  </div>
                )}

                <button type="button" className="account-secondary-action">
                  Actualizar contraseña
                </button>
              </div>
            </article>
          )}

          {activeSection === "contributions" && (
            <article className="account-section-panel">
              <div className="account-section-heading">
                <p className="section-kicker">Aportaciones</p>
                <h1>Campañas y rewards</h1>
                <p>Consulta tus aportaciones, entra directo a cada campaña y revisa el estado de tus recompensas.</p>
              </div>

              <div className="contribution-list">
                {contributions.map((contribution) => {
                  const campaign = campaigns.find((item) => item.slug === contribution.campaignSlug);

                  return (
                    <article className="contribution-card" key={contribution.id}>
                      <div className={`contribution-image hotel-image ${campaign?.imageTone ?? "forest"}`}>
                        <span>{campaign?.category ?? "Hotel"}</span>
                      </div>
                      <div className="contribution-copy">
                        <div>
                          <p className="contribution-meta">
                            <FiSun size={15} />
                            {contribution.id} · {contribution.date}
                          </p>
                          <h3>{contribution.hotel}</h3>
                          <p>{contribution.tier} · {currency.format(contribution.amount)}</p>
                        </div>
                        <Link href={`/campaigns/${contribution.campaignSlug}`}>Ver campaña</Link>
                      </div>
                      <div className="reward-status-panel">
                        <span className={`reward-status ${contribution.rewardStatus}`}>{contribution.rewardLabel}</span>
                        <p>{contribution.rewardDetail}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </article>
          )}
        </section>
      </section>
    </main>
  );
}
