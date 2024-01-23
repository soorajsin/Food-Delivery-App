import React from 'react'
import { AppBar, Toolbar } from "@mui/material";
import { NavLink } from 'react-router-dom';
import "./Nav.css";

const Nav = () => {
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