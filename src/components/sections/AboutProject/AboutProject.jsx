import logoCap from "@/assets/images/cap_logo.svg";
import logoCkp from "@/assets/images/ckp-text-logo.svg";
import logoPolice from "@/assets/images/PCR_logo.svg";
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
              Česká asociace pojišťoven prostřednictvím preventivních kampaní
              dlouhodobě otevírá témata bezpečnosti silničního provozu
              a&nbsp;upozorňuje na rizikové chování za volantem i&nbsp;jeho
              následky. Na tyto aktivity navazuje kampaň Normální řízení zabíjí.
              Kampaň upozorňuje na přestupky, které si za volantem omlouváme
              a&nbsp;považujeme za běžné. Chce vést řidiče k&nbsp;přehodnocení
              vlastních návyků: ani chování, na které jsme zvyklí, nemusí být
              bezpečné.
            </p>
            <p>
              Součástí projektu je celovečerní dokument Jediná vteřina režiséra
              Víta Klusáka. Prostřednictvím skutečných příběhů ukazuje, jak
              mohou rozhodnutí za volantem nevratně zasáhnout do života řidičů,
              obětí i&nbsp;jejich blízkých. Dává tak tématu konkrétní lidský
              rozměr a&nbsp;prostor k&nbsp;zamyšlení nad vlastní odpovědností.
            </p>
            <p>
              Česká asociace pojišťoven spolupracuje na projektu s&nbsp;Policií
              ČR. Projekt je podpořen z&nbsp;prostředků Fondu zábrany škod České
              kanceláře pojistitelů.
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

          <div className="about-project__logos">
            <div>
              <img
                src={logoPolice}
                alt="Logo Policie ČR"
                className="logos__police"
              />
            </div>

            <div>
              <img src={logoCap} alt="Logo ČAP" />
            </div>

            <div />
          </div>
          <div className="logos__ckp">
            <img src={logoCkp} alt="Logo ČKP" />
          </div>
        </div>
      </div>
    </section>
  );
}
