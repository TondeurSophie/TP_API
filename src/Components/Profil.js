import React, { useEffect, useState } from 'react';

export default function Profil() {

    // Pour stocker
   const [blog, setblog] = useState([]); 
   // Pour gérer l'affichage
   const [affichage, setAffichage] = useState(false);

   const [donneesModif, setDonneesModif] = useState({
    nom :null
   });

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


    const nomModif = async ()=>{
        const id=localStorage.getItem("key")
        try {
            const reponse = await fetch(`http://localhost:3008/utilisateurModif/${id}`, 
            {method: "PUT", headers:{'Content-Type':'application/json'} ,body: JSON.stringify(donneesModif)})
              if(reponse.status === 200){
                // console.log(donneesModif);
                window.location.reload();
              }
            }
            catch(error){
              console.error(error);
            }
    }

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
               <br/>
               <p>Modifier votre nom ?</p>
               <input type="text" placeholder='Nom' onChange={(e) => setDonneesModif({...donneesModif,nom:e.target.value})} ></input>
               <button onClick={()=> nomModif(utili.nom)}>Valider</button>
               <br/>
             </fieldset>
           </div>
         )) : <p>Chargement ...</p>}
    </div>
  )
}