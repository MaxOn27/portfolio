import React from 'react';
import { useMe } from '../hooks';

const Me: React.FC = () => {
  const { data, loading, error } = useMe();

  if (loading) {
    return <section id="me">Loading...</section>;
  }

  if (error || !data) {
    // Fallback content matching the original implementation
    return (
      <section id="me">
        <img
          id="me-avatar"
          src="/assets/avatar.jpeg"
          alt="Professional headshot of Maksym Tyzhnenko"
          width="500"
          height="600"
          loading="lazy"
        />
        <div className="me-profession">
          <h2 id="me-name">I'M MAKSYM TYZHNENKO.</h2>
          <h2 id="me-title">FULL-STACK ENGINEER.</h2>
          <p>
            <span id="me-about-label">About</span>
            <br />
            <br />
            <span id="me-description">
              Passionate engineer with 3+ years' experience from Chernivtsi, Ukraine.
              Actively seeking new roles, challenges, and opportunities to grow — valued
              for rapid learning, clean code, and a collaborative spirit.
            </span>
          </p>
        </div>
      </section>
    );
  }

  const { personal, about } = data;

  return (
    <section id="me">
      <img
        id="me-avatar"
        src={personal.avatar}
        alt={`Professional headshot of ${personal.name}`}
        width="500"
        height="600"
        loading="lazy"
      />
      <div className="me-profession">
        <h2 id="me-name">I'M {personal.name}.</h2>
        <h2 id="me-title">{personal.title}.</h2>
        <p>
          <span id="me-about-label">{about.label}</span>
          <br />
          <br />
          <span id="me-description">{about.description}</span>
        </p>
      </div>
    </section>
  );
};

export default Me;