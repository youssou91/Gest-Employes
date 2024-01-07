import { useEffect, useState } from 'react'
import axios from 'axios'
const Home = () => {
  const [totalAdmin, setTotalAdmin] = useState(0)
  const [totalEmploye, setTotalEmploye] = useState(0)
  const [totalSalaire, setTotalSalaire] = useState(0)
  const [admins, setAdmins] = useState([])
  
  useEffect(() =>{
    adminCompt();
    employeCompt();
    salaireCompt();
    AdminList();
  },[])
  //Decompte des admin
  const adminCompt = () =>{
    axios.get('http://localhost:3000/auth/admin_compt')
      .then(result =>{
        if (result.data.Status) {
          setTotalAdmin(result.data.Result[0].admin)
        }
      })
  }
  //Decompte des employes
  const employeCompt = () =>{
    axios.get('http://localhost:3000/auth/employe_compt')
      .then(result =>{
        if (result.data.Status) {
          setTotalEmploye(result.data.Result[0].employes)
        }
      })
  }
   //Decompte de la somme totale des salaires des employes
   const salaireCompt = () =>{
    axios.get('http://localhost:3000/auth/salaire_compt')
      .then(result =>{
        if (result.data.Status) {
          setTotalSalaire(result.data.Result[0].salaire)
        }
      })
  }
  //Liste des admins
  const AdminList = () =>{
    axios.get('http://localhost:3000/auth/admin_list')
      .then(result =>{
        if (result.data.Status) {
          setAdmins(result.data.Result)
        }
      })
  }

  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='p-3 pt-2 pb-3 border shadow w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between '>
            <h5>Total :</h5>
            <h5>{totalAdmin}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 border shadow w-25'>
          <div className='text-center pb-1'>
            <h4>Employes</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total : </h5>
            <h5> {totalEmploye}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 border shadow w-25'>
          <div className='text-center pb-1'>
            <h4>Salaires</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total : </h5>
            <h5>$ {totalSalaire} </h5>
          </div>
        </div>
      </div>
      <div className='mt-4 px-15 pt-3'>
        <h3>Liste des admins</h3>
        <table className='table'>
          <thead>
            <tr>
              <td> <strong> Email </strong> </td>
              <td> <strong> Actions </strong> </td>
            </tr>
          </thead>
          <tbody>
            {
              admins.map(a =>(
                <tr key={''}>
                  <td>{a.email}</td>
                  <td>
                    <button  className="btn btn-info btn-sm me-2">
                      <i className="fs-6 bi-pencil ms-2"></i>
                      <span className="ms-2 d-done d-sm-inline">Editer</span>
                    </button>
                    <button  className="btn btn-warning btn-sm me-2">
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

export default Home
