import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Admin
import Dashboard from './Pages/Admin/Dashboard';
import Historical from './Pages/Admin/Historical';
import Users from './Pages/Admin/Users';
import Judges from './Pages/Admin/Judges';
import EditUserPage from './Pages/Admin/EditUserPage';
import Projects from './Pages/Admin/Projects';
import ProjectPage from './Pages/Admin/ProjectPage';
import Categorias from './Pages/Admin/Categorias';
import Areas from './Pages/Admin/Areas';
import EditAreaPage from './Pages/Admin/EditAreas';
import EditCategoryPage from './Pages/Admin/EditCategory';
import EditAnnouncePage from './Pages/Admin/EditAnnounces';
import CreateAreaPage from './Pages/Admin/CreateArea';
import CreateCategoryPage from './Pages/Admin/CreateCategory';
import CreateAnnouncePage from './Pages/Admin/CreateAnnounce';
import Announces from './Pages/Admin/Announces';
import AdminRubrica from './Pages/Admin/AdminRubrica';

// Judge
import Juez from './Pages/Juez/Juez'; // Mis Proyectos
import Proyectos from './Pages/Juez/Proyectos'; // Catalogo Proyectos
import ProjResumeCont from './Pages/Juez/ProjectResumenContent';
import GeneralProjectResume from './Pages/Juez/GeneralProjectResume';
import Rubrica from './Pages/Juez/Rubrica';
import Anuncios from './Pages/Juez/Announ';
import DetailedAnnoun from './Pages/Juez/DetailedAnnoun';
import Perfil from './Pages/Juez/Profile';

function App() {
  return (
    <Router>
      <div>
        <MainContent />
      </div>
    </Router>
  );
}

function MainContent() {
  const defaultIdPersona = 5;  // Define un valor por defecto para idpersona por ahora antes de poner el auth0

  const location = useLocation(); // Get current location
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    // Update the page title whenever the location changes
    setPageTitle(getTitle(location.pathname));
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/Admin" element={<Dashboard />} />
        <Route path="/historico" element={<Historical />} />
        <Route path="/usuarios" element={<Users />} />
        <Route path="/usuarios/jueces/:projectId" element={<Judges />} />
        <Route path="/usuarios/:userId" element={<EditUserPage />} />
        <Route path="/proyectos" element={<Projects />} />
        <Route path="/proyectos/:projectId" element={<ProjectPage setPageTitle={setPageTitle} />} />
        <Route path="/proyecto/:id" element={<ProjectPage setPageTitle={setPageTitle} />} />
        <Route path="/anuncios" element={<Announces/>}/>
        <Route path="/areas" element={<Areas/>}/>
        <Route path='/areas/nuevo' element={<CreateAreaPage/>}/>
        <Route path="/areas/:areaId" element={<EditAreaPage/>}/>
        <Route path='/categorias' element={<Categorias/>}/>
        <Route path='/categorias/nuevo' element={<CreateCategoryPage/>}/>
        <Route path='/Categorias/:categoriaId' element={<EditCategoryPage/>}/>
        <Route path='/anuncios/:anunciosId' element={<EditAnnouncePage/>}/>
        <Route path='/anuncios/nuevo' element={<CreateAnnouncePage/>}/>
        <Route path="/rubrica" element={<AdminRubrica />}/>

        <Route path="/Juez/:idpersona" element={<Juez />} />
        <Route path="/Juez/General/:idpersona" element={<Proyectos />} />
        <Route path="/Juez/General/:idpersona/Proyectos/:projectId" element={<GeneralProjectResume />} />
        <Route path="/Juez/Anuncios/:idpersona" element={<Anuncios />} />
        <Route path="/Juez/Anuncios/:idpersona/DetailAnnoun/:anuncioId" element={<DetailedAnnoun />} />
        <Route path="/Juez/:idpersona/Calificar/:projectId" element={<Rubrica />} />
        <Route path="/Juez/:idpersona/ProyectoJuez/:projectId" element={<ProjResumeCont />} />
        <Route path="/Juez/Perfil/:idpersona" element={<Perfil />} />

      </Routes>
    </>
  );
}

// Function to get title based on the current route
const getTitle = (pathname) => {
  switch (pathname) {
    case '/':
      return 'Tablero';
    case '/historico':
      return 'Historico';
    case '/usuarios':
      return 'Usuarios';
    case '/proyectos':
      return 'Proyectos';
    case '/anuncios':
      return 'Anuncios';
    case '/perfil':
      return 'Perfil';
    default:
      return 'Your Default Title';
  }
};

export default App;