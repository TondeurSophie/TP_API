import React, { useEffect, useState } from 'react';
import '../App.css'

export default function Mes_articles() {
    const [blog, setblog] = useState([]); 
    const [affichage, setAffichage] = useState(false);
    

    const [donneesNote, setDonneesNote] = useState({
        note :""
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
      const id=localStorage.getItem("key")
      
        try {
            const reponse = await fetch(`http://localhost:3008/locationNote/${id}`, 
            {method: "PUT", headers:{'Content-Type':'application/json'} ,body: JSON.stringify(donneesNote)})
              if(reponse.status === 200){
                console.log(donneesNote);
                // window.location.reload();
              }
            }
            catch(error){
              console.error(error);
            }
    }
   

  return (
    <div >Mes locations :
        {affichage ? 
         blog.map(jeux => (
           <div>
            {console.log(jeux)}
             <fieldset className='case'>
              {/* <p> Location n° : {jeux.id_location}</p> */}
               <p> Date emprunt : {jeux.date_emprunt}</p>
               <p> Date retour : {jeux.date_retour} </p>
               <p> Jeu n° : {jeux.id_jeux}</p>
               <p> Note du jeu :{jeux.note}</p>
               <p> Commentaire : {jeux.commentaires}</p>
               <br/>
               <input type="number" placeholder='note entre 1 et 5' onChange={(e) => setDonneesNote({...donneesNote,note:e.target.value})}></input>
               <button onClick={()=> note(jeux.note)}>Noter</button>
               <br/>
               {/* <input type="text" placholder="Commentaire" onChange={(e) => setDonneesModif({...donneesModif,commentaires:e.target.value})}></input> */}
               {/* <button onClick={()=> commentaires(jeux.commentaires)}>Commentaire</button> */}
               
             </fieldset>
           </div>
         )) : <p>Chargement ...</p>}
    </div>
  )
}