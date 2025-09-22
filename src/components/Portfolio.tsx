import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faBriefcase, faHeart } from '@fortawesome/free-solid-svg-icons';
import { usePortfolio } from '../hooks';
import type { SkillCategory, ExperienceItem, HobbyItem } from '../types';

const Portfolio: React.FC = () => {
  const { data, loading, error } = usePortfolio();

  if (loading) {
    return <section id="portfolio">Loading...</section>;
  }

  if (error || !data) {
    return (
      <section id="portfolio">
        <div className="portfolio-container">
          <h2 id="portfolio-title" className="portfolio-title">Portfolio</h2>
        </div>
      </section>
    );
  }

  const { title, skills, experience, hobbies } = data;

  return (
    <section id="portfolio">
      <div className="portfolio-container">
        <h2 id="portfolio-title" className="portfolio-title">{title}</h2>

        <div className="portfolio-section">
          <h3 className="section-title">
            <FontAwesomeIcon icon={faCode} aria-hidden="true" />
            <span id="portfolio-skills-title">{skills.title}</span>
          </h3>
          <div id="portfolio-skills-container" className="skills-grid">
            {skills.categories.map((category: SkillCategory, index: number) => (
              <div key={index} className="skill-category">
                <h4 className="category-name">{category.name}</h4>
                <div className="skill-tags">
                  {category.tags.map((tag: string, tagIndex: number) => (
                    <span key={tagIndex} className="skill-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="portfolio-section">
          <h3 className="section-title">
            <FontAwesomeIcon icon={faBriefcase} aria-hidden="true" />
            <span id="portfolio-experience-title">{experience.title}</span>
          </h3>
          <div id="portfolio-experience-container" className="experience-timeline">
            {experience.items.map((item: ExperienceItem, index: number) => (
              <div key={index} className="experience-item">
                <div className="experience-period">{item.period}</div>
                <div className="experience-content">
                  <h4 className="experience-role">{item.role}</h4>
                  <p className="experience-company">{item.company}</p>
                  <p className="experience-description">{item.description}</p>
                  <div className="experience-highlights">
                    {item.highlights.map((highlight: string, highlightIndex: number) => (
                      <span key={highlightIndex}>{highlight}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="portfolio-section">
          <h3 className="section-title">
            <FontAwesomeIcon icon={faHeart} aria-hidden="true" />
            <span id="portfolio-hobbies-title">{hobbies.title}</span>
          </h3>
          <div id="portfolio-hobbies-container" className="hobbies-grid">
            {hobbies.items.map((item: HobbyItem, index: number) => (
              <div key={index} className="hobby-item">
                <FontAwesomeIcon icon={item.icon as any} aria-hidden="true" />
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;