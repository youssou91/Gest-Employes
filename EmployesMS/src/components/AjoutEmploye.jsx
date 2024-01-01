import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AjoutEmploye = () => {
    //Recuperation des categories
    const [categorie, setCategorie] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3000/auth/categories')
            .then(result => {
                if (result.data.Status) {
                    setCategorie(result.data.Result)
                } else {
                    alert(result.data.err)
                }
            })
            .catch(err => console.log(err))
    }, [])
    const [employe, setEmploye] = useState({
        nom: '',
        email: '',
        password: '',
        salaire: '',
        adresse: '',
        image: '',
        categorie_id: '',
        telephone: '',
        codePostal: '',
    })
    //ajoiut des donnees
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('nom', employe.nom);
        formData.append('email', employe.email);
        formData.append('password', employe.password);
        formData.append('salaire', employe.salaire);
        formData.append('adresse', employe.adresse);
        formData.append('image', employe.image);
        formData.append('categorie_id', employe.categorie_id);
        formData.append('telephone', employe.telephone);
        formData.append('codePostal', employe.codePostal);
        axios.post('http://localhost:3000/auth/ajout_employe', formData)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/employes')
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }
    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="p-3 rounded w-75 border">
                <h3 className='text-center'> Ajouter Employes </h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12 d-flex'>
                        <div className='col-6 p-2'>
                            <div className="col-12">
                                <label htmlFor="inputName" className='form-label'>
                                    <strong>Nom :</strong>
                                </label>
                                <input type="text" name='inputName' placeholder="Entrer le Nom" className="form-control "
                                    onChange={(e) => setEmploye({ ...employe, nom: e.target.value })} />
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputEmail" className='form-label'>
                                    <strong>Email :</strong>
                                </label>
                                <input type="email" name='inputEmail' autoComplete='off' placeholder="Entrer l'Email" className="form-control "
                                    onChange={(e) => setEmploye({ ...employe, email: e.target.value })} />
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputPassword" className='form-label'>
                                    <strong>Mot de pass :</strong>
                                </label>
                                <input type="password" name='inputPassword' placeholder="Entrer le  Mot de pass" className="form-control "
                                    onChange={(e) => setEmploye({ ...employe, password: e.target.value })} />
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputSalaire" className='form-label'>
                                    <strong>Salaire :</strong>
                                </label>
                                <input type="text" name='inputSalaire' placeholder="Entrer le Salaire" className="form-control "
                                    onChange={(e) => setEmploye({ ...employe, salaire: e.target.value })} />
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputAdresse" className='form-label'>
                                    <strong>Adresse :</strong>
                                </label>
                                <input type="text" name='inputAdresse' placeholder="Entrer l'Adresse" className="form-control "
                                    onChange={(e) => setEmploye({ ...employe, adresse: e.target.value })} />
                            </div>
                        </div>
                        <div className='col-6 p-2'>
                            <div className="col-12">
                                <label htmlFor="inputTelephone" className='form-label'>
                                    <strong>Telephone :</strong>
                                </label>
                                <input type="number" name='inputTelephone' placeholder="Entrer le Numero de telephone" className="form-control "
                                    onChange={(e) => setEmploye({ ...employe, telephone: e.target.value })} />
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputCodePostal" className='form-label'>
                                    <strong>Code postal :</strong>
                                </label>
                                <input type="text" name='inputCodePostal' placeholder="Entrer le code postal" className="form-control "
                                    onChange={(e) => setEmploye({ ...employe, codePostal: e.target.value })} />
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputCategorie" className='form-label'>
                                    <strong>Service :</strong>
                                </label>
                                <select name="inputCategorie" id="inputCategorie" className='form-select'
                                    onChange={(e) => setEmploye({ ...employe, categorie_id: e.target.value })}>
                                    <option value="">Choisir une categorie</option>
                                    {categorie.map(c => {
                                        return <option key={''} value={c.id}>{c.nom}</option>
                                    })}
                                </select>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputImageFile" className='form-label'>
                                    <strong> Selectioner une image :</strong>
                                </label>
                                <input type="file" name="image" id='inputImageFile' className="form-control  image"
                                    onChange={(e) => setEmploye({ ...employe, image: e.target.files[0] })} />
                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <button type='submit' className="btn btn-primary w-100"> Ajouter Employe </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AjoutEmploye
