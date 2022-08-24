import {Fragment} from 'react';
import mealsImg from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';


function Header(props){
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Rendelj Reactel</h1>
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImg} alt="Header img with foods"/>
            </div>
        </Fragment>
    );
}

export default Header;