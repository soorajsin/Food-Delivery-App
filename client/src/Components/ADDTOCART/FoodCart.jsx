import React, { useContext } from 'react'
import { contextNavigate } from '../Context/ContextProvider';
import apiURL from "../config";

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
        console.log(res);
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
        </div>
      </div>
    </>
  )
}

export default FoodCart