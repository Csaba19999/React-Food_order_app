import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

function HeaderCartButton(props){
    const [btnIsHighLighted, setBtnIsHighLighted] = useState(false);
    const cartCtx = useContext(CartContext);
    const {items} = cartCtx;

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);
    
    const btnClasses = `${classes.button} ${btnIsHighLighted ? classes.bump : ''}`;

    useEffect(() => {
        if(cartCtx.items.length === 0){
            return;
        }
        setBtnIsHighLighted(true);
        const timer = setTimeout(() => {
            setBtnIsHighLighted(false);
        }, 300);
        return () => {
            clearTimeout(timer);
        }
    }, [items]);

    return(
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Kosaram</span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
            <span></span>
        </button>
    );
}

export default HeaderCartButton;