import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../reducer/action';
import { authActions } from '../../reducer/authReducer';
import Layout from '../layout'
import classes from './login.module.css';

const Login = () => {

  const dispatch = useDispatch();
  const message = useSelector(state=>state.authUser.message);
  const error = useSelector(state=>state.authUser.error);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(email===null || password === null){
      alert("Input must be filled up");
      return;
    }

    dispatch(loginUser({ email, password }));
   
  }
  useEffect(()=>{
    if(message){
      const timer = setTimeout(()=>{
        dispatch(authActions.removeMessage())
        navigate('/')
      },2000)
  
      return ()=>{ clearTimeout(timer)}
    }
    if(error){
      const timer = setTimeout(()=>{
        dispatch(authActions.removeError())
      },2000)
  
      return ()=>{ clearTimeout(timer)}
    }
  },[message,error])

  return (
    <Layout>
      <header className={classes.login_header}>Log in</header>
      { message && <div className={classes.register_message}>{message}</div>}
      { error && <div className={classes.register_message}>{error}</div>}
      <form className={classes.form_container} onSubmit={handleSubmit}>
        <div className={classes.form_child_container}>
          <div className={classes.indv_input_container}>
            <div className={classes.label_container}>
              <label htmlFor='email'>Email</label>
            </div>
            <div className={classes.input_container}>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder='Email' 
                value={email}
                onChange={(e)=>setEmail(()=>e.target.value)}
              />
            </div>
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
                onChange={(e)=>setPassword(()=>e.target.value)}
              />
            </div>
          </div>
  
          <div className={classes.indv_input_container}>
            <button>Log in</button>
          </div>
        </div>
      </form>

      <div className={classes.dont_have}>
        <p>Don't have an account? &nbsp;
          <Link to="/register">
            <button>Register</button>
          </Link>
          
        </p>
      </div>
    </Layout>
  )
}

export default Login