import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Accueil from './Components/Accueil.js';
import Profil from './Components/Profil.js';
import Liste from './Components/Liste.js';
import Connexion from './Components/Connexion.js';
import Inscription from './Components/Inscription.js';
import Deconnexion from './Components/Deconnexion.js';
import Mes_articles from './Components/Mes_articles.js';

function App() {
  console.log(localStorage.getItem("key"))
  return (
    <div>
      <div className='header'>
        <Link  to="/"><img src={`${process.env.PUBLIC_URL}/pac-man.png`} alt='' className='pac-man' /></Link>
        <Link className="button" to="/liste">Liste</Link>
        {localStorage.getItem("key") != null ?
        <Link className="button" to="/mes_articles">mes Locations</Link>
        : null}
        {localStorage.getItem("key") != null ?
        <Link className="button" to="/profil">Profil</Link>
        : null}
        <Link className="button" to="/connexion">Connexion</Link>
        <Link className="button" to="/inscription">Inscription</Link>
        <Link  to="/deconnexion"><img src={`${process.env.PUBLIC_URL}/deco3.png`} alt='' className='deco' /></Link>
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