import React, { useEffect, useState } from 'react';

export default function Profil() {

    // Pour stocker
   const [blog, setblog] = useState([]); 
   // Pour gérer l'affichage
   const [affichage, setAffichage] = useState(false);

   const recupUtilisateur = async ()=>{
    const id=localStorage.getItem("key")

    //Chargement BDD
    await fetch(`http://localhost:3008/utilisateurs/${id}`, 
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
        recupUtilisateur()
    },[])

  return (
    <div>
        <center>
        <h1><u>Gestion du profil</u></h1>
        </center>

        {affichage ? 
         blog.map(utili => (
           <div>
            {console.log(utili)}
             <fieldset>
               <p> Nom : {utili.nom}</p>
               <p> Email : {utili.email} </p>
             </fieldset>
           </div>
         )) : <p>Chargement ...</p>}
    </div>
  )
}
