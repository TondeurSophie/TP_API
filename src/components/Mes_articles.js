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

      useEffect(() => {
        recupLocation()
    },[])


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
    <div>Mes locations :
        {affichage ? 
         blog.map(jeux => (
           <div>
            {console.log(jeux)}
             <fieldset>
               <p> Date emprunt : {jeux.date_emprunt}</p>
               <p> Date retour : {jeux.date_retour} </p>
               <p> Jeu n° : {jeux.id_jeux}</p>
               <p> Note du jeu :{jeux.note}</p>
               <p> Commentaire : {jeux.commentaires}</p>
               <br/>
               <input type="number" placeholder='note entre 1 et 5'></input>
               <button>Noter</button>
               <br/>
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