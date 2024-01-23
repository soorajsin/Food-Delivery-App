import React, { useContext} from 'react'
import "./Homepage.css";
import apiURL from "../config";
import { contextNavigate } from '../Context/ContextProvider';

const Homepage = () => {
    const api=apiURL.url;
    const {userData}=useContext(contextNavigate);

    const addCartFood=async(addFoodId, index)=>{
        const token=await localStorage.getItem("userDataToken");

        const data=await fetch(`${api}/addToCart`, {
            method:"POST",
            headers:{"Content-Type":"application/json",
            "Authorization":token},
            body:JSON.stringify({addFoodId})
        })

        const res=await data.json();
        console.log(res);
    }
  return (
    <div className="staff">
        <div className="staffContainer">
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
                        <button onClick={()=>addCartFood(addFood._id, index)}>ADD To Cart</button>
                      </div>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
  )
}

export default Homepage