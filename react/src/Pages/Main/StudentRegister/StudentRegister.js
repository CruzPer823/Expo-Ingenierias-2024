import { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { Link } from 'react-router-dom';

import Row from 'react-bootstrap/Row';

import './StudentRegister.css';


export default function FormStudent() {
    const [validated, setValidated] = useState(false);
    
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }
    
        setValidated(true);
    };
    
    return (

        <>
            <div className='container-fluid ContainersForm'>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="validationTitle" >
                        <Form.Label className='Titulo'>Nombre</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Ingresa tu(s) nombre(s) "
                            className='InputFormat'
                        />
                        </Form.Group>            
                    </Row>

                    <Row>
                        <Form.Group as={Col} md="12" controlId="validationTitle" >
                            <Form.Label className='Titulo'>Apellidos</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Ingresa tus apellidos"
                                className='InputFormat'
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3  ">
                        <Form.Group as={Col} md="12" controlId="validationMembers">
                        <Form.Label className='Titulo'>Matricula</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="A01XXXXXX"
                            maxLength={9}
                            className='InputFormat'
                        />

                        </Form.Group>

                    </Row>

                    <Row>
                        <Form.Group as={Col} md="12" controlId="validationCustom04">
                            <Form.Label className='Titulo'>Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Crea una contraseña para tu cuenta" required className='InputFormat' />
                        </Form.Group>
                    </Row>

                    <center><Link to={'/projregister'} type="submit" className='mt-4 btn-lg ButtonRegister'>Registrar estudiante</Link></center>
                </Form>

                <div className='container-fluid mb-4'>
                    <div className='row'>
                        <div className='col'>
                            <Link to={'/extramaterial'} className='bi bi-arrow-left-circle IconBack'> Regresar</Link>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
    

