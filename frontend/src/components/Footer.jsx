import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src="/img/5.png" alt="VISIOART" className="footer-logo-img" />
      </div>
      <div className="footer-copy">
        © {new Date().getFullYear()} Visioart Productions. Todos os direitos
        reservados.
      </div>
    </footer>
  );
};

export default Footer;
