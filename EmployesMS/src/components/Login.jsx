import { useState } from "react";
import './style.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials  = true;

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/auth/adminlogin', values)
        .then(result => {
            if(result.data.loginStatus){
                navigate('/dashboard')
            }else{
                setError(result.data.Error)
            }

        })
        .catch(err => console.log(err))
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
            <div className="p-3 rounded w-25 border loginForm">
                <div className="text-warning">
                    {error &&  error}
                </div>
                <h2>Page de connexion </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email :</strong>
                        </label>
                        <input type="email" name="email" autoComplete="off" placeholder="Entrer votre email" className="form-control" 
                        onChange={(e) => setValues({...values, email : e.target.value})}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Mot de pass :</strong>
                        </label>
                        <input type="password" name="password" placeholder="Entrer votre mot de pass" className="form-control rounded-0" 
                        onChange={(e) => setValues({...values, password : e.target.value})}/>
                    </div>
                    <button className="btn btn-success w-100 rounded-0 mb-2"> Connexion </button>
                    <div className="mb-1">
                        <input type="checkbox" name="tick" id="tick" className="me-2" />
                        <label htmlFor="">
                            Etes-vous d accord avec les conditions ?
                        </label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
