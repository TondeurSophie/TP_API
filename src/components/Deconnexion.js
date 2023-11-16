import React from 'react'
import '../App.css'

export default function Deconnexion() {

        localStorage.clear();
    
  return (
    <div className='deconnexion'>
        <center>
        Vous êtes déconnecté.
        </center>
    </div>
  )
}