import React, { useContext } from 'react'
import { contextNavigate } from '../Context/ContextProvider'
import "./FoodTrack.css";
import apiURL from "../config";

const FoodTrack = () => {
    const api=apiURL.url;
    const {userData}=useContext(contextNavigate);

    const responseOrder=async(buyFoodId, index)=>{
        const deliveryName=prompt("Enter Delivery Boy Nmae");
        const deliveriMobile=prompt("Enter Delivery Boy Mobile No.");
        const deliveryEmail=prompt("Enter Delivery Boy Email");
        const deliveryTime=prompt("Enter Delivery Ending Time");

        const token=await localStorage.getItem("userDataToken");
        const data=await fetch(`${api}/responseOrder`, {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                Authorization: token,
            },
            body:JSON.stringify({deliveryName, deliveriMobile, deliveryEmail, deliveryTime})
        })

        const res=await data.json();
        console.log(res);
    }
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
                      <div className="resOder">
                        <button onClick={()=> responseOrder(buyFood._id, index)}>Response</button>
                      </div>
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