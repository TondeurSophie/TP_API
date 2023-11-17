import React, { useState } from 'react';
import '../App.css'
export default function Inscription() {

  const [donneesUtili, setDonneesUtili] = useState({
    nom:null,
    email:null,
    mdp:null
});

   //ajout utili
  const handleLogin = async () => {
    try {
      console.log(donneesUtili)
    const reponse = await fetch(`http://localhost:3008/utilisateurs`, 
    {method: "POST", headers:{'Content-Type':'application/json'} ,body: JSON.stringify(donneesUtili)})
      if(reponse.status === 200){
        window.location.reload();
      }
    }
    catch(error){
      console.error(error);
    }
  };

  return (
    <div>
<div className='formulaire'>
    <center>
      <h2>Inscription</h2>
      <form>
      <label>Nom: 
          <input
            type="text"
            onChange={(e) => setDonneesUtili({...donneesUtili,nom:e.target.value})}
          />
        </label>
        <br/>
        <label>Email: 
          <input
            type="email"
            onChange={(e) => setDonneesUtili({...donneesUtili,email:e.target.value})}
          />
        </label>
        <br/>
        <label>Mot de passe:
          <input
            type="password"
            onChange={(e) => setDonneesUtili({...donneesUtili,mdp:e.target.value})}
          />
        </label>
        <br/>
        <button type="button" onClick={handleLogin}>S'inscrire</button>
      </form>
      </center>
    </div>
    </div>
  )
}