import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import { deletingLink, displayingLink } from '../../reducer/linkAction';
import Layout from '../layout';
import classes from "./mylink.module.css";

const Mylink = () => {

    const dispatch = useDispatch();
    const [copied,setCopy] = useState(false);
    const data = useSelector(state=>state.link.data);
    const loading = useSelector(state=>state.link.loading);

    //copied false
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setCopy(false);
        },2000);

        return ()=>{ clearTimeout(timer)}
    },[copied])

    //fetching links
    useEffect(()=>{
        dispatch(displayingLink());
    },[])

    //deleting
    const handleDelete=(id)=>{
        dispatch(deletingLink(id));
    }

    //console.log(data);
    return (
        <Layout>
            <header className={classes.container_mylink_header}>
                My Link
            </header>
            { loading && <div className={classes.loading_mylink}>Loading</div>}
            { data.length && 
            data.map((item)=>{return (
            <section className={classes.container_mylink} key={item._id}>
                <main>
                    <div className={classes.created_date_link}><i>Create on {new Date(item.createdAt).toLocaleDateString()}</i></div>
                    <div className={classes.original_link_show}>
                        <span>
                            <a href={item.originalLink}>
                            {item.originalLink}
                            </a>
                        </span>
                    </div>
                    <div className={classes.short_link_show}>
                        <span>
                        {item.shortLink}
                        </span>
                    </div>
                    <div className={classes.link_show_btn}>
                        <CopyToClipboard text={item.shortLink} onCopy={(e)=>setCopy(true)} >
                            <button> { copied ? "Copied": "click to copy"}</button>
                        </CopyToClipboard>
                        <button onClick={()=>handleDelete(item._id)}>Delete</button>
                    </div>
                </main>
            </section> )})}
        </Layout>
    )
}

export default Mylink