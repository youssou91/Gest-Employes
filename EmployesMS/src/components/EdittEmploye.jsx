import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Editemploye = () => {
    const { id } = useParams()
    const [employe, setEmploye] = useState({
        nom: '',
        email: '',
        salaire: 0,
        adresse: '',
        categorie_id: '',
        telephone: 0,
        codePostal: '',
    });
    const [categorie, setCategorie] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        //recuperation de la liste des categoris
        axios.get('http://localhost:3000/auth/categories')
            .then(result => {
                if (result.data.Status) {
                    setCategorie(result.data.Result);
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err)
        )
        //recuperation de l'employe a partir de son id    
        axios.get('http://localhost:3000/auth/employes/' + id)
            .then(result => {
                setEmploye({
                    ...employe,
                    nom: result.data.Result[0].nom,
                    email: result.data.Result[0].email,
                    adresse: result.data.Result[0].adresse,
                    salaire: result.data.Result[0].salaire,
                    categorie_id: result.data.Result[0].categorie_id,
                    telephone: result.data.Result[0].telephone,
                    codePostal: result.data.Result[0].codePostal,
                })
            }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_employe/'+id, employe)
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
                <h3 className="text-center">Edit employe</h3>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className='col-12 d-flex'>
                        <div className='col-6 p-2'>
                            <div className="col-12">
                                <label htmlFor="inputNom" className="form-label">
                                    <strong>Prenom & Nom :</strong>
                                </label>
                                <input
                                    type="text" className="form-control rounded-0" id="inputNom" name="inputNom" 
                                    value={employe.nom}
                                    onChange={(e) =>
                                        setEmploye({ ...employe, nom: e.target.value })
                                    }
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputEmail" className="form-label">
                                    <strong>Email</strong>
                                </label>
                                <input
                                    type="email" className="form-control rounded-0"  id="inputEmail" name="inputEmail" 
                                    autoComplete="off" value={employe.email}
                                    onChange={(e) =>
                                        setEmploye({ ...employe, email: e.target.value })
                                    }
                                />
                            </div>
                            <div className='col-12'>
                                <label htmlFor="inputsalaire" className="form-label">
                                    <strong>Salaire</strong>
                                </label>
                                <input type="text" className="form-control rounded-0" id="inputsalaire" name="inputsalaire" 
                                    autoComplete="off" value={employe.salaire}
                                    onChange={(e) => 
                                        setEmploye({ ...employe, salaire: e.target.value })
                                    }
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputadresse" className="form-label">
                                    <strong>Adresse</strong>
                                </label>
                                <input type="text"   className="form-control rounded-0" id="inputadresse" name="inputadresse" 
                                    autoComplete="off" value={employe.adresse}
                                    onChange={(e) => 
                                        setEmploye({ ...employe, adresse: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                        <div className='col-6 p-2'>
                            <div className="col-12">
                                <label htmlFor="inputTelephone" className='form-label'>
                                    <strong>Telephone :</strong>
                                </label>
                                <input type="text"   className="form-control rounded-0" id="inputTelephone" name="inputTelephone" 
                                    autoComplete="off" value={employe.telephone}
                                    onChange={(e) => 
                                        setEmploye({ ...employe, telephone: e.target.value })
                                    }
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputCodePostal" className='form-label'>
                                    <strong>Code postal :</strong>
                                </label>
                                <input type="text" id='inputCodePostal' placeholder="Entrer le code postal"
                                    value={employe.codePostal} className="form-control "
                                    onChange={(e) => setEmploye({ ...employe, codePostal: e.target.value })} />
                            </div>
                            <div className="col-12">
                                <label htmlFor="categorie" className="form-label">
                                    <strong>Service :</strong>
                                </label>
                                <select name="categorie" id="categorie" className="form-select"
                                    onChange={(e) => setEmploye({ ...employe, categorie_id: e.target.value })}>
                                    {categorie.map((c) => {
                                        return <option key={c.id} value={c.id}>{c.nom}</option>;
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100">
                            Modifier employe
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Editemploye