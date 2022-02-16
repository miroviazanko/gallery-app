import { useEffect } from 'react';
import { createSlice, configureStore } from '@reduxjs/toolkit';



/* const galleries = await
    fetch("http://api.programator.sk/gallery", {
        "method": "GET",
        "headers": {
            "Content-Type":"application/json"
        },
        "mode": 'cors',
        "cache": 'default'
  }).then(response => response.json())
      .then(results => console.log(results)) */
  

const initialState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
    name: 'counter',
    //initialState: initialState (old method)
    initialState, //new method
    reducers: {
        increment(state) {
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) {
            state.counter = state.counter + action.payload
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter
        },
    }
})



const store = configureStore({
    reducer: counterSlice.reducer
});

//alternative for more slices
/* const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        timer: timerSlice.reducer
    }
}); */

export const counterActions = counterSlice.actions;

export default store;