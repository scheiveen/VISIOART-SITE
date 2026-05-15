import React, { useEffect, useMemo, useRef, useState } from "react";
import { mockPortfolio } from "../data/mock";
import "./PortfolioSection.css";

const PortfolioSection = () => {
  const sectionRef = useRef(null);
  const videoRefs = useRef(new Map());
  const [visibleItemIds, setVisibleItemIds] = useState([]);
  const [videoReadyIds, setVideoReadyIds] = useState([]);

  const videoSources = useMemo(
    () => Array.from(new Set(mockPortfolio.map((item) => item.video))),
    [],
  );

  const thumbnailSources = useMemo(
    () =>
      Array.from(
        new Set(mockPortfolio.map((item) => item.thumbnail).filter(Boolean)),
      ),
    [],
  );

  useEffect(() => {
    const preloadLinks = thumbnailSources.map((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
      return link;
    });

    const images = thumbnailSources.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    return () => {
      preloadLinks.forEach((link) => document.head.removeChild(link));
      images.forEach((img) => {
        img.src = "";
      });
    };
  }, [thumbnailSources]);

  useEffect(() => {
    const preloads = videoSources.map((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "video";
      link.href = src;
      const extension = src.split(".").pop().toLowerCase();
      link.type =
        extension === "mov" ? "video/quicktime" : `video/${extension}`;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
      return link;
    });

    return () => {
      preloads.forEach((link) => {
        document.head.removeChild(link);
      });
    };
  }, [videoSources]);

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
  }, []);

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
        {mockPortfolio.map((item) => (
          <div
            key={item.id}
            data-id={item.id}
            className={`portfolio-item reveal ${item.featured ? "featured" : ""}`}
          >
            <div className="video-stage">
              <div
                className="portfolio-video-placeholder"
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;
