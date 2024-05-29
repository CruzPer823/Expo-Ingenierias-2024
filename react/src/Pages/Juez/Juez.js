import React, { useState } from 'react';
import { data } from '../../Components/data.js';
import NavigationBar from '../../Components/NavigationBar/Judge/NavigationBar';
import {Cardlist} from '../../Components/CardJuez/CardJuez.js';

function PageJuez() {
  const [filterText, setFilterText] = useState("");

  function handleChange(e) {
    setFilterText(e.target.value);
  };

  const filteredData = data.filter(post =>
    post.title.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <>
    <NavigationBar NameSection={"Proyectos"}/>
      <div className="container-fluid">
        <div className="centered-content">
          <input placeholder="Buscar proyecto por nombre" type="text" name="text" class="input" value={filterText} onChange={handleChange}></input>
        </div>
        <div className="proyectos">
          <Cardlist posts={filteredData} />
        </div>
      </div>
    </>
  );
}

export default PageJuez;
