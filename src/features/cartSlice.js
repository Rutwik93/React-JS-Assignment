import { createSlice } from "@reduxjs/toolkit";

var startState={
    cartItems:[],
    totalItems: 0,
    totalAmount:0
};

var cartSlice = createSlice({
    name: "cart",
    initialState: startState,
    reducers:{
        addToCart(state,action)
        {
            var flag=false;

            for(var i=0; i<state.cartItems.length; i++)
            {
                if(action.payload.id===state.cartItems[i].id)
                    flag=true;
            }

            if(flag)
            {
                for(var i=0; i<state.cartItems.length; i++)
                {
                    if(action.payload.id===state.cartItems[i].id)
                    {
                        if(action.payload.quantity)
                        {
                            state.cartItems[i].quantity+=action.payload.quantity;
                            state.totalAmount+=action.payload.quantity*state.cartItems[i].Price;
                        }
                        else
                        {
                            state.cartItems[i].quantity++;
                            state.totalAmount+=state.cartItems[i].Price;
                        }
                    }
                }
            }
            else
            {
                state.cartItems.push({
                    id:action.payload.id,
                    quantity:action.payload.quantity?action.payload.quantity:1,
                    ...action.payload.data
                });
                state.totalItems++;
                if(action.payload.quantity)
                    state.totalAmount+=action.payload.data.Price*action.payload.quantity;
                else
                    state.totalAmount+=action.payload.data.Price;
            }
        },
        removeFromCart(state,action)
        {
            for(var i=0; i<state.cartItems.length; i++)
            {
                if(action.payload.id===state.cartItems[i].id)
                {
                    state.totalItems--;
                    state.totalAmount-=state.cartItems[i].Price*state.cartItems[i].quantity;
                    state.cartItems.splice(i,1);
                }
            }
        },
        emptyCartOnOrder(state)
        {
            state.cartItems=[];
            state.totalItems= 0;
            state.totalAmount=0;
        }
    }
});

export var {addToCart, removeFromCart, emptyCartOnOrder} = cartSlice.actions;

export default cartSlice.reducer;