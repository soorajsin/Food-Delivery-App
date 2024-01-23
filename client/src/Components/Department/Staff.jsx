import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./Staff.css";

const Staff = () => {

  const history=useNavigate();
  const moveToFood=async()=>{
    history("/add");
  }

  return (
    <>
      <div className="staff">
        <div className="staffContainer">
          <div className="add">
            <button onClick={moveToFood}>ADD</button>
          </div>
          <div className="showFood">

          </div>
        </div>
      </div>
    </>
  )
}

export default Staff