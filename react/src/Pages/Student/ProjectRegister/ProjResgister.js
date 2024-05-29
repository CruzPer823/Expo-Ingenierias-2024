import { useEffect,useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Modal from 'react-bootstrap/Modal';
import './ProjRegister.css';

import { useAuth0 } from '@auth0/auth0-react';

import { Link } from 'react-router-dom';

import Usure from '../../../Components/BotonConfirmacion/ConfBot'

//Back
import axios from 'axios';

import ToggleBarStudent from '../../../Components/TogglebarStudent/togglebarStudent.js';

import Autosuggest from 'react-autosuggest';

import { Typeahead } from 'react-bootstrap-typeahead';

const URI = 'http://localhost:8000/projects/register'


function MemberCont({NombreMiembro}){
  return(
    <li className="Texto text-wrap mb-0">{NombreMiembro}</li>
  );
}


function ButtonMaterials({material1, setMaterial1, material2, setMaterial2, material3, setMaterial3}) {
const [show, setShow] = useState(false);

return (
  <>
    <Button variant="primary" onClick={() => setShow(true)} className='ButtonMaterials'>
      Abrir lista de materiales
    </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Añadir materiales extra
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='container'>
              <div className='row'>
                  <div className='col'>
                      <p>Esta sección no es obligatria, unicamente si necesitas materiales extra para la presentación de tu proyecto</p>
                  </div>
              </div>

              <div className='row align-items-center m-2'>
                  <div className='col-4'>
                      <span className='Subtitulo'>Contacto de 220v</span>
                  </div>

                  <div className='col-auto'>
                      <Button className='ButtonAddLessMaterials' onClick={()=>material1!==0 && setMaterial1(material1-1)}>-</Button>
                  </div>

                  <div className='col-auto'>
                      <span>{material1}</span>
                  </div>

                  <div className='col-auto'>
                      <Button className='ButtonAddLessMaterials' onClick={()=>material1 !== 3 && setMaterial1(material1+1)}>+</Button>
                  </div>
              </div>

              <div className='row align-items-center m-2'>
                  <div className='col-4'>
                      <span className='Subtitulo'>Mampara para poster</span>
                  </div>

                  <div className='col-auto'>
                      <Button className='ButtonAddLessMaterials' onClick={()=>material2 !== 0 && setMaterial2(material2-1)} >-</Button>
                  </div>

                  <div className='col-auto'>
                      <span>{material2}</span>
                  </div>

                  <div className='col-auto'>
                      <Button className='ButtonAddLessMaterials' onClick={()=>material2 !== 3 && setMaterial2(material2+1)}>+</Button>
                  </div>
              </div>

              <div className='row align-items-center m-2  '>
                  <div className='col-4'>
                      <span className='Subtitulo'>Pantalla</span>
                  </div>

                  <div className='col-auto'>
                      <Button className='ButtonAddLessMaterials' onClick={()=>material3 !== 0 && setMaterial3(material3-1)}>-</Button>
                  </div>

                  <div className='col-auto text-center'>
                      <span>{material3}</span>
                  </div>

                  <div className='col-auto'>
                      <Button className='ButtonAddLessMaterials' onClick={()=>material3 !== 3 && setMaterial3(material3+1)}>+</Button>
                  </div>
              </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

function AreaButtons({setArea, areas}) {
  return (
    <ToggleButtonGroup type="radio" name="options" defaultValue={1} className='d-flex justify-content-between w-100'>
      {areas.map(area => (
          <ToggleButton id={"tbg-radio" + area.id} value={area.id} onChange={(e)=> setArea(e.target.value)} className='ButtonMaterials w-100'>
                {area.name}
          </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

function CategoryButtons({setCategory, categories}) {
  return (
    <ToggleButtonGroup type="radio" name="options1" defaultValue={1} className='d-flex justify-content-between w-100'>
      {categories.map(category => (
        <ToggleButton id={"tbg-radio-"+ category.id + ".1"} value={category.id} onChange={(e)=> setCategory(e.target.value)}  className='ButtonMaterials w-100'>
          {category.title}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

function FormExample() {
  const [data, setData] = useState({ students: [], teachers: [], categories: [], areas: [] });
  const [validated, setValidated] = useState(false);
  const [memberNum, setMemberNum] = useState(1);
  const [teacherNum, setTeacherNum] = useState(1);
  const [members, setMembers] = useState([{ id: 1, nameMember: '', lastNameMember: '', enrollment: '' }]);
  const [teachers, setTeachers] = useState([{ id: 1, nameTeacher: '', lastNameTeacher: '', email: '' }]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [linkVideo, setLinkVideo] = useState('');
  const [linkPoster, setLinkPoster] = useState('');
  const [area, setArea] = useState(1);
  const [category, setCategory] = useState(1);
  const [contacto, setContacto] = useState(0);
  const [mampara, setMampara] = useState(0);
  const [pantalla, setPantalla] = useState(0);

  const { isAuthenticated, isLoadingAuth, error, user } = useAuth0();

  const [selectedStudentIds, setSelectedStudentIds] = useState([user.email.substring(0,9)]); 
  const [selectedTeacherEmails, setSelectedTeacherEmails] = useState([]);

  // Filtrar estudiantes y profesores seleccionados
  const filteredStudents = data.students.filter((student) => !selectedStudentIds.includes(student.enrollment));
  const filteredTeachers = data.teachers.filter((teacher) => !selectedTeacherEmails.includes(teacher.email));







  useEffect(() => {
    fetch('http://localhost:8000/projects/register')
      .then((res) => res.json())
      .then((expoData) => setData(expoData));
  }, []);

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    const form = event ? event.target : null;
    if (form && form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      await axios.post(URI, {
        id_student: user.sub,
        title: title,
        description: description,
        linkVideo: linkVideo,
        linkPoster: linkPoster,
        area: area,
        category: category,
        materials: [
          { id_material: 1, amount: contacto },
          { id_material: 2, amount: mampara },
          { id_material: 3, amount: pantalla },
        ],
        members: members.map((member) => ({
          name: member.nameMember,
          lastName: member.lastNameMember,
          enrollment: member.enrollment,
        })),
        teachers: teachers.map((teacher) => ({
          name: teacher.nameTeacher,
          lastName: teacher.lastNameTeacher,
          email: teacher.email,
        })),
      });
    }

    setValidated(true);
  };

  const handleAddMember = () => {
    const newMemberId = memberNum + 1;
    setMemberNum(newMemberId);
    setMembers([...members, { id: newMemberId, nameMember: '', lastNameMember: '', enrollment: '' }]);
  };

  const handleRemoveMember = (id) => {
    if (members.length === 1) return;
    const removedMember = members.find((member) => member.id === id);
    if (removedMember) {
      setSelectedStudentIds(selectedStudentIds.filter((studentId) => studentId !== removedMember.enrollment));
    }
    setMembers(members.filter((member) => member.id !== id));
    setMemberNum(memberNum - 1);
  };
  

  const handleAddProf = () => {
    const newTeacherId = teacherNum + 1;
    setTeacherNum(newTeacherId);
    setTeachers([...teachers, { id: newTeacherId, nameTeacher: '', lastNameTeacher: '', email: '' }]);
  };

  const handleRemoveProf = (id) => {
    if (teachers.length === 1) return;
    const removedTeacher = teachers.find((teacher) => teacher.id === id);
    if (removedTeacher) {
      setSelectedTeacherEmails(selectedTeacherEmails.filter((email) => email !== removedTeacher.email));
    }
    setTeachers(teachers.filter((teacher) => teacher.id !== id));
    setTeacherNum(teacherNum - 1);
  };
  


  //Students
  const handleEnrollmentChange = (value, indexMember) => {
    const updatedMembers = [...members];
    const prevEnrollment = updatedMembers[indexMember].enrollment;
    
    if (value === '') {
      setSelectedStudentIds(selectedStudentIds.filter((studentId) => studentId !== prevEnrollment));
    }
    
    updatedMembers[indexMember].enrollment = value;
    setMembers(updatedMembers);
  };
  


  const handleMemberSelect = (selected, indexMember) => {
    if (selected.length > 0) {
      const student = selected[0];
      const updatedMembers = [...members];
      updatedMembers[indexMember].enrollment = student.enrollment;
      updatedMembers[indexMember].nameMember = student.name; // Asume que los datos del estudiante contienen 'name'
      updatedMembers[indexMember].lastNameMember = student.lastName; // Asume que los datos del estudiante contienen 'lastName'
      setMembers(updatedMembers);
      setSelectedStudentIds([...selectedStudentIds, student.enrollment]);
    }
  };

    //Teachers
  const handleEmailChange = (value, indexTeacher) => {
    const updatedTeachers = [...teachers];
    const prevEmail = updatedTeachers[indexTeacher].email;
    
    if (value === '') {
      setSelectedTeacherEmails(selectedTeacherEmails.filter((email) => email !== prevEmail));
    }
    
    updatedTeachers[indexTeacher].email = value;
    setTeachers(updatedTeachers);
  };
  

  const handleTeacherSelect = (selected, indexTeacher) => {
    if (selected.length > 0) {
      const teacher = selected[0];
      const updatedTeachers = [...teachers];
      updatedTeachers[indexTeacher].email = teacher.email;
      updatedTeachers[indexTeacher].nameTeacher = teacher.name;
      updatedTeachers[indexTeacher].lastNameTeacher = teacher.lastName;
      setTeachers(updatedTeachers);
      setSelectedTeacherEmails([...selectedTeacherEmails, teacher.email]);
    }
  };
  


  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>

        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom06">
            <Form.Label className="Titulo ps-2">Titulo del proyecto</Form.Label>
            <Form.Control
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Ingresa un titulo para tu proyecto"
              className="InputFormat"
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className="Titulo">Descripción del proyecto</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="InputFormat"
              rows={5}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationMembers">
            <Form.Label className="Titulo">Integrantes</Form.Label>
            {members.map((member, indexMember) => (
              <div key={member.id} className="container">
                <div className="row pt-2 pb-2 pe-2">
                  {indexMember !== 0 && (
                    <div className="col-auto">
                      <Button className="ButtonAddLessMaterials" onClick={() => handleRemoveMember(member.id)}>
                        -
                      </Button>
                    </div>
                  )}
                  {indexMember === members.length - 1 && (
                    <div className="col-auto">
                      <Button className="ButtonAddLessMaterials" onClick={handleAddMember}>
                        +
                      </Button>
                    </div>
                  )}
                </div>
                <div className="row">

                  <div className="col">
                    <Typeahead
                      id={`member-enrollment-${member.id}`}
                      options={filteredStudents}
                      labelKey="enrollment"
                      onChange={(selected) => handleMemberSelect(selected, indexMember)}
                      onInputChange={(text) => handleEnrollmentChange(text, indexMember)}
                      placeholder="A01XXXXXX"
                      selected={data.students.filter((student) => student.enrollment === member.enrollment)}
                      inputProps={{ className: 'InputFormat', required: true }}
                    />
                    </div>

                  
                  <div className='col'>
                  <Form.Control
                    required
                    value={member.nameMember}
                    onChange={(e) => {
                      const updatedMembers = [...members];
                      updatedMembers[indexMember].nameMember = e.target.value;
                      setMembers(updatedMembers);
                    }}
                    type="text"
                    placeholder="Ingresa el nombre(s)"
                    className="InputFormat"
                  />
                  </div>


                  <div className='col'>
                  <Form.Control
                    required
                    value={member.lastNameMember}
                    onChange={(e) => {
                      const updatedMembers = [...members];
                      updatedMembers[indexMember].lastNameMember = e.target.value;
                      setMembers(updatedMembers);
                    }}
                    type="text"
                    placeholder="Ahora los apellidos"
                    className="InputFormat"
                  />
                  </div>

                </div>
                  <Form.Control.Feedback type='invalid'>No hay integrantes</Form.Control.Feedback>
                </div>
              ))}
            </Form.Group>
          </Row>

            
        <Row className="mb-3  ">
            <Form.Group as={Col} md="12" controlId="validationArea">
            <div className='container-fluid'>
                <div className='row'>
                  <div className='col'>
                    <Form.Label className='Titulo ps-2'>Área</Form.Label>
                  </div>
                </div>

                <div className='row'>
                  <div className='col'>
                    <AreaButtons setArea={setArea} areas={data.areas}/>
                  </div>
                </div>
            </div>
            </Form.Group>
        </Row>


      <Row className="mb-3  ">
          <Form.Group as={Col} md="12" controlId="validationCustom03">
          <div className='container-fluid'>
              <div className='row'>
                  <div className='col'>
                      <Form.Label className='Titulo ps-2'>Categoría</Form.Label>
                  </div>
              </div>

                <div className='row'>
                    <div className='col'>
                        <CategoryButtons setCategory={setCategory} categories={data.categories}/>
                    </div>
                </div>
            </div>
            </Form.Group>
        </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationTeacher">
          <Form.Label className='Titulo'>Profesor(es) asesor</Form.Label>
          {teachers.map((teacher, indexTeacher) => (
            <div key={teacher.id} className='container'>
              <div className='row pt-2 pb-2 pe-2'>
                {indexTeacher !== 0 && (
                  <div className='col-auto'>
                    <Button className='ButtonAddLessMaterials' onClick={() => handleRemoveProf(teacher.id)}>-</Button>
                  </div>
                )}
                {indexTeacher === teachers.length - 1 && (
                  <div className='col-auto'>
                    <Button className='ButtonAddLessMaterials' onClick={() => handleAddProf()}>+</Button>
                  </div>
                )}
              </div>
              <div className='row'>


                <div className='col'>
                  <Typeahead
                    id={`teacher-email-${teacher.id}`}
                    options={filteredTeachers}
                    labelKey="email"
                    onChange={(selected) => handleTeacherSelect(selected, indexTeacher)}
                    onInputChange={(text) => handleEmailChange(text, indexTeacher)}
                    placeholder="correo@example"
                    selected={teachers[indexTeacher].email ? [teachers[indexTeacher]] : []}
                    inputProps={{ className: 'InputFormat', required: true }}
                    
                  />
                </div>

                <div className='col'>
                  <Form.Control 
                    required
                    value={teacher.nameTeacher}
                    onChange={(e) => {
                      const updatedTeachers = [...teachers];
                      updatedTeachers[indexTeacher].nameTeacher = e.target.value;
                      setTeachers(updatedTeachers);
                    }} 
                    type="text"
                    placeholder="Ingresa el nombre"  
                    className='InputFormat' />
                </div>


                <div className='col'>
                  <Form.Control
                  required
                  value={teacher.lastNameTeacher} 
                  onChange={(e) => {
                    const updatedTeachers = [...teachers];
                    updatedTeachers[indexTeacher].lastNameTeacher = e.target.value;
                    setTeachers(updatedTeachers);
                  }}  
                  type="text"
                  placeholder="Ingresa los apellidos"  
                  className='InputFormat' />
                </div>
              </div>

            </div>
          ))}
        </Form.Group>
      </Row>

        <Row className="mb-3  ">

          <Form.Group as={Col} md="12" controlId="validationCustom06">

            <div className='container-fluid'>
              <div className='row'>
                <div className='col'>
                  <Form.Label className='Titulo ps-2'>Poster(PDF)</Form.Label>
                </div>
              </div>

              <div className='row'>
                <div className='col'>
                  <Form.Control
                  required
                  value={linkPoster}
                  onChange={(e)=> setLinkPoster(e.target.value)}
                  type="text"
                  placeholder="Link de tu carpeta de drive"
                  className='InputFormat'
                  />            
                </div>
              </div>
            </div>

          </Form.Group>
      </Row>

        <Row className="mb-3  ">

          <Form.Group as={Col} md="12" controlId="validationCustom06">

            <div className='container-fluid'>
              <div className='row'>
                <div className='col'>
                  <Form.Label className='Titulo ps-2'>Link video</Form.Label>
                </div>
              </div>


              <div className='row'>
                <div className='col'>
                  <Form.Control
                    required
                    value={linkVideo}
                    onChange={(e)=> setLinkVideo(e.target.value)}
                    type="text"
                    placeholder="Link de youtube"
                    className='InputFormat'
                  />                
                </div>
              </div>            
            </div>
          </Form.Group>
      </Row>

      <Row className="mb-3  ">
          <Form.Group as={Col} md="12" controlId="validationCustom07">
          <div className='cotainer-fluid'>
              <div className='row'>
                  <div className='col'>
                      <Form.Label className='Titulo'>Necesitas materiales extra?</Form.Label>
                  </div>
              </div>

                <div className='row d-flex justify-content-center'>
                    <div className='d-flex justify-content-center p-3 BckGrnd'>
                        <ButtonMaterials material1={contacto} setMaterial1={setContacto} material2={mampara} setMaterial2={setMampara} material3={pantalla} setMaterial3={setPantalla}/>
                    </div>
                </div>
            </div>
            </Form.Group>

        </Row>


        {/*<center><Button type="submit" className='mt-4 btn-lg ButtonRegister'>Registrar proyecto</Button></center>*/}
        <center><Usure MensajeTitle={"¿Deseas registrar este proyecto?"} BotonA={"Regresar"} BotonB={"Confirmar registro"} Path={'/principal-estudiante/'} className={"mt-4 btn-lg ButtonRegister"} Texto={"Registrar proyecto"} onConfirm={handleSubmit}/></center>
      </Form>   

      <div className='container-fluid mb-4'>
        <div className='row'>
            <div className='col'>
                <Link to={'/principal-estudiante'} className='bi bi-arrow-left-circle IconBack'> Regresar</Link>
            </div>
        </div>
      </div>  
    </>


    
);
}

export default function ProjRegisterCont(){
  return (
    <>
      <ToggleBarStudent NameSection={"Registro de nuevo proyecto"} />
      <div className='container w-50 mt-4 mb-4 bg-white'>
        <div className='row p-2'>
            <div className='col p-4'>
                <FormExample />
            </div>
        </div>
      </div>   
    </>
  );
}