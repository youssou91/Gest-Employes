import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './style.css'

const EmployesDetails = () => {
  const [employe, setEmploye] = useState([])
  const {id} = useParams()
  const navigate = useNavigate()
    axios.defaults.withCredentials  = true;
    //deconnexion
    const handleLogAout = () =>{
        axios.get('http://localhost:3000/employes/logout')
        .then(result => {
          if (result.data.Status) {
            localStorage.removeItem("valid")
            navigate('/')
          }else{
            alert(result.data.Error)
          }
        })
    }
  useEffect(() =>{
    axios.get('http://localhost:3000/employes/details/'+id)
    .then(result => {
      setEmploye(result.data[0])
    })
    .catch(err => console.log(err))
  }, [])
  return (
    <div>
      <div className='p-2 d-flex justify-content-center shadow'>
        <h4>Systeme de Gestion des Empoyes</h4>
      </div>
      <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
        <img src={'http://localhost:3000/Images/'+employe.image} alt="" className='epm_det_image' />
        <div className='d-flex align-items-center flex-column mt-5'>
          <h3>Nom : {employe.nom}</h3>
          <h3>Email : {employe.email}</h3>
          <h3>Salaire : $ {employe.salaire}</h3>
          <h3>Adesse : {employe.adresse}</h3>
        </div>
        <div className='d-flex justify-content-between mt-5 mb-2'>
                    <button type='button'   className='btn btn-primary me-5'>
                        <i className="fs-2 bi-pencil ms-2"></i>
                      <span className="ms-2 d-done d-sm-inline fs-2">Editer</span>
                    </button>
                    <button onClick={handleLogAout}  className='btn btn-danger'>
                        <i className="fs-2 bi-power ms-2 "></i>
                      <span className="ms-2 d-done d-sm-inline fs-2">Deconnexion</span>
                    </button>
                </div>
      </div>
    </div>
  )
}

export default EmployesDetails
