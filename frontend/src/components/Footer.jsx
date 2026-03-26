import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">VISIOART</div>
      <div className="footer-copy">
        © {new Date().getFullYear()} Visioart Films. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
