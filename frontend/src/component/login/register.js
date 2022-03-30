import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { registerUser } from '../../reducer/action';

import Layout from '../layout';
import classes from './login.module.css';
import { validator } from './validator';

const Register = () => {

  const dispatch = useDispatch();
  const message = useSelector(state=>state.authUser.message);
  const error = useSelector(state=>state.authUser.error);

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [cpassword,setCpassword] = useState("");

  const [info,setInfo] = useState({
    name:false,
    email:false,
    password:null,
    cpassword:false,
    cpasswordV:null
  })

  //email validation
  const emailKeyHandle = (e)=>{
    const novalidate = validator(e.target.name,e.target.value);
    if(novalidate){
      setInfo(prevState=>{
        return { ...prevState, email: true}
      })
      return;
    }
    setInfo(prevState=>{
      return { ...prevState, email: false}
    })
  }
  
  //name validation
  const nameKeyHandle = (e)=>{
    const novalidate = validator(e.target.name,e.target.value);
    if(novalidate){
      setInfo(prevState=>{
        return { ...prevState, name: true}
      })
      return;
    }
    setInfo(prevState=>{
      return { ...prevState, name: false}
    })
  }

  //password validation
  const passwordKeyHandle = (e)=>{
    const novalidate = validator(e.target.name,e.target.value);
    if(novalidate){
      setInfo(prevState=>{
        return { ...prevState, password: novalidate}
      })
      return;
    }
    setInfo(prevState=>{
      return { ...prevState, password: null}
    })
  }

  //confirm password
  const cpasswordKeyHandle = (e)=>{
    if(password !== e.target.value){
      console.log(password);
      setInfo(prevState=>{
          return { ...prevState, cpassword: true}
        }
      )
      return;
    }
    setInfo(prevState=>{
      return { ...prevState, cpassword: false, cpasswordV: "Passoword match"}
    })
  }

  //submit form handler
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(name===null||email===null||password===null||cpassword===null){
      alert("input must be filled up");
      return;
    }
    if(password !== cpassword){
      alert("password must match");
      return;
    }
    dispatch(registerUser({ name, email, password, cpassword}));
    
  }

  return (
    <Layout>
      <header className={classes.login_header}>Registration</header>
      { message && <div className={classes.register_message}>{message}</div>}
      { error && <div className={classes.register_message}>{error}</div>}
      <form className={classes.form_container} autoComplete="off" onSubmit={handleSubmit}>
        <div className={classes.form_child_container}>
          <div className={classes.indv_input_container}>
            <div>
              <label htmlFor='name'>Name</label>
            </div>
            <div>
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder='Enter your name' 
                value={name}
                onKeyUp={nameKeyHandle}
                onChange={(e)=>setName(e.target.value)}
              />
            </div>
            { info.name && <span className={classes.validate_text}>Please enter valid name</span> }
          </div>
          <div className={classes.indv_input_container}>
            <div className={classes.label_container}>
              <label htmlFor='email'>Email</label>
            </div>
            <div className={classes.input_container}>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder='Enter your email' 
                value={email}
                onKeyUp={emailKeyHandle}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            {info.email && <span className={classes.validate_text}>Please enter valid email</span>}
          </div>
  
          <div className={classes.indv_input_container}>
            <div>
              <label htmlFor='password'>Password</label>
            </div>
            <div>
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder='Password' 
                value={password}
                onKeyUp={passwordKeyHandle}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            { info.password && <span className={classes.validate_text}>
              {info.password}
            </span>}
          </div>

          <div className={classes.indv_input_container}>
            <div>
              <label htmlFor='cpassword'>Confirm Password</label>
            </div>
            <div>
              <input 
                type="password" 
                id="cpassword" 
                name="cpassword" 
                placeholder='Confirm password' 
                value={cpassword}
                onKeyUp={cpasswordKeyHandle}
                onChange={(e)=>setCpassword(e.target.value)}
              />
            </div>
            { info.cpassword && <span className={classes.validate_text}>Password should match</span>}
            { !info.cpassword && info.cpasswordV && <span className={classes.validate_textC}>Password matched</span>}
          </div>
  
          <div className={classes.indv_input_container}>
              <button>Register</button>
          </div>
        </div>
      </form>
      <div className={classes.dont_have}>
        <p>Have an account? &nbsp;
          <Link to="/login">
            <button>Log in</button>
          </Link>         
        </p>
      </div>
    </Layout>
  )
}

export default Register