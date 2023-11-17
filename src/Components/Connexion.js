import React, { useEffect, useState } from 'react';
import '../App.css'


function Connexion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [donneesConn, setDonneesConn] = useState({
    email:null,
    mdp:null,
});

const connexion = async ()=>{
  //Chargement BDD
  await fetch(`http://localhost:3008/utilisateurs`, 
  {method: "GET"})
  .then(reponse => reponse.json()).then(data => {
      setEmail(data);
      setPassword(data);
      // setAffichage(true);
  })
  .catch(error => console.error(error));
};

  const handleLogin = async () => {
    
    await fetch(`http://localhost:3008/utilisateursBDD`, 
    {method: "POST",headers:{'Content-Type':'application/json'} ,body: JSON.stringify(donneesConn)})
    .then(reponse => 
      {if (reponse.status === 200){
        //console.log(reponse);
        reponse.json().then(data => localStorage.setItem("key", data.id))
      }}
      )

    // .then(data => {
        
        
        // setblog(data);
        // setAffichage(true);
        // console.log(data);
      // })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    connexion()
},[])


  return (
    <>
    <div className='formulaire'>
    <center>
      <h2>Connexion</h2>
      <form>
        <label>Email: 
          <input
            type="email"
            // value={email}
            onChange={(e) => setDonneesConn({...donneesConn,email:e.target.value})}
          />
        </label>
        <br/>
        <label>Mot de passe:
          <input
            type="password"
            // value={password}
            onChange={(e) => setDonneesConn({...donneesConn,mdp:e.target.value})}
          />
        </label>
        <br/>
        <button type="button" onClick={handleLogin}>Se Connecter</button>
      </form>
      </center>
    </div>
    
    </>
  );
}

export default Connexion;