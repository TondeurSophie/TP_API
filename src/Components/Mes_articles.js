import React, { useEffect, useState } from 'react';
import '../App.css';

export default function Mes_articles() {
  const [blog, setBlog] = useState([]);
  const [affichage, setAffichage] = useState(false);

  const [donneesNote, setDonneesNote] = useState({
    note: ""
  });

  const recupLocation = async () => {
    const id = localStorage.getItem("key");
    try {
      const response = await fetch(`http://localhost:3008/location/${id}`, { method: "GET" });
      if (response.status === 200) {
        const data = await response.json();
        setBlog(data);
        setAffichage(true);
      } else {
        console.log("rien");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    recupLocation();
  }, []);

  const note = async (id_location, noteActuelle, key) => {
    const id = localStorage.getItem("key");
    try {
      await fetch(`http://localhost:3008/locationNote/${id_location}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_jeux: id_location, note: donneesNote.note })
      });

      console.log("Key récupérée :", key);

      setDonneesNote(prevState => ({
        ...prevState,
        note: ""
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>Mes locations :
      {affichage ?
        blog.map(jeux => (
          <div key={jeux.id_location}>
            <fieldset className='case'>
              <p> Location n° : {jeux.id_location}</p>
              <p> Date emprunt : {jeux.date_emprunt}</p>
              <p> Date retour : {jeux.date_retour} </p>
              <p> Jeu n° : {jeux.id_jeux}</p>
              <p> Note du jeu :{jeux.note}</p>
              <p> Commentaire : {jeux.commentaires}</p>
              <br />
              <input type="number" placeholder='note entre 1 et 5' onChange={(e) => setDonneesNote({ ...donneesNote, note: e.target.value })}></input>
              {/* Ajout de la clé en tant qu'argument pour le bouton Noter */}
              <button onClick={() => note(jeux.id_location, jeux.note, localStorage.getItem("key"))}>Noter</button>
              <br />
            </fieldset>
          </div>
        )) : <p>Chargement ...</p>}
    </div>
  );
}