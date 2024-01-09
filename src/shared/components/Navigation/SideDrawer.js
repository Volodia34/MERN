import React from 'react';

import './SideDrawer.css'
import {createPortal} from "react-dom";
import {CSSTransition} from "react-transition-group";

const SideDrawer = (props) => {

    const content = (
        <CSSTransition in={props.show} timeout={200} classNames='slide-in-left' mountOnEnter unmountOnExit>
            <aside className='side-drawer' onClick={props.onClick}>{props.children}</aside>
        </CSSTransition>
    )


    return createPortal(content, document.getElementById('backdrop-hook'))
};

export default SideDrawer;