import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const Categories = () => {
  //Recuperation des categories
  const [categorie, setCategorie] = useState([])
  useEffect(() =>{
    axios.get('http://localhost:3000/auth/categories')
    .then(result =>{
      if (result.data.Status) {
        setCategorie(result.data.Result)
      }else{
        alert(result.data.err)
      }
    })
    .catch(err =>console.log(err))
  }, [])
  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>LISTE DES CATEGORIES </h3>
      </div>
      <Link to="/dashboard/ajout_categorie" className='btn btn-success'> Ajouter Categorie </Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th> Numeros </th> 
              <th> Nom </th> 
              <th> Actions </th> 
            </tr>
          </thead>
          <tbody>
            { 
              categorie.map(c =>(
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.nom}</td>
                  <td>
                    <Link to={'/dashboard/edit_categorie/'+c.id} className="btn btn-info btn-sm me-2">
                      <i className="fs-6 bi-pencil ms-2"></i>
                      <span className="ms-2 d-done d-sm-inline">Editer</span>
                    </Link>
                    <button className="btn btn-warning btn-sm me-2">
                      <i className="fs-6 bi-trash ms-2"></i>
                      <span className="ms-2 d-done d-sm-inline">Supprimer</span>
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Categories
