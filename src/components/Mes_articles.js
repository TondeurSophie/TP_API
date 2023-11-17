import React, { useEffect, useState } from 'react';

export default function Mes_articles() {
    const [blog, setblog] = useState([]); 
    const [affichage, setAffichage] = useState(false);
    // const [donnees, setDonnees] = useState({
    //     id_location:null,
    //     id_jeux:null,
    //     utilisateurs_id:localStorage.getItem("key"),
    //     date_emprunt:null,
    //     date_retour:null,
    // });

    const [donneesModif, setDonneesModif] = useState({
        note :null
    });

    //console.log(localStorage)
    const recupArticles = async ()=>{
        const id=localStorage.getItem("key")
        //Chargement BDD
        await fetch(`http://localhost:3008/jeux/${id}`, 
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

    // const ajout = async ()=>{
    //     try {
    //       console.log(donnees)
    //     const reponse = await fetch(`http://localhost:3008/article`, 
    //     {method: "POST", headers:{'Content-Type':'application/json'} ,body: JSON.stringify(donnees)})
    //       if(reponse.status === 200){
    //         window.location.reload();
    //       }
    //     }
    //     catch(error){
    //       console.error(error);
    //     }
    //   } 

    const note = async ()=>{
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
                <p><u>Titre </u>: <i>{articles.titre}</i></p>
               <p> {articles.texte}</p>
               <p> <li>{articles.prix} euros</li></p>
               <p> {articles.note}</p>
               <p> {articles.commentaires}</p>
               <input type="number" placeholder='note entre 1 et 5'></input>
               <button>Noter</button>
               <input type="text" placholder="Commentaire"></input>
               <button>Commentaire</button>
               {/* <button onClick={()=> deleted(articles.titre)}>Supprimer</button> */}
               <br/>
               {/* <input type="text"  placeholder='modifier le texte' onChange={(e) => setDonneesModif({...donneesModif,texte:e.target.value})}></input>
               <button onClick={()=> modifie()}>Modifier</button> */}
             </fieldset>
           </div>
         )) : <p>Chargement ...</p>}
    </div>
  )
}