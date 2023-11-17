import React from 'react'
import '../App.css'

export default function Deconnexion() {

  //vide le localStorage / enlève l'id de l'utilisateur enregistré
        localStorage.clear();
    
  return (
    <div className='deconnexion'>
        <center>
        Vous êtes déconnecté.
        </center>
    </div>
  )
}