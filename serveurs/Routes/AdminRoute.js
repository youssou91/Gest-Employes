import express from 'express'
import con from '../utils/db.js'
import jwt from "jsonwebtoken"
import bcrypt, { hash } from 'bcrypt'
import multer from 'multer'
import path from 'path'

const router = express.Router()
// connexion a la base de donnees 
router.post("/adminlogin", (req, res) =>{
    const sql = "SELECT * from admin Where email = ? and password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if(err) return res.json({ loginStatus: false, Error: "Erreur de requete"});
        if(result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign(
                {role: "admin", email: email},
                "jwt_secret_key",
                {expiresIn: "1d"}
            );
            res.cookie('token', token);
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error: "Email ou Mot de Pass incorect" });
        }
    });
});

// API D'ajout
router.post('/ajout_categorie', (req, res) =>{
    const sql = "INSERT INTO categories (nom) VALUES (?)";
    con.query(sql, [req.body.categorie], (err, result) =>{
        if (err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

//API pour lister les categories
router.get('/categories', (req, res) => {
    const sql = "SELECT *  FROM  categories";
    con.query(sql, (err, result) =>{
        if (err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})
//image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'Public/Images')
    }, 
    filename: (req, file, cb) =>{
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
//end-image upload

//API pour instrtion d'employes
router.post('/ajout_employe', upload.single('image'), (req, res) =>{
    const sql = 'INSERT INTO employes (nom, email, password, salaire, adresse, image, categorie_id) VALUES (?)';
    //hachage du mot de pass
    bcrypt.hash(req.body.password, 10, (err, hash) =>{
        if (err) return res.json({Status: false, Error: "Query Error  haut"})
        const values = [
            req.body.nom,
            req.body.email,
            hash,
            req.body.salaire,
            req.body.adresse,
            req.file.filename,
            req.body.categorie_id
        ]
        con.query(sql, [values], (err, result) => {
            if (err) {
                return res.json({Status: false, Error: "Query Error bas"})}
            return res.json({Status: true})
        })
    })
    
})

//API pour lister les employes
router.get('/employes', (req, res) => {
    const sql = "SELECT *  FROM  employes";
    con.query(sql, (err, result) =>{
        if (err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

//API  de recuperation des donnees des employes en passant par l'id
router.get('/employes/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT *  FROM  employes WHERE id = ?";
    con.query(sql, [id], (err, result) =>{
        if (err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})
//API de modification des donnees recuperees
router.put('/edit_employe/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE employes set nom = ?, email = ?, salaire = ?, adresse = ?, categorie_id = ? WHERE  id = ?';
    const values = [
        req.body.nom,
        req.body.email,
        req.body.salaire,
        req.body.adresse,
        req.body.categorie_id
    ]           
    con.query(sql, [...values, id], (err, result) =>{
        console.log(values)
        if (err) return res.json({Status: false, Error: "Query Error "+err})
        return res.json({Status: true, Result: result})
    })
})

//API de suppression d'un employe pour un id donne
router.delete('/delete_employe/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from employes where id = ?"
    con.query(sql, [id], (err, result) =>{ 
        // console.log(values) 
        if (err) return res.json({Status: false, Error: "Query Error "+err})
        return res.json({Status: true, Result: result})
    })
})


export {router as adminRouter}