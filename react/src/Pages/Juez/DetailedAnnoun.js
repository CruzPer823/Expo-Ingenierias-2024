import "./DetailedAnnoun.css";
import { Link, useParams } from 'react-router-dom';
import NavigationBar from '../../Components/NavigationBar/Judge/NavigationBar';
import Placeholder from 'react-bootstrap/Placeholder';
import { useState, useEffect } from "react";

function AnnounTitle({ TituloDetailed, Fecha, isLoaded }) {
    return (
      <>
        {isLoaded ? (
          <>
            <div className="col-10 p-3">
              <i className="bi bi-envelope-fill AnnounIcon"></i>
              <span className="TituloAnnoun">{TituloDetailed}</span>
            </div>
            <div className="col-2">
              <div className="container-fluid">
                <div className="row SubjectCont p-4">
                  <div className="col-2">
                    <span className="Subtitulo text-wrap">Fecha: </span>
                  </div>
                  <div>
                    <span className="text-wrap">{Fecha && Fecha.substring(0, 10)}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="col-10 p-3 d-flex align-items-center">
              <i className="bi bi-envelope-fill AnnounIcon"></i>
              <Placeholder animation="glow" className="w-75">
                <Placeholder xs={12} bg="primary" className="ms-4" size="lg" />
              </Placeholder>
            </div>
            <div className="col-2">
              <div className="container-fluid">
                <div className="row SubjectCont p-4">
                  <div className="col-2">
                    <span className="Subtitulo text-wrap">Fecha: </span>
                  </div>
                  <div>
                    <Placeholder animation="glow" className="w-100">
                      <Placeholder xs={10} bg="dark" size="lg" />
                    </Placeholder>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }

function AnnounBody({ Contenido, isLoaded }) {
    return (
      <>
        {isLoaded ? (
          <div className="container-fluid">
            <div className="row">
              <div className="col p-3">
                <span className="texto">{Contenido}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="container-fluid">
            <div className="row">
              <div className="col p-3">
                <Placeholder animation="glow" className="w-75">
                  {Array.from({ length: 7 }).map((_, index) => (
                    <Placeholder key={index} xs={12} bg="secondary" size="xs" />
                  ))}
                </Placeholder>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

export default function DetailedAnnounCont() {
    const { idpersona, anuncioId } = useParams();
    const [announDet, setAnnounDet] = useState({
        id:0,
      title: "",
      description: "",
      createdAt: ""
    });
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      fetch(`http://localhost:8000/Juez/getAnnoun/${anuncioId}`)
        .then((res) => res.json())
        .then((data) => {
          setAnnounDet(data);
          setIsLoading(false); // Datos obtenidos, desactivar estado de carga
        });
    }, [idpersona, anuncioId]);
  
    return (
      <>
        <NavigationBar NameSection={"Anuncios"}></NavigationBar>
        <div className="container-fluid mt-3 p-3">
          <div className="row p-3 ContainerAnnoun d-flex align-items-center">
            <AnnounTitle TituloDetailed={announDet.title} Fecha={announDet.createdAt} isLoaded={!isLoading}></AnnounTitle>
          </div>
          <div className="row mt-4 p-3 ContainerAnnoun d-flex align-items-center">
            <AnnounBody Contenido={announDet.description} isLoaded={!isLoading}></AnnounBody>
          </div>
          <Link to={`/Juez/Anuncios/${idpersona}`} className="row mt-4 p-3 ContainerAnnounBut ButtReturn d-flex justify-items-center">
            <Link to={`/Juez/Anuncios/${idpersona}`} className="text-center ButtReturn">Regresar a anuncios</Link>
          </Link>
        </div>
      </>
    );
  }