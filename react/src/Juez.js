
import './Page.css';
import './Resume.css'
import './ProjectResumenContent.js';
import './Juez.css';

import {data} from './components/data.js'
import {Lienzo} from './components/Lienzo.js';
import {Cardlist} from './components/CardJuez.js';

function PageJuez() {
  return (
    <>
      <Lienzo />
      <div className="container">
        <h1>MIS PROYECTOS</h1>
        <div className="proyectos">
          <Cardlist posts={data} />
        </div>
      </div>
    </>
  );
}

export default PageJuez;
