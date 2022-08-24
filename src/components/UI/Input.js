import React from 'react';
import classes from './Input.module.css';


//<input id={props.input.id} {...props.input} /> Ami a props.input objecten belül van mindet hozzá adja attribútumként.-

const Input = React.forwardRef((props, ref) =>{
    return(
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input} />
        </div>
    );
});

export default Input;