
import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

function MealItemForm(props){

    const [amountIsValid, setAmountIsValid] = useState(false);
    const amountInputRef = useRef();

    const submitHandeler = (event) => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
            setAmountIsValid(false);
            return;
        }
        console.log(enteredAmount, enteredAmountNumber);
        props.onAddToCart(enteredAmountNumber);
    }
    

    return(
        <form className={classes.form} onSubmit={submitHandeler}>
            <Input
                ref={amountInputRef} 
                label='mennyiség'
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min:'1',
                    max:'5',
                    step:'1',
                    defaultValue:'1'
            }} />
            <button>+ kosárba</button>
            {amountIsValid && <p>A megadott mennyiség nem megfelelő! (1-5)</p>}
        </form>
    );
}

export default MealItemForm;