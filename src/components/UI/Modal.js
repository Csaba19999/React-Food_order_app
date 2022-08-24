import { Fragment } from 'react/cjs/react.production.min';
import reactDom from 'react-dom';

import classes from './Modal.module.css';

const BackDrop = (props) => {
    return (
        <div className={classes.backdrop} onClick={props.onClose}></div>
    );
}

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
}

const portalElement = document.getElementById('overlays');

function Modal(props){
    return(
        <Fragment>
            {reactDom.createPortal(<BackDrop onClose={props.onClose}/>, portalElement)}
            {reactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    );
}

export default Modal;