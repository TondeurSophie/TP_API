import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Accueil from './components/Accueil.js';
import Profil from './components/Profil.js';
import Liste from './components/Liste.js';
import Connexion from './components/Connexion.js';
import Inscription from './components/Inscription.js';
import Deconnexion from './components/Deconnexion.js';
import Mes_articles from './components/Mes_articles.js';

function App() {
  console.log(localStorage.getItem("key"))
  return (
    <div>
      <div className='header'>
        <Link className="button" to="/">Accueil</Link>
        <Link className="button" to="/liste">Liste</Link>
        {localStorage.getItem("key") != null ?
        <Link className="button" to="/mes_articles">mes Locations</Link>
        : null}
        {localStorage.getItem("key") != null ?
        <Link className="button" to="/profil">Profil</Link>
        : null}
        <Link className="button" to="/connexion">Connexion</Link>
        <Link className="button" to="/inscription">Inscription</Link>
        <Link className="button" to="/deconnexion">Deconnexion</Link>
      </div>
      <center><h1 className='titre'>Retro Gaming ! ! !</h1></center>
    <Routes>     
        {/* <Route exact path="/" component={<Accueil/>} /> */}
        <Route path="/"           element={<Accueil/>}/>
        <Route path="/liste"      element={<Liste/>} />
        <Route path="/profil"      element={<Profil/>} />
        <Route path="/mes_articles"      element={<Mes_articles/>} />
        <Route path="/connexion/*"  element={<Connexion/>} />
        <Route path="/inscription"      element={<Inscription/>} />
        <Route path="/deconnexion/*"  element={<Deconnexion/>} />
    </Routes>
    
    </div>
  );
  
}

export default App;
