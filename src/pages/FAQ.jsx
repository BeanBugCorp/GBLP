import { useState } from 'react';
import Layout from '../Layout';
import "../styles/FAQ.css"

const faqs = [
  {
    q: '¿Trabajas fuera de Tijuana?',
    a: 'Sí ✨ Me encanta llevar mis garabatos a nuevos espacios.\n\nPuedo desplazarme a otras ciudades y adaptar cada proyecto al lugar. Los viáticos y la logística se cotizan según la ubicación y la duración del proyecto.',
  },
  {
    q: "¿Con cuánto tiempo de anticipación debo agendar?",
    a: "Para diseñar tu proyecto con calma y asegurar disponibilidad:\n\n1. **Ventanas**: 2 a 4 semanas.\n2. **Murales**: 4 a 8 semanas.\n\nEn temporada alta (septiembre a febrero), los espacios se llenan rápido, así que entre antes lo veamos, mejor ✨.",
  },
  {
    q: "¿Haces diseños permanentes en ventanas?",
    a: "No.\n\nMe especializo en garabatos de temporada, pensados para renovarse y mantener tu espacio siempre fresco y actualizado.\n\nSi estás buscando un diseño permanente, te recomiendo acudir con un rotulista especializado.",
  },
  {
    q: "¿Pintas murales todo el año?",
    a: "No.\n\nLa agenda de murales está abierta de **marzo a agosto**. De **septiembre a febrero** me enfoco completamente en garabatos en ventanas, ya que es temporada alta.\n\nSi tienes un mural en mente, lo ideal es planearlo con anticipación ✨.",
  },
  {
    q: "¿Cuánto tiempo tardas en garabatear?",
    a: "Cada proyecto tiene su propio ritmo 🎨.\n\nDependiendo del tamaño y nivel de detalle, puede tomar desde unas horas hasta varios días. Siempre busco lograr un equilibrio entre eficiencia y un acabado impecable.\n\n**Tiempos aproximados**:\n1. Ventanas: 3 a 9 horas.\n2. Murales: 2 a 4 días.\n3. Activaciones: 4 horas por día.",
  },
  {
    q: "¿Cómo cuido mi ventana decorada?",
    a: "Cada diseño está hecho con mucho detalle para que luzca increíble el mayor tiempo posible ✨.\n\nPara conservarlo en perfecto estado:\n1. Evita usar agua o limpiadores directamente sobre la pintura.\n2. Si necesitas limpiar alrededor, hazlo con un trapo seco y con cuidado.\n3. Puedes limpiar el exterior del vidrio sin problema.\n\n💫 Con estos cuidados, tus garabatos se mantendrán vibrantes y llenos de vida.",
  }
]

// Bold parser function for words in the answers.
function parseAnswer(text) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : part
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  function toggle(i) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <Layout>
      <main className="faq-page">
        <h1 className="faq-title">Preguntas Frecuentes</h1>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-item${openIndex === i ? ' is-open' : ''}`}>
              <button
                className="faq-question"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span>{faq.q}</span>
                <span className="faq-chevron" aria-hidden="true">▾</span>
              </button>
              <div className="faq-answer">
                <p className="faq-answer-text">{parseAnswer(faq.a)}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}