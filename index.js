require('dotenv').config()
const mariadb = require('mariadb');
const express = require('express') //récupération d'express
const app = express() //variable utilisant librairie express
let cors = require('cors')
const bcrypt = require('bcrypt');


console.log(process.env.DB_HOST)
//connexion à la base de données. Informations du fichier .env
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DTB,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    connectLimit:100
});

//utilisation d'express et cors
app.use(express.json())
app.use(cors())

//connexion BDD
app.get('/jeux', async(req,res) => {
    let conn;
    try{
        console.log("Lancement de la connexion")
        conn = await pool.getConnection();
        console.log("Lancement de la requête")
        //je renvoie toute la table jeux
        const rows = await conn.query('select * from jeux');
        console.log(rows);
        res.status(200).json(rows);
    }
    catch(err){
        console.log(err);
    }
})

//affichage de tous les titres
app.get('/jeux/id', async(req,res) => {
    let conn;
    try{
        console.log("Lancement de la connexion")
        conn = await pool.getConnection();
        console.log("Lancement de la requête")
        //je renvoie l'id_jeux de la table jeux
        const rows = await conn.query('select id_jeux from jeux');
        console.log(rows);
        res.status(200).json(rows);
    }
    catch(err){
        console.log(err);
    }
})

//affichage des locations
app.get('/locations', async(req,res) => {
    let conn;
    try{
        console.log("Lancement de la connexion")
        conn = await pool.getConnection();
        console.log("Lancement de la requête")
        //je renvoie toute la table locations
        const rows = await conn.query('select * from locations');
        console.log(rows);
        res.status(200).json(rows);
    }
    catch(err){
        console.log(err);
    }
})

