import React, { useContext, useEffect } from 'react'
import { AppBar, Toolbar } from "@mui/material";
import { NavLink } from 'react-router-dom';
import "./Nav.css";
import apiURL from "../config";
import { contextNavigate } from '../Context/ContextProvider';

const Nav = () => {
    const {userData, setUserData}=useContext(contextNavigate);
    const api=apiURL.url;
    const navAuth=async()=>{
        const token=await localStorage.getItem("userDataToken");
        // console.log(token);

        const data = await fetch(`${api}/validator`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
        });

        const res=await data.json();
        // console.log(res);


        if (res.status === 202) {
            console.log(res);
            setUserData(res);
          } else {
            console.log("failed auth");
            // history("/");
          }
    }

    useEffect(()=>{
        navAuth();
    })


  return (
    <>
    <AppBar>
        <Toolbar>
            <div className="nav">
                <div className="navContainer">
                    <div className="tab">
                    <NavLink className={"tabNavLink"}>
                        <img
                            src="https://shopping-app-xx1p.vercel.app/static/media/Sooraj-logo.4ea9ba32a0c93354b8a8.png"
                             alt="logo"
                        />{" "}
                    </NavLink>

                    </div>
                    <div className="tab">
                         <NavLink to={"/home"} className={"tabNavLink"}>
                            Home
                         </NavLink>
                    </div>
                    <div className="tab">
                        <NavLink to={"/staff"} className={"tabNavLink"}>
                            Staff
                        </NavLink>
                    </div>
                    <div className="tab">
                        <NavLink to={"/"} className={"tabNavLink"}>
                            Login
                        </NavLink>
                    </div>
                    <div className="tab">
                        Avatar
                    </div>
                </div>
            </div>
        </Toolbar>
    </AppBar>
    </>
  )
}

export default Nav