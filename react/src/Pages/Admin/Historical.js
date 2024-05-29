import React, { useState } from 'react';
import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar'
import DropdownMenu from '../../Components/DropdownMenu/DropdownMenu';
import ContentCard from '../../Components/ContentCard/ContentCard';

const URI='http://localhost:8000/Ediciones/'

function Historical() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleExport = async() => {
    setButtonClicked(true);
    if (!selectedOption) {
      alert("Debes seleccionar una opción antes de exportar.");
    } else {
      const response = await fetch(`${URI}/export/${selectedOption}`);
      const blob =await response.blob();
      const url=window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href=url;
      a.download='Historico.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };

  return (
    <>
    <NavigationBar NameSection={"Histórico"}/>
      <div className="container">
        <div className="row justify-content-center mt-3">
          <div className="col-md-12">
            <ContentCard title="Exportar Histórico" subtitle="Selecciona Edición" content={
              <>
                <DropdownMenu title="Selecciona la Edición" url={URI} onSelect={handleOptionSelect}/>
                {buttonClicked && !selectedOption && <p className="text-danger" style={{marginTop:"4vh"}}>Debes seleccionar una opción.</p>}
              </>
            } />
            <div className="d-flex justify-content-center mt-3">
              <button className="btn btn-primary custom-primaty-btn" onClick={handleExport}>Exportar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Historical;
