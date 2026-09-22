import glass_1 from "@/assets/glass/docs_glass-1.png";
import glass_2 from "@/assets/glass/docs_glass-2.png";
import glass_3 from "@/assets/glass/docs_glass-3.png";
import ScrollGlass from "@/components/common/ScrollGlass.jsx";
import { documents } from "@/data/documents.js";
import DocCard from "./DocCard.jsx";
import "./Documents.scss";
import {
  GLASS_MOTION,
  GLASS_MOTION_2,
  GLASS_MOTION_3,
} from "./ImagesCoordinates.js";

export default function Documents() {
  return (
    <section id="media" className="documents section">
      <ScrollGlass
        className="documents__glass documents__glass--1"
        src={glass_1}
        motion={GLASS_MOTION}
      />

      <ScrollGlass
        className="documents__glass documents__glass--2"
        src={glass_2}
        motion={GLASS_MOTION_2}
      />

      <ScrollGlass
        className="documents__glass documents__glass--3"
        src={glass_3}
        motion={GLASS_MOTION_3}
      />

      <div className="container">
        <p className="section-eyebrow">Pro média</p>
        <span className="section-rule" />

        <div className="documents__list">
          {documents.map((doc, index) => (
            <DocCard key={index} doc={doc} />
          ))}
        </div>
      </div>
    </section>
  );
}
