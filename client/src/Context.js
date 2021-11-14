import React, { useEffect, useReducer } from 'react';
import { request } from './js/axios';

export const myContext = React.createContext(null);

const reducer = (state, action) => {
  if (action.type === 'LOG_IN') {
    return { ...state, currentUser: action.payload };
  }
  if (action.type === 'LOG_OUT') {
    return { ...state, currentUser: null };
  }
  if (action.type === 'ADD_TO_CART') {
    const order = action.payload;
    let orders = [...state.shoppings];

    for (let i = 0; i < state.shoppings.length; i++) {
      if (order.id === orders[i].id && order.size === orders[i].size) {
        orders[i] = { ...orders[i], quantity: orders[i].quantity++ };
        orders[i] = {
          ...orders[i],
          total: orders[i].price * orders[i].quantity,
        };

        document.getElementById('cart').style.display = 'block';
        localStorage.setItem('shoppings', JSON.stringify(orders));

        return {
          ...state,
          shoppings: [...orders],
        };
      }
    }
    document.getElementById('cart').style.display = 'block';

    localStorage.setItem(
      'shoppings',
      JSON.stringify([...state.shoppings, action.payload])
    );
    return { ...state, shoppings: [...state.shoppings, action.payload] };
  }
  if (action.type === 'DECREASE_ONE') {
    const order = action.payload;
    let orders = [...state.shoppings];

    for (let i = 0; i < state.shoppings.length; i++) {
      if (order.id === orders[i].id && order.size === orders[i].size) {
        if (orders[i].quantity === 0) {
          const newOrders = orders.filter(
            (item) => item.id !== order.id || item.size !== order.size
          );
          localStorage.setItem('shoppings', JSON.stringify(newOrders));

          return {
            ...state,
            shoppings: [...newOrders],
          };
        }
        orders[i] = { ...orders[i], quantity: orders[i].quantity-- };
        orders[i] = {
          ...orders[i],
          total: orders[i].price * orders[i].quantity,
        };
        localStorage.setItem('shoppings', JSON.stringify(orders));

        return {
          ...state,
          shoppings: [...orders],
        };
      }
    }
  }
  if (action.type === 'REMOVE_FROM_CART') {
    const order = action.payload;
    let orders = [...state.shoppings];

    const newOrders = orders.filter(
      (item) => item.id !== order.id || item.size !== order.size
    );
    localStorage.setItem('shoppings', JSON.stringify(newOrders));

    return {
      ...state,
      shoppings: [...newOrders],
    };

    // for (let i = 0; i < state.shoppings.length; i++) {
    //   if (order.id === orders[i].id && order.size === orders[i].size) {

    //   }
    // }
  }
};

const initialState = {
  currentUser: null,
  shoppings: [],
};

export default function Context({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getMe = async () => {
      const res = await request('GET', '/api/v1/users/isloggedin');
      if (res) {
        if (res.data.status === 'success') {
          dispatch({ type: 'LOG_IN', payload: res.data.data.user });
        }
      }
    };
    getMe();
    localStorage.setItem('shoppings', JSON.stringify([]));
  }, []);

  return (
    <myContext.Provider value={{ ...state, dispatch }}>
      {children}
    </myContext.Provider>
  );
}
