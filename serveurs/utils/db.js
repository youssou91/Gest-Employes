import mysql from 'mysql'

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employessm"
})

con.connect(function(err) {
    if(err){
        console.log("Erreur de connexion !!!")
    }else{
        console.log("Connexion reussie !!!")
    }
})

export default con;