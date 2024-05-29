import Menu from '../../../Components/Menu/menu.js';

import './EdicionesPasadas.css';
import { Link } from 'react-router-dom';

import Prueba from "../../../img/CardConcept.png";

function ContenedorPasados({className, Titulo, Descripcion, Path, Dirección, FotoContenedor}){

    return(
        <>
            <div className='row PasadosContainer m-3'>

                {Dirección === "Derecha" && (
                    <>

                        <div className={"col" + className+ Dirección}>
                            <img src={FotoContenedor} alt="" className={'FotoContenedor'+Dirección}/>
                        </div>

                        <div className='col p-4 m-3'>
                            <h2 className='Titulo'>{Titulo}</h2>
                            <p className='mb-5'>{Descripcion}</p>
                            <center><Link to={Path} className='BotonVerMas'> Conoce más sobre este proyecto</Link></center>
                        </div>
                    
                    </>
                )}

                {Dirección === "Izquierda" && (
                    <>
                        <div className='col p-4 m-3'>
                            <h2 className='Titulo'>{Titulo}</h2>
                            <p className='mb-5'>{Descripcion}</p>
                            <center><Link to={Path} className='BotonVerMas'> Conoce más sobre este proyecto</Link></center>
                        </div>

                        <div className={"col" + className+ Dirección}>
                            <img src={FotoContenedor} alt="" className={'FotoContenedor'+Dirección}/>
                        </div>
                    
                    </>
                )}

            </div>
        </>
    );
}

export default function EdicionesPasadas(){
    return(
        <>
        <Menu />
        <div className='container-fluid p-4 mt-2'>
            <ContenedorPasados FotoContenedor={Prueba} Dirección={"Izquierda"} Path={'/resumen-proyecto-estudiante'} className={' BgPasados1'} Titulo={'Proyectos pasados'} Descripcion={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum elit libero, quis lobortis quam dignissim vel. Nullam quis est egestas, vestibulum magna ut, aliquam tortor. Fusce et feugiat sapien. Mauris vel lacinia sapien, vitae fringilla lectus. Nunc vulputate vulputate odio, in egestas sem rhoncus eget. Integer lobortis purus augue, vitae bibendum turpis aliquet finibus. Nulla vitae magna posuere, ornare dolor in, venenatis velit. Cras sit amet volutpat justo, quis tristique ipsum. Ut sit amet aliquam odio."}/>
            <ContenedorPasados FotoContenedor={Prueba} Dirección={"Derecha"} Path={'/resumen-proyecto-estudiante'} className={' BgPasados1'} Titulo={'Proyectos pasados'} Descripcion={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum elit libero, quis lobortis quam dignissim vel. Nullam quis est egestas, vestibulum magna ut, aliquam tortor. Fusce et feugiat sapien. Mauris vel lacinia sapien, vitae fringilla lectus. Nunc vulputate vulputate odio, in egestas sem rhoncus eget. Integer lobortis purus augue, vitae bibendum turpis aliquet finibus. Nulla vitae magna posuere, ornare dolor in, venenatis velit. Cras sit amet volutpat justo, quis tristique ipsum. Ut sit amet aliquam odio."}/>
            <ContenedorPasados FotoContenedor={Prueba} Dirección={"Izquierda"} Path={'/resumen-proyecto-estudiante'} className={' BgPasados1'} Titulo={'Proyectos pasados'} Descripcion={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum elit libero, quis lobortis quam dignissim vel. Nullam quis est egestas, vestibulum magna ut, aliquam tortor. Fusce et feugiat sapien. Mauris vel lacinia sapien, vitae fringilla lectus. Nunc vulputate vulputate odio, in egestas sem rhoncus eget. Integer lobortis purus augue, vitae bibendum turpis aliquet finibus. Nulla vitae magna posuere, ornare dolor in, venenatis velit. Cras sit amet volutpat justo, quis tristique ipsum. Ut sit amet aliquam odio."}/>
            <ContenedorPasados FotoContenedor={Prueba} Dirección={"Derecha"} Path={'/resumen-proyecto-estudiante'} className={' BgPasados1'} Titulo={'Proyectos pasados'} Descripcion={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum elit libero, quis lobortis quam dignissim vel. Nullam quis est egestas, vestibulum magna ut, aliquam tortor. Fusce et feugiat sapien. Mauris vel lacinia sapien, vitae fringilla lectus. Nunc vulputate vulputate odio, in egestas sem rhoncus eget. Integer lobortis purus augue, vitae bibendum turpis aliquet finibus. Nulla vitae magna posuere, ornare dolor in, venenatis velit. Cras sit amet volutpat justo, quis tristique ipsum. Ut sit amet aliquam odio."}/>
        </div>
        </>
    );
}