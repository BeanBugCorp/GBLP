import Layout from "../Layout";
import { CONTENT } from "../content";
import "../styles/GarabatosByLily.css";
import "../styles/Collabs.css";

import adidasImg    from "../assets/collabs/adidas.jpeg";
import marriottImg  from "../assets/collabs/marriott.jpeg";
import macImg       from "../assets/collabs/mac.jpeg";
import pollolocoImg from "../assets/collabs/polloloco.jpeg";
import cliniqueImg  from "../assets/collabs/clinique.jpeg";
import ferragamoImg from "../assets/collabs/ferragamo.jpeg";
import jomaloneImg  from "../assets/collabs/jomalone.jpeg";
import cfeImg       from "../assets/collabs/cfe.jpeg";
import lululemonImg from "../assets/collabs/lululemon.jpeg";
import telvistaImg  from "../assets/collabs/telvista.jpeg";

const COLLAB_IMAGES = [
  adidasImg,
  marriottImg,
  macImg,
  pollolocoImg,
  cliniqueImg,
  ferragamoImg,
  jomaloneImg,
  cfeImg,
  lululemonImg,
  telvistaImg,
];

const COLLAB_LAYOUT = [
  { size: "sz-tall",  tilt: -3,   frame: "#7a5c3a" },  // 0 Adidas
  { size: "sz-lg",    tilt: 1.5,  frame: "#5c3d2e" },  // 1 Marriott
  { size: "sz-sm",    tilt: 3.5,  frame: "#8b6e4e" },  // 2 MAC
  { size: "sz-wide",  tilt: -2,   frame: "#6b4c3b" },  // 3 Pollo Loco
  { size: "sz-md",    tilt: 2.5,  frame: "#4a3728" },  // 4 Clinique
  { size: "sz-md",    tilt: -2.5, frame: "#7c5e42" },  // 5 Ferragamo
  { size: "sz-tall",  tilt: 1,    frame: "#8b5c3a" },  // 6 Jo Malone
  { size: "sz-sm",    tilt: -4,   frame: "#5a4030" },  // 7 CFE
  { size: "sz-lg",    tilt: 2,    frame: "#6b5040" },  // 8 Lululemon
  { size: "sz-md",    tilt: -1.5, frame: "#7a6040" },  // 9 Telvista
];

// Row groupings: indices into the collabs array
const ROWS = [
  [0, 1, 2],
  [3, 4],
  [5, 6, 7],
  [8, 9],
];

function CollabCanvas({ collab, img, layout, delay }) {
  const { name, desc } = collab;
  const { size, tilt, frame } = layout;

  return (
    <div
      className={`collab-canvas ${size}`}
      style={{ "--tilt": `${tilt}deg`, animationDelay: `${delay}s` }}
    >
      <div className="collab-frame">
        <div className="collab-frame-border" style={{ "--frame-color": frame }}>
          <div className="collab-canvas-surface">
            <img src={img} alt={name} loading="lazy" />
            <div className="collab-canvas-label">
              <div className="collab-label-name">{name}</div>
              <div className="collab-label-desc">{desc}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Collabs() {
  const collabs = CONTENT.collabs;

  return (
    <Layout>
      <main className="collabs-page">
        <div className="collabs-wall">
          {ROWS.map((rowIndices, ri) => (
            <div key={ri} className="collabs-wall-row">
              {rowIndices.map((idx) => (
                <CollabCanvas
                  key={idx}
                  collab={collabs[idx]}
                  img={COLLAB_IMAGES[idx]}
                  layout={COLLAB_LAYOUT[idx]}
                  delay={0.05 + idx * 0.07}
                />
              ))}
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
