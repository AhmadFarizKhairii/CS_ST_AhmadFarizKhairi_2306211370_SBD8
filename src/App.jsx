import './App.css';
import MediumLogo from './assets/Medium.svg';
import UISMVImage from './assets/IMG_6747.JPG';
import gempa from './assets/GEMPASUKABUMI.JPG';
import bbm from './assets/BBM.JPG';
import ujan from './assets/ujan.JPG';
import { useState } from 'react';

function App() {
  const slides = [
    { tab: 'home', title: 'Welcome to Medium', content: 'A Place to Write, Read, and Connect. ' },
    {
      tab: 'forYou',
      title: 'For You',
      articles: [
        {
          id: 1,
          title: 'Gempa Bumi di Jawa Barat',
          summary: 'Gempa berkekuatan 5.6 SR mengguncang wilayah Jawa Barat.',
          content: 'Gempa bumi berkekuatan 5.6 SR terjadi di wilayah Jawa Barat pada pukul 13:21 WIB. Pusat gempa berada di darat dengan kedalaman 10 km. Warga diimbau untuk tetap waspada terhadap potensi gempa susulan.',
          image: gempa, 
        },
        {
          id: 2,
          title: 'Peningkatan Harga BBM',
          summary: 'Harga BBM naik sebesar 10% mulai bulan ini.',
          content: 'Pemerintah mengumumkan kenaikan harga BBM sebesar 10% untuk jenis Pertalite dan Pertamax. Kenaikan ini dilakukan untuk menyesuaikan harga minyak dunia yang terus meningkat.',
          image: bbm, 
        },
        {
          id: 3,
          title: 'Hujan Lebat di Jakarta',
          summary: 'Hujan lebat menyebabkan banjir di beberapa wilayah Jakarta.',
          content: 'Hujan lebat yang mengguyur Jakarta sejak pagi menyebabkan banjir di beberapa wilayah. Warga diimbau untuk berhati-hati dan menghindari daerah rawan banjir.',
          image: ujan, 
        },
      ],
    },
    {
      tab: 'following',
      title: 'Following',
      content: 'Updates from the writers and publications you follow.',
    },
    {
      tab: 'featured',
      title: 'Featured',
      articles: [
        {
          id: 1,
          title: 'UI SMV Raih Gelar Juara di Qatar',
          summary: 'Tim UI SMV berhasil meraih juara dalam kompetisi internasional di Qatar.',
          content: 'Tim UI Student Mobility Vehicle (SMV) berhasil meraih gelar juara dalam kompetisi internasional di Qatar. Kompetisi ini diikuti oleh berbagai universitas dari seluruh dunia, dan UI SMV berhasil unggul dengan inovasi kendaraan hemat energi mereka.',
          image: UISMVImage,
        },
      ],
    },
  ];

  const tabs = ['home', 'forYou', 'following', 'featured'];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationDirection, setAnimationDirection] = useState(''); // Menyimpan arah animasi
  const [expandedArticle, setExpandedArticle] = useState(null); // Untuk melacak artikel yang sedang dibuka
  const [isDarkMode, setIsDarkMode] = useState(false); // State untuk Dark Mode

  const handleNext = () => {
    setAnimationDirection('right'); // Geser ke kanan
    setTimeout(() => {
      setCurrentSlide((currentSlide + 1) % slides.length);
      setAnimationDirection(''); // Reset animasi setelah transisi selesai
    }, 500); // Durasi sesuai dengan CSS transition
  };

  const handlePrev = () => {
    setAnimationDirection('left'); // Geser ke kiri
    setTimeout(() => {
      setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
      setAnimationDirection(''); // Reset animasi setelah transisi selesai
    }, 500); // Durasi sesuai dengan CSS transition
  };

  const handleTabClick = (tab) => {
    const slideIndex = slides.findIndex((slide) => slide.tab === tab);
    setCurrentSlide(slideIndex);
    setExpandedArticle(null); // Reset artikel yang dibuka saat berpindah tab
  };

  const toggleReadMore = (articleId) => {
    setExpandedArticle((prev) => (prev === articleId ? null : articleId));
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Navbar */}
      <header className="header">
        <nav className="navbar">
          <img src={MediumLogo} alt="Medium Logo" className="logo" />
          <input type="text" className="search-bar" placeholder="Search articles, topics..." />
          <div className="nav-links">
            <a href="#" className="nav-link">Write</a>
            <a href="#" className="nav-link">Sign In</a>
          </div>
          <button className="dark-mode-toggle" onClick={toggleDarkMode}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </nav>
      </header>

      {/* Topics Section */}
      <div className="topics">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`topic ${slides[currentSlide].tab === tab ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Carousel Section */}
      <section className="carousel-section">
        <button className="carousel-button left" onClick={handlePrev}>&lt;</button>
        <div
          className={`carousel-content ${
            animationDirection === 'right'
              ? 'enter-from-right'
              : animationDirection === 'left'
              ? 'enter-from-left'
              : 'active'
          }`}
        >
          {slides[currentSlide].tab === 'forYou' || slides[currentSlide].tab === 'featured' ? (
            <div className="articles">
              {slides[currentSlide].articles.map((article) => (
                <div
                  key={article.id}
                  className={`article ${expandedArticle === article.id ? 'expanded' : ''}`}
                >
                  <img src={article.image} alt={article.title} className="article-image" />
                  <h3>{article.title}</h3>
                  <p>{expandedArticle === article.id ? article.content : article.summary}</p>
                  <button className="read-more" onClick={() => toggleReadMore(article.id)}>
                    {expandedArticle === article.id ? 'Read Less' : 'Read More'}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <>
              <h2>{slides[currentSlide].title}</h2>
              <p>{slides[currentSlide].content}</p>
            </>
          )}
        </div>
        <button className="carousel-button right" onClick={handleNext}>&gt;</button>
      </section>
    </div>
  );
}

export default App;