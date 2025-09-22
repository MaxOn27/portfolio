import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faLightbulb, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { useAbout } from '../hooks';
import type { StatItem, EducationItem, PhilosophyItem } from '../types';

const About: React.FC = () => {
  const { data, loading, error } = useAbout();

  if (loading) {
    return <section id="about">Loading...</section>;
  }

  if (error || !data) {
    return (
      <section id="about">
        <div className="about-container">
          <h2 id="about-title" className="about-title">About Me</h2>
        </div>
      </section>
    );
  }

  const { title, intro, education, philosophy, journey } = data;

  return (
    <section id="about">
      <div className="about-container">
        <h2 id="about-title" className="about-title">{title}</h2>

        <div className="about-content">
          <div className="about-intro">
            <div className="intro-text">
              <h3 id="about-greeting">{intro.greeting}</h3>
              <p id="about-intro-description" className="intro-description">
                {intro.description}
              </p>
              <p id="about-intro-mission" className="intro-mission">
                {intro.mission}
              </p>
            </div>
            <div id="about-stats-container" className="intro-stats">
              {intro.stats.map((stat: StatItem, index: number) => (
                <div key={index} className="stat-item">
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-section">
            <h3 className="section-title">
              <FontAwesomeIcon icon={faGraduationCap} aria-hidden="true" />
              <span id="about-education-title">{education.title}</span>
            </h3>
            <div id="about-education-container" className="education-timeline">
              {education.items.map((item: EducationItem, index: number) => (
                <div key={index} className="education-item">
                  <div className="education-period">{item.period}</div>
                  <div className="education-content">
                    <h4>{item.degree}</h4>
                    <p className="education-institution">{item.institution}</p>
                    <p className="education-description">{item.description}</p>
                    <div className="education-highlights">
                      {item.highlights.map((highlight: string, highlightIndex: number) => (
                        <span key={highlightIndex}>{highlight}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-section">
            <h3 className="section-title">
              <FontAwesomeIcon icon={faLightbulb} aria-hidden="true" />
              <span id="about-philosophy-title">{philosophy.title}</span>
            </h3>
            <div id="about-philosophy-container" className="philosophy-grid">
              {philosophy.items.map((item: PhilosophyItem, index: number) => (
                <div key={index} className="philosophy-item">
                  <FontAwesomeIcon icon={item.icon as any} aria-hidden="true" />
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="about-section">
            <h3 className="section-title">
              <FontAwesomeIcon icon={faMapMarkedAlt} aria-hidden="true" />
              <span id="about-journey-title">{journey.title}</span>
            </h3>
            <div id="about-journey-container" className="journey-content">
              {journey.paragraphs.map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;