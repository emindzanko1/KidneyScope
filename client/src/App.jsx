import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainContent from './components/MainContent/MainContent';

const App = () => {
  return (
    <div className="app">
      <Header />
      <MainContent />
      <Footer />
    </div >
  );
};

export default App;
