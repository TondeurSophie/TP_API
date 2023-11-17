import React, { useEffect, useState } from 'react';
import '../App.css';

export default function Mes_articles() {
  const [blog, setBlog] = useState([]);
  const [affichage, setAffichage] = useState(false);

  const [donneesNote, setDonneesNote] = useState({
    note: "",
    commentaire: ""
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

    // Vérifier que la note est entre 1 et 5
    if (donneesNote.note >= 1 && donneesNote.note <= 5) {
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
    } else {
      console.log("La note doit être entre 1 et 5");
      alert ("La note doit être entre 1 et 5")
    }
  };

  const commenter = async (id_location, key) => {
    try {
      await fetch(`http://localhost:3008/locationComm/${id_location}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commentaires: donneesNote.commentaire })
      });

      console.log("Key récupérée :", key);

      setDonneesNote(prevState => ({
        ...prevState,
        commentaire: ""
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
              <button onClick={() => note(jeux.id_location, jeux.note, localStorage.getItem("key"))}>Noter</button>
              <input type="text" placeholder='Commentaire' onChange={(e) => setDonneesNote({ ...donneesNote, commentaire: e.target.value })}></input>
              <button onClick={() => commenter(jeux.id_location, localStorage.getItem("key"))}>Commenter</button>
              <br />
            </fieldset>
          </div>
        )) : <p>Chargement ...</p>}
    </div>
  );
}