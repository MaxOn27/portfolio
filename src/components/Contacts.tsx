import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useContacts } from '../hooks';
import type { ContactLink } from '../types';

const Contacts: React.FC = () => {
  const { data, loading, error } = useContacts();

  if (loading) {
    return <section id="contacts">Loading...</section>;
  }

  if (error || !data) {
    return (
      <section id="contacts">
        <div className="contacts-container">
          <h2 id="contacts-title" className="contacts-title">Get in touch</h2>
        </div>
      </section>
    );
  }

  const { title, description, links } = data;

  const getIconComponent = (iconClass: string) => {
    if (iconClass.includes('linkedin')) return faLinkedin;
    if (iconClass.includes('github')) return faGithub;
    if (iconClass.includes('envelope')) return faEnvelope;
    return faEnvelope; // fallback
  };

  return (
    <section id="contacts">
      <div className="contacts-container">
        <h2 id="contacts-title" className="contacts-title">{title}</h2>

        <div className="contacts-content">
          <p id="contacts-description" className="contacts-description">
            {description}
          </p>

          <div id="contacts-links-container" className="contacts-links">
            {links.map((link: ContactLink, index: number) => (
              <a
                key={index}
                href={link.href}
                target={link.target || '_blank'}
                className={link.cssClass}
                rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
              >
                <FontAwesomeIcon icon={getIconComponent(link.icon)} aria-hidden="true" />
                <div className="contact-info">
                  <span className="contact-title">{link.title}</span>
                  <span className="contact-description">{link.description}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;