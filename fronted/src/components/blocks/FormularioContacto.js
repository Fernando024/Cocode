"use client";

import { useState } from "react";
import "@/components/effects/toast.css";
import styles from "./FormularioContacto.module.css";

export default function FormularioContacto({ block }) {
  const raw = block || {};
  const titulo = raw.titulo || "Contáctanos";
  const nombreLabel = raw.nombre || "Tu nombre";
  const correoLabel = raw.correo || "tucorreo@ejemplo.com";
  const telefonoLabel = raw.telefono || "Tu teléfono";
  const mensajePlaceholder = raw.mensaje || "Escribe tu mensaje...";
  const boton = raw.boton || "Enviar";
  const correo_destino = raw.correo_destino || "";
  const mensaje_exito = raw.mensaje_exito || "¡Mensaje enviado exitosamente!";

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, correo_destino }),
      });

      const data = await res.json();

      if (data.ok) {
        setFormData({ nombre: "", correo: "", telefono: "", mensaje: "" });
        setToast(true);
        setTimeout(() => setToast(false), 4000);
      } else {
        alert(data.error || "Error al enviar el mensaje.");
      }
    } catch {
      alert("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className={styles.section}>
      <div className={`toast ${toast ? "show" : ""}`}>
        {mensaje_exito}
      </div>

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        {titulo && <h2 className={styles.title}>{titulo}</h2>}

        <div className={styles.grid}>
          <div className={styles.field}>
            <label className={styles.label}>{nombreLabel}</label>
            <input
              className={styles.input}
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder={nombreLabel}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>{correoLabel}</label>
            <input
              className={styles.input}
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder={correoLabel}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>{telefonoLabel}</label>
            <input
              className={styles.input}
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder={telefonoLabel}
            />
          </div>

          <div className={`${styles.field} ${styles.fieldFull}`}>
            <label className={styles.label}>Mensaje</label>
            <textarea
              className={styles.textarea}
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              placeholder={mensajePlaceholder}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className={`${styles.button} ${loading ? styles.loading : ""}`}
          disabled={loading}
        >
          {loading ? "Enviando..." : boton}
        </button>
      </form>
    </section>
  );
}
