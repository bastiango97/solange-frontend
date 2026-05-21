"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FiCheckCircle, FiLock, FiMail, FiUser } from "react-icons/fi";
import { getPasswordLabel, getPasswordScore, setStoredUser } from "@/lib/auth";

type AuthMode = "login" | "register";

export default function LoginExperience() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const passwordScore = useMemo(() => getPasswordScore(password), [password]);
  const passwordLabel = getPasswordLabel(passwordScore);
  const passwordsMatch = confirmPassword === "" || password === confirmPassword;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Ingresa correo y contraseña.");
      return;
    }

    if (mode === "register") {
      if (!fullName.trim()) {
        setError("Ingresa tu nombre completo.");
        return;
      }

      if (password.length < 8) {
        setError("La contraseña debe tener al menos 8 caracteres.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden.");
        return;
      }
    }

    setStoredUser({
      email: email.trim(),
      fullName: mode === "register" ? fullName.trim() : email.split("@")[0],
    });
    router.push("/profile");
  };

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <p className="section-kicker">SOLANGE®</p>
        <h1>Entra a tu comunidad solar.</h1>
        <p>
          Guarda campañas, revisa tus aportaciones y accede a recompensas de hoteles boutique que están financiando su transición energética.
        </p>
        <div className="auth-proof">
          <FiCheckCircle size={20} />
          <span>Tu perfil conectará aportaciones, recompensas y reservas futuras.</span>
        </div>
      </section>

      <section className="auth-card" aria-label="Formulario de acceso">
        <div className="auth-tabs">
          <button type="button" className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>
            Login
          </button>
          <button type="button" className={mode === "register" ? "active" : ""} onClick={() => setMode("register")}>
            Registrarme
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === "register" && (
            <label>
              Nombre completo
              <div className="auth-input">
                <FiUser size={18} />
                <input
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Tu nombre"
                />
              </div>
            </label>
          )}

          <label>
            Correo
            <div className="auth-input">
              <FiMail size={18} />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="correo@ejemplo.com"
              />
            </div>
          </label>

          <label>
            Contraseña
            <div className="auth-input">
              <FiLock size={18} />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Mínimo 8 caracteres"
              />
            </div>
          </label>

          {mode === "register" && (
            <>
              <div className={`password-meter score-${passwordScore}`}>
                <div>
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <p>Seguridad: {passwordLabel}</p>
              </div>

              <label>
                Confirmar contraseña
                <div className="auth-input">
                  <FiLock size={18} />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Repite tu contraseña"
                  />
                </div>
              </label>

              {!passwordsMatch && <p className="auth-error">Las contraseñas no coinciden.</p>}
            </>
          )}

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit">
            {mode === "login" ? "Entrar" : "Crear cuenta"}
          </button>
        </form>
      </section>
    </main>
  );
}
