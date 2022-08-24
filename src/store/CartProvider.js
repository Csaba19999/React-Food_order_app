import {useReducer} from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmmount: 0,
}

const cartReducer = (state, action) => {
    if(action.type === 'ADD'){
        const updatedTotalAmount = state.totalAmmount + action.item.price * action.item.amount;
        
        const existingCartItemIndex = state.items.findIndex(
            (item => item.id === action.item.id)
        );
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if(existingCartItem ){
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }else{
            updatedItems = state.items.concat(action.item);
        }
        
        return{
            items : updatedItems,
            totalAmmount: updatedTotalAmount
        };
    }
    

    if(action.type === 'REMOVE'){
        const existingCardItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingItem = state.items[existingCardItemIndex];
        const updatedTotalAmount = state.totalAmmount - existingItem.price;
        let updatedItems;
        if(existingItem.amount === 1){
            updatedItems = state.items.filter((item) => item.id !== action.id);
        }else{
            const updatedItem = {...existingItem, amount: existingItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCardItemIndex] = updatedItem;
        }
        return (
            {items: updatedItems,
            totalAmmount: updatedTotalAmount}
        );
    }

    if(action.type === 'CLEAR'){
        return defaultCartState;
    }

    return defaultCartState;
}
function CartProvide(props){
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemHandeler = item => {
        dispatchCartAction({
            type:  'ADD',
            item: item
        })
    };
    const removeItemHandeler = id => {
        dispatchCartAction({
            type:  'REMOVE',
            id: id
        })
    };
    const clearCartHandeler = () => {
        dispatchCartAction({
            type:  'CLEAR'
        });
    };

    const cartContext = {
        items: cartState.items,
        totalAmmount: cartState.totalAmmount,
        addItem: addItemHandeler,
        removeItem: removeItemHandeler,
        clearCart: clearCartHandeler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvide;