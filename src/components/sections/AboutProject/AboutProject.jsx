import { team } from "@/data/team.js";
import "./AboutProject.scss";

export default function AboutProject() {
  return (
    <section id="o-projektu" className="about-project section">
      <div className="container about-project__layout">
        <div className="about-project__intro">
          <h2 className="section-eyebrow">O projektu</h2>
          <span className="section-rule" />
          <div className="about-project__intro-text">
            <p>
              Česká asociace pojišťoven dlouhodobě stojí za projekty zaměřenými
              na prevenci dopravních nehod a bezpečnější provoz na českých
              silnicích. Protože za každou statistikou je konkrétní člověk, jeho
              blízcí a příběh.
            </p>
            <p>
              Kampaň Normální řízení zabíjí upozorňuje na chyby a přestupky,
              které jsme si za volantem zvykli omlouvat jako „normální“. U
              ostatních takové chování snadno vnímáme jako nebezpečné, u sebe
              pro něj ale často najdeme omluvu. Jejich následky přitom mohou být
              velmi vážné a často i bohužel tragické.
            </p>
          </div>
        </div>

        <div className="about-project__team">
          <h2 className="section-eyebrow">Součástí projektu jsou</h2>
          <span className="section-rule" />

          <div className="about-project__members">
            {team.map((member) => (
              <div className="about-project__member" key={member.name}>
                <p className="about-project__member-name">{member.name}</p>
                <p className="about-project__member-role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
