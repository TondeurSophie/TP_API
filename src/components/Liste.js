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
     try{
       const response = await fetch(`http://localhost:3008/jeux`, 
       {method: "GET"})

       if(!response.ok){
        throw new Error(`Erreur HTTP! Statut : ${response.status}`);
       }
     
     const data = await response.json();
      setblog(data);
      setAffichage(true);
    } catch (error) {
      console.error(error);
      setAffichage(false);
    }
   };
 
 
  const [recherche, setRecherche] = useState({
    titre:""
}); 
// console.log('recherche',recherche)
const [titre, setTitre] = useState([]);

const rechercher = async ()=>{
  try{
    //Chargement BDD
    const response = await fetch(`http://localhost:3008/jeux/titre`, 
    {method: "GET"})

    if(!response.ok){
      throw new Error(`Erreur HTTP! Status : ${response.status}`)
    }
  
    const data = await response.json();
      setblog(data);
      setAffichage(true);
    } catch (error) {
      console.error(error);
      setAffichage(false);
    }
};

useEffect(() => {
    recup()
    rechercher()
},[])

const recupRecherche = async ()=>{
  // Vérifier si la case de recherche n'est pas vide
  if (recherche.titre.trim() !== "") {
    try{
      // console.log(recherche.titre)
      const response = await fetch(`http://localhost:3008/jeux/${recherche.titre}`, 
      {method: "GET"})

      if(!response.ok){
        throw new Error(`Erreur HTTP! Status : ${response.status}`)
      }
      const data = await response.json();
      setblog(data);
      setAffichage(true);
    } catch (error) {
      console.error(error);
      setblog([]); // Réinitialiser le tableau blog à vide en cas de recherche infructueuse
      setAffichage(false);
    }
  } else {
    // La case de recherche est vide, ne pas faire la recherche
    setblog([]);
    setAffichage(true); // Afficher tous les jeux si la recherche est vide
  }
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
            <input className="recherche" type="search"   placeholder='Recherche' onChange={(e) => setRecherche({...recherche,titre:e.target.value})}></input>
            <button className="recherche" onClick={()=> recupRecherche()}>Rechercher</button>
            </center>
            <br/>        
        </div>
        <center>
            <h1>Liste de tous nos Jeux Vidéo</h1>
        </center>
       {blog.length > 0 ? 
         blog.map(articles => (
           <div key={articles.id}>
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
         )) : 
         (
          <p>{blog.length === 0 ? 'Aucun jeu ne correspond à votre recherche.' : 'Chargement...'}</p>
        )}
         <div>
      </div>
     </div>
   ) 
}