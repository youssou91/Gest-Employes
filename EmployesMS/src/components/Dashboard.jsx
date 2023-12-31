// import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

const Dashboard = () => {
    const navigate = useNavigate()
    axios.defaults.withCredentials  = true;
    const handleLogAout = () =>{
        axios.get('http://localhost:3000/auth/logout')
        .then(result => {
          if (result.data.Status) {
            localStorage.removeItem("valid")
            navigate('/')
          }else{
            alert(result.data.Error)
          }
        })
    }
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                {/* sidebar */}
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <Link className="d-flex align-items-center pb-3 me-md-auto text-white text-decoration-none"
                            to="/dashboard" >
                            <span className="fs-5 fw-bolder d-done d-sm-inline">Code With Yussuf </span>
                        </Link>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center " id="menu">
                            <li className="w-100">
                                <Link className="nav-link text-white px-0 align-middle" to="/dashboard"> 
                                    <i className="fs-4 bi-speedometer2 ms-2"></i>
                                    <span className="ms-2 d-done d-sm-inline"> Dashboard </span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link className="nav-link text-white px-0 align-middle" to="/dashboard/employes"> 
                                    <i className="fs-4 bi-people ms-2"></i>
                                    <span className="ms-2 d-done d-sm-inline"> Gestion Employes </span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link className="nav-link text-white px-0 align-middle" to="/dashboard/categories">
                                    <i className="fs-4 bi-briefcase ms-2"></i>
                                    <span className="ms-2 d-done d-sm-inline">Services</span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link className="nav-link text-white px-0 align-middle" to="/dashboard/profil"> 
                                    <i className="fs-4 bi-person ms-2"></i>
                                    <span className="ms-2 d-done d-sm-inline">Profil</span> 
                                </Link>
                            </li>
                            <li onClick={handleLogAout} className="w-100">
                                <Link className="nav-link text-white px-0 align-middle" to="/dashboard/deconnexion"> 
                                    <i className="fs-4 bi-power ms-2"></i>
                                    <span className="ms-2 d-done d-sm-inline">Deconnexion</span>  
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* End-sidebar */}
                <div className="col p-0  m-0">
                    <div className="p-2 d-flex justify-content-center shadow">
                        <h4>SYSTEME DE GESTION DES EMPLOYES  </h4>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
