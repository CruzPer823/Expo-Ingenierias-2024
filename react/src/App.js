import './App.css';
import './Page.css';
import {Routes, Route} from 'react-router-dom'
import React, { useState,useEffect} from "react";
import ProjResumeCont from './Pages/Teacher/TeacherProjectResumen/TeacherProjectResumen.js';
import Hometeacher from './Pages/Teacher/TeacherHome/TeacherHome.js';
import Main from './Pages/Main/MainPage/main.js';
import EdicionesPasadas from './Pages/Main/PastEdition/EdicionesPasadas.js';
import Catalogo from './Pages/Main/Catalogue/Actual.js';
import Login from './Pages/Main/Login/login.js';
import FormUser from './Pages/Main/UserRegister/UserRegister.js';
import FormStudent from './Pages/Main/StudentRegister/StudentRegister.js';
import UserRegisterCont from './Pages/Main/RegisterContent/RegisterContent.js'
import AnunciosTeacher from './Pages/Teacher/TeacherAdvertisements/TeacherAdvertisements.js';
import ConstanciaTeacher from './Pages/Teacher/TeacherCertificate/TeacherConstancia.js';
import Perfil from './Pages/Teacher/TeacherProfile/TeacherProfile.js';
import TeacherAnoDet from './Pages/Teacher/TeacherAdvertisements/DetailedAnnoun.js'
import ProjectRegister from './Pages/Student/ProjectRegister/ProjResgister.js';
import ProjectResumen from './Pages/Student/ProjectResumen/ProjectResumenContent.js';
import AnunciosStudent from './Pages/Student/Announcement/Announ.js'
import StudentCertificate from './Pages/Student/StudentCertificate/Constancia.js'
import MaterialExtra from './Pages/Student/ExtraMaterials/materiales.js';
import StudentMap from './Pages/Student/StudentMap/StudentMap.js';
import ProjSelection from './Pages/Student/ProjectSelection/ProjSelection.js';
import ProjectEdition from './Pages/Student/ProjectEdition/ProjEdition.js';
import StudentAnnounDet from './Pages/Student/Announcement/DetailedAnnoun.js'
import StudentProfile from './Pages/Student/StudentProfile/StudentProfile.js';
import { BrowserRouter as useLocation } from 'react-router-dom';
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
import ProjResumeContJudge from './Pages/Juez/ProjectResumenContent';
import GeneralProjectResume from './Pages/Juez/GeneralProjectResume';
import Rubrica from './Pages/Juez/Rubrica';
import Anuncios from './Pages/Juez/Announ';
import DetailedAnnoun from './Pages/Juez/DetailedAnnoun';
import PerfilJuez from './Pages/Juez/Profile';
// Auth0
import Callback from './auth0/callback.js';
import ProtectedRoute from './auth0/protect.js';

const getCurrentDate = () => {
  const now = new Date();
  const options = { day: 'numeric', month: 'long' }; // Opciones para formatear la fecha
  return now.toLocaleDateString('es-ES', options);
};
const isDateEqualOrAfter = (specificDate) => {
  const now = new Date();
  const targetDate = new Date(specificDate);
  return now >= targetDate;
};

// const getTitle = (pathname) => {
//   switch (pathname) {
//     case '/Admin':
//       return 'Tablero';
//     case '/Admin/historico':
//       return 'Historico';
//     case '/Admin/usuarios':
//       return 'Usuarios';
//     case '/Admin/proyectos':
//       return 'Proyectos';
//     case '/Admin/anuncios':
//       return 'Anuncios';
//     case '/Admin/perfil':
//       return 'Perfil';
//     default:
//       return 'Your Default Title';
//   }
// };


