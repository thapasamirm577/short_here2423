import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deletingLink } from '../../reducer/linkAction';
import CopyToClipboard from 'react-copy-to-clipboard';

import classes from './mylink.module.css';

const IndvLink = ({ item }) => {

    const dispatch = useDispatch();

    const [copied,setCopy] = useState(false);
    //copied false
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setCopy(false);
        },2000);

        return ()=>{ clearTimeout(timer)}
    },[copied])

    //deleting
    const handleDelete=(id)=>{
        dispatch(deletingLink(id));
    }

    return (
        <section className={classes.container_mylink} key={item._id}>
            <main>
                <div className={classes.created_date_link}><i>Create on {new Date(item?.createdAt).toLocaleDateString()}</i></div>
                <div className={classes.original_link_show}>
                    <span>
                        <a href={item?.originalLink}>
                        {item?.originalLink}
                        </a>
                    </span>
                </div>
                <div className={classes.short_link_show}>
                    <span>
                    {window.location.origin}/{item?.shortLink}
                    </span>
                </div>
                <div className={classes.link_show_btn}>
                    <CopyToClipboard text={`${window.location.origin}/${item?.shortLink}`} onCopy={(e)=>setCopy(true)} >
                        <button style={{ color:"white", backgroundColor: "green"}}> { copied ? "Copied": "click to copy"}</button> 
                    </CopyToClipboard>
                    <button onClick={()=>handleDelete(item._id)} style={{ color:"white", backgroundColor: "red"}}>Delete</button>
                </div>
            </main>
        </section>
    )
}

export default IndvLink