import React, { useEffect, useState } from 'react';
import '../App.css';

export default function Liste() {

   // Pour stocker
   const [blog, setblog] = useState([]); 
   // Pour gérer l'affichage
   const [affichage, setAffichage] = useState(false);

 
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
    await fetch(`http://localhost:3008/articles/titre`, 
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
    // console.log(recherche.titre)
    await fetch(`http://localhost:3008/article/${recherche.titre}`, 
    {method: "GET"})
    .then(reponse => reponse.json()).then(data => {
        console.log(data)
        setblog(data);
        setAffichage(true);
        // console.log(data);
      })
      .catch(error => console.error(error));
  };


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
               <p><u>Titre </u>: <i>{articles.titre}</i></p>
               <p> {articles.texte}</p>
               <p> <li>{articles.prix} euros</li></p>
             </fieldset>
           </div>
         )) : <p>Chargement ...</p>}
         <div>
      </div>
     </div>
   ) 
}