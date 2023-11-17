import React, { useEffect, useState } from 'react';
import '../App.css';

export default function Liste() {
  //définition de variables
  const [blog, setblog] = useState([]);
  const [affichage, setAffichage] = useState(false);
  const [jeux, setJeux] = useState();
  const [montantTotal, setMontantTotal] = useState(0);

  //variable permettant de stocker dans le localStorage
  const [date_emprunt, setDate_emprunt] = useState(localStorage.getItem("date_emprunt"));
  const [date_retour, setDate_retour] = useState(localStorage.getItem("date_retour"));

  //permet de récuperer tous les jeux de la BDD avec la méthode GET
  const recup = async () => {
    try {
      const response = await fetch(`http://localhost:3008/jeux`, 
      { method: "GET" });

      if (!response.ok) {
        throw new Error(`Erreur HTTP! Statut : ${response.status}`);
      }

      const data = await response.json();
      setblog(data);
      setAffichage(true);
    } catch (error) {
      console.error(error);
      setAffichage(false);
    }
  };

  //permet de renvoyer les titres correspondant à la recherche (valeur de l'input)
  const rechercher = async () => {
    try {
      //utilisation d'une route
      const response = await fetch(`http://localhost:3008/jeux/titre`, { method: "GET" });

      if (!response.ok) {
        throw new Error(`Erreur HTTP! Status : ${response.status}`);
      }

      const data = await response.json();
      setblog(data);
      setAffichage(true);
    } catch (error) {
      console.error(error);
      setAffichage(false);
    }
  };

  //permet de récupérer le contenu du jeux (titre, texte...) de la recherche
  const recupRecherche = async () => {
    if (recherche.titre.trim() !== "") {
      try {
        const response = await fetch(`http://localhost:3008/jeux/${recherche.titre}`, { method: "GET" });

        if (!response.ok) {
          throw new Error(`Erreur HTTP! Status : ${response.status}`);
        }

        const data = await response.json();
        setblog(data);
        setAffichage(true);
      } catch (error) {
        console.error(error);
        setblog([]);
        setAffichage(false);
      }
    } else {
      setblog([]);
      setAffichage(true);
    }
  };

  //permet de trouver le prix total de location 
  const soustraction = () => {
    //change les données string en nombre
    const emprunt = Date.parse(date_emprunt);
    const retour = Date.parse(date_retour);

    //permet de récupérer le prix des jeux en fonction de l'id_jeux récupéré
    const recupPrix = async () => {
      try {
        const response = await fetch(`http://localhost:3008/jeuxP/${jeux}`, { method: "GET" });

        if (!response.ok) {
          throw new Error(`Erreur HTTP! Statut : ${response.status}`);
        }

        const data = await response.json();
        setblog(data);
        setAffichage(true);
        setJeux(data);
      } catch (error) {
        console.error(error);
        setAffichage(false);
      }
    };

    recupPrix(); //appeletion de la fonction

    //permet de calculer le nombre de jours entre la date emprunt et retour
    const difference = Math.abs(retour - emprunt);
    const nJours = difference / (1000 * 3600 * 24);

    //initialisation de resultat
    let resultat = 0;

    //calcul de prix total en fonction du prix du jeu et du nombre de jours
    if (nJours > 0) {
      resultat = nJours * parseFloat(jeux[0].prix);
      setMontantTotal(resultat);
    } else {
      console.log("La date de retour doit être ultérieure à la date d'emprunt");
      alert ("La date de retour doit être ultérieure à la date d'emprunt")
    }
  };

  //permet de récupérer les données entré par l'utilisateur dans le return et de les envoyé au back
  const [donnees, setDonnees] = useState({
    id_location: null,
    id_jeux: null,
    //assigne la valeur key du localStorage a cette variable
    utilisateurs_id: localStorage.getItem("key"),
    date_emprunt: null,
    date_retour: null,
    note: null,
    commentaires: null
  });


  const [recherche, setRecherche] = useState({
    titre: ""
  });

  //permet d'appeler les fonctions
  useEffect(() => {
    recup();
    rechercher();
  }, []);

  //permet d'ajouter une location en prennant les données de l'utilisateur
  const ajoutLocation = async () => {
    try {
      console.log(donnees);
      localStorage.setItem("date_emprunt", date_emprunt);
      localStorage.setItem("date_retour", date_retour);
      const reponse = await fetch(`http://localhost:3008/location`, { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(donnees) });

      if (reponse.status === 200) {
        console.log(reponse.status);
        //appelation de la fonction pour trouver le prix total de la location
        soustraction();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <br />
        <center>
          <input className="recherche" type="search" placeholder='Recherche' onChange={(e) => setRecherche({ ...recherche, titre: e.target.value })}></input>
          <button className="recherche" onClick={() => recupRecherche()}>Rechercher</button>
        </center>
        <br />
      </div>
      <center>
        <h1>Liste de tous nos Jeux Vidéo</h1>
      </center>
      {blog.length > 0 ?
        blog.map(articles => (
          <div key={articles.id}>
            <fieldset className='case'>
              <p> Jeu n° {articles.id_jeux}</p>
              <p><u>Titre</u>: <i>{articles.titre}</i></p>
              <p> {articles.texte}</p>
              <p> <li>{articles.prix} euros/ jour</li></p>

              {/* permet d'affficher que si l'utilisateur est connecté */}
              {localStorage.getItem("key") != null ?
                <div>
                  <p><u>Louer ce jeu</u>:</p>
                  <input type="text" placeholder='date_emprunt' onChange={(e) => { setDonnees({ ...donnees, date_emprunt: e.target.value }); setDate_emprunt(e.target.value) }} ></input>
                  <br />
                  <input type="text" placeholder='date_retour' onChange={(e) => { setDonnees({ ...donnees, date_retour: e.target.value }); setDate_retour(e.target.value) }} ></input>
                  <br />
                  <input type="text" placeholder='numéro du jeu' onChange={(e) => { setDonnees({ ...donnees, id_jeux: e.target.value }); setJeux(e.target.value) }}></input>
                  <br />
                  {/* exécution de la fonction lors du click du bouton */}
                  <button onClick={() => ajoutLocation()}>Ajouter</button>
                </div>
                : null}
              <p>Montant total de la location : {montantTotal} euros</p>
            </fieldset>
          </div>
        )) :
        (
          <p>{blog.length === 0 ? 'Aucun jeu ne correspond à votre recherche.' : 'Chargement...'}</p>
        )}
      <div>
      </div>
    </div>
  )
}