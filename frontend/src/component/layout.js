import React, { Fragment } from 'react';

import classes from './layout.module.css';

const Layout = (props) => {
    return (
        <Fragment>
            <main className={classes.body_container}>
                {props.children}
            </main>
        </Fragment>
    )
}

export default Layout