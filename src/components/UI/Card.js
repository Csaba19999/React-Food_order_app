import classes from './Card.module.css';

function Crad(props){
    return(
        <div className={classes.card}>
            {props.children}
        </div>
    );
}

export default Crad;