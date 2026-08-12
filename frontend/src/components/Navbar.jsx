import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const NAV_ITEMS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#processo", label: "Processo" },
  { href: "#contato", label: "Contato" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <nav className={`site-navbar ${scrolled ? "scrolled" : ""}`}>
        <a href="#hero" className="nav-logo">
          <img src="/img/5.png" alt="VISIOART" className="logo-img" />
          <span className="brand-text">VISIOART PRODUCTIONS</span>
        </a>
        <ul className="nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
          <li>
            <Link to="/cliente/login" className="nav-access">
              Acesso
            </Link>
          </li>
        </ul>
        <button
          type="button"
          className={`nav-hamburger ${mobileMenuOpen ? "open" : ""}`}
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
      {/* Fora do <nav>: esse elemento usa mix-blend-mode: difference para o
          logo/links ficarem legíveis sobre o hero, o que "inverteria" um
          fundo sólido se o painel mobile fosse filho dele. */}
      <div
        className={`nav-mobile-overlay ${mobileMenuOpen ? "open" : ""}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />
      <div className={`nav-mobile-panel ${mobileMenuOpen ? "open" : ""}`}>
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={closeMobileMenu}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-mobile-access">
          <Link to="/cliente/login" className="nav-access" onClick={closeMobileMenu}>
            Acesso
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
