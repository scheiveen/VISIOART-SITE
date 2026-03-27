import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img
          src="https://customer-assets.emergentagent.com/job_visioart-films/artifacts/bd2tb04l_5.png"
          alt="VISIOART"
          className="footer-logo-img"
        />
      </div>
      <div className="footer-copy">
        © {new Date().getFullYear()} Visioart Productions. Todos os direitos
        reservados.
      </div>
    </footer>
  );
};

export default Footer;
