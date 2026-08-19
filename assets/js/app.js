/* ═══════════════════════════════════════════════════════════════════
   Cabañas Puerta del Sol — comportamiento
   JavaScript clásico, un solo IIFE. Sin módulos: el sitio tiene que
   funcionar abriendo index.html con doble clic.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var raiz = document.documentElement;

  /* El respaldo de verdad vive en el <head>: si este archivo nunca carga,
     aquel temporizador quita .js igual y el contenido aparece. Acá sólo lo
     cancelamos porque ya estamos corriendo. */
  if (window.respaldoJs) { clearTimeout(window.respaldoJs); }

  var quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hayGsap = typeof window.gsap !== "undefined";
  var haySt = hayGsap && typeof window.ScrollTrigger !== "undefined";
  if (haySt) { gsap.registerPlugin(ScrollTrigger); }

  var SUAVE = "power3.out";
  var WASAP = "56974762567";

  /* ── Utilidades ──────────────────────────────────────────────── */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  }
  function waUrl(texto) {
    return "https://wa.me/" + WASAP + "?text=" + encodeURIComponent(texto);
  }

  /* ═══ 1 · NAVEGACIÓN ═══════════════════════════════════════════ */
  var nav = $("#nav");
  var hamburguesa = $("#hamburguesa");
  var menu = $("#menu");

  function pintaNav() {
    if (!nav) { return; }
    nav.classList.toggle("es-solida", window.scrollY > 40);
  }
  window.addEventListener("scroll", pintaNav, { passive: true });
  pintaNav();

  function cierraMenu() {
    if (!nav) { return; }
    nav.classList.remove("es-abierta");
    if (hamburguesa) {
      hamburguesa.setAttribute("aria-expanded", "false");
      hamburguesa.setAttribute("aria-label", "Abrir el menú");
    }
  }

  if (hamburguesa && nav) {
    hamburguesa.addEventListener("click", function () {
      var abierta = nav.classList.toggle("es-abierta");
      hamburguesa.setAttribute("aria-expanded", abierta ? "true" : "false");
      hamburguesa.setAttribute("aria-label", abierta ? "Cerrar el menú" : "Abrir el menú");
    });
  }
  if (menu) {
    $$("a", menu).forEach(function (a) { a.addEventListener("click", cierraMenu); });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { cierraMenu(); }
  });

  /* ═══ 2 · ENTRADA DEL TITULAR ══════════════════════════════════ */
  var palabras = $$("#titular .pal > span");
  var enHero = $$(".hero [data-revela]");

  if (hayGsap) {
    var intro = gsap.timeline({ delay: 0.15 });

    if (palabras.length) {
      intro.to(palabras, {
        opacity: 1,
        y: 0,
        filter: quieto ? "blur(0px)" : "blur(0px)",
        duration: quieto ? 0.5 : 1.05,
        stagger: 0.05,
        ease: SUAVE
      }, 0);
    }
    enHero.forEach(function (el) {
      intro.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: SUAVE
      }, parseFloat(el.dataset.retraso || 0) + 0.1);
    });
  } else {
    /* Sin GSAP no hay animación, pero tampoco nada escondido. */
    raiz.classList.remove("js");
  }

  /* ═══ 3 · REVELADOS AL HACER SCROLL ════════════════════════════ */
  if (haySt) {
    $$("[data-revela]").forEach(function (el) {
      if (el.closest(".hero")) { return; }
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.95,
        delay: parseFloat(el.dataset.retraso || 0),
        ease: SUAVE,
        scrollTrigger: { trigger: el, start: "top 88%", once: true }
      });
    });

    /* ── Parallax: sólo si el visitante no pidió menos movimiento ── */
    if (!quieto) {
      $$("[data-parallax]").forEach(function (el) {
        var factor = parseFloat(el.dataset.parallax) || 0.15;
        gsap.fromTo(el,
          { yPercent: -factor * 50 },
          {
            yPercent: factor * 50,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("section, .franja") || el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6
            }
          });
      });
    }
  }

  /* ═══ 4 · BOTÓN FLOTANTE ═══════════════════════════════════════ */
  var wasap = $("#wasap");
  if (wasap) {
    var mira = function () {
      wasap.classList.toggle("es-visible", window.scrollY > window.innerHeight * 0.75);
    };
    window.addEventListener("scroll", mira, { passive: true });
    mira();
  }

  /* ═══ 5 · CALENDARIO DE RANGO ══════════════════════════════════ */
  var cajaMeses = $("#cal-meses");

  var hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  var estado = {
    base: new Date(hoy.getFullYear(), hoy.getMonth(), 1),
    llegada: null,
    salida: null,
    tipo: "cabana",
    nombreTipo: "Cabaña",
    personas: 2
  };

  var DIAS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];
  var fmtMes = new Intl.DateTimeFormat("es-CL", { month: "long", year: "numeric" });
  var fmtCorto = new Intl.DateTimeFormat("es-CL", { weekday: "short", day: "numeric", month: "short" });
  var fmtLargo = new Intl.DateTimeFormat("es-CL", { day: "numeric", month: "long", year: "numeric" });

  function iso(d) {
    return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
  }
  function deIso(s) {
    var p = s.split("-");
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }
  function mismoDia(a, b) { return a && b && iso(a) === iso(b); }
  function mayus(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function soloUnDia() { return estado.tipo === "piscina"; }

  function pintaMes(base) {
    var anio = base.getFullYear();
    var mes = base.getMonth();
    var primero = new Date(anio, mes, 1);
    /* getDay(): 0 = domingo. Acá la semana parte el lunes. */
    var corrimiento = (primero.getDay() + 6) % 7;
    var total = new Date(anio, mes + 1, 0).getDate();

    var html = '<div class="mes"><p class="mes__nombre">' + mayus(fmtMes.format(primero)) + "</p>";
    html += '<div class="mes__reja">';
    DIAS.forEach(function (d) { html += '<span class="mes__dia-nombre">' + d + "</span>"; });

    var i;
    for (i = 0; i < corrimiento; i++) {
      html += '<span class="dia es-vacio"></span>';
    }
    for (i = 1; i <= total; i++) {
      var fecha = new Date(anio, mes, i);
      var pasado = fecha < hoy;
      var clases = ["dia"];

      if (mismoDia(fecha, hoy)) { clases.push("es-hoy"); }
      if (mismoDia(fecha, estado.llegada) || mismoDia(fecha, estado.salida)) {
        clases.push("es-extremo");
        if (mismoDia(fecha, estado.llegada)) { clases.push("es-inicio"); }
        if (mismoDia(fecha, estado.salida)) { clases.push("es-fin"); }
        if (!estado.salida) { clases.push("es-fin"); }
      } else if (estado.llegada && estado.salida && fecha > estado.llegada && fecha < estado.salida) {
        clases.push("es-rango");
      }

      html += '<button type="button" class="' + clases.join(" ") + '" data-fecha="' + iso(fecha) + '"' +
              (pasado ? " disabled" : "") +
              ' aria-label="' + fmtLargo.format(fecha) + '">' + i + "</button>";
    }
    html += "</div></div>";
    return html;
  }

  function pintaCalendario() {
    if (!cajaMeses) { return; }
    var segundo = new Date(estado.base.getFullYear(), estado.base.getMonth() + 1, 1);
    cajaMeses.innerHTML = pintaMes(estado.base) + pintaMes(segundo);
  }

  function eligeFecha(f) {
    if (soloUnDia()) {
      estado.llegada = f;
      estado.salida = null;
    } else if (!estado.llegada || estado.salida) {
      estado.llegada = f;
      estado.salida = null;
    } else if (f > estado.llegada) {
      estado.salida = f;
    } else {
      estado.llegada = f;
    }
    pintaCalendario();
    pintaPanel();
  }

  if (cajaMeses) {
    pintaCalendario();

    cajaMeses.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-fecha]");
      if (!b || b.disabled) { return; }
      eligeFecha(deIso(b.dataset.fecha));
    });
  }

  var btnAntes = $("#cal-antes");
  var btnDespues = $("#cal-despues");
  var btnLimpiar = $("#cal-limpiar");

  function mueveMes(n) {
    var nuevo = new Date(estado.base.getFullYear(), estado.base.getMonth() + n, 1);
    var tope = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    if (nuevo < tope) { return; }
    estado.base = nuevo;
    pintaCalendario();
    revisaFlechas();
  }
  function revisaFlechas() {
    if (!btnAntes) { return; }
    var tope = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    btnAntes.disabled = estado.base <= tope;
  }
  if (btnAntes) { btnAntes.addEventListener("click", function () { mueveMes(-1); }); }
  if (btnDespues) { btnDespues.addEventListener("click", function () { mueveMes(1); }); }
  revisaFlechas();

  if (btnLimpiar) {
    btnLimpiar.addEventListener("click", function () {
      estado.llegada = null;
      estado.salida = null;
      pintaCalendario();
      pintaPanel();
    });
  }

  /* ═══ 6 · PANEL DE RESUMEN ═════════════════════════════════════ */
  var opciones = $$(".opcion");
  var valLlegada = $("#val-llegada");
  var valSalida = $("#val-salida");
  var valNoches = $("#val-noches");
  var filaNoches = $("#fila-noches");
  var cajaSalida = $("#caja-salida");
  var rotLlegada = $("#rot-llegada");
  var cta = $("#cta-reserva");
  var ctaTexto = $("#cta-texto");
  var salidaPersonas = $("#personas");

  opciones.forEach(function (op) {
    op.addEventListener("click", function () {
      opciones.forEach(function (o) {
        o.classList.remove("es-activa");
        o.setAttribute("aria-checked", "false");
      });
      op.classList.add("es-activa");
      op.setAttribute("aria-checked", "true");
      estado.tipo = op.dataset.tipo;
      estado.nombreTipo = $("strong", op).textContent;
      if (soloUnDia()) { estado.salida = null; }
      pintaCalendario();
      pintaPanel();
    });
  });

  var btnMenos = $("#menos");
  var btnMas = $("#mas");
  function pintaPersonas() {
    if (salidaPersonas) { salidaPersonas.textContent = estado.personas; }
    if (btnMenos) { btnMenos.disabled = estado.personas <= 1; }
    if (btnMas) { btnMas.disabled = estado.personas >= 20; }
    pintaPanel();
  }
  if (btnMenos) {
    btnMenos.addEventListener("click", function () {
      estado.personas = Math.max(1, estado.personas - 1);
      pintaPersonas();
    });
  }
  if (btnMas) {
    btnMas.addEventListener("click", function () {
      estado.personas = Math.min(20, estado.personas + 1);
      pintaPersonas();
    });
  }

  function noches() {
    if (!estado.llegada || !estado.salida) { return 0; }
    return Math.round((estado.salida - estado.llegada) / 86400000);
  }

  function armaMensaje() {
    var lineas = ["¡Hola! Quiero consultar disponibilidad en Cabañas Puerta del Sol.", ""];
    lineas.push("• Estadía: " + estado.nombreTipo);
    lineas.push("• Personas: " + estado.personas);
    if (soloUnDia()) {
      lineas.push("• Día: " + (estado.llegada ? fmtLargo.format(estado.llegada) : "por definir"));
    } else {
      lineas.push("• Llegada: " + (estado.llegada ? fmtLargo.format(estado.llegada) : "por definir"));
      lineas.push("• Salida: " + (estado.salida ? fmtLargo.format(estado.salida) : "por definir"));
      lineas.push("• Noches: " + noches());
    }
    lineas.push("", "¿Tienen cupo para esas fechas?");
    return lineas.join("\n");
  }

  function pintaPanel() {
    var unDia = soloUnDia();

    if (rotLlegada) { rotLlegada.textContent = unDia ? "Día de visita" : "Llegada"; }
    if (valLlegada) {
      valLlegada.textContent = estado.llegada ? mayus(fmtCorto.format(estado.llegada)) : "—";
    }
    if (valSalida) {
      valSalida.textContent = estado.salida ? mayus(fmtCorto.format(estado.salida)) : "—";
    }
    if (cajaSalida) { cajaSalida.classList.toggle("es-apagada", unDia); }
    if (filaNoches) { filaNoches.hidden = unDia; }
    if (valNoches) { valNoches.textContent = noches() || "—"; }

    if (btnLimpiar) { btnLimpiar.hidden = !(estado.llegada || estado.salida); }

    var listo = unDia ? !!estado.llegada : !!(estado.llegada && estado.salida);
    if (cta) {
      cta.classList.toggle("es-apagado", !listo);
      cta.setAttribute("aria-disabled", listo ? "false" : "true");
      cta.href = listo ? waUrl(armaMensaje()) : "#reservas";
      if (ctaTexto) {
        ctaTexto.textContent = listo
          ? "Consultar disponibilidad"
          : (unDia ? "Elige el día" : "Elige tus fechas");
      }
    }
  }
  pintaPersonas();

  /* ═══ 7 · FORMULARIO DE CONTACTO ═══════════════════════════════ */
  var form = $("#formulario");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nombre = $("#nombre");
      var fono = $("#fono");
      var mensaje = $("#mensaje");
      var aviso = $("#aviso");

      if (!nombre.value.trim()) {
        nombre.closest(".campo").classList.add("es-mala");
        if (aviso) { aviso.textContent = "Escribe tu nombre para saber con quién hablamos."; }
        nombre.focus();
        return;
      }
      nombre.closest(".campo").classList.remove("es-mala");

      var lineas = ["¡Hola! Soy " + nombre.value.trim() + "."];
      lineas.push(mensaje.value.trim() || "Quisiera más información sobre las cabañas.");
      if (fono.value.trim()) { lineas.push("", "Mi teléfono: " + fono.value.trim()); }

      if (aviso) { aviso.textContent = "Abriendo WhatsApp…"; }
      window.open(waUrl(lineas.join("\n")), "_blank", "noopener");
    });
  }

  /* ═══ 8 · AÑO DEL PIE ══════════════════════════════════════════ */
  var anio = $("#anio");
  if (anio) { anio.textContent = new Date().getFullYear(); }
})();
