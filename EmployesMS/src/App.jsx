import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/Login'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Employe from './components/Employe'
import Categories from './components/Categories'
import Profil from './components/Profil'
import AjoutCategorie from './components/AjoutCategorie'
import AjoutEmploye from './components/AjoutEmploye'
import EdittEmploye from './components/EdittEmploye'

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/adminlogin' element={<Login/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}>
            <Route path='' element={<Home/>}/>
            <Route path='/dashboard/employes' element={<Employe/>}/>
            <Route path='/dashboard/categories' element={<Categories/>}/>
            <Route path='/dashboard/profil' element={<Profil/>}/>
            <Route path='/dashboard/ajout_categorie' element={<AjoutCategorie/>}/>
            <Route path='/dashboard/ajout_employe' element={<AjoutEmploye/>}/>
            <Route path='/dashboard/edit_employe/:id' element={<EdittEmploye/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
