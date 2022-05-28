import React, { useEffect, useState } from 'react'
import Layout from './layout'
import { useDispatch, useSelector } from 'react-redux';
import { creatingLink, creatingNoAuthLink } from '../reducer/linkAction';
import classes from './home.module.css';
import CopyToClipboard from 'react-copy-to-clipboard';

const Home = () => {
    
    const dispatch = useDispatch();
    const data = useSelector(state=>state.link.data);
    const authData = useSelector(state=>state.authUser.data)
    const [url,setUrl] = useState("");
    const [shortUrl,setShortUrl] = useState("");
    const [copied,setCopy] = useState(false);
    const [loading,setLoading] = useState(false);

    console.log(window.location.origin);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setCopy(false);
        },2000)

        return ()=>{ clearTimeout(timer)}
    },[copied])

    const handleChange = (e)=>{
        setUrl(()=> e.target.value);
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        // setFetch(!fetch);
        if(url){
            setLoading(true);
            const localToken = localStorage.getItem("shortToken");
            
            if(localToken || authData[0]?._id){
                dispatch(creatingLink({ originalLink: url }))
            }else{
               dispatch(creatingNoAuthLink({ originalLink: url}))
            }
        }
        setLoading(false);
    }
        
    useEffect(()=>{
        if(data){
            setShortUrl(data.shortLink);
        }else{
            setShortUrl("");
        }
    },[data])

    // console.log(authData);
    // console.log(data)
    return (
        <>
        
        <Layout>
            <header className={classes.form_url_header}>
                Create your Short Link
            </header>
            <form className={classes.form_url} onSubmit={handleSubmit}>
                <div>
                    <div className={classes.input_container}>
                        <input 
                            type="text" 
                            id='urlText' 
                            name='urlText' 
                            placeholder='Paste your link' 
                            value={url} 
                            onChange={handleChange}
                        /> 
                    </div>
                    <div className={classes.btn_container}>
                        <button>{ loading ? "Loading...":"Submit"}</button>
                    </div>
                </div>
            </form>

        </Layout>

        { shortUrl && <Layout>
            <section className={classes.display_link_container}>
                <div> 
                    <header style={
                        {
                            textAlign:"center",
                            fontSize:"20px",
                            marginBottom:"10px"
                        }
                    }>Your short link</header>
                    <input type={'text'} className={classes.shortlink_here} value={`https://short577.herokuapp.com/${shortUrl}`} onChange={()=>{}} />
                    <CopyToClipboard text={`${window.location.origin}/${shortUrl}`} onCopy={(e)=>setCopy(true)} >
                        <button> { copied ? "Copied": "click to copy"}</button>
                    </CopyToClipboard>
                    
                </div>
            </section>
        </Layout> }
        
        </>
    )
}

export default Home