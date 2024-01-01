import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const AdminEmpDetails = () => {
    const [employe, setEmploye] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/auth/employes')
            .then(result => {
                if (result.data.Status) {
                    setEmploye(result.data.Result)
                } else {
                    alert(result.data.err)
                }
            })
            .catch(err => console.log(err))
    }, []);
    const { id } = useParams()
    useEffect(() => {
        axios.get('http://localhost:3000/employes/details/' + id)
            .then(result => {
                setEmploye(result.data[0])
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <div>
            <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
                <img src={'http://localhost:3000/Images/' + employe.image} alt="" className='epm_det_image' />
                <div className='d-flex align-items-center flex-column mt-5'>
                    <h3>Nom : {employe.nom}</h3>
                    <h3>Email : {employe.email}</h3>
                    <h3>Salaire : $ {employe.salaire}</h3>
                    <h3>Adesse : {employe.adresse}</h3>
                    <h3>Telephone : {employe.telephone}</h3>
                    <h3>Code Postal : {employe.codePostal}</h3>
                </div>
                {/* <div className='d-flex justify-content-between mt-5 mb-2'>
                    <button type='button' className='btn btn-primary me-5'>
                        <i className="fs-2 bi-pencil ms-2"></i>
                        <span className="ms-2 d-done d-sm-inline fs-2">Editer</span>
                    </button>
                    <button onClick={handleDelete} className='btn btn-danger'>
                        <i className="fs-2 bi-power ms-2 "></i>
                        <span className="ms-2 d-done d-sm-inline fs-2">Deconnexion</span>
                    </button>
                </div> */}
            </div>
        </div>
    )
}

export default AdminEmpDetails