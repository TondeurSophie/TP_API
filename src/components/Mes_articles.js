import React, { useEffect, useState } from 'react';
import '../App.css'

export default function Mes_articles() {
  //définition de termes
    const [blog, setblog] = useState([]); 
    const [affichage, setAffichage] = useState(false);
    

    const [donneesNote, setDonneesNote] = useState({
        note :"",
        commenatire:""
    });

    //console.log(localStorage)

    //permet de récupérer les données de locations de l'utilisateur connecté
    const recupLocation = async ()=>{
        const id=localStorage.getItem("key")
        //Chargement BDD
        await fetch(`http://localhost:3008/location/${id}`, 
        {method: "GET"})
        .then(reponse => {
            if (reponse.status === 200){
                reponse.json().then(data => {
                    setblog(data)
                    setAffichage(true)
                    console.log(data);
                })
            }else{
                console.log("rien");
            }
        })
          .catch(error => console.error(error));
      };

      //appelle la const recupLocation
      useEffect(() => {
        recupLocation()
    },[])


    //permet de donner une note à un jeu loué
    const note = async (id_location, noteActuelle, key)=>{
      const id=localStorage.getItem("key")
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
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("La note doit être entre 1 et 5");
      alert ("La note doit être entre 1 et 5")
    }
    }
   
    //permet de commenter le jeu loué
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
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div >Mes locations :
      {/* affichage */}
        {affichage ? 
         blog.map(jeux => (
           <div>
            {console.log(jeux)}
             <fieldset className='case'>
              {/* <p> Location n° : {jeux.id_location}</p> */}

              {/* récupération et affichage des variables */}
               <p> Date emprunt : {jeux.date_emprunt}</p>
               <p> Date retour : {jeux.date_retour} </p>
               <p> Jeu n° : {jeux.id_jeux}</p>
               <p> Note du jeu :{jeux.note}</p>
               <p> Commentaire : {jeux.commentaires}</p>
               <br/>

               {/* permet d'entrer des infos */}
               <input type="number" placeholder='note entre 1 et 5' onChange={(e) => setDonneesNote({ ...donneesNote, note: e.target.value })}></input>
              <button onClick={() => note(jeux.id_location, jeux.note, localStorage.getItem("key"))}>Noter</button>
              <input type="text" placeholder='Commentaire' onChange={(e) => setDonneesNote({ ...donneesNote, commentaire: e.target.value })}></input>
              <button onClick={() => commenter(jeux.id_location, localStorage.getItem("key"))}>Commenter</button>
               
             </fieldset>
           </div>
         )) : <p>Chargement ...</p>}
    </div>
  )
}