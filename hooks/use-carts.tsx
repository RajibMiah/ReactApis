import React, { useReducer, useContext, createContext } from 'react';
import { reducer, cartItemsTotalPrice } from './cart.reducer';
import { useStorage } from 'utils/use-storage';
const CartContext = createContext({} as any);
const INITIAL_STATE = {
  isOpen: false,
  items: [],
  isRestaurant: false,
  coupon: null,
};

const useCartActions = (initialCart = INITIAL_STATE) => {
  const [state, dispatch] = useReducer(reducer, initialCart);

  const addItemHandler = (item, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity } });
  };
  const validated_items = (items)=>{
    dispatch({type:'VALIDATED_ITEMS', payload:items})
  }
  const addCheckoutDetails = (data) =>{
    dispatch({type:'ADD_CHECKOUT_DETAILS' , payload:data})
  }
  const reOrderHandler = (items) => {
    const cartItems = items.map((orderItem) => {
      return {...orderItem.variant, quantity: orderItem.quantity}
    })
    dispatch({type: 'STORE_ORDER_ITEM', payload: cartItems});
  };

  const removeItemHandler = (item, quantity = 1) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { ...item, quantity } });
  };

  const clearItemFromCartHandler = (item) => {
    dispatch({ type: 'CLEAR_ITEM_FROM_CART', payload: item });
  };
  const storeReOrder = (ORDER_ITEM) =>{
    dispatch({ type: 'STORE_ORDER_ITEM', payload: ORDER_ITEM });
  }

  const clearCartHandler = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  const toggleCartHandler = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };
  const couponHandler = (coupon) => {
    dispatch({ type: 'APPLY_COUPON', payload: coupon });
  };
  const removeCouponHandler = () => {
    dispatch({ type: 'REMOVE_COUPON' });
  };
  const rehydrateLocalState = (payload) => {
    dispatch({ type: 'REHYDRATE', payload });
  };
  const toggleRestaurant = () => {
    dispatch({ type: 'TOGGLE_RESTAURANT' });
  };
  const isInCartHandler = (id) => {
    return state.items?.some((item) => item.id === id);
  };
  const getItemHandler = (id) => {
    return state.items?.find((item) => item.id === id);
  };
  const getCartItemsPrice = () => cartItemsTotalPrice(state.items).toFixed(2);
  const getCartItemsTotalPrice = () =>
    cartItemsTotalPrice(state.items, state.coupon).toFixed(2);

  const getDiscount = () => {
    const total = cartItemsTotalPrice(state.items);
    const discount = state.coupon
      ? (total * Number(state.coupon?.discountInPercent)) / 100
      : 0;
    return discount.toFixed(2);
  };
  const getItemsCount = state.items?.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return {
    state,
    getItemsCount,
    rehydrateLocalState,
    addItemHandler,
    reOrderHandler,
    addCheckoutDetails,
    validated_items,
    removeItemHandler,
    clearItemFromCartHandler,
    clearCartHandler,
    isInCartHandler,
    getItemHandler,
    toggleCartHandler,
    getCartItemsTotalPrice,
    getCartItemsPrice,
    couponHandler,
    removeCouponHandler,
    getDiscount,
    toggleRestaurant,
  };
};

export const CartProvider = ({ children }) => {
  const {
    state,
    rehydrateLocalState,
    getItemsCount,
    addItemHandler,
    validated_items,
    reOrderHandler,
    removeItemHandler,
    addCheckoutDetails,
    clearItemFromCartHandler,
    clearCartHandler,
    isInCartHandler,
    getItemHandler,
    toggleCartHandler,
    getCartItemsTotalPrice,
    couponHandler,
    removeCouponHandler,
    getCartItemsPrice,
    getDiscount,
    toggleRestaurant,
  } = useCartActions();

  const { rehydrated, error } = useStorage(state, rehydrateLocalState);

  return (
    <CartContext.Provider
      value={{
        isOpen: state.isOpen,
        items: state.items,
        coupon: state.coupon,
        usedWalletAmount: state.usedWalletAmount,
        isRestaurant: state.isRestaurant,
        cartItemsCount: state.items?.length,
        totalDiscount:state.totalDiscount,
        itemsCount: getItemsCount,
        checkoutDetails:state.checkoutDetails,
        addItem: addItemHandler,
        addValidatedItem: validated_items,
        reOrder: reOrderHandler,
        removeItem: removeItemHandler,
        addCheckoutDetails,
        removeItemFromCart: clearItemFromCartHandler,
        clearCart: clearCartHandler,
        isInCart: isInCartHandler,
        getItem: getItemHandler,
        toggleCart: toggleCartHandler,
        calculatePrice: getCartItemsTotalPrice,
        calculateSubTotalPrice: getCartItemsPrice,
        applyCoupon: couponHandler,
        removeCoupon: removeCouponHandler,
        calculateDiscount: getDiscount,
        toggleRestaurant,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
