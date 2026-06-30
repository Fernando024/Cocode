"use client";

import { useState } from "react";
import styles from "./Compra.module.css";

const OPCIONES_PAGO = [
  { id: "completo", label: "Pago completo", multiplicador: 1, desc: "Paga el total del proyecto de contado y obtén acceso completo de inmediato." },
  { id: "anticipo", label: "Anticipo 50%", multiplicador: 0.5, desc: "Cuentas con una propuesta que te agrade y diseños mostrados en Figma para posterior realizar el sitio." },
  { id: "liquidar", label: "Liquidar 50%", multiplicador: 0.5, desc: "Liquida el saldo restante para liberar el sitio web completo y todos los archivos finales." },
];

export default function CheckoutForm({ producto, moneda, precio, logoUrl, descripcion, insignia, notaPrecio, subtitulo, caracteristicas }) {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    celular: "",
  });
  const [errores, setErrores] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [caracteristicasAbierto, setCaracteristicasAbierto] = useState(false);
  const [tipoPago, setTipoPago] = useState("completo");

  function validar() {
    const errs = {};
    if (!form.nombre.trim()) errs.nombre = "Obligatorio";
    if (!form.correo.trim()) {
      errs.correo = "Obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(form.correo)) {
      errs.correo = "Correo inválido";
    }
    setErrores(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validar()) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          producto,
          precio,
          moneda,
          tipoPago,
          monto: montoPagar,
          ...form,
        }),
      });
      const respuestaJson = await res.json();
      const urlPago = String(respuestaJson.url || "");
      if (urlPago) {
        window.location.replace(urlPago);
        return;
      }
      setErrorMsg(respuestaJson.error || "Error al procesar la compra");
    } catch {
      setErrorMsg("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: "" }));
    }
  }

  const opcionActual = OPCIONES_PAGO.find((o) => o.id === tipoPago);
  const montoPagar = typeof precio === "number" ? precio * (opcionActual?.multiplicador ?? 1) : precio;

  const precioFormateado =
    typeof montoPagar === "number"
      ? montoPagar.toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : montoPagar;

  const precioTotalFormateado =
    typeof precio === "number"
      ? precio.toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : precio;

  const campoCls = (name) =>
    `${styles.input}${errores[name] ? ` ${styles.inputError}` : ""}`;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.productoResumen}>
        <div className={styles.productoHeader}>
          {logoUrl && (
            <img
              src={logoUrl}
              alt={producto}
              className={styles.productoLogo}
            />
          )}
          <div className={styles.productoInfo}>
            <span className={styles.productoNombre}>{producto}</span>
            {subtitulo && <span className={styles.productoSubtitulo}>{subtitulo}</span>}
            {insignia && <span className={styles.productoInsignia}>{insignia}</span>}
          </div>
        </div>
        {descripcion && (
          <p className={styles.productoDescripcion}>{descripcion}</p>
        )}
        <span className={styles.productoPrecio}>
          {precioFormateado}
          <span className={styles.moneda}>{moneda}</span>
        </span>
        {tipoPago !== "completo" && (
          <span className={styles.precioTotalTachado}>
            {precioTotalFormateado} {moneda}
          </span>
        )}
        {notaPrecio && <span className={styles.notaPrecio}>{notaPrecio}</span>}

        {Array.isArray(caracteristicas) && caracteristicas.length > 0 && (
          <div className={styles.caracteristicasWrap}>
            <button
              type="button"
              className={styles.caracteristicasToggle}
              onClick={() => setCaracteristicasAbierto((v) => !v)}
            >
              <span>Qué incluye</span>
              <svg
                className={`${styles.caracteristicasChevron}${caracteristicasAbierto ? ` ${styles.chevronAbierto}` : ""}`}
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className={`${styles.caracteristicasContent}${caracteristicasAbierto ? ` ${styles.contentAbierto}` : ""}`}>
              <ul className={styles.caracteristicasList}>
                {caracteristicas.map((feat, i) => (
                  <li key={i} className={styles.caracteristicaItem}>
                    <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className={styles.opcionesPago}>
        <span className={styles.opcionesLabel}>Tipo de pago</span>
        <div className={styles.opcionesGrupo}>
          {OPCIONES_PAGO.map((op) => (
            <label
              key={op.id}
              className={`${styles.opcion}${tipoPago === op.id ? ` ${styles.opcionActiva}` : ""}`}
            >
              <input
                type="radio"
                name="tipoPago"
                value={op.id}
                checked={tipoPago === op.id}
                onChange={(e) => setTipoPago(e.target.value)}
                className={styles.opcionRadio}
              />
              <span className={styles.opcionLabel}>{op.label}</span>
              {tipoPago === op.id && (
                <span className={styles.opcionMonto}>
                  {precioFormateado} <span className={styles.opcionMoneda}>{moneda}</span>
                </span>
              )}
            </label>
          ))}
        </div>
        {opcionActual?.desc && (
          <p className={styles.opcionesDesc}>{opcionActual.desc}</p>
        )}
      </div>

      <div className={styles.campos}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="nombre">
            Nombre completo
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            className={campoCls("nombre")}
            value={form.nombre}
            onChange={handleChange}
            placeholder="Coloca tu nombre"
          />
          {errores.nombre && (
            <span className={styles.error}>{errores.nombre}</span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="correo">
            Correo electrónico <span className={styles.required}>*</span>
          </label>
          <input
            id="correo"
            name="correo"
            type="email"
            className={campoCls("correo")}
            value={form.correo}
            onChange={handleChange}
            placeholder="Coloca tu correo electrónico"
          />
          {errores.correo && (
            <span className={styles.error}>{errores.correo}</span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="celular">
            Celular
          </label>
          <input
            id="celular"
            name="celular"
            type="tel"
            className={campoCls("celular")}
            value={form.celular}
            onChange={handleChange}
            placeholder="Coloca tu número celular"
          />
        </div>

        <p className={styles.cardNota}>
          Serás redirigido a Stripe para realizar el pago de forma segura.
        </p>
      </div>

      <button
        type="submit"
        className={styles.botonSubmit}
        disabled={loading}
      >
        {loading ? "Procesando…" : `Pagar ${precioFormateado} ${moneda}`}
      </button>

      {errorMsg && (
        <div className={styles.respuestaError}>
          {errorMsg}
        </div>
      )}
    </form>
  );
}
