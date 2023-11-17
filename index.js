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



// //ajout jeux
app.post('/jeuxAjout', async(req, res) => {
    console.log("post",req.body);
    let conn;
    try{
        console.log("Lancement de la connexion")
        conn = await pool.getConnection();
        console.log("Lancement de la requête")
        //j'insére des valeurs dans la table jeux de la base de données
        //insertion de toutes les variables de la table
        const rows = await conn.query('insert into jeux values (?,?,?,?)', [req.body.id_jeux,req.body.titre,req.body.texte,req.body.prix]);
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
        //tous selectionner de la table jeux en fonction du titre
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

//affiche le prix
app.get('/jeuxP/:id', async (req, res) => {
    const id = req.params.id;
    let conn;
    try {
        conn = await pool.getConnection();
        //tous selectionner de la table jeux en fonction du titre
        const rows = await conn.query('SELECT prix FROM jeux WHERE id_jeux = ?;', [id]);
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

                
                
//modification jeux
app.put('/jeux/:titre', async (req, res) => {
    const titre = req.params.titre;
    const { texte } = req.body;
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query(
            //modification de texte de la table jeux en fonction du titre
            'UPDATE jeux SET texte = ? WHERE titre = ?;',
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

//___________________________________________________________
//Locations
    
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
            const rows = await conn.query('SELECT * FROM locations WHERE id_utilisateur = ? ;', [id_conn]);
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

    //modification de la note
    app.put('/locationNote/:id', async (req, res) => {
        const id_location = req.params.id;
        const {note}  = req.body;
    
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(
                //modification de note de la table locations en fonction de l'id_location
                'UPDATE locations SET note = ? WHERE id_location = ?;',
                [note,id_location]
            );
            res.status(200).json({ message: 'Article updated successfully' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            if (conn) conn.release();
        }
    });
    
    //modification du commentaire
    app.put('/locationComm/:id', async (req, res) => {
        const id_location = req.params.id;
        const {commentaires} = req.body;
    
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(
                //modification de commentaires de la table locations en fonction de l'id_location
                'UPDATE locations SET commentaires = ? WHERE id_location = ?;',
                [commentaires,id_location ]
            );
            res.status(200).json({ message: 'Article updated successfully' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            if (conn) conn.release();
        }
    });

    app.delete('/location/:id', async(req, res) => {
        const id = parseInt(req.params.id)
        
        let conn;
        try{
            console.log("Lancement de la connexion")
            conn = await pool.getConnection();
            console.log("Lancement de la requête")
            //suppression lorsque le titre correspond à l'id 
            const supp = await conn.query('delete from `locations` where `id_location` = ? ', [id]);
            console.log(supp);
            res.status(200).json(supp.affectedRows);
        }
        catch(err){
            console.log(err);
        }
    })
    
//______________________________________________________
//Utilisateur

//récupérer toutes les informations de tous les utilisateurs
app.get('/utilisateurs', async(req,res) => {
    let conn;
    try{
        console.log("Lancement de la connexion")
        conn = await pool.getConnection();
        console.log("Lancement de la requête")
        //renvoie tous les utilisateurs et toutes leurs infos
        const rows = await conn.query('select * from utilisateurs');
        console.log(rows);
        res.status(200).json(rows);
    }
    catch(err){
        console.log(err);
    }
})

//affichage des infos de l'utilisateur connecté
app.get('/utilisateurs/:id', async (req, res) => {
    const id_conn = req.params.id;
    console.log(id_conn)
    let conn;
    try {
        conn = await pool.getConnection();
        //je renvoie tous les éléments de la table locations lorsque l'id_utilisateur correspond à l'id de l'utilisateur qui c'est connecté
        const rows = await conn.query('SELECT nom, email FROM utilisateurs WHERE id = ?;', [id_conn]);
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

//ajout utilisateur
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
    const {nom} = req.body;
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query(
            //modification de nom de la table utilisateurs en fonction de l'id
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