import React, { useEffect, useState } from 'react';
import '../App.css';

const Liste = () => {
  const [blog, setBlog] = useState([]);
  const [affichage, setAffichage] = useState(false);
  const [recherche, setRecherche] = useState({ titre: "" });

  const recup = async () => {
    try {
      const response = await fetch('http://localhost:3008/jeux', { method: "GET" });

      if (!response.ok) {
        throw new Error(`Erreur HTTP! Statut : ${response.status}`);
      }

      const data = await response.json();
      setBlog(data);
      setAffichage(true);
    } catch (error) {
      console.error(error);
      setAffichage(false);
    }
  };

  const rechercher = async () => {
    try {
      const response = await fetch('http://localhost:3008/jeux/titre', { method: "GET" });

      if (!response.ok) {
        throw new Error(`Erreur HTTP! Statut : ${response.status}`);
      }

      const data = await response.json();
      setBlog(data);
      setAffichage(true);
    } catch (error) {
      console.error(error);
      setAffichage(false);
    }
  };

  const recupRecherche = async () => {
    // Vérifier si la case de recherche n'est pas vide
    if (recherche.titre.trim() !== "") {
      try {
        const response = await fetch(`http://localhost:3008/jeux/${recherche.titre}`, { method: "GET" });

        if (!response.ok) {
          throw new Error(`Erreur HTTP! Statut : ${response.status}`);
        }

        const data = await response.json();
        setBlog(data);
        setAffichage(true);
      } catch (error) {
        console.error(error);
        setBlog([]); // Réinitialiser le tableau blog à vide en cas de recherche infructueuse
        setAffichage(false);
      }
    } else {
      // La case de recherche est vide, ne pas faire la recherche
      setBlog([]);
      setAffichage(true); // Afficher tous les jeux si la recherche est vide
    }
  };

  useEffect(() => {
    recup();
    rechercher();
  }, []);

  return (
    <div>
      <div>
        <br />
        <center>
          <input
            className="recherche"
            type="search"
            placeholder='Recherche'
            onChange={(e) => setRecherche({ titre: e.target.value })}
          />
          <button className="recherche" onClick={recupRecherche}>Rechercher</button>
        </center>
        <br />
      </div>
      <center>
        <h1>Liste de tous nos Jeux Vidéo</h1>
      </center>
      {/* Affichage uniquement si il y au moins un jeu dans la recherche sinon affichage */}
      {blog.length > 0 ?
        blog.map(article => (
          <div key={article.id}>
            <fieldset>
              <p><u>Titre</u>: <i>{article.titre}</i></p>
              <p>{article.texte}</p>
              <p><li>{article.prix} euros</li></p>
            </fieldset>
          </div>
        )) : (
          <p>{blog.length === 0 ? 'Aucun jeu ne correspond à votre recherche.' : 'Chargement...'}</p>
        )}
    </div>
  );
};

export default Liste;