import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Rubrica.css';
import ToggleBar from '../../Components/Togglebar/togglebar';
import Loader from '../../Components/Loader/Loader';
import { useAuth0 } from '@auth0/auth0-react';
import AdminDeleteUserPopUp from '../../Components/Popup/AdminDeleteUserPopUp';
import { useNavigate } from 'react-router-dom';
import Popup from '../../Components/Popup/Popup';

const Rubrica = () => {
  const { projectId } = useParams(); // Capturamos los parámetros de la URL
  const [criteria, setCriteria] = useState([]);
  const [selectedCriteria, setSelectedCriteria] = useState([]);
  const [comments, setComments] = useState([]);
  const [additionalComment, setAdditionalComment] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [loading, setLoading] = useState(true); // Estado de carga
  const { isAuthenticated, isLoading, error, user } = useAuth0();
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [type, setType] = useState(false);
  const [errorContent, setErrorContent] = useState("");

  const navigate = useNavigate();
  
  const handleSucces = () => {
    navigate('/Juez');
  };

  useEffect(() => {
    const fetchCriteria = async () => {
      try {
        const response = await fetch('https://140.84.165.119/api/Juez/fetchCriterias');
        const data = await response.json();
        setCriteria(data);
        setSelectedCriteria(Array(data.length).fill(0));
        setComments(Array(data.length).fill(''));
        setLoading(false); // Desactivar el estado de carga después de obtener los datos
      } catch (error) {
        console.error('Error al obtener los criterios:', error);
        setErrorContent('Error al obtener los criterios:', error.error)
        setType(true)
        setShowErrorMessage(true)
        setLoading(false); // Desactivar el estado de carga en caso de error
      }
    };

    fetchCriteria();
  }, []);

  const handleSliderChange = (index, value) => {
    setSelectedCriteria(prevSelectedCriteria => {
      const newSelectedCriteria = [...prevSelectedCriteria];
      newSelectedCriteria[index] = value;
      return newSelectedCriteria;
    });
  };

  const handleCommentChange = (index, value) => {
    setComments(prevComments => {
      const newComments = [...prevComments];
      newComments[index] = value;
      return newComments;
    });
  };

  const handleAdditionalCommentChange = (value) => {
    setAdditionalComment(value);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const confirmSubmit = () => {
    if (additionalComment.trim().length < 50) {
      setShowErrorMessage(true);
      return;
    }
    
    setShowErrorMessage(false);

    const criteriaData = criteria.map((criterion, index) => ({
      id_person: user.sub,
      id_criteria: criterion.id,
      grade: selectedCriteria[index],
      id_project: projectId,
      Comentario: comments[index]
    }));

    const totalScore = selectedCriteria.reduce((acc, value) => acc + value, 0);

    // Mostrar confirmación al usuario
    const confirmMessage = `¿Estás seguro de que deseas enviar tu rúbrica?     \n¡ESTA ACCION NO SE PUEDE DESHACER!     \nPUNTAJE TOTAL: ${totalScore / criteria.length}/5     \nCOMENTARIO ADICIONAL: ${additionalComment} (AVISO: Tras darle a Aceptar puede tardar unos segundos, sea paciente)`;

    setContent(confirmMessage);
    setShowModal(true);
  }

  const handleSubmit = async () => {
    if (additionalComment.trim().length < 50) {
      setShowErrorMessage(true);
      return;
    }

    setShowErrorMessage(false);
    const criteriaData = criteria.map((criterion, index) => ({
      id_person: user.sub,
      id_criteria: criterion.id,
      grade: selectedCriteria[index],
      id_project: projectId,
      Comentario: comments[index]
    }));

    //const totalScore = selectedCriteria.reduce((acc, value) => acc + value, 0);

    // Mostrar confirmación al usuario
    //const confirmMessage = `¿Estás seguro de que deseas enviar tu rúbrica?\nESTA ACCION NO SE PUEDE DESHACER\nPuntaje Total: ${totalScore / criteria.length}/5\nComentario adicional: ${additionalComment}`;
    //if (window.confirm(confirmMessage)) {
      try {
        // Enviamos los datos de la rúbrica
        for (const criterionData of criteriaData) {
          const response = await fetch('https://140.84.165.119/api/Juez/createCriteriaJudge', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(criterionData)
          });
          if (!response.ok) {
            throw new Error('Error al enviar la rúbrica');
          }
        }

        // Enviamos el comentario adicional
        const responseComment = await fetch('https://140.84.165.119/api/Juez/createComment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id_person: user.sub,
            id_project: projectId,
            comment: additionalComment
          })
        });
        if (!responseComment.ok) {
          throw new Error('Error al enviar el comentario adicional');
        }

        // Redirigimos al usuario después de enviar la rúbrica y el comentario adicional
        //window.location.href = `/Juez`;

        // Actualizamos la calificación final del proyecto
        const responseUpdateFinalGrade = await fetch(`https://140.84.165.119/api/projects/projects/update-final-grade/${projectId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!responseUpdateFinalGrade.ok) {
          throw new Error('Error al actualizar la calificación final del proyecto');
        }

        setShowModal(false);
        handleSucces();
        

      } catch (error) {
        console.error('Error al enviar la rúbrica:', error);
        //alert('Hubo un problema al enviar la rúbrica. Por favor, inténtalo de nuevo.');
        setErrorContent('Error al enviar la rúbrica', error.error);
        setType(true)
        setShowErrorModal(true);
      }
    //}
  };

  return (
    <>
      <ToggleBar />
      <div className="container">
        {loading ? (
          <div style={{display:"flex",justifyContent:"center"}}>
            <Loader />  
          </div>
        ) : (
          <>
            <h1>CALIFICA EL PROYECTO EN BASE A LA RÚBRICA</h1>
            <div className="rubrica-container">
              {criteria.map((criterion, index) => (
                <div className="criterion" key={index}>
                  <h3>{criterion.description}</h3>
                  <p className='rubro'>Calificación: {selectedCriteria[index]}</p>

                  <div className="PB-range-slider-div">
                    <p className='rubro'>0 (Deficiente)</p>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="1"
                      value={selectedCriteria[index]}
                      onChange={(e) => handleSliderChange(index, parseInt(e.target.value))}
                      id={`myRange${index}`}
                    />
                    <p className='rubro'>5 (Excelente)</p>
                  </div>
                  <textarea
                    placeholder={`Comentarios adicionales sobre ${criterion.description}`}
                    className="comment-box"
                    value={comments[index]}
                    onChange={(e) => handleCommentChange(index, e.target.value)}
                  />
                </div>
              ))}
              <textarea
                placeholder="Comentario adicional sobre el proyecto (mínimo 50 caracteres)"
                className="comment-box"
                value={additionalComment}
                onChange={(e) => handleAdditionalCommentChange(e.target.value)}
              />
              {showErrorMessage && additionalComment.trim().length < 50 && <p className="error-message">Por favor, ingresa un comentario adicional con al menos 50 caracteres.</p>}
              
              <div className="buttons-container2">
                <Link to={`/Juez`} className="btn2">Cancelar</Link>
                <button onClick={confirmSubmit} className="btn3">Enviar</button>
                {showModal && (
                <AdminDeleteUserPopUp 
                    content={content} 
                    onClose={closeModal} 
                    onConfirm={handleSubmit} 
                />
                )}
                {showErrorModal && <Popup content={errorContent} onClose={()=>setShowErrorModal(false)} error={type} ruta={'/Juez'}/>}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Rubrica;
