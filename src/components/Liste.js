import React, { useEffect, useState } from 'react';
import '../App.css';

export default function Liste() {

   // Pour stocker
   const [blog, setblog] = useState([]); 
   // Pour gérer l'affichage
   const [affichage, setAffichage] = useState(false);
   const [donnees, setDonnees] = useState({
    id_location:null,
    id_jeux:null,
    utilisateurs_id:localStorage.getItem("key"),
    date_emprunt:null,
    date_retour:null,
    note:null,
    commentaires:null
  });
 
   const recup = async ()=>{
     //Chargement BDD
     await fetch(`http://localhost:3008/jeux`, 
     {method: "GET"})
     .then(reponse => reponse.json()).then(data => {
         setblog(data);
         setAffichage(true);
        //  console.log(data);
       })
       .catch(error => console.error(error));
   };
 
 
  const [recherche, setRecherche] = useState({
    titre:""
}); 
// console.log('recherche',recherche)
const [titre, setTitre] = useState([]);

const rechercher = async ()=>{
    //Chargement BDD
    await fetch(`http://localhost:3008/jeux/titre`, 
    {method: "GET"})
    .then(reponse => reponse.json()).then(data => {
        setTitre(data);
        setAffichage(true);
    })
    .catch(error => console.error(error));
};

useEffect(() => {
    recup()
    rechercher()
},[])

const recupRecherche = async ()=>{
    console.log(recherche.titre)
    await fetch(`http://localhost:3008/jeux/${recherche.titre}`, 
    {method: "GET"})
    .then(reponse => reponse.json()).then(data => {
        console.log(data)
        setblog(data);
        setAffichage(true);
        // console.log(data);
      })
      .catch(error => console.error(error));
  };

  const ajoutLocation = async ()=>{
    try {
      console.log(donnees)
    const reponse = await fetch(`http://localhost:3008/location`, 
    {method: "POST", headers:{'Content-Type':'application/json'} ,body: JSON.stringify(donnees)})
      if(reponse.status === 200){
        // console.log(donnees)
        window.location.reload();
      }
    }
    catch(error){
      console.error(error);
    }
  } 


   return (
     <div>
        <div>
            <br/>
            <center>
            <input className="recherche" type="search"   placeholder='recherche' onChange={(e) => setRecherche({...recherche,titre:e.target.value})}></input>
            <button className="recherche" onClick={()=> recupRecherche()}>Rechercher</button>
            </center>
            <br/>        
        </div>
        <center>
            <h1>Liste de tous nos Jeux Vidéo</h1>
        </center>
       {affichage ? 
         blog.map(articles => (
           <div>
             <fieldset>
              <p> Jeu n° {articles.id_jeux}</p>
               <p><u>Titre </u>: <i>{articles.titre}</i></p>
               <p> {articles.texte}</p>
               <p> <li>{articles.prix} euros</li></p>
               {localStorage.getItem("key") != null ?<p><u>Louer ce jeu </u>:</p>: null}
              {localStorage.getItem("key") != null ?
              <input type="text"  placeholder='date_emprunt' onChange={(e) => setDonnees({...donnees,date_emprunt:e.target.value})}></input>: null}
              <br/>
              {localStorage.getItem("key") != null ?
              <input type="text"  placeholder='date_retour' onChange={(e) => setDonnees({...donnees,date_retour:e.target.value})}></input>: null}
              <br/>
              {localStorage.getItem("key") != null ?
              <input type="text"  placeholder='numéro du jeu' onChange={(e) => setDonnees({...donnees,id_jeux:e.target.value})}></input>: null}
              <br/>
              {localStorage.getItem("key") != null ?<button onClick={() => ajoutLocation()}>Ajouter</button>: null}
             </fieldset>
           </div>
         )) : <p>Chargement ...</p>}
         <div>
      </div>
     </div>
   ) 
}