import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Accueil from './Components/Accueil.js';
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
        <Link className="button" to="/">Accueil</Link>
        <Link className="button" to="/liste">Liste</Link>
        {localStorage.getItem("key") != null ?
        <Link className="button" to="/mes_articles">mes_articles</Link>
        : null}
        <Link className="button" to="/connexion">Connexion</Link>
        <Link className="button" to="/inscription">Inscription</Link>
        <Link className="button" to="/deconnexion">Deconnexion</Link>
      </div>
      <center><h1 className='titre'>Filmox</h1></center>
    <Routes>     
        {/* <Route exact path="/" component={<Accueil/>} /> */}
        <Route path="/"           element={<Accueil/>}/>
        <Route path="/liste"      element={<Liste/>} />
        <Route path="/mes_articles"      element={<Mes_articles/>} />
        <Route path="/connexion/*"  element={<Connexion/>} />
        <Route path="/inscription"      element={<Inscription/>} />
        <Route path="/deconnexion/*"  element={<Deconnexion/>} />
    </Routes>
    
    </div>
  );
  
}

export default App;