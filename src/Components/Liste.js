import React, { useEffect, useState } from 'react';

export default function Liste() {

   // Pour stocker
   const [blog, setblog] = useState([]); 
   // Pour gérer l'affichage
   const [affichage, setAffichage] = useState(false);

  const [Resultat, setResultat] = useState([]);
 
//    const [donnees, setDonnees] = useState({
//     utilisateurs_id:localStorage.getItem("key"),
//     titre:null,
//     auteur:null,
//     date_creation:null,
//     texte:null
// });
 
   const recup = async ()=>{
     //Chargement BDD
     await fetch(`http://localhost:3008/jeux`, 
     {method: "GET"})
     .then(reponse => reponse.json()).then(data => {
         setblog(data);
         setAffichage(true);
         console.log(data);
       })
       .catch(error => console.error(error));
   };
 
   //ajout article
    // const ajout = async ()=>{
    //   try {
    //     console.log(donnees)
    //   const reponse = await fetch(`http://localhost:3008/article`, 
    //   {method: "POST", headers:{'Content-Type':'application/json'} ,body: JSON.stringify(donnees)})
    //     if(reponse.status === 200){
    //       window.location.reload();
    //     }
    //   }
    //   catch(error){
    //     console.error(error);
    //   }
    // } 
   

//supp article
// const deleted = async (titre)=>{
//       try {
//       const reponse = await fetch(`http://localhost:3008/article/${titre}`, 
//       {method: "DELETE"})
//         if(reponse.status === 200){
//           //console.log(titre);
//           window.location.reload();
//         }
//       }
//       catch(error){
//         console.error(error);
//       }
//   } 
 
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
        
      <input type="search"   placeholder='recherche' onChange={(e) => setRecherche({...recherche,titre:e.target.value})}></input>
        <button onClick={()=> recupRecherche()}>Rechercher</button>
        <br/>        
      </div>
        <center>
            <h1>Liste de tous les articles</h1>
            </center>
       {affichage ? 
         blog.map(articles => (
           <div>
             <fieldset>
               <p>Date de publication : {articles.date_creation}</p>
               <p>Auteur : {articles.auteur}</p>
               <p>Titre : {articles.titre}</p>
               <p> {articles.texte}</p>
               {/* {localStorage.getItem("key") != null ? <button onClick={()=> deleted(articles.titre)}>Supprimer</button> : null} */}
             </fieldset>
           </div>
         )) : <p>Chargement ...</p>}
         <div>
        {/* <input type="number"  placeholder='utilisateurs_id' onChange={(e) => setDonnees({...donnees,utilisateurs_id:e.target.value})}></input> */}
        <br/>
        {/* {localStorage.getItem("key") != null ?
        <input type="text"  placeholder='date_creation' onChange={(e) => setDonnees({...donnees,date_creation:e.target.value})}></input>: null}
        <br/>
        {localStorage.getItem("key") != null ?
        <input type="text"  placeholder='Titre' onChange={(e) => setDonnees({...donnees,titre:e.target.value})}></input>: null}
        <br/>
        {localStorage.getItem("key") != null ?
        <input type="text"  placeholder='Auteur' onChange={(e) => setDonnees({...donnees,auteur:e.target.value})}></input>: null}
        <br/>
        {localStorage.getItem("key") != null ?
        <input type="text"  placeholder='Texte' onChange={(e) => setDonnees({...donnees,texte:e.target.value})}></input>: null}
        <br/>
        {localStorage.getItem("key") != null ?<button onClick={() => ajout()}>Ajouter</button>: null} */}
        
      </div>
       
         <br/><br/>

         
     </div>
   )
  
}