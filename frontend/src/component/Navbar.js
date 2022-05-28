import React, {useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import classes from "./Navbar.module.css";
import {BsPersonCircle} from "react-icons/bs";


const Navbar = () => {

    const data = useSelector(state=>state.authUser.data);
    const token = localStorage.getItem("shortToken");
    const navigate = useNavigate();
    
    const [navtool,setNavtool] = useState(false);
    const [name,setName] = useState("");

    useEffect(()=>{
        const cname = localStorage.getItem("shortLinkname");
        if(data.length > 0 || data[0]?.name){
            //console.log(data);
            setName(data[0].name);
        }else{
            //console.log(cname)
            setName(cname)
        }
    },[data]);

    const handleLogOut=()=>{
        localStorage.removeItem("shortToken");
        localStorage.removeItem("shortLinkname");
        navigate("/");
        window.location.reload()
    }

    const handleLink=()=>{
        navigate("/user/mylink");
    }
    

  return (
    <nav>
        <div className={classes.logo_nav}>
            <header>
                <span style={{
                    color: "black"
                }}
                onClick={()=>{navigate("/")}}
                >&#128279;</span> &nbsp;Short Link
            </header>
        </div>
        <div className={classes.nav_auth_btn} >
            { !token && 
            <div>
                <Link to="/user/register">
                    <button>
                        Register
                    </button>
                </Link>
            </div> }
            { !token && 
            <div>
                <Link to="/user/login">
                    <button>
                        Log in
                    </button>
                </Link>
            </div>  }
            
            { token  &&
            <div className={classes.token_arrive}>
                <BsPersonCircle className={classes.avatar_nav} />
                <button className={classes.name_in_nav} onClick={()=>setNavtool(()=>!navtool)}>
                    &nbsp;{ name && name}
                </button>
                { navtool &&    
                <ul className={classes.nav_list}>
                    <li onClick={handleLink}>My links</li>
                    <li onClick={handleLogOut}>Log out</li>
                </ul> }
                
            </div> }
        </div>
    </nav>
  )
}

export default Navbar