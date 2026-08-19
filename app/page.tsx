import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { QuienesSomos } from "@/components/quienes-somos";
import { Instalaciones } from "@/components/instalaciones";
import { FranjaParallax } from "@/components/franja-parallax";
import { Reservas } from "@/components/reservas";
import { Experiencia } from "@/components/experiencia";
import { Contacto } from "@/components/contacto";
import { WhatsAppFlotante } from "@/components/whatsapp-flotante";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* 1 · Portada a pantalla completa con parallax */}
        <Hero />

        {/* 2 · Quiénes somos, en composición asimétrica */}
        <QuienesSomos />

        {/* 3 · Instalaciones en bento grid */}
        <Instalaciones />

        {/* Respiro visual entre bloques */}
        <FranjaParallax />

        {/* 4 · Agenda y consulta de disponibilidad */}
        <Reservas />

        {/* 5 · Qué encuentras aquí, en marquee infinito */}
        <Experiencia />
      </main>

      {/* 6 · Contacto + pie de página */}
      <Contacto />

      <WhatsAppFlotante />
    </>
  );
}
