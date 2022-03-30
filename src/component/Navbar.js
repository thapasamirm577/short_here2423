import React from 'react'
import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav>
        <div className={classes.logo_nav}>
            <header>
                <span style={{
                    color: "black"
                }}>&#128279;</span> &nbsp;Short Link
            </header>
        </div>
        <div className={classes.nav_auth_btn} >
            <div>
                <button>
                    Register
                </button>
            </div>
            <div>
                <button>
                    Log in
                </button>
            </div>
        </div>
    </nav>
  )
}

export default Navbar