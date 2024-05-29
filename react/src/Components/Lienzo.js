import ProfPict from '../img/descargar.jpeg'
import logo from '../img/logo.svg';

export default function Lienzo() {
    return (
      <>
        <div className ="container-fluid">
            <div className="row" id = "NavBar">
              <div className="col-10">
                <div className = "ToggleButton">
  
                </div>
              </div>
  
              <div className="col-2">
                <div className = "ToggleButton">
                  <div className="ProfPictFrame">
                    
                  </div>
                </div>
              </div>          
            </div>
          </div>
  
  
        <nav className='fixed-top'>
          <div className ="container-fluid">
            <div className="row" id = "NavBar">
              <div className="col-10">
                <div className = "ToggleButton">
                  <img className="ExpoIngLog" src ={logo} alt="buenas"></img>
                  <span className="textm"><strong>Registro de Proyecto</strong></span>
                </div>
              </div>
  
              <div className="col-2">
                <div className = "ToggleButton">
                  <div className="ProfPictFrame">
                    <img src = {ProfPict} alt=""></img>
                  </div>
                </div>
              </div>          
            </div>
          </div>
        </nav>
        
      
      </>
  
    );
  }