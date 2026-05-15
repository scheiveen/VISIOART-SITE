import React, { useState, useEffect } from "react";
import "./Footer.css";

const Footer = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className={`footer ${scrolled ? "scrolled" : ""}`}>
      <div className="footer-logo-container">
        <div className="footer-logo">
          <img src="/img/5.png" alt="VISIOART" className="footer-logo-img" />
        </div>
        <span className="footer-brand-text">VISIOART PRODUCTIONS</span>
      </div>
      <div className="footer-copy">
        © {new Date().getFullYear()} Visioart Productions. Todos os direitos
        reservados.
      </div>
    </footer>
  );
};

export default Footer;
