import React, { useContext } from 'react'
import { contextNavigate } from '../Context/ContextProvider';
import apiURL from "../config";
import "./FoodCart.css";

const FoodCart = () => {
    const api=apiURL.url;
    const {userData}=useContext(contextNavigate);

    const deleteFood = async (addFoodCartId, index) => {
        const token = await localStorage.getItem("userDataToken");
    
        const data = await fetch(`${api}/deleteFoodCart`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ addFoodCartId }),
        });
    
        const res = await data.json();
        // console.log(res);
    
        if (res.status === 203) {
          console.log(res);
        } else {
          alert("You are not authorized to perform this action!");
        }
      };

    const buyFood = async (addFoodCartId, index) => {
        const name = prompt("Enter your name");
        const mobile = prompt("Enter your mobile no.");
        const address = prompt("Enter your address");
    
        const token = await localStorage.getItem("userDataToken");
        const data = await fetch(`${api}/buyFood`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: token },
          body: JSON.stringify({addFoodCartId, name, mobile, address }),
        });
    
        const res = await data.json();
        // console.log(res);

        if(res.status === 209){
            console.log(res);
        }
    };


    const deleteFoodOder = async (buyFoodId, index) => {
    const token = await localStorage.getItem("userDataToken");

    const data = await fetch(`${api}/deleteFoodOder`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ buyFoodId }),
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
          <div className="showFood">
            {userData
              ? userData.getData.addFoodCart.map((addFoodCart, index) => (
                  <div key={index} className="show-data">
                    {index > 0 && <br />}
                    <div className="oneContainer">
                      <img src={addFoodCart.fimg} alt="img" />
                      <h3>{addFoodCart.fname}</h3>
                      <h4>{addFoodCart.fprice} Rs</h4>
                      <p>{addFoodCart.description}</p>
                      <div className="twopoint">
                          <div className="deletefood">
                             <i
                                onClick={() => deleteFood(addFoodCart._id, index)}
                                 class="fa-solid fa-trash"
                              ></i>
                          </div>
                          <div className="deletefood">
                              <i  onClick={()=>buyFood(addFoodCart._id, index)} class="fa-solid fa-bag-shopping"></i>
                          </div>
                      </div>
                    </div>
                  </div>
                ))
              : ""}
          </div>
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
                      <div className="deleteButton">
                        <i onClick={()=>deleteFoodOder(buyFood._id, index)} class="fa-solid fa-trash"></i>
                      </div>
                    </div>
                  ))
                : ''}

          </div>
          </div>
          <div className="orderContainer">
            <h1>Your Delivery Boy List</h1>
            <div className="oderShow">
            {userData
                ? userData.getData.responseOrder.map((responseOrder, index)=> (
                    <div key={index} className="showBuy">
                      {/* Displaying properties from buyFood array */}
                      {/* <img src={buyFood.fimg} alt="img" /> */}
                      {/* <h3>{buyFood.fname}</h3> */}
                      <p>{responseOrder.deliveryName}</p>
                      <p>{responseOrder.deliveriMobile}</p>
                      <p>{responseOrder.deliveryEmail}</p>
                      <p>{responseOrder.deliveryTime}H</p>
                      {/* <div className="deleteButton">
                        <i onClick={()=>deleteFoodOder(buyFood._id, index)} class="fa-solid fa-trash"></i>
                      </div> */}
                    </div>
                  ))
                : ''}

          </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FoodCart