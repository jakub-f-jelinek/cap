import { useState } from "react";
import logoWeb from "@/assets/images/web-logo.png";
import PrivacyPolicyModal from "@/components/common/PrivacyPolicyModal";
import { useCookieConsent } from "@/context/CookieConsent.jsx";
import { footerColumns, footerContact } from "@/data/footer.js";
import "./Footer.scss";

export default function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const { showSettings } = useCookieConsent();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__badge">
          <img src={logoWeb} alt="čap-web-logo" loading="lazy" />
        </div>

        <div className="footer__groups">
          <div className="footer__contact">
            <p className="footer__contact-name">{footerContact.name}</p>
            <p className="footer__contact-role">{footerContact.role}</p>

            <a
              className="footer__contact-email"
              href={`mailto:${footerContact.email}`}
            >
              {footerContact.email}
            </a>
            <a
              className="footer__contact-phone"
              href={`tel:${footerContact.phone.replace(/\s+/g, "")}`}
            >
              {footerContact.phone}
            </a>
            {footerContact.addressLines.map((line) => (
              <p className="footer__contact-address" key={line}>
                {line}
              </p>
            ))}
          </div>

          {footerColumns.map((column, columnIndex) => (
            <div className="footer__column" key={columnIndex}>
              <p className="footer__column-title">{column.title}</p>
              <ul>
                {column.links.map((link, index) => (
                  <li key={index}>
                    {link.modal === "privacy" ? (
                      <button
                        type="button"
                        onClick={() => setIsPrivacyOpen(true)}
                      >
                        {link.label}
                      </button>
                    ) : link.modal === "cookies" ? (
                      <button type="button" onClick={showSettings}>
                        {link.label}
                      </button>
                    ) : (
                      <a href={link.href} target="_blank">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div />
      </div>

      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </footer>
  );
}
