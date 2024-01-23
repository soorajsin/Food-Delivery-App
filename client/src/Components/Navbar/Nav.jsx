import React, { useContext, useEffect } from 'react'
import { AppBar, Toolbar, Avatar } from "@mui/material";
import { NavLink, useNavigate } from 'react-router-dom';
import "./Nav.css";
import apiURL from "../config";
import { contextNavigate } from '../Context/ContextProvider';

const Nav = () => {
    const history=useNavigate();
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


    const logOut = async () => {
    const token = await localStorage.getItem("userDataToken");

    const data = await fetch(`${api}/signOut`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const res = await data.json();
    // console.log(res);

    if (res.status === 208) {
      localStorage.removeItem("userDataToken");
      history("/");
      window.location.reload();
    } else {
      alert("Not Log Out");
    }
  };



  return (
    <>
    <AppBar>
        <Toolbar>
            <div className="nav">
                <div className="navContainer">
                    <div className="tab">
                    <NavLink to={"/home"} className={"tabNavLink"}>
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
                    {userData && userData.getData.role === "staff" && (
                     <>
                         <div className="tab">
                                <NavLink to={"/staff"} className={"tabNavLink"}>
                                   Management
                         </NavLink>
                    </div>
                    </>
                    )}
                    <div className="tab">
                        <NavLink to={"/"} className={"tabNavLink"}>
                            Login
                        </NavLink>
                    </div>
                    <div className="tab">
                         <NavLink to={"/addTocart"} className={"tabNavLink"}>
                            <i class="fa-solid fa-cart-shopping"></i>
                         </NavLink>
                    </div>
            
                     {userData && userData.getData.role === "staff" && (
                       <div className="tab">
                         <NavLink to={"/track"} className={"tabNavLink"}>
                             Track
                          </NavLink>
                        </div>
                     )}

                     <div className="tab">
                     <NavLink className={"tabNavLink"}>
                  <Avatar className="avatarIcon">
                    {userData
                      ? userData.getData.email.charAt(0).toUpperCase()
                      : ""}
                  </Avatar>
                  <div className="avatarManu">
                    <div className="avatarConainer">
                     <div className="avatarTab">
                        <NavLink  className={"avatarTabNav"}>
                          {userData?userData.getData.email:""}
                        </NavLink>
                      </div>
                      <div className="avatarTab">
                        <NavLink to={"/home"} className={"avatarTabNav"}>
                          Home
                        </NavLink>
                      </div>
                      <div className="avatarTab">
                        <NavLink to={"/addTocart"} className={"avatarTabNav"}>
                          Booked
                        </NavLink>
                      </div>
                      {userData && userData.getData.role === "staff" && (
                        <>
                          <div className="avatarTab">
                            <NavLink to={"/staff"} className={"avatarTabNav"}>
                              Management
                            </NavLink>
                          </div>
                          <div className="avatarTab">
                            <NavLink
                              to={"/track"}
                              className={"avatarTabNav"}
                            >
                             Track
                            </NavLink>
                          </div>
                        </>
                      )}
                      <div className="avatarTab">
                        <NavLink to={"/"} className={"avatarTabNav"}>
                          Login
                        </NavLink>
                      </div>
                      <div className="avatarTab" onClick={logOut}>
                        <NavLink className={"avatarTabNav"}>Log Out</NavLink>
                      </div>
                    </div>
                  </div>
                </NavLink>
                     </div>
              </div>
            </div>
        </Toolbar>
    </AppBar>
    </>
  )
}

export default Nav