import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header-section" role="banner">
      <div className="site-header-name">Maksym T.</div>
      <nav className="site-header" role="navigation" aria-label="Main navigation">
        <a href="#me" aria-label="Go to Me section">Me</a>
        <span className="nav-separator" aria-hidden="true">|</span>
        <a href="#about" aria-label="Go to About section">About</a>
        <span className="nav-separator" aria-hidden="true">|</span>
        <a href="#portfolio" aria-label="Go to Portfolio section">Portfolio</a>
        <span className="nav-separator" aria-hidden="true">|</span>
        <a href="#contacts" aria-label="Go to Contacts section">Contacts</a>
      </nav>
    </header>
  );
};

export default Header;