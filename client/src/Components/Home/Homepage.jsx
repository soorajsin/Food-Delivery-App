import React, { useContext, useEffect } from 'react'
import "./Homepage.css";
import apiURL from "../config";
import { contextNavigate } from '../Context/ContextProvider';

const Homepage = () => {
    const {userData}=useContext(contextNavigate);
//     const api=apiURL.url;
//     const fetchdata = async () => {
//   try {
//     const response = await fetch(`${api}/allFood`);
//     const data = await response.json();
//     console.log("kdsjjjjjjjjjjjjj" + data);
//     // setAddFoodData(data.allFood);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };


//     useEffect(()=>{
//         fetchdata();
//     })
  return (
    <div className="home">
        <div className="homeContainer">
            <div className="show">
                {userData?userData.getData.addFood.map((addFood, index)=>{
                    <div key={index} className="show-data">
                        
                    </div>
                }):""}
            </div>
        </div>
    </div>
  )
}

export default Homepage