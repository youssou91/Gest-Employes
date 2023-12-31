import express, { response } from 'express'
import con from '../utils/db.js'
import jwt from "jsonwebtoken"
import bcrypt, { hash } from 'bcrypt'
import multer from 'multer'
import path from 'path'

const router = express.Router()
// connexion des employes a la base de donnees 
router.post("/employe_login", (req, res) =>{
    const sql = "SELECT * from employes Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
        if(err) return res.json({ loginStatus: false, Error: "Erreur de requete"});
        if(result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err, response) => {
                if(err) return res.json({ loginStatus: false, Error: "Erreur de mot de pass"});
                if (response) {
                    const email = result[0].email;
                    const token = jwt.sign(
                        {role: "employes", email: email, id: result[0].id},
                        "jwt_secret_key",
                        {expiresIn: "1d"}
                    );
                    res.cookie('token', token);
                    return res.json({ loginStatus: true, id: result[0].id });
                }
            })
        } else {
            return res.json({ loginStatus: false, Error: "Email ou Mot de Pass incorect" });
        }
    });
});


router.get('/details/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employes where id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status:false});
        return res.json(result)
    })
})

//API de deconnexion
router.get('/logout',  (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})
export {router as EmployeRouter}