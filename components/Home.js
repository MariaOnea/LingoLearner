import React from 'react';
import NavBar from './NavBar'; // Assuming NavBar is correctly imported
import scrollImage from './scroll.png'; // Path to your background image
import arrowIcon from './arrow.png'; // Path to your icon image
import './Home.css';
import Footer from './Footer';
const Home = () => {
  const scrollToContent = () => {
    document.getElementById('content').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="Home">
      <div className="full-screen-background" onClick={scrollToContent}>
        <button className="scroll-button">
          Află mai multe
          <img src={arrowIcon} alt="Arrow" className="button-icon" />
        </button>
      </div>
      <div id="content" className="content-section">
        <h2>Descoperă mai multe despre LingoLearner!</h2>
        <p>Bine ai venit pe LingoLearner, unde călătoria ta de a stăpâni o nouă limbă străină începe! Prin abordarea noastră inovatoare, îți oferim șansa de a explora culturi noi și de a comunica cu încredere. Descoperă o mulțime de oportunități la îndemână—inspirația, competența și distracția te așteaptă! </p>
        <h2>Explorează caracteristicile cheie ale lui LingoLearner</h2>
        <ul>
          <li><strong>Teste dinamice:</strong> Testează-ți abilitățile cu ajutorul testelor noastre versatile ce dispun de trei tipuri unice de întrebări—scrie ceea ce auzi dintr-o înregistrare, descrie ceea ce vedzi într-o imagine și transcrie ceea ce vizionezi într-un videoclip. După finalizarea testului, primești scorul pentru a urmări progresul și pentru a identifica zonele de îmbunătățire.</li>
          <li><strong>Resurse Multimedia:</strong> Învață cu un amestec de multimedia - videoclipuri, imagini și înregistrări – ce fac învățatul dinamic și te mențin în priză. Fiecare resursă este concepută pentru a te ajuta să îți stăpânești abilitățile lingvistice în mod eficient în timp ce te distrezi.</li>
          
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
