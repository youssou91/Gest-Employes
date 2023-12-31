import axios from 'axios'
import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const AjoutCategorie = () => {
    const [categorie, setCategorie] = useState()
    const navigate = useNavigate()
    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:3000/auth/ajout_categorie', {categorie})
        .then(result => {
            if (result.data.Status) {
                navigate('/dashboard/categories')
            }else{
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }
    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-75 border">
                <h3 className='text-center'> Ajouter Services </h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="categorie">
                            <strong>Service :</strong>
                        </label>
                        <input type="text" name="categorie" placeholder="Entrer votre Service" className="form-control rounded"
                            onChange={(e) =>setCategorie(e.target.value) } />
                    </div>
                    <button className="btn btn-primary w-100  mb-2"> Ajouter Service </button>
                </form>
            </div>
        </div>
    )
}

export default AjoutCategorie
