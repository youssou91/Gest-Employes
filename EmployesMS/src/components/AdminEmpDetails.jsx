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
                <img src={'http://localhost:3000/Images/' + employe.image} alt="" className='epm_det_image'/>
                <div className='d-flex align-items-center flex-column mt-5'>
                    <h3><strong>Nom :</strong> {employe.nom}</h3>
                    <h3><strong>Email :</strong> {employe.email}</h3>
                    <h3><strong>Salaire :</strong> $ {employe.salaire}</h3>
                    <h3><strong>Adesse :</strong> {employe.adresse}</h3>
                    <h3><strong>Telephone :</strong> {employe.telephone}</h3>
                    <h3><strong>Code Postal :</strong> {employe.codePostal}</h3>
                </div>
            </div>
        </div>
    )
}

export default AdminEmpDetails