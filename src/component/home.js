import React, { useEffect, useState } from 'react'
import Layout from './layout'

import classes from './home.module.css';
import axios from 'axios';
import CopyToClipboard from 'react-copy-to-clipboard';
import Navbar from './Navbar';

const Home = () => {
    
    const [url,setUrl] = useState("");
    const [shortUrl,setShortUrl] = useState("");
    const [fetch,setFetch] = useState(false);
    const [copied,setCopy] = useState(false);
    const [loading,setLoading] = useState(false);

    const fetching = async()=>{
        try {
            setLoading(true);
            const res = await axios(`https://api.shrtco.de/v2/shorten?url=${url}`);
            if(res.data.result){
                setShortUrl(res.data.result.full_short_link2);
            }
            setLoading(false);
        } catch (error) {
            //console.log(error);
        }
    }

    useEffect(()=>{
        if(url !== undefined && url.length){
            fetching();
        }

    },[fetch])

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setCopy(false);
        },2000)

        return ()=>{ clearTimeout(timer)}
    })

    const handleChange = (e)=>{
        setUrl(()=> e.target.value);
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        setFetch(!fetch);
    }
    return (
        <>
        
        <Navbar />
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
                    <p className={classes.shortlink_here}>{shortUrl}</p>
                    <CopyToClipboard text={shortUrl} onCopy={(e)=>setCopy(true)} >
                        <button> { copied ? "Copied": "click to copy"}</button>
                    </CopyToClipboard>
                    
                </div>
            </section>
        </Layout> }
        
        </>
    )
}

export default Home