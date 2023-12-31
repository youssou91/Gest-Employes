import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './style.css'

const Employe = () => {
  const [employe, setEmploye] = useState([])
  useEffect(() =>{
    axios.get('http://localhost:3000/auth/employes')
    .then(result =>{
      if (result.data.Status) {
        setEmploye(result.data.Result)
      }else{
        alert(result.data.err)
      }
    })
    .catch(err =>console.log(err))
  }, []);
  //suppresion d'un employe de la liste
  const handleDelete = (id) =>{
    axios.delete('http://localhost:3000/auth/delete_employe/'+id)
    .then(result => {
      if (result.data.Status) {
        // navigate('/dashboard/employes')
        window.location.reload()
      }else{
        alert(result.data.Error)
      }
    })
  }
  //Details
  const {id} = useParams()
  useEffect(() =>{
    axios.get('http://localhost:3000/auth/details/'+id)
    .then(result => {
      setEmploye(result.data[0])
    })
    .catch(err => console.log(err))
  }, [])
  return (
    <div>
      <div className="px-5 mt-3">
        <div className="d-flex justify-content-center">
          <h3>LISTE DES EMPLOYES </h3>
        </div>
        <Link to="/dashboard/ajout_employe" className="btn btn-success">
          Ajouter Empoye
        </Link>
        <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th> Image </th> 
              <th> Nom </th> 
              <th> Email </th> 
              <th> Salaire </th> 
              <th> Adesse </th> 
              <th> Actions </th> 
            </tr>
          </thead>
          <tbody>
            { 
              employe.map(e =>(
                <tr key={e.id}>
                  <td>
                    <img src={'http://localhost:3000/Images/'+e.image} alt="photo" className="image_employe" />
                  </td>
                  <td>{e.nom}</td>
                  <td>{e.email}</td>
                  <td>$ {e.salaire}</td>
                  <td>{e.adresse}</td>
                  <td>
                    <Link to={'/dashboard/edit_employe/'+e.id} className="btn btn-info btn-sm me-2">
                      <i className="fs-6 bi-pencil ms-2"></i>
                      <span className="ms-2 d-done d-sm-inline"> <strong> Editer </strong> </span>
                    </Link>
                    <Link to={'/dashboard/detail_employe/'+e.id} className="btn btn-primary btn-sm me-2">
                      <i className="fs-6 bi-eye  ms-2"></i>
                      <span className="ms-2 d-done d-sm-inline"> <strong> Voir </strong> </span>
                    </Link>
                    <button onClick={() => handleDelete(e.id)} className="btn btn-warning btn-sm me-2">
                      <i className="fs-6 bi-trash ms-2"></i>
                      <span className="ms-2 d-done d-sm-inline"> <strong> Supprimer </strong> </span>
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default Employe;
