import React from "react";
import { AiOutlineClose } from "react-icons/ai";

function Popup({content}){
    return(
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-s'>
        <div>
        <button className="close-button"><AiOutlineClose/></button>
            <p className="popUpContent">
                {content}
            </p>
        </div>
    </div>
    );
}

export default Popup;