//affichage des locations en fonction id_utilisateur
app.get('/location/:id', async (req, res) => {
    const id_conn = req.params.id;
    console.log(id_conn)
    let conn;
    try {
        conn = await pool.getConnection();
        //je renvoie tous les éléments de la table locations lorsque l'id_utilisateur correspond à l'id de l'utilisateur qui c'est connecté
        const rows = await conn.query('SELECT * FROM locations WHERE id_utilisateur = ?;', [id_conn]);
        console.log("connexion",rows)
        if (rows.length > 0) {
            res.status(200).json(rows);
            console.log(rows)
        } else {
            res.status(404).json({ error: 'Article not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (conn) conn.release();
    }
})

//ajout location
app.post('/location', async(req, res) => {
    console.log("post",req.body);
    let conn;
    try{
        console.log("Lancement de la connexion")
        conn = await pool.getConnection();
        console.log("Lancement de la requête")
        //j'insére des valeurs dans la table locations de la base de données
        //insertion de toutes les variables de la table
        const rows = await conn.query('insert into locations values (?,?,?,?,?,?,?)', [req.body.id_location,req.body.utilisateurs_id,req.body.id_jeux,req.body.date_emprunt,req.body.date_retour,req.body.note,req.body.commentaires]);
        // console.log(rows);
        res.status(200).json(rows.affectedRows);
    }
    catch(err){
        console.log(err);
    }
})

// //supprimer jeux
app.delete('/jeux/:titre', async(req, res) => {
    const id = req.params.titre
    
    let conn;
    try{
        console.log("Lancement de la connexion")
        conn = await pool.getConnection();
        console.log("Lancement de la requête")
        //suppression lorsque le titre correspond à l'id 
        const supp = await conn.query('delete from `jeux` where `titre` = ? ', [id]);
        console.log(supp);
        res.status(200).json(supp.affectedRows);
    }
    catch(err){
        console.log(err);
    }
})

//affichage du jeux avec le titre = ...
app.get('/jeux/:titre', async (req, res) => {
    const titre = req.params.titre;
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM jeux WHERE titre = ?;', [titre]);
        if (rows.length > 0) {
            res.status(200).json(rows);
            console.log(rows)
        } else {
            res.status(404).json({ error: 'Article not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (conn) conn.release();
    }
});

//mes jeux
// app.get('/jeux/:id', async (req, res) => {
//     const id_conn = req.params.id;
//     let conn;
//     try {
//         conn = await pool.getConnection();
//         const rows = await conn.query('SELECT * FROM jeux WHERE id = ?;', [id_conn]);
//         console.log("connexion",rows)
//         if (rows.length > 0) {
//             res.status(200).json(rows);
//             console.log(rows)
//         } else {
//             res.status(404).json({ error: 'Article not found' });
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     } finally {
//         if (conn) conn.release();
//     }
// })


//modification jeux
app.put('/article/:titre', async (req, res) => {
    const titre = req.params.titre;
    const { utilisateurs_id, auteur, date_creation, texte } = req.body;

    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query(
            // 'UPDATE articles SET utilisateurs_id = ?, auteur = ?, date_creation = ?, texte = ? WHERE titre = ?;',
            // [utilisateurs_id, auteur, date_creation, texte, titre]
            'UPDATE articles SET texte = ? WHERE titre = ?;',
            [texte, titre]
        );
        res.status(200).json({ message: 'Article updated successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (conn) conn.release();
    }
});



//______________________________________________________
//Utilisateur

app.get('/utilisateurs', async(req,res) => {
    let conn;
    try{
        console.log("Lancement de la connexion")
        conn = await pool.getConnection();
        console.log("Lancement de la requête")
        const rows = await conn.query('select * from utilisateurs');
        console.log(rows);
        res.status(200).json(rows);
    }
    catch(err){
        console.log(err);
    }
})

// //ajout utilisateur
app.post('/utilisateurs', async(req, res) => {
    // console.log("post",req);
    let conn;
    bcrypt.hash(req.body.mdp,10)
        .then(async (hash) => {
            console.log("Lancement de la connexion")
            console.log(req.body)
            conn = await pool.getConnection();
            console.log("Lancement de la requête")
            //insertion dans la table utilisateurs les données récupèrées du front
            const rows = await conn.query('insert into utilisateurs (nom, email, mdp) values (?,?,?)', [req.body.nom,req.body.email,hash]);
            console.log(rows.affectedRows);
            res.status(200).json(rows.affectedRows);
        })
    
    .catch((error) => res.status(500).json(error))
})

//vérification email dans bdd
app.post('/utilisateursBDD', async(req,res) => {
    const email = req.body.email;
    const mdp = req.body.mdp;
    let conn;
    try{
        console.log("Lancement de la connexion")
        conn = await pool.getConnection();
        console.log("Lancement de la requête")
        //je selectionne tous de la table utilisateurs lorsque l'email correspond à l'un des "profil"
        const rows = await conn.query('select * from utilisateurs where email = ? ', [email]);
        console.log(rows)
        if (rows.length > 0) {
            const hash = rows[0].mdp;
            //compare mdp avec hash
            const match = await bcrypt.compare(mdp,hash);
            console.log(match);
            if (match){
                console.log("Vous êtes connecté")
                res.status(200).json({id:rows[0].id});
            }else{
                console.log("le mdp de correspond pas")
            }
            
        } else {
            res.status(404).json({ error: 'Article not found' });
        }
        console.log(rows);
        res.status(200).json(rows);
    }
    catch(err){
        console.log(err);
    }
})

// //supprimer utilisateur
app.delete('/supp_utilisateur/:id', async(req, res) => { 
    const id = parseInt(req.params.id)
    let conn;
    try{
        console.log("Lancement de la connexion")
        conn = await pool.getConnection();
        console.log("Lancement de la requête")
        //suppression d'un utilisateur en fonciton de son id
        const supp = await conn.query('delete from `utilisateurs` where `id` = ? ', [id]);
        console.log(supp);
        res.status(200).json(supp.affectedRows);
    }
    catch(err){
        console.log(err);
    }
})

//modification utilisateur
app.put('/utilisateurModif/:id', async (req, res) => {
    const id = req.params.id;
    const nom = req.body.nom;
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query(
            'UPDATE utilisateurs SET nom = ? WHERE id = ?;',
            [nom,id]
        );
        res.status(200).json({ message: 'Article updated successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (conn) conn.release();
    }
});




app.listen(3008, () => { //ouverture du serveur sur port 3008
    console.log("Serveur à l'écoute") //affiche message dans la console
})