import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Staff.css";
import apiURL from "../config";
import { contextNavigate } from '../Context/ContextProvider';

const Staff = () => {

  const api=apiURL.url;
  const {userData}=useContext(contextNavigate);
  const history=useNavigate();
  const moveToFood=async()=>{
    history("/add");
  }


  
  const deleteFood = async (addFoodId, index) => {
    const token = await localStorage.getItem("userDataToken");

    const data = await fetch(`${api}/deleteFood`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ addFoodId }),
    });

    const res = await data.json();
    // console.log(res);

    if (res.status === 203) {
      console.log(res);
    } else {
      alert("You are not authorized to perform this action!");
    }
  };


  return (
    <>
      <div className="staff">
        <div className="staffContainer">
          <div className="add">
            <button onClick={moveToFood}>ADD</button>
          </div>
          <div className="showFood">
            {userData
              ? userData.getData.addFood.map((addFood, index) => (
                  <div key={index} className="show-data">
                    {index > 0 && <br />}
                    <div className="oneContainer">
                      <img src={addFood.fimg} alt="img" />
                      <h3>{addFood.fname}</h3>
                      <h4>{addFood.fprice} Rs</h4>
                      <p>{addFood.description}</p>
                      <div className="twopoint">
                        <div className="deletefood">
                          <i
                            onClick={() => deleteFood(addFood._id, index)}
                            class="fa-solid fa-trash"
                          ></i>
                        </div>
                        <div className="updateFood">
                          <i
                            // onClick={() => updateFood(addFood._id, index)}
                            class="fa-solid fa-pen-to-square"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </>
  )
}

export default Staff