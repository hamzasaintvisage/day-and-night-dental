import React from 'react';
import Logo from '../components/Logo';
import { PRACTICE } from '../data/practice';

export default function Hero() {
  return (
    <section id="top" className="dn-hero">
      {/* Atmospheric glows */}
      <div className="dn-glow day" style={{
        width: '600px', height: '600px',
        top: '-200px', left: '-150px',
        opacity: 0.15,
      }} />
      <div className="dn-glow night" style={{
        width: '600px', height: '600px',
        bottom: '-200px', right: '-150px',
        opacity: 0.15,
      }} />

      {/* Atmospheric backdrop portrait — heavily darkened for depth */}
      <div className="dn-hero-backdrop">
        <img
          src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1100&h=733&fit=crop&q=55&fm=webp"
          alt=""
          aria-hidden="true"
          width={1100}
          height={733}
          decoding="async"
          fetchPriority="low"
        />
      </div>

      {/* The split divider line — full height, runs down the middle */}
      <div className="dn-hero-divider" />

      <div className="dn-hero-inner">
        {/* Top eyebrow */}
        <div className="dn-hero-eyebrow dn-reveal">
          <span className="line day" />
          <span>Glasgow's 24/7 Emergency Dentist</span>
          <span className="line night" />
        </div>

        {/* Main title */}
        <h1 className="dn-hero-title dn-display">
          <span className="word-day dn-reveal dn-delay-1">Day</span>
          <span className="word-amp dn-reveal dn-delay-2">&</span>
          <span className="word-night dn-reveal dn-delay-3">Night</span>
          <span className="dn-visually-hidden">Day &amp; Night Dental, your 24-hour emergency and cosmetic dentist in Merchant City, Glasgow</span>
        </h1>

        <div className="dn-hero-subtitle dn-reveal dn-delay-4">
          <div className="dn-hero-dental">
            <span className="line day" />
            <span>DENTAL</span>
            <span className="line night" />
          </div>
        </div>

        {/* Tagline */}
        <p className="dn-hero-tagline dn-reveal dn-delay-5">
          Toothache at 2am? A broken tooth on a Sunday? We're open when other dentists are closed.<br />
          <strong>A real dentist on the phone in Glasgow, day or night.</strong>
        </p>

        {/* CTAs — phone first for emergency intent */}
        <div className="dn-hero-actions dn-reveal dn-delay-5">
          <a href={`tel:${PRACTICE.phoneE164}`} className="dn-btn primary dn-btn-emergency">
            <span className="dn-btn-pulse" />
            Call our 24/7 emergency line
          </a>
          <a href="#contact" className="dn-btn">
            Book an appointment
            <span className="arrow">→</span>
          </a>
        </div>

        <p className="dn-hero-trust dn-reveal dn-delay-5">
          GDC-registered dentists · Same-day emergencies · A real dentist answers, 24/7
        </p>

        {/* Bottom meta strip */}
        <div className="dn-hero-meta dn-reveal dn-delay-5">
          <div className="dn-hero-meta-item">
            <span className="dn-eyebrow day">Mornings</span>
            <span className="time">07:00</span>
          </div>
          <div className="dn-hero-meta-divider" />
          <div className="dn-hero-meta-item center">
            <span className="dn-eyebrow">Emergency Line</span>
            <span className="time gradient">24 / 7</span>
          </div>
          <div className="dn-hero-meta-divider" />
          <div className="dn-hero-meta-item">
            <span className="dn-eyebrow night">Late Nights</span>
            <span className="time">23:00</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="dn-hero-scroll">
        <span>Scroll</span>
        <span className="line" />
      </div>

    </section>
  );
}