function App() {
  // const location = useLocation(); // Get current location
  // const [pageTitle, setPageTitle] = useState('');

  // useEffect(() => {
  //   // Update the page title whenever the location changes
  //   setPageTitle(getTitle(location.pathname));
  // }, [location.pathname]);

  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [isTargetDateReached, setIsTargetDateReached] = useState(false);
  let constancia;



  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsTargetDateReached(isDateEqualOrAfter('2024-05-25'));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if(isTargetDateReached == true){
    constancia = "True";
  }
  else{
    constancia = "False";
  }
  
  return (
    <>
      <div>
          <Routes>
              {/*Main Routes */}
              <Route path="/" element={<Main />} />
              <Route path="/Ediciones-pasadas" element={<EdicionesPasadas />} />
              <Route path="/Catalogo" element={<Catalogo />} />

              {/*Teacher Routes */}
              <Route path="/principal-profesor" element={<ProtectedRoute requiredRole="teacher"><Hometeacher /></ProtectedRoute>} />
              <Route path="/profesor/:id_person/:id_project" element={<ProtectedRoute requiredRole="teacher"><ProjResumeCont /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/Registro-usuario" element={<ProtectedRoute requiredRole="teacher"><FormUser /></ProtectedRoute>} />
              <Route path="/Registro-inicio" element={<ProtectedRoute requiredRole="teacher"><UserRegisterCont /></ProtectedRoute>} />
              <Route path="/anuncios-profesor" element={<ProtectedRoute requiredRole="teacher"><AnunciosTeacher /></ProtectedRoute>} />
              <Route path="/constancia-profesor/:id_user" element={<ProtectedRoute requiredRole="teacher"><ConstanciaTeacher ConstCheck={"True"} /></ProtectedRoute>} />
              <Route path="/perfil-profesor/:id_user" element={<ProtectedRoute requiredRole="teacher"><Perfil /></ProtectedRoute>} />
              <Route path="/announ-teacher/:id_announ" element={<ProtectedRoute requiredRole="teacher"><TeacherAnoDet /></ProtectedRoute>} />

              {/*Student Routes */}
              <Route path='/announ-estudiante/:id_announ' element={<ProtectedRoute requiredRole="student"><StudentAnnounDet /></ProtectedRoute>} />
              <Route path="/registro-proyecto" element={<ProtectedRoute requiredRole="student"><ProjectRegister /></ProtectedRoute>} />
              <Route path="/resumen-proyecto-estudiante/:id_project" element={<ProtectedRoute requiredRole="student"><ProjectResumen /></ProtectedRoute>} />
              <Route path="/anuncio-estudiante" element={<ProtectedRoute requiredRole="student"><AnunciosStudent /></ProtectedRoute>} />
              <Route path="/constancia-estudiante" element={<ProtectedRoute requiredRole="student"><StudentCertificate ConstCheck={constancia} /></ProtectedRoute>} />
              <Route path="/extramaterial/:id_project" element={<ProtectedRoute requiredRole="student"><MaterialExtra ProjCheck={"True"}/></ProtectedRoute>} />
              <Route path="/mapa" element={<ProtectedRoute requiredRole="student"><StudentMap /></ProtectedRoute>} />
              <Route path="/principal-estudiante" element={<ProtectedRoute requiredRole="student"><ProjSelection/></ProtectedRoute>} />
              <Route path='/EditProject/:id_project' element={<ProtectedRoute requiredRole="student"><ProjectEdition /></ProtectedRoute>} />
              <Route path='/student-profile/' element={<ProtectedRoute requiredRole="student"><StudentProfile /></ProtectedRoute>} />
              <Route path="/Callback" element={<Callback />} />

                {/* Admin Routes */}

              <Route path="/Admin" element={<Dashboard />} />
              <Route path="/Admin/historico" element={<Historical />} />
              <Route path="/Admin/usuarios" element={<Users />} />
              <Route path="/Admin/usuarios/jueces/:projectId" element={<Judges />} />
              <Route path="/Admin/usuarios/:userId" element={<EditUserPage />} />
              <Route path="/Admin/proyectos" element={<Projects />} />
              <Route path="/Admin/proyectos/:projectId" element={<ProjectPage />} />
              <Route path="/Admin/anuncios" element={<Announces/>}/>
              <Route path="/Admin/areas" element={<Areas/>}/>
              <Route path='/Admin/areas/nuevo' element={<CreateAreaPage/>}/>
              <Route path="/Admin/areas/:areaId" element={<EditAreaPage/>}/>
              <Route path='/Admin/categorias' element={<Categorias/>}/>
              <Route path='/Admin/categorias/nuevo' element={<CreateCategoryPage/>}/>
              <Route path='/Admin/Categorias/:categoriaId' element={<EditCategoryPage/>}/>
              <Route path='/Admin/anuncios/:anunciosId' element={<EditAnnouncePage/>}/>
              <Route path='/Admin/anuncios/nuevo' element={<CreateAnnouncePage/>}/>
              <Route path="/Admin/rubrica" element={<AdminRubrica />}/>

              {/* Judge Routes */}

              {/* <Route path="/Juez/:idpersona" element={<Juez />} />
              <Route path="/Juez/General/:idpersona" element={<Proyectos />} />
              <Route path="/Juez/General/:idpersona/Proyectos/:projectId" element={<GeneralProjectResume />} />
              <Route path="/Juez/Anuncios/:idpersona" element={<Anuncios />} />
              <Route path="/Juez/Anuncios/:idpersona/DetailAnnoun/:anuncioId" element={<DetailedAnnoun />} />
              <Route path="/Juez/:idpersona/Calificar/:projectId" element={<Rubrica />} />
              <Route path="/Juez/:idpersona/ProyectoJuez/:projectId" element={<ProjResumeContJudge />} />
              <Route path="/Juez/Perfil/:idpersona" element={<PerfilJuez />} /> */}
          </Routes>
      </div>
    </>
  );
}






export default App;
