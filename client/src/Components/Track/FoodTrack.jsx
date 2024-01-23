import React, { useContext } from 'react'
import { contextNavigate } from '../Context/ContextProvider'
import "./FoodTrack.css";

const FoodTrack = () => {
    const {userData}=useContext(contextNavigate);
  return (
    <>
       <div className="track">
       <div className="orderContainer">
            <h1>Your Order List</h1>
            <div className="oderShow">
            {userData && userData.getData.addFoodCart
                ? userData.getData.buyFood.map((buyFood, index)=> (
                    <div key={index} className="showBuy">
                      {/* Displaying properties from buyFood array */}
                      {/* <img src={buyFood.fimg} alt="img" /> */}
                      <h3>{buyFood.fname}</h3>
                      <p>{buyFood.name}</p>
                      <p>{buyFood.mobile}</p>
                      <p>{buyFood.address}</p>
                    </div>
                  ))
                : ''}

          </div>
          </div>
       </div>
    </>
  )
}

export default FoodTrack