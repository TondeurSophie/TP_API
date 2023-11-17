import React, { useEffect, useState } from 'react';
import '../App.css';
// import Moment from 'moment'

export default function Liste() {

   // Pour stocker
   const [blog, setblog] = useState([]); 
   // Pour gérer l'affichage
   const [affichage, setAffichage] = useState(false);

   const [jeux, setJeux] = useState();

   //permet de récupèrer les valeurs des dates pour les mettres dans le localstorage
   const [date_emprunt,setDate_emprunt] = useState(localStorage.getItem("date_emprunt"))
   const [date_retour,setDate_retour] = useState(localStorage.getItem("date_retour"))

  //  const emprunt = localStorage.getItem("date_emprunt")

  //permet de trouver le nombre de jour entre 2 dates
   const soustraction = () => {
    //console.log(typeof Date.parse (date_emprunt))

    //change les dates string en number
    const emprunt = Date.parse(date_emprunt)
    const retour = Date.parse(date_retour)
    
    //récupère le prix en fonction de l'id
    const recupPrix = async ()=>{
      //Chargement BDD
      try{
        const response = await fetch(`http://localhost:3008/jeuxP/${jeux}`, 
        {method: "GET"})
 
        if(!response.ok){
         throw new Error(`Erreur HTTP! Statut : ${response.status}`);
        }
      
      const data = await response.json();
       setblog(data);
       setAffichage(true);
       setJeux(data)
     } catch (error) {
       console.error(error);
       setAffichage(false);
     }
    };

    recupPrix();
    //soustraction des dates
    const difference = Math.abs(retour - emprunt);
    //nombre de jours
    const nJours = difference / (1000 * 3600 * 24)
    console.log("soustraction : ",nJours)
    //initialisation de résultat
    const resultat = 0;
    //permet de mettre une alerte avec le résultat
    alert(resultat = nJours * parseInt(setJeux()))
    console.log(resultat)

  }
  // console.log(soustraction)

  //permet de récuperer les données entrer par l'utilisateur
   const [donnees, setDonnees] = useState({
    id_location:null,
    id_jeux:null,
    // ce champs reprend l'id de l'utilisateur
    utilisateurs_id:localStorage.getItem("key"),
    date_emprunt:null,
    date_retour:null,
    note:null,
    commentaires:null
  });
 
  //permet de récupérer tous les jeux de la BDD et de les afficher
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

//permet de trouver le/les titres de jeux de la table jeux, et de garder le/les titres
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

//permet de récupérer le titre trouver précédemment et d'afficher ses infos
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

  //permet de loué le jeux avec date de début et de fin
  const ajoutLocation = async ()=>{
    try {
      console.log(donnees)
      localStorage.setItem("date_emprunt",date_emprunt)
      localStorage.setItem("date_retour",date_retour)
      console.log(localStorage)
    const reponse = await fetch(`http://localhost:3008/location`, 
    {method: "POST", headers:{'Content-Type':'application/json'} ,body: JSON.stringify(donnees)})
    if(reponse.status === 200){
      console.log(reponse.status)  
        // console.log(donnees)

        soustraction()
        //window.location.reload();
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
             <fieldset className='case'>
              <p> Jeu n° {articles.id_jeux}</p>
               <p><u>Titre </u>: <i>{articles.titre}</i></p>
               <p> {articles.texte}</p>
               <p> <li>{articles.prix} euros</li></p>

              {/* permet d'afficher cet element uniquement si on est connecté*/}
               {localStorage.getItem("key") != null ?
               <p><u>Louer ce jeu </u>:</p>
               : null}
              {localStorage.getItem("key") != null ?
              <input type="text"  placeholder='date_emprunt' onChange={(e) => {setDonnees({...donnees,date_emprunt:e.target.value})
              setDate_emprunt(e.target.value)}} ></input>: null}
              <br/>
              {localStorage.getItem("key") != null ?
              <input type="text"  placeholder='date_retour' onChange={(e) => {setDonnees({...donnees,date_retour:e.target.value})
              setDate_retour(e.target.value)}} ></input>: null}
              <br/>
              {localStorage.getItem("key") != null ?
              <input type="text"  placeholder='numéro du jeu' onChange={(e) => {setDonnees({...donnees,id_jeux:e.target.value})
            setJeux(e.target.value)}}></input>: null}
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