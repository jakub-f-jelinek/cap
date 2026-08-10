import logo from "@/assets/images/cap-logo.svg";
import "./Footer.scss";

const columns = [];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__badge">
          Normální
          <br />
          řízení zabíjí
        </div>

        <div className="footer__columns">
          {columns.map((column, columnIndex) => (
            <div className="footer__column" key={columnIndex}>
              <p className="footer__column-title">{column.title}</p>
              <ul>
                {column.links.map((link, index) => (
                  <li key={index}>
                    <a href="#hero">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <img
          className="footer__logo"
          src={logo}
          alt="čap"
          width={105}
          height={56}
          loading="lazy"
        />
      </div>
    </footer>
  );
}
