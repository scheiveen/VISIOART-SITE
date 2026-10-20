import React, { useEffect, useRef, useState } from "react";
import { mockPortfolio } from "../data/mock";
import "./PortfolioSection.css";

// Destaque + grade 2x2; o restante aparece no "Mostrar mais".
const INITIAL_VISIBLE = 5;

const PortfolioSection = () => {
  const sectionRef = useRef(null);
  const videoRefs = useRef(new Map());
  const [visibleItemIds, setVisibleItemIds] = useState([]);
  const [videoReadyIds, setVideoReadyIds] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const hasMore = mockPortfolio.length > INITIAL_VISIBLE;
  const displayedItems = showAll
    ? mockPortfolio
    : mockPortfolio.slice(0, INITIAL_VISIBLE);

  useEffect(() => {
    if (!sectionRef.current) return;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, index) => {
              setTimeout(() => el.classList.add("revealed"), index * 100);
            });
          }
        });
      },
      { threshold: 0.1 },
    );

    revealObserver.observe(sectionRef.current);

    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-id");
          if (entry.isIntersecting && id) {
            setVisibleItemIds((currentIds) =>
              currentIds.includes(id) ? currentIds : [...currentIds, id],
            );
          }
        });
      },
      { threshold: 0.35, rootMargin: "0px 0px -150px 0px" },
    );

    const items = sectionRef.current.querySelectorAll(".portfolio-item");
    items.forEach((item) => itemObserver.observe(item));

    return () => {
      revealObserver.disconnect();
      itemObserver.disconnect();
    };
  }, [showAll]);

  useEffect(() => {
    if (visibleItemIds.length === 0) return;

    visibleItemIds.forEach((id) => {
      const video = videoRefs.current.get(id);
      if (video && video.paused) {
        video.muted = true;
        video.playsInline = true;
        video.loop = true;
        video.play().catch(() => {
          // Autoplay may still be blocked in some browsers; muted ensures best chance.
        });
      }
    });
  }, [visibleItemIds]);

  const handleVideoReady = (id) => {
    setVideoReadyIds((currentIds) =>
      currentIds.includes(String(id))
        ? currentIds
        : [...currentIds, String(id)],
    );
  };

  const toggleShowAll = () => {
    if (showAll) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    setShowAll((current) => !current);
  };

  const isVideoVisible = (id) => visibleItemIds.includes(String(id));
  const isVideoReady = (id) => videoReadyIds.includes(String(id));

  return (
    <section id="portfolio" className="portfolio-section" ref={sectionRef}>
      <div className="portfolio-header">
        <span className="section-label">
          Cada projeto é uma vida transformada em cinema
        </span>
        <h2 className="section-title">Histórias Que Já Eternizamos</h2>
      </div>

      <div className="portfolio-grid">
        {displayedItems.map((item) => (
          <article
            key={item.id}
            data-id={item.id}
            className={`portfolio-item reveal ${item.featured ? "featured" : ""}`}
          >
            <div className="video-stage">
              <div
                className="portfolio-video-placeholder"
                role="img"
                aria-label={`${item.tag}: ${item.title} — filme VISIOART`}
                style={{
                  backgroundImage: `url(${item.thumbnail || item.video})`,
                }}
              />

              {isVideoVisible(item.id) && (
                <video
                  ref={(el) => {
                    if (el) videoRefs.current.set(String(item.id), el);
                  }}
                  className={`portfolio-video ${isVideoReady(item.id) ? "is-ready" : ""}`}
                  preload="auto"
                  aria-label={`${item.tag}: ${item.title}`}
                  muted
                  playsInline
                  loop
                  autoPlay
                  poster={item.thumbnail}
                  src={item.video}
                  onCanPlayThrough={() => handleVideoReady(item.id)}
                />
              )}
            </div>

            <div className="portfolio-overlay">
              <div className="portfolio-info">
                <span className="portfolio-tag">{item.tag}</span>
                <h3 className="portfolio-title">{item.title}</h3>
              </div>
            </div>
          </article>
        ))}
      </div>

      {hasMore && (
        <div className="portfolio-more">
          <button
            type="button"
            className="portfolio-more-btn"
            onClick={toggleShowAll}
            aria-expanded={showAll}
          >
            {showAll
              ? "Mostrar menos"
              : `Mostrar mais (${mockPortfolio.length - INITIAL_VISIBLE})`}
          </button>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
