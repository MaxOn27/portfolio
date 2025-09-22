import { Header, Me, About, Portfolio, Contacts } from './components';
import './App.css';

function App() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main" className="main-portfolio" role="main">
        <Me />
        <About />
        <Portfolio />
        <Contacts />
      </main>
    </>
  );
}

export default App;
