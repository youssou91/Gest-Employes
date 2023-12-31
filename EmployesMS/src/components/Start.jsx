import axios from 'axios';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Start = () => {
    const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() =>{
    axios.get('http://localhost:3000/verifie')
    .then(result => {
      if (result.data.Status) {
        if (result.data.role === "admin") {
          navigate('/dashboard')
        }else{
          navigate('/employe_details/'+result.data.id)
        }
      }
    })
    .catch(err => console.log(err))
  }, [])
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
            <div className="p-5 rounded w-50 border loginForm">
                <h2 className='text-center'>Page de connexion </h2>
                <div className='d-flex justify-content-between mt-5 mb-2'>
                    <button type='button' onClick={() => {navigate('/employe_login')}}  className='btn btn-primary'>
                        <i className="fs-2 bi-person-add ms-2"></i>
                      <span className="ms-2 d-done d-sm-inline fs-2">Employes</span>
                    </button>
                    <button type='button' onClick={() => {navigate('/adminlogin')}}  className='btn btn-success'>
                        <i className="fs-2 bi-person-gear ms-2 "></i>
                      <span className="ms-2 d-done d-sm-inline fs-2">Admins</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Start
