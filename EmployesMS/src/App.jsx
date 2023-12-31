import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Employe from './components/Employe'
import Categories from './components/Categories'
import Profil from './components/Profil'
import AjoutCategorie from './components/AjoutCategorie'
import AjoutEmploye from './components/AjoutEmploye'
import EdittEmploye from './components/EdittEmploye'
import Start from './components/Start'
import EmployeLogin from './components/EmployeLogin'
import EmployesDetails from './components/EmployesDetails'
import PrivateRoute from './components/PrivateRoute'
import AdminEmpDetails from './components/AdminEmpDetails'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start />}> </Route>
        <Route path='/adminlogin' element={<Login />}></Route>
        <Route path='/employe_login' element={<EmployeLogin />}></Route>
        <Route path='/employe_details/:id' element={<EmployesDetails />}></Route>
        <Route path='/dashboard' element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }>
          <Route path='' element={<Home />} />
          <Route path='/dashboard/employes' element={<Employe />} />
          <Route path='/dashboard/categories' element={<Categories />} />
          <Route path='/dashboard/profil' element={<Profil />} />
          <Route path='/dashboard/ajout_categorie' element={<AjoutCategorie />} />
          <Route path='/dashboard/ajout_employe' element={<AjoutEmploye />} />
          <Route path='/dashboard/edit_employe/:id' element={<EdittEmploye />} />
          <Route path='/dashboard/detail_employe/:id' element={<AdminEmpDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
