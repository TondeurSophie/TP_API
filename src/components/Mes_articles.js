import React, { useEffect, useState } from 'react';

export default function Mes_articles() {
    const [blog, setblog] = useState([]); 
    const [affichage, setAffichage] = useState(false);
    const [donnees, setDonnees] = useState({
        utilisateurs_id:localStorage.getItem("key"),
        titre:null,
        auteur:null,
        date_creation:null,
        texte:null
    });

    const [donneesModif, setDonneesModif] = useState({
        texte :null
    });

    console.log(localStorage)
    const recupArticles = async ()=>{
        const id=localStorage.getItem("key")
        //Chargement BDD
        await fetch(`http://localhost:3008/article_mes/${id}`, 
        {method: "GET"})
        .then(reponse => {
            
            if (reponse.status === 200){

                reponse.json().then(data => {
                    setblog(data)
                    setAffichage(true)
                })
                
                // console.log(data);
            }else{
                console.log("rien");
            }
        })
          .catch(error => console.error(error));
      };

      useEffect(() => {
        recupArticles()
    },[])

    const deleted = async (titre)=>{
        try {
        const reponse = await fetch(`http://localhost:3008/article/${titre}`, 
        {method: "DELETE"})
          if(reponse.status === 200){
            //console.log(titre);
            window.location.reload();
          }
        }
        catch(error){
          console.error(error);
        }
    } 

    const ajout = async ()=>{
        try {
          console.log(donnees)
        const reponse = await fetch(`http://localhost:3008/article`, 
        {method: "POST", headers:{'Content-Type':'application/json'} ,body: JSON.stringify(donnees)})
          if(reponse.status === 200){
            window.location.reload();
          }
        }
        catch(error){
          console.error(error);
        }
      } 

    const modifie = async ()=>{
        try {
            const reponse = await fetch(`http://localhost:3008/article/:titre`, 
            {method: "PUT", headers:{'Content-Type':'application/json'} ,body: JSON.stringify(donneesModif)})
              if(reponse.status === 200){
                //console.log(titre);
                window.location.reload();
              }
            }
            catch(error){
              console.error(error);
            }
    }
   

  return (
    <div>Mes_articles
        {affichage ? 
         blog.map(articles => (
           <div>
             <fieldset>
               <p>Date de publication : {articles.date_creation}</p>
               <p>Auteur : {articles.auteur}</p>
               <p>Titre : {articles.titre}</p>
               <p> {articles.texte}</p>
               <button onClick={()=> deleted(articles.titre)}>Supprimer</button>
               <br/>
               <input type="text"  placeholder='modifier le texte' onChange={(e) => setDonneesModif({...donneesModif,texte:e.target.value})}></input>
               <button onClick={()=> modifie()}>Modifier</button>
             </fieldset>
           </div>
         )) : <p>Chargement ...</p>}



         {localStorage.getItem("key") != null ?
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
        {localStorage.getItem("key") != null ?<button onClick={() => ajout()}>Ajouter</button>: null}
    </div>
  )
